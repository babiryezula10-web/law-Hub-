import { caseLawDatabase } from '../../src/data/casesData';
import { statutesList } from '../../src/data/statutesData';
import { constitutionChapters } from '../../src/data/constitutionData';
import { legalMaximsList } from '../../src/data/legalMaximsData';
import { legalDictionaryTerms } from '../../src/data/legalDictionaryData';
import { LegalCase, Statute, ConstitutionArticle } from '../../src/types';

export interface LegalSearchResult {
  cases: LegalCase[];
  articles: ConstitutionArticle[];
  statutes: { statute: Statute; matchedSection?: any }[];
  maxims: typeof legalMaximsList;
  dictionaryTerms: typeof legalDictionaryTerms;
}

/**
 * Searches the LawHub verified Ugandan legal repository for matches.
 */
export function searchLegalKnowledge(query: string): LegalSearchResult {
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter((w) => w.length > 2);

  // 1. Search Cases
  const matchedCases: LegalCase[] = [];
  const knownCaseMap: { [keyword: string]: string } = {
    ibingira: 'case_grace_ibingira',
    tinyefuza: 'case_tinyefuza_1997',
    obbo: 'case_obbo_mwenda_2004',
    mwenda: 'case_obbo_mwenda_2004',
    ssemogerere: 'case_ssemogerere_olum_2000',
    olum: 'case_ssemogerere_olum_2000',
    'crane bank': 'case_crane_bank_bou_2022',
    sudhir: 'case_crane_bank_bou_2022',
    kigula: 'case_susan_kigula_2009',
    'death penalty': 'case_susan_kigula_2009',
    kivumbi: 'case_muwanga_kivumbi_2008',
    'police act': 'case_muwanga_kivumbi_2008',
    irumba: 'case_unra_irumba_2015',
    unra: 'case_unra_irumba_2015',
    'compulsory acquisition': 'case_unra_irumba_2015',
    giella: 'case_giella_cassman_1973',
    injunction: 'case_giella_cassman_1973',
    mabirizi: 'case_mabirizi_age_limit_2019',
    'age limit': 'case_mabirizi_age_limit_2019',
    'oloka-onyango': 'case_oloka_onyango_2014',
    'oloka onyango': 'case_oloka_onyango_2014',
    'black mambas': 'case_black_mambas_uls_2006',
    greenboat: 'case_greenboat_kcc_2007',
    zaabwe: 'case_zaabwe_orient_bank_2007',
    besigye: 'case_besigye_museveni_2001'
  };

  // Direct keyword mapping
  for (const [key, id] of Object.entries(knownCaseMap)) {
    if (q.includes(key)) {
      const found = caseLawDatabase.find((c) => c.id === id);
      if (found && !matchedCases.some((c) => c.id === found.id)) {
        matchedCases.push(found);
      }
    }
  }

  // Broad case search if not already populated
  if (matchedCases.length === 0) {
    for (const c of caseLawDatabase) {
      const name = c.caseName.toLowerCase();
      const cit = c.citation.toLowerCase();
      const topic = (c.topic || '').toLowerCase();
      const principles = (c.legalPrinciples || []).join(' ').toLowerCase();

      if (words.some((w) => name.includes(w) || cit.includes(w) || topic.includes(w) || principles.includes(w))) {
        matchedCases.push(c);
      }
    }
  }

  // If query specifically asks for landmark ratios broadly
  if (matchedCases.length === 0 && (q.includes('landmark') || q.includes('ratio') || q.includes('case law'))) {
    const defaultIds = ['case_grace_ibingira', 'case_tinyefuza_1997', 'case_obbo_mwenda_2004', 'case_ssemogerere_olum_2000'];
    defaultIds.forEach((id) => {
      const found = caseLawDatabase.find((c) => c.id === id);
      if (found && !matchedCases.some((c) => c.id === found.id)) {
        matchedCases.push(found);
      }
    });
  }

  // 2. Search Constitutional Articles
  const matchedArticles: ConstitutionArticle[] = [];
  const articleRegex = /article\s*(\d+)/i;
  const matchArt = q.match(articleRegex);
  const targetArtNum = matchArt ? parseInt(matchArt[1], 10) : null;

  for (const ch of constitutionChapters) {
    for (const art of ch.articles) {
      if (targetArtNum !== null && art.number.toLowerCase() === `article ${targetArtNum}`) {
        matchedArticles.push(art);
        continue;
      }
      const title = art.title.toLowerCase();
      const content = art.content.toLowerCase();
      const keywords = (art.keywords || []).join(' ').toLowerCase();

      if (
        q.includes(art.number.toLowerCase()) ||
        words.some((w) => w.length > 3 && (title.includes(w) || keywords.includes(w)))
      ) {
        if (!matchedArticles.some((a) => a.number === art.number)) {
          matchedArticles.push(art);
        }
      }
    }
  }

  // 3. Search Statutes
  const matchedStatutes: { statute: Statute; matchedSection?: any }[] = [];
  for (const st of statutesList) {
    const sTitle = st.shortTitle.toLowerCase();
    const isStatMatch = words.some((w) => w.length > 3 && sTitle.includes(w)) || q.includes(sTitle);

    if (isStatMatch) {
      // Check if specific section mentioned
      const secMatch = q.match(/section\s*(\d+)/i);
      let matchedSec: any = undefined;
      if (secMatch) {
        matchedSec = st.sections.find((s) => s.sectionNumber.toLowerCase().includes(secMatch[1]));
      }
      matchedStatutes.push({ statute: st, matchedSection: matchedSec });
    }
  }

  // 4. Search Maxims
  const matchedMaxims = legalMaximsList.filter((m) => {
    const latin = m.latinPhrase.toLowerCase();
    const trans = m.englishTranslation.toLowerCase();
    return q.includes(latin) || words.some((w) => w.length > 4 && trans.includes(w));
  });

  // 5. Search Dictionary
  const matchedDict = legalDictionaryTerms.filter((d) => {
    const term = d.term.toLowerCase();
    return q.includes(term);
  });

  return {
    cases: matchedCases.slice(0, 4),
    articles: matchedArticles.slice(0, 3),
    statutes: matchedStatutes.slice(0, 3),
    maxims: matchedMaxims.slice(0, 2),
    dictionaryTerms: matchedDict.slice(0, 2)
  };
}

/**
 * Builds grounded context string for Gemini prompt injection
 */
export function buildGroundingContext(query: string): string {
  const result = searchLegalKnowledge(query);
  const parts: string[] = [];

  if (result.cases.length > 0) {
    parts.push(`RELEVANT UGANDAN CASES:\n` + result.cases.map((c) =>
      `• ${c.caseName} (${c.citation}, ${c.court})\n  Ratio: ${c.ratioDecidendi}\n  Principles: ${c.legalPrinciples.join(', ')}`
    ).join('\n'));
  }

  if (result.articles.length > 0) {
    parts.push(`RELEVANT 1995 CONSTITUTION ARTICLES:\n` + result.articles.map((a) =>
      `• ${a.number}: ${a.title}\n  Summary/Principles: ${a.explanation || a.keyPrinciples?.join(', ')}`
    ).join('\n'));
  }

  if (result.statutes.length > 0) {
    parts.push(`RELEVANT UGANDAN STATUTES:\n` + result.statutes.map((s) =>
      `• ${s.statute.shortTitle}: ${s.matchedSection ? `${s.matchedSection.sectionNumber} - ${s.matchedSection.title}: ${s.matchedSection.text}` : s.statute.summary}`
    ).join('\n'));
  }

  return parts.join('\n\n');
}

/**
 * Generates an authoritative, comprehensive offline legal analysis
 * based on verified LawHub data when live Gemini is not configured.
 */
export function generateOfflineLegalResponse(prompt: string, courseContext?: string): string {
  const search = searchLegalKnowledge(prompt);
  let response = '';

  // 1. Case Law Focus
  if (search.cases.length > 0) {
    response += `### ⚖️ Landmark Ugandan Case Law Ratios & Judicial Precedents\n\n`;
    response += `The following binding decisions from the **Supreme Court, Court of Appeal, and High Court of Uganda** govern the legal questions raised in your research:\n\n`;

    search.cases.forEach((c, idx) => {
      response += `#### ${idx + 1}. **${c.caseName}**\n`;
      response += `* **Official Citation**: \`${c.citation}\`\n`;
      response += `* **Forum / Court**: ${c.court} (Coram: *${c.judges.join(', ')}*)\n`;
      response += `* **Material Facts**: ${c.facts}\n`;
      response += `* **Core Legal Issues**:\n${c.issues.map((i) => `  - ${i}`).join('\n')}\n`;
      response += `* **Ratio Decidendi (Binding Rule of Law)**:\n  > **"${c.ratioDecidendi}"**\n`;
      if (c.obiterDicta) {
        response += `* **Obiter Dicta**: _"${c.obiterDicta}"_\n`;
      }
      response += `* **Legal Principles**: ${(c.legalPrinciples || []).map((p) => `\`${p}\``).join(' • ')}\n`;
      const statutesStr = (c.statutesConsidered || []).length > 0 ? c.statutesConsidered?.join(', ') : 'Common Law Authorities';
      const constStr = (c.constitutionalArticlesConsidered || []).length > 0 ? c.constitutionalArticlesConsidered?.join(', ') : 'Constitutional Principles';
      response += `* **Authorities Considered**: Statutes: ${statutesStr} | Constitutional Articles: ${constStr}\n\n`;
    });

    response += `---\n### 📝 IRAC Examination Application Methodology\n`;
    response += `When framing this in an LLB examination or High Court legal submission:\n`;
    response += `* **Issue**: State precisely whether the impugned executive act, statutory provision, or conduct violates constitutional guarantees or statutory requirements.\n`;
    response += `* **Rule**: Cite the binding authority (e.g. *${search.cases[0].caseName} (${search.cases[0].citation})*) pursuant to Article 132(4) of the 1995 Constitution.\n`;
    response += `* **Application**: Apply the ratio decidendi directly to the factual scenario.\n`;
    response += `* **Conclusion**: Formulate a definitive remedy (e.g., declaration of nullity, certiorari, habeas corpus, damages).\n`;

    return response;
  }

  // 2. Constitutional Article Focus
  if (search.articles.length > 0) {
    response += `### 📜 1995 Constitution of the Republic of Uganda Analysis\n\n`;
    search.articles.forEach((art) => {
      response += `#### **${art.number}: ${art.title}** (${art.chapterTitle})\n\n`;
      response += `**Constitutional Provisions**:\n\`\`\`text\n${art.content}\n\`\`\`\n\n`;
      if (art.explanation) {
        response += `**Academic Judicial Commentary**:\n${art.explanation}\n\n`;
      }
      if (art.keyPrinciples && art.keyPrinciples.length > 0) {
        response += `**Core Principles**: ${art.keyPrinciples.join(' • ')}\n\n`;
      }
      if (art.keyCases && art.keyCases.length > 0) {
        response += `**Leading Interpretive Cases**:\n${art.keyCases.map((k) => `• ${k}`).join('\n')}\n\n`;
      }
    });

    return response;
  }

  // 3. Statute Focus
  if (search.statutes.length > 0) {
    response += `### 🏛️ Ugandan Statutory Framework & Provisions\n\n`;
    search.statutes.forEach(({ statute, matchedSection }) => {
      response += `#### **${statute.shortTitle}** (${statute.chapterNumber})\n`;
      response += `* **Status**: ${statute.status} (Commenced ${statute.commencementDate})\n`;
      response += `* **Scope**: ${statute.summary}\n\n`;

      if (matchedSection) {
        response += `**${matchedSection.sectionNumber}: ${matchedSection.title}**\n`;
        response += `> ${matchedSection.text}\n\n`;
        if (matchedSection.keyCases && matchedSection.keyCases.length > 0) {
          response += `* **Leading Cases Interpreting this Section**: ${matchedSection.keyCases.join(', ')}\n\n`;
        }
      } else if (statute.sections && statute.sections.length > 0) {
        response += `**Key Sections**:\n`;
        statute.sections.slice(0, 3).forEach((sec) => {
          response += `• **${sec.sectionNumber} (${sec.title})**: ${sec.text.substring(0, 160)}...\n`;
        });
        response += `\n`;
      }
    });

    return response;
  }

  // 4. Fallback General Academic Legal Structure
  return `### 📚 LawHub Ugandan Legal Analysis & Doctrine\n\n` +
    `Regarding your inquiry on: **"${prompt.trim()}"**\n\n` +
    `1. **Applicable Legal Principles & Doctrine**:\n` +
    `   Under Ugandan jurisprudence and the common law tradition received via the Judicature Act (Cap 13), legal propositions require validation through constitutional supremacy, enacted statutes, and binding judicial precedents under the doctrine of *stare decisis*.\n\n` +
    `2. **Constitutional Supremacy (Article 2)**:\n` +
    `   The Constitution is the supreme law of Uganda and has binding force on all authorities and persons throughout Uganda. Any law or custom inconsistent with the Constitution is void to the extent of the inconsistency.\n\n` +
    `3. **Hierarchy of Judicial Precedents (Article 132(4))**:\n` +
    `   • **Supreme Court of Uganda**: Final court of appeal; decisions are binding on all other courts.\n` +
    `   • **Court of Appeal / Constitutional Court**: Bounded by Supreme Court; binds High Court and Subordinate Courts.\n` +
    `   • **High Court of Uganda**: Unlimited original jurisdiction under Article 139.\n\n` +
    `4. **Academic Reference & Research Guidance**:\n` +
    `   To explore specific cases, search LawHub's **Library** or specify the case name (e.g., *Grace Ibingira*, *David Tinyefuza*, *Obbo & Mwenda*, *Susan Kigula*) or statute (e.g., *Contracts Act 2010 Section 10*, *Land Act Cap 227*).\n\n` +
    `*(Note: To activate real-time generative dynamic responses for non-indexed queries, configure \`GEMINI_API_KEY\` in your \`.env\` file.)*`;
}
