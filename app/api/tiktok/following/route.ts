
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
    try {
        const { username, sessionid } = await request.json();

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        if (!sessionid) {
            return NextResponse.json({ error: 'Session ID is required for scraping following lists' }, { status: 400 });
        }

        // Launch the browser
        const browser = await puppeteer.launch({
            headless: true, // Set to false for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        // set user agent to avoid bot detection
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Set the session cookie
        await page.setCookie({
            name: 'sessionid',
            value: sessionid,
            domain: '.tiktok.com',
            path: '/',
            secure: true,
            httpOnly: true,
        });

        // Navigate to the following page
        const targetUrl = `https://www.tiktok.com/@${username.replace('@', '')}/following`;
        console.log(`Navigating to: ${targetUrl}`);

        await page.goto(targetUrl, {
            waitUntil: 'networkidle2',
            timeout: 60000
        });

        // Wait for the common selector for user cards in the following list
        // Note: Class names are obfuscated and change often. We often look for generic structure or attributes.
        // As of early 2025, TikTok uses extensive hydration. We might need to scroll to trigger loading.

        // Initial scroll to trigger potential lazy loading
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));

        // Wait a bit for content
        await new Promise(r => setTimeout(r, 3000));

        // Attempt to extract data
        // We look for 'UserContainer' or links formatted like /@username
        const followingList = await page.evaluate(() => {
            const users: any[] = [];
            // Strategy: Find all anchor tags that look like user profiles
            const anchors = Array.from(document.querySelectorAll('a'));

            // Filter anchors that link to a user profile (start with /@) BUT are not the main profile link
            // In the "Following" list modal/page, usually items are arranged in a specific list container.

            // This selector is an approximation and might need adjustment based on the latest DOM obfuscation
            // Looking for generic "Div" that contains an image and text

            const probableUserItems = document.querySelectorAll('[data-e2e="following-item"]');

            if (probableUserItems.length > 0) {
                probableUserItems.forEach((item) => {
                    const link = item.querySelector('a');
                    const img = item.querySelector('img');
                    const textElements = item.querySelectorAll('p, span, h4');

                    if (link && img) {
                        const username = link.getAttribute('href')?.replace('/', '') || '';
                        const nickname = textElements[0]?.textContent || '';
                        const avatar = img.src;

                        users.push({
                            username,
                            nickname,
                            avatar,
                            bio: "Fetched via Scraper"
                        });
                    }
                });
            } else {
                // Fallback: General scraping of all valid user-looking elements in the main container
                // This is risky but often necessary if data-e2e attributes are removed
                const allUserLinks = anchors.filter(a => a.getAttribute('href')?.startsWith('/@'));
                const uniqueLinks = new Set(allUserLinks.map(a => a.getAttribute('href')));

                uniqueLinks.forEach(href => {
                    if (!href) return;
                    users.push({
                        username: href.replace('/', ''),
                        nickname: "Unknown (Scraped)",
                        avatar: "https://files.raycast.com/sj714818g811/files/b4986684-297c-473d-9d7a-117565c82662.png", // specific fallback
                        bio: "Scraped Data"
                    });
                });
            }

            return users;
        });

        await browser.close();

        return NextResponse.json({
            data: followingList,
            count: followingList.length,
            note: "Data scraped successfully using Puppeteer"
        });

    } catch (error: any) {
        console.error('Scraping Error:', error);
        return NextResponse.json({
            error: 'Failed to scrape data',
            details: error.message
        }, { status: 500 });
    }
}
