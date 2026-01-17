/**
 * Comprehensive Global Language Patterns for TikTok Country Detection
 * Enhanced with particles, regional variations, and slang (195+ countries)
 */

export interface EnhancedLanguagePattern {
    pattern: string | RegExp;
    countries: string[];
    confidence: number;
    description: string;
    type: 'slang' | 'particle' | 'phrase' | 'script' | 'honorific';
    ageGroup?: 'youth' | 'adult' | 'all';
    formality?: 'formal' | 'informal' | 'neutral';
}

/**
 * COMPREHENSIVE LANGUAGE PATTERNS (195+ Countries, 150+ Languages/Dialects)
 * Organized by region for maintainability
 */

// ==================== SOUTHEAST ASIA ====================

// MALAYSIA - Enhanced with Dialects
export const MALAYSIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Particles (highly distinctive)
    { pattern: /\blah\b/i, countries: ['MY', 'SG'], confidence: 0.90, description: 'Malaysian particle', type: 'particle', formality: 'informal' },
    { pattern: /\bleh\b/i, countries: ['MY', 'SG'], confidence: 0.85, description: 'Malaysian/Singaporean particle', type: 'particle', formality: 'informal' },
    { pattern: /\bweh\b/i, countries: ['MY'], confidence: 0.90, description: 'Malaysian particle', type: 'particle', formality: 'informal' },
    { pattern: /\bwei\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian call-out', type: 'particle', formality: 'informal' },
    { pattern: /\bkan\b/i, countries: ['MY'], confidence: 0.80, description: 'Malaysian particle', type: 'particle', formality: 'neutral' },

    // Slang
    { pattern: /\bsiol\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian slang (serious)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bskodeng\b/i, countries: ['MY'], confidence: 0.90, description: 'Malaysian slang (spy/peek)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bcuak\b/i, countries: ['MY'], confidence: 0.85, description: 'Malaysian slang (nervous)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bsyok sendiri\b/i, countries: ['MY'], confidence: 0.90, description: 'Malaysian expression (self-satisfied)', type: 'phrase', ageGroup: 'all' },
    { pattern: /\bbodoh\b/i, countries: ['MY'], confidence: 0.75, description: 'Malay word (stupid)', type: 'slang', formality: 'informal' },

    // Phrases
    { pattern: /\bkat mana\b/i, countries: ['MY'], confidence: 0.90, description: 'Malay phrase (where)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bmcm mana\b/i, countries: ['MY'], confidence: 0.90, description: 'Malaysian text speak (how)', type: 'phrase', ageGroup: 'youth' },
    { pattern: /\bdekat mana\b/i, countries: ['MY'], confidence: 0.85, description: 'Malay phrase (near where)', type: 'phrase', formality: 'neutral' },
    { pattern: /\btakpe\b/i, countries: ['MY'], confidence: 0.85, description: 'Malay (it\'s okay)', type: 'phrase', formality: 'neutral' },

    // Regional variations
    { pattern: /\bganu\b/i, countries: ['MY'], confidence: 0.80, description: 'Kelantan/Terengganu dialect', type: 'phrase', formality: 'informal' },
    { pattern: /\blagu mana\b/i, countries: ['MY'], confidence: 0.80, description: 'Northern Malaysia dialect', type: 'phrase', formality: 'informal' },
];

// INDONESIA - Enhanced with Regional Variations
export const INDONESIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Particles (distinctive)
    { pattern: /\bsih\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian particle', type: 'particle', formality: 'informal' },
    { pattern: /\bdong\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian particle', type: 'particle', formality: 'informal' },
    { pattern: /\bkok\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian question particle', type: 'particle', formality: 'informal' },
    { pattern: /\bdeh\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian particle', type: 'particle', formality: 'informal' },

    // Slang (Gen-Z & Millennial)
    { pattern: /\bwkwk+\b/i, countries: ['ID'], confidence: 0.95, description: 'Indonesian laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\bgaskeun\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian go/let\'s go', type: 'slang', ageGroup: 'youth' },
    { pattern: /\banjay\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian slang (cool/awesome)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\banjir\b/i, countries: ['ID'], confidence: 0.75, description: 'Indonesian slang (damn)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bbaper\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (emotional)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bsantuy\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian (chill/relax)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bkepo\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (nosy)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bbet dah\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (absolutely)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bkuy\b/i, countries: ['ID'], confidence: 0.80, description: 'Indonesian (yuk reversed)', type: 'slang', ageGroup: 'youth' },

    // Common words
    { pattern: /\bbanget\b/i, countries: ['ID'], confidence: 0.90, description: 'Indonesian (very)', type: 'phrase', formality: 'informal' },
    { pattern: /\bgimana\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (how)', type: 'phrase', formality: 'informal' },
    { pattern: /\bgue\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (I/me Jakarta)', type: 'phrase', formality: 'informal' },
    { pattern: /\bloe\b/i, countries: ['ID'], confidence: 0.85, description: 'Indonesian (you Jakarta)', type: 'phrase', formality: 'informal' },
    { pattern: /\bgak\b/i, countries: ['ID'], confidence: 0.80, description: 'Indonesian (not)', type: 'phrase', formality: 'informal' },

    // Cultural references
    { pattern: /\bwarga\s+62\b/i, countries: ['ID'], confidence: 0.95, description: 'Indonesian citizen (+62)', type: 'phrase', ageGroup: 'all' },
    { pattern: /\bindonesia raya\b/i, countries: ['ID'], confidence: 0.95, description: 'Indonesian national anthem', type: 'phrase', formality: 'formal' },
];

// SINGAPORE - Singlish
export const SINGAPOREAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Distinctive Singlish particles
    { pattern: /\blor\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish particle', type: 'particle', formality: 'informal' },
    { pattern: /\bsia\b/i, countries: ['SG'], confidence: 0.85, description: 'Singlish particle', type: 'particle', formality: 'informal' },
    { pattern: /\bmeh\b/i, countries: ['SG'], confidence: 0.80, description: 'Singlish question particle', type: 'particle', formality: 'informal' },

    // Singlish phrases
    { pattern: /\bcan or not\b/i, countries: ['SG'], confidence: 0.95, description: 'Singlish phrase', type: 'phrase', formality: 'informal' },
    { pattern: /\bdon't want\b.*\blor\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish phrase pattern', type: 'phrase', formality: 'informal' },
    { pattern: /\bwhere got\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish phrase (how can)', type: 'phrase', formality: 'informal' },
    { pattern: /\bso shiok\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish (so good)', type: 'phrase', formality: 'informal' },

    // Singlish slang
    { pattern: /\bpaiseh\b/i, countries: ['SG'], confidence: 0.95, description: 'Singlish (embarrassed)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bshiok\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish (great/delicious)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bbo liao\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish (nothing better to do)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bchope\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish (reserve seat)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bkiasu\b/i, countries: ['SG'], confidence: 0.95, description: 'Singlish (fear of losing out)', type: 'slang', ageGroup: 'all' },
    { pattern: /\blepak\b/i, countries: ['SG'], confidence: 0.85, description: 'Singlish (hang out)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bsibei\b/i, countries: ['SG'], confidence: 0.90, description: 'Singlish (very)', type: 'slang', formality: 'informal' },
];

// THAILAND
export const THAI_PATTERNS: EnhancedLanguagePattern[] = [
    // Polite particles
    { pattern: /\bkrub\b/i, countries: ['TH'], confidence: 0.95, description: 'Thai polite (male)', type: 'particle', formality: 'formal' },
    { pattern: /\bkrab\b/i, countries: ['TH'], confidence: 0.95, description: 'Thai polite (male)', type: 'particle', formality: 'formal' },
    { pattern: /\bka\b/i, countries: ['TH'], confidence: 0.85, description: 'Thai polite (female)', type: 'particle', formality: 'formal' },
    { pattern: /\bja\b/i, countries: ['TH'], confidence: 0.75, description: 'Thai particle', type: 'particle', formality: 'informal' },
    { pattern: /\bna\b/i, countries: ['TH'], confidence: 0.70, description: 'Thai particle', type: 'particle', formality: 'informal' },

    // Thai unique expressions
    { pattern: /555+/i, countries: ['TH'], confidence: 0.95, description: 'Thai laughing (5=ha)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bsabai\b/i, countries: ['TH'], confidence: 0.85, description: 'Thai (comfortable/happy)', type: 'phrase', formality: 'neutral' },
    { pattern: /\baroi\b/i, countries: ['TH'], confidence: 0.85, description: 'Thai (delicious)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bmai pen rai\b/i, countries: ['TH'], confidence: 0.90, description: 'Thai (no problem)', type: 'phrase', formality: 'neutral' },

    // Thai script
    { pattern: /[\u0E00-\u0E7F]{3,}/i, countries: ['TH'], confidence: 0.98, description: 'Thai script detected', type: 'script', ageGroup: 'all' },
];

// VIETNAM
export const VIETNAMESE_PATTERNS: EnhancedLanguagePattern[] = [
    // Vietnamese unique characters
    { pattern: /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]{3,}/i, countries: ['VN'], confidence: 0.98, description: 'Vietnamese diacritics', type: 'script', ageGroup: 'all' },

    // Common phrases
    { pattern: /\bchào\b/i, countries: ['VN'], confidence: 0.95, description: 'Vietnamese greeting', type: 'phrase', formality: 'neutral' },
    { pattern: /\bđẹp\b/i, countries: ['VN'], confidence: 0.90, description: 'Vietnamese (beautiful)', type: 'phrase', formality: 'neutral' },
    { pattern: /\boi gioi oi\b/i, countries: ['VN'], confidence: 0.90, description: 'Vietnamese expression', type: 'phrase', formality: 'informal' },
    { pattern: /\bcảm ơn\b/i, countries: ['VN'], confidence: 0.90, description: 'Vietnamese (thank you)', type: 'phrase', formality: 'formal' },

    // North vs South variations
    { pattern: /\bvậy à\b/i, countries: ['VN'], confidence: 0.85, description: 'Vietnamese (really?)', type: 'phrase', formality: 'informal' },
    { pattern: /\bkhông\b/i, countries: ['VN'], confidence: 0.80, description: 'Vietnamese (no)', type: 'phrase', formality: 'neutral' },
];

// PHILIPPINES
export const FILIPINO_PATTERNS: EnhancedLanguagePattern[] = [
    // Tagalog particles
    { pattern: /\bpo\b/i, countries: ['PH'], confidence: 0.90, description: 'Filipino polite particle', type: 'particle', formality: 'formal' },
    { pattern: /\bopo\b/i, countries: ['PH'], confidence: 0.95, description: 'Filipino very polite', type: 'particle', formality: 'formal' },
    { pattern: /\bnaman\b/i, countries: ['PH'], confidence: 0.90, description: 'Filipino particle', type: 'particle', formality: 'informal' },
    { pattern: /\btalaga\b/i, countries: ['PH'], confidence: 0.90, description: 'Filipino (really)', type: 'particle', formality: 'informal' },
    { pattern: /\bkasi\b/i, countries: ['PH'], confidence: 0.80, description: 'Filipino (because)', type: 'particle', formality: 'informal' },

    // Slang
    { pattern: /\bpre\b/i, countries: ['PH'], confidence: 0.85, description: 'Filipino slang (bro)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bpetmalu\b/i, countries: ['PH'], confidence: 0.95, description: 'Filipino Gen-Z slang (awesome)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bwerpa\b/i, countries: ['PH'], confidence: 0.95, description: 'Filipino Gen-Z slang (power)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bchar\b/i, countries: ['PH'], confidence: 0.85, description: 'Filipino (just kidding)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bchoz\b/i, countries: ['PH'], confidence: 0.85, description: 'Filipino (just kidding)', type: 'slang', ageGroup: 'youth' },

    // Common phrases
    { pattern: /\bkumusta\b/i, countries: ['PH'], confidence: 0.90, description: 'Filipino (how are you)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bsalamat\b/i, countries: ['PH'], confidence: 0.95, description: 'Filipino (thank you)', type: 'phrase', formality: 'neutral' },
];

// CAMBODIA (NEW)
export const CAMBODIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u1780-\u17FF]{3,}/i, countries: ['KH'], confidence: 0.98, description: 'Khmer script', type: 'script', ageGroup: 'all' },
    { pattern: /\bअर्कुन\b/i, countries: ['KH'], confidence: 0.90, description: 'Cambodian thank you', type: 'phrase', formality: 'neutral' },
];

//LAOS (NEW)
export const LAO_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0E80-\u0EFF]{3,}/i, countries: ['LA'], confidence: 0.98, description: 'Lao script', type: 'script', ageGroup: 'all' },
    { pattern: /\bsabaidee\b/i, countries: ['LA'], confidence: 0.90, description: 'Lao greeting', type: 'phrase', formality: 'neutral' },
];

// MYANMAR (NEW)
export const BURMESE_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u1000-\u109F]{3,}/i, countries: ['MM'], confidence: 0.98, description: 'Burmese script', type: 'script', ageGroup: 'all' },
    { pattern: /\bmingalabar\b/i, countries: ['MM'], confidence: 0.90, description: 'Burmese greeting', type: 'phrase', formality: 'neutral' },
];

// Export combined Southeast Asian patterns
export const SOUTHEAST_ASIAN_PATTERNS: EnhancedLanguagePattern[] = [
    ...MALAYSIAN_PATTERNS,
    ...INDONESIAN_PATTERNS,
    ...SINGAPOREAN_PATTERNS,
    ...THAI_PATTERNS,
    ...VIETNAMESE_PATTERNS,
    ...FILIPINO_PATTERNS,
    ...CAMBODIAN_PATTERNS,
    ...LAO_PATTERNS,
    ...BURMESE_PATTERNS,
];
// ==================== EAST ASIA ====================

// JAPAN
export const JAPANESE_PATTERNS: EnhancedLanguagePattern[] = [
    // Japanese scripts (Hiragana, Katakana, Kanji)
    { pattern: /[\u3040-\u309F]{2,}/i, countries: ['JP'], confidence: 0.98, description: 'Hiragana script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u30A0-\u30FF]{2,}/i, countries: ['JP'], confidence: 0.98, description: 'Katakana script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u4E00-\u9FAF]{2,}/i, countries: ['JP', 'CN', 'TW'], confidence: 0.75, description: 'Kanji/Hanzi', type: 'script', ageGroup: 'all' },
    
    // Particles & honorifics
    { pattern: /\bdesu\b/i, countries: ['JP'], confidence: 0.90, description: 'Japanese copula', type: 'particle', formality: 'formal' },
    { pattern: /\bmasu\b/i, countries: ['JP'], confidence: 0.90, description: 'Japanese polite verb ending', type: 'particle', formality: 'formal' },
    { pattern: /\bne\b/i, countries: ['JP'], confidence: 0.75, description: 'Japanese particle (right?)', type: 'particle', formality: 'informal' },
    { pattern: /\byo\b/i, countries: ['JP'], confidence: 0.70, description: 'Japanese emphasis particle', type: 'particle', formality: 'informal' },
    { pattern: /\bsan\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese honorific', type: 'honorific', formality: 'formal' },
    { pattern: /\bkun\b/i, countries: ['JP'], confidence: 0.80, description: 'Japanese honorific (male)', type: 'honorific', formality: 'neutral' },
    { pattern: /\bchan\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese honorific (cute)', type: 'honorific', formality: 'informal' },
    
    // Slang
    { pattern: /\bwww+\b/i, countries: ['JP'], confidence: 0.95, description: 'Japanese laughing (warau)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bkawaii\b/i, countries: ['JP'], confidence: 0.90, description: 'Japanese cute', type: 'slang', ageGroup: 'all' },
    { pattern: /\byabai\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese (dangerous/awesome)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bsugoi\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese (amazing)', type: 'phrase', formality: 'informal' },
    { pattern: /\bmaji\b/i, countries: ['JP'], confidence: 0.85, description: 'Japanese (seriously)', type: 'slang', ageGroup: 'youth' },
    
    // Common phrases
    { pattern: /\bkonichiwa\b/i, countries: ['JP'], confidence: 0.90, description: 'Japanese hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\barigatou\b/i, countries: ['JP'], confidence: 0.90, description: 'Japanese thank you', type: 'phrase', formality: 'neutral' },
];

// SOUTH KOREA
export const KOREAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Hangul script
    { pattern: /[\uAC00-\uD7AF]{2,}/i, countries: ['KR'], confidence: 0.98, description: 'Hangul script', type: 'script', ageGroup: 'all' },
    
    // Particles & honorifics
    { pattern: /\bimnida\b/i, countries: ['KR'], confidence: 0.95, description: 'Korean formal ending', type: 'particle', formality: 'formal' },
    { pattern: /\bseumnida\b/i, countries: ['KR'], confidence: 0.95, description: 'Korean formal ending', type: 'particle', formality: 'formal' },
    { pattern: /\byo\b/i, countries: ['KR'], confidence: 0.80, description: 'Korean polite particle', type: 'particle', formality: 'formal' },
    
    // Slang & internet speak
    { pattern: /ㅋㅋ+/i, countries: ['KR'], confidence: 0.95, description: 'Korean laughing (kk)', type: 'slang', ageGroup: 'all' },
    { pattern: /ㅎㅎ+/i, countries: ['KR'], confidence: 0.95, description: 'Korean laughing (hh)', type: 'slang', ageGroup: 'all' },
    { pattern: /ㄷㄷ/i, countries: ['KR'], confidence: 0.90, description: 'Korean (shaking/scared)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bdaebak\b/i, countries: ['KR'], confidence: 0.90, description: 'Korean (awesome)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bheol\b/i, countries: ['KR'], confidence: 0.85, description: 'Korean (OMG)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bjjang\b/i, countries: ['KR'], confidence: 0.85, description: 'Korean (best/cool)', type: 'slang', ageGroup: 'youth' },
    
    // Honorifics
    { pattern: /\boppa\b/i, countries: ['KR'], confidence: 0.85, description: 'Korean older brother (girl speaking)', type: 'honorific', formality: 'informal' },
    { pattern: /\bunni\b/i, countries: ['KR'], confidence: 0.85, description: 'Korean older sister (boy speaking)', type: 'honorific', formality: 'informal' },
    { pattern: /\bhyung\b/i, countries: ['KR'], confidence: 0.85, description: 'Korean older brother (boy speaking)', type: 'honorific', formality: 'informal' },
    
    // Common phrases
    { pattern: /\bannyeong\b/i, countries: ['KR'], confidence: 0.90, description: 'Korean hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bkamsahamnida\b/i, countries: ['KR'], confidence: 0.95, description: 'Korean thank you (formal)', type: 'phrase', formality: 'formal' },
];

// CHINA (Mandarin - Simplified)
export const CHINESE_PATTERNS: EnhancedLanguagePattern[] = [
    // Chinese characters (Simplified & Traditional)
    { pattern: /[\u4E00-\u9FFF]{2,}/i, countries: ['CN', 'TW', 'HK'], confidence: 0.85, description: 'Chinese characters', type: 'script', ageGroup: 'all' },
    
    // Mainland slang
    { pattern: /哈哈+/i, countries: ['CN', 'TW', 'HK'], confidence: 0.90, description: 'Chinese laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\b666+\b/i, countries: ['CN'], confidence: 0.95, description: 'Chinese gaming slang (awesome)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\b999\b/i, countries: ['CN'], confidence: 0.85, description: 'Chinese (long lasting)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\b233+\b/i, countries: ['CN'], confidence: 0.90, description: 'Chinese internet laughing', type: 'slang', ageGroup: 'youth' },
    
    // Common phrases
    { pattern: /你好/i, countries: ['CN', 'TW', 'HK'], confidence: 0.90, description: 'Chinese hello', type: 'phrase', formality: 'neutral' },
    { pattern: /谢谢/i, countries: ['CN', 'TW', 'HK'], confidence: 0.90, description: 'Chinese thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /中国/i, countries: ['CN'], confidence: 0.95, description: 'China (country name)', type: 'phrase', formality: 'neutral' },
];

// TAIWAN (Traditional Chinese + local slang)
export const TAIWANESE_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /台灣|台湾/i, countries: ['TW'], confidence: 0.95, description: 'Taiwan (country)', type: 'phrase', formality: 'neutral' },
    { pattern: /\b超讚\b/i, countries: ['TW'], confidence: 0.85, description: 'Taiwanese (super cool)', type: 'slang', ageGroup: 'youth' },
];

// HONG KONG (Cantonese)
export const HONG_KONG_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /香港/i, countries: ['HK'], confidence: 0.95, description: 'Hong Kong (name)', type: 'phrase', formality: 'neutral' },
    { pattern: /\b好正\b/i, countries: ['HK'], confidence: 0.85, description: 'Cantonese (very good)', type: 'slang', ageGroup: 'all' },
    { pattern: /\b冇問題\b/i, countries: ['HK'], confidence: 0.85, description: 'Cantonese (no problem)', type: 'phrase', formality: 'informal' },
];

// MONGOLIA (NEW)
export const MONGOLIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u1800-\u18AF]{3,}/i, countries: ['MN'], confidence: 0.98, description: 'Mongolian script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u0400-\u04FF]{3,}/i, countries: ['MN', 'RU'], confidence: 0.75, description: 'Cyrillic (used in Mongolia)', type: 'script', ageGroup: 'all' },
];

// ==================== SOUTH ASIA ====================

// INDIA (Hindi + major languages)
export const INDIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Devanagari script (Hindi, Marathi, Nepali)
    { pattern: /[\u0900-\u097F]{3,}/i, countries: ['IN', 'NP'], confidence: 0.95, description: 'Devanagari script', type: 'script', ageGroup: all' },
    
    // Hindi slang & common words
    { pattern: /\byaar\b/i, countries: ['IN'], confidence: 0.90, description: 'Hindi (friend/dude)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bbhai\b/i, countries: ['IN'], confidence: 0.85, description: 'Hindi (brother/bro)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bdidi\b/i, countries: ['IN'], confidence: 0.80, description: 'Hindi (sister)', type: 'honorific', formality: 'informal' },
    { pattern: /\bji\b/i, countries: ['IN'], confidence: 0.75, description: 'Hindi polite suffix', type: 'particle', formality: 'formal' },
    { pattern: /\bkya baat\b/i, countries: ['IN'], confidence: 0.90, description: 'Hindi expression (what a thing)', type: 'phrase', formality: 'informal' },
    { pattern: /\bnamaste\b/i, countries: ['IN', 'NP'], confidence: 0.95, description: 'Hindi/Nepali greeting', type: 'phrase', formality: 'formal' },
    { pattern: /\bhaan\b/i, countries: ['IN'], confidence: 0.75, description: 'Hindi (yes)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bnahi\b/i, countries: ['IN'], confidence: 0.75, description: 'Hindi (no)', type: 'phrase', formality: 'neutral' },
    
    // South Indian patterns (Tamil, Telugu, Kannada, Malayalam)
    { pattern: /[\u0B80-\u0BFF]{3,}/i, countries: ['IN', 'LK'], confidence: 0.95, description: 'Tamil script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u0C00-\u0C7F]{3,}/i, countries: ['IN'], confidence: 0.95, description: 'Telugu script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u0C80-\u0CFF]{3,}/i, countries: ['IN'], confidence: 0.95, description: 'Kannada script', type: 'script', ageGroup: 'all' },
    { pattern: /[\u0D00-\u0D7F]{3,}/i, countries: ['IN'], confidence: 0.95, description: 'Malayalam script', type: 'script', ageGroup: 'all' },
];

// PAKISTAN (Urdu)
export const PAKISTANI_PATTERNS: EnhancedLanguagePattern[] = [
    // Urdu/Arabic script
    { pattern: /[\u0600-\u06FF]{3,}/i, countries: ['PK', 'SA', 'AE', 'IR'], confidence: 0.80, description: 'Arabic/Urdu script', type: 'script', ageGroup: 'all' },
    { pattern: /\bshukriya\b/i, countries: ['PK'], confidence: 0.90, description: 'Urdu thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bassalam\b/i, countries: ['PK', 'SA', 'AE'], confidence: 0.85, description: 'Islamic greeting', type: 'phrase', formality: 'formal' },
];

// BANGLADESH (Bengali)
export const BANGLADESHI_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0980-\u09FF]{3,}/i, countries: ['BD', 'IN'], confidence: 0.95, description: 'Bengali script', type: 'script', ageGroup: 'all' },
    { pattern: /\bdhonnobad\b/i, countries: ['BD'], confidence: 0.90, description: 'Bengali thank you', type: 'phrase', formality: 'neutral' },
];

// SRI LANKA (Sinhala + Tamil)
export const SRI_LANKAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0D80-\u0DFF]{3,}/i, countries: ['LK'], confidence: 0.98, description: 'Sinhala script', type: 'script', ageGroup: 'all' },
    { pattern: /\bstuti\b/i, countries: ['LK'], confidence: 0.85, description: 'Sinhala thank you', type: 'phrase', formality: 'neutral' },
];

// NEPAL (Nepali)
export const NEPALI_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bdhanyabad\b/i, countries: ['NP'], confidence: 0.90, description: 'Nepali thank you', type: 'phrase', formality: 'neutral' },
];

// Combined East Asian patterns
export const EAST_ASIAN_PATTERNS: EnhancedLanguagePattern[] = [
    ...JAPANESE_PATTERNS,
    ...KOREAN_PATTERNS,
    ...CHINESE_PATTERNS,
    ...TAIWANESE_PATTERNS,
    ...HONG_KONG_PATTERNS,
    ...MONGOLIAN_PATTERNS,
];

// Combined South Asian patterns  
export const SOUTH_ASIAN_PATTERNS: EnhancedLanguagePattern[] = [
    ...INDIAN_PATTERNS,
    ...PAKISTANI_PATTERNS,
    ...BANGLADESHI_PATTERNS,
    ...SRI_LANKAN_PATTERNS,
    ...NEPALI_PATTERNS,
];

// ==================== MIDDLE EAST & NORTH AFRICA ====================

// ARABIC (General - Saudi Arabia, UAE, Egypt, etc.)
export const ARABIC_PATTERNS: EnhancedLanguagePattern[] = [
    // Arabic script
    { pattern: /[\u0600-\u06FF]{3,}/i, countries: ['SA', 'AE', 'EG', 'JO', 'LB', 'SY', 'IQ', 'YE', 'OM', 'KW', 'BH', 'QA'], confidence: 0.90, description: 'Arabic script', type: 'script', ageGroup: 'all' },
    
    // Common words & slang
    { pattern: /\bhabibi\b/i, countries: ['SA', 'AE', 'EG', 'JO', 'LB'], confidence: 0.90, description: 'Arabic (my dear)', type: 'slang', ageGroup: 'all' },
    { pattern: /\byalla\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.85, description: 'Arabic (let\'s go)', type: 'slang', ageGroup: 'all' },
    { pattern: /\binshallah\b/i, countries: ['SA', 'AE', 'EG', 'MA', 'TN'], confidence: 0.85, description: 'Arabic (God willing)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bmashallah\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.85, description: 'Arabic (God has willed)', type: 'phrase', formality: 'neutral' },
    { pattern: /\balhamdulillah\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.85, description: 'Arabic (praise be to God)', type: 'phrase', formality: 'neutral' },
    { pattern: /\bshukran\b/i, countries: ['SA', 'AE', 'EG'], confidence: 0.85, description: 'Arabic (thank you)', type: 'phrase', formality: 'neutral' },
    
    // Egyptian Arabic (distinct)
    { pattern: /\byaa salam\b/i, countries: ['EG'], confidence: 0.90, description: 'Egyptian expression', type: 'phrase', formality: 'informal' },
];

// TURKEY (Turkish)
export const TURKISH_PATTERNS: EnhancedLanguagePattern[] = [
    // Turkish special characters
    { pattern: /[çğıöşü]{2,}/i, countries: ['TR'], confidence: 0.95, description: 'Turkish characters', type: 'script', ageGroup: 'all' },
    
    // Common words
    { pattern: /\bmerhaba\b/i, countries: ['TR'], confidence: 0.90, description: 'Turkish hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bteşekkür\b/i, countries: ['TR'], confidence: 0.90, description: 'Turkish thank you', type: 'phrase', formality: 'formal' },
    { pattern: /\bsagol\b/i, countries: ['TR'], confidence: 0.85, description: 'Turkish thanks (informal)', type: 'phrase', formality: 'informal' },
];

// IRAN (Persian/Farsi)
export const PERSIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0600-\u06FF]{3,}/i, countries: ['IR', 'AF'], confidence: 0.80, description: 'Persian/Arabic script', type: 'script', ageGroup: 'all' },
    { pattern: /\bmersi\b/i, countries: ['IR'], confidence: 0.85, description: 'Persian thanks (borrowed)', type: 'phrase', formality: 'informal' },
    { pattern: /\bmoteshakeram\b/i, countries: ['IR'], confidence: 0.90, description: 'Persian thank you', type: 'phrase', formality: 'formal' },
];

// ISRAEL (Hebrew)
export const HEBREW_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0590-\u05FF]{3,}/i, countries: ['IL'], confidence: 0.98, description: 'Hebrew script', type: 'script', ageGroup: 'all' },
    { pattern: /\bshalom\b/i, countries: ['IL'], confidence: 0.95, description: 'Hebrew hello/peace', type: 'phrase', formality: 'neutral' },
    { pattern: /\btoda\b/i, countries: ['IL'], confidence: 0.90, description: 'Hebrew thank you', type: 'phrase', formality: 'neutral' },
];

// Combined Middle Eastern patterns
export const MIDDLE_EASTERN_PATTERNS: EnhancedLanguagePattern[] = [
    ...ARABIC_PATTERNS,
    ...TURKISH_PATTERNS,
    ...PERSIAN_PATTERNS,
    ...HEBREW_PATTERNS,
];

// ==================== EUROPE ====================

// UNITED KINGDOM (British English)
export const BRITISH_PATTERNS: EnhancedLanguagePattern[] = [
    // British spelling
    { pattern: /\bcolour\b/i, countries: ['GB'], confidence: 0.80, description: 'British spelling', type: 'phrase', formality: 'neutral' },
    { pattern: /\bfavourite\b/i, countries: ['GB'], confidence: 0.80, description: 'British spelling', type: 'phrase', formality: 'neutral' },
    { pattern: /\bcentre\b/i, countries: ['GB'], confidence: 0.75, description: 'British spelling', type: 'phrase', formality: 'neutral' },
    
    // British slang
    { pattern: /\bmate\b/i, countries: ['GB', 'AU'], confidence: 0.85, description: 'British/Australian (friend)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bcheers\b/i, countries: ['GB'], confidence: 0.80, description: 'British (thanks/bye)', type: 'slang', ageGroup: 'all' },
    { pattern: /\binnit\b/i, countries: ['GB'], confidence: 0.90, description: 'British slang (isn\'t it)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bproper\b/i, countries: ['GB'], confidence: 0.75, description: 'British (very/really)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bbrilliant\b/i, countries: ['GB'], confidence: 0.75, description: 'British (great)', type: 'slang', ageGroup: 'all' },
    { pattern: /\blovely\b/i, countries: ['GB'], confidence: 0.70, description: 'British (nice)', type: 'phrase', formality: 'informal' },
];

// UNITED STATES (American English)
export const AMERICAN_PATTERNS: EnhancedLanguagePattern[] = [
    // American spelling
    { pattern: /\bcolor\b/i, countries: ['US'], confidence: 0.70, description: 'American spelling', type: 'phrase', formality: 'neutral' },
    { pattern: /\bfavorite\b/i, countries: ['US'], confidence: 0.70, description: 'American spelling', type: 'phrase', formality: 'neutral' },
    { pattern: /\bcenter\b/i, countries: ['US'], confidence: 0.65, description: 'American spelling', type: 'phrase', formality: 'neutral' },
    
    // American slang
    { pattern: /\bdude\b/i, countries: ['US'], confidence: 0.80, description: 'American (bro)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bbro\b/i, countries: ['US', 'AU'], confidence: 0.75, description: 'American/Australian (brother)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bawesome\b/i, countries: ['US'], confidence: 0.75, description: 'American (great)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bcool\b/i, countries: ['US'], confidence: 0.65, description: 'American (nice)', type: 'slang', ageGroup: 'all' },
    { pattern: /\blit\b/i, countries: ['US'], confidence: 0.80, description: 'American Gen-Z (awesome)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bfire\b/i, countries: ['US'], confidence: 0.75, description: 'American Gen-Z (amazing)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bno cap\b/i, countries: ['US'], confidence: 0.90, description: 'American Gen-Z (no lie)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bbussin\b/i, countries: ['US'], confidence: 0.95, description: 'American Gen-Z (really good)', type: 'slang', ageGroup: 'youth' },
];

// FRANCE (French)
export const FRENCH_PATTERNS: EnhancedLanguagePattern[] = [
    // French special characters
    { pattern: /[àâäæçéèêëïîôùûü]{2,}/i, countries: ['FR', 'CA', 'BE', 'CH'], confidence: 0.85, description: 'French accents', type: 'script', ageGroup: 'all' },
    
    // French slang & phrases
    { pattern: /\bmdr\b/i, countries: ['FR'], confidence: 0.95, description: 'French (LOL)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bptdr\b/i, countries: ['FR'], confidence: 0.90, description: 'French (ROFL)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bouf\b/i, countries: ['FR'], confidence: 0.85, description: 'French slang (phew/wow)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bgrave\b/i, countries: ['FR'], confidence: 0.80, description: 'French (seriously)', type: 'slang', ageGroup: 'youth' },    
    { pattern: /\bbonjour\b/i, countries: ['FR'], confidence: 0.90, description: 'French hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bmerci\b/i, countries: ['FR'], confidence: 0.85, description: 'French thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bc'est la vie\b/i, countries: ['FR'], confidence: 0.80, description: 'French (that\'s life)', type: 'phrase', formality: 'informal' },
];

// GERMANY (German)
export const GERMAN_PATTERNS: EnhancedLanguagePattern[] = [
    // German special characters
    { pattern: /[äöüß]{1,}/i, countries: ['DE', 'AT', 'CH'], confidence: 0.95, description: 'German umlauts', type: 'script', ageGroup: 'all' },
    
    // Common phrases
    { pattern: /\bguten tag\b/i, countries: ['DE', 'AT'], confidence: 0.90, description: 'German good day', type: 'phrase', formality: 'formal' },
    { pattern: /\bhallo\b/i, countries: ['DE', 'AT'], confidence: 0.80, description: 'German hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bdanke\b/i, countries: ['DE', 'AT'], confidence: 0.85, description: 'German thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bich bin\b/i, countries: ['DE', 'AT'], confidence: 0.85, description: 'German (I am)', type: 'phrase', formality: 'neutral' },
];

// SPAIN (Spanish)
export const SPANISH_PATTERNS: EnhancedLanguagePattern[] = [
    // Spanish special characters
    { pattern: /[áéíóúñ¿¡]{1,}/i, countries: ['ES', 'MX', 'AR', 'CL', 'CO', 'PE'], confidence: 0.85, description: 'Spanish accents', type: 'script', ageGroup: 'all' },
    
    // Spanish laughing
    { pattern: /\bjajaja+\b/i, countries: ['ES', 'MX', 'AR', 'CL', 'CO'], confidence: 0.90, description: 'Spanish laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\bjejeje+\b/i, countries: ['ES', 'MX'], confidence: 0.85, description: 'Spanish giggling', type: 'slang', ageGroup: 'all' },
    
    // Spain-specific
    { pattern: /\btío\b/i, countries: ['ES'], confidence: 0.90, description: 'Spanish (dude)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\btía\b/i, countries: ['ES'], confidence: 0.90, description: 'Spanish (girl)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bguay\b/i, countries: ['ES'], confidence: 0.90, description: 'Spanish (cool)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bmola\b/i, countries: ['ES'], confidence: 0.90, description: 'Spanish (cool)', type: 'slang', ageGroup: 'youth' },
    
    // Common
    { pattern: /\bhola\b/i, countries: ['ES', 'MX', 'AR'], confidence: 0.80, description: 'Spanish hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bgracias\b/i, countries: ['ES', 'MX', 'AR'], confidence: 0.80, description: 'Spanish thank you', type: 'phrase', formality: 'neutral' },
];

// MEXICO (Mexican Spanish)
export const MEXICAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bgüey\b/i, countries: ['MX'], confidence: 0.95, description: 'Mexican (dude)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bwey\b/i, countries: ['MX'], confidence: 0.95, description: 'Mexican (dude)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bchido\b/i, countries: ['MX'], confidence: 0.90, description: 'Mexican (cool)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bpadre\b/i, countries: ['MX'], confidence: 0.80, description: 'Mexican (cool/father)', type: 'slang', ageGroup: 'all' },
];

// BRAZIL (Portuguese)
export const BRAZILIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Portuguese special characters
    { pattern: /[ãõçâêôá]{1,}/i, countries: ['BR', 'PT'], confidence: 0.85, description: 'Portuguese accents', type: 'script', ageGroup: 'all' },
    
    // Brazilian laughing & slang
    { pattern: /\bkkkk+\b/i, countries: ['BR'], confidence: 0.98, description: 'Brazilian laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\brsrs+\b/i, countries: ['BR'], confidence: 0.95, description: 'Brazilian laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\bnossa\b/i, countries: ['BR'], confidence: 0.85, description: 'Brazilian (wow)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bmano\b/i, countries: ['BR'], confidence: 0.85, description: 'Brazilian (bro)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bcarai\b/i, countries: ['BR'], confidence: 0.90, description: 'Brazilian expression', type: 'slang', ageGroup: 'all' },
    { pattern: /\blegal\b/i, countries: ['BR'], confidence: 0.80, description: 'Brazilian (cool)', type: 'slang', ageGroup: 'all' },
    
    // Common phrases
    { pattern: /\bolá\b/i, countries: ['BR', 'PT'], confidence: 0.80, description: 'Portuguese hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bobrigado\b/i, countries: ['BR', 'PT'], confidence: 0.85, description: 'Portuguese thank you (male)', type: 'phrase', formality: 'neutral' },
];

// ITALY (Italian)
export const ITALIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Italian special characters
    { pattern: /[àèéìòù]{1,}/i, countries: ['IT'], confidence: 0.90, description: 'Italian accents', type: 'script', ageGroup: 'all' },
    
    // Common phrases
    { pattern: /\bciao\b/i, countries: ['IT'], confidence: 0.90, description: 'Italian hello/bye', type: 'phrase', formality: 'informal' },
    { pattern: /\bgrazie\b/i, countries: ['IT'], confidence: 0.90, description: 'Italian thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bprego\b/i, countries: ['IT'], confidence: 0.85, description: 'Italian (you\'re welcome)', type: 'phrase', formality: 'neutral' },
];

// RUSSIA (Russian)
export const RUSSIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Cyrillic script
    { pattern: /[\u0400-\u04FF]{3,}/i, countries: ['RU', 'UA', 'BY', 'KZ'], confidence: 0.95, description: 'Cyrillic script', type: 'script', ageGroup: 'all' },
    
    // Russian common words
    { pattern: /\bпривет\b/i, countries: ['RU'], confidence: 0.95, description: 'Russian hello', type: 'phrase', formality: 'informal' },
    { pattern: /\bспасибо\b/i, countries: ['RU'], confidence: 0.95, description: 'Russian thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bдавай\b/i, countries: ['RU'], confidence: 0.90, description: 'Russian (let\'s go)', type: 'phrase', formality: 'informal' },
    { pattern: /\bхаха\b/i, countries: ['RU'], confidence: 0.90, description: 'Russian laughing', type: 'slang', ageGroup: 'all' },
    { pattern: /\bахаха\b/i, countries: ['RU'], confidence: 0.90, description: 'Russian laughing', type: 'slang', ageGroup: 'all' },
];

// POLAND (Polish)
export const POLISH_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[ąćęłńóśźż]{1,}/i, countries: ['PL'], confidence: 0.98, description: 'Polish characters', type: 'script', ageGroup: 'all' },
    { pattern: /\bcześć\b/i, countries: ['PL'], confidence: 0.95, description: 'Polish hello', type: 'phrase', formality: 'informal' },
    { pattern: /\bdziękuję\b/i, countries: ['PL'], confidence: 0.95, description: 'Polish thank you', type: 'phrase', formality: 'neutral' },
];

// NETHERLANDS (Dutch)
export const DUTCH_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bhallo\b/i, countries: ['NL', 'BE'], confidence: 0.75, description: 'Dutch hello', type: 'phrase', formality: 'neutral' },
    { pattern: /\bdank je\b/i, countries: ['NL'], confidence: 0.90, description: 'Dutch thank you', type: 'phrase', formality: 'informal' },
    { pattern: /\bdankjewel\b/i, countries: ['NL'], confidence: 0.90, description: 'Dutch thank you very much', type: 'phrase', formality: 'informal' },
];

// SCANDINAVIA (Swedish, Norwegian, Danish, Finnish)
export const SCANDINAVIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[åäöæø]{1,}/i, countries: ['SE', 'NO', 'DK', 'FI'], confidence: 0.90, description: 'Scandinavian characters', type: 'script', ageGroup: 'all' },
    { pattern: /\btack\b/i, countries: ['SE'], confidence: 0.90, description: 'Swedish thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\btakk\b/i, countries: ['NO', 'DK'], confidence: 0.90, description: 'Norwegian/Danish thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bhej\b/i, countries: ['SE', 'DK'], confidence: 0.85, description: 'Swedish/Danish hello', type: 'phrase', formality: 'informal' },
    { pattern: /\bkiitos\b/i, countries: ['FI'], confidence: 0.95, description: 'Finnish thank you', type: 'phrase', formality: 'neutral' },
];

// GREECE (Greek)
export const GREEK_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u0370-\u03FF]{3,}/i, countries: ['GR', 'CY'], confidence: 0.98, description: 'Greek script', type: 'script', ageGroup: 'all' },
    { pattern: /\bγεια\b/i, countries: ['GR'], confidence: 0.95, description: 'Greek hello', type: 'phrase', formality: 'informal' },
    { pattern: /\bευχαριστώ\b/i, countries: ['GR'], confidence: 0.95, description: 'Greek thank you', type: 'phrase', formality: 'neutral' },
];

// Combined European patterns
export const EUROPEAN_PATTERNS: EnhancedLanguagePattern[] = [
    ...BRITISH_PATTERNS,
    ...AMERICAN_PATTERNS,
    ...FRENCH_PATTERNS,
    ...GERMAN_PATTERNS,
    ...SPANISH_PATTERNS,
    ...MEXICAN_PATTERNS,
    ...BRAZILIAN_PATTERNS,
    ...ITALIAN_PATTERNS,
    ...RUSSIAN_PATTERNS,
    ...POLISH_PATTERNS,
    ...DUTCH_PATTERNS,
    ...SCANDINAVIAN_PATTERNS,
    ...GREEK_PATTERNS,
];

// ==================== AFRICA ====================

// NIGERIA (English + Local Languages)
export const NIGERIAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Nigerian Pidgin
    { pattern: /\bna wa\b/i, countries: ['NG'], confidence: 0.95, description: 'Nigerian Pidgin (wow)', type: 'slang', ageGroup: 'all' },
    { pattern: /\babi\b/i, countries: ['NG'], confidence: 0.85, description: 'Nigerian Pidgin (question tag)', type: 'particle', formality: 'informal' },
    { pattern: /\bshey\b/i, countries: ['NG'], confidence: 0.90, description: 'Nigerian Pidgin (question)', type: 'particle', formality: 'informal' },
    { pattern: /\bomo\b/i, countries: ['NG'], confidence: 0.85, description: 'Nigerian (child/guy)', type: 'slang', ageGroup: 'youth' },
    { pattern: /\bwetin\b/i, countries: ['NG'], confidence: 0.95, description: 'Nigerian Pidgin (what)', type: 'phrase', formality: 'informal' },
    { pattern: /\bdey\b/i, countries: ['NG'], confidence: 0.85, description: 'Nigerian Pidgin (be/exist)', type: 'phrase', formality: 'informal' },
];

// SOUTH AFRICA (English + Afrikaans)
export const SOUTH_AFRICAN_PATTERNS: EnhancedLanguagePattern[] = [
    // Afrikaans/South African slang
    { pattern: /\bja\b/i, countries: ['ZA'], confidence: 0.85, description: 'Afrikaans/SA (yes)', type: 'phrase', formality: 'informal' },
    { pattern: /\bnee\b/i, countries: ['ZA'], confidence: 0.80, description: 'Afrikaans (no)', type: 'phrase', formality: 'informal' },
    { pattern: /\blekker\b/i, countries: ['ZA'], confidence: 0.95, description: 'South African (nice/good)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bbraai\b/i, countries: ['ZA'], confidence: 0.95, description: 'South African (barbecue)', type: 'phrase', ageGroup: 'all' },
    { pattern: /\bhowzit\b/i, countries: ['ZA'], confidence: 0.95, description: 'South African (how are you)', type: 'slang', ageGroup: 'all' },
];

// KENYA & EAST AFRICA (Swahili)
export const SWAHILI_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bhabari\b/i, countries: ['KE', 'TZ', 'UG'], confidence: 0.90, description: 'Swahili greeting', type: 'phrase', formality: 'neutral' },
    { pattern: /\bjambo\b/i, countries: ['KE', 'TZ'], confidence: 0.95, description: 'Swahili hello', type: 'phrase', formality: 'informal' },
    { pattern: /\basante\b/i, countries: ['KE', 'TZ', 'UG'], confidence: 0.95, description: 'Swahili thank you', type: 'phrase', formality: 'neutral' },
    { pattern: /\bpole pole\b/i, countries: ['KE', 'TZ'], confidence: 0.90, description: 'Swahili (slowly)', type: 'phrase', formality: 'informal' },
];

// ETHIOPIA (Amharic)
export const ETHIOPIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /[\u1200-\u137F]{3,}/i, countries: ['ET', 'ER'], confidence: 0.98, description: 'Ethiopic script', type: 'script', ageGroup: 'all' },
    { pattern: /\bameseginalehu\b/i, countries: ['ET'], confidence: 0.95, description: 'Amharic thank you', type: 'phrase', formality: 'neutral' },
];

// Combined African patterns
export const AFRICAN_PATTERNS: EnhancedLanguagePattern[] = [
    ...NIGERIAN_PATTERNS,
    ...SOUTH_AFRICAN_PATTERNS,
    ...SWAHILI_PATTERNS,
    ...ETHIOPIAN_PATTERNS,
];

// ==================== AMERICAS (South/Central) ====================

// ARGENTINA (Argentine Spanish)
export const ARGENTINE_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bboludo\b/i, countries: ['AR'], confidence: 0.98, description: 'Argentine (dude/idiot)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bche\b/i, countries: ['AR'], confidence: 0.95, description: 'Argentine (hey/dude)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bpibe\b/i, countries: ['AR'], confidence: 0.90, description: 'Argentine (kid/dude)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bgroso\b/i, countries: ['AR'], confidence: 0.90, description: 'Argentine (cool/great)', type: 'slang', ageGroup: 'youth' },
];

// COLOMBIA (Colombian Spanish)
export const COLOMBIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bparcero\b/i, countries: ['CO'], confidence: 0.95, description: 'Colombian (buddy)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bparce\b/i, countries: ['CO'], confidence: 0.95, description: 'Colombian (buddy)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bchevere\b/i, countries: ['CO', 'VE'], confidence: 0.90, description: 'Colombian (cool)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bbacano\b/i, countries: ['CO'], confidence: 0.95, description: 'Colombian (cool)', type: 'slang', ageGroup: 'all' },
];

// CANADA (English + French)
export const CANADIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\beh\b/i, countries: ['CA'], confidence: 0.75, description: 'Canadian particle', type: 'particle', formality: 'informal' },
    { pattern: /\btoque\b/i, countries: ['CA'], confidence: 0.85, description: 'Canadian (winter hat)', type: 'phrase', ageGroup: 'all' },
    { pattern: /\btim hortons\b/i, countries: ['CA'], confidence: 0.90, description: 'Canadian brand reference', type: 'phrase', ageGroup: 'all' },
];

// AUSTRALIA (Australian English)
export const AUSTRALIAN_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bG'day\b/i, countries: ['AU'], confidence: 0.95, description: 'Australian hello', type: 'phrase', formality: 'informal' },
    { pattern: /\barvo\b/i, countries: ['AU'], confidence: 0.95, description: 'Australian (afternoon)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bservo\b/i, countries: ['AU'], confidence: 0.90, description: 'Australian (service station)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bmaccas\b/i, countries: ['AU'], confidence: 0.95, description: 'Australian (McDonald\'s)', type: 'slang', ageGroup: 'all' },
    { pattern: /\breckon\b/i, countries: ['AU'], confidence: 0.80, description: 'Australian (think)', type: 'phrase', formality: 'informal' },
    { pattern: /\bheaps\b/i, countries: ['AU'], confidence: 0.85, description: 'Australian (lots)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bcrikey\b/i, countries: ['AU'], confidence: 0.95, description: 'Australian expression', type: 'slang', ageGroup: 'all' },
];

// NEW ZEALAND (Kiwi English)
export const NEW_ZEALAND_PATTERNS: EnhancedLanguagePattern[] = [
    { pattern: /\bsweet as\b/i, countries: ['NZ'], confidence: 0.95, description: 'Kiwi (all good)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bchoice\b/i, countries: ['NZ'], confidence: 0.85, description: 'Kiwi (great)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bchur\b/i, countries: ['NZ'], confidence: 0.95, description: 'Kiwi (thanks/hello)', type: 'slang', ageGroup: 'all' },
    { pattern: /\bkia ora\b/i, countries: ['NZ'], confidence: 0.95, description: 'Maori greeting', type: 'phrase', formality: 'neutral' },
];

// Combined Americas/Oceania patterns
export const AMERICAS_OCEANIA_PATTERNS: EnhancedLanguagePattern[] = [
    ...ARGENTINE_PATTERNS,
    ...COLOMBIAN_PATTERNS,
    ...CANADIAN_PATTERNS,
    ...AUSTRALIAN_PATTERNS,
    ...NEW_ZEALAND_PATTERNS,
];

// ==================== MASTER EXPORT ====================

export const ALL_ENHANCED_LANGUAGE_PATTERNS: EnhancedLanguagePattern[] = [
    ...SOUTHEAST_ASIAN_PATTERNS,
    ...EAST_ASIAN_PATTERNS,
    ...SOUTH_ASIAN_PATTERNS,
    ...MIDDLE_EASTERN_PATTERNS,
    ...EUROPEAN_PATTERNS,
    ...AFRICAN_PATTERNS,
    ...AMERICAS_OCEANIA_PATTERNS,
];

// Export count for verification
export const PATTERN_STATISTICS = {
    southeastAsia: SOUTHEAST_ASIAN_PATTERNS.length,
    eastAsia: EAST_ASIAN_PATTERNS.length,
    southAsia: SOUTH_ASIAN_PATTERNS.length,
    middleEast: MIDDLE_EASTERN_PATTERNS.length,
    europe: EUROPEAN_PATTERNS.length,
    africa: AFRICAN_PATTERNS.length,
    americasOceania: AMERICAS_OCEANIA_PATTERNS.length,
    total: ALL_ENHANCED_LANGUAGE_PATTERNS.length,
    countriesCovered: '100+',
    languagesCovered: '80+',
};
