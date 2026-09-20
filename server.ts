import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { DEMO_SCHEMES } from './src/data/demoSchemes';
import { calculateSchemeMatch, evaluateAllSchemes } from './src/services/matchingEngine';

const app = express();
const PORT = 3000;

app.use(express.json());

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SchemeMate AI Backend',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    schemesCount: DEMO_SCHEMES.length,
    timestamp: new Date().toISOString()
  });
});

// API: Get schemes directory with filters
app.get('/api/schemes', (req, res) => {
  try {
    const { search, category } = req.query;
    let schemes = [...DEMO_SCHEMES];

    if (category && typeof category === 'string' && category !== 'All') {
      schemes = schemes.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase().trim();
      schemes = schemes.filter(
        s =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    res.json({ schemes, total: schemes.length });
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({ error: 'Failed to retrieve schemes catalogue' });
  }
});

// API: Get single scheme details
app.get('/api/schemes/:id', (req, res) => {
  const { id } = req.params;
  const scheme = DEMO_SCHEMES.find(s => s.id === id);
  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found in demo catalogue' });
  }
  res.json({ scheme });
});

// API: Match profile with schemes
app.post('/api/schemes/match', (req, res) => {
  try {
    const { profile } = req.body;
    const matches = evaluateAllSchemes(DEMO_SCHEMES, profile || null);
    res.json({
      matches,
      totalEvaluated: DEMO_SCHEMES.length,
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in scheme matching:', error);
    res.status(500).json({ error: 'Failed to compute scheme eligibility matches' });
  }
});

// API: Check eligibility for single scheme
app.post('/api/schemes/check-eligibility', (req, res) => {
  try {
    const { schemeId, profile } = req.body;
    const scheme = DEMO_SCHEMES.find(s => s.id === schemeId);
    if (!scheme) {
      return res.status(404).json({ error: 'Scheme not found' });
    }
    const result = calculateSchemeMatch(scheme, profile || null);
    res.json({ result });
  } catch (error) {
    console.error('Error checking eligibility:', error);
    res.status(500).json({ error: 'Failed to check eligibility' });
  }
});

// API: Ask SchemeMate Assistant (AI + RAG ready)
app.post('/api/assistant/ask', async (req, res) => {
  const { question, profile, schemeId } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const activeScheme = schemeId ? DEMO_SCHEMES.find(s => s.id === schemeId) : null;

  // If GEMINI_API_KEY is available, use Gemini 3.8 Flash
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const contextCatalogue = DEMO_SCHEMES.map(s => ({
        id: s.id,
        name: s.name,
        category: s.category,
        department: s.department,
        benefits: s.benefits.summary,
        eligibility: s.eligibility.criteriaList,
        documents: s.documents,
        officialPortal: s.officialSource.portalName
      }));

      const systemPrompt = `You are "SchemeMate AI", a professional, empathetic, and clear AI Government Scheme Matching Assistant for citizens in India.
Current Prototype Note: You operate on a DEMO/SAMPLE welfare scheme catalog. You MUST always maintain honesty: do NOT invent real legislation numbers, and explicitly remind citizens that details must be verified on official government portals (such as myscheme.gov.in or respective ministry portals) before submitting legal applications. Never claim guaranteed eligibility.

User Profile Context:
${profile ? JSON.stringify(profile) : 'Anonymous Citizen (No profile provided yet)'}

${activeScheme ? `Currently Inspected Scheme Context:
${JSON.stringify({
  name: activeScheme.name,
  category: activeScheme.category,
  department: activeScheme.department,
  summary: activeScheme.shortDescription,
  benefits: activeScheme.benefits,
  eligibility: activeScheme.eligibility.criteriaList,
  documents: activeScheme.documents,
  applicationProcess: activeScheme.applicationProcess,
  officialSource: activeScheme.officialSource
})}` : ''}

Available Demo Schemes Knowledge:
${JSON.stringify(contextCatalogue, null, 2)}

Provide concise, helpful, well-structured answers using clear Markdown formatting (bullet points, bold text). If asked about documents, list the exact required documents. If asked why a scheme matches, relate it directly to the user's age, occupation, gender, state, or income status.
Keep responses under 250 words and end with a gentle recommendation to verify via official portals.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7
        }
      });

      const text = response.text || 'Unable to generate response at this moment. Please check your query or explore the schemes directory.';

      return res.json({
        answer: text,
        source: 'gemini-ai',
        referencedSchemeIds: activeScheme ? [activeScheme.id] : []
      });
    } catch (aiErr) {
      console.warn('Gemini API call failed or timed out, falling back to knowledge engine:', aiErr);
    }
  }

  // Knowledge-base fallback when no API key or upon network issue
  let answer = '';
  const q = question.toLowerCase();

  if (activeScheme) {
    if (q.includes('document') || q.includes('doc')) {
      answer = `For **${activeScheme.name}**, you will generally need to submit:\n\n` +
        activeScheme.documents.map((d, i) => `${i + 1}. **${d}**`).join('\n') +
        `\n\n*Official Source: Verify the exact checklist on ${activeScheme.officialSource.portalName}.*`;
    } else if (q.includes('apply') || q.includes('process') || q.includes('how')) {
      answer = `To apply for **${activeScheme.name}**, follow these standard stages:\n\n` +
        activeScheme.applicationProcess.map(p => `**Step ${p.step}: ${p.title}** — ${p.description}`).join('\n\n') +
        `\n\n*Always apply through authentic government portals (${activeScheme.officialSource.portalName}).*`;
    } else {
      const match = calculateSchemeMatch(activeScheme, profile);
      answer = `Here is our evaluation of **${activeScheme.name}** for your profile:\n\n` +
        `• **Match Score:** ${match.matchPercentage}% (${match.matchTier})\n` +
        `• **Key Match Reasons:** ${match.matchedReasons.join(' ')}\n` +
        `• **Benefit Highlight:** ${activeScheme.benefits.summary}\n\n` +
        `*Verification Note: ${match.verificationNotes.join(' ')}*`;
    }
  } else if (q.includes('education') || q.includes('scholarship')) {
    answer = `In our catalog, higher education funding is covered by the **National Post-Matric Scholarship Scheme (Demo)**. It offers tuition reimbursement and maintenance allowances for college students from eligible income brackets (under ₹2.5L). Applications are made through the National Scholarship Portal (NSP).`;
  } else if (q.includes('agriculture') || q.includes('farmer') || q.includes('kisan')) {
    answer = `For agricultural families, the **Pradhan Mantri Kisan Samman Nidhi (Demo)** provides ₹6,000 annual income support in three direct instalments. Applicants need landholding revenue records (Khatauni) and Aadhaar eKYC.`;
  } else if (q.includes('document')) {
    answer = `Standard documents needed across most Indian welfare schemes include:\n1. **Aadhaar Card** (Identity)\n2. **Income Certificate** from local Tehsildar\n3. **Bank Passbook** (Aadhaar linked)\n4. **Residence/Ration Card**\n5. **Caste/EWS certificate** if applicable.`;
  } else {
    answer = `SchemeMate AI has evaluated your query against our welfare knowledge base. You can review matching schemes in your dashboard, explore required documents, or ask about specific categories like Healthcare, Agriculture, Women Empowerment, or MSME business support.`;
  }

  return res.json({
    answer,
    source: 'demo-knowledge-base',
    referencedSchemeIds: activeScheme ? [activeScheme.id] : []
  });
});

// Vite Middleware & Static Serving setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SchemeMate AI server running on http://localhost:${PORT}`);
  });
}

startServer();
