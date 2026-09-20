import { DemoScheme, SchemeMatchResult, UserProfile } from '../types/scheme';

const INCOME_RANK: Record<string, number> = {
  'under_1_5_lakh': 1,
  '1_5_to_3_lakh': 2,
  '3_to_5_lakh': 3,
  '5_to_8_lakh': 4,
  'above_8_lakh': 5,
};

export function calculateSchemeMatch(
  scheme: DemoScheme,
  profile: UserProfile | null
): SchemeMatchResult {
  // If no profile provided or blank, return a baseline potential score with generic reason
  if (!profile) {
    return {
      scheme,
      matchPercentage: 65,
      matchTier: 'Potential Match',
      matchedReasons: ['Standard nationwide eligibility criteria apply.'],
      verificationNotes: ['Complete your profile to receive personalized score breakdown.']
    };
  }

  let score = 50; // base potential score
  const matchedReasons: string[] = [];
  const verificationNotes: string[] = [];

  const userAge = profile.age || 0;
  const userIncomeRank = profile.annualIncomeRange ? INCOME_RANK[profile.annualIncomeRange] || 3 : 3;

  // 1. Farmer condition
  if (scheme.eligibility.farmerOnly) {
    if (profile.isFarmer) {
      score += 25;
      matchedReasons.push('Directly matches your indicated farmer / cultivator status.');
    } else {
      score -= 30;
      verificationNotes.push('Specifically designed for agricultural landholders.');
    }
  }

  // 2. Student condition
  if (scheme.eligibility.studentOnly) {
    if (profile.isStudent || profile.employmentStatus === 'student') {
      score += 25;
      matchedReasons.push('Aligned with your active student status in higher education.');
    } else {
      score -= 30;
      verificationNotes.push('Requires current enrollment in a recognized educational institute.');
    }
  }

  // 3. Gender condition
  if (scheme.eligibility.genderPreference && scheme.eligibility.genderPreference.length > 0) {
    if (profile.gender && scheme.eligibility.genderPreference.includes(profile.gender)) {
      score += 20;
      matchedReasons.push(`Targeted priority support for ${profile.gender === 'female' ? 'women' : profile.gender} beneficiaries.`);
    } else if (profile.gender) {
      score -= 20;
      verificationNotes.push('Prefers female / specific gender demographic.');
    }
  }

  // 4. Disability condition
  if (scheme.eligibility.pwdOnly) {
    if (profile.isPersonWithDisability) {
      score += 35;
      matchedReasons.push('Tailored specifically for Persons with Disabilities (PwD) with valid UDID.');
    } else {
      score -= 40;
      verificationNotes.push('Requires verified disability certification (min 40%).');
    }
  }

  // 5. Senior citizen condition
  if (scheme.eligibility.seniorOnly) {
    if (profile.isSeniorCitizen || userAge >= 60) {
      score += 30;
      matchedReasons.push(`Applies to senior citizens (Age ${userAge || '60+'} recorded).`);
    } else {
      score -= 35;
      verificationNotes.push('Applicable exclusively for citizens aged 60 and above.');
    }
  }

  // 6. Business owner condition
  if (scheme.eligibility.businessOwnerOnly) {
    if (profile.hasBusinessOwnership || profile.employmentStatus === 'self_employed') {
      score += 25;
      matchedReasons.push('Aligned with your micro-enterprise / self-employed business interest.');
    } else {
      score += 10;
      matchedReasons.push('Provides credit & seed support for aspiring new entrepreneurs.');
    }
  }

  // 7. Income tier
  if (scheme.eligibility.maxIncomeRangeRank) {
    if (userIncomeRank <= scheme.eligibility.maxIncomeRangeRank) {
      score += 15;
      matchedReasons.push('Household income tier satisfies the low-to-moderate income ceiling.');
    } else {
      score -= 15;
      verificationNotes.push(`Income threshold may exceed recommended ceiling (${scheme.eligibility.incomeLimit || 'income limit'}).`);
    }
  }

  // 8. Social Category
  if (scheme.eligibility.allowedCategories && profile.socialCategory) {
    if (scheme.eligibility.allowedCategories.includes(profile.socialCategory)) {
      score += 15;
      matchedReasons.push(`Social category (${profile.socialCategory}) qualifies for this scholarship / welfare quota.`);
    }
  }

  // 9. Location & Residence match
  if (profile.residenceType) {
    if (scheme.category === 'Agriculture' && profile.residenceType === 'Rural') {
      score += 10;
      matchedReasons.push('Rural residency complements regional agricultural mission.');
    }
    if (scheme.category === 'Housing') {
      matchedReasons.push(`Eligible for ${profile.residenceType} housing sub-component.`);
    }
  }

  // 10. General Age checks
  if (userAge > 0) {
    if (scheme.eligibility.minAge && userAge < scheme.eligibility.minAge) {
      score -= 20;
      verificationNotes.push(`Minimum age requirement is ${scheme.eligibility.minAge} years.`);
    } else if (scheme.eligibility.maxAge && userAge > scheme.eligibility.maxAge) {
      score -= 20;
      verificationNotes.push(`Maximum age limit is ${scheme.eligibility.maxAge} years.`);
    } else if (scheme.eligibility.minAge) {
      matchedReasons.push(`Your age (${userAge}) is within eligible age parameters.`);
    }
  }

  // Bound score between 25 and 98% (realistic, never 100% since official verification is required)
  const finalPercentage = Math.min(98, Math.max(25, score));

  let matchTier: 'High Match' | 'Moderate Match' | 'Potential Match';
  if (finalPercentage >= 80) {
    matchTier = 'High Match';
  } else if (finalPercentage >= 60) {
    matchTier = 'Moderate Match';
  } else {
    matchTier = 'Potential Match';
  }

  if (matchedReasons.length === 0) {
    matchedReasons.push('General public welfare initiative with broad citizen coverage.');
  }

  if (verificationNotes.length === 0) {
    verificationNotes.push('Ensure supporting documents and state revenue records are up to date.');
  }

  return {
    scheme,
    matchPercentage: finalPercentage,
    matchTier,
    matchedReasons,
    verificationNotes
  };
}

export function evaluateAllSchemes(
  schemes: DemoScheme[],
  profile: UserProfile | null
): SchemeMatchResult[] {
  const results = schemes.map(scheme => calculateSchemeMatch(scheme, profile));
  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function calculateProfileCompleteness(profile: UserProfile | null): number {
  if (!profile) return 0;
  let filled = 0;
  const total = 9;

  if (profile.age && profile.age > 0) filled++;
  if (profile.state) filled++;
  if (profile.district) filled++;
  if (profile.gender) filled++;
  if (profile.employmentStatus) filled++;
  if (profile.annualIncomeRange) filled++;
  if (profile.socialCategory) filled++;
  if (profile.residenceType) filled++;
  if (profile.isFarmer !== undefined) filled++;

  return Math.round((filled / total) * 100);
}
