import { Statute } from '../types';
import { createVerifiedSource } from './verifiedSources';

export const statutesList: Statute[] = [
  {
    id: 'stat_contracts_2010',
    shortTitle: 'Contracts Act, 2010',
    officialTitle: 'The Contracts Act, 2010 (Act No. 7 of 2010)',
    longTitle: 'An Act to codify and reform the law relating to contracts; to repeal the Contract Act, Cap. 73; and for other connected matters.',
    chapterNumber: 'Act No. 7 of 2010',
    year: 2010,
    commencementDate: '2nd July 2010',
    summary: 'Codifies Ugandan contract law, establishing statutory definitions for offer, acceptance, consideration, legal capacity, contractual terms, frustration, breach, and remedies.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 7 of 2010 / Uganda Gazette No. 42 Vol. CIII', 'Act of Parliament', '2nd July 2010'),
    category: 'Commercial Law',
    sections: [
      {
        sectionNumber: 'Section 10',
        title: 'Definition of Contract & Essential Requirements',
        text: `(1) A contract is an agreement made with the free consent of parties with capacity to contract, for a lawful consideration and with a lawful object, with the intention to be legally bound.\n(2) A contract may be oral, written, partly oral and partly written, or may be implied from the conduct of the parties.`,
        keyCases: ['Greenboat Entertainment Ltd v City Council of Kampala (2007)', 'Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256']
      },
      {
        sectionNumber: 'Section 11',
        title: 'Capacity to Contract',
        text: `(1) A person has capacity to contract where that person is eighteen years or above, of sound mind, and is not disqualified from contracting by any law to which he or she is subject.\n(2) Subject to the provisions of this Act, an agreement entered into by a person who lacks capacity to contract is void.`,
        keyCases: ['Nash v Inman [1908] 2 KB 1', 'Leslie Ltd v Sheill [1914] 3 KB 607']
      },
      {
        sectionNumber: 'Section 14',
        title: 'Free Consent Defined',
        text: `Consent is said to be free where it is not caused by— (a) coercion as defined in section 15; (b) undue influence as defined in section 16; (c) fraud as defined in section 17; (d) misrepresentation as defined in section 18; or (e) mistake as defined in sections 19 and 20.`,
        keyCases: ['Barton v Armstrong [1976] AC 104', 'Royal Bank of Scotland v Etridge [2001] UKHL 44']
      },
      {
        sectionNumber: 'Section 66',
        title: 'Doctrine of Frustration',
        text: `(1) A contract is frustrated where an unforeseen event occurs after the formation of the contract which makes performance legally or physically impossible, or transforms the obligation into something fundamentally different from that contemplated by the parties at the time of execution.`,
        keyCases: ['Victoria Industries Ltd v Ramanbhai & Bros Ltd [1961] EA 11', 'Taylor v Caldwell (1863) 3 B&S 826']
      },
      {
        sectionNumber: 'Section 73',
        title: 'Damages for Breach of Contract',
        text: `Where a contract has been broken, the party who suffers by the breach is entitled to receive from the party who has broken the contract, compensation for any loss or damage caused to him or her which naturally arose in the usual course of things from the breach, or which the parties knew, when they made the contract, to be likely to result from the breach of it.`,
        keyCases: ['Hadley v Baxendale (1854) 9 Exch 341', 'Transroad Ltd v Bank of Uganda [2001] 2 EA 565']
      }
    ],
    repeals: ['Contracts Act Cap 73 (repealed)'],
    relatedRegulations: ['Sale of Goods and Supply of Services Regulations', 'Electronic Transactions Regulations 2013'],
    relatedCases: ['Greenboat Entertainment Ltd v Kampala City Council (2007)', 'Transroad Ltd v Bank of Uganda (2001)'],
    relatedConstitutionalArticles: ['Article 21', 'Article 26', 'Article 40']
  },
  {
    id: 'stat_penal_code',
    shortTitle: 'Penal Code Act (Cap. 120)',
    officialTitle: 'The Penal Code Act, Chapter 120, Laws of Uganda',
    longTitle: 'An Act to establish a code of criminal law for Uganda.',
    chapterNumber: 'Cap. 120',
    year: 1950,
    commencementDate: '15th June 1950',
    summary: 'The primary penal legislation defining indictable and summary criminal offenses in Uganda, including homicide, theft, assault, sexual offenses, corruption, and general defenses.',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 120 / Revised Laws of Uganda', 'Act of Parliament', '1950', 'Amended Edition 2022'),
    category: 'Criminal Law',
    sections: [
      {
        sectionNumber: 'Section 188',
        title: 'Murder Defined',
        text: `Any person who of malice aforethought causes the death of another person by an unlawful act or omission commits murder.`,
        keyCases: ['Uganda v Turwomwe [1978] HCB 17', 'R v Tubere s/o Ochen (1945) 12 EACA 63']
      },
      {
        sectionNumber: 'Section 191',
        title: 'Malice Aforethought',
        text: `Malice aforethought shall be deemed to be established by evidence proving an intention to cause the death of any person or an intention to cause grievous harm to any person.`,
        keyCases: ['Uganda v Fabiano Olungu [1972] EA 136', 'Kifamunte Henry v Uganda (1997) UGSC 4']
      },
      {
        sectionNumber: 'Section 187',
        title: 'Manslaughter',
        text: `Any person who by an unlawful act or omission causes the death of another person commits manslaughter. An unlawful omission is an omission amounting to culpable negligence to discharge a duty.`,
        keyCases: ['R v Mohan [1976] QB 1', 'Uganda v Stephen Egunyu [1977] HCB 12']
      },
      {
        sectionNumber: 'Section 254',
        title: 'Theft Defined',
        text: `A person who fraudulently and without claim of right takes anything capable of being stolen, or fraudulently converts to the use of any person other than the general or special owner thereof anything capable of being stolen, steals that thing.`,
        keyCases: ['Ojwang v Uganda (1975)', 'R v Ghosh [1982] QB 1053']
      }
    ],
    amendmentHistory: [
      { year: 2007, amendmentAct: 'Penal Code (Amendment) Act 2007', description: 'Reformed provisions relating to sexual offenses, defilement, and trafficking.' },
      { year: 2022, amendmentAct: 'Penal Code (Amendment) Act 2022', description: 'Reformed computer fraud and corporate criminal liability penalties.' }
    ],
    relatedRegulations: ['Criminal Procedure Rules', 'Police Standing Orders'],
    relatedCases: ['Uganda v Kyamanywa [2000] UGSC 3', 'Susan Kigula & Ors v Attorney General (2009) UGSC 6'],
    relatedConstitutionalArticles: ['Article 22', 'Article 24', 'Article 28']
  },
  {
    id: 'stat_land_act',
    shortTitle: 'Land Act (Cap. 227)',
    officialTitle: 'The Land Act, Chapter 227, Laws of Uganda',
    longTitle: 'An Act to provide for the tenure, ownership and management of land; to amend and consolidate the law relating to tenure; and to provide for other connected matters.',
    chapterNumber: 'Cap. 227',
    year: 1998,
    commencementDate: '2nd July 1998',
    summary: 'Comprehensive statutory regime governing customary, freehold, mailo, and leasehold tenures; certificate of customary ownership; lawful/bonafide occupancy; spousal consent under Section 39; District Land Boards and Area Land Committees.',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 227 / Acts of Parliament Supplement', 'Act of Parliament', '1998', 'Consolidated 2010'),
    category: 'Land Law',
    sections: [
      {
        sectionNumber: 'Section 3',
        title: 'Customary, Freehold, Mailo and Leasehold Tenures Defined',
        text: `(1) Customary tenure is a form of tenure applicable to a specific area of land and governed by rules generally accepted as binding by the community.\n(2) Freehold tenure is a form of tenure deriving its title from the grant of a registered certificate of title in perpetuity.\n(3) Mailo tenure is a form of tenure deriving its title from the Buganda Agreement 1900, involving separation of ownership of land from occupancy by tenants (Bibanja).\n(4) Leasehold tenure is a form of tenure created by contract or by operation of law where the tenant is granted exclusive possession for a specified period.`,
        keyCases: ['Kampala District Land Board v Venansio Babweyaka (2007) UGSC 11']
      },
      {
        sectionNumber: 'Section 29',
        title: 'Meaning of Lawful and Bonafide Occupant',
        text: `(1) "Lawful occupant" means a person occupying land under the Busuulu and Envujjo Law of 1928, or a person who entered the land with the consent of the registered owner.\n(2) "Bonafide occupant" means a person who, before the coming into force of the 1995 Constitution, had occupied and utilized or developed any land unchallenged by the registered owner or agent of the registered owner for twelve years or more.`,
        keyCases: ['Hilda Wilson Namusoke v Owalla’s Home Hotel Ltd (2018)', 'Muwanga v Kisenyi (2001)']
      },
      {
        sectionNumber: 'Section 39',
        title: 'Restrictions on Transfer of Family Land (Spousal Consent)',
        text: `(1) No person shall— (a) sell, exchange, transfer, pledge, mortgage or lease any family land; (b) enter into any contract for the sale, exchange, transfer, pledging, mortgage or lease of any family land; or (c) give away any family land inter vivos, except with the prior written consent of his or her spouse.\n(4) A transaction entered into without spousal consent required under subsection (1) is void.`,
        keyCases: ['Alice Okiror & Michael Okiror v Global Capital Save 2004 Ltd (2012) UGHC 118', 'Rose Mary Nalwadda v Beatrice Wamala (2014)']
      }
    ],
    amendmentHistory: [
      { year: 2004, amendmentAct: 'Land (Amendment) Act 2004', description: 'Strengthened spousal consent provisions and ground rent determination.' },
      { year: 2010, amendmentAct: 'Land (Amendment) Act 2010', description: 'Enhanced protections against unlawful evictions of Bibanja holders without court order.' }
    ],
    relatedRegulations: ['The Land Regulations 2001 (S.I. 100 of 2001)'],
    relatedCases: ['Alice Okiror v Global Capital Ltd (2012)', 'UNRA v Asuman Irumba (2015) UGSC 22'],
    relatedConstitutionalArticles: ['Article 26', 'Article 31', 'Article 237']
  },
  {
    id: 'stat_companies_2012',
    shortTitle: 'Companies Act, 2012',
    officialTitle: 'The Companies Act, 2012 (Act No. 1 of 2012)',
    longTitle: 'An Act to amend, consolidate and reform the law relating to the incorporation, regulation and administration of companies; to repeal the Companies Act, Cap. 110; and for related matters.',
    chapterNumber: 'Act No. 1 of 2012',
    year: 2012,
    commencementDate: '1st July 2013',
    summary: 'Governs corporate formation, single-member companies, corporate legal personality, lifting the corporate veil, directors\' fiduciary duties, shareholder protection, derivative actions, and capital maintenance.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 1 of 2012 / Uganda Gazette No. 54 Vol. CV', 'Act of Parliament', '2012', 'Current in Force'),
    category: 'Corporate & Commercial Law',
    sections: [
      {
        sectionNumber: 'Section 4',
        title: 'Mode of Forming Company (Single-Member Company Permitted)',
        text: `Any one or more persons may, for a lawful purpose, by subscribing their names to a memorandum of association and complying with the requirements of this Act in respect of registration, form an incorporated company.`,
        keyCases: ['Salomon v Salomon & Co Ltd [1897] AC 22']
      },
      {
        sectionNumber: 'Section 20',
        title: 'Lifting the Corporate Veil',
        text: `The High Court may, where a company is used for a fraudulent purpose or as a sham to evade legal obligations, disregard the corporate personality of the company and treat the liabilities as those of the individual shareholders or directors.`,
        keyCases: ['Sentamu v UCB [1983] HCB 59', 'Adams v Cape Industries plc [1990] Ch 433']
      },
      {
        sectionNumber: 'Section 198',
        title: 'General Duties of Directors',
        text: `(1) A director of a company shall act in accordance with the company’s constitution and only exercise powers for the purposes for which they are conferred.\n(2) A director shall act in good faith in what the director considers to be in the best interests of the company to promote its success.\n(3) A director shall exercise independent judgment and reasonable care, skill and diligence.`,
        keyCases: ['Uganda Telecom Ltd v Tanzanite Corporation (2007)', 'Howard Smith Ltd v Ampol Petroleum Ltd [1974] AC 821']
      },
      {
        sectionNumber: 'Section 248',
        title: 'Derivative Actions by Shareholders',
        text: `A member of a company may apply to the High Court for leave to bring an action in the name and on behalf of the company where directors have committed a breach of duty or fraud on the minority.`,
        keyCases: ['Foss v Harbottle (1843) 2 Hare 461', 'Edwards v Halliwell [1950] 2 All ER 1064']
      }
    ],
    repeals: ['Companies Act Cap 110 (repealed)'],
    relatedRegulations: ['Companies (General) Regulations 2012 (S.I. 1 of 2012)'],
    relatedCases: ['Bank of Uganda v Crane Bank Ltd [2022] UGSC 1', 'Salomon v Salomon [1897] AC 22'],
    relatedConstitutionalArticles: ['Article 26', 'Article 40']
  },
  {
    id: 'stat_succession_act',
    shortTitle: 'Succession Act (Cap. 162)',
    officialTitle: 'The Succession Act, Chapter 162 (as amended by the Succession Amendment Act, 2022)',
    longTitle: 'An Act to consolidate and amend the law relating to succession and the administration of the estates of deceased persons.',
    chapterNumber: 'Cap. 162',
    year: 1906,
    commencementDate: '15th February 1906',
    summary: 'Governs testate and intestate succession, execution of wills, testamentary capacity, residential holding protection for surviving spouses and minor children, letters of administration, and distribution percentages.',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 162 as amended by Act No. 4 of 2022', 'Act of Parliament', '1906', 'Amended Edition 2022'),
    category: 'Family & Succession Law',
    sections: [
      {
        sectionNumber: 'Section 27',
        title: 'Distribution on Intestacy (2022 Reform Percentages)',
        text: `Where an intestate dies survived by a spouse, lineal descendants and dependent relatives: (a) the surviving spouse shall receive 20%; (b) lineal descendants shall receive 75% distributed equally among them; (c) dependent relatives shall receive 5%.\nWhere there are no dependent relatives: surviving spouse 20%, lineal descendants 80%.`,
        keyCases: ['Law Advocacy for Women in Uganda v Attorney General (2007) UGCC 1', 'Best Kemigisa v Mabel Komuntale (2000)']
      },
      {
        sectionNumber: 'Section 26',
        title: 'Residential Holding Rights of Surviving Spouse and Children',
        text: `(1) The surviving spouse and minor children shall be entitled to occupy the residential holding and its curtilage during the lifetime of the surviving spouse or minority of the children, and the residential holding shall not be sold or distributed without an order of the High Court.`,
        keyCases: ['Administrator General v Joyce Nakintu (2015)']
      },
      {
        sectionNumber: 'Section 50',
        title: 'Formalities for Execution of Valid Will',
        text: `Every person of sound mind not being a minor may execute a will. The testator shall sign or affix his or her mark to the will in the presence of two or more attesting witnesses present at the same time.`,
        keyCases: ['Banks v Goodfellow (1870) LR 5 QB 549', 'Re Estate of Late Ssebunya (2012)']
      }
    ],
    amendmentHistory: [
      { year: 2022, amendmentAct: 'Succession (Amendment) Act, 2022 (Act No. 4 of 2022)', description: 'Eliminated gender discrimination in intestate distribution, protected surviving widowers and widows equally, and reformed residential holding protections.' }
    ],
    relatedRegulations: ['Succession (Prescribed Forms) Regulations S.I. 162-1'],
    relatedCases: ['Law Advocacy for Women in Uganda v AG [2007] UGCC 1', 'Julius Rwabinumi v Hope Bahimbisomwe [2013] UGSC 5'],
    relatedConstitutionalArticles: ['Article 21', 'Article 31', 'Article 33']
  },
  {
    id: 'stat_hrea_2019',
    shortTitle: 'Human Rights Enforcement Act, 2019',
    officialTitle: 'The Human Rights Enforcement Act, 2019 (Act No. 20 of 2019)',
    longTitle: 'An Act to give effect to article 50 of the Constitution by providing for the procedure of enforcing fundamental human rights and freedoms enshrined under Chapter Four of the Constitution.',
    chapterNumber: 'Act No. 20 of 2019',
    year: 2019,
    commencementDate: '26th April 2019',
    summary: 'Revolutionized human rights litigation by allowing actions to be instituted directly in the High Court or Chief Magistrates Courts without formal pleadings or filing fees; enforces personal liability on public officers who violate rights; mandates stay of criminal proceedings where rights were violated during arrest.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 20 of 2019 / Uganda Gazette No. 18 Vol. CXII', 'Act of Parliament', '26th April 2019'),
    category: 'Constitutional & Human Rights Law',
    sections: [
      {
        sectionNumber: 'Section 3',
        title: 'Jurisdiction to Enforce Human Rights',
        text: `(1) The High Court and a Chief Magistrate’s Court shall have jurisdiction to hear and determine applications for the enforcement of fundamental rights and freedoms under Chapter Four of the Constitution.\n(2) An application may be brought by notice of motion or oral complaint without formal court fees.`,
        keyCases: ['Uganda v Dr. Stella Nyanzi (2020)', 'Centre for Food and Adequate Living Rights (CEFROHT) v Attorney General (2021)']
      },
      {
        sectionNumber: 'Section 10',
        title: 'Personal Liability of Public Officers',
        text: `Where a court finds that a public officer has knowingly or willfully violated or infringed the human rights of any person, the court shall order that public officer to pay compensation personally in addition to any damages awarded against the State.`,
        keyCases: ['Mwenda v Attorney General (2022)', 'FHRI v Attorney General (2021)']
      },
      {
        sectionNumber: 'Section 15',
        title: 'Nullity of Evidence Obtained by Torture',
        text: `Any evidence obtained through torture, cruel, inhuman or degrading treatment shall not be admissible against any person in any court of law.`,
        keyCases: ['Kyamanywa v Uganda (2000) UGSC 3', 'Susan Kigula v AG (2009) UGSC 6']
      }
    ],
    relatedRegulations: ['Human Rights Enforcement (Procedure) Rules 2019'],
    relatedCases: ['Muwanga Kivumbi v AG [2008] UGCC 4', 'ACODE v AG (2005)'],
    relatedConstitutionalArticles: ['Article 20', 'Article 24', 'Article 44', 'Article 50']
  },
  {
    id: 'stat_civil_proc_act',
    shortTitle: 'Civil Procedure Act (Cap. 71)',
    officialTitle: 'The Civil Procedure Act, Chapter 71, Laws of Uganda',
    longTitle: 'An Act to consolidate and amend the law relating to the procedure of civil courts in Uganda.',
    chapterNumber: 'Cap. 71',
    year: 1928,
    commencementDate: '1st January 1928',
    summary: 'The primary substantive procedural statute establishing jurisdiction of civil courts, res judicata (S.7), stay of suit (S.6), foreign judgments, execution of decrees, attachment of property, and costs.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 71 / Revised Laws of Uganda', 'Act of Parliament', '1928', 'Consolidated Edition'),
    category: 'Civil Litigation & Procedure',
    sections: [
      {
        sectionNumber: 'Section 6',
        title: 'Stay of Suit (Sub Judice Doctrine)',
        text: `No court shall proceed with the trial of any suit in which the matter in issue is also directly and substantially in issue in a previously instituted suit between the same parties in the same or any other court having jurisdiction.`,
        keyCases: ['Gurdial Singh v Sohan Singh (1960)', 'Bank of Uganda v Crane Bank Ltd [2022] UGSC 1']
      },
      {
        sectionNumber: 'Section 7',
        title: 'Res Judicata',
        text: `No court shall try any suit or issue in which the matter directly and substantially in issue has been directly and substantially in issue in a former suit between the same parties in a court of competent jurisdiction and has been heard and finally decided.`,
        keyCases: ['Karia v Attorney General [2005] 1 EA 83', 'Greenboat Entertainment Ltd v KCC (2007)']
      },
      {
        sectionNumber: 'Section 27',
        title: 'Costs Follow the Event',
        text: `Subject to such conditions and limitations as may be prescribed, the costs of and incident to all suits shall be in the discretion of the court, but the court shall direct that costs shall follow the event unless the court for good reason orders otherwise.`,
        keyCases: ['Jennifer Rwanyarare v Attorney General (2003)', 'Kasirye Byaruhanga v UDB (2007) UGSC 2']
      }
    ],
    relatedRegulations: ['Civil Procedure Rules (S.I. 71-1)'],
    relatedCases: ['Giella v Cassman Brown [1973] EA 358', 'Kasirye Byaruhanga v UDB [2007] UGSC 2'],
    relatedConstitutionalArticles: ['Article 28', 'Article 126']
  },
  {
    id: 'stat_evidence_act',
    shortTitle: 'Evidence Act (Cap. 6)',
    officialTitle: 'The Evidence Act, Chapter 6, Laws of Uganda',
    longTitle: 'An Act to consolidate, define and amend the law of evidence in Uganda.',
    chapterNumber: 'Cap. 6',
    year: 1909,
    commencementDate: '1st August 1909',
    summary: 'Comprehensive evidence statute covering relevance, admissions, confessions, dying declarations (S.30), judicial notice (S.55), documentary evidence, best evidence rule, burden of proof (S.101-103), and electronic evidence admissibility (S.106-114).',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 6 / Revised Laws of Uganda', 'Act of Parliament', '1909', 'Consolidated Edition 2011'),
    category: 'Law of Evidence',
    sections: [
      {
        sectionNumber: 'Section 30(a)',
        title: 'Dying Declarations',
        text: `Statements, written or verbal, of relevant facts made by a person who is dead are relevant when the statement is made by a person as to the cause of his or her death, or as to any of the circumstances of the transaction which resulted in his or her death, in cases in which the cause of that person’s death comes into question.`,
        keyCases: ['Swami v King Emperor [1939] 1 All ER 396', 'Tindigwihura Mbahe v Uganda (1985) HCB 2']
      },
      {
        sectionNumber: 'Section 101',
        title: 'Burden of Proof',
        text: `(1) Whoever desires any court to give judgment as to any legal right or liability dependent on the existence of facts which he or she asserts must prove that those facts exist.\n(2) When a person is bound to prove the existence of any fact, it is said that the burden of proof lies on that person.`,
        keyCases: ['Woolmington v DPP [1935] AC 462', 'Miller v Minister of Pensions [1947] 2 All ER 372']
      },
      {
        sectionNumber: 'Section 114',
        title: 'Presumptions as to Electronic Messages and Digital Records',
        text: `The court may presume that an electronic message forwarded by the originator through an electronic mail system corresponds with the message as fed into his or her computer for transmission.`,
        keyCases: ['Uganda v Dr. Stella Nyanzi (2020)', 'Trust Bank Ltd v Paramount Auto Garage Ltd (2002)']
      }
    ],
    relatedRegulations: ['Electronic Transactions Regulations 2013'],
    relatedCases: ['Kifamunte Henry v Uganda (1997) UGSC 4', 'Woolmington v DPP [1935] AC 462'],
    relatedConstitutionalArticles: ['Article 28(3)(a)', 'Article 44(c)']
  },
  {
    id: 'stat_tia_act',
    shortTitle: 'Trial on Indictments Act (Cap. 23)',
    officialTitle: 'The Trial on Indictments Act, Chapter 23, Laws of Uganda',
    longTitle: 'An Act to consolidate the law relating to the procedure of the High Court in trial on indictment and for other matters.',
    chapterNumber: 'Cap. 23',
    year: 1971,
    commencementDate: '16th July 1971',
    summary: 'Governs criminal trials before the High Court of Uganda, framing of indictments, joinder of charges and accused, committal proceedings, assessors, pleas of guilty/not guilty, bail in capital trials, and sentencing.',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 23 / Revised Laws of Uganda', 'Act of Parliament', '1971', 'Consolidated Edition'),
    category: 'Criminal Procedure',
    sections: [
      {
        sectionNumber: 'Section 14',
        title: 'Bail in Indictable Offenses before the High Court',
        text: `(1) The High Court may at any stage in the proceedings release any accused person on bail, on his or her entering into a recognizance with or without sureties.\n(2) In considering an application for bail under this section, the court shall consider the nature of the accusation, the gravity of the offense, the antecedent of the applicant, and the likelihood of the applicant absconding.`,
        keyCases: ['Uganda v Dr. Kizza Besigye (2005)', 'Foundation for Human Rights Initiative v Attorney General (2008) UGCC 1']
      },
      {
        sectionNumber: 'Section 85',
        title: 'Summing up to Assessors and Judgment',
        text: `The trial judge shall sum up the evidence to the assessors and require each assessor to state his or her opinion orally. The judge shall record the opinions, but shall not be bound to conform to them in delivering final judgment.`,
        keyCases: ['Kifamunte Henry v Uganda (1997) UGSC 4', 'Andrea v Republic [1970] EA 46']
      }
    ],
    relatedRegulations: ['Judicature (Plea Bargaining) Rules 2019 S.I. 102 of 2019'],
    relatedCases: ['Susan Kigula v AG [2009] UGSC 6', 'Thomas Kwoyelo v Uganda [2018] UGSC 43'],
    relatedConstitutionalArticles: ['Article 23(6)', 'Article 28']
  },
  {
    id: 'stat_mca_act',
    shortTitle: 'Magistrates Courts Act (Cap. 16)',
    officialTitle: 'The Magistrates Courts Act, Chapter 16, Laws of Uganda',
    longTitle: 'An Act to amend and consolidate the law relating to the establishment, constitution and jurisdiction of magistrates courts.',
    chapterNumber: 'Cap. 16',
    year: 1970,
    commencementDate: '1st January 1971',
    summary: 'Governs the structure and jurisdiction of Chief Magistrates Courts, Grade I, and Grade II Magistrates Courts in civil and criminal matters, bail, summary trials, sentencing limitations, and appeals to the High Court.',
    status: 'Amended',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 16 / Revised Laws of Uganda', 'Act of Parliament', '1970', 'Consolidated Edition 2011'),
    category: 'Criminal & Civil Procedure',
    sections: [
      {
        sectionNumber: 'Section 75',
        title: 'Bail Jurisdiction of Magistrates Courts',
        text: `A magistrate’s court before which a person appears or is brought charged with an offense other than an offense specified in subsection (2) may release that person on bail.`,
        keyCases: ['Uganda v Lwanga (1988)', 'FHRI v Attorney General (2008)']
      },
      {
        sectionNumber: 'Section 207',
        title: 'Pecuniary Jurisdiction in Civil Matters',
        text: `The civil pecuniary jurisdiction of a Chief Magistrate is up to fifty million shillings (UGX 50,000,000/=), and for a Magistrate Grade I is up to twenty million shillings (UGX 20,000,000/=).`,
        keyCases: ['Kakooza v National Housing & Construction Corp (2005)']
      }
    ],
    relatedRegulations: ['Small Claims Procedure Rules'],
    relatedCases: ['FHRI v Attorney General [2008] UGCC 1'],
    relatedConstitutionalArticles: ['Article 23', 'Article 28', 'Article 126']
  },
  {
    id: 'stat_data_prot_2019',
    shortTitle: 'Data Protection and Privacy Act, 2019',
    officialTitle: 'The Data Protection and Privacy Act, 2019 (Act No. 9 of 2019)',
    longTitle: 'An Act to protect the privacy of the individual and of personal data by regulating the collection and processing of personal information.',
    chapterNumber: 'Act No. 9 of 2019',
    year: 2019,
    commencementDate: '3rd May 2019',
    summary: 'Protects constitutional privacy under Article 27; sets data protection principles (lawfulness, minimization, accuracy, purpose limitation, storage limitation, security); establishes Personal Data Protection Office (PDPO); mandates data subject consent and cross-border transfer safeguards.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 9 of 2019 / Uganda Gazette No. 20 Vol. CXII', 'Act of Parliament', '3rd May 2019'),
    category: 'Cyber Law & Technology',
    sections: [
      {
        sectionNumber: 'Section 3',
        title: 'Principles of Data Protection',
        text: `A data collector, data processor or data controller shall: (a) be accountable to the data subject for data collected; (b) collect and process data fairly and lawfully; (c) collect minimal personal data adequate for the intended purpose; (d) ensure data is accurate and up to date.`,
        keyCases: ['Unwanted Witness v NITA-U & AG (2022)']
      },
      {
        sectionNumber: 'Section 7',
        title: 'Consent Requirement for Processing Personal Data',
        text: `A person shall not collect or process personal data without the prior informed consent of the data subject, unless processing is necessary for performance of a contract or compliance with a legal obligation.`,
        keyCases: ['Stella Nyanzi v Uganda (2020)']
      }
    ],
    relatedRegulations: ['The Data Protection and Privacy Regulations, 2021 (S.I. No. 84 of 2021)'],
    relatedCases: ['Unwanted Witness v NITA-U (2022)'],
    relatedConstitutionalArticles: ['Article 27', 'Article 41']
  },
  {
    id: 'stat_employment_2006',
    shortTitle: 'Employment Act, 2006',
    officialTitle: 'The Employment Act, 2006 (Act No. 6 of 2006)',
    longTitle: 'An Act to repeal the Employment Act, Cap. 219; to declare and define the fundamental rights of employees; to provide for minimum terms and conditions of employment.',
    chapterNumber: 'Act No. 6 of 2006',
    year: 2006,
    commencementDate: '8th June 2006',
    summary: 'Comprehensive labor legislation governing contracts of service, prohibition of child labor, termination notice periods, unfair dismissal remedies, severance allowance, maternity/paternity leave, and Labour Officers jurisdiction.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 6 of 2006 / Uganda Gazette No. 35 Vol. XCIX', 'Act of Parliament', '8th June 2006'),
    category: 'Labour & Employment Law',
    sections: [
      {
        sectionNumber: 'Section 68',
        title: 'Reason for Dismissal and Burden of Proof on Employer',
        text: `(1) In any claim arising out of termination of a contract of service, the employer shall prove the reason or reasons for the dismissal, and where the employer fails to do so, the dismissal shall be deemed to have been unfair.\n(2) The reason or reasons for dismissal shall be matters which the employer at the time of dismissal genuinely believed to exist.`,
        keyCases: ['Donna Kamuli v DFCU Bank Ltd (Industrial Court Claim No. 002 of 2014)', 'Hilda Musinguzi v Stanbic Bank (U) Ltd (2015)']
      },
      {
        sectionNumber: 'Section 71',
        title: 'Remedies for Unfair Termination',
        text: `Where a Labour Officer or the Industrial Court finds that a dismissal was unfair, the court may order reinstatement of the employee or award compensation not exceeding four weeks\' wages for each completed year of service.`,
        keyCases: ['Grace Matovu v Barclays Bank of Uganda (2016)']
      }
    ],
    relatedRegulations: ['Employment Regulations 2011'],
    relatedCases: ['Donna Kamuli v DFCU Bank (2014)', 'Hilda Musinguzi v Stanbic Bank (2015)'],
    relatedConstitutionalArticles: ['Article 40', 'Article 42']
  },
  {
    id: 'stat_nema_2019',
    shortTitle: 'National Environment Act, 2019',
    officialTitle: 'The National Environment Act, 2019 (Act No. 5 of 2019)',
    longTitle: 'An Act to repeal, replace and reform the National Environment Act, Cap. 153; to manage the environment for sustainable development; to provide for emerging environmental issues including climate change and oil and gas management.',
    chapterNumber: 'Act No. 5 of 2019',
    year: 2019,
    commencementDate: '7th March 2019',
    summary: 'Primary environmental protection statute establishing the National Environment Management Authority (NEMA), mandatory Environmental and Social Impact Assessments (ESIA), Polluter Pays Principle, plastic waste regulation, and environmental restoration orders.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Act No. 5 of 2019 / Uganda Gazette No. 10 Vol. CXII', 'Act of Parliament', '7th March 2019'),
    category: 'Environmental Law',
    sections: [
      {
        sectionNumber: 'Section 3',
        title: 'Right to a Clean and Healthy Environment & Duty of Citizens',
        text: `(1) Every person has a right to a clean and healthy environment in accordance with the Constitution and the principles of sustainable development.\n(2) Every person has a duty to create, maintain and enhance the environment, including the duty to prevent pollution and degradation.`,
        keyCases: ['Greenwatch v Attorney General & NEMA (2002)', 'ACODE v Attorney General (2005)']
      },
      {
        sectionNumber: 'Section 112',
        title: 'Polluter Pays Principle and Strict Liability for Environmental Damage',
        text: `(1) Any person who causes pollution or environmental damage shall be strictly liable for the costs of cleaning up the pollution, restoring the environment, and paying compensation to victims of the damage.`,
        keyCases: ['NAPE v AES Nile Power Ltd (1999)']
      }
    ],
    relatedRegulations: ['National Environment (ESIA) Regulations 2020 S.I. 17 of 2020'],
    relatedCases: ['Greenwatch v AG & NEMA (2002)', 'ACODE v AG (2005)'],
    relatedConstitutionalArticles: ['Article 39', 'Article 245']
  },
  {
    id: 'stat_rta_cap_230',
    shortTitle: 'Registration of Titles Act (Cap. 230)',
    officialTitle: 'The Registration of Titles Act, Chapter 230, Laws of Uganda',
    longTitle: 'An Act to consolidate and amend the law relating to the registration of titles to land.',
    chapterNumber: 'Cap. 230',
    year: 1924,
    commencementDate: '1st May 1924',
    summary: 'Codifies the Torrens System of land registration in Uganda; establishes indefeasibility of registered title (S.59 & S.176); defines statutory fraud exception; regulates mortgages, caveats, leases, and transfers.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 230 / Revised Laws of Uganda', 'Act of Parliament', '1924', 'Consolidated Edition'),
    category: 'Land Law',
    sections: [
      {
        sectionNumber: 'Section 59',
        title: 'Certificate of Title as Conclusive Evidence of Title',
        text: `No certificate of title issued under this Act shall be impeached or defeasible on account of any informality or irregularity in the application or in the proceedings, and every certificate of title shall be received in all courts as conclusive evidence that the person named is seised or possessed of the estate.`,
        keyCases: ['Kampala District Land Board v Venansio Babweyaka (2007)', 'Fredrick Zaabwe v Orient Bank Ltd (2006) UGSC 5']
      },
      {
        sectionNumber: 'Section 77',
        title: 'Fraud Exception to Indefeasibility of Title',
        text: `Any certificate of title, entry, erasure or alteration in the Register Book procured or made by fraud shall be void as against all parties to that fraud.`,
        keyCases: ['David Sejjaka Nalima v Rebecca Musoke (1985) HCB 26', 'Kampala Bottlers Ltd v Damanico (U) Ltd (1992)']
      }
    ],
    relatedRegulations: ['Registration of Titles (Forms) Rules'],
    relatedCases: ['Fredrick Zaabwe v Orient Bank (2006)', 'Kampala District Land Board v Babweyaka (2007)'],
    relatedConstitutionalArticles: ['Article 26', 'Article 237']
  },
  {
    id: 'stat_advocates_act',
    shortTitle: 'Advocates Act (Cap. 267)',
    officialTitle: 'The Advocates Act, Chapter 267, Laws of Uganda',
    longTitle: 'An Act to amend and consolidate the law relating to advocates and for other purposes connected therewith.',
    chapterNumber: 'Cap. 267',
    year: 1970,
    commencementDate: '1st July 1970',
    summary: 'Governs the legal profession in Uganda, enrollment of advocates, Law Council disciplinary committee, professional conduct and etiquette, taxation of advocate-client bills of costs, and practicing certificates.',
    status: 'Current',
    fullTextAvailable: true,
    sourceMetadata: createVerifiedSource('PARLIAMENT', 'Cap. 267 / Revised Laws of Uganda', 'Act of Parliament', '1970', 'Consolidated Edition'),
    category: 'Legal Ethics & Profession',
    sections: [
      {
        sectionNumber: 'Section 19',
        title: 'Advocate’s Practicing Certificate Requirement',
        text: `No advocate shall practice as an advocate in any court without holding a valid practicing certificate issued by the Chief Registrar of the Courts of Judicature.`,
        keyCases: ['Prof. Syed Huq v The Islamic University in Uganda (1995)', 'Makula International Ltd v His Eminence Cardinal Nsubuga (1982) HCB 11']
      },
      {
        sectionNumber: 'Section 57',
        title: 'Remuneration Agreements and Bill of Costs',
        text: `An advocate may make an agreement in writing with his or her client respecting the amount and manner of payment of remuneration for whole or part of past or future services.`,
        keyCases: ['Kasirye Byaruhanga & Co Advocates v UDB (2007) UGSC 2']
      }
    ],
    relatedRegulations: ['Advocates (Professional Conduct) Regulations S.I. 267-1', 'Advocates (Remuneration) Regulations S.I. 267-2'],
    relatedCases: ['Kasirye Byaruhanga v UDB (2007) UGSC 2', 'Makula International v Cardinal Nsubuga [1982] HCB 11'],
    relatedConstitutionalArticles: ['Article 28(3)(d)', 'Article 126']
  }
];
