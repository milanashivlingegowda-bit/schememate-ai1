export type SchemeCategory =
  | 'Education'
  | 'Agriculture'
  | 'Employment'
  | 'Women'
  | 'Business'
  | 'Housing'
  | 'Healthcare'
  | 'Social Welfare';

export type GenderType =
  | 'male'
  | 'female'
  | 'transgender'
  | 'other'
  | 'prefer_not_to_say'
  | '';

export type EmploymentStatus =
  | 'employed'
  | 'self_employed'
  | 'unemployed'
  | 'student'
  | 'retired'
  | 'homemaker'
  | 'daily_wage'
  | '';

export type IncomeRange =
  | 'under_1_5_lakh'
  | '1_5_to_3_lakh'
  | '3_to_5_lakh'
  | '5_to_8_lakh'
  | 'above_8_lakh'
  | '';

export type SocialCategory =
  | 'General'
  | 'OBC'
  | 'SC'
  | 'ST'
  | 'EWS'
  | 'Minority'
  | '';

export type ResidenceType = 'Rural' | 'Urban' | 'Semi-Urban' | '';

export interface UserProfile {
  // Step 1: Basic
  age: number | null;
  state: string;
  district: string;

  // Step 2: Personal
  gender: GenderType;
  occupation: string;
  employmentStatus: EmploymentStatus;
  isStudent: boolean;

  // Step 3: Financial
  annualIncomeRange: IncomeRange;
  socialCategory: SocialCategory;
  residenceType: ResidenceType;

  // Step 4: Additional
  isFarmer: boolean;
  isPersonWithDisability: boolean;
  isSeniorCitizen: boolean;
  hasBusinessOwnership: boolean;
}

export interface DemoScheme {
  id: string;
  name: string;
  category: SchemeCategory;
  department: string;
  shortDescription: string;
  description: string;
  benefits: {
    summary: string;
    financialBenefit?: string;
    nonFinancialBenefit?: string;
    disbursementMethod?: string;
    frequency?: string;
    items: string[];
  };
  eligibility: {
    minAge?: number;
    maxAge?: number;
    targetOccupations?: string[];
    incomeLimit?: string;
    maxIncomeRangeRank?: number; // 1: under 1.5L, 2: 1.5-3L, 3: 3-5L, 4: 5-8L, 5: above 8L
    genderPreference?: GenderType[];
    residenceTypes?: ('Rural' | 'Urban' | 'Semi-Urban')[];
    allowedCategories?: SocialCategory[];
    farmerOnly?: boolean;
    pwdOnly?: boolean;
    seniorOnly?: boolean;
    studentOnly?: boolean;
    businessOwnerOnly?: boolean;
    criteriaList: string[];
  };
  documents: string[];
  applicationProcess: {
    step: number;
    title: string;
    description: string;
  }[];
  officialSource: {
    portalName: string;
    urlPlaceholder: string;
    isDemo: boolean;
  };
  lastVerified: string;
  targetGroups: string[];
  tags: string[];
}

export interface SchemeMatchResult {
  scheme: DemoScheme;
  matchPercentage: number;
  matchTier: 'High Match' | 'Moderate Match' | 'Potential Match';
  matchedReasons: string[];
  verificationNotes: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  relatedSchemeId?: string;
  referencedSchemeIds?: string[];
  suggestedActions?: string[];
}

export type ActivePage =
  | 'home'
  | 'profile-wizard'
  | 'processing'
  | 'results'
  | 'scheme-details'
  | 'ask-schememate'
  | 'explore'
  | 'about';
