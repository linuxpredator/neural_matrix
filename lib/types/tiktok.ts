
export interface TikTokUserRegion {
    username: string;
    region: string; // ISO code e.g. "MY", "US", "SG" or "Unknown"
    country_code: string; // "MY", "US" etc.
    confidence_score: number; // 0.0 to 1.0 (1.0 = High Confidence CDN Match)
    cached?: boolean; // Debug flag to show if served from cache
}

export type RegionDetectionMethod = "CDN_ANALYSIS" | "LANGUAGE_INFERENCE" | "METADATA" | "HEURISTIC" | "FALLBACK" | "FAILED_FETCH" | "ERROR";

export interface RegionDetectionResult extends TikTokUserRegion {
    detection_method: RegionDetectionMethod;
    success: boolean;
    data?: TikTokUserRegion; // This data property is redundant if extending TikTokUserRegion
    error?: string;
}
