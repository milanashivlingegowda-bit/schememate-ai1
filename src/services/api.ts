import { DemoScheme, SchemeMatchResult, UserProfile, ChatMessage } from '../types/scheme';
import { DEMO_SCHEMES } from '../data/demoSchemes';
import { calculateSchemeMatch, evaluateAllSchemes } from './matchingEngine';

export interface AskAssistantResponse {
  answer: string;
  source: 'gemini-ai' | 'demo-knowledge-base';
  suggestedQuestions?: string[];
  referencedSchemeIds?: string[];
}

export const apiService = {
  /**
   * Retrieves scheme matches based on user profile.
   * Calls /api/schemes/match with graceful local fallback.
   */
  async getSchemeMatches(profile: UserProfile | null): Promise<SchemeMatchResult[]> {
    try {
      const response = await fetch('/api/schemes/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.matches)) {
          return data.matches;
        }
      }
    } catch {
      // Graceful fallback to client-side matching engine if offline or server loading
    }
    return evaluateAllSchemes(DEMO_SCHEMES, profile);
  },

  /**
   * Retrieves all schemes with optional filtering.
   */
  async getAllSchemes(search?: string, category?: string): Promise<DemoScheme[]> {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (category && category !== 'All') params.set('category', category);

      const response = await fetch(`/api/schemes?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.schemes)) {
          return data.schemes;
        }
      }
    } catch {
      // Fallback
    }

    let results = [...DEMO_SCHEMES];
    if (category && category !== 'All') {
      results = results.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return results;
  },

  /**
   * Retrieves full details for a single scheme by ID.
   */
  async getSchemeDetails(schemeId: string): Promise<DemoScheme | null> {
    try {
      const response = await fetch(`/api/schemes/${schemeId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.scheme) {
          return data.scheme;
        }
      }
    } catch {
      // Fallback
    }
    return DEMO_SCHEMES.find(s => s.id === schemeId) || null;
  },

  /**
   * Checks eligibility for a single scheme against a profile.
   */
  async checkEligibility(profile: UserProfile | null, scheme: DemoScheme): Promise<SchemeMatchResult> {
    return calculateSchemeMatch(scheme, profile);
  },

  /**
   * Sends user question to Ask SchemeMate AI assistant.
   */
  async askSchemeMate(
    question: string,
    profile: UserProfile | null,
    schemeId?: string
  ): Promise<AskAssistantResponse> {
    try {
      const response = await fetch('/api/assistant/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, profile, schemeId }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch {
      // Fallback
    }

    // High quality offline fallback generator
    return generateFallbackAssistantResponse(question, profile, schemeId);
  }
};

function generateFallbackAssistantResponse(
  question: string,
  profile: UserProfile | null,
  schemeId?: string
): AskAssistantResponse {
  const q = question.toLowerCase();
  const referencedSchemeIds: string[] = [];

  if (schemeId) {
    referencedSchemeIds.push(schemeId);
    const targetScheme = DEMO_SCHEMES.find(s => s.id === schemeId);
    if (targetScheme) {
      if (q.includes('document') || q.includes('doc')) {
        return {
          answer: `For **${targetScheme.name}**, you typically need to prepare the following documents:\n\n` +
            targetScheme.documents.map((d, i) => `${i + 1}. **${d}**`).join('\n') +
            `\n\n*Note: This is demo catalogue guidance. Always verify exact mandatory lists at the official nodal portal (${targetScheme.officialSource.portalName}) before submitting your application.*`,
          source: 'demo-knowledge-base',
          referencedSchemeIds: [targetScheme.id],
          suggestedQuestions: [
            `What is the benefit amount for ${targetScheme.name}?`,
            `How do I apply for this scheme step-by-step?`,
            `Do I meet the income criteria?`
          ]
        };
      }

      if (q.includes('apply') || q.includes('how can i apply') || q.includes('process')) {
        return {
          answer: `Here is the step-by-step application walkthrough for **${targetScheme.name}**:\n\n` +
            targetScheme.applicationProcess.map(p => `**Step ${p.step}: ${p.title}**\n${p.description}`).join('\n\n') +
            `\n\nOfficial Portal reference: **${targetScheme.officialSource.portalName}**.\n*Always verify the active portal URL and deadline notices.*`,
          source: 'demo-knowledge-base',
          referencedSchemeIds: [targetScheme.id],
          suggestedQuestions: [
            'What documents are required?',
            'What are the common rejection reasons?',
            'Explore other schemes in this category'
          ]
        };
      }

      if (q.includes('why') || q.includes('match') || q.includes('eligib')) {
        const matchRes = calculateSchemeMatch(targetScheme, profile);
        return {
          answer: `Based on your profile, **${targetScheme.name}** scored a **${matchRes.matchPercentage}% potential match** (${matchRes.matchTier}):\n\n` +
            `**Key Matching Signals:**\n` +
            matchRes.matchedReasons.map(r => `• ${r}`).join('\n') +
            `\n\n**Verification Checklist to Confirm:**\n` +
            matchRes.verificationNotes.map(v => `• ${v}`).join('\n') +
            `\n\n*Disclaimer: SchemeMate AI calculates match affinity as an informational tool. Final eligibility determinations rest solely with government issuing departments.*`,
          source: 'demo-knowledge-base',
          referencedSchemeIds: [targetScheme.id],
          suggestedQuestions: [
            'What documents do I need to prepare?',
            'How can I apply online?',
            'Show me other matching schemes'
          ]
        };
      }
    }
  }

  // Broad topic detection
  if (q.includes('education') || q.includes('scholarship') || q.includes('student') || q.includes('college')) {
    return {
      answer: `In our demo catalogue, education support is highlighted by the **National Post-Matric Scholarship Scheme (Demo)**.\n\n` +
        `• **Target Beneficiaries:** Post-Class 10 students enrolled in recognized universities, polytechnics, or colleges.\n` +
        `• **Key Benefit:** Full tuition reimbursement plus monthly maintenance allowances (up to ₹1,200/month for hostellers).\n` +
        `• **Income Ceiling:** Family income typically capped at ₹2.5 Lakh per annum for reserved/EWS quotas.\n` +
        `• **Primary Portal:** Applied via National Scholarship Portal (NSP).\n\n` +
        `*Would you like to review the full document checklist for student scholarships?*`,
      source: 'demo-knowledge-base',
      referencedSchemeIds: ['post-matric-scholarship-demo'],
      suggestedQuestions: [
        'What documents are needed for scholarship applications?',
        'Can self-employed parents apply for educational aid?',
        'Are there skill development or apprenticeship schemes?'
      ]
    };
  }

  if (q.includes('agriculture') || q.includes('farmer') || q.includes('crop') || q.includes('kisan')) {
    return {
      answer: `For agricultural families, our demo catalogue features the **Pradhan Mantri Kisan Samman Nidhi (Demo)**:\n\n` +
        `• **Annual Support:** ₹6,000 disbursed directly into Aadhaar-seeded bank accounts in 3 installments of ₹2,000.\n` +
        `• **Eligibility Base:** Cultivable landholding registered in state revenue records (Khatauni/Jamabandi).\n` +
        `• **Mandatory Requirement:** e-KYC authentication and Aadhaar linkage.\n\n` +
        `*If you are also interested in credit for farm machinery or crop insurance, let me know!*`,
      source: 'demo-knowledge-base',
      referencedSchemeIds: ['pm-kisan-demo'],
      suggestedQuestions: [
        'How do I complete e-KYC for farmer schemes?',
        'What if my land record is jointly owned?',
        'Show me micro-business schemes for rural areas'
      ]
    };
  }

  if (q.includes('document') || q.includes('required doc') || q.includes('certificate')) {
    return {
      answer: `While specific requirements vary by scheme, almost all government welfare applications in India require these core foundation documents:\n\n` +
        `1. **Identity & Age Proof:** Aadhaar Card, Voter ID, or Birth Certificate.\n` +
        `2. **Income Certificate:** Issued by local Revenue Authority (Tehsildar / SDM) valid for current fiscal year.\n` +
        `3. **Residence / Domicile Proof:** Ration card, Electricity bill, or Nativity certificate.\n` +
        `4. **Bank Details:** Passbook showing active Account Number and IFSC with Aadhaar DBT enabled.\n` +
        `5. **Category Certificate:** Caste certificate (SC/ST/OBC) or EWS certificate if claiming reservation benefits.\n\n` +
        `*Tip: Keeping digital copies on DigiLocker speeds up verification during online applications.*`,
      source: 'demo-knowledge-base',
      suggestedQuestions: [
        'How can I get an income certificate?',
        'Why did I match my current schemes?',
        'Show me healthcare coverage schemes'
      ]
    };
  }

  if (q.includes('health') || q.includes('ayushman') || q.includes('hospital') || q.includes('medical')) {
    return {
      answer: `For healthcare assurance, the demo catalogue features **Ayushman Bharat (Demo)**:\n\n` +
        `• **Coverage:** Up to ₹5,00,000 per family per year for secondary and tertiary inpatient care.\n` +
        `• **Mode:** Completely cashless treatment at empaneled public and private hospitals nationwide.\n` +
        `• **Key Advantage:** Pre-existing ailments covered from Day 1; no co-pay required.\n\n` +
        `*Senior citizens aged 70+ in participating states can also receive Ayushman Vay Vandana coverage!*`,
      source: 'demo-knowledge-base',
      referencedSchemeIds: ['pm-ayushman-arogya-demo'],
      suggestedQuestions: [
        'How do I find empaneled hospitals?',
        'What documents are needed to make an Ayushman card?',
        'Are senior citizens eligible regardless of income?'
      ]
    };
  }

  // General helpful response
  return {
    answer: `Thank you for asking SchemeMate AI! Based on your citizen profile (${profile ? `${profile.state || 'India'}, Age: ${profile.age || 'Not specified'}, Category: ${profile.socialCategory || 'General'}` : 'Guest Profile'}):\n\n` +
      `SchemeMate AI scans central and state welfare initiatives across Agriculture, Education, Healthcare, Women's Empowerment, MSME Business, Housing, and Social Security.\n\n` +
      `**How I can assist you:**\n` +
      `• Ask about specific criteria (e.g., *"What schemes are available for women entrepreneurs?"*)\n` +
      `• Inquire about documents (e.g., *"What is needed for housing subsidies?"*)\n` +
      `• Understand your match affinity (e.g., *"Why did I get 85% on PMEGP?"*)\n\n` +
      `*Notice: Information provided is for educational & discovery guidance. Always refer to official government portals for legal applications.*`,
    source: 'demo-knowledge-base',
    suggestedQuestions: [
      'What schemes may help with education?',
      'What documents are required?',
      'Show me agriculture-related schemes.',
      'How can I apply for business funding?'
    ]
  };
}
