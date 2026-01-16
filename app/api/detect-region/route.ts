
import { NextRequest, NextResponse } from "next/server";
import { Cache } from "@/lib/cache/memory";
import { detectTikTokRegion } from "@/lib/services/tiktok-region";
import { TikTokUserRegion, RegionDetectionResult } from "@/lib/types/tiktok";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
        return NextResponse.json({ success: false, error: "Username required" }, { status: 400 });
    }

    // Cache Check
    const cacheKey = `region:${username}`;
    if (Cache.has(cacheKey)) {
        const cachedData = Cache.get<TikTokUserRegion>(cacheKey);
        return NextResponse.json({
            success: true,
            data: { ...cachedData, cached: true }
        });
    }

    try {
        const result = await detectTikTokRegion(username);

        // Cache Success Results
        if (result.confidence_score > 0) {
            Cache.set(cacheKey, result);
        }

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Internal Server Error"
        }, { status: 500 });
    }
}
