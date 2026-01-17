/**
 * Redis client for caching and rate limiting
 * Supports both Upstash Redis (production) and in-memory fallback (development)
 */

// In-memory store fallback when Redis is not configured
class InMemoryStore {
    private store: Map<string, { value: string; expiresAt: number }> = new Map();

    async get(key: string): Promise<string | null> {
        const item = this.store.get(key);
        if (!item) return null;

        if (Date.now() > item.expiresAt) {
            this.store.delete(key);
            return null;
        }

        return item.value;
    }

    async set(key: string, value: string, expiresInSeconds?: number): Promise<void> {
        const expiresAt = expiresInSeconds
            ? Date.now() + (expiresInSeconds * 1000)
            : Date.now() + (3600 * 1000); // Default 1 hour

        this.store.set(key, { value, expiresAt });
    }

    async incr(key: string): Promise<number> {
        const current = await this.get(key);
        const newValue = current ? parseInt(current) + 1 : 1;
        await this.set(key, newValue.toString());
        return newValue;
    }

    async expire(key: string, seconds: number): Promise<void> {
        const item = this.store.get(key);
        if (item) {
            item.expiresAt = Date.now() + (seconds * 1000);
        }
    }
}

// Redis client (Upstash or in-memory fallback)
let redisClient: any = null;

function getRedisClient() {
    if (redisClient) return redisClient;

    // Check if Upstash Redis is configured
    const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
    const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (upstashUrl && upstashToken) {
        try {
            // Use Upstash Redis REST API (works on serverless)
            const { Redis } = require('@upstash/redis');
            redisClient = new Redis({
                url: upstashUrl,
                token: upstashToken,
            });
            console.log('[Redis] Using Upstash Redis');
        } catch (error) {
            console.warn('[Redis] Upstash Redis not available, falling back to in-memory store');
            redisClient = new InMemoryStore();
        }
    } else {
        console.log('[Redis] No Upstash config found, using in-memory store');
        redisClient = new InMemoryStore();
    }

    return redisClient;
}

export const redis = getRedisClient();

// Helper functions
export async function cacheGet(key: string): Promise<string | null> {
    try {
        return await redis.get(key);
    } catch (error) {
        console.error('[Redis] Get error:', error);
        return null;
    }
}

export async function cacheSet(key: string, value: string, ttlSeconds: number = 3600): Promise<void> {
    try {
        if ('setex' in redis) {
            // Upstash Redis
            await redis.setex(key, ttlSeconds, value);
        } else {
            // In-memory store
            await redis.set(key, value, ttlSeconds);
        }
    } catch (error) {
        console.error('[Redis] Set error:', error);
    }
}

export async function cacheIncr(key: string): Promise<number> {
    try {
        return await redis.incr(key);
    } catch (error) {
        console.error('[Redis] Incr error:', error);
        return 0;
    }
}

export async function cacheExpire(key: string, seconds: number): Promise<void> {
    try {
        await redis.expire(key, seconds);
    } catch (error) {
        console.error('[Redis] Expire error:', error);
    }
}
