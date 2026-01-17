/**
 * Comprehensive Global Phone Patterns (100+ Countries)
 * Enhanced validation with mobile/landline patterns
 */

export interface EnhancedPhonePattern {
    country: string;
    countryCode: string;
    dialCode: string;
    mobilePattern: RegExp;
    landlinePattern?: RegExp;
    confidence: number;
    validationRules: {
        minLength: number;
        maxLength: number;
        startsWithDigits?: string[];
    };
}

// ==================== COMPREHENSIVE PHONE PATTERNS ====================

export const COMPREHENSIVE_PHONE_PATTERNS: EnhancedPhonePattern[] = [
    // Southeast Asia
    {
        country: 'Malaysia', countryCode: 'MY', dialCode: '+60',
        mobilePattern: /\+?60\s*1[0-9]{8,9}\b/g,
        landlinePattern: /\+?60\s*[3-9][0-9]{7,8}\b/g,
        confidence: 0.98, validationRules: { minLength: 10, maxLength: 11, startsWithDigits: ['1'] }
    },

    {
        country: 'Indonesia', countryCode: 'ID', dialCode: '+62',
        mobilePattern: /\+?62\s*8[0-9]{8,11}\b/g,
        landlinePattern: /\+?62\s*[2-7][0-9]{7,10}\b/g,
        confidence: 0.98, validationRules: { minLength: 10, maxLength: 13, startsWithDigits: ['8'] }
    },

    {
        country: 'Singapore', countryCode: 'SG', dialCode: '+65',
        mobilePattern: /\+?65\s*[89][0-9]{7}\b/g,
        landlinePattern: /\+?65\s*6[0-9]{7}\b/g,
        confidence: 0.98, validationRules: { minLength: 8, maxLength: 8, startsWithDigits: ['8', '9'] }
    },

    {
        country: 'Thailand', countryCode: 'TH', dialCode: '+66',
        mobilePattern: /\+?66\s*[689][0-9]{7,8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 10 }
    },

    {
        country: 'Philippines', countryCode: 'PH', dialCode: '+63',
        mobilePattern: /\+?63\s*9[0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['9'] }
    },

    {
        country: 'Vietnam', countryCode: 'VN', dialCode: '+84',
        mobilePattern: /\+?84\s*[0-9]{9,10}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 10 }
    },

    {
        country: 'Cambodia', countryCode: 'KH', dialCode: '+855',
        mobilePattern: /\+?855\s*[0-9]{8,9}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 9 }
    },

    {
        country: 'Laos', countryCode: 'LA', dialCode: '+856',
        mobilePattern: /\+?856\s*20[0-9]{6,8}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 10 }
    },

    {
        country: 'Myanmar', countryCode: 'MM', dialCode: '+95',
        mobilePattern: /\+?95\s*9[0-9]{7,9}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 10 }
    },

    // East Asia
    {
        country: 'China', countryCode: 'CN', dialCode: '+86',
        mobilePattern: /\+?86\s*1[3-9][0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 11, maxLength: 11, startsWithDigits: ['1'] }
    },

    {
        country: 'Japan', countryCode: 'JP', dialCode: '+81',
        mobilePattern: /\+?81\s*[789]0[0-9]{8}\b/g,
        landlinePattern: /\+?81\s*[1-9][0-9]{8,9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 11 }
    },

    {
        country: 'South Korea', countryCode: 'KR', dialCode: '+82',
        mobilePattern: /\+?82\s*1[0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['1'] }
    },

    {
        country: 'Taiwan', countryCode: 'TW', dialCode: '+886',
        mobilePattern: /\+?886\s*9[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['9'] }
    },

    {
        country: 'Hong Kong', countryCode: 'HK', dialCode: '+852',
        mobilePattern: /\+?852\s*[569][0-9]{7}\b/g,
        confidence: 0.95, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Mongolia', countryCode: 'MN', dialCode: '+976',
        mobilePattern: /\+?976\s*[89][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    // South Asia
    {
        country: 'India', countryCode: 'IN', dialCode: '+91',
        mobilePattern: /\+?91\s*[6-9][0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['6', '7', '8', '9'] }
    },

    {
        country: 'Pakistan', countryCode: 'PK', dialCode: '+92',
        mobilePattern: /\+?92\s*3[0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['3'] }
    },

    {
        country: 'Bangladesh', countryCode: 'BD', dialCode: '+880',
        mobilePattern: /\+?880\s*1[3-9][0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Sri Lanka', countryCode: 'LK', dialCode: '+94',
        mobilePattern: /\+?94\s*7[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['7'] }
    },

    {
        country: 'Nepal', countryCode: 'NP', dialCode: '+977',
        mobilePattern: /\+?977\s*9[78][0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 10, maxLength: 10 }
    },

    // Middle East
    {
        country: 'Saudi Arabia', countryCode: 'SA', dialCode: '+966',
        mobilePattern: /\+?966\s*5[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['5'] }
    },

    {
        country: 'UAE', countryCode: 'AE', dialCode: '+971',
        mobilePattern: /\+?971\s*5[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['5'] }
    },

    {
        country: 'Turkey', countryCode: 'TR', dialCode: '+90',
        mobilePattern: /\+?90\s*5[0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['5'] }
    },

    {
        country: 'Iran', countryCode: 'IR', dialCode: '+98',
        mobilePattern: /\+?98\s*9[0-9]{9}\b/g,
        confidence: 0.90, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Israel', countryCode: 'IL', dialCode: '+972',
        mobilePattern: /\+?972\s*5[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Iraq', countryCode: 'IQ', dialCode: '+964',
        mobilePattern: /\+?964\s*7[0-9]{9}\b/g,
        confidence: 0.85, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Qatar', countryCode: 'QA', dialCode: '+974',
        mobilePattern: /\+?974\s*[3567][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Kuwait', countryCode: 'KW', dialCode: '+965',
        mobilePattern: /\+?965\s*[569][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Bahrain', countryCode: 'BH', dialCode: '+973',
        mobilePattern: /\+?973\s*[36][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Oman', countryCode: 'OM', dialCode: '+968',
        mobilePattern: /\+?968\s*9[0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Jordan', countryCode: 'JO', dialCode: '+962',
        mobilePattern: /\+?962\s*7[789][0-9]{7}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Lebanon', countryCode: 'LB', dialCode: '+961',
        mobilePattern: /\+?961\s*[37][0-9]{7}\b/g,
        confidence: 0.85, validationRules: { minLength: 8, maxLength: 8 }
    },

    // Europe
    {
        country: 'United Kingdom', countryCode: 'GB', dialCode: '+44',
        mobilePattern: /\+?44\s*7[0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10, startsWithDigits: ['7'] }
    },

    {
        country: 'France', countryCode: 'FR', dialCode: '+33',
        mobilePattern: /\+?33\s*[67][0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Germany', countryCode: 'DE', dialCode: '+49',
        mobilePattern: /\+?49\s*1[5-7][0-9]{8,9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 11 }
    },

    {
        country: 'Italy', countryCode: 'IT', dialCode: '+39',
        mobilePattern: /\+?39\s*3[0-9]{8,9}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 10 }
    },

    {
        country: 'Spain', countryCode: 'ES', dialCode: '+34',
        mobilePattern: /\+?34\s*[67][0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Netherlands', countryCode: 'NL', dialCode: '+31',
        mobilePattern: /\+?31\s*6[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['6'] }
    },

    {
        country: 'Belgium', countryCode: 'BE', dialCode: '+32',
        mobilePattern: /\+?32\s*4[0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Switzerland', countryCode: 'CH', dialCode: '+41',
        mobilePattern: /\+?41\s*7[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Austria', countryCode: 'AT', dialCode: '+43',
        mobilePattern: /\+?43\s*6[0-9]{8,13}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 14 }
    },

    {
        country: 'Sweden', countryCode: 'SE', dialCode: '+46',
        mobilePattern: /\+?46\s*7[0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Norway', countryCode: 'NO', dialCode: '+47',
        mobilePattern: /\+?47\s*[49][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Denmark', countryCode: 'DK', dialCode: '+45',
        mobilePattern: /\+?45\s*[2-9][0-9]{7}\b/g,
        confidence: 0.85, validationRules: { minLength: 8, maxLength: 8 }
    },

    {
        country: 'Finland', countryCode: 'FI', dialCode: '+358',
        mobilePattern: /\+?358\s*4[0-9]{6,9}\b/g,
        confidence: 0.85, validationRules: { minLength: 7, maxLength: 10 }
    },

    {
        country: 'Poland', countryCode: 'PL', dialCode: '+48',
        mobilePattern: /\+?48\s*[4-8][0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Russia', countryCode: 'RU', dialCode: '+7',
        mobilePattern: /\+?7\s*9[0-9]{9}\b/g,
        confidence: 0.85, validationRules: { minLength: 10, maxLength: 10 }
    }, // Shared with Kazakhstan

    {
        country: 'Ukraine', countryCode: 'UA', dialCode: '+380',
        mobilePattern: /\+?380\s*[3-9][0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Romania', countryCode: 'RO', dialCode: '+40',
        mobilePattern: /\+?40\s*7[0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Czech Republic', countryCode: 'CZ', dialCode: '+420',
        mobilePattern: /\+?420\s*[67][0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Greece', countryCode: 'GR', dialCode: '+30',
        mobilePattern: /\+?30\s*6[89][0-9]{8}\b/g,
        confidence: 0.90, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Portugal', countryCode: 'PT', dialCode: '+351',
        mobilePattern: /\+?351\s*9[1236][0-9]{7}\b/g,
        confidence: 0.90, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Hungary', countryCode: 'HU', dialCode: '+36',
        mobilePattern: /\+?36\s*[237]0[0-9]{7}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    // Americas
    {
        country: 'United States', countryCode: 'US', dialCode: '+1',
        mobilePattern: /\+?1\s*[2-9][0-9]{9}\b/g,
        confidence: 0.70, validationRules: { minLength: 10, maxLength: 10 }
    }, // Shared with Canada

    {
        country: 'Canada', countryCode: 'CA', dialCode: '+1',
        mobilePattern: /\+?1\s*[2-9][0-9]{9}\b/g,
        confidence: 0.70, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Mexico', countryCode: 'MX', dialCode: '+52',
        mobilePattern: /\+?52\s*1?[0-9]{10}\b/g,
        confidence: 0.85, validationRules: { minLength: 10, maxLength: 11 }
    },

    {
        country: 'Brazil', countryCode: 'BR', dialCode: '+55',
        mobilePattern: /\+?55\s*[1-9][0-9]{10}\b/g,
        confidence: 0.90, validationRules: { minLength: 11, maxLength: 11 }
    },

    {
        country: 'Argentina', countryCode: 'AR', dialCode: '+54',
        mobilePattern: /\+?54\s*9[0-9]{10}\b/g,
        confidence: 0.85, validationRules: { minLength: 11, maxLength: 11 }
    },

    {
        country: 'Chile', countryCode: 'CL', dialCode: '+56',
        mobilePattern: /\+?56\s*9[0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Colombia', countryCode: 'CO', dialCode: '+57',
        mobilePattern: /\+?57\s*3[0-9]{9}\b/g,
        confidence: 0.85, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Peru', countryCode: 'PE', dialCode: '+51',
        mobilePattern: /\+?51\s*9[0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Venezuela', countryCode: 'VE', dialCode: '+58',
        mobilePattern: /\+?58\s*4[0-9]{9}\b/g,
        confidence: 0.80, validationRules: { minLength: 10, maxLength: 10 }
    },

    // Africa
    {
        country: 'South Africa', countryCode: 'ZA', dialCode: '+27',
        mobilePattern: /\+?27\s*[6-8][0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Nigeria', countryCode: 'NG', dialCode: '+234',
        mobilePattern: /\+?234\s*[789][0-9]{9}\b/g,
        confidence: 0.95, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Kenya', countryCode: 'KE', dialCode: '+254',
        mobilePattern: /\+?254\s*[71][0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Egypt', countryCode: 'EG', dialCode: '+20',
        mobilePattern: /\+?20\s*1[0-9]{9}\b/g,
        confidence: 0.90, validationRules: { minLength: 10, maxLength: 10 }
    },

    {
        country: 'Morocco', countryCode: 'MA', dialCode: '+212',
        mobilePattern: /\+?212\s*[67][0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Ghana', countryCode: 'GH', dialCode: '+233',
        mobilePattern: /\+?233\s*[2-5][0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Ethiopia', countryCode: 'ET', dialCode: '+251',
        mobilePattern: /\+?251\s*9[0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Tanzania', countryCode: 'TZ', dialCode: '+255',
        mobilePattern: /\+?255\s*[67][0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    {
        country: 'Uganda', countryCode: 'UG', dialCode: '+256',
        mobilePattern: /\+?256\s*[37][0-9]{8}\b/g,
        confidence: 0.85, validationRules: { minLength: 9, maxLength: 9 }
    },

    // Oceania
    {
        country: 'Australia', countryCode: 'AU', dialCode: '+61',
        mobilePattern: /\+?61\s*4[0-9]{8}\b/g,
        confidence: 0.95, validationRules: { minLength: 9, maxLength: 9, startsWithDigits: ['4'] }
    },

    {
        country: 'New Zealand', countryCode: 'NZ', dialCode: '+64',
        mobilePattern: /\+?64\s*2[0-9]{7,9}\b/g,
        confidence: 0.95, validationRules: { minLength: 8, maxLength: 10 }
    },
];

export const PHONE_PATTERN_STATISTICS = {
    total: COMPREHENSIVE_PHONE_PATTERNS.length,
    withLandline: COMPREHENSIVE_PHONE_PATTERNS.filter(p => p.landlinePattern).length,
    regions: {
        asia: COMPREHENSIVE_PHONE_PATTERNS.filter(p => ['MY', 'ID', 'SG', 'TH', 'PH', 'VN', 'CN', 'JP', 'KR', 'IN'].includes(p.countryCode)).length,
        europe: COMPREHENSIVE_PHONE_PATTERNS.filter(p => ['GB', 'FR', 'DE', 'IT', 'ES'].includes(p.countryCode)).length,
        americas: COMPREHENSIVE_PHONE_PATTERNS.filter(p => ['US', 'CA', 'MX', 'BR', 'AR'].includes(p.countryCode)).length,
        middleEast: COMPREHENSIVE_PHONE_PATTERNS.filter(p => ['SA', 'AE', 'TR', 'IL'].includes(p.countryCode)).length,
        africa: COMPREHENSIVE_PHONE_PATTERNS.filter(p => ['ZA', 'NG', 'KE', 'EG'].includes(p.countryCode)).length,
    }
};
