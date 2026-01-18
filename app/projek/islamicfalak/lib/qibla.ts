import { Qibla, Coordinates } from 'adhan';
import type { QiblaData } from '../types/falak';

// Kaaba coordinates
const KAABA_LAT = 21.422487;
const KAABA_LNG = 39.826206;

export function calculateQibla(latitude: number, longitude: number): QiblaData {
    const coordinates = new Coordinates(latitude, longitude);
    const qiblaDirection = Qibla(coordinates);

    // Calculate distance to Makkah using Haversine formula
    const distance = haversineDistance(
        latitude,
        longitude,
        KAABA_LAT,
        KAABA_LNG
    );

    return {
        direction: qiblaDirection,
        distance: distance
    };
}

function haversineDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance);
}

function toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function getCompassDirection(degrees: number): string {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}
