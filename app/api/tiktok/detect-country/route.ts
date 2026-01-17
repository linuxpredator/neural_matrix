/**
 * API Endpoint: /api/tiktok/detect-country
 * POST endpoint for advanced country detection
 */

import { NextRequest, NextResponse } from 'next/server';
import { detectTikTokCountry, type TikTokProfile, type VideoData } from '@/lib/global-country-detector';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { profile, videos } = body;

        // Validate input
        if (!profile || !profile.username) {
            return NextResponse.json(
                { error: 'Invalid profile data' },
                { status: 400 }
            );
        }

        // Run detection
        const result = await detectTikTokCountry(profile as TikTokProfile, videos as VideoData[]);

        // Return result with performance metrics
        return NextResponse.json({
            success: true,
            data: result,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('[Country Detection Error]:', error);
        return NextResponse.json(
            {
                error: 'Country detection failed',
                details: error instanceof Error ? error.message : String(error),
            },
            { status: 500 }
        );
    }
}
