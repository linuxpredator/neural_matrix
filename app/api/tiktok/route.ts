
import { NextRequest, NextResponse } from "next/server";
import { load } from "cheerio";
import { detectTikTokRegion } from "@/lib/services/tiktok-region";

const PYTHON_SERVICE_URL = "http://127.0.0.1:8000/api/v1/user";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ error: "Username required" }, { status: 400 });
    }

    // 1. Attempt to fetch from Python Backend (High Precision)
    try {
        const pythonRes = await fetch(`${PYTHON_SERVICE_URL}/${username}`, {
            next: { revalidate: 0 } // Disable cache for fresh data
        });

        if (pythonRes.ok) {
            const pythonData = await pythonRes.json();
            if (pythonData.status === "success" && pythonData.data) {
                const p = pythonData.data;
                console.log(`[Proxy] Served from Python Service: ${username}`);

                // Map Python response to our Frontend Schema
                return NextResponse.json({
                    username: p.username,
                    nickname: p.nickname,
                    avatar: p.avatar,
                    id: p.id,
                    secUid: p.secUid,
                    verified: p.verified,
                    followers: p.stats?.followers || 0,
                    following: p.stats?.following || 0,
                    hearts: p.stats?.hearts || 0,
                    videos: p.stats?.videos || 0,
                    signature: p.signature,
                    region: p.region,
                    region_confidence: 0.99, // Python API uses authenticated session
                    region_method: "AUTHENTICATED_API",
                    language: p.language,
                    createdAt: new Date().toISOString() // Placeholder
                });
            }
        }
    } catch (e) {
        console.warn("[Proxy] Python Service Unavailable, falling back to local scraper...", e);
    }

    // 2. Fallback to Local Node.js Scraper
    try {
        return await fallbackScraper(username);
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

async function fallbackScraper(username: string): Promise<NextResponse> {
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

    const scriptContent = $("#__UNIVERSAL_DATA_FOR_REHYDRATION__").html();

    if (!scriptContent) {
        // Fallback for SIGI_STATE
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
                    region: userModule.region,
                    createdAt: new Date(parseInt(userModule.id.slice(0, 31), 2) * 1000).toISOString(),
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

    if (scriptContent) {
        try {
            const data = JSON.parse(scriptContent);
            const defaultScope = data.__DEFAULT_SCOPE__;

            if (defaultScope?.["webapp.user-detail"]?.userInfo) {
                userData = defaultScope["webapp.user-detail"].userInfo.user;
                statsData = defaultScope["webapp.user-detail"].userInfo.stats;
            } else {
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

    if (!userData) {
        const sigiState = $("#SIGI_STATE").html();
        if (sigiState) {
            try {
                const data = JSON.parse(sigiState);
                const userModule = data.UserModule;
                if (userModule?.users?.[username]) {
                    userData = userModule.users[username];
                    statsData = userModule.stats?.[username] || {};
                } else if (userModule?.users) {
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
        console.error("Failed to find user data in both Universal Data and SIGI_STATE.");
        return NextResponse.json({ error: "User info structure changed / Anti-Bot active. Try again later." }, { status: 500 });
    }

    const user = userData;
    const stats = statsData || {};
    const creationTime = new Date(Number((BigInt(user.id) >> 32n).toString()) * 1000).toISOString().split('T')[0];

    const finalRegionData = await detectTikTokRegion(username, html, user.region);
    let detectedRegion = finalRegionData.region;

    console.log(`[NeuralMatch] Region: ${detectedRegion}, Confidence: ${finalRegionData.confidence_score}, Method: ${finalRegionData.detection_method}`);

    return NextResponse.json({
        username: user.uniqueId,
        nickname: user.nickname,
        id: user.id,
        secUid: user.secUid,
        avatar: user.avatarLarger || user.avatarMedium || user.avatarThumb,
        signature: user.signature,
        region: detectedRegion,
        region_confidence: finalRegionData.confidence_score,
        region_method: finalRegionData.detection_method,
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
}
