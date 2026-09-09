import { LegalResourceGuide } from '../types';

export const legalResourceGuides: LegalResourceGuide[] = [
  {
    id: 'guide_legal_research',
    title: 'Legal Research Methodology & ULII Search Strategies',
    category: 'Legal Drafting',
    description: 'A step-by-step master guide for Ugandan law students on locating primary legislation, navigating ULII, Shepardizing case law, and cross-referencing statutory instruments.',
    sections: [
      {
        heading: '1. The Hierarchy of Ugandan Legal Sources',
        body: 'When conducting legal research in Uganda, always begin with primary sources in strict constitutional order: (1) The 1995 Constitution (supreme law under Article 2); (2) Acts of Parliament (Principal legislation); (3) Statutory Instruments & Regulations (Subsidiary legislation); (4) Decisions of Superior Courts of Record (Supreme Court, Court of Appeal / Constitutional Court, High Court); (5) Secondary sources (academic textbooks, law journals, treatises). Secondary sources cannot override binding domestic statutes or judicial precedents.',
        keyTips: [
          'Never cite a repealed Act without checking current amending legislation.',
          'Always verify if a High Court precedent was subsequently appealed to the Court of Appeal or Supreme Court.',
          'Check ULII (ulii.org) for neutral judicial citations and recent rulings.'
        ]
      },
      {
        heading: '2. Search Formula on ULII and Official Repositories',
        body: 'To locate relevant cases on ULII, construct search queries using specific legal doctrines and statutory sections rather than generic words. For instance, search ["Section 39 Land Act" AND "spousal consent"] rather than simply [land sale dispute]. Use quotation marks for exact legal phrases.',
        keyTips: [
          'Use Boolean operators: AND, OR, NOT in search queries.',
          'Filter search results by Court Division (e.g. Commercial Division vs Land Division).'
        ]
      }
    ]
  },
  {
    id: 'guide_case_briefing',
    title: 'How to Brief a Ugandan Case (FIRAC / IRAC Template)',
    category: 'Case Briefing',
    description: 'Standard judicial case briefing template used in Ugandan LLB faculties and the Law Development Centre (LDC).',
    sections: [
      {
        heading: '1. Anatomy of a Legal Case Brief',
        body: 'A proper case brief condenses a 50-page judgment into a 1-page analytical summary structured as: Citation & Coram (Name, Court, Year, Judges); Procedural History (How the case reached this court); Material Facts (Only the essential facts that influenced the legal outcome); Legal Issues (The precise questions of law the court was asked to resolve); Holding / Ratio Decidendi (The rule of law laid down by the court); Obiter Dicta (Notable remarks made by the judges in passing); Orders (The actual remedies granted).',
        keyTips: [
          'Separate the facts of the case from the arguments made by opposing advocates.',
          'Clearly identify which judge delivered the majority vs dissenting judgment.',
          'Highlight whether the decision created a new principle or distinguished an earlier precedent.'
        ]
      }
    ]
  },
  {
    id: 'guide_how_to_read_judgment',
    title: 'How to Read and Dissect a Judicial Judgment',
    category: 'Case Briefing',
    description: 'Techniques for navigating multi-bench appellate decisions, identifying majority holdings vs dissents, and extracting the ratio decidendi.',
    sections: [
      {
        heading: '1. Navigating Coram and Appellate Opinions',
        body: 'In the Supreme Court (coram of 5 or 7 Justices) and Constitutional Court (coram of 5 Justices), one Justice writes the lead judgment with which others may concur or dissent. Carefully review the concluding paragraphs of each opinion to identify the final collective decision.',
        keyTips: [
          'Check the disposition at the end of the judgment for the final orders.',
          'Pay attention to dissenting opinions as they often form the basis for future law reform.'
        ]
      }
    ]
  },
  {
    id: 'guide_statutory_interpretation',
    title: 'Statutory Interpretation Rules in Ugandan Courts',
    category: 'Exam Technique',
    description: 'Comprehensive guide on applying the Literal Rule, Golden Rule, Mischief Rule (Heydon\'s Case), Purposive Approach, and Maxims of Construction in Uganda.',
    sections: [
      {
        heading: '1. Canons and Rules of Interpretation',
        body: 'Ugandan courts apply the following foundational interpretation rules: (1) Literal Rule: Words of an Act are given their plain, ordinary grammatical meaning; (2) Golden Rule: Depart from literal meaning if it leads to absurdity; (3) Mischief Rule (Heydon’s Case): Examine what defect in common law existed before the Act and what remedy Parliament intended; (4) Purposive Approach: Adopt the construction that best advances the overall object of the legislation.',
        keyTips: [
          'Read the Long Title and Preamble of an Act to ascertain legislative purpose.',
          'Remember: Expressio unius est exclusio alterius (mention of one excludes others).',
          'Remember: Noscitur a sociis (words take color from surrounding words).'
        ]
      }
    ]
  },
  {
    id: 'guide_constitutional_interpretation',
    title: 'Principles of Constitutional Interpretation in Uganda',
    category: 'Exam Technique',
    description: 'The Major General David Tinyefuza principles, the living-tree doctrine, generous and purposive interpretation, and the harmony principle.',
    sections: [
      {
        heading: '1. The Tinyefuza Principles (1997 UGCC 3)',
        body: 'In Major General David Tinyefuza v Attorney General (1997) UGCC 3, Manyindo DCJ and the Court of Appeal laid down foundational principles for constitutional interpretation in Uganda: (1) The Constitution must be read as an integrated whole, with no provision destroying another (Harmonious Construction); (2) Generous and purposive interpretation to give full effect to fundamental rights; (3) The Constitution is a living instrument adapting to evolving societal standards.',
        keyTips: [
          'Always cite Article 137(1) for Constitutional Court original interpretation jurisdiction.',
          'Reference the National Objectives and Directive Principles of State Policy to guide interpretation.'
        ]
      }
    ]
  },
  {
    id: 'guide_irac_method',
    title: 'The IRAC / ILAC Method Masterclass for Law Exams',
    category: 'Exam Technique',
    description: 'How to score First Class / Upper Second marks in Ugandan LLB problem questions using Issue, Rule, Application, and Conclusion.',
    sections: [
      {
        heading: '1. Step-by-Step IRAC Application',
        body: 'ISSUE: Frame the legal question clearly ("Whether there was a valid contract between Kato and Nakato under Section 10 of Contracts Act 2010"); RULE: State the exact statutory provision and landmark case precedent; APPLICATION: Apply the legal elements directly to the specific facts in the problem; CONCLUSION: Provide a definitive answer on the liability or remedy.',
        keyTips: [
          'Never blend rule and application in the same paragraph.',
          'Address both sides of an ambiguous fact before arriving at a justified conclusion.'
        ]
      }
    ]
  },
  {
    id: 'guide_legal_essay',
    title: 'Writing Critical Legal Essays & Jurisprudential Dissertations',
    category: 'Essay Writing',
    description: 'Techniques for structuring theoretical, jurisprudential, and reform-oriented law essays for LLB coursework and bar exams.',
    sections: [
      {
        heading: '1. Thesis Statement and Structure',
        body: 'A high-scoring legal essay requires a clear, arguable thesis statement in the introduction. Organize body paragraphs around thematic arguments, evaluating theoretical viewpoints (e.g. Natural Law vs Legal Positivism) against contemporary Ugandan judicial realities.',
        keyTips: [
          'Avoid descriptive summaries; prioritize critical evaluation.',
          'Support every critique with statutory gaps or conflicting court decisions.'
        ]
      }
    ]
  },
  {
    id: 'guide_moot_advocacy',
    title: 'Moot Court Oral Advocacy & Memorial Drafting Guide',
    category: 'Moot Court',
    description: 'A complete handbook on preparing applicant/respondent memorials, court etiquette, handling judicial bench interventions, and persuasive advocacy.',
    sections: [
      {
        heading: '1. Memorial Drafting and Oral Delivery',
        body: 'Memorials must strictly comply with official moot rules (Statement of Jurisdiction, Questions Presented, Summary of Pleadings, Substantive Pleadings, Prayer for Relief). During oral submissions, stand with poise, address the bench as "My Lord" or "Your Ladyship", and seamlessly answer judges\' questions before resuming your outline.',
        keyTips: [
          'Never interrupt a judge when they are asking a question.',
          'Start your response with: "If it pleases the Court...", "May I address Your Ladyship on this point..."'
        ]
      }
    ]
  },
  {
    id: 'guide_legal_drafting',
    title: 'Legal Drafting & Procedural Document Masterclass',
    category: 'Legal Drafting',
    description: 'Essential rules for drafting plaints, affidavits, sale agreements, statutory notices, and chamber summons under Ugandan court rules.',
    sections: [
      {
        heading: '1. The Golden Rules of Legal Drafting',
        body: 'Use clear, precise, and unambiguous language. Avoid unnecessary legalese. Ensure mandatory statutory recitals and clauses (e.g., Spousal Consent under S.39 Land Act, verification under Order 6 Rule 26 CPR, jurat in Affidavits under Oaths Act Cap 19) are strictly incorporated.',
        keyTips: [
          'Verify that all named parties have legal capacity to sue or be sued.',
          'Always append the proper statutory attestation and commissioner for oaths stamp.'
        ]
      }
    ]
  },
  {
    id: 'guide_oscola_citation',
    title: 'OSCOLA & Ugandan Citation Reference Guide',
    category: 'Citation & OSCOLA',
    description: 'How to accurately cite Ugandan statutes, statutory instruments, Law Reports (ULR, HCB, KALR), and neutral ULII citations in coursework and research.',
    sections: [
      {
        heading: '1. Standard Ugandan Citation Styles',
        body: 'Primary Legislation: Short Title, Year (e.g., Contracts Act 2010, Act No. 7 of 2010); Subsidiary Legislation: Title, Year (S.I. No. / Year); Judicial Precedents: Case Name [Year] Court Abbreviation Number (e.g., Charles Onyango Obbo v AG [2004] UGSC 1).',
        keyTips: [
          'Italicize party names: *Plaintiff v Defendant*.',
          'Use square brackets [2004] when the year is part of the law report volume, and round brackets (2004) when the report has continuous volumes.'
        ]
      }
    ]
  }
];
