import { load } from "cheerio";
import { TikTokUserRegion, RegionDetectionResult } from "@/lib/types/tiktok";

/**
 * Service to detect TikTok Account Region using Advanced CDN Analysis
 * Implements "The Omar Method" + Deep Pattern Scanning
 */

const USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

export async function detectTikTokRegion(username: string, htmlContext?: string, knownRegion?: string): Promise<RegionDetectionResult> {
    const cleanUsername = username.replace(/^@/, "");

    try {
        let html = htmlContext;

        // Only fetch if no context provided
        if (!html) {
            const response = await fetch(`https://www.tiktok.com/@${cleanUsername}`, {
                headers: { "User-Agent": USER_AGENT },
            });

            if (!response.ok) {
                // If fetch fails, we can't do anything. Return unknown.
                console.warn("[TikTokRegionService] Fetch failed, returning Unknown");
                return {
                    username: cleanUsername,
                    region: "Unknown",
                    country_code: "Unknown",
                    confidence_score: 0.0,
                    detection_method: "FAILED_FETCH",
                    success: false
                };
            }
            html = await response.text();
        }

        // --- STRATEGY 1: EXPLICIT METADATA (From Route Parse) ---
        // We rely on the robustness of the route.ts JSON parser.

        if (knownRegion && knownRegion.length === 2 && knownRegion !== "US") {
            return {
                username: cleanUsername,
                region: knownRegion,
                country_code: knownRegion,
                confidence_score: 0.95,
                detection_method: "METADATA",
                success: true
            };
        }

        // Removed Regex matching to avoid Viewer Bias (getting 'MY' from app context).
        // Fallback to CDN Analysis below.

        // --- STRATEGY 2: DEEP CDN PATTERN SCANNING (Fallback) ---
        // If metadata is empty/missing, we look at where the content is hosted.
        // This is efficient for finding the "Host Region" but might misidentify 'MY' as 'SG'.
        // Only trigger this if Metadata failed.

        const cdnRegex = /https:\\?\/\\?\/[a-zA-Z0-9-]+\.(tiktokcdn|tiktokv|akamaized)\.[a-zA-Z0-9.]+\/[^"']+/g;
        const matches = (html.match(cdnRegex) || []).slice(0, 100);

        for (const rawUrl of matches) {
            const cleanUrl = rawUrl.replace(/\\/g, "").toLowerCase();
            const region = analyzeCdnUrl(cleanUrl);

            if (region) {
                return {
                    username: cleanUsername,
                    region: region,
                    country_code: region,
                    confidence_score: 0.75, // Moderate confidence (Host Region != Registration Region)
                    detection_method: "CDN_ANALYSIS",
                    success: true
                };
            }
        }

        return {
            username: cleanUsername,
            region: "Unknown",
            country_code: "Unknown",
            confidence_score: 0.0,
            detection_method: "FALLBACK",
            success: false
        };

    } catch (error) {
        console.error("[TikTokRegionService] Error:", error);
        // Do not throw, return safe fallback
        return {
            username: cleanUsername,
            region: "Unknown",
            country_code: "Unknown",
            confidence_score: 0.0,
            detection_method: "ERROR",
            success: false
        };
    }
}

/**
 * Analyzes a single CDN URL to extract region code.
 * Expanded to support Global Regions dynamically.
 */
function analyzeCdnUrl(url: string): string | null {
    // 1. Explicit Mappings for known major hubs
    if (/[.-]eu[.-]|tiktokcdn-eu|europe|euttp/.test(url)) return "EU";
    if (/alisg|[.-]sg[.-]|tiktokcdn-sg|akamaized.*sg/.test(url)) return "SG";
    if (/maliva|[.-]va[.-]|tiktokcdn-us|useast|us-east/.test(url)) return "US";

    // 2. Dynamic 2-Letter Code Extraction (Global Support)
    // Matches patterns like: tiktokcdn-my, tiktokcdn-jp, tiktokcdn-br
    const genericMatch = url.match(/tiktokcdn-([a-z]{2})/);
    if (genericMatch && genericMatch[1]) {
        return genericMatch[1].toUpperCase();
    }

    return null;
}
