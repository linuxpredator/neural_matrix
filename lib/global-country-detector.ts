/**
 * Global TikTok Country Detection Engine
 * 6-Layer Heuristic Analysis with Weighted Scoring
 */

import {
    GLOBAL_LANGUAGE_PATTERNS,
    GLOBAL_LOCATION_PATTERNS,
    PHONE_CODE_PATTERNS,
    TIMEZONE_COUNTRY_MAP,
    COUNTRY_NAMES,
    type LanguagePattern,
    type LocationPattern,
    type PhoneCodePattern,
} from '@/lib/data/country-patterns';

// Import enhanced comprehensive patterns
import {
    ALL_ENHANCED_LANGUAGE_PATTERNS,
    type EnhancedLanguagePattern,
} from '@/lib/data/enhanced-language-patterns';

import {
    ALL_ENHANCED_LOCATIONS,
    type EnhancedLocationPattern,
} from '@/lib/data/expanded-locations';

import {
    COMPREHENSIVE_PHONE_PATTERNS,
    type EnhancedPhonePattern,
} from '@/lib/data/expanded-phone-patterns';

export interface TikTokProfile {
    username: string;
    nickname: string;
    bio?: string;
    signature?: string;
    region?: string;
    language?: string;
    id: string;
}

export interface VideoData {
    createTime: number; // Unix timestamp
    locationCreated?: string;
    hashtags?: string[];
}

export interface CountrySignal {
    country: string;
    confidence: number;
    method: string;
    evidence: string;
}

export interface CountryDetectionResult {
    country: string;
    countryName: string;
    confidence: number;
    signals: CountrySignal[];
    methods: string[];
    methodCount: number;
    methodBonus: number;
    warning?: string;
}

/**
 * Signal weights for aggregation
 */
const SIGNAL_WEIGHTS = {
    DECLARED_REGION: 0.30,
    BIO_NICKNAME: 0.20,
    PHONE_PATTERN: 0.25,
    DEVICE_LANGUAGE: 0.10,
    VIDEO_METADATA: 0.10,
    POSTING_TIME: 0.05,
};

/**
 * Method diversity bonus
 * +5% per unique method, capped at 20%
 */
const METHOD_BONUS_CONFIG = {
    PER_METHOD: 0.05,
    MAX_BONUS: 0.20,
};

export class GlobalTikTokCountryDetector {
    private signals: CountrySignal[] = [];

    /**
     * Main detection entry point
     * Runs all 6 detection layers in parallel
     */
    async detectCountry(
        profile: TikTokProfile,
        videos?: VideoData[]
    ): Promise<CountryDetectionResult> {
        this.signals = [];

        // Run all detection layers in parallel for performance
        const detectionPromises = [
            this.checkDeclaredRegion(profile),
            this.analyzeBioAndNickname(profile),
            this.detectPhonePattern(profile),
            this.analyzeDeviceLanguage(profile),
            videos ? this.analyzeVideoMetadata(videos) : Promise.resolve(),
            videos ? this.inferTimezoneFromPostingPattern(videos) : Promise.resolve(),
        ];

        await Promise.all(detectionPromises);

        // Aggregate signals and return result
        return this.aggregateSignals(profile);
    }

    /**
     * Layer 1: Declared Region (30% weight)
     * Direct signal from profile metadata
     */
    private async checkDeclaredRegion(profile: TikTokProfile): Promise<void> {
        if (!profile.region || profile.region === 'undefined') {
            return;
        }

        // Normalize region code to uppercase
        const regionCode = profile.region.toUpperCase();

        // Verify it's a valid country code
        if (COUNTRY_NAMES[regionCode]) {
            this.signals.push({
                country: regionCode,
                confidence: 1.0, // Highest confidence for declared region
                method: 'DECLARED_REGION',
                evidence: `Profile region: ${regionCode}`,
            });
        }
    }

    /**
     * Layer 2: Bio & Nickname Analysis (20% weight)
     * Detect regional slang and city mentions
     */
    private async analyzeBioAndNickname(profile: TikTokProfile): Promise<void> {
        const textToAnalyze = [
            profile.bio || '',
            profile.signature || '',
            profile.nickname || '',
        ].join(' ').toLowerCase();

        if (!textToAnalyze.trim()) {
            return;
        }

        // Check language patterns (slang)
        for (const pattern of GLOBAL_LANGUAGE_PATTERNS) {
            const regex = typeof pattern.pattern === 'string'
                ? new RegExp(pattern.pattern, 'i')
                : pattern.pattern;

            if (regex.test(textToAnalyze)) {
                // Add signal for each matching country
                for (const country of pattern.countries) {
                    this.signals.push({
                        country,
                        confidence: pattern.confidence,
                        method: 'BIO_NICKNAME',
                        evidence: `Detected slang: "${pattern.description}"`,
                    });
                }
            }
        }

        // Check location patterns (city mentions)
        for (const location of GLOBAL_LOCATION_PATTERNS) {
            const cityPattern = new RegExp(`\\b${location.city}\\b`, 'i');

            // Check city name and aliases
            const patterns = [location.city, ...(location.aliases || [])];
            const matched = patterns.some(p => new RegExp(`\\b${p}\\b`, 'i').test(textToAnalyze));

            if (matched) {
                this.signals.push({
                    country: location.country,
                    confidence: location.confidence,
                    method: 'BIO_NICKNAME',
                    evidence: `Location mention: ${location.city}`,
                });
            }
        }
    }

    /**
     * Layer 3: Phone Pattern Matching (25% weight)
     * High-confidence signal when phone number detected
     */
    private async detectPhonePattern(profile: TikTokProfile): Promise<void> {
        const textToAnalyze = [
            profile.bio || '',
            profile.signature || '',
        ].join(' ');

        if (!textToAnalyze.trim()) {
            return;
        }

        // Check each phone code pattern
        for (const phonePattern of PHONE_CODE_PATTERNS) {
            const matches = textToAnalyze.match(phonePattern.regex);

            if (matches && matches.length > 0) {
                this.signals.push({
                    country: phonePattern.country,
                    confidence: phonePattern.confidence,
                    method: 'PHONE_PATTERN',
                    evidence: `Phone code: ${phonePattern.code}`,
                });

                // Only match first phone pattern to avoid duplicates
                break;
            }
        }
    }

    /**
     * Layer 4: Device Language (10% weight)
     * Analyze user's device language setting
     */
    private async analyzeDeviceLanguage(profile: TikTokProfile): Promise<void> {
        if (!profile.language) {
            return;
        }

        // Parse language code (e.g., "en-US" -> ["en", "US"])
        const parts = profile.language.split('-');

        if (parts.length === 2) {
            const countryCode = parts[1].toUpperCase();

            // Verify it's a valid country code
            if (COUNTRY_NAMES[countryCode]) {
                this.signals.push({
                    country: countryCode,
                    confidence: 0.7, // Medium confidence (VPN/proxy concerns)
                    method: 'DEVICE_LANGUAGE',
                    evidence: `Device language: ${profile.language}`,
                });
            }
        }

        // Language-to-country mapping for common cases
        const languageMap: Record<string, { country: string; confidence: number }> = {
            'id': { country: 'ID', confidence: 0.8 },
            'ms': { country: 'MY', confidence: 0.8 },
            'th': { country: 'TH', confidence: 0.8 },
            'vi': { country: 'VN', confidence: 0.8 },
            'ja': { country: 'JP', confidence: 0.8 },
            'ko': { country: 'KR', confidence: 0.8 },
            'zh': { country: 'CN', confidence: 0.6 }, // Lower (CN/TW/HK ambiguous)
            'ar': { country: 'SA', confidence: 0.6 }, // Lower (multi-country)
            'es': { country: 'ES', confidence: 0.5 }, // Lower (multi-country)
            'pt': { country: 'BR', confidence: 0.6 },
        };

        const langCode = parts[0].toLowerCase();
        if (languageMap[langCode]) {
            this.signals.push({
                country: languageMap[langCode].country,
                confidence: languageMap[langCode].confidence,
                method: 'DEVICE_LANGUAGE',
                evidence: `Language: ${langCode}`,
            });
        }
    }

    /**
     * Layer 5: Video Content Metadata (10% weight)
     * Analyze location tags and hashtags from videos
     */
    private async analyzeVideoMetadata(videos: VideoData[]): Promise<void> {
        if (!videos || videos.length === 0) {
            return;
        }

        // Limit to recent 20 videos for performance
        const recentVideos = videos.slice(0, 20);

        for (const video of recentVideos) {
            // Check location tags
            if (video.locationCreated) {
                // Try to match location with our patterns
                for (const location of GLOBAL_LOCATION_PATTERNS) {
                    if (video.locationCreated.toLowerCase().includes(location.city.toLowerCase())) {
                        this.signals.push({
                            country: location.country,
                            confidence: 0.85,
                            method: 'VIDEO_METADATA',
                            evidence: `Video location: ${video.locationCreated}`,
                        });
                    }
                }
            }

            // Check hashtags for country-specific trends
            if (video.hashtags) {
                for (const hashtag of video.hashtags) {
                    const lowerHashtag = hashtag.toLowerCase();

                    // Simple country hashtag detection
                    if (lowerHashtag.includes('indonesia') || lowerHashtag.includes('indo')) {
                        this.signals.push({
                            country: 'ID',
                            confidence: 0.75,
                            method: 'VIDEO_METADATA',
                            evidence: `Hashtag: #${hashtag}`,
                        });
                    } else if (lowerHashtag.includes('malaysia') || lowerHashtag.includes('msia')) {
                        this.signals.push({
                            country: 'MY',
                            confidence: 0.75,
                            method: 'VIDEO_METADATA',
                            evidence: `Hashtag: #${hashtag}`,
                        });
                    }
                    // Add more patterns as needed
                }
            }
        }
    }

    /**
     * Layer 6: Posting Time Pattern (5% weight)
     * Infer timezone from peak posting hours
     */
    private async inferTimezoneFromPostingPattern(videos: VideoData[]): Promise<void> {
        if (!videos || videos.length < 5) {
            // Need at least 5 videos for statistical analysis
            return;
        }

        // Convert timestamps to hours (UTC)
        const postingHours = videos.map(v => {
            const date = new Date(v.createTime * 1000);
            return date.getUTCHours();
        });

        // Find peak posting hour (mode)
        const hourCounts: Record<number, number> = {};
        for (const hour of postingHours) {
            hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        }

        const peakHour = parseInt(
            Object.keys(hourCounts).reduce((a, b) =>
                hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b
            )
        );

        // Infer timezone from peak hour
        // Assume peak posting is during local evening (18:00-22:00 local time)
        // Calculate UTC offset
        const assumedLocalPeakHour = 20; // 8 PM local time
        const inferredOffset = peakHour - assumedLocalPeakHour;

        // Map offset to timezone string
        const offsetString = `UTC${inferredOffset >= 0 ? '+' : ''}${inferredOffset}`;

        // Find matching timezone
        const timezoneMatch = TIMEZONE_COUNTRY_MAP.find(tz => tz.offset === offsetString);

        if (timezoneMatch) {
            // Add signal for each likely country
            for (const country of timezoneMatch.countries) {
                this.signals.push({
                    country,
                    confidence: 0.5, // Lower confidence for timezone inference
                    method: 'POSTING_TIME',
                    evidence: `Peak posting: ${peakHour}:00 UTC (${offsetString})`,
                });
            }
        }
    }

    /**
     * Aggregate all signals with weighted scoring
     * Apply method diversity bonus
     */
    private aggregateSignals(profile: TikTokProfile): CountryDetectionResult {
        if (this.signals.length === 0) {
            // No signals - return unknown with low confidence
            return {
                country: 'UNKNOWN',
                countryName: 'Unknown',
                confidence: 0,
                signals: [],
                methods: [],
                methodCount: 0,
                methodBonus: 0,
                warning: 'No detection signals available',
            };
        }

        // Group signals by country
        const countryScores: Record<string, {
            signals: CountrySignal[];
            weightedScore: number;
            methods: Set<string>;
        }> = {};

        for (const signal of this.signals) {
            if (!countryScores[signal.country]) {
                countryScores[signal.country] = {
                    signals: [],
                    weightedScore: 0,
                    methods: new Set(),
                };
            }

            const entry = countryScores[signal.country];
            entry.signals.push(signal);
            entry.methods.add(signal.method);

            // Apply weight based on method
            const weight = SIGNAL_WEIGHTS[signal.method as keyof typeof SIGNAL_WEIGHTS] || 0.1;
            entry.weightedScore += signal.confidence * weight;
        }

        // Calculate final scores with method diversity bonus
        const countryResults = Object.entries(countryScores).map(([country, data]) => {
            const methodCount = data.methods.size;

            // Calculate method bonus: +5% per method, max 20%
            const methodBonus = Math.min(
                (methodCount - 1) * METHOD_BONUS_CONFIG.PER_METHOD,
                METHOD_BONUS_CONFIG.MAX_BONUS
            );

            // Final confidence = weighted score + method bonus
            const baseConfidence = data.weightedScore;
            const finalConfidence = Math.min(baseConfidence * (1 + methodBonus), 1.0);

            return {
                country,
                countryName: COUNTRY_NAMES[country] || country,
                confidence: finalConfidence,
                signals: data.signals,
                methods: Array.from(data.methods),
                methodCount,
                methodBonus,
            };
        });

        // Sort by confidence (descending)
        countryResults.sort((a, b) => b.confidence - a.confidence);

        // Get winner
        const winner = countryResults[0];

        // Build final result with optional warning
        const result: CountryDetectionResult = {
            country: winner.country,
            countryName: winner.countryName,
            confidence: winner.confidence,
            signals: winner.signals,
            methods: winner.methods,
            methodCount: winner.methodCount,
            methodBonus: winner.methodBonus,
        };

        // Add warning if confidence is low
        if (winner.confidence < 0.6) {
            result.warning = 'Low detection confidence - results may be inaccurate';
        }

        return result;
    }

    /**
     * Get all signals for debugging
     */
    getSignals(): CountrySignal[] {
        return this.signals;
    }
}

/**
 * Utility function to create detector and run detection
 */
export async function detectTikTokCountry(
    profile: TikTokProfile,
    videos?: VideoData[]
): Promise<CountryDetectionResult> {
    const detector = new GlobalTikTokCountryDetector();
    return detector.detectCountry(profile, videos);
}
