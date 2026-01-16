
/**
 * Utility to map ISO Country Codes to Full Names and Flag Emojis.
 * Implements "Ruthless" standardization of location display.
 */

export interface LocationInfo {
    name: string;
    flag: string;
    code: string;
}

const CUSTOM_MAPPINGS: Record<string, { name: string; flag: string }> = {
    'MY': { name: 'MALAYSIA', flag: '🇲🇾' },
    'SG': { name: 'SINGAPORE', flag: '🇸🇬' },
    'ID': { name: 'INDONESIA', flag: '🇮🇩' },
    'US': { name: 'UNITED STATES', flag: '🇺🇸' },
    'EU': { name: 'EUROPE (REGION)', flag: '🇪🇺' },
    'VN': { name: 'VIETNAM', flag: '🇻🇳' },
    'PH': { name: 'PHILIPPINES', flag: '🇵🇭' },
    'TH': { name: 'THAILAND', flag: '🇹🇭' },
    'KR': { name: 'SOUTH KOREA', flag: '🇰🇷' },
    'JP': { name: 'JAPAN', flag: '🇯🇵' },
    'CN': { name: 'CHINA', flag: '🇨🇳' },
    'GB': { name: 'UNITED KINGDOM', flag: '🇬🇧' },
    'AU': { name: 'AUSTRALIA', flag: '🇦🇺' },
};

export function getLocationInfo(code: string): LocationInfo {
    if (!code || code === 'Unknown') {
        return { name: 'UNKNOWN REGION', flag: '🌐', code: '??' };
    }

    const upperCode = code.toUpperCase();

    // 1. Check Custom Mappings (Preferred for aesthetics)
    if (CUSTOM_MAPPINGS[upperCode]) {
        return {
            ...CUSTOM_MAPPINGS[upperCode],
            code: upperCode
        };
    }

    // 2. Fallback: Algorithmic Generation (Intl API + Emoji Math)
    try {
        const regionName = new Intl.DisplayNames(['en'], { type: 'region' }).of(upperCode) || upperCode;
        const flagEmoji = upperCode.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397));

        return {
            name: regionName.toUpperCase(),
            flag: flagEmoji,
            code: upperCode
        };
    } catch (e) {
        return { name: upperCode, flag: '🌐', code: upperCode };
    }
}
