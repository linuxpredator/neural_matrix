import { load } from "cheerio";
import { TikTokUserRegion } from "@/lib/types/tiktok";

/**
 * Service to detect TikTok Account Region using Advanced CDN Analysis
 * Implements "The Omar Method" + Deep Pattern Scanning
 */

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function detectTikTokRegion(username: string): Promise<TikTokUserRegion> {
    const cleanUsername = username.replace(/^@/, "");

    try {
        const response = await fetch(`https://www.tiktok.com/@${cleanUsername}`, {
            headers: { "User-Agent": USER_AGENT },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile");
        }

        const html = await response.text();

        // --- STRATEGY 1: DEEP CDN PATTERN SCANNING (Highest Confidence) ---
        // Scan the ENTIRE HTML for media URLs containing region indicators.
        // This bypasses the need to parse specific JSON structures which are unstable.

        const cdnRegex = /https:\\?\/\\?\/[a-zA-Z0-9-]+\.(tiktokcdn|tiktokv|akamaized)\.[a-zA-Z0-9.]+\/[^"']+/g;
        // Limit to first 200 matches to avoid DoS on massive pages, usually first 50 is enough
        const matches = (html.match(cdnRegex) || []).slice(0, 100);

        for (const rawUrl of matches) {
            const cleanUrl = rawUrl.replace(/\\/g, "").toLowerCase();
            const region = analyzeCdnUrl(cleanUrl);

            if (region) {
                return {
                    username: cleanUsername,
                    region: region,
                    country_code: region, // Map if needed, currently same
                    confidence_score: 1.0, // High confidence because it comes from CDN
                    detection_method: "CDN_ANALYSIS"
                };
            }
        }

        // --- STRATEGY 2: METADATA FALLBACK ---
        // If no CDN match (rare), try to find "region" key in JSON
        const regionMatch = html.match(/"region":\s*"([A-Z]{2})"/);
        if (regionMatch && regionMatch[1]) {
            return {
                username: cleanUsername,
                region: regionMatch[1],
                country_code: regionMatch[1],
                confidence_score: 0.8,
                detection_method: "METADATA"
            };
        }

        return {
            username: cleanUsername,
            region: "Unknown",
            country_code: "Unknown",
            confidence_score: 0.0,
            detection_method: "FALLBACK"
        };

    } catch (error) {
        console.error("[TikTokRegionService] Error:", error);
        throw error;
    }
}

/**
 * Analyzes a single CDN URL to extract region code.
 * Based on 'The Omar Method' research.
 */
function analyzeCdnUrl(url: string): string | null {
    // EUROPE
    if (/[.-]eu[.-]|tiktokcdn-eu|europe|euttp/.test(url)) return "EU";

    // ASIA / SINGAPORE (Common for MY/SG/ID)
    if (/alisg|[.-]sg[.-]|tiktokcdn-sg|akamaized.*sg/.test(url)) return "SG";

    // USA
    if (/maliva|[.-]va[.-]|tiktokcdn-us|useast|us-east/.test(url)) return "US";

    return null;
}
