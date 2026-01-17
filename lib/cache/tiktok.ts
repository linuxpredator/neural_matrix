/**
 * TikTok-specific caching utilities
 */

import { cacheGet, cacheSet } from '@/lib/redis';

const CACHE_PREFIX = 'tiktok:profile:';
const CACHE_TTL = 3600; // 1 hour

export interface CachedProfile {
    username: string;
    nickname: string;
    id: string;
    secUid: string;
    avatar: string;
    signature: string;
    region: string;
    region_confidence: number;
    region_method: string;
    language: string;
    createdAt: string;
    stats: {
        followerCount: number;
        followingCount: number;
        heartCount: number;
        videoCount: number;
    };
    verified: boolean;
    private: boolean;
    hasStories: boolean;
}

/**
 * Get cached TikTok profile
 */
export async function getCachedTikTokProfile(username: string): Promise<CachedProfile | null> {
    const key = `${CACHE_PREFIX}${username.toLowerCase()}`;
    const cached = await cacheGet(key);

    if (!cached) {
        return null;
    }

    try {
        return JSON.parse(cached);
    } catch (error) {
        console.error('[TikTokCache] Parse error:', error);
        return null;
    }
}

/**
 * Cache TikTok profile data
 */
export async function cacheTikTokProfile(username: string, profile: CachedProfile): Promise<void> {
    const key = `${CACHE_PREFIX}${username.toLowerCase()}`;
    await cacheSet(key, JSON.stringify(profile), CACHE_TTL);
    console.log(`[TikTokCache] Cached profile for @${username} (TTL: ${CACHE_TTL}s)`);
}
