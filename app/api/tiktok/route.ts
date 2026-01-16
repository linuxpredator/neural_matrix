
import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import { detectTikTokRegion } from "@/lib/services/tiktok-region";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    try {
        const response = await fetch(`https://www.tiktok.com/@${username}`, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            throw new Error("Failed to fetch TikTok profile");
        }

        const html = await response.text();
        const $ = load(html);

        // Attempt to find the specific script tag containing hydration data
        const scriptContent = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").html();

        if (!scriptContent) {
            // Fallback for SIGI_STATE if Universal Data is missing (older format or A/B test)
            const sigiState = $("#SIGI_STATE").html();
            if (sigiState) {
                const data = JSON.parse(sigiState);
                const userModule = data.UserModule?.users?.[username];
                const statsModule = data.UserModule?.stats?.[username];

                if (userModule) {
                    return NextResponse.json({
                        username: userModule.uniqueId,
                        nickname: userModule.nickname,
                        avatar: userModule.avatarLarger,
                        id: userModule.id,
                        secUid: userModule.secUid,
                        private: userModule.privateAccount,
                        verified: userModule.verified,
                        followers: statsModule?.followerCount || 0,
                        following: statsModule?.followingCount || 0,
                        hearts: statsModule?.heartCount || 0,
                        videos: statsModule?.videoCount || 0,
                        signature: userModule.signature,
                        region: userModule.region, // Often usually iso code like 'MY'
                        createdAt: new Date(parseInt(userModule.id.slice(0, 31), 2) * 1000).toISOString(), // Roughly derive if possible or just use a placeholder if complex
                    });
                }

            }
            return NextResponse.json({ error: "Could not parse TikTok data" }, { status: 500 });
        }

        // Helper to find data recursively
        const findData = (obj: any, key: string): any => {
            if (!obj || typeof obj !== 'object') return null;
            if (obj[key]) return obj[key];
            for (const k in obj) {
                const found = findData(obj[k], key);
                if (found) return found;
            }
            return null;
        };

        let userData = null;
        let statsData = null;

        // Strategy 1: Universal Data (Newer)
        if (scriptContent) {
            try {
                const data = JSON.parse(scriptContent);
                const defaultScope = data.__DEFAULT_SCOPE__;

                // Try standard path first
                if (defaultScope?.["webapp.user-detail"]?.userInfo) {
                    userData = defaultScope["webapp.user-detail"].userInfo.user;
                    statsData = defaultScope["webapp.user-detail"].userInfo.stats;
                }
                // Fallback: Recursive search for 'userInfo' in Universal Data
                else {
                    const userInfo = findData(data, 'userInfo');
                    if (userInfo) {
                        userData = userInfo.user;
                        statsData = userInfo.stats;
                    }
                }
            } catch (e) {
                console.log("Error parsing Universal Data:", e);
            }
        }

        // Strategy 2: SIGI_STATE (Older / Mobile) - Only if Strategy 1 failed
        if (!userData) {
            const sigiState = $("#SIGI_STATE").html();
            if (sigiState) {
                try {
                    const data = JSON.parse(sigiState);
                    const userModule = data.UserModule;
                    if (userModule?.users?.[username]) { // exact match
                        userData = userModule.users[username];
                        statsData = userModule.stats?.[username] || {};
                    } else if (userModule?.users) { // valid but maybe username mismatch key
                        const firstKey = Object.keys(userModule.users)[0];
                        userData = userModule.users[firstKey];
                        statsData = userModule.stats?.[firstKey] || {};
                    }
                } catch (e) {
                    console.log("Error parsing SIGI_STATE:", e);
                }
            }
        }

        if (!userData) {
            // Strategy 3: HTML Metadata Fallback (If scripts fail completely)
            // This acts as a last resort "view-source" scrape
            const metaDesc = $('meta[name="description"]').attr('content');
            // Use rudimentary extraction if needed, but for now just error with meaningful log
            console.error("Failed to find user data in both Universal Data and SIGI_STATE.");
            return NextResponse.json({ error: "User info structure changed / Anti-Bot active. Try again later." }, { status: 500 });
        }

        // Normalize Data Structure (Universal Data vs SIGI differences)
        const user = userData;
        const stats = statsData || {};

        // Creation date from ID (approximate using snowflake)
        // TikTok ID >> 32 = unix timestamp
        const creationTime = new Date(Number((BigInt(user.id) >> 32n).toString()) * 1000).toISOString().split('T')[0];

        // Use the new Robust Service for region detection
        const regionData = await detectTikTokRegion(username);
        let detectedRegion = regionData.region;

        console.log(`[NeuralMatch] Region: ${detectedRegion}, Confidence: ${regionData.confidence_score}, Method: ${regionData.detection_method}`);

        return NextResponse.json({
            username: user.uniqueId,
            nickname: user.nickname,
            id: user.id,
            secUid: user.secUid,
            avatar: user.avatarLarger || user.avatarMedium || user.avatarThumb,
            signature: user.signature,
            region: detectedRegion,
            region_confidence: regionData.confidence_score, // Exposing for UI
            region_method: regionData.detection_method, // Exposing for UI
            language: user.language,
            hasStories: user.UserStoryStatus > 0,
            createdAt: creationTime,
            stats: {
                followerCount: stats.followerCount,
                followingCount: stats.followingCount,
                heartCount: stats.heartCount,
                videoCount: stats.videoCount,
            },
            verified: user.verified,
            openFavorite: user.openFavorite,
            private: user.privateAccount,
            isUnderAge18: user.isUnderAge18,
        });

    } catch (error) {
        console.error("TikTok Scrape Error:", error);
        return NextResponse.json(
            {
                error: "Failed to scrape data",
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}

// --- THE OMAR METHOD: CDN Region Detection ---
function detectRegionFromUrl(url: string = ""): string | null {
    if (!url) return null;
    const lowerUrl = url.toLowerCase();

    // EUROPE
    // Matches: tiktokcdn-eu, -eu-, .eu., europe, euttp
    if (/[.-]eu[.-]|tiktokcdn-eu|europe|euttp/.test(lowerUrl)) return "EU";

    // ASIA / SINGAPORE (common for SEA)
    // Matches: alisg, -sg-, .sg., tiktokcdn-sg, sf16-sg, p16-sg
    if (/alisg|[.-]sg[.-]|tiktokcdn-sg|akamaized.*sg/.test(lowerUrl)) return "SG";

    // USA
    // Matches: maliva, -va-, .va., useast, tiktokcdn-us
    // 'va' = Virginia (server farm)
    if (/maliva|[.-]va[.-]|tiktokcdn-us|useast|us-east/.test(lowerUrl)) return "US";

    return null;
}
