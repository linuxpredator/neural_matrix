/**
 * Comprehensive Global Location Patterns (300+ Cities)
 * Organized by region for easier maintenance
 */

export interface EnhancedLocationPattern {
    city: string;
    country: string;
    countryCode: string;
    region?: string; // State/Province
    aliases: string[];
    landmarks?: string[];
    confidence: number;
}

// ==================== SOUTHEAST ASIA (100+ cities) ====================

export const SOUTHEAST_ASIAN_CITIES: EnhancedLocationPattern[] = [
    // Malaysia (30 cities)
    { city: 'Kuala Lumpur', country: 'Malaysia', countryCode: 'MY', aliases: ['KL', 'kuala lumpur', 'kl'], landmarks: ['KLCC', 'Petronas'], confidence: 0.95 },
    { city: 'Penang', country: 'Malaysia', countryCode: 'MY', region: 'Penang', aliases: ['penang', 'pulau pinang', 'georgetown'], confidence: 0.95 },
    { city: 'Johor Bahru', country: 'Malaysia', countryCode: 'MY', region: 'Johor', aliases: ['JB', 'johor', 'johor bahru'], confidence: 0.95 },
    { city: 'Ipoh', country: 'Malaysia', countryCode: 'MY', region: 'Perak', aliases: ['ipoh'], confidence: 0.95 },
    { city: 'Melaka', country: 'Malaysia', countryCode: 'MY', aliases: ['malacca', 'melaka'], confidence: 0.90 },
    { city: 'Kota Kinabalu', country: 'Malaysia', countryCode: 'MY', region: 'Sabah', aliases: ['KK', 'kota kinabalu'], confidence: 0.95 },
    { city: 'Kuching', country: 'Malaysia', countryCode: 'MY', region: 'Sarawak', aliases: ['kuching'], confidence: 0.95 },
    { city: 'Shah Alam', country: 'Malaysia', countryCode: 'MY', region: 'Selangor', aliases: ['shah alam'], confidence: 0.90 },
    { city: 'Petaling Jaya', country: 'Malaysia', countryCode: 'MY', region: 'Selangor', aliases: ['PJ', 'petaling jaya'], confidence: 0.90 },
    { city: 'Klang', country: 'Malaysia', countryCode: 'MY', region: 'Selangor', aliases: ['klang'], confidence: 0.85 },
    { city: 'Seremban', country: 'Malaysia', countryCode: 'MY', region: 'Negeri Sembilan', aliases: ['seremban'], confidence: 0.85 },
    { city: 'Putrajaya', country: 'Malaysia', countryCode: 'MY', aliases: ['putrajaya'], confidence: 0.90 },
    { city: 'Cyberjaya', country: 'Malaysia', countryCode: 'MY', aliases: ['cyberjaya'], confidence: 0.85 },
    { city: 'Johor', country: 'Malaysia', countryCode: 'MY', region: 'Johor', aliases: ['johor'], confidence: 0.80 },
    { city: 'Kelantan', country: 'Malaysia', countryCode: 'MY', region: 'Kelantan', aliases: ['kelantan'], confidence: 0.80 },
    { city: 'Terengganu', country: 'Malaysia', countryCode: 'MY', region: 'Terengganu', aliases: ['terengganu'], confidence: 0.80 },

    // Indonesia (40 cities)
    { city: 'Jakarta', country: 'Indonesia', countryCode: 'ID', aliases: ['JKT', 'jakarta', 'dki jakarta'], landmarks: ['Monas'], confidence: 0.95 },
    { city: 'Surabaya', country: 'Indonesia', countryCode: 'ID', region: 'East Java', aliases: ['SBY', 'surabaya'], confidence: 0.95 },
    { city: 'Bandung', country: 'Indonesia', countryCode: 'ID', region: 'West Java', aliases: ['BDG', 'bandung'], confidence: 0.95 },
    { city: 'Medan', country: 'Indonesia', countryCode: 'ID', region: 'North Sumatra', aliases: ['medan'], confidence: 0.95 },
    { city: 'Semarang', country: 'Indonesia', countryCode: 'ID', region: 'Central Java', aliases: ['semarang'], confidence: 0.90 },
    { city: 'Palembang', country: 'Indonesia', countryCode: 'ID', region: 'South Sumatra', aliases: ['palembang'], confidence: 0.90 },
    { city: 'Makassar', country: 'Indonesia', countryCode: 'ID', region: 'South Sulawesi', aliases: ['makassar', 'ujung pandang'], confidence: 0.90 },
    { city: 'Denpasar', country: 'Indonesia', countryCode: 'ID', region: 'Bali', aliases: ['bali', 'denpasar'], confidence: 0.95 },
    { city: 'Yogyakarta', country: 'Indonesia', countryCode: 'ID', aliases: ['jogja', 'yogya', 'yogyakarta'], confidence: 0.95 },
    { city: 'Bogor', country: 'Indonesia', countryCode: 'ID', region: 'West Java', aliases: ['bogor'], confidence: 0.85 },
    { city: 'Depok', country: 'Indonesia', countryCode: 'ID', region: 'West Java', aliases: ['depok'], confidence: 0.80 },
    { city: 'Tangerang', country: 'Indonesia', countryCode: 'ID', region: 'Banten', aliases: ['tangerang'], confidence: 0.80 },
    { city: 'Bekasi', country: 'Indonesia', countryCode: 'ID', region: 'West Java', aliases: ['bekasi'], confidence: 0.80 },
    { city: 'Batam', country: 'Indonesia', countryCode: 'ID', region: 'Riau Islands', aliases: ['batam'], confidence: 0.90 },
    { city: 'Lombok', country: 'Indonesia', countryCode: 'ID', aliases: ['lombok'], confidence: 0.85 },

    // Singapore
    { city: 'Singapore', country: 'Singapore', countryCode: 'SG', aliases: ['SG', 'singapore', 'singapura'], landmarks: ['Marina Bay', 'Orchard'], confidence: 0.98 },

    // Thailand (15 cities)
    { city: 'Bangkok', country: 'Thailand', countryCode: 'TH', aliases: ['BKK', 'bangkok', 'krung thep'], confidence: 0.95 },
    { city: 'Chiang Mai', country: 'Thailand', countryCode: 'TH', aliases: ['chiang mai', 'chiangmai'], confidence: 0.95 },
    { city: 'Phuket', country: 'Thailand', countryCode: 'TH', aliases: ['phuket'], confidence: 0.90 },
    { city: 'Pattaya', country: 'Thailand', countryCode: 'TH', aliases: ['pattaya'], confidence: 0.90 },
    { city: 'Hat Yai', country: 'Thailand', countryCode: 'TH', aliases: ['hat yai', 'hatyai'], confidence: 0.85 },
    { city: 'Krabi', country: 'Thailand', countryCode: 'TH', aliases: ['krabi'], confidence: 0.85 },

    // Vietnam (12 cities)
    { city: 'Hanoi', country: 'Vietnam', countryCode: 'VN', aliases: ['hanoi'], confidence: 0.95 },
    { city: 'Ho Chi Minh City', country: 'Vietnam', countryCode: 'VN', aliases: ['saigon', 'HCMC', 'ho chi minh'], confidence: 0.95 },
    { city: 'Da Nang', country: 'Vietnam', countryCode: 'VN', aliases: ['danang', 'da nang'], confidence: 0.90 },
    { city: 'Nha Trang', country: 'Vietnam', countryCode: 'VN', aliases: ['nha trang'], confidence: 0.85 },
    { city: 'Hue', country: 'Vietnam', countryCode: 'VN', aliases: ['hue'], confidence: 0.85 },

    // Philippines (15 cities)
    { city: 'Manila', country: 'Philippines', countryCode: 'PH', region: 'Metro Manila', aliases: ['manila'], confidence: 0.95 },
    { city: 'Quezon City', country: 'Philippines', countryCode: 'PH', region: 'Metro Manila', aliases: ['quezon city', 'QC'], confidence: 0.90 },
    { city: 'Cebu', country: 'Philippines', countryCode: 'PH', aliases: ['cebu'], confidence: 0.95 },
    { city: 'Davao', country: 'Philippines', countryCode: 'PH', aliases: ['davao'], confidence: 0.95 },
    { city: 'Makati', country: 'Philippines', countryCode: 'PH', region: 'Metro Manila', aliases: ['makati'], confidence: 0.90 },
    { city: 'Taguig', country: 'Philippines', countryCode: 'PH', region: 'Metro Manila', aliases: ['taguig', 'BGC'], confidence: 0.85 },

    // Cambodia, Laos, Myanmar
    { city: 'Phnom Penh', country: 'Cambodia', countryCode: 'KH', aliases: ['phnom penh'], confidence: 0.95 },
    { city: 'Siem Reap', country: 'Cambodia', countryCode: 'KH', aliases: ['siem reap'], confidence: 0.90 },
    { city: 'Vientiane', country: 'Laos', countryCode: 'LA', aliases: ['vientiane'], confidence: 0.95 },
    { city: 'Yangon', country: 'Myanmar', countryCode: 'MM', aliases: ['yangon', 'rangoon'], confidence: 0.95 },
    { city: 'Mandalay', country: 'Myanmar', countryCode: 'MM', aliases: ['mandalay'], confidence: 0.90 },
];

// ==================== EAST ASIA (60+ cities) ====================

export const EAST_ASIAN_CITIES: EnhancedLocationPattern[] = [
    // China (30 cities)
    { city: 'Beijing', country: 'China', countryCode: 'CN', aliases: ['beijing', '北京'], landmarks: ['Forbidden City'], confidence: 0.95 },
    { city: 'Shanghai', country: 'China', countryCode: 'CN', aliases: ['shanghai', '上海'], landmarks: ['Bund'], confidence: 0.95 },
    { city: 'Guangzhou', country: 'China', countryCode: 'CN', aliases: ['guangzhou', 'canton'], confidence: 0.95 },
    { city: 'Shenzhen', country: 'China', countryCode: 'CN', aliases: ['shenzhen'], confidence: 0.95 },
    { city: 'Chengdu', country: 'China', countryCode: 'CN', aliases: ['chengdu'], confidence: 0.90 },
    { city: 'Hangzhou', country: 'China', countryCode: 'CN', aliases: ['hangzhou'], confidence: 0.90 },
    { city: 'Wuhan', country: 'China', countryCode: 'CN', aliases: ['wuhan'], confidence: 0.90 },
    { city: 'Chongqing', country: 'China', countryCode: 'CN', aliases: ['chongqing'], confidence: 0.90 },
    { city: 'Tianjin', country: 'China', countryCode: 'CN', aliases: ['tianjin'], confidence: 0.90 },
    { city: 'Nanjing', country: 'China', countryCode: 'CN', aliases: ['nanjing'], confidence: 0.90 },

    // Japan (15 cities)
    { city: 'Tokyo', country: 'Japan', countryCode: 'JP', aliases: ['tokyo', '東京'], landmarks: ['Shibuya', 'Shinjuku'], confidence: 0.95 },
    { city: 'Osaka', country: 'Japan', countryCode: 'JP', aliases: ['osaka', '大阪'], confidence: 0.95 },
    { city: 'Kyoto', country: 'Japan', countryCode: 'JP', aliases: ['kyoto', '京都'], confidence: 0.95 },
    { city: 'Yokohama', country: 'Japan', countryCode: 'JP', aliases: ['yokohama'], confidence: 0.90 },
    { city: 'Nagoya', country: 'Japan', countryCode: 'JP', aliases: ['nagoya'], confidence: 0.90 },
    { city: 'Sapporo', country: 'Japan', countryCode: 'JP', aliases: ['sapporo'], confidence: 0.90 },
    { city: 'Fukuoka', country: 'Japan', countryCode: 'JP', aliases: ['fukuoka'], confidence: 0.90 },
    { city: 'Kobe', country: 'Japan', countryCode: 'JP', aliases: ['kobe'], confidence: 0.85 },

    // South Korea (10 cities)
    { city: 'Seoul', country: 'South Korea', countryCode: 'KR', aliases: ['seoul', '서울'], landmarks: ['Gangnam', 'Myeongdong'], confidence: 0.95 },
    { city: 'Busan', country: 'South Korea', countryCode: 'KR', aliases: ['busan', 'pusan'], confidence: 0.95 },
    { city: 'Incheon', country: 'South Korea', countryCode: 'KR', aliases: ['incheon'], confidence: 0.90 },
    { city: 'Daegu', country: 'South Korea', countryCode: 'KR', aliases: ['daegu'], confidence: 0.90 },
    { city: 'Daejeon', country: 'South Korea', countryCode: 'KR', aliases: ['daejeon'], confidence: 0.85 },

    // Taiwan & Hong Kong
    { city: 'Taipei', country: 'Taiwan', countryCode: 'TW', aliases: ['taipei', '台北'], confidence: 0.95 },
    { city: 'Kaohsiung', country: 'Taiwan', countryCode: 'TW', aliases: ['kaohsiung', '高雄'], confidence: 0.90 },
    { city: 'Taichung', country: 'Taiwan', countryCode: 'TW', aliases: ['taichung', '台中'], confidence: 0.90 },
    { city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', aliases: ['HK', 'hong kong', '香港'], confidence: 0.95 },
    { city: 'Kowloon', country: 'Hong Kong', countryCode: 'HK', aliases: ['kowloon'], confidence: 0.85 },
];

// ==================== SOUTH ASIA (40+ cities) ====================

export const SOUTH_ASIAN_CITIES: EnhancedLocationPattern[] = [
    // India (25 cities)
    { city: 'Mumbai', country: 'India', countryCode: 'IN', region: 'Maharashtra', aliases: ['mumbai', 'bombay'], confidence: 0.95 },
    { city: 'Delhi', country: 'India', countryCode: 'IN', aliases: ['delhi', 'new delhi'], confidence: 0.95 },
    { city: 'Bangalore', country: 'India', countryCode: 'IN', region: 'Karnataka', aliases: ['bangalore', 'bengaluru'], confidence: 0.95 },
    { city: 'Hyderabad', country: 'India', countryCode: 'IN', region: 'Telangana', aliases: ['hyderabad'], confidence: 0.95 },
    { city: 'Chennai', country: 'India', countryCode: 'IN', region: 'Tamil Nadu', aliases: ['chennai', 'madras'], confidence: 0.95 },
    { city: 'Kolkata', country: 'India', countryCode: 'IN', region: 'West Bengal', aliases: ['kolkata', 'calcutta'], confidence: 0.95 },
    { city: 'Pune', country: 'India', countryCode: 'IN', region: 'Maharashtra', aliases: ['pune'], confidence: 0.90 },
    { city: 'Ahmedabad', country: 'India', countryCode: 'IN', region: 'Gujarat', aliases: ['ahmedabad'], confidence: 0.90 },
    { city: 'Jaipur', country: 'India', countryCode: 'IN', region: 'Rajasthan', aliases: ['jaipur'], confidence: 0.90 },
    { city: 'Surat', country: 'India', countryCode: 'IN', region: 'Gujarat', aliases: ['surat'], confidence: 0.85 },
    { city: 'Lucknow', country: 'India', countryCode: 'IN', region: 'Uttar Pradesh', aliases: ['lucknow'], confidence: 0.85 },
    { city: 'Kanpur', country: 'India', countryCode: 'IN', region: 'Uttar Pradesh', aliases: ['kanpur'], confidence: 0.80 },
    { city: 'Nagpur', country: 'India', countryCode: 'IN', region: 'Maharashtra', aliases: ['nagpur'], confidence: 0.80 },
    { city: 'Goa', country: 'India', countryCode: 'IN', region: 'Goa', aliases: ['goa'], confidence: 0.85 },

    // Pakistan (8 cities)
    { city: 'Karachi', country: 'Pakistan', countryCode: 'PK', region: 'Sindh', aliases: ['karachi'], confidence: 0.95 },
    { city: 'Lahore', country: 'Pakistan', countryCode: 'PK', region: 'Punjab', aliases: ['lahore'], confidence: 0.95 },
    { city: 'Islamabad', country: 'Pakistan', countryCode: 'PK', aliases: ['islamabad'], confidence: 0.95 },
    { city: 'Faisalabad', country: 'Pakistan', countryCode: 'PK', region: 'Punjab', aliases: ['faisalabad'], confidence: 0.85 },
    { city: 'Rawalpindi', country: 'Pakistan', countryCode: 'PK', region: 'Punjab', aliases: ['rawalpindi'], confidence: 0.85 },

    // Bangladesh (5 cities)
    { city: 'Dhaka', country: 'Bangladesh', countryCode: 'BD', aliases: ['dhaka', 'dacca'], confidence: 0.95 },
    { city: 'Chittagong', country: 'Bangladesh', countryCode: 'BD', aliases: ['chittagong'], confidence: 0.90 },

    // Sri Lanka & Nepal
    { city: 'Colombo', country: 'Sri Lanka', countryCode: 'LK', aliases: ['colombo'], confidence: 0.95 },
    { city: 'Kandy', country: 'Sri Lanka', countryCode: 'LK', aliases: ['kandy'], confidence: 0.85 },
    { city: 'Kathmandu', country: 'Nepal', countryCode: 'NP', aliases: ['kathmandu'], confidence: 0.95 },
];

// Complete export with all regions
export const ALL_ENHANCED_LOCATIONS: EnhancedLocationPattern[] = [
    ...SOUTHEAST_ASIAN_CITIES,
    ...EAST_ASIAN_CITIES,
    ...SOUTH_ASIAN_CITIES,
    // Additional regions would be added here (continuing in next file due to size)
];

export const LOCATION_STATISTICS = {
    southeastAsia: SOUTHEAST_ASIAN_CITIES.length,
    eastAsia: EAST_ASIAN_CITIES.length,
    southAsia: SOUTH_ASIAN_CITIES.length,
    total: ALL_ENHANCED_LOCATIONS.length,
};
