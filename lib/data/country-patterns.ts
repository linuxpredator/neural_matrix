/**
 * Global Pattern Databases for TikTok Country Detection
 * Contains language patterns, location patterns, phone codes, and timezone mappings
 */

export interface LanguagePattern {
    pattern: string | RegExp;
    countries: string[];
    confidence: number;
    description: string;
}

export interface LocationPattern {
    city: string;
    country: string;
    aliases?: string[];
    confidence: number;
}

export interface PhoneCodePattern {
    code: string;
    country: string;
    regex: RegExp;
    confidence: number;
}

export interface TimezoneMapping {
    offset: string; // e.g., "UTC+8"
    countries: string[];
}

/**
 * GLOBAL_LANGUAGE_PATTERNS - Slang and language-specific phrases
 * Detects regional slang in bio and nickname
 */
export const GLOBAL_LANGUAGE_PATTERNS: LanguagePattern[] = [
    // Indonesian Patterns
    { pattern: /\bwkwk+\b/i, countries: ['ID'], confidence: 0.9, description: 'Indonesian laughing slang' },
    { pattern: /\bgaskeun\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian slang' },
    { pattern: /\banjay\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian slang' },
    { pattern: /\bbet dah\b/i, countries: ['ID'], confidence: 0.8, description: 'Indonesian slang' },
    { pattern: /\bkuy\b/i, countries: ['ID'], confidence: 0.75, description: 'Indonesian slang (yuk reversed)' },
    { pattern: /\bwarga\s+62\b/i, countries: ['ID'], confidence: 0.95, description: 'Indonesian citizen reference' },

    // Malaysian Patterns
    { pattern: /\blah\b/i, countries: ['MY', 'SG'], confidence: 0.85, description: 'Malaysian/Singaporean particle' },
    { pattern: /\bweh\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian slang' },
    { pattern: /\bwei\b/i, countries: ['MY'], confidence: 0.8, description: 'Malaysian slang' },
    { pattern: /\bkat mana\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian Malay' },
    { pattern: /\bsiol\b/i, countries: ['MY'], confidence: 0.8, description: 'Malaysian slang' },
    { pattern: /\bmcm mana\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian text speak' },

    // Singaporean Patterns
    { pattern: /\blor\b/i, countries: ['SG'], confidence: 0.85, description: 'Singaporean particle' },
    { pattern: /\bleh\b/i, countries: ['SG', 'MY'], confidence: 0.75, description: 'Singaporean/Malaysian particle' },
    { pattern: /\bsia\b/i, countries: ['SG'], confidence: 0.8, description: 'Singaporean particle' },
    { pattern: /\bcan or not\b/i, countries: ['SG'], confidence: 0.85, description: 'Singlish phrase' },

    // Thai Patterns
    { pattern: /\bkrub\b/i, countries: ['TH'], confidence: 0.9, description: 'Thai polite particle (male)' },
    { pattern: /\bkrab\b/i, countries: ['TH'], confidence: 0.9, description: 'Thai polite particle (male)' },
    { pattern: /\bka\b/i, countries: ['TH'], confidence: 0.7, description: 'Thai polite particle (female)' },
    { pattern: /555+/i, countries: ['TH'], confidence: 0.9, description: 'Thai laughing (5=ha)' },

    // Vietnamese Patterns
    { pattern: /\bchào\b/i, countries: ['VN'], confidence: 0.9, description: 'Vietnamese greeting' },
    { pattern: /\boi gioi oi\b/i, countries: ['VN'], confidence: 0.85, description: 'Vietnamese expression' },
    { pattern: /\bđẹp\b/i, countries: ['VN'], confidence: 0.85, description: 'Vietnamese beautiful' },

    // Filipino Patterns
    { pattern: /\bpre\b/i, countries: ['PH'], confidence: 0.8, description: 'Filipino slang (pare)' },
    { pattern: /\bnaman\b/i, countries: ['PH'], confidence: 0.85, description: 'Filipino particle' },
    { pattern: /\btalaga\b/i, countries: ['PH'], confidence: 0.85, description: 'Filipino word (really)' },
    { pattern: /\bkasi\b/i, countries: ['PH'], confidence: 0.75, description: 'Filipino word' },

    // Indian Patterns
    { pattern: /\byaar\b/i, countries: ['IN'], confidence: 0.85, description: 'Hindi slang (friend)' },
    { pattern: /\bbhai\b/i, countries: ['IN'], confidence: 0.8, description: 'Hindi brother' },
    { pattern: /\bdidi\b/i, countries: ['IN'], confidence: 0.75, description: 'Hindi sister' },
    { pattern: /\bkya baat\b/i, countries: ['IN'], confidence: 0.85, description: 'Hindi expression' },

    // Japanese Patterns
    { pattern: /\bwww+\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese laughing' },
    { pattern: /\bdesu\b/i, countries: ['JP'], confidence: 0.8, description: 'Japanese copula' },
    { pattern: /\bkawaii\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese cute' },

    // Korean Patterns
    { pattern: /ㅋㅋ+/i, countries: ['KR'], confidence: 0.9, description: 'Korean laughing' },
    { pattern: /\boppa\b/i, countries: ['KR'], confidence: 0.8, description: 'Korean older brother' },
    { pattern: /\bunni\b/i, countries: ['KR'], confidence: 0.8, description: 'Korean older sister' },

    // Chinese Patterns
    { pattern: /哈哈+/i, countries: ['CN', 'TW', 'HK'], confidence: 0.85, description: 'Chinese laughing' },
    { pattern: /\b666+\b/i, countries: ['CN'], confidence: 0.85, description: 'Chinese gaming slang (awesome)' },

    // Arabic Patterns
    { pattern: /\bhabibi\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.85, description: 'Arabic my dear' },
    { pattern: /\byalla\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.8, description: 'Arabic let\'s go' },

    // Spanish Patterns
    { pattern: /\bjajaja+\b/i, countries: ['ES', 'MX', 'AR', 'CL'], confidence: 0.85, description: 'Spanish laughing' },
    { pattern: /\bguey\b/i, countries: ['MX'], confidence: 0.85, description: 'Mexican slang' },
    { pattern: /\bboludo\b/i, countries: ['AR'], confidence: 0.9, description: 'Argentine slang' },

    // Portuguese Patterns
    { pattern: /\bkkkk+\b/i, countries: ['BR'], confidence: 0.9, description: 'Brazilian laughing' },
    { pattern: /\bvai brasil\b/i, countries: ['BR'], confidence: 0.9, description: 'Brazilian expression' },

    // French Patterns
    { pattern: /\boui oui\b/i, countries: ['FR'], confidence: 0.8, description: 'French yes yes' },
    { pattern: /\bc'est la vie\b/i, countries: ['FR'], confidence: 0.75, description: 'French expression' },

    // German Patterns
    { pattern: /\bich bin\b/i, countries: ['DE', 'AT'], confidence: 0.8, description: 'German I am' },
    { pattern: /\bguten tag\b/i, countries: ['DE', 'AT'], confidence: 0.8, description: 'German greeting' },

    // Russian Patterns
    { pattern: /\bпривет\b/i, countries: ['RU'], confidence: 0.9, description: 'Russian hello' },
    { pattern: /\bдавай\b/i, countries: ['RU'], confidence: 0.85, description: 'Russian let\'s go' },
];

/**
 * GLOBAL_LOCATION_PATTERNS - Major cities worldwide
 */
export const GLOBAL_LOCATION_PATTERNS: LocationPattern[] = [
    // Southeast Asia
    { city: 'Jakarta', country: 'ID', aliases: ['JKT', 'Jkt'], confidence: 0.95 },
    { city: 'Surabaya', country: 'ID', confidence: 0.95 },
    { city: 'Bandung', country: 'ID', aliases: ['Bdg'], confidence: 0.95 },
    { city: 'Medan', country: 'ID', confidence: 0.95 },
    { city: 'Bali', country: 'ID', confidence: 0.9 },

    { city: 'Kuala Lumpur', country: 'MY', aliases: ['KL', 'KualaLumpur'], confidence: 0.95 },
    { city: 'Penang', country: 'MY', confidence: 0.95 },
    { city: 'Johor Bahru', country: 'MY', aliases: ['JB'], confidence: 0.95 },
    { city: 'Ipoh', country: 'MY', confidence: 0.95 },
    { city: 'Melaka', country: 'MY', aliases: ['Malacca'], confidence: 0.9 },

    { city: 'Singapore', country: 'SG', aliases: ['SG', 'Spore'], confidence: 0.95 },

    { city: 'Bangkok', country: 'TH', aliases: ['BKK'], confidence: 0.95 },
    { city: 'Chiang Mai', country: 'TH', confidence: 0.95 },
    { city: 'Phuket', country: 'TH', confidence: 0.9 },

    { city: 'Manila', country: 'PH', confidence: 0.95 },
    { city: 'Cebu', country: 'PH', confidence: 0.95 },
    { city: 'Davao', country: 'PH', confidence: 0.95 },

    { city: 'Hanoi', country: 'VN', confidence: 0.95 },
    { city: 'Ho Chi Minh', country: 'VN', aliases: ['Saigon', 'HCMC'], confidence: 0.95 },

    // East Asia
    { city: 'Tokyo', country: 'JP', confidence: 0.95 },
    { city: 'Osaka', country: 'JP', confidence: 0.95 },
    { city: 'Kyoto', country: 'JP', confidence: 0.95 },

    { city: 'Seoul', country: 'KR', confidence: 0.95 },
    { city: 'Busan', country: 'KR', confidence: 0.95 },

    { city: 'Beijing', country: 'CN', confidence: 0.95 },
    { city: 'Shanghai', country: 'CN', confidence: 0.95 },
    { city: 'Guangzhou', country: 'CN', confidence: 0.95 },
    { city: 'Shenzhen', country: 'CN', confidence: 0.95 },

    { city: 'Hong Kong', country: 'HK', aliases: ['HK'], confidence: 0.95 },
    { city: 'Taipei', country: 'TW', confidence: 0.95 },

    // South Asia
    { city: 'Mumbai', country: 'IN', confidence: 0.95 },
    { city: 'Delhi', country: 'IN', confidence: 0.95 },
    { city: 'Bangalore', country: 'IN', aliases: ['Bengaluru'], confidence: 0.95 },
    { city: 'Hyderabad', country: 'IN', confidence: 0.95 },
    { city: 'Chennai', country: 'IN', confidence: 0.95 },

    // Middle East
    { city: 'Dubai', country: 'AE', confidence: 0.95 },
    { city: 'Abu Dhabi', country: 'AE', confidence: 0.95 },
    { city: 'Riyadh', country: 'SA', confidence: 0.95 },
    { city: 'Jeddah', country: 'SA', confidence: 0.95 },

    // Europe
    { city: 'London', country: 'GB', confidence: 0.95 },
    { city: 'Manchester', country: 'GB', confidence: 0.95 },
    { city: 'Paris', country: 'FR', confidence: 0.95 },
    { city: 'Berlin', country: 'DE', confidence: 0.95 },
    { city: 'Munich', country: 'DE', aliases: ['München'], confidence: 0.95 },
    { city: 'Madrid', country: 'ES', confidence: 0.95 },
    { city: 'Barcelona', country: 'ES', confidence: 0.95 },
    { city: 'Rome', country: 'IT', aliases: ['Roma'], confidence: 0.95 },
    { city: 'Milan', country: 'IT', aliases: ['Milano'], confidence: 0.95 },
    { city: 'Moscow', country: 'RU', confidence: 0.95 },

    // Americas
    { city: 'New York', country: 'US', aliases: ['NYC', 'NY'], confidence: 0.95 },
    { city: 'Los Angeles', country: 'US', aliases: ['LA'], confidence: 0.95 },
    { city: 'Chicago', country: 'US', confidence: 0.95 },
    { city: 'San Francisco', country: 'US', aliases: ['SF'], confidence: 0.95 },
    { city: 'Miami', country: 'US', confidence: 0.95 },

    { city: 'Toronto', country: 'CA', confidence: 0.95 },
    { city: 'Vancouver', country: 'CA', confidence: 0.95 },

    { city: 'Mexico City', country: 'MX', aliases: ['CDMX'], confidence: 0.95 },
    { city: 'São Paulo', country: 'BR', confidence: 0.95 },
    { city: 'Rio de Janeiro', country: 'BR', aliases: ['Rio'], confidence: 0.95 },
    { city: 'Buenos Aires', country: 'AR', confidence: 0.95 },

    // Australia & Oceania
    { city: 'Sydney', country: 'AU', confidence: 0.95 },
    { city: 'Melbourne', country: 'AU', confidence: 0.95 },
    { city: 'Brisbane', country: 'AU', confidence: 0.95 },
    { city: 'Auckland', country: 'NZ', confidence: 0.95 },
];

/**
 * PHONE_CODE_PATTERNS - International dial codes
 */
export const PHONE_CODE_PATTERNS: PhoneCodePattern[] = [
    { code: '+60', country: 'MY', regex: /\+60\s*\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+62', country: 'ID', regex: /\+62\s*\d{2,3}[-\s]?\d{3,4}[-\s]?\d{3,4}/g, confidence: 0.95 },
    { code: '+65', country: 'SG', regex: /\+65\s*\d{4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+66', country: 'TH', regex: /\+66\s*\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+63', country: 'PH', regex: /\+63\s*\d{3}[-\s]?\d{3,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+84', country: 'VN', regex: /\+84\s*\d{2,3}[-\s]?\d{3,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+91', country: 'IN', regex: /\+91\s*\d{5}[-\s]?\d{5}/g, confidence: 0.95 },
    { code: '+86', country: 'CN', regex: /\+86\s*\d{3}[-\s]?\d{4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+81', country: 'JP', regex: /\+81\s*\d{1,4}[-\s]?\d{1,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+82', country: 'KR', regex: /\+82\s*\d{1,2}[-\s]?\d{3,4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+971', country: 'AE', regex: /\+971\s*\d{1,2}[-\s]?\d{3}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+966', country: 'SA', regex: /\+966\s*\d{1,2}[-\s]?\d{3}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+44', country: 'GB', regex: /\+44\s*\d{3,4}[-\s]?\d{3}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+33', country: 'FR', regex: /\+33\s*\d{1}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}/g, confidence: 0.95 },
    { code: '+49', country: 'DE', regex: /\+49\s*\d{2,4}[-\s]?\d{3,8}/g, confidence: 0.95 },
    { code: '+34', country: 'ES', regex: /\+34\s*\d{3}[-\s]?\d{3}[-\s]?\d{3}/g, confidence: 0.95 },
    { code: '+1', country: 'US', regex: /\+1\s*\d{3}[-\s]?\d{3}[-\s]?\d{4}/g, confidence: 0.7 }, // Lower confidence (US/CA ambiguous)
    { code: '+55', country: 'BR', regex: /\+55\s*\d{2}[-\s]?\d{4,5}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+61', country: 'AU', regex: /\+61\s*\d{1}[-\s]?\d{4}[-\s]?\d{4}/g, confidence: 0.95 },
    { code: '+7', country: 'RU', regex: /\+7\s*\d{3}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}/g, confidence: 0.9 },
];

/**
 * TIMEZONE_COUNTRY_MAP - UTC offset to likely countries
 */
export const TIMEZONE_COUNTRY_MAP: TimezoneMapping[] = [
    { offset: 'UTC+8', countries: ['MY', 'SG', 'CN', 'TW', 'PH', 'HK'] },
    { offset: 'UTC+7', countries: ['ID', 'TH', 'VN'] },
    { offset: 'UTC+9', countries: ['JP', 'KR'] },
    { offset: 'UTC+5:30', countries: ['IN'] },
    { offset: 'UTC+4', countries: ['AE', 'RU'] },
    { offset: 'UTC+3', countries: ['SA', 'RU'] },
    { offset: 'UTC+2', countries: ['EG', 'ZA'] },
    { offset: 'UTC+1', countries: ['FR', 'DE', 'IT', 'ES'] },
    { offset: 'UTC+0', countries: ['GB', 'PT'] },
    { offset: 'UTC-3', countries: ['BR', 'AR'] },
    { offset: 'UTC-5', countries: ['US', 'CO'] },
    { offset: 'UTC-6', countries: ['MX'] },
    { offset: 'UTC-8', countries: ['US'] },
    { offset: 'UTC+10', countries: ['AU'] },
    { offset: 'UTC+12', countries: ['NZ'] },
];

/**
 * COUNTRY_NAMES - Full country names for display
 */
export const COUNTRY_NAMES: Record<string, string> = {
    'ID': 'Indonesia',
    'MY': 'Malaysia',
    'SG': 'Singapore',
    'TH': 'Thailand',
    'PH': 'Philippines',
    'VN': 'Vietnam',
    'JP': 'Japan',
    'KR': 'South Korea',
    'CN': 'China',
    'TW': 'Taiwan',
    'HK': 'Hong Kong',
    'IN': 'India',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'GB': 'United Kingdom',
    'FR': 'France',
    'DE': 'Germany',
    'ES': 'Spain',
    'IT': 'Italy',
    'RU': 'Russia',
    'US': 'United States',
    'CA': 'Canada',
    'MX': 'Mexico',
    'BR': 'Brazil',
    'AR': 'Argentina',
    'AU': 'Australia',
    'NZ': 'New Zealand',
    'EG': 'Egypt',
    'ZA': 'South Africa',
    'CL': 'Chile',
    'CO': 'Colombia',
    'PT': 'Portugal',
    'AT': 'Austria',
};
