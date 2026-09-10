import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { CONFIG } from '../config';
import { generateOfflineLegalResponse, buildGroundingContext } from '../services/legalKnowledgeService';

export const aiRouter = Router();

// Lazy-initialized Gemini AI client
function getGeminiClient(): GoogleGenAI | null {
  if (!CONFIG.GEMINI_API_KEY) {
    console.warn('[Gemini AI] GEMINI_API_KEY is not set in environment.');
    return null;
  }
  return new GoogleGenAI({
    apiKey: CONFIG.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// Fallback executor with model retries
async function generateContentWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
    primaryModel?: string;
    retriesPerModel?: number;
  }
) {
  const primaryModel = params.primaryModel || 'gemini-2.5-flash';
  const fallbackModels = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  const modelsToTry = [primaryModel, ...fallbackModels.filter((m) => m !== primaryModel)];

  let lastError: any = null;

  for (const model of modelsToTry) {
    const attempts = params.retriesPerModel ?? 2;
    for (let attempt = 0; attempt <= attempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config
        });

        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`[Gemini API] Attempt ${attempt + 1} for model ${model} failed: ${err?.message || err}`);

        if (attempt < attempts) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  }

  throw lastError || new Error('The AI service is experiencing high demand. Please try again in a few moments.');
}

function isGreeting(question: string): boolean {
  return /^(hello|hi|hey|greetings|good morning|good afternoon|good evening|good day|salutations)[\s!.?]*$/i.test(question.trim());
}

function isLikelyNonLegalQuery(question: string): boolean {
  const q = question.toLowerCase().trim();

  // Greetings & basic persona questions are permitted
  if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|who are you|what can you do)[\s!.?]*$/i.test(q)) {
    return false;
  }

  const nonLegalTriggers = [
    /\b(recipe|cook|baking|cake|pizza|soup|ingredient)\b/i,
    /\b(weather forecast|tomorrow'?s weather|temperature in)\b/i,
    /\b(premier league|champions league|football score|messi|ronaldo|nba score)\b/i,
    /\b(movie review|celebrity gossip|hollywood|pop song|lyrics for)\b/i,
    /\b(write me a python|javascript code|react code|css style|install npm)\b/i,
    /\b(crypto price|bitcoin forecast|stock pick|forex trading)\b/i,
    /\b(dating advice|how to flirt|horoscope|zodiac sign|astrology)\b/i,
    /\b(joke about|riddle me|bedtime story)\b/i
  ];

  const strongLegalTerms = [
    /\b(law|legal|court|judge|judiciary|attorney|advocate|counsel|statute|act|constitution|article|section|clause|precedent|ratio|obiter|sub judice|habeas corpus|injunction|bail|plaint|indictment|appeal|tort|negligence|contract|property|land act|penal code|evidence|jurisdiction|remedy|damages|liability|accused|plaintiff|defendant|appellant|respondent|parliament|ulii|judicature)\b/i
  ];

  if (strongLegalTerms.some((regex) => regex.test(q))) {
    return false;
  }

  return nonLegalTriggers.some((regex) => regex.test(q));
}

/**
 * POST /api/ai/tutor
 * LawHub Academic Legal Tutor with strict legal domain boundary.
 */
aiRouter.post('/tutor', async (req: Request, res: Response) => {
  try {
    const { prompt, courseContext, role = 'Student', history = [] } = req.body;

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'A question or legal topic is required.' });
    }

    const trimmedPrompt = prompt.trim();

    // Friendly greeting handler
    if (isGreeting(trimmedPrompt)) {
      return res.json({
        reply: `Good day! I am the LawHub AI Legal Tutor, your specialized research and academic assistant for Ugandan jurisprudence.\n\nI am configured with knowledge of the 1995 Constitution of Uganda, Acts of Parliament, landmark High Court, Court of Appeal, and Supreme Court judgments, and LLB / Bar Course curricula.\n\nHow may I assist your legal study today?\n• Statutory interpretation (e.g. S.10 Contracts Act 2010, S.39 Land Act)\n• Landmark case law ratios (e.g. Grace Ibingira, Tinyefuza, Obbo & Mwenda)\n• Structured IRAC legal answers (Issue, Rule, Application, Conclusion)\n• Legal drafting principles and civil/criminal procedure`
      });
    }

    if (isLikelyNonLegalQuery(trimmedPrompt)) {
      return res.json({
        reply: `I am LawHub AI Legal Tutor, designed specifically to assist with legal and law-related questions only. I cannot assist with non-legal topics.

Please feel free to ask any question regarding:
• Legal principles and doctrines (e.g. doctrine of separation of powers, ultra vires, privity of contract, vicarious liability)
• Ugandan statutory provisions and sections (e.g. 1995 Constitution of Uganda, Contracts Act 2010, Land Act Cap 227, Penal Code Act Cap 120)
• Landmark case law and judicial precedents (e.g. Paul Ssemogerere v AG, Major General Tinyefuza v AG, Grace Ibingira v Uganda)
• IRAC legal examination methods (Issue, Rule, Application, Conclusion)
• High Court and Magistrates Courts civil and criminal procedure`
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const offlineReply = generateOfflineLegalResponse(trimmedPrompt, courseContext);
      return res.json({ reply: offlineReply });
    }

    const groundingContext = buildGroundingContext(trimmedPrompt);
    const systemInstruction = `You are "LawHub AI Legal Tutor", an authoritative Ugandan Legal Research & Academic Assistant (expert in the 1995 Constitution of Uganda, Ugandan statutes, Supreme Court, Court of Appeal, High Court jurisprudence, common law, and LLB curricula).
Respond strictly to law-related questions only. Provide structured answers:
1. Legal Principle & Definition
2. Statutory Provisions & Sections
3. Relevant Case Law & Judicial Precedents
4. Practical Example / IRAC Application
5. Conclusion
${groundingContext ? `\nVERIFIED UGANDAN AUTHORITIES FROM LAWHUB REPOSITORY:\n${groundingContext}\n` : ''}`;

    try {
      const response = await generateContentWithFallback(ai, {
        primaryModel: 'gemini-2.5-flash',
        contents: trimmedPrompt,
        config: {
          systemInstruction,
          temperature: 0.4
        }
      });

      return res.json({ reply: response.text || generateOfflineLegalResponse(trimmedPrompt, courseContext) });
    } catch (modelErr: any) {
      console.warn('[AI Tutor] Gemini call failed, serving offline legal knowledge:', modelErr?.message || modelErr);
      return res.json({ reply: generateOfflineLegalResponse(trimmedPrompt, courseContext) });
    }
  } catch (error: any) {
    console.error('[AI Tutor] Error:', error);
    return res.status(500).json({
      error: 'The LawHub AI Legal Tutor encountered an issue processing your request.'
    });
  }
});

/**
 * POST /api/ai/draft
 * AI Legal Drafting Assistant
 */
aiRouter.post('/draft', async (req: Request, res: Response) => {
  try {
    const { documentType, details, partyNames, statutoryRef } = req.body;

    if (!documentType) {
      return res.status(400).json({ error: 'Document type is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        documentText: `THE REPUBLIC OF UGANDA
IN THE HIGH COURT OF UGANDA AT KAMPALA

[${String(documentType).toUpperCase()}]

BETWEEN:
${partyNames || 'PARTIES TO BE INSERTED'}

PARTICULARS & STATUTORY BASIS:
${statutoryRef || 'Under relevant Ugandan Laws and Civil Procedure Rules SI 71-1'}

DETAILS:
${details || 'Standard terms and conditions as stipulated by legal drafting conventions.'}

DATED at Kampala this ${new Date().toLocaleDateString('en-GB')} day of ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.

_________________________
ADVOCATE FOR THE APPLICANT

DISCLAIMER: This legal document is prepared with LawHub Legal Drafting Assistant for educational and academic drafting reference purposes only. It must be reviewed, verified, and endorsed by an Advocate of the High Court of Uganda prior to execution or court filing.`
      });
    }

    const systemInstruction = `You are a Senior Legal Draftsman and Advocate of the High Court of Uganda.
Generate formal, accurate, statutory-compliant legal documents according to Ugandan procedural standards (e.g., Oaths Act Cap 19, Civil Procedure Rules SI 71-1, Land Act Cap 227).
ALWAYS include:
1. Formal Ugandan document header.
2. Clear recitals, operative clauses, and execution/witness clauses.
3. Mandatory disclaimer at the very bottom.`;

    const prompt = `Draft a formal ${documentType}.\nDetails: ${details || 'Standard format'}\nParties: ${partyNames || 'To be filled'}\nSpecific Statutory References: ${statutoryRef || 'Ugandan Law'}`;

    const response = await generateContentWithFallback(ai, {
      primaryModel: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3
      }
    });

    return res.json({ documentText: response.text || 'Unable to draft document.' });
  } catch (error: any) {
    console.error('[AI Draft] Error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to generate legal draft.' });
  }
});

/**
 * POST /api/ai/quiz
 * AI Quiz Question Generator
 */
aiRouter.post('/quiz', async (req: Request, res: Response) => {
  try {
    const { courseTitle, topic, questionCount = 3 } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        questions: [
          {
            id: 'q1',
            type: 'mcq',
            question: `Under Ugandan law regarding ${topic || 'Contract Law'}, what is the fundamental requirement for a binding contract under Section 10 of the Contracts Act 2010?`,
            options: [
              'Offer, acceptance, and consideration with intention to create legal relations',
              'Registration with the Registrar of Companies only',
              'Payment in US Dollars',
              'Oral agreement in the presence of 3 witnesses'
            ],
            correctAnswer: 'Offer, acceptance, and consideration with intention to create legal relations',
            explanation: 'Section 10 of the Contracts Act 2010 codifies that an agreement made with free consent of parties competent to contract, for lawful consideration and with a lawful object, is a valid contract.'
          }
        ]
      });
    }

    const prompt = `Generate a set of ${questionCount} high-yield exam preparation questions for Ugandan Law students on course "${courseTitle}" topic "${topic || 'General Principles'}".
Return JSON response matching:
[
  {
    "id": "q1",
    "type": "mcq",
    "question": "Question text here...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Exact correct option string",
    "explanation": "Detailed statutory and case law explanation referencing Ugandan statutes."
  }
]`;

    const response = await generateContentWithFallback(ai, {
      primaryModel: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5
      }
    });

    let questions = [];
    try {
      questions = JSON.parse(response.text || '[]');
    } catch {
      questions = [];
    }

    return res.json({ questions });
  } catch (error: any) {
    console.error('[AI Quiz] Error:', error);
    return res.status(500).json({ error: 'Failed to generate quiz.' });
  }
});
