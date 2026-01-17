/**
 * Rate limiting middleware using Redis or in-memory store
 */

import { cacheIncr, cacheExpire } from '@/lib/redis';

const RATE_LIMIT_PREFIX = 'ratelimit:';
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_REQUESTS_PER_WINDOW = 50; // Increased from 10 to allow for testing

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetAt: Date;
}

/**
 * Check if IP is rate limited
 * Returns whether the request should be allowed
 */
export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
    const key = `${RATE_LIMIT_PREFIX}${ip}`;

    try {
        const requests = await cacheIncr(key);

        if (requests === 1) {
            // First request from this IP, set expiry
            await cacheExpire(key, RATE_LIMIT_WINDOW);
        }

        const remaining = Math.max(0, MAX_REQUESTS_PER_WINDOW - requests);
        const resetAt = new Date(Date.now() + (RATE_LIMIT_WINDOW * 1000));

        return {
            allowed: requests <= MAX_REQUESTS_PER_WINDOW,
            remaining,
            resetAt
        };
    } catch (error) {
        console.error('[RateLimit] Error:', error);
        // Fail open - allow request if rate limiting fails
        return {
            allowed: true,
            remaining: MAX_REQUESTS_PER_WINDOW,
            resetAt: new Date(Date.now() + (RATE_LIMIT_WINDOW * 1000))
        };
    }
}

/**
 * Get client IP from request headers
 */
export function getClientIP(headers: Headers): string {
    // Try various headers that might contain the real IP
    const forwardedFor = headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    const realIP = headers.get('x-real-ip');
    if (realIP) {
        return realIP;
    }

    const cfConnectingIP = headers.get('cf-connecting-ip'); // Cloudflare
    if (cfConnectingIP) {
        return cfConnectingIP;
    }

    return 'unknown';
}
