
export interface TikTokUserRegion {
    username: string;
    region: string; // ISO code e.g. "MY", "US", "SG" or "Unknown"
    country_code: string; // "MY", "US" etc.
    confidence_score: number; // 0.0 to 1.0 (1.0 = High Confidence CDN Match)
    detection_method: "CDN_ANALYSIS" | "METADATA" | "HEURISTIC" | "FALLBACK";
    cached?: boolean; // Debug flag to show if served from cache
}

export interface RegionDetectionResult {
    success: boolean;
    data?: TikTokUserRegion;
    error?: string;
}
