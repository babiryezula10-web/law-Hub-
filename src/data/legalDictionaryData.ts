import { LegalDictionaryTerm, BlacksLawTerm } from '../types';

export const legalDictionaryTerms: LegalDictionaryTerm[] = [
  {
    id: 'dict_ratio_decidendi',
    term: 'Ratio Decidendi',
    pronunciation: 'ray-shee-oh dess-ih-den-dye',
    definition: 'The legal rule, reason, or principle upon which a court bases its decision and which constitutes the binding precedent for lower courts.',
    simpleExplanation: 'The core legal reason why a judge decided a case in a certain way. This is the part of the judgment that other courts must follow in future similar cases.',
    legalMeaning: 'The essential proposition of law necessary to the decision. Under the doctrine of stare decisis in Uganda, ratios of the Supreme Court bind all subordinate courts (Court of Appeal, High Court, Magistrates).',
    exampleSentence: 'In Charles Onyango Obbo v AG, the ratio decidendi was that restrictions on freedom of expression must be demonstrably justifiable in a free and democratic society.',
    relatedTerms: ['Obiter Dicta', 'Stare Decisis', 'Precedent', 'Binding Authority'],
    relevantCases: ['Charles Onyango Obbo & Andrew Mwenda v AG (2004) UGSC 1', 'Major Gen David Tinyefuza v AG (1997) UGCC 3'],
    relevantStatutes: ['Constitution of Uganda 1995 Art 132(4)', 'Judicature Act Cap 13'],
    category: 'Jurisprudence & Legal Method'
  },
  {
    id: 'dict_obiter_dictum',
    term: 'Obiter Dictum',
    pronunciation: 'oh-bih-ter dik-tum',
    definition: 'A judge\'s expression of opinion uttered in court or in a written judgment, but not essential to the decision and therefore not legally binding as a precedent.',
    simpleExplanation: 'Remarks said "by the way" in a judgment that do not decide the direct legal issue. They are persuasive but not strictly binding.',
    legalMeaning: 'Judicial statements made in passing. While not binding under Article 132(4) of the Constitution, obiter from senior courts like the Supreme Court carries high persuasive value in Ugandan litigation.',
    exampleSentence: 'The judge\'s commentary on hypothetical contractual warranties was obiter dictum since the contract had already been discharged by agreement.',
    relatedTerms: ['Ratio Decidendi', 'Persuasive Precedent', 'Judicial Dictum'],
    relevantCases: ['Bank of Uganda v Crane Bank Ltd (2022) UGSC 13'],
    relevantStatutes: ['Judicature Act Cap 13'],
    category: 'Jurisprudence & Legal Method'
  },
  {
    id: 'dict_habeas_corpus',
    term: 'Habeas Corpus',
    pronunciation: 'hay-bee-us kor-pus',
    definition: 'A prerogative writ requiring a person under arrest or unlawful detention to be brought before a judge or into court, especially to secure their release unless lawful grounds are shown.',
    simpleExplanation: 'A court order that forces the police or military to produce a detained person before court to prove why they are being held. If the detention is illegal, the court orders their immediate release.',
    legalMeaning: 'Guaranteed as a non-derogable right in Article 23(9) and Article 44(d) of the 1995 Constitution. Enforceable under the Judicature (Habeas Corpus) Rules and Section 34 of the Judicature Act.',
    exampleSentence: 'Counsel filed an urgent application for a writ of habeas corpus ad subjiciendum after the suspect was detained for more than 48 hours without charge.',
    relatedTerms: ['Article 23', 'Personal Liberty', 'Mandamus', 'Certiorari', '48-hour rule'],
    relevantCases: ['Grace Ibingira & Ors v Uganda [1966] EA 306', 'Michael Kabaziguruka v Attorney General [2021] UGCC 14'],
    relevantStatutes: ['1995 Constitution Art 23(9), 44(d)', 'Judicature Act Cap 13 S.34', 'Human Rights (Enforcement) Act 2019'],
    category: 'Constitutional & Human Rights'
  },
  {
    id: 'dict_mens_rea',
    term: 'Mens Rea',
    pronunciation: 'menz ray-ah',
    definition: 'The intention or knowledge of wrongdoing that constitutes part of a crime, as opposed to the action or conduct of the accused (actus reus).',
    simpleExplanation: 'The guilty mind or criminal intention required to convict someone of an offence.',
    legalMeaning: 'Under Section 8 and 9 of the Penal Code Act Cap 120, criminal liability generally requires concurrence of mens rea (intention, recklessness, or negligence) and actus reus, subject to statutory strict liability offences.',
    exampleSentence: 'The prosecution failed to prove malice aforethought as the requisite mens rea for murder under Section 188 of the Penal Code Act.',
    relatedTerms: ['Actus Reus', 'Malice Aforethought', 'Strict Liability', 'Recklessness'],
    relevantCases: ['Uganda v Kwoyelo [2018] UGICD 1', 'Woolmington v DPP [1935] AC 462', 'Andrea v Republic [1970] EA 46'],
    relevantStatutes: ['Penal Code Act Cap 120 S.8, 9, 188, 191'],
    category: 'Criminal Law'
  },
  {
    id: 'dict_actus_reus',
    term: 'Actus Reus',
    pronunciation: 'ak-tus ray-us',
    definition: 'The objective physical element of a crime; the wrongful act, omission, or state of affairs that constitutes the prohibited physical conduct.',
    simpleExplanation: 'The actual physical forbidden deed or illegal failure to act that constitutes the crime.',
    legalMeaning: 'The voluntary physical conduct, omission where there was a legal duty, or prohibited state of affairs prohibited by criminal statute.',
    exampleSentence: 'The actus reus of theft under Section 254 of the Penal Code Act was established when the accused took the motorcycle without consent.',
    relatedTerms: ['Mens Rea', 'Concurrence', 'Causation', 'Voluntary Act'],
    relevantCases: ['Uganda v John Ochieng (1992) UGHCR 4'],
    relevantStatutes: ['Penal Code Act Cap 120 S.254'],
    category: 'Criminal Law'
  },
  {
    id: 'dict_ultra_vires',
    term: 'Ultra Vires',
    pronunciation: 'ul-trah vye-reez',
    definition: 'Beyond the legal powers or authority of a person, statutory corporation, minister, or government institution.',
    simpleExplanation: 'Acting beyond the lawful authority given by the Constitution, an Act of Parliament, or company memorandum.',
    legalMeaning: 'Actions taken outside statutory authority are null and void under administrative law and Article 2 of the Constitution. Also applies in company law under Section 51 of the Companies Act 2012 regarding company objects.',
    exampleSentence: 'The Minister\'s directive banning public assemblies without statutory notice was declared ultra vires the Police Act and unconstitutional under Article 29.',
    relatedTerms: ['Intra Vires', 'Constitutional Supremacy', 'Judicial Review', 'Illegality'],
    relevantCases: ['Muwanga Kivumbi v Attorney General [2008] UGCC 4', 'Amalgamated Properties v AG [1976]'],
    relevantStatutes: ['1995 Constitution Art 2 & 42', 'Judicature Act Cap 13 S.36', 'Civil Procedure Rules Order 52'],
    category: 'Administrative Law & Public Law'
  },
  {
    id: 'dict_bona_fide_occupant',
    term: 'Bona Fide Occupant',
    pronunciation: 'boh-nah fye-dee ok-yoo-pant',
    definition: 'A person who entered land without the consent of the registered owner and remained unchallenged for twelve years or more before the coming into force of the 1995 Constitution, or was settled on the land by the Government.',
    simpleExplanation: 'A squatter or tenant who has lived on someone else\'s registered land for at least 12 years before 1995 without the owner challenging them, giving them protected statutory occupancy rights under Ugandan law.',
    legalMeaning: 'Defined under Section 29(2) of the Land Act Cap 227 and protected under Article 237(8) of the 1995 Constitution. They are entitled to obtain a Certificate of Occupancy and pay nominal ground rent (Busuulu).',
    exampleSentence: 'The defendant established that his family settled on the mailo land in 1978 without challenge, proving his status as a bona fide occupant entitled to statutory protection under Section 29.',
    relatedTerms: ['Lawful Occupant', 'Mailo Land', 'Busuulu', 'Certificate of Occupancy', 'Section 39 Land Act'],
    relevantCases: ['Hilda Wilson Namusoke & 3 Ors v Owalla’s Home Hotel Ltd [2018] UGSC 54', 'Kampala District Land Board v Venansio Babweyaka (2007) UGSC 2'],
    relevantStatutes: ['1995 Constitution Art 237(8)', 'Land Act Cap 227 S.29, 31, 32', 'Land Regulations 2001 (S.I. 100/2001)'],
    category: 'Land Law & Property'
  },
  {
    id: 'dict_spousal_consent',
    term: 'Spousal Consent',
    pronunciation: 'spow-zal kon-sent',
    definition: 'Mandatory statutory requirement under Ugandan land law requiring a spouse to give written, informed consent before any transfer, sale, gift, lease, or mortgage of family matrimonial land.',
    simpleExplanation: 'A mandatory legal rule in Uganda requiring a husband or wife to sign and approve before their family land or home can be sold or mortgaged.',
    legalMeaning: 'Under Section 39 of the Land Act Cap 227 (as amended in 2004), any transaction involving family land without written spousal consent (Form 4 of Land Regulations 2001) is void ab initio.',
    exampleSentence: 'The bank\'s mortgage was voided because the loan officer failed to verify whether the deponent\'s wife had provided valid spousal consent under Section 39 of the Land Act.',
    relatedTerms: ['Section 39 Land Act', 'Family Land', 'Matrimonial Home', 'Void Ab Initio', 'Form 4'],
    relevantCases: ['Alice Okiror & Anor v Global Capital Ltd [2012] UGCOMMC 142', 'Mifumi (U) Ltd v Attorney General [2015] UGCC 2'],
    relevantStatutes: ['Land Act Cap 227 S.39', 'Land (Amendment) Act 2004', 'Land Regulations 2001 S.I. 100/2001'],
    category: 'Land Law & Family Law'
  },
  {
    id: 'dict_locus_standi',
    term: 'Locus Standi',
    pronunciation: 'loh-kus stan-dye',
    definition: 'The legal capacity or right of an individual or organization to bring an action or be heard before a court of law.',
    simpleExplanation: 'The right or legal standing of a person or group to sue in court.',
    legalMeaning: 'Under common law, a plaintiff must show direct personal interest. However, in Uganda, Article 50(2) of the Constitution and Section 3 of the Human Rights (Enforcement) Act 2019 provide broad public interest standing, allowing any person or organization to sue on behalf of others for human rights violations.',
    exampleSentence: 'Under Article 50 of the Constitution, the human rights organization had full locus standi to petition the court on behalf of marginalized communities.',
    relatedTerms: ['Public Interest Litigation', 'Article 50', 'Aggrieved Party', 'Human Rights Enforcement'],
    relevantCases: ['Uganda Law Society v Attorney General [2006] UGCC 10', 'Bank of Uganda v Crane Bank Ltd [2022] UGSC 13'],
    relevantStatutes: ['1995 Constitution Art 50(2), 137(3)', 'Human Rights (Enforcement) Act 2019 S.3'],
    category: 'Civil Procedure & Constitutional'
  },
  {
    id: 'dict_stare_decisis',
    term: 'Stare Decisis',
    pronunciation: 'stah-ray deh-sye-sis',
    definition: 'The legal doctrine that obligates courts to follow historical precedents when resolving a case with substantially identical facts.',
    simpleExplanation: '"To stand by things decided." Courts must adhere to previous rulings of higher courts to maintain certainty and predictability in the law.',
    legalMeaning: 'Codified in Article 132(4) of the 1995 Constitution (Supreme Court decisions bind all subordinate courts, though Supreme Court may depart from its own decision when it appears right to do so).',
    exampleSentence: 'The High Court was bound by the doctrine of stare decisis to follow the Supreme Court\'s earlier interpretation of Section 10 of the Contracts Act.',
    relatedTerms: ['Precedent', 'Ratio Decidendi', 'Hierarchy of Courts', 'Article 132(4)'],
    relevantCases: ['Major General David Tinyefuza v Attorney General (1998) UGSC 2'],
    relevantStatutes: ['1995 Constitution Art 132(4)', 'Judicature Act Cap 13 S.15'],
    category: 'Jurisprudence & Legal Method'
  },
  {
    id: 'dict_certiorari',
    term: 'Certiorari',
    pronunciation: 'sur-shee-uh-rair-eye',
    definition: 'An order of judicial review issued by the High Court quashing an unlawful decision made by an inferior court, tribunal, or public body.',
    simpleExplanation: 'A High Court order that cancels or throws out an illegal decision made by a lower tribunal, minister, or public officer.',
    legalMeaning: 'Available under Section 36 of the Judicature Act Cap 13 and Civil Procedure Rules Order 52 to correct excess of jurisdiction, breach of natural justice, or error of law on the face of the record.',
    exampleSentence: 'The High Court issued an order of certiorari quashing the disciplinary committee\'s expulsion of the student because they had denied her a fair hearing.',
    relatedTerms: ['Mandamus', 'Prohibition', 'Judicial Review', 'Natural Justice', 'Article 42'],
    relevantCases: ['John Jet Tumwebaze v Makerere University Council (2007)', 'Ridge v Baldwin [1964] AC 40'],
    relevantStatutes: ['1995 Constitution Art 42', 'Judicature Act Cap 13 S.36', 'Civil Procedure Rules Order 52'],
    category: 'Administrative Law'
  },
  {
    id: 'dict_mandamus',
    term: 'Mandamus',
    pronunciation: 'man-day-mus',
    definition: 'A judicial order issued by the High Court commanding a public official, government department, or statutory body to perform a mandatory public or statutory duty.',
    simpleExplanation: 'A court order commanding a public officer or government office to do their statutory duty which they have failed or refused to do.',
    legalMeaning: 'Prerogative remedy under Section 36 Judicature Act requiring proof of a specific demand by the applicant and an unlawful refusal or unreasonable delay by the public body.',
    exampleSentence: 'Counsel applied for an order of mandamus directing the Registrar of Titles to issue the duplicate certificate of title following a valid conveyance.',
    relatedTerms: ['Certiorari', 'Prohibition', 'Public Duty', 'Judicial Review'],
    relevantCases: ['Attorney General v Major General David Tinyefuza (1998) UGSC 2'],
    relevantStatutes: ['1995 Constitution Art 42', 'Judicature Act Cap 13 S.36'],
    category: 'Administrative Law'
  },
  {
    id: 'dict_prohibition',
    term: 'Prohibition',
    pronunciation: 'proh-hih-bish-un',
    definition: 'An order issued by the High Court forbidding an inferior court, administrative tribunal, or public official from continuing proceedings in excess of jurisdiction or in violation of natural justice.',
    simpleExplanation: 'A court order stopping a lower tribunal or public official from doing something illegal before they actually do it.',
    legalMeaning: 'Preventative administrative law remedy issued before the unlawful decision is finalized, contrasting with certiorari which quashes an existing decision.',
    exampleSentence: 'The High Court issued an order of prohibition restraining the tribunal from hearing the tax appeal without the required statutory panel quorum.',
    relatedTerms: ['Certiorari', 'Mandamus', 'Injunction', 'Jurisdiction'],
    relevantCases: ['Uganda Law Society v Attorney General [2006] UGCC 10'],
    relevantStatutes: ['Judicature Act Cap 13 S.36', '1995 Constitution Art 42'],
    category: 'Administrative Law'
  },
  {
    id: 'dict_sub_judice',
    term: 'Sub Judice',
    pronunciation: 'sub joo-dih-see',
    definition: 'Under judicial consideration and therefore prohibited from public discussion or political debate outside the court that could prejudice the fair trial of the matter.',
    simpleExplanation: 'A case currently being decided in court. People and media are prohibited from making statements that could unfairly influence the trial.',
    legalMeaning: 'Recognized in Ugandan parliamentary procedure and contempt of court jurisprudence to safeguard the constitutional right to a fair hearing under Article 28 of the 1995 Constitution.',
    exampleSentence: 'The Speaker ruled that MPs could not debate the ongoing constitutional petition because the matter was sub judice.',
    relatedTerms: ['Contempt of Court', 'Article 28 Fair Hearing', 'Rule of Law'],
    relevantCases: ['Uganda v Editor of The Monitor [1997]'],
    relevantStatutes: ['1995 Constitution Art 28 & 128'],
    category: 'Civil & Criminal Procedure'
  },
  {
    id: 'dict_injunction',
    term: 'Temporary Injunction',
    pronunciation: 'tem-puh-rer-ee in-junk-shun',
    definition: 'An equitable, interlocutory court order restraining a party from doing an act, or requiring them to preserve the status quo until the final determination of the main suit.',
    simpleExplanation: 'A temporary order from a judge stopping someone from doing something (like selling disputed land or demolishing a building) until the main case is decided.',
    legalMeaning: 'Governed by Order 39 Rule 1 of the Civil Procedure Rules S.I. 71-1 and the three-pronged test in *Giella v Cassman Brown & Co Ltd* [1973] EA 358: prima facie case with probability of success, irreparable injury not compensable by damages, and balance of convenience.',
    exampleSentence: 'The plaintiff secured a temporary injunction under Order 39 to halt eviction proceedings until the land ownership suit was tried.',
    relatedTerms: ['Order 39', 'Giella v Cassman Brown', 'Status Quo', 'Irreparable Injury', 'Balance of Convenience'],
    relevantCases: ['Giella v Cassman Brown & Co Ltd [1973] EA 358', 'Kiyimba Kaggwa v Haji Abdu Nasser Katende [1985] HCB 43'],
    relevantStatutes: ['Civil Procedure Rules S.I. 71-1 Order 39', 'Judicature Act Cap 13 S.33'],
    category: 'Civil Procedure & Litigation'
  },
  {
    id: 'dict_prima_facie',
    term: 'Prima Facie',
    pronunciation: 'pry-mah fay-shee',
    definition: 'At first sight; based on first impression; accepted as correct until proven otherwise, sufficient to establish a fact unless rebutted.',
    simpleExplanation: 'Evidence that on the face of it is strong enough to prove a point or case, unless the other side brings evidence to disprove it.',
    legalMeaning: 'In criminal trials under Section 73 of Trial on Indictments Act, if the prosecution establishes a prima facie case at the close of its case, the court will place the accused on defence; otherwise the accused is acquitted.',
    exampleSentence: 'The trial judge held that the prosecution had established a prima facie case of fraudulent conversion, requiring the accused to enter their defence.',
    relatedTerms: ['Standard of Proof', 'Burden of Proof', 'Submission of No Case to Answer'],
    relevantCases: ['Ramanlal Trambaklal Bhatt v R [1957] EA 332', 'Uganda v Thomas Kwoyelo [2018] UGICD 1'],
    relevantStatutes: ['Trial on Indictments Act Cap 23 S.73', 'Magistrates Courts Act Cap 16 S.127'],
    category: 'Evidence & Criminal Procedure'
  },
  {
    id: 'dict_estoppel',
    term: 'Estoppel',
    pronunciation: 'es-top-el',
    definition: 'A legal bar that precludes a person from denying or asserting anything to the contrary of that which has, in contemplation of law, been established as the truth, either by the acts of judicial or legislative officers, or by the person\'s own acts or representations.',
    simpleExplanation: 'A rule preventing a person from going back on their word or past promise after someone else has relied on it to their detriment.',
    legalMeaning: 'Codified in Section 113 of the Evidence Act Cap 6 and recognized under promissory estoppel principles in contract law.',
    exampleSentence: 'The landlord was stopped by the doctrine of promissory estoppel from demanding full rent arrears after promising a discount during renovations.',
    relatedTerms: ['Promissory Estoppel', 'Section 113 Evidence Act', 'Representation', 'Detriment'],
    relevantCases: ['Central London Property Trust v High Trees House [1947] KB 130', 'Century Enterprises Ltd v Uganda Post & Telecommunications [1994] III KALR 95'],
    relevantStatutes: ['Evidence Act Cap 6 S.113', 'Contracts Act 2010'],
    category: 'Law of Contract & Evidence'
  },
  {
    id: 'dict_res_judicata',
    term: 'Res Judicata',
    pronunciation: 'rez joo-dih-kah-tah',
    definition: 'A matter that has been adjudicated by a competent court and may not be pursued again by the same parties.',
    simpleExplanation: 'A case that has already been fully decided by a competent court cannot be filed again between the same people over the same dispute.',
    legalMeaning: 'Codified in Section 7 of the Civil Procedure Act Cap 71 to prevent multiplicity of suits and protect the finality of judicial decisions.',
    exampleSentence: 'The defendant raised a preliminary objection that the suit was barred by res judicata because the Chief Magistrate had dismissed the identical land claim in 2018.',
    relatedTerms: ['Section 7 CPA', 'Finality of Litigation', 'Cause of Action Estoppel', 'Issue Estoppel'],
    relevantCases: ['Kasirye Byaruhanga & Co Advocates v UDB (2007) UGSC 2', 'Semakula v Musoke [1981] HCB 46'],
    relevantStatutes: ['Civil Procedure Act Cap 71 S.7', '1995 Constitution Art 126'],
    category: 'Civil Procedure'
  }
];

// Lawful Legal Terminology Resource (Common Law, Public Domain, & Ugandan Legal Lexicon)
export const blacksLawDictionary: BlacksLawTerm[] = [
  {
    id: 'blk_jurisdiction',
    term: 'Jurisdiction',
    etymology: 'Latin: jurisdictio (jus = law, dicere = to speak)',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'The official power, authority, and territorial or subject-matter scope of a court or judicial tribunal to make legal decisions, try actions, and pronounce judgments.',
    subDefinitions: [
      'Subject-Matter Jurisdiction: Authority of a court to hear the specific type or class of controversy (e.g. Constitutional Court over constitutional petitions).',
      'Pecuniary Jurisdiction: Monetary limit of claims a court or magistrate is empowered to determine.',
      'Territorial Jurisdiction: Geographical boundary within which a court\'s authority operates.'
    ],
    ugandanApplication: 'Jurisdiction is a creature of statute and the Constitution. In *Makula International Ltd v His Eminence Cardinal Nsubuga* [1982] HCB 11, the Court of Appeal established that a court cannot confer jurisdiction upon itself by consent, and an order made without jurisdiction is a nullity ab initio.',
    crossReferences: ['Pecuniary Limits', 'Ultra Vires', 'Article 137', 'Magistrates Courts Act Cap 16'],
    category: 'Civil Procedure & Constitutional Law'
  },
  {
    id: 'blk_ultra_vires',
    term: 'Ultra Vires',
    etymology: 'Latin: "beyond the powers"',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'An act performed without any legal authority or exceeding the scope of authority granted by the Constitution, statute, delegated legislation, or corporate constitution.',
    subDefinitions: [
      'Substantive Ultra Vires: Where an authority enacts a rule or takes an action outside the substantive power conferred by Parliament.',
      'Procedural Ultra Vires: Where mandatory statutory procedural steps (such as consultation or gazetting) were omitted prior to the action.'
    ],
    ugandanApplication: 'Under Article 2(2) of the 1995 Constitution, any law or action inconsistent with the Constitution is void to the extent of the inconsistency. Applied in *Muwanga Kivumbi v Attorney General* [2008] UGCC 4 to strike down Section 32(2) of the Police Act.',
    crossReferences: ['Constitutional Supremacy', 'Judicial Review', 'Certiorari', 'Companies Act 2012'],
    category: 'Administrative & Constitutional Law'
  },
  {
    id: 'blk_bail',
    term: 'Bail',
    etymology: 'Old French: baillier (to deliver, hand over, or entrust)',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'The provisional release of an accused person awaiting trial or appeal, usually upon security being given or conditions being imposed for their appearance before the court at a specified date and time.',
    subDefinitions: [
      'Police Bond: Administrative release by the police within 48 hours without fee under Section 38 of the Police Act.',
      'Court Bail: Judicial release under Article 23(6) of the Constitution on terms fixed by the magistrate or judge.',
      'Mandatory Statutory Bail: Constitutional entitlement to release after 60 days on remand (or 180 days for offences triable only by High Court) under Article 23(6)(b) & (c).'
    ],
    ugandanApplication: 'Article 23(6)(a) guarantees the fundamental right to apply for bail. In *Foundation for Human Rights Initiative (FHRI) v Attorney General* [2008] UGCC 1, the Constitutional Court reaffirmed that bail is a constitutional right grounded on the presumption of innocence under Article 28(3)(a).',
    crossReferences: ['Article 23', 'Presumption of Innocence', 'Surety', 'Trial on Indictments Act'],
    category: 'Criminal Procedure & Human Rights'
  },
  {
    id: 'blk_caveat_emptor',
    term: 'Caveat Emptor',
    etymology: 'Latin: "let the buyer beware"',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'The common-law doctrine that the purchaser alone is responsible for checking the quality, condition, and title suitability of goods or real property before a purchase is concluded.',
    subDefinitions: [
      'In Real Estate: Purchaser must conduct searches at the Land Registry, inspect boundaries on site, and verify physical occupants and spousal consent.',
      'In Sale of Goods: Modified by the Sale of Goods and Supply of Services Act 2017 regarding implied conditions of merchantable quality and fitness for purpose.'
    ],
    ugandanApplication: 'In Ugandan land transactions, *Sir John Bageire v Ausi Matovu* (1996) and *David Sejjaka Nalima v Rebecca Musoke* established that a purchaser who fails to inspect the land or make registry searches cannot claim protection as a bona fide purchaser for value without notice under Section 181 of the Registration of Titles Act (RTA).',
    crossReferences: ['Bona Fide Purchaser', 'Search at Registry', 'Section 39 Land Act', 'Sale of Goods'],
    category: 'Commercial Law & Land Law'
  },
  {
    id: 'blk_fiduciary_duty',
    term: 'Fiduciary Duty',
    etymology: 'Latin: fides / fiducia (faith, trust, confidence)',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'The highest legal standard of care, undivided loyalty, good faith, and full disclosure owed by a person in a position of trust (such as a director, advocate, trustee, or partner) to their beneficiary, client, or company.',
    subDefinitions: [
      'Duty of Loyalty: Prohibition against conflicts of interest and making undisclosed personal profits.',
      'Duty of Care & Skill: Exercising the standard of care that an ordinary prudent person would exercise in their own affairs.'
    ],
    ugandanApplication: 'Codified for company directors in Sections 198–205 of the Companies Act 2012, for advocates in the Advocates (Professional Conduct and Etiquette) Regulations S.I. 267-2, and affirmed in *Fredrick J.K. Zaabwe v Orient Bank Ltd* (2007) UGSC 21 regarding advocates acting with conflict of interest.',
    crossReferences: ['Companies Act 2012', 'Advocates Act', 'Conflict of Interest', 'Trustee'],
    category: 'Company Law & Legal Ethics'
  },
  {
    id: 'blk_injunction',
    term: 'Injunction',
    etymology: 'Latin: injungere (to enjoin, command, or impose upon)',
    edition: 'Standard Common Law Legal Lexicon',
    definition: 'An equitable judicial order that commands a party either to perform a particular positive act (mandatory injunction) or to refrain from doing a specified wrongful act (prohibitory or temporary injunction).',
    subDefinitions: [
      'Interim / Ex-Parte Injunction: Urgent order granted for a very short duration without hearing the opposing side to prevent imminent disaster.',
      'Temporary Interlocutory Injunction: Granted under Order 39 CPR to preserve the status quo until full trial.',
      'Permanent / Perpetual Injunction: Final remedy awarded upon the conclusion of trial in the judgment decree.'
    ],
    ugandanApplication: 'Principles for granting interlocutory injunctions in Uganda were settled by the Court of Appeal for East Africa in *Giella v Cassman Brown & Co Ltd* [1973] EA 358 and endorsed by the Supreme Court in *Kasirye Byaruhanga & Co Advocates v UDB* (2007).',
    crossReferences: ['Order 39 CPR', 'Giella v Cassman Brown', 'Status Quo', 'Equitable Remedies'],
    category: 'Civil Procedure & Remedies'
  }
];
