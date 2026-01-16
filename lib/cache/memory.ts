
/**
 * Simple In-Memory Cache with TTL
 * Reduces load on TikTok endpoints and prevents rate limits during local dev.
 */

interface CacheEntry<T> {
    value: T;
    expiry: number;
}

const cache = new Map<string, CacheEntry<any>>();

// Default TTL: 5 minutes
const DEFAULT_TTL_MS = 5 * 60 * 1000;

export const Cache = {
    get: <T>(key: string): T | null => {
        const entry = cache.get(key);
        if (!entry) return null;

        if (Date.now() > entry.expiry) {
            cache.delete(key);
            return null;
        }

        return entry.value as T;
    },

    set: <T>(key: string, value: T, ttlMs: number = DEFAULT_TTL_MS): void => {
        cache.set(key, {
            value,
            expiry: Date.now() + ttlMs,
        });

        // Cleanup if cache gets too big (simple protection)
        if (cache.size > 1000) {
            const firstKey = cache.keys().next().value;
            if (firstKey) cache.delete(firstKey);
        }
    },

    has: (key: string): boolean => {
        return Cache.get(key) !== null;
    }
};
