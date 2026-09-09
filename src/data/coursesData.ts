import { Course } from '../types';
import { createVerifiedSource } from './verifiedSources';

export const lawCoursesCatalog: Course[] = [
  {
    id: 'course_const_law',
    code: 'LAW 1101',
    title: 'Constitutional Law',
    category: 'Public Law',
    level: 'Year 1 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 412,
    courseOverview: 'Foundations of Ugandan constitutionalism, separation of powers, constitutional supremacy (Art 2), judicial review of legislation (Art 137), presidential powers, citizenship, and fundamental human rights under Chapter 4.',
    coreStatutes: ['Constitution of the Republic of Uganda, 1995', 'Human Rights (Enforcement) Act 2019', 'Electoral Commission Act Cap 140'],
    coreCases: ['Paul Ssemogerere v Attorney General (2000)', 'Major General David Tinyefuza v Attorney General (1997)', 'Charles Onyango Obbo v Attorney General (2004)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Foundational study of state power, rule of law, constitutional supremacy, and democratic institutions in Uganda.',
    modules: [
      {
        id: 'mod_const_1',
        title: 'Constitutional Supremacy & Judicial Review',
        overview: 'Examines the transition from parliamentary sovereignty to constitutional supremacy under Article 2 of the 1995 Constitution.',
        notes: `Constitutional supremacy is the doctrine that the written Constitution is the supreme law of the land. Under Article 2(1) of the 1995 Constitution, all public authorities and persons are bound. Under Article 2(2), any statute, customary law, or executive action inconsistent with the Constitution is void ab initio to the extent of the inconsistency.\n\nIn Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004), the Supreme Court struck down Section 50 of the Penal Code Act (publication of false news) because it unconstitutionally restricted freedom of expression under Article 29.`,
        definitions: [
          { term: 'Constitutional Supremacy', definition: 'The legal doctrine that the written constitution takes precedence over all other laws and government actions.' },
          { term: 'Severability Doctrine', definition: 'The judicial principle whereby unconstitutional provisions of a statute are excised while preserving valid portions.' }
        ],
        keyCases: ['Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1', 'Paul Ssemogerere & Zachary Olum v Attorney General (2000) UGSC 1'],
        keyStatutes: ['1995 Constitution of Uganda (Articles 1, 2, 137)', 'Judicature Act Cap 13'],
        constitutionalProvisions: ['Article 1 (Popular Sovereignty)', 'Article 2 (Supremacy)', 'Article 137 (Constitutional Interpretation)'],
        practicalExamples: ['A statute requiring police permission before holding a public lecture is struck down under Article 2 for violating Article 29 freedom of assembly.'],
        keyPoints: ['Article 2 invalidates inconsistent statutes automatically.', 'Only the Constitutional Court has exclusive original jurisdiction under Article 137 to interpret constitutional provisions.'],
        readingList: ['G.W. Kanyeihamba, Constitutional and Political History of Uganda', 'Oloka-Onyango, When Courts Do Politics'],
        practiceQuestion: 'Critically analyze the scope of judicial review under Article 137 of the 1995 Constitution of Uganda.',
        modelAnswer: 'Under Article 137, any person alleging that an Act of Parliament or executive conduct violates the Constitution may petition the Constitutional Court. In Tinyefuza v AG, the court held that locus standi is broad and technical locus rules cannot defeat constitutional justice.',
        shortAnswerQuestions: ['State the test for voidness under Article 2(2).', 'Differentiate between a constitutional petition and a constitutional reference.'],
        essayQuestions: ['"Judicial review in Uganda under Article 137 is not an obstruction of democracy, but its primary safeguard." Discuss with reference to decided cases.'],
        mcqs: [
          {
            question: 'Which court has exclusive original jurisdiction to interpret the 1995 Constitution?',
            options: ['High Court', 'Court of Appeal sitting as Constitutional Court', 'Supreme Court', 'Magistrates Court'],
            answer: 'Court of Appeal sitting as Constitutional Court',
            explanation: 'Under Article 137(1), any question as to the interpretation of the Constitution is determined by the Court of Appeal sitting as the Constitutional Court.'
          }
        ],
        flashcards: [
          { front: 'What is Article 2 of the 1995 Constitution?', back: 'Supremacy of the Constitution: Any law or custom inconsistent with the Constitution is void to the extent of the inconsistency.' }
        ]
      }
    ]
  },
  {
    id: 'course_contract_law',
    code: 'LAW 1102',
    title: 'Law of Contract',
    category: 'Commercial Law',
    level: 'Year 1 LLB',
    modulesCount: 6,
    enrolledStudentsCount: 395,
    courseOverview: 'Comprehensive exploration of contractual principles under the Contracts Act 2010: offer, acceptance, consideration, intention to create legal relations, terms, vitiating factors, and remedies.',
    coreStatutes: ['Contracts Act, 2010 (Act No. 7 of 2010)', 'Sale of Goods and Supply of Services Act 2017', 'Electronic Transactions Act 2011'],
    coreCases: ['Greenboat Entertainment v KCC (2007)', 'Carlill v Carbolic Smoke Ball Co [1893]', 'Hadley v Baxendale (1854)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Principles of enforceable agreements, contractual terms, performance, discharge, and statutory remedies in Uganda.',
    modules: [
      {
        id: 'mod_contract_1',
        title: 'Formation of Contracts & Capacity (Contracts Act 2010)',
        overview: 'Detailed statutory and common law breakdown of the elements required to form a valid, enforceable contract under Section 10.',
        notes: `Section 10(1) of the Contracts Act 2010 requires: (a) free consent, (b) capacity to contract, (c) lawful consideration, (d) lawful object, and (e) intention to be legally bound. Under Section 10(2), a contract may be oral, written, partly oral and partly written, or implied from conduct. Capacity is governed by Section 11 (age of majority 18 years and sound mind).`,
        definitions: [
          { term: 'Offer', definition: 'An expression of willingness to contract on specified terms made with the intention that it shall become binding upon acceptance.' },
          { term: 'Consideration', definition: 'A right, interest, profit, or benefit accruing to one party, or some forbearance, detriment, loss, or responsibility given by the other (Currie v Misa).' }
        ],
        keyCases: ['Greenboat Entertainment Ltd v Kampala City Council (2007)', 'Carlill v Carbolic Smoke Ball Co [1893] 1 QB 256'],
        keyStatutes: ['Contracts Act 2010 (Sections 10, 11, 14-20)'],
        readingList: ['D.J. Bakibinga, Law of Contract in Uganda', 'Treitel on the Law of Contract'],
        practiceQuestion: 'Discuss the validity of an oral contract for the sale of goods worth UGX 50,000,000 under the Contracts Act 2010.',
        modelAnswer: 'Under Section 10(2) of the Contracts Act 2010, contracts are valid whether oral or written, unless a specific statute requires writing (such as Section 39 Land Act for spousal consent).',
        shortAnswerQuestions: ['What is the difference between an offer and an invitation to treat?'],
        essayQuestions: ['Analyze the statutory doctrine of frustration under Section 66 of the Contracts Act 2010.'],
        mcqs: [
          {
            question: 'Under Section 11 of the Contracts Act 2010, what is the age of majority for capacity to contract?',
            options: ['16 years', '18 years', '21 years', '25 years'],
            answer: '18 years',
            explanation: 'Section 11(1) sets contractual capacity at eighteen years or above of sound mind.'
          }
        ],
        flashcards: [{ front: 'Section 10 Contracts Act 2010', back: 'Defines contract as agreement with free consent, capacity, lawful consideration, lawful object, and intent to be bound.' }]
      }
    ]
  },
  {
    id: 'course_torts',
    code: 'LAW 1103',
    title: 'Law of Torts',
    category: 'Private Law',
    level: 'Year 1 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 380,
    courseOverview: 'Civil wrongs, negligence, duty of care, breach, causation, remoteness, vicarious liability, nuisance, trespass to person and land, defamation, and statutory remedies under Cap 79.',
    coreStatutes: ['Law Reform (Miscellaneous Provisions) Act Cap 79', 'Government Proceedings Act Cap 77', 'Civil Liability Act'],
    coreCases: ['Donoghue v Stevenson [1932] AC 562', 'Byarugaba v Attorney General (1974)', 'Muhamood v Attorney General (1975)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Civil liability for non-contractual harms, negligence standards, strict liability, defamation, and damages.',
    modules: [
      {
        id: 'mod_tort_1',
        title: 'Negligence & Duty of Care',
        overview: 'The neighbor principle, standard of care, breach, causation in fact and law, and remoteness of damage.',
        notes: `The tort of negligence requires three elements: (1) Existence of a legal duty of care, (2) Breach of that duty (falling below the standard of a reasonable man), and (3) Resultant damage caused by the breach that is not too remote (Caparo Industries plc v Dickman; Byarugaba v AG). Under Cap 79, contributory negligence is an apportionment defense, not an absolute bar.`,
        definitions: [
          { term: 'Duty of Care', definition: 'A legal obligation imposed on an individual requiring adherence to a standard of reasonable care while performing acts that could foreseeably harm others.' }
        ],
        keyCases: ['Donoghue v Stevenson [1932] AC 562', 'Caparo Industries plc v Dickman [1990] 2 AC 605'],
        keyStatutes: ['Law Reform (Miscellaneous Provisions) Act Cap 79'],
        readingList: ['Winfield & Jolowicz on Tort', 'G.W. Kanyeihamba, The Law of Torts in Uganda'],
        practiceQuestion: 'Explain the test of foreseeability in psychiatric injury claims.',
        modelAnswer: 'The claimant must establish primary victim status (within the zone of physical danger) or secondary victim criteria under Alcock v Chief Constable of South Yorkshire Police.',
        shortAnswerQuestions: ['State the rule in Rylands v Fletcher.'],
        essayQuestions: ['Critically evaluate the doctrine of vicarious liability in employer-employee relationships under Ugandan jurisprudence.'],
        mcqs: [{ question: 'What is the effect of contributory negligence under Cap 79?', options: ['Complete defense', 'Apportionment of damages', 'Criminal penalty', 'Void action'], answer: 'Apportionment of damages', explanation: 'Section 12 of Cap 79 reduces damages proportionately to claimant fault.' }],
        flashcards: [{ front: 'Neighbor Principle (Lord Atkin)', back: 'You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbor.' }]
      }
    ]
  },
  {
    id: 'course_crim_law',
    code: 'LAW 1104',
    title: 'Criminal Law',
    category: 'Public Law',
    level: 'Year 1 LLB',
    modulesCount: 6,
    enrolledStudentsCount: 420,
    courseOverview: 'General principles of criminal liability (actus reus and mens rea), defenses (insanity, intoxication, self-defense, provocation), homicide (murder and manslaughter), property offenses, and sexual offenses.',
    coreStatutes: ['Penal Code Act Cap 120 (and amendments)', 'Prevention and Prohibition of Torture Act 2012', 'Anti-Corruption Act 2009'],
    coreCases: ['Uganda v Turwomwe [1978] HCB 17', 'Susan Kigula v AG (2009)', 'Kifamunte Henry v Uganda (1997)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Substantive offenses, mental fault elements, criminal justifications, and sentencing principles in Uganda.',
    modules: [
      {
        id: 'mod_crim_1',
        title: 'Homicide: Murder & Manslaughter',
        overview: 'Elements of unlawful killing, malice aforethought under Section 191 PCA, provocation, and involuntary manslaughter.',
        notes: `Murder under Section 188 Penal Code Act requires proof beyond reasonable doubt that: (1) The victim died, (2) The death was caused by an unlawful act or omission, (3) The accused caused the death, and (4) The accused acted with malice aforethought under Section 191 PCA. Malice aforethought is established by intention to cause death or grievous harm.`,
        definitions: [{ term: 'Malice Aforethought', definition: 'The requisite mental state for murder under Section 191 PCA: intent to cause death or grievous harm.' }],
        keyCases: ['Uganda v Turwomwe [1978] HCB 17', 'Kifamunte Henry v Uganda (1997) UGSC 4'],
        keyStatutes: ['Penal Code Act Cap 120 (Sections 188, 189, 191)'],
        readingList: ['Smith & Hogan’s Criminal Law', 'L. Tibatemwa-Ekirikubinza, Offences Against the Person in Uganda'],
        practiceQuestion: 'Discuss the defense of provocation under Sections 192 and 193 of the Penal Code Act.',
        modelAnswer: 'Provocation reduces murder to manslaughter if there was a sudden loss of self-control before passion had time to cool, caused by a wrongful act of a nature to deprive an ordinary person of self-control.',
        shortAnswerQuestions: ['List two ways malice aforethought is proved under S.191 PCA.'],
        essayQuestions: ['Analyze the impact of the Supreme Court ruling in Susan Kigula on mandatory death sentences in Uganda.'],
        mcqs: [{ question: 'What is the standard of proof in criminal prosecutions in Uganda?', options: ['Balance of probabilities', 'Beyond reasonable doubt', 'Preponderance of evidence', 'Clear and convincing evidence'], answer: 'Beyond reasonable doubt', explanation: 'Woolmington v DPP and Article 28(3)(a) mandate proof beyond reasonable doubt on the prosecution.' }],
        flashcards: [{ front: 'Section 188 Penal Code Act', back: 'Defines murder: any person who of malice aforethought causes the death of another by an unlawful act or omission.' }]
      }
    ]
  },
  {
    id: 'course_crim_proc',
    code: 'LAW 2101',
    title: 'Criminal Procedure',
    category: 'Procedural & Clinical Law',
    level: 'Year 2 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 360,
    courseOverview: 'Pre-trial procedure, arrest, search, police custody, 48-hour rule, bail applications, framing charges, trial procedure in Magistrates and High Court, sentencing, and appeals.',
    coreStatutes: ['Criminal Procedure Code Act Cap 116', 'Trial on Indictments Act Cap 23', 'Magistrates Courts Act Cap 16'],
    coreCases: ['Foundation for Human Rights Initiative v Attorney General (2008)', 'Dr. Kizza Besigye v Uganda (2006)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Adjective criminal law governing investigations, charge drafting, bail, plea taking, trial proceedings, and appeals.',
    modules: [
      {
        id: 'mod_cp_1',
        title: 'Bail Jurisdiction & Remand Limits (Article 23 & Cap 116)',
        overview: 'Constitutional and statutory parameters governing bail in subordinate courts and the High Court.',
        notes: `Bail is a constitutional right flowing from the presumption of innocence under Article 28(3)(a) and personal liberty under Article 23(6). In FHRI v AG (2008), the Constitutional Court struck down statutory restrictions that purported to deny bail in capital offenses, holding that courts retain inherent discretionary jurisdiction.`,
        definitions: [{ term: 'Bail', definition: 'The temporary release of an accused person awaiting trial on condition that a sum or bond is lodged to guarantee court attendance.' }],
        keyCases: ['Foundation for Human Rights Initiative v Attorney General (2008) UGCC 1', 'Dr. Kizza Besigye v Uganda (2006)'],
        keyStatutes: ['1995 Constitution (Article 23(6))', 'Trial on Indictments Act Cap 23', 'Magistrates Courts Act Cap 16 (S.75)'],
        readingList: ['F.J. Ayume, Criminal Procedure and Law in Uganda', 'B.J. Odoki, Criminal Practice in Uganda'],
        practiceQuestion: 'Draft the essential grounds required for a High Court bail application on medical grounds.',
        modelAnswer: 'Applicant must prove grave medical condition certified by a medical officer of prisons as incapable of adequate treatment in prison, exceptional circumstances, fixed place of abode, and substantial sureties.',
        shortAnswerQuestions: ['What is the maximum remand period for capital offenses before mandatory bail under Article 23(6)(b)?'],
        essayQuestions: ['Examine the constitutional tension between executive crime control policies and judicial discretion in bail matters in Uganda.'],
        mcqs: [{ question: 'Within how many hours must an arrested suspect be produced in court under Article 23(4)?', options: ['24 hours', '48 hours', '72 hours', '7 days'], answer: '48 hours', explanation: 'Article 23(4) strictly limits police detention to 48 hours.' }],
        flashcards: [{ front: 'Article 23(6) Constitution', back: 'Right of an accused person to apply for bail on reasonable conditions.' }]
      }
    ]
  },
  {
    id: 'course_civ_proc',
    code: 'LAW 2102',
    title: 'Civil Procedure',
    category: 'Procedural & Clinical Law',
    level: 'Year 2 LLB',
    modulesCount: 6,
    enrolledStudentsCount: 375,
    courseOverview: 'Instituting civil suits, jurisdiction, pleadings (Plaint, Written Statement of Defence, Counterclaim), service of summons, discovery, summary procedure under Order 36, interlocutory injunctions, and execution.',
    coreStatutes: ['Civil Procedure Act Cap 71', 'Civil Procedure Rules S.I. 71-1', 'Judicature Act Cap 13'],
    coreCases: ['Giella v Cassman Brown & Co Ltd [1973] EA 358', 'Kasirye Byaruhanga & Co Advocates v UDB (2007) UGSC 2'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Adjective civil law governing court pleadings, chamber applications, interim remedies, and decree execution.',
    modules: [
      {
        id: 'mod_civ_1',
        title: 'Temporary Injunctions (Order 39 CPR & Giella Test)',
        overview: 'Principles governing the grant of interlocutory injunctions in Ugandan courts.',
        notes: `Under Order 39 CPR, a party seeking a temporary injunction must satisfy the three-fold test in Giella v Cassman Brown (1973): (1) Prima facie case with a probability of success, (2) The applicant might otherwise suffer irreparable injury that cannot be adequately compensated in damages, and (3) If court is in doubt, the balance of convenience decides the matter.`,
        definitions: [{ term: 'Temporary Injunction', definition: 'An interlocutory order restraining a party from doing a specified act pending determination of the main suit.' }],
        keyCases: ['Giella v Cassman Brown & Co Ltd [1973] EA 358', 'American Cyanamid Co v Ethicon Ltd [1975] AC 396'],
        keyStatutes: ['Civil Procedure Rules S.I. 71-1 (Order 39)', 'Judicature Act Cap 13 (S.33)'],
        readingList: ['S. Ssekaana & N. Ssekaana, Civil Procedure and Practice in Uganda', 'M. Ssozi, Civil Litigation in Uganda'],
        practiceQuestion: 'Draft the operative prayer in a chamber summons for a temporary injunction.',
        modelAnswer: 'May it please this Honourable Court to issue a temporary injunction restraining the respondent, its agents or servants, from alienating, selling, developing or transferring the suit property comprised in Kyadondo Block 214 Plot 52 until disposal of the main suit.',
        shortAnswerQuestions: ['State the three requirements in Giella v Cassman Brown.'],
        essayQuestions: ['Critically analyze the application of Article 126(2)(e) of the Constitution in overriding procedural defects in civil pleadings.'],
        mcqs: [{ question: 'Under Order 39 CPR, what is the second requirement for a temporary injunction?', options: ['Proof of fraud', 'Irreparable injury not compensable by damages', 'Exhaustion of administrative remedies', 'Consent of Attorney General'], answer: 'Irreparable injury not compensable by damages', explanation: 'Giella v Cassman Brown requires proof of irreparable injury.' }],
        flashcards: [{ front: 'Giella v Cassman Brown Test', back: '1. Prima facie case with probability of success; 2. Irreparable injury; 3. Balance of convenience.' }]
      }
    ]
  },
  {
    id: 'course_evidence',
    code: 'LAW 2103',
    title: 'Law of Evidence',
    category: 'Procedural & Clinical Law',
    level: 'Year 2 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 390,
    courseOverview: 'Relevancy and admissibility of facts, hearsay rule and exceptions, confessions, burden and standard of proof, documentary and electronic evidence under ETA 2011, competence and compellability of witnesses, and estoppel.',
    coreStatutes: ['Evidence Act Cap 6', 'Electronic Transactions Act 2011', 'Electronic Signatures Act 2011'],
    coreCases: ['Uganda v Fabiano Olungu [1972] EA 136', 'Miller v Minister of Pensions [1947] 2 All ER 372'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Admissibility, witness examinations, electronic evidence integrity, and judicial burdens of proof.',
    modules: [
      {
        id: 'mod_ev_1',
        title: 'Admissibility of Electronic Evidence',
        overview: 'Sections 5 to 8 Electronic Transactions Act 2011 and Section 64 Evidence Act.',
        notes: `Under Section 8 of the Electronic Transactions Act 2011, electronic records and data messages are admissible in evidence. The weight given to electronic evidence depends on: (a) reliability of the manner in which the data message was generated, stored, or communicated; (b) integrity of information; and (c) manner in which the originator was identified.`,
        definitions: [{ term: 'Data Message', definition: 'Data generated, sent, received, or stored by computer, electronic, magnetic, optical or similar means.' }],
        keyCases: ['Uganda v Dr. Aggrey Kiyingi (2006)', 'R v Spiby (1990) 91 Cr App R 186'],
        keyStatutes: ['Evidence Act Cap 6', 'Electronic Transactions Act 2011 (Sections 5-8)'],
        readingList: ['P. Murphy, Murphy on Evidence', 'B.J. Odoki, A Guide to Criminal Procedure and Evidence in Uganda'],
        practiceQuestion: 'How does a litigator lay foundation for the admission of WhatsApp chat transcripts in a Ugandan commercial dispute?',
        modelAnswer: 'Produce an affidavit of compliance by the person who downloaded and printed the logs under Section 8 ETA 2011 verifying device custody and system integrity.',
        shortAnswerQuestions: ['What is the dying declaration exception to the hearsay rule?'],
        essayQuestions: ['Examine the statutory rules governing the voluntariness and admissibility of police confessions in Uganda under the Evidence Act.'],
        mcqs: [{ question: 'Which statute modernised the admission of digital and electronic evidence in Uganda?', options: ['Evidence Act 1909', 'Electronic Transactions Act 2011', 'Companies Act 2012', 'Land Act 1998'], answer: 'Electronic Transactions Act 2011', explanation: 'Sections 5-8 ETA 2011 established the statutory admissibility of electronic records.' }],
        flashcards: [{ front: 'Standard of Proof in Civil Cases', back: 'Balance of probabilities (Miller v Minister of Pensions).' }]
      }
    ]
  },
  {
    id: 'course_land_law',
    code: 'LAW 2104',
    title: 'Land Law',
    category: 'Private Law',
    level: 'Year 2 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 405,
    courseOverview: 'Land tenure systems under Art 237 (Mailo, Customary, Freehold, Leasehold), Registration of Titles Act (Torrens system, indefeasibility, fraud exception), rights of lawful and bonafide occupants, spousal consent under S.39 Land Act, and mortgages.',
    coreStatutes: ['Land Act Cap 227 (as amended 2004, 2010)', 'Registration of Titles Act Cap 230', 'Mortgage Act 2009'],
    coreCases: ['Kampala District Land Board v Venansio Babweyaka (2007) UGSC 11', 'UNRA v Asuman Irumba & Peter Magelah (2014) UGSC 19', 'Alice Okiror v Global Capital Ltd (2012)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Real property ownership, tenure classification, title registration, tenant protections, and land transactions.',
    modules: [
      {
        id: 'mod_land_1',
        title: 'Indefeasibility of Title & The Fraud Exception (RTA Cap 230)',
        overview: 'Sections 59, 64, and 176 of the Registration of Titles Act and Supreme Court interpretations.',
        notes: `The Torrens system in Uganda is anchored on the principle that the certificate of title is conclusive evidence of ownership (Section 59 RTA) and is indefeasible except in the case of fraud (Section 64 RTA). In Kampala District Land Board v Venansio Babweyaka (2007), the Supreme Court affirmed that fraud means actual dishonesty or moral turpitude brought home to the person registered.`,
        definitions: [{ term: 'Indefeasibility of Title', definition: 'The principle that a registered proprietor holds title free from all unrecorded encumbrances except for fraud.' }],
        keyCases: ['Kampala District Land Board & Chemical Distributors v Venansio Babweyaka & Ors (2007) UGSC 11', 'David Sejjaka Nalima v Rebecca Musoke (1992)'],
        keyStatutes: ['Registration of Titles Act Cap 230 (Sections 59, 64, 176)', '1995 Constitution (Article 237)'],
        readingList: ['J.T. Mugambwa, Principles of Land Law in Uganda', 'H.W. West, The Transformation of Land Tenure in Buganda'],
        practiceQuestion: 'Discuss the effect of purchasing land without inspecting the property on a plea of bonafide purchaser for value without notice.',
        modelAnswer: 'Failure to inspect property where tenants or occupants are in possession constitutes constructive notice and gross negligence, defeating the claim of bonafide purchaser for value (Sir John Bageire v Ausi Matovu).',
        shortAnswerQuestions: ['What are the four land tenure systems recognized under Article 237(3)?'],
        essayQuestions: ['Critically examine the legal rights of bonafide occupants under the Land Act Cap 227 vis-a-vis the registered Mailo owner.'],
        mcqs: [{ question: 'Under Section 39 of the Land Act, what is the legal effect of a land sale of family land without prior written spousal consent?', options: ['Voidable at option of buyer', 'Completely void', 'Valid subject to fine', 'Enforceable in equity'], answer: 'Completely void', explanation: 'Section 39(2) explicitly makes transactions without required spousal consent void ab initio.' }],
        flashcards: [{ front: 'Torrens System Fraud (Assets Co v Mere Roihi)', back: 'Fraud means actual fraud, dishonesty of some sort, not constructive or equitable fraud.' }]
      }
    ]
  },
  {
    id: 'course_family_law',
    code: 'LAW 2105',
    title: 'Family Law',
    category: 'Private Law',
    level: 'Year 2 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 340,
    courseOverview: 'Marriage types (Civil, Customary, Islamic, Church, Hindu), validity requirements, annulment, divorce, division of matrimonial property, custody, and child maintenance under the Children Act.',
    coreStatutes: ['Marriage Act Cap 251', 'Customary Marriage (Registration) Act Cap 248', 'Divorce Act Cap 249', 'Children Act Cap 59 (as amended 2016)'],
    coreCases: ['Julius Rwabinumi v Hope Bahimbisomwe (2013) UGSC 5', 'FIDA-U v Attorney General (2003)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Domestic relations, marriage ceremonies, matrimonial property allocation, divorce decrees, and child welfare.',
    modules: [
      {
        id: 'mod_fam_1',
        title: 'Matrimonial Property Distribution (Rwabinumi v Bahimbisomwe)',
        overview: 'Constitutional equality under Article 31(1) and equitable distribution of matrimonial assets upon divorce.',
        notes: `In Julius Rwabinumi v Hope Bahimbisomwe (2013) UGSC 5, the Supreme Court held that marriage does not automatically confer an undivided half-share interest in property acquired prior to marriage. However, assets acquired jointly during coverture, or properties where the non-monetary contributions (childcare, domestic support) enhanced value, constitute matrimonial property subject to equitable distribution.`,
        definitions: [{ term: 'Matrimonial Property', definition: 'Property acquired during coverture intended for the joint use, shelter, or sustenance of the family unit.' }],
        keyCases: ['Julius Rwabinumi v Hope Bahimbisomwe (2013) UGSC 5', 'Kagga v Kagga (1998) HCB 66'],
        keyStatutes: ['1995 Constitution (Article 31(1))', 'Divorce Act Cap 249'],
        readingList: ['L. Tibatemwa-Ekirikubinza, Women’s Violent Crime in Uganda: More Sinned Against than Sinning', 'Bromley’s Family Law'],
        practiceQuestion: 'Discuss whether unpaid domestic caregiving can be quantified as direct contribution to matrimonial property in Uganda.',
        modelAnswer: 'Yes, in Rwabinumi and Kagga, Ugandan courts recognized domestic caregiving and homemaking as substantial indirect contribution deserving property apportionment.',
        shortAnswerQuestions: ['What is the legal age of marriage under Article 31(1) of the Constitution?'],
        essayQuestions: ['Assess the impact of constitutional non-discrimination provisions under Article 21 on the statutory grounds for divorce in the Divorce Act Cap 249.'],
        mcqs: [{ question: 'What is the constitutional age of consent to marriage under Article 31(1)?', options: ['16 years', '18 years', '21 years', '25 years'], answer: '18 years', explanation: 'Article 31(1) guarantees the right to marry to men and women of eighteen years and above.' }],
        flashcards: [{ front: 'Article 31(1) Constitution', back: 'Men and women of 18+ have the right to marry and have equal rights at marriage, during marriage, and at its dissolution.' }]
      }
    ]
  },
  {
    id: 'course_succession',
    code: 'LAW 2106',
    title: 'Law of Succession',
    category: 'Private Law',
    level: 'Year 2 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 355,
    courseOverview: 'Wills, testamentary capacity, formal execution of wills, revocation, intestate succession under the 2022 Amendment Act, residential holding rights, grant of probate, and letters of administration.',
    coreStatutes: ['Succession Act Cap 162 (as amended by Act No. 4 of 2022)', 'Administrator General’s Act Cap 157'],
    coreCases: ['Law Advocacy for Women in Uganda v Attorney General (2007) UGCC 1', 'Banks v Goodfellow (1870) LR 5 QB 549'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Post-mortem estate transfer, testamentary instruments, statutory intestate percentages, and estate administration.',
    modules: [
      {
        id: 'mod_succ_1',
        title: 'Intestate Distribution under the Succession (Amendment) Act 2022',
        overview: 'The new percentage formulas, protection of surviving spouse and children, and residential property retention.',
        notes: `The Succession (Amendment) Act 2022 reformed Section 27. When a person dies intestate: (1) The matrimonial home/residential holding is preserved for the surviving spouse and minor children; (2) The remaining estate is distributed: 20% to the surviving spouse, 75% to lineal descendants, 1% to the customary heir, and 4% to dependent relatives.`,
        definitions: [{ term: 'Intestacy', definition: 'The state of dying without having left a valid, legally enforceable will.' }],
        keyCases: ['Law Advocacy for Women in Uganda v Attorney General (2007) UGCC 1', 'Christine Male v Sylvia Namayanja (2018)'],
        keyStatutes: ['Succession Act Cap 162 (as amended 2022)', 'Administrator General’s Act Cap 157'],
        readingList: ['D.J. Bakibinga, Law of Succession in Uganda', 'Parry and Kerridge on Succession'],
        practiceQuestion: 'Calculate the statutory distribution of a net estate of UGX 100,000,000 where the deceased left a surviving widow, 3 children, and elderly dependent parents.',
        modelAnswer: 'Widow receives 20% (UGX 20M) + residential home rights; Children receive 75% (UGX 75M shared equally); Dependent parents receive 4% (UGX 4M); Customary heir receives 1% (UGX 1M).',
        shortAnswerQuestions: ['What are the formal requirements for a valid will under Section 50?'],
        essayQuestions: ['Critically evaluate how the Succession (Amendment) Act 2022 aligned Ugandan inheritance law with Article 21 and Article 33 of the 1995 Constitution.'],
        mcqs: [{ question: 'Under Section 27 Succession Act (amended 2022), what percentage of the intestate estate goes to the surviving spouse?', options: ['15%', '20%', '50%', '75%'], answer: '20%', explanation: 'Section 27 allocates 20% of the net estate to the surviving spouse.' }],
        flashcards: [{ front: 'Section 50 Succession Act', back: 'Will must be signed by testator in presence of two or more witnesses present at the same time who attest in testator presence.' }]
      }
    ]
  },
  {
    id: 'course_admin_law',
    code: 'LAW 3101',
    title: 'Administrative Law',
    category: 'Public Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 310,
    courseOverview: 'Principles of public administration, delegated legislation, ultra vires doctrine, procedural fairness (audi alteram partem, nemo judex in causa sua), legitimate expectations, judicial review remedies (Certiorari, Mandamus, Prohibition), and the Inspectorate of Government.',
    coreStatutes: ['1995 Constitution (Articles 42, 223-232)', 'Judicature Act Cap 13 (Judicial Review Rules)', 'Leadership Code Act 2002'],
    coreCases: ['Associated Provincial Picture Houses Ltd v Wednesbury Corp [1948] 1 KB 223', 'Ridge v Baldwin [1964] AC 40', 'Mwoya v Judicial Service Commission (2007)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Control of governmental action, administrative tribunals, executive accountability, and judicial review.',
    modules: [
      {
        id: 'mod_admin_1',
        title: 'Grounds for Judicial Review (Illegality, Irrationality, Procedural Impropriety)',
        overview: 'The Lord Diplock classification in Council of Civil Service Unions v Minister for the Civil Service (GCHQ).',
        notes: `Judicial review under Article 42 and the Judicature Act focuses on the decision-making process rather than merits. Lord Diplock established the three heads: (1) Illegality (acting outside statutory powers/ultra vires), (2) Irrationality (Wednesbury unreasonableness—a decision so outrageous in its defiance of logic that no sensible authority could have made it), and (3) Procedural Impropriety (failure to observe natural justice).`,
        definitions: [{ term: 'Ultra Vires', definition: 'Beyond the legal powers or authority granted by statute or constitution.' }],
        keyCases: ['Council of Civil Service Unions v Minister for the Civil Service [1985] AC 374 (GCHQ)', 'Associated Provincial Picture Houses Ltd v Wednesbury Corp [1948] 1 KB 223'],
        keyStatutes: ['1995 Constitution (Article 42)', 'Judicature Act Cap 13 (Judicial Review Rules S.I. 13-11)'],
        readingList: ['H.W.R. Wade & C.F. Forsyth, Administrative Law', 'S. Ssekaana, Public Law in East Africa'],
        practiceQuestion: 'Explain the prerogative remedy of Mandamus in Ugandan administrative practice.',
        modelAnswer: 'Mandamus is a court order compelling a public officer or body to perform a mandatory statutory public duty which they have failed or refused to execute.',
        shortAnswerQuestions: ['What is the difference between an appeal and judicial review?'],
        essayQuestions: ['Discuss the doctrine of legitimate expectation with reference to modern Ugandan administrative litigation.'],
        mcqs: [{ question: 'Which constitutional article guarantees the right to just and fair administrative treatment in Uganda?', options: ['Article 21', 'Article 28', 'Article 42', 'Article 50'], answer: 'Article 42', explanation: 'Article 42 explicitly enshrines the right to just and fair administrative treatment and access to courts.' }],
        flashcards: [{ front: 'Article 42 Constitution', back: 'Right to just and fair administrative treatment and access to courts against adverse administrative decisions.' }]
      }
    ]
  },
  {
    id: 'course_company_law',
    code: 'LAW 3102',
    title: 'Company Law',
    category: 'Commercial Law',
    level: 'Year 3 LLB',
    modulesCount: 6,
    enrolledStudentsCount: 365,
    courseOverview: 'Corporate personality, lifting the corporate veil under Section 20 of Companies Act 2012, single-member companies, corporate governance, directors duties (S.198), shareholder remedies, derivative claims, and corporate insolvency.',
    coreStatutes: ['Companies Act, 2012 (Act No. 1 of 2012)', 'Insolvency Act 2011', 'Capital Markets Authority Act Cap 84'],
    coreCases: ['Salomon v Salomon & Co Ltd [1897] AC 22', 'Bank of Uganda v Crane Bank Ltd (In Receivership) (2019) UGCA 5', 'Foss v Harbottle (1843) 2 Hare 461'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Corporate formation, veil piercing, internal management, directors fiduciary obligations, and minority protection.',
    modules: [
      {
        id: 'mod_comp_1',
        title: 'Separate Legal Personality & Piercing the Corporate Veil',
        overview: 'Salomon doctrine and statutory veil-lifting under Section 20 Companies Act 2012.',
        notes: `Upon incorporation under the Companies Act 2012, a company becomes an independent legal entity separate from its shareholders and directors (Salomon v Salomon). The company owns its assets and bears its liabilities. Under Section 20, the court may pierce the corporate veil where the entity is used for fraud, tax evasion, or to evade legal obligations.`,
        definitions: [{ term: 'Separate Legal Personality', definition: 'The legal principle that a corporation has distinct legal rights and liabilities separate from its members.' }],
        keyCases: ['Salomon v Salomon & Co Ltd [1897] AC 22', 'Adams v Cape Industries plc [1990] Ch 433'],
        keyStatutes: ['Companies Act 2012 (Sections 4, 18, 20, 198)'],
        readingList: ['D.J. Bakibinga, Company Law in Uganda', 'Gower and Davies’ Principles of Modern Company Law'],
        practiceQuestion: 'Discuss the rule in Foss v Harbottle and its statutory exceptions under Section 248 of the Companies Act 2012.',
        modelAnswer: 'The rule states the company is the proper plaintiff for corporate wrongs. Exceptions include ultra vires acts, fraud on the minority, and statutory derivative actions under Section 248.',
        shortAnswerQuestions: ['Can a single individual incorporate a private company under the Companies Act 2012?'],
        essayQuestions: ['Critically examine the fiduciary duties of company directors under Section 198 of the Companies Act 2012 in the wake of corporate failures in Uganda.'],
        mcqs: [{ question: 'Under Section 4 Companies Act 2012, what is the minimum number of persons required to form a private company?', options: ['1 person', '2 persons', '7 persons', '50 persons'], answer: '1 person', explanation: 'Section 4 permits single-member companies.' }],
        flashcards: [{ front: 'Section 20 Companies Act 2012', back: 'Empowers the High Court to lift the corporate veil for fraud, tax evasion, or sham structures.' }]
      }
    ]
  },
  {
    id: 'course_commercial_law',
    code: 'LAW 3103',
    title: 'Commercial Law',
    category: 'Commercial Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 330,
    courseOverview: 'Agency, sale of goods (caveat emptor, implied conditions and warranties, transfer of property, unpaid seller remedies), hire purchase transactions, negotiable instruments, and chattels securities.',
    coreStatutes: ['Sale of Goods and Supply of Services Act 2017', 'Hire Purchase Act 2009', 'Chattels Securities Act 2014', 'Bills of Exchange Act Cap 68'],
    coreCases: ['Grant v Australian Knitting Mills [1936] AC 85', 'Kalyango v Uganda Commercial Bank (1988)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Commercial transactions, sale of goods warranties, agency relationships, and security over personal property.',
    modules: [
      {
        id: 'mod_comm_1',
        title: 'Sale of Goods: Transfer of Property & Risk (Act of 2017)',
        overview: 'Rules governing when ownership passes in specific vs unascertained goods.',
        notes: `Under the Sale of Goods and Supply of Services Act 2017, property in specific or ascertained goods passes when the parties intend it to pass. In unascertained goods, no property passes until the goods are ascertained and unconditionally appropriated to the contract. Risk prima facie passes with property unless otherwise agreed.`,
        definitions: [{ term: 'Nemo Dat Quod Non Habet', definition: 'No one can give what they do not have; a buyer acquires no better title than the seller had.' }],
        keyCases: ['Ingram v Little [1961] 1 QB 31', 'Cundy v Lindsay (1878) 3 App Cas 459'],
        keyStatutes: ['Sale of Goods and Supply of Services Act 2017'],
        readingList: ['Atiyah’s Sale of Goods', 'D.J. Bakibinga, Commercial Law in Uganda'],
        practiceQuestion: 'Discuss two statutory exceptions to the Nemo Dat rule under Ugandan commercial law.',
        modelAnswer: 'Exceptions include: (1) Sale by mercantile agent with apparent authority, (2) Sale under market overt/voidable title before rescission, (3) Seller or buyer in possession after sale.',
        shortAnswerQuestions: ['Define an unpaid seller under the 2017 Act.'],
        essayQuestions: ['Evaluate the consumer protection provisions introduced by the Sale of Goods and Supply of Services Act 2017.'],
        mcqs: [{ question: 'When does risk in goods pass in a contract of sale of goods under the 2017 Act?', options: ['Upon payment of deposit', 'Prima facie when property/title passes', 'Upon delivery to carrier only', 'Upon signing of invoice'], answer: 'Prima facie when property/title passes', explanation: 'Risk follows property ownership unless parties agree otherwise.' }],
        flashcards: [{ front: 'Nemo Dat Rule', back: 'A purchaser acquires no title to goods if the seller had no title or authority to sell.' }]
      }
    ]
  },
  {
    id: 'course_employment_law',
    code: 'LAW 3104',
    title: 'Employment and Labour Law',
    category: 'Commercial Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 320,
    courseOverview: 'Individual contract of employment, employee vs independent contractor tests, statutory terms under Employment Act 2006 (amended 2023), unfair vs summary dismissal, severance pay, trade union rights, and Industrial Court jurisdiction.',
    coreStatutes: ['Employment Act 2006 (Act No. 6 of 2006, as amended 2023)', 'Labour Disputes (Arbitration and Settlement) Act 2006', 'Workers Compensation Act Cap 225'],
    coreCases: ['Uganda Broadcasting Corporation v Sinabulya (2014)', 'Bank of Uganda v Betty Tinkamanyire (2008)', 'Ready Mixed Concrete v Minister of Pensions [1968] 2 QB 497'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Workplace rights, employment contracts, termination hearings, trade union collective bargaining, and dispute resolution.',
    modules: [
      {
        id: 'mod_emp_1',
        title: 'Unfair Termination & Disciplinary Hearing Standards (Section 66 Employment Act)',
        overview: 'Mandatory procedural requirements prior to terminating an employee on grounds of misconduct or poor performance.',
        notes: `Section 66 of the Employment Act 2006 makes it mandatory for an employer, before dismissing an employee on grounds of misconduct or incompetence, to: (1) Explain the reason for contemplated dismissal, (2) Give the employee reasonable time to prepare a defense, and (3) Hold a hearing where the employee may be accompanied by a representative. In Betty Tinkamanyire v BOU, failure to hold a fair hearing renders termination unlawful.`,
        definitions: [{ term: 'Summary Dismissal', definition: 'Termination of an employment contract by the employer without notice or with less than statutory notice due to fundamental breach.' }],
        keyCases: ['Bank of Uganda v Betty Tinkamanyire (2008) UGSC 3', 'Uganda Broadcasting Corporation v Sinabulya (2014)'],
        keyStatutes: ['Employment Act 2006 (Sections 58, 66, 68, 71)'],
        readingList: ['D.J. Bakibinga, Labour Law in Uganda', 'Deakin and Morris, Labour Law'],
        practiceQuestion: 'Draft the essential advice to an employer wishing to effect a lawful redundancy/retrenchment.',
        modelAnswer: 'Employer must notify the Labour Officer and trade union in writing, adopt objective selection criteria (e.g. LIFO), give statutory notice, and pay severance package under Section 87.',
        shortAnswerQuestions: ['What is the difference between termination of contract and summary dismissal?'],
        essayQuestions: ['Critically examine the legal remedies available to an unlawfully dismissed employee in Uganda.'],
        mcqs: [{ question: 'Under Section 66 Employment Act 2006, what must an employer do before dismissing an employee for misconduct?', options: ['Report to police', 'Conduct a disciplinary hearing with right to representation', 'Obtain permission from Labour Officer', 'Pay 6 months salary in advance'], answer: 'Conduct a disciplinary hearing with right to representation', explanation: 'Section 66 mandates prior hearing and representation.' }],
        flashcards: [{ front: 'Section 66 Employment Act 2006', back: 'Mandates notice of charges, reasonable time to prepare, and fair disciplinary hearing before dismissal.' }]
      }
    ]
  },
  {
    id: 'course_jurisprudence',
    code: 'LAW 3105',
    title: 'Jurisprudence & Legal Theory',
    category: 'Specialized Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 290,
    courseOverview: 'Philosophical foundations of law: Natural Law theory (Aquinas, Fuller), Legal Positivism (Bentham, Austin, Kelsen, Hart), Legal Realism, Sociological Jurisprudence, African Jurisprudence, Critical Legal Studies, and Feminist Jurisprudence.',
    coreStatutes: ['1995 Constitution of Uganda (Preamble & National Objectives)'],
    coreCases: ['Uganda v Commissioner of Prisons, Ex Parte Matovu [1966] EA 514', 'Attorney General v Major General David Tinyefuza (1997)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Philosophical inquiries into the nature, morality, validity, and social function of law.',
    modules: [
      {
        id: 'mod_jur_1',
        title: 'Kelsen’s Pure Theory of Law & The Kelsenian Coup Doctrine in Uganda',
        overview: 'Analysis of Grundnorm shifts in Ex Parte Matovu (1966) and constitutional rejection in the 1995 Constitution.',
        notes: `Hans Kelsen defined law as a hierarchy of norms deriving validity from a foundational Grundnorm. In Ex Parte Matovu (1966), Chief Justice Udo Udoma applied Kelsen’s theory to validate the 1966 coup d’etat, holding that an effective revolution creates a new legal order. The 1995 Constitution explicitly rejected this in Article 3, declaring that unconstitutional overthrow is treason and the Constitution regains full force.`,
        definitions: [{ term: 'Grundnorm', definition: 'In Kelsen’s Pure Theory of Law, the basic foundational norm from which all subordinate legal norms derive their validity.' }],
        keyCases: ['Uganda v Commissioner of Prisons, Ex Parte Matovu [1966] EA 514', 'Madzimbamuto v Lardner-Burke [1969] 1 AC 645'],
        keyStatutes: ['1995 Constitution (Article 3)'],
        readingList: ['H.L.A. Hart, The Concept of Law', 'J.M. Elegido, Jurisprudence', 'Hans Kelsen, General Theory of Law and State'],
        practiceQuestion: 'Compare H.L.A. Hart’s concept of Primary and Secondary rules with John Austin’s Command Theory of Law.',
        modelAnswer: 'Austin saw law as sovereign commands backed by threats of sanctions. Hart critiqued this as the "gunman situation writ large" and posited law as the union of primary rules of obligation and secondary rules of recognition, change, and adjudication.',
        shortAnswerQuestions: ['What are Lon Fuller’s eight internal moralities of law?'],
        essayQuestions: ['Critically evaluate whether the decision in Ex Parte Matovu was sound jurisprudence or political capitulation in light of modern constitutionalism.'],
        mcqs: [{ question: 'Which constitutional article in Uganda explicitly repudiated the Kelsenian revolution doctrine applied in Ex Parte Matovu?', options: ['Article 1', 'Article 2', 'Article 3', 'Article 4'], answer: 'Article 3', explanation: 'Article 3 prohibits unconstitutional overthrow and affirms constitutional persistence.' }],
        flashcards: [{ front: 'Hart’s Rule of Recognition', back: 'The ultimate secondary rule that provides the criteria by which the validity of other rules of the system is assessed.' }]
      }
    ]
  },
  {
    id: 'course_legal_research',
    code: 'LAW 1105',
    title: 'Legal Research & Writing',
    category: 'Procedural & Clinical Law',
    level: 'Year 1 LLB',
    modulesCount: 4,
    enrolledStudentsCount: 430,
    courseOverview: 'Legal methodologies, primary vs secondary sources in Uganda, statutory interpretation canons (literal, golden, mischief, purposive), legal citation styles (OSCOLA), case briefing, and IRAC examination methodology.',
    coreStatutes: ['Interpretation Act Cap 3', 'Judicature Act Cap 13'],
    coreCases: ['Major General David Tinyefuza v AG (1997)', 'Heydon’s Case (1584) 3 Co Rep 7a'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Methodologies of statutory analysis, case synthesis, legal drafting structure, and scholarly citation.',
    modules: [
      {
        id: 'mod_lr_1',
        title: 'Statutory Interpretation Canons & The IRAC Method',
        overview: 'Literal rule, golden rule, mischief rule, purposive approach, and IRAC essay structure.',
        notes: `The canons of interpretation guide courts: (1) Literal Rule: Words given plain ordinary grammatical meaning; (2) Golden Rule: Modify literal meaning to avoid absurdity; (3) Mischief Rule (Heydon’s Case): Identify defect in common law the Act sought to cure; (4) Purposive Approach: Ascertain true objective of Parliament. In examinations, IRAC (Issue, Rule, Application, Conclusion) is standard.`,
        definitions: [{ term: 'Ratio Decidendi', definition: 'The essential legal reasoning upon which the court bases its final decision, which forms binding precedent.' }],
        keyCases: ['Heydon’s Case (1584) 3 Co Rep 7a', 'Charles Onyango Obbo v Attorney General (2004)'],
        keyStatutes: ['Interpretation Act Cap 3'],
        readingList: ['F.A.R. Bennion, Statutory Interpretation', 'G. Williams, Learning the Law'],
        practiceQuestion: 'Explain the rule of Ejusdem Generis with a concrete statutory example.',
        modelAnswer: 'Where general words follow specific words of the same class (e.g. "cats, dogs, and other animals"), the general words are restricted to things of the same genus (domestic pets, not wild lions).',
        shortAnswerQuestions: ['What does IRAC stand for?'],
        essayQuestions: ['Examine the rise of the purposive approach in the interpretation of constitutional texts in East Africa.'],
        mcqs: [{ question: 'In legal citation, what does the abbreviation OSCOLA stand for?', options: ['Oxford Standard for the Citation of Legal Authorities', 'Official Statutory Code of Law Authorities', 'Overseas Scholar Citation of Legal Articles', 'Organization for Standard Common Law Analysis'], answer: 'Oxford Standard for the Citation of Legal Authorities', explanation: 'OSCOLA is the standard UK and Commonwealth academic legal citation system.' }],
        flashcards: [{ front: 'IRAC Method', back: 'Issue (legal problem), Rule (governing statute/case), Application (apply rule to facts), Conclusion (resolution).' }]
      }
    ]
  },
  {
    id: 'course_pub_int_law',
    code: 'LAW 3106',
    title: 'Public International Law',
    category: 'Public Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 305,
    courseOverview: 'Nature of international law, Article 38(1) ICJ Statute sources (treaties, customary international law, general principles), statehood (Montevideo criteria), recognition, state jurisdiction and immunities, law of treaties, state responsibility, and international dispute resolution.',
    coreStatutes: ['Treaties Ratification Act Cap 204', 'Diplomatic Privileges Act Cap 201', 'International Criminal Court Act 2010'],
    coreCases: ['Nicaragua v United States (1986) ICJ Rep 14', 'Democratic Republic of the Congo v Uganda (2005) ICJ Rep 168 (Armed Activities Case)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'International legal order, sovereign state relations, treaty obligations, and international adjudication.',
    modules: [
      {
        id: 'mod_pil_1',
        title: 'Treaty Law & Monism vs Dualism in Uganda (Treaties Ratification Act Cap 204)',
        overview: 'How international treaties become binding domestically under the dualist constitutional order.',
        notes: `Uganda follows the dualist tradition. International treaties signed and ratified by the Executive do not automatically become domestic enforceable law until transformed by an Act of Parliament (Treaties Ratification Act Cap 204). However, under National Objective XXVIII and customary international law, courts interpret domestic statutes in harmony with international obligations.`,
        definitions: [{ term: 'Opinio Juris Sive Necessitatis', definition: 'The belief by states that a given practice is rendered obligatory by international law, essential to form customary international law.' }],
        keyCases: ['DRC v Uganda (Armed Activities on the Territory of the Congo) [2005] ICJ', 'Nicaragua v United States [1986] ICJ'],
        keyStatutes: ['Treaties Ratification Act Cap 204', '1995 Constitution (Objective XXVIII, Article 123)'],
        readingList: ['M. Shaw, International Law', 'Ian Brownlie, Principles of Public International Law'],
        practiceQuestion: 'Discuss the four Montevideo criteria for statehood.',
        modelAnswer: 'Under Article 1 Montevideo Convention 1933: (a) Permanent population, (b) Defined territory, (c) Government, (d) Capacity to enter into relations with other states.',
        shortAnswerQuestions: ['List the sources of international law under Article 38(1) of the ICJ Statute.'],
        essayQuestions: ['Critically analyze the International Court of Justice judgment in DRC v Uganda regarding state responsibility and reparations for armed activities.'],
        mcqs: [{ question: 'What is Uganda’s constitutional tradition regarding international treaty incorporation?', options: ['Monist (automatic self-execution)', 'Dualist (requires legislative enactment)', 'Customary non-recognition', 'Regional override'], answer: 'Dualist (requires legislative enactment)', explanation: 'Under the Treaties Ratification Act Cap 204, treaties require parliamentary domestication.' }],
        flashcards: [{ front: 'Jus Cogens', back: 'Peremptory norms of general international law from which no derogation is permitted (e.g. prohibition of genocide, slavery, torture).' }]
      }
    ]
  },
  {
    id: 'course_human_rights',
    code: 'LAW 3107',
    title: 'Human Rights Law',
    category: 'Public Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 370,
    courseOverview: 'International and regional human rights instruments (UDHR, ICCPR, ICESCR, African Charter on Human and Peoples Rights), domestic protection under Chapter 4, enforcement mechanisms under Human Rights (Enforcement) Act 2019, public interest litigation, and women’s/children’s rights.',
    coreStatutes: ['Human Rights (Enforcement) Act 2019', 'Uganda Human Rights Commission Act Cap 24', 'Prevention and Prohibition of Torture Act 2012'],
    coreCases: ['Susan Kigula & 416 Ors v AG (2005/2009)', 'Greenwatch v AG (2002)', 'CEHURD v Attorney General (2015)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Civil, political, economic, social and cultural rights, human rights enforcement, and constitutional litigation.',
    modules: [
      {
        id: 'mod_hr_1',
        title: 'Human Rights (Enforcement) Act 2019 & Personal Liability of Public Officers',
        overview: 'Procedural breakthroughs under Act No. 19 of 2019 empowering subordinate courts.',
        notes: `The Human Rights (Enforcement) Act 2019 revolutionized human rights litigation in Uganda. Key reforms include: (1) Section 4 empowers Magistrates Courts to hear human rights enforcement applications, (2) Section 10 imposes personal civil liability on individual public officers who commit human rights abuses, and (3) Prohibits dismissal of human rights petitions on procedural technicalities.`,
        definitions: [{ term: 'Public Interest Litigation', definition: 'Legal actions brought in court to enforce collective human rights or public duties without personal individual harm.' }],
        keyCases: ['Greenwatch v Attorney General (2002)', 'CEHURD v Attorney General (2015)', 'Susan Kigula v AG (2009)'],
        keyStatutes: ['Human Rights (Enforcement) Act 2019 (Act No. 19 of 2019)', '1995 Constitution (Articles 20-58)'],
        readingList: ['F. Jjuuko, The Fourth Branch: Public Interest Litigation in Uganda', 'Alston & Goodman, International Human Rights'],
        practiceQuestion: 'Discuss the impact of Section 10 of the Human Rights (Enforcement) Act 2019 on police accountability.',
        modelAnswer: 'Section 10 removes the shield of vicarious state liability as an excuse for torture, ordering offending officers to personally pay damages from their own pockets.',
        shortAnswerQuestions: ['List two non-derogable rights under Article 44.'],
        essayQuestions: ['Assess the role of the Uganda Human Rights Commission (UHRC) in safeguarding constitutional rights.'],
        mcqs: [{ question: 'Under Section 4 of the Human Rights (Enforcement) Act 2019, which courts have jurisdiction to hear human rights enforcement petitions?', options: ['Supreme Court only', 'Constitutional Court only', 'High Court and Magistrates Courts', 'Local Council Courts only'], answer: 'High Court and Magistrates Courts', explanation: 'Section 4 decentralized enforcement jurisdiction to High Court and Magistrates Courts.' }],
        flashcards: [{ front: 'Section 10 Human Rights Act 2019', back: 'Personal civil liability for public officers who violate fundamental human rights.' }]
      }
    ]
  },
  {
    id: 'course_equity_trusts',
    code: 'LAW 3108',
    title: 'Equity and Trusts',
    category: 'Private Law',
    level: 'Year 3 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 315,
    courseOverview: 'Historical development of Chancery jurisdiction, maxims of equity, equitable doctrines (conversion, election, satisfaction, performance), equitable remedies (injunction, specific performance, rectification, rescission), creation of express trusts, three certainties, charitable trusts, resulting and constructive trusts, and trustees duties.',
    coreStatutes: ['Trustees Act Cap 164', 'Trustees Incorporation Act Cap 165', 'Judicature Act Cap 13 (S.14)'],
    coreCases: ['Knight v Knight (1840) 3 Beav 148 (Three Certainties)', 'Keech v Sandford (1726) Sel Cas Ch 61', 'Barnes v Addy (1874) LR 9 Ch App 244'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Doctrines of conscience, equitable relief, fiduciary standards, and trust asset management.',
    modules: [
      {
        id: 'mod_eq_1',
        title: 'The Three Certainties in Express Private Trusts',
        overview: 'Knight v Knight requirements: Certainty of Intention, Subject Matter, and Objects.',
        notes: `For an express trust to be validly created, Lord Langdale in Knight v Knight (1840) established the "Three Certainties": (1) Certainty of Intention: Clear imperative words showing an intent to create a binding trust rather than precatory moral hope; (2) Certainty of Subject Matter: Trust property must be clearly identifiable; (3) Certainty of Objects: Beneficiaries must be identifiable under the list test or individual ascertainability test.`,
        definitions: [{ term: 'Constructive Trust', definition: 'A trust imposed by operation of law where it would be unconscionable for the legal owner to retain beneficial ownership.' }],
        keyCases: ['Knight v Knight (1840) 3 Beav 148', 'Keech v Sandford (1726) Sel Cas Ch 61', 'Re Gulbenkian’s Settlements [1970] AC 508'],
        keyStatutes: ['Trustees Act Cap 164', 'Judicature Act Cap 13'],
        readingList: ['Mowbray et al, Lewin on Trusts', 'D.J. Bakibinga, Equity and Trusts in Uganda'],
        practiceQuestion: 'Explain the rule in Keech v Sandford regarding trustee fiduciary profits.',
        modelAnswer: 'A trustee is strictly prohibited from profiting from the trust property; any renewal of a lease or secret benefit obtained in a fiduciary capacity is held on constructive trust for the beneficiaries.',
        shortAnswerQuestions: ['Name 3 classical maxims of equity.'],
        essayQuestions: ['Critically examine the equitable remedies of Specific Performance and Injunctions in Ugandan contract litigation.'],
        mcqs: [{ question: 'Which landmark case established the Three Certainties required to create a valid express trust?', options: ['Salomon v Salomon', 'Knight v Knight', 'Donoghue v Stevenson', 'Hadley v Baxendale'], answer: 'Knight v Knight', explanation: 'Knight v Knight (1840) established intention, subject matter, and objects certainty.' }],
        flashcards: [{ front: 'Maxim: He who comes to equity must come with clean hands', back: 'A claimant who has acted unconscionably or wrongfully in relation to the dispute will be denied equitable relief.' }]
      }
    ]
  },
  {
    id: 'course_environmental_law',
    code: 'LAW 4101',
    title: 'Environmental Law',
    category: 'Specialized Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 280,
    courseOverview: 'Constitutional basis of environmental rights (Articles 39, 245), National Environment Act 2019, Environmental Impact Assessments (EIA), polluter pays principle, precautionary principle, Public Trust Doctrine, wetlands and forestry conservation, climate change mitigation, and NEMA regulatory powers.',
    coreStatutes: ['National Environment Act, 2019 (Act No. 5 of 2019)', 'National Forestry and Tree Planting Act 2003', 'Water Act Cap 152', 'National Climate Change Act 2021'],
    coreCases: ['Greenwatch v Attorney General & NEMA (2002)', 'Advocates Coalition for Development and Environment (ACODE) v AG (2005)', 'TEAN v BATU (2002)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Ecological protection, environmental impact audits, sustainable resource management, and climate litigation.',
    modules: [
      {
        id: 'mod_env_1',
        title: 'The Public Trust Doctrine & Environmental Rights (Article 39 & Act No. 5 of 2019)',
        overview: 'State fiduciary duty over natural resources under Article 237(2)(b) and Section 4 of NEA 2019.',
        notes: `Article 39 of the Constitution guarantees every Ugandan the right to a clean and healthy environment. Under Article 237(2)(b) and Section 4 of the National Environment Act 2019, the Government holds natural lakes, rivers, wetlands, and forest reserves in trust for the common good (Public Trust Doctrine). In ACODE v AG, the High Court held that the government cannot alienate protected forest reserves for private commercial sugar planting without statutory parliamentary approval.`,
        definitions: [{ term: 'Polluter Pays Principle', definition: 'The environmental law principle that the costs of preventing, controlling, and remediating environmental damage shall be borne by the polluter.' }],
        keyCases: ['Greenwatch v Attorney General & NEMA (2002)', 'ACODE v Attorney General (2005)'],
        keyStatutes: ['National Environment Act 2019 (Act No. 5 of 2019)', '1995 Constitution (Articles 39, 237(2)(b), 245)'],
        readingList: ['E. Tumushabe, Environmental Law in East Africa', 'Birnie, Boyle & Redgwell, International Law and the Environment'],
        practiceQuestion: 'Discuss the legal prerequisites before executing an Environmental Impact Assessment (EIA) under Section 112 NEA 2019.',
        modelAnswer: 'Developer must submit project brief, conduct public consultations with affected communities, assess ecological impacts, propose mitigation measures, and obtain NEMA certification before commencing project.',
        shortAnswerQuestions: ['What is the Precautionary Principle?'],
        essayQuestions: ['Critically analyze the role of public interest litigation in halting wetland encroachment in urban Uganda.'],
        mcqs: [{ question: 'Which constitutional article guarantees the right to a clean and healthy environment in Uganda?', options: ['Article 21', 'Article 26', 'Article 39', 'Article 50'], answer: 'Article 39', explanation: 'Article 39 provides that every Ugandan has a right to a clean and healthy environment.' }],
        flashcards: [{ front: 'Public Trust Doctrine (Art 237(2)(b))', back: 'State holds lakes, rivers, wetlands, and forest reserves in trust for the common ecological good of all citizens.' }]
      }
    ]
  },
  {
    id: 'course_ip_law',
    code: 'LAW 4102',
    title: 'Intellectual Property Law',
    category: 'Commercial Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 295,
    courseOverview: 'Copyright and neighbouring rights (originality, economic and moral rights, infringement, fair use), Trademarks (registration, distinctiveness, deceptive similarity, passing off), Patents and Industrial Designs (novelty, inventive step, industrial applicability), and Geographical Indications.',
    coreStatutes: ['Copyright and Neighbouring Rights Act 2006', 'Trademarks Act 2010', 'Industrial Property Act 2014', 'Geographical Indications Act 2013'],
    coreCases: ['Angella Katatumba v The Anti-Corruption Coalition of Uganda (2014)', 'Re Reckitt & Colman Products Ltd v Borden Inc [1990] 1 All ER 873 (Jif Lemon)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Protection of creative works, brand marks, patentable inventions, and commercial exclusivity.',
    modules: [
      {
        id: 'mod_ip_1',
        title: 'Copyright Infringement & Moral Rights (Act No. 19 of 2006)',
        overview: 'Economic vs moral rights, substantial reproduction test, and commercial remedies.',
        notes: `Under the Copyright and Neighbouring Rights Act 2006, copyright vests automatically upon creation of an original literary, musical, artistic, or audio-visual work fixed in material form. Authors enjoy: (1) Economic rights (exclusive right to reproduce, distribute, perform, broadcast); (2) Moral rights (right of paternity/attribution and right of integrity against derogatory treatment). In Katatumba v ACCU (2014), the Commercial Court awarded UGX 55 million in damages for unauthorized use of a song in an NGO advertisement.`,
        definitions: [{ term: 'Moral Rights', definition: 'Non-economic rights of an author to claim authorship and prevent distortion or mutilation of their creative work.' }],
        keyCases: ['Angella Katatumba v Anti-Corruption Coalition of Uganda (2014) HCT-00-CC-CS-307', 'University of London Press v University Tutorial Press [1916] 2 Ch 601'],
        keyStatutes: ['Copyright and Neighbouring Rights Act 2006', 'Trademarks Act 2010'],
        readingList: ['D.J. Bakibinga, Intellectual Property Law in Uganda', 'Bently and Sherman, Intellectual Property Law'],
        practiceQuestion: 'Distinguish between copyright infringement and the common law tort of passing off.',
        modelAnswer: 'Copyright protects original creative expression fixed in material form under statute; passing off protects commercial goodwill and reputation against misrepresentation in trade (Jif Lemon case).',
        shortAnswerQuestions: ['What are the three criteria for patentability under the Industrial Property Act 2014?'],
        essayQuestions: ['Evaluate the effectiveness of the Copyright and Neighbouring Rights Act 2006 in protecting digital music and software in Uganda.'],
        mcqs: [{ question: 'Is formal registration mandatory for copyright protection to exist in Uganda?', options: ['Yes, with URSB within 30 days', 'No, copyright vests automatically upon creation and fixation', 'Yes, with Ministry of Justice', 'Only for foreign works'], answer: 'No, copyright vests automatically upon creation and fixation', explanation: 'Section 4 Copyright Act provides protection automatically without mandatory registration.' }],
        flashcards: [{ front: 'Section 4 Copyright Act 2006', back: 'Original work is protected automatically upon creation and fixation in any material form.' }]
      }
    ]
  },
  {
    id: 'course_banking_insurance',
    code: 'LAW 4103',
    title: 'Banking and Insurance Law',
    category: 'Commercial Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 310,
    courseOverview: 'Banker-customer relationship, duties of confidentiality (Tournier rule), bank checks and electronic funds transfer, Bank of Uganda central banking regulation, commercial bank resolution and statutory receivership under FIA 2004, and insurance principles (utmost good faith, insurable interest, indemnity, subrogation).',
    coreStatutes: ['Financial Institutions Act 2004 (as amended 2016)', 'Bank of Uganda Act Cap 51', 'Insurance Act 2017', 'Tier 4 Microfinance Institutions and Money Lenders Act 2016'],
    coreCases: ['Bank of Uganda v Crane Bank Ltd (In Receivership) & Sudhir Ruparelia (2019) UGCA 5 / (2022) UGSC 23', 'Tournier v National Provincial and Union Bank of England [1924] 1 KB 461'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Financial institutions regulation, central banking oversight, bank liquidation, and insurance risk contracts.',
    modules: [
      {
        id: 'mod_bank_1',
        title: 'Statutory Receivership & Liquidation under the Financial Institutions Act 2004',
        overview: 'Powers of the Central Bank, statutory management, receivership, and the landmark Crane Bank rulings.',
        notes: `Under the Financial Institutions Act 2004 (amended 2016), Bank of Uganda regulates commercial banks. When a financial institution is distressed, BOU may place it under statutory management or receivership. In Bank of Uganda v Crane Bank Ltd & Sudhir Ruparelia, the Court of Appeal and Supreme Court held that a financial institution in receivership cannot sue or be sued in its own name, and receivership terminates upon liquidation.`,
        definitions: [{ term: 'Uberrimae Fidei', definition: 'The duty of utmost good faith requiring full disclosure of all material facts in insurance contracts.' }],
        keyCases: ['Bank of Uganda v Crane Bank Ltd (In Receivership) (2019) UGCA 5 / (2022) UGSC', 'Tournier v National Provincial Bank [1924] 1 KB 461'],
        keyStatutes: ['Financial Institutions Act 2004 (Sections 87-99)', 'Insurance Act 2017'],
        readingList: ['E.P. Ellinger, Modern Banking Law', 'Birds’ Modern Insurance Law'],
        practiceQuestion: 'Discuss the four exceptions to the banker’s duty of customer confidentiality in Tournier’s case.',
        modelAnswer: 'Exceptions: (a) Disclosure under compulsion of law, (b) Duty to the public to disclose, (c) Interests of the bank require disclosure, (d) Customer express or implied consent.',
        shortAnswerQuestions: ['Define insurable interest in insurance law.'],
        essayQuestions: ['Critically examine the regulatory powers of Bank of Uganda in resolving distressed commercial banks under the Financial Institutions Act 2004.'],
        mcqs: [{ question: 'Which landmark English case defined the scope of a bank’s duty of customer confidentiality?', options: ['Hadley v Baxendale', 'Tournier v National Provincial Bank', 'Salomon v Salomon', 'Rylands v Fletcher'], answer: 'Tournier v National Provincial Bank', explanation: 'Tournier [1924] established the four exceptions to banker confidentiality.' }],
        flashcards: [{ front: 'Subrogation in Insurance', back: 'The right of an insurer who has indemnified an insured to step into the insured’s shoes and sue third-party tortfeasors.' }]
      }
    ]
  },
  {
    id: 'course_tax_law',
    code: 'LAW 4104',
    title: 'Tax Law',
    category: 'Commercial Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 275,
    courseOverview: 'Principles of taxation, constitutional power to levy taxes under Article 152, income tax (gross income, allowable deductions, employment income, business income, property income), Value Added Tax (VAT), tax avoidance vs evasion (Ramsay principle), Tax Appeals Tribunal (TAT) jurisdiction, and URA enforcement procedures.',
    coreStatutes: ['Income Tax Act Cap 340 (and annual amendments)', 'Value Added Tax Act Cap 349', 'Tax Procedures Code Act 2014', 'Tax Appeals Tribunal Act Cap 345'],
    coreCases: ['Uganda Revenue Authority v Rabbo Enterprises Ltd & Anor (2004) UGSC 7', 'WT Ramsay Ltd v IRC [1982] AC 300', 'Stephen Mabosi v Uganda Revenue Authority (1995)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Revenue collection laws, direct and indirect taxation, tax dispute tribunals, and statutory compliance.',
    modules: [
      {
        id: 'mod_tax_1',
        title: 'Constitutional Legality of Taxation & The Tax Appeals Tribunal (TAT)',
        overview: 'Article 152(1) Constitution and dispute resolution mechanisms under the Tax Procedures Code Act.',
        notes: `Article 152(1) of the Constitution mandates that no tax shall be imposed except under the authority of an Act of Parliament. Tax statutes are interpreted strictly—there is no equity about a tax (Cape Brandy Syndicate v IRC). Where a taxpayer disputes an assessment by Uganda Revenue Authority (URA), they must file an objection under the Tax Procedures Code Act 2014 and may appeal to the Tax Appeals Tribunal (TAT).`,
        definitions: [{ term: 'Tax Avoidance', definition: 'The legal arrangement of a taxpayer’s commercial affairs to minimize tax liability within the boundaries of the law.' }, { term: 'Tax Evasion', definition: 'The illegal non-payment or underpayment of tax through fraud or deliberate concealment of income.' }],
        keyCases: ['Uganda Revenue Authority v Rabbo Enterprises (2004) UGSC 7', 'Cape Brandy Syndicate v IRC [1921] 1 KB 64'],
        keyStatutes: ['1995 Constitution (Article 152)', 'Income Tax Act Cap 340', 'Tax Procedures Code Act 2014'],
        readingList: ['D.J. Bakibinga, Revenue Law in Uganda', 'J. Tiley, Revenue Law'],
        practiceQuestion: 'Explain the difference between a direct tax and an indirect tax in the Ugandan tax framework.',
        modelAnswer: 'A direct tax is levied directly on the taxpayer’s income or wealth (e.g. Pay-As-You-Earn/Corporate Income Tax) and cannot be shifted; an indirect tax is levied on consumption of goods/services (e.g. VAT/Excise Duty) and is shifted to the consumer.',
        shortAnswerQuestions: ['What is the mandatory statutory deposit required before appealing to TAT?'],
        essayQuestions: ['Critically examine the Ramsay principle in distinguishing legitimate tax planning from artificial tax avoidance schemes.'],
        mcqs: [{ question: 'Under Article 152(1) of the Constitution of Uganda, who has the exclusive power to impose taxes?', options: ['Uganda Revenue Authority Commissioner General', 'Minister of Finance', 'Parliament by law', 'Cabinet'], answer: 'Parliament by law', explanation: 'Article 152(1) mandates that no tax shall be imposed except under the authority of an Act of Parliament.' }],
        flashcards: [{ front: 'Article 152(1) Constitution', back: 'No tax shall be imposed except under the authority of an Act of Parliament.' }]
      }
    ]
  },
  {
    id: 'course_cyber_law',
    code: 'LAW 4105',
    title: 'Cyber Law & Information Technology Law',
    category: 'Specialized Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 350,
    courseOverview: 'Legal regulation of cyberspace, computer crimes under Computer Misuse Act 2011 (as amended 2022), electronic contracts and digital signatures under ETA and ESA 2011, data protection principles under Data Protection and Privacy Act 2019, artificial intelligence regulation, and online free expression.',
    coreStatutes: ['Computer Misuse Act, 2011 (as amended by Act No. 17 of 2022)', 'Data Protection and Privacy Act, 2019 (Act No. 9 of 2019)', 'Electronic Transactions Act 2011', 'Electronic Signatures Act 2011'],
    coreCases: ['Andrew Karamagi & Robert Shaka v Attorney General (2023) UGCC (Offensive Communication Section 25 CMA Struck Down)', 'Stella Nyanzi v Uganda (2020)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Digital security, electronic evidence, data privacy compliance, cybersecurity offenses, and algorithmic governance.',
    modules: [
      {
        id: 'mod_cyber_1',
        title: 'Cyber Crimes & The Constitutional Strike-Down of Offensive Communication',
        overview: 'Section 24/25 Computer Misuse Act 2011 and the landmark 2023 Constitutional Court ruling.',
        notes: `The Computer Misuse Act 2011 criminalizes unauthorized computer access, cyber harassment, cyber stalking, and computer fraud. In Andrew Karamagi & Robert Shaka v Attorney General (Constitutional Petition No. 5 of 2016, decided January 2023), the Constitutional Court struck down Section 25 (offensive communication) as unconstitutional, holding that vague criminalization of speech that annoys or disturbs violates Article 29 freedom of expression.`,
        definitions: [{ term: 'Data Controller', definition: 'A person who, either alone or jointly with others, controls the collection, processing, and use of personal data under Act No. 9 of 2019.' }],
        keyCases: ['Andrew Karamagi & Robert Shaka v Attorney General (2023) UGCC', 'Stella Nyanzi v Uganda (2020) UGHCCD 18'],
        keyStatutes: ['Computer Misuse Act 2011 (as amended 2022)', 'Data Protection and Privacy Act 2019 (Act No. 9 of 2019)'],
        readingList: ['I. Lloyd, Information Technology Law', 'C. Reed, Computer Law'],
        practiceQuestion: 'State the core Data Protection Principles established under Section 3 of the Data Protection and Privacy Act 2019.',
        modelAnswer: 'Principles include: (a) Accountability, (b) Lawfulness and fairness in processing, (c) Purpose specification, (d) Data quality and accuracy, (e) Security safeguards, (f) Data subject participation and consent.',
        shortAnswerQuestions: ['What was the ratio decidendi in the 2023 Karamagi case regarding Section 25 CMA?'],
        essayQuestions: ['Critically evaluate how the Data Protection and Privacy Act 2019 balances digital commerce against the right to privacy under Article 27 of the 1995 Constitution.'],
        mcqs: [{ question: 'In January 2023, which section of the Computer Misuse Act 2011 was declared unconstitutional by the Constitutional Court?', options: ['Section 12 (Hacking)', 'Section 14 (Cyber stalking)', 'Section 25 (Offensive Communication)', 'Section 28 (Electronic fraud)'], answer: 'Section 25 (Offensive Communication)', explanation: 'The Constitutional Court struck down Section 25 for violating Article 29 free speech.' }],
        flashcards: [{ front: 'Data Protection and Privacy Act 2019', back: 'Governs the collection, storage, and processing of personal data, giving individuals rights over their personal information.' }]
      }
    ]
  },
  {
    id: 'course_legal_ethics',
    code: 'LAW 4107',
    title: 'Professional Ethics & Legal Practice',
    category: 'Procedural & Clinical Law',
    level: 'Year 4 LLB & Bar Course',
    modulesCount: 5,
    enrolledStudentsCount: 380,
    courseOverview: 'The ethical and legal duties governing Advocates of the High Court of Uganda: duties to the Court, duties to the client, handling client accounts and trust funds, prohibition of touting/unsolicited advertising, conflict of interest, disciplinary proceedings before the Law Council, and professional etiquette.',
    coreStatutes: ['Advocates Act (Cap. 267)', 'Advocates (Professional Conduct and Etiquette) Regulations S.I. 267-1', 'Advocates (Accounts) Regulations S.I. 267-3'],
    coreCases: ['Kasirye Byaruhanga & Co Advocates v Uganda Development Bank [2007] UGSC 2', 'Makula International Ltd v Cardinal Nsubuga [1982] HCB 11', 'Kabale Housing Estates v Katusiime (2000)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan Bar Course & University LLB Curriculum', 'Academic Curriculum', '2024/2025'),
    description: 'Statutory regulation of legal practice, Law Council disciplinary jurisprudence, fiduciary duties to clients, and integrity of the bar.',
    modules: [
      {
        id: 'mod_ethics_1',
        title: 'Duty to Court & Prohibition of Illegalities',
        overview: 'Examines the paramount duty of the advocate as an officer of the court and the rule in Makula International and Kasirye Byaruhanga.',
        notes: `An advocate is primarily an minister of justice and an officer of the court. Under Regulation 2 of S.I. 267-1, an advocate must not mislead the court or knowingly rely on false evidence or illegal pleadings. In Kasirye Byaruhanga & Co Advocates v UDB (2007), the Supreme Court ruled that practicing without a valid Practicing Certificate is illegal and invalidates all court pleadings signed by that advocate.`,
        definitions: [
          { term: 'Fiduciary Duty', definition: 'A legal duty of utmost loyalty, good faith, and full disclosure owed by an advocate to their client.' },
          { term: 'Touting', definition: 'The unethical solicitation of legal business directly or indirectly by an advocate or their agent.' }
        ],
        keyCases: ['Kasirye Byaruhanga & Co Advocates v UDB (2007) UGSC 2', 'Makula International Ltd v Cardinal Nsubuga [1982] HCB 11'],
        keyStatutes: ['Advocates Act Cap 267 (Sections 14, 19, 57)', 'S.I. 267-1 (Advocates Regulations)'],
        readingList: ['P. Walubiri, Professional Conduct and Ethics of the Legal Profession in Uganda', 'Sir Thomas Bingham, The Rule of Law'],
        practiceQuestion: 'What are the legal consequences of an advocate practicing law and signing court pleadings without a valid Practicing Certificate?',
        modelAnswer: 'Under Section 14 and 57 of the Advocates Act and the Supreme Court decision in Kasirye Byaruhanga v UDB, practicing without a valid PC is an offense and renders all pleadings signed by the advocate incurably defective, null, and void ab initio.',
        shortAnswerQuestions: ['Distinguish between a client account and an office account under S.I. 267-3.'],
        essayQuestions: ['"An advocate’s duty to the court is paramount, overriding even the client’s explicit instructions." Critically evaluate this statement under Ugandan law.'],
        mcqs: [{ question: 'Which body exercises statutory disciplinary control over advocates in Uganda?', options: ['Uganda Law Society Executive', 'Law Council Disciplinary Committee', 'High Court Registrar', 'Ministry of Justice'], answer: 'Law Council Disciplinary Committee', explanation: 'Under Section 18 of the Advocates Act Cap 267, the Law Council Disciplinary Committee handles complaints against advocates.' }],
        flashcards: [{ front: 'Section 14 Advocates Act', back: 'Mandates that no advocate shall practice law without holding a valid, current Practicing Certificate issued by the Chief Registrar.' }]
      }
    ]
  },
  {
    id: 'course_leg_drafting',
    code: 'LAW 4108',
    title: 'Legislative Drafting & Statutory Interpretation',
    category: 'Procedural & Clinical Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 290,
    courseOverview: 'Principles and techniques of drafting primary and subsidiary legislation in Uganda: structure of an Act of Parliament, drafting preamble and long title, definitions clauses, operative provisions, penal clauses, schedules, repeal provisions, and statutory interpretation under the Interpretation Act Cap 3.',
    coreStatutes: ['Interpretation Act (Cap. 3)', 'Acts of Parliament Act Cap 2', 'Constitution of Uganda 1995 (Chapter 6 & Article 79)'],
    coreCases: ['Paul K. Ssemogerere & Zachary Olum v Attorney General [2000] UGSC 1', 'Uganda Association of Women Lawyers (FIDA) v AG (2003)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Techniques of translating public policy into precise legislative text, canons of statutory construction, and parliamentary enactment rules.',
    modules: [
      {
        id: 'mod_leg_drafting_1',
        title: 'Canons of Statutory Construction & The Interpretation Act',
        overview: 'Literal rule, golden rule, mischief rule (Heydon’s Case), purposive approach, and statutory presumptions.',
        notes: `Statutory interpretation in Uganda utilizes the Literal Rule, Golden Rule, Mischief Rule, and increasingly the Modern Purposive Rule. Under Section 10 of the Interpretation Act Cap 3, words in the singular include the plural, and words denoting the masculine gender include females unless a contrary intention appears. In Ssemogerere v AG (2000), the Supreme Court emphasized that constitutional interpretation requires a broad, purposive approach rather than mechanical literalism.`,
        definitions: [
          { term: 'Mischief Rule', definition: 'A rule of construction that considers the defect or mischief in the previous law which the statute intended to cure.' },
          { term: 'Ejusdem Generis', definition: 'Of the same kind; where general words follow specific words, the general words are construed to apply to things of the same class.' }
        ],
        keyCases: ['Paul Ssemogerere v AG (2000) UGSC 1', 'Heydon’s Case (1584) 3 Co Rep 7a'],
        keyStatutes: ['Interpretation Act Cap 3', 'Constitution of Uganda 1995 (Articles 79, 88, 137)'],
        readingList: ['G.C. Thornton, Legislative Drafting', 'Bennion on Statutory Interpretation'],
        practiceQuestion: 'Explain the presumption against retrospective legislation under Ugandan law.',
        modelAnswer: 'Under Article 28(7) of the Constitution and Section 13 of the Interpretation Act, statutes are presumed to apply prospectively, especially criminal enactments, unless Parliament explicitly provides otherwise for civil procedural rules.',
        shortAnswerQuestions: ['What is the function of the Long Title of an Act of Parliament?'],
        essayQuestions: ['Analyze the transition from strict literalism to the purposive approach in Ugandan judicial interpretation of human rights statutes.'],
        mcqs: [{ question: 'Which canon of interpretation seeks to determine what defect in the prior law Parliament intended to cure?', options: ['Literal Rule', 'Golden Rule', 'Mischief Rule', 'Noscitur a Sociis'], answer: 'Mischief Rule', explanation: 'The Mischief Rule from Heydon’s Case directs the court to identify the previous mischief and the statutory remedy.' }],
        flashcards: [{ front: 'Interpretation Act Cap 3 S.10', back: 'Unless contrary intention appears, words importing the singular include the plural and vice versa.' }]
      }
    ]
  },
  {
    id: 'course_adr',
    code: 'LAW 4109',
    title: 'Alternative Dispute Resolution & Mediation',
    category: 'Procedural & Clinical Law',
    level: 'Year 4 LLB & Bar Course',
    modulesCount: 5,
    enrolledStudentsCount: 340,
    courseOverview: 'The theory and practice of non-adversarial conflict resolution in Uganda: arbitration under Arbitration and Conciliation Act Cap 4, court-annexed mediation under Judicature (Mediation) Rules 2013, conciliation, negotiation strategies, customary dispute resolution, and enforcement of domestic and international arbitral awards.',
    coreStatutes: ['Arbitration and Conciliation Act (Cap. 4)', 'Judicature (Mediation) Rules, 2013 (S.I. No. 10 of 2013)', '1995 Constitution (Article 126(2)(d))'],
    coreCases: ['Fulgensius Mungereza v Price WaterhouseCoopers (2002)', 'Uganda Telecom Ltd v Tanzanite Corp [2021] UGCommC 12'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Arbitration proceedings, CADER institutional frameworks, mediation ethics, and non-adversarial resolution mechanisms.',
    modules: [
      {
        id: 'mod_adr_1',
        title: 'Arbitration Agreements & Judicial Non-Interference',
        overview: 'Section 5 of Cap 4, doctrine of separability (Kompetenz-Kompetenz), and mandatory referral to arbitration.',
        notes: `Article 126(2)(d) of the 1995 Constitution establishes that courts shall promote reconciliation and alternative dispute resolution. Under Section 5 of the Arbitration and Conciliation Act Cap 4, where a party to an arbitration agreement institutes court proceedings, the court is bound to stay proceedings and refer the parties to arbitration unless the agreement is null and void, inoperative, or incapable of performance.`,
        definitions: [
          { term: 'Arbitration Agreement', definition: 'An agreement by the parties to submit to arbitration all or certain disputes which have arisen or may arise between them in respect of a defined legal relationship.' },
          { term: 'Kompetenz-Kompetenz', definition: 'The legal doctrine that an arbitral tribunal has jurisdiction to rule on its own jurisdiction.' }
        ],
        keyCases: ['Fulgensius Mungereza v Price WaterhouseCoopers (2002)', 'BOC Gases Kenya Ltd v Kimani [2002] 1 EA 18'],
        keyStatutes: ['Arbitration and Conciliation Act Cap 4 (Sections 5, 9, 34, 35)', 'Constitution Article 126(2)(d)'],
        readingList: ['M. Hunter & N. Blackaby, Redfern and Hunter on International Arbitration', 'CADER Practice Guidelines'],
        practiceQuestion: 'What conditions must be satisfied before a court stays a civil suit under Section 5 of the Arbitration and Conciliation Act Cap 4?',
        modelAnswer: 'The applicant must show: (1) existence of a valid written arbitration agreement, (2) that the dispute falls within the arbitration clause, (3) that the application is made before taking any substantive step in the proceedings.',
        shortAnswerQuestions: ['State the grounds for setting aside an arbitral award under Section 34 of Cap 4.'],
        essayQuestions: ['Critically analyze the effectiveness of mandatory Court-Annexed Mediation in clearing case backlog in the Commercial Division of the High Court of Uganda.'],
        mcqs: [{ question: 'Under Section 5 of the Arbitration and Conciliation Act Cap 4, what is the court duty when an arbitration agreement exists?', options: ['Proceed with the trial', 'Dismiss the suit with costs', 'Refer the parties to arbitration and stay proceedings', 'Declare the contract void'], answer: 'Refer the parties to arbitration and stay proceedings', explanation: 'Section 5 requires mandatory referral to arbitration unless the clause is void or inoperative.' }],
        flashcards: [{ front: 'Article 126(2)(d) Constitution', back: 'Courts shall promote reconciliation between parties in the administration of justice.' }]
      }
    ]
  },
  {
    id: 'course_ihl',
    code: 'LAW 4111',
    title: 'International Humanitarian Law & Armed Conflict',
    category: 'Public Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 310,
    courseOverview: 'The law of armed conflict (Jus in Bello): the 1949 Geneva Conventions and Additional Protocols I & II, distinction between international and non-international armed conflict, protected persons (civilians, prisoners of war, wounded), prohibition of indiscriminate weapons, child soldiers, war crimes, and command responsibility.',
    coreStatutes: ['Geneva Conventions Act (Cap. 363)', 'International Criminal Court Act, 2010 (Act No. 11 of 2010)', 'Red Cross Act Cap 54'],
    coreCases: ['Uganda v Thomas Kwoyelo alias Latoni [2018] UGICD 1', 'Prosecutor v Dominic Ongwen ICC-02/04-01/15 (2021)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Protection of war victims, rules of combat engagement, international criminal tribunals, and ICC implementation in Uganda.',
    modules: [
      {
        id: 'mod_ihl_1',
        title: 'Core Principles of IHL: Distinction, Proportionality & Military Necessity',
        overview: 'The fundamental customary principles governing conduct of hostilities and protection of civilians.',
        notes: `International Humanitarian Law is founded on three immutable pillars: (1) The Principle of Distinction (parties must distinguish between combatants and civilians, and between military objectives and civilian objects), (2) Proportionality (collateral damage must not be excessive in relation to concrete and direct military advantage), and (3) Prohibition of unnecessary suffering. In Uganda v Thomas Kwoyelo (2018), the High Court International Crimes Division affirmed that non-international armed conflicts are governed by Common Article 3 of the Geneva Conventions and customary IHL.`,
        definitions: [
          { term: 'Common Article 3', definition: 'The foundational article of the 1949 Geneva Conventions establishing minimum humanitarian protections in armed conflicts not of an international character.' },
          { term: 'Command Responsibility', definition: 'The legal doctrine holding military commanders criminally liable for war crimes committed by subordinates if they knew or should have known and failed to prevent or punish them.' }
        ],
        keyCases: ['Uganda v Thomas Kwoyelo (2018) UGICD 1', 'Prosecutor v Dominic Ongwen (ICC 2021)'],
        keyStatutes: ['Geneva Conventions Act Cap 363', 'ICC Act 2010 (Act No. 11 of 2010)'],
        readingList: ['Y. Dinstein, The Conduct of Hostilities under the Law of International Armed Conflict', 'J.M. Henckaerts, Customary International Humanitarian Law (ICRC)'],
        practiceQuestion: 'Differentiate between International Armed Conflict (IAC) and Non-International Armed Conflict (NIAC) under the Geneva Conventions.',
        modelAnswer: 'An IAC occurs between two or more High Contracting States (Common Article 2); a NIAC occurs within the territory of a State between governmental armed forces and organized non-state armed groups or between such groups (Common Article 3 & Protocol II).',
        shortAnswerQuestions: ['Define perfidy in armed conflict.'],
        essayQuestions: ['Examine the domestic enforcement of the Rome Statute in Uganda through the International Crimes Division of the High Court.'],
        mcqs: [{ question: 'Which article of the Geneva Conventions 1949 applies to conflicts not of an international character?', options: ['Article 1', 'Common Article 3', 'Article 51', 'Article 100'], answer: 'Common Article 3', explanation: 'Common Article 3 provides minimum mandatory protections in non-international armed conflicts.' }],
        flashcards: [{ front: 'Principle of Distinction', back: 'Parties must at all times distinguish between civilian populations and combatants, and direct operations only against military objectives.' }]
      }
    ]
  },
  {
    id: 'course_clinical_law',
    code: 'LAW 4112',
    title: 'Clinical Legal Education & Community Practice',
    category: 'Procedural & Clinical Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 360,
    courseOverview: 'Hands-on experiential legal education: legal aid clinics, client interviewing and counseling, community legal awareness, paralegal training, street law, public interest litigation advocacy, and access to justice for indigent and marginalized persons.',
    coreStatutes: ['Poor Persons Defence Act Cap 20', 'Legal Aid Policy of Uganda', 'Advocates Act (Cap. 267)'],
    coreCases: ['Uganda Law Society v Attorney General (2006)', 'Human Rights Network Uganda v AG (2010)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Practical client representation, public interest advocacy, community paralegal outreach, and access to justice clinics.',
    modules: [
      {
        id: 'mod_clinical_1',
        title: 'Client Interviewing, Counseling & Fact-Investigation',
        overview: 'Core clinical competencies: establishing trust, active listening, fact-gathering, and ethical advising.',
        notes: `Clinical legal education connects theoretical legal rules to human reality. The initial client interview requires three distinct stages: (1) Preliminary rapport and establishing confidentiality, (2) Chronological fact-gathering using open-ended questions, and (3) Legal analysis, identifying causes of action, and collaboratively outlining remedies. Under Section 133 of the Evidence Act, all client-advocate communications are strictly protected by professional legal privilege.`,
        definitions: [
          { term: 'Legal Aid', definition: 'The provision of free or subsidized legal advice and representation to indigent persons who cannot afford private counsel.' },
          { term: 'Legal Privilege', definition: 'The statutory right protecting confidential communications between a client and their legal representative from disclosure.' }
        ],
        keyCases: ['Kasirye Byaruhanga v UDB (2007)', 'FIDA Uganda v Attorney General (2003)'],
        keyStatutes: ['Evidence Act Cap 6 (Section 133)', 'Poor Persons Defence Act Cap 20'],
        readingList: ['D. Binder & P. Bergman, Lawyers as Counselors: A Client-Centered Approach', 'PILAC Makerere Law Journal Series'],
        practiceQuestion: 'What are the ethical responsibilities of a student clinician when interviewing an indigent client?',
        modelAnswer: 'The clinician must ensure informed consent, maintain strict confidentiality, clarify that they are students under advocate supervision, and never provide unauthorized guarantees of case outcome.',
        shortAnswerQuestions: ['State the three stages of a client-centered interview.'],
        essayQuestions: ['"Clinical legal education is essential for bridging the gap between academic theory and real-world legal practice in Uganda." Discuss.'],
        mcqs: [{ question: 'Which section of the Evidence Act Cap 6 protects advocate-client professional privilege in Uganda?', options: ['Section 20', 'Section 105', 'Section 133', 'Section 160'], answer: 'Section 133', explanation: 'Section 133 of the Evidence Act protects confidential communications between advocates and clients.' }],
        flashcards: [{ front: 'Section 133 Evidence Act', back: 'Protects confidential communications between an advocate and client from compulsory disclosure in court.' }]
      }
    ]
  },
  {
    id: 'course_criminology',
    code: 'LAW 4113',
    title: 'Criminology & Penology',
    category: 'Public Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 280,
    courseOverview: 'Socio-legal analysis of crime causation, psychological theories of offending, sociological jurisprudence, policing systems, penal philosophy, capital punishment jurisprudence, prison administration under Prisons Act 2006, probation, and community service under Community Service Act Cap 115.',
    coreStatutes: ['Prisons Act, 2006 (Act No. 17 of 2006)', 'Community Service Act (Cap. 115)', 'Children Act Cap 59 (Youth Justice)'],
    coreCases: ['Susan Kigula & 416 Others v Attorney General [2009] UGSC 6', 'Uganda v Kyamanywa [2000] UGSC 3'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Theories of criminal behavior, sentencing guidelines, restorative justice, prison rehabilitation, and capital punishment jurisprudence.',
    modules: [
      {
        id: 'mod_crim_1',
        title: 'Theories of Punishment & The Susan Kigula Ruling on Mandatory Death Penalty',
        overview: 'Retribution, deterrence, rehabilitation, incapacitation, and the landmark Supreme Court ruling striking down mandatory death sentences.',
        notes: `Penal theory identifies four primary objectives of sentencing: Retribution, Deterrence, Incapacitation, and Rehabilitation. In Susan Kigula & 416 Others v Attorney General (2009), the Supreme Court struck down the mandatory death penalty under the Penal Code Act, holding that mandatory sentencing deprives the trial court of discretion and denies the offender a hearing in mitigation under Article 28 and 22. The court also held that death row delay exceeding 3 years becomes cruel, inhuman, and degrading treatment under Article 24.`,
        definitions: [
          { term: 'Mandatory Sentence', definition: 'A sentence prescribed by statute where the court is given no judicial discretion to impose any alternative sentence.' },
          { term: 'Restorative Justice', definition: 'A system of criminal justice that focuses on the rehabilitation of offenders through reconciliation with victims and the community at large.' }
        ],
        keyCases: ['Susan Kigula & 416 Others v Attorney General (2009) UGSC 6', 'Uganda v Kyamanywa (2000) UGSC 3'],
        keyStatutes: ['Constitution of Uganda 1995 (Articles 22, 24, 28)', 'Prisons Act 2006', 'Constitution (Sentencing Guidelines) Practice Directions 2013'],
        readingList: ['T. Newburn, Criminology', 'L. Tibatemwa-Ekirikubinza, Women’s Violent Crime in Uganda'],
        practiceQuestion: 'Explain the ratio decidendi in Susan Kigula v AG regarding death row delay.',
        modelAnswer: 'The Supreme Court held that holding a condemned convict on death row under anxiety of execution for more than three years after confirmation of sentence violates Article 24 (cruel and inhuman treatment), converting the sentence to life imprisonment.',
        shortAnswerQuestions: ['List the four traditional theories of punishment.'],
        essayQuestions: ['Critically evaluate whether the abolition of the mandatory death penalty in Susan Kigula has advanced restorative justice in Uganda.'],
        mcqs: [{ question: 'What was the key holding in Susan Kigula v Attorney General (2009)?', options: ['Capital punishment is completely unconstitutional in all cases', 'The mandatory death penalty is unconstitutional as it removes judicial sentencing discretion', 'Prisons must release all convicts after 5 years', 'Plea bargaining is illegal'], answer: 'The mandatory death penalty is unconstitutional as it removes judicial sentencing discretion', explanation: 'The Supreme Court struck down the mandatory death sentence, restoring judicial discretion for mitigating circumstances.' }],
        flashcards: [{ front: 'Susan Kigula v AG (2009)', back: 'Struck down mandatory death penalty as unconstitutional and held death row delay > 3 years violates Article 24.' }]
      }
    ]
  },
  {
    id: 'course_oil_gas',
    code: 'LAW 4114',
    title: 'Oil, Gas and Energy Law',
    category: 'Commercial Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 330,
    courseOverview: 'Legal and regulatory regime governing petroleum exploration, development, production, and refining in the Albertine Graben: Production Sharing Agreements (PSAs), National Oil Company (UNOC), Petroleum Authority of Uganda (PAU), National Local Content Act, environmental liabilities in oil extraction, decommissioning funds, and pipeline transboundary treaties (EACOP).',
    coreStatutes: ['Petroleum (Exploration, Development and Production) Act, 2013 (Act No. 3 of 2013)', 'Petroleum (Refining, Conversion, Transmission and Midstream Storage) Act 2013', 'Public Finance Management Act 2015 (Petroleum Fund)'],
    coreCases: ['Heritage Oil and Gas Ltd v Uganda Revenue Authority [2011] TAT 1 / High Court (2015)', 'Tullow Uganda Operations Pty v URA (2014)'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Upstream/midstream legal regimes, Production Sharing Agreements (PSAs), oil taxation, and environmental petroleum regulation.',
    modules: [
      {
        id: 'mod_oil_1',
        title: 'State Ownership of Petroleum Resources & Production Sharing Agreements (PSAs)',
        overview: 'Article 244 Constitution, Section 4 Petroleum Act 2013, and the contractual architecture of PSAs.',
        notes: `Article 244(1) of the 1995 Constitution vests the entire property in, and the control of, all minerals and petroleum in, on, or under any land or waters in Uganda in the Government on behalf of the people. Under the Petroleum (Exploration, Development and Production) Act 2013, petroleum activities are licensed through PSAs, where the international oil company bears exploration risk and shares "Profit Oil" with the Government after cost recovery ("Cost Oil"). In Heritage Oil v URA (2011), the court affirmed that assignment of petroleum exploration rights generates taxable capital gains in Uganda.`,
        definitions: [
          { term: 'Cost Oil', definition: 'The portion of produced petroleum that the oil company is entitled to take to recover its allowable exploration and development expenditures.' },
          { term: 'Profit Oil', definition: 'The remaining petroleum after deduction of Cost Oil and royalties, shared between the Government and the oil contractor according to the PSA formula.' }
        ],
        keyCases: ['Heritage Oil and Gas Ltd v Uganda Revenue Authority (2011) TAT', 'Tullow Uganda v URA (2014)'],
        keyStatutes: ['Constitution Article 244', 'Petroleum (EDP) Act 2013 (Act No. 3 of 2013)', 'Income Tax Act (Part IXA - Petroleum Taxation)'],
        readingList: ['E. Smith, International Petroleum Transactions', 'Z. Gao, International Petroleum Contracts'],
        practiceQuestion: 'Explain the institutional separation of powers between the Ministry, Petroleum Authority of Uganda (PAU), and UNOC under the Petroleum Act 2013.',
        modelAnswer: 'The Ministry is responsible for policy and licensing; the PAU is the independent regulator monitoring compliance and cost verification; UNOC is the commercial arm handling the State’s participating commercial equity interests.',
        shortAnswerQuestions: ['What is the legal difference between Cost Oil and Profit Oil?'],
        essayQuestions: ['Analyze how the 1995 Constitution and the Public Finance Management Act 2015 manage petroleum revenues to prevent the "resource curse" in Uganda.'],
        mcqs: [{ question: 'Under Article 244 of the 1995 Constitution of Uganda, in whom is ownership of all petroleum resources vested?', options: ['District Land Boards', 'The President personally', 'The Government on behalf of the people of Uganda', 'The registered landowner'], answer: 'The Government on behalf of the people of Uganda', explanation: 'Article 244(1) vests all minerals and petroleum in the Government on behalf of the people.' }],
        flashcards: [{ front: 'Article 244 Constitution', back: 'Vests ownership and control of all petroleum and minerals in the Government on behalf of the Republic.' }]
      }
    ]
  },
  {
    id: 'course_gender_law',
    code: 'LAW 4115',
    title: 'Gender, Law and Society',
    category: 'Public Law',
    level: 'Year 4 LLB',
    modulesCount: 5,
    enrolledStudentsCount: 305,
    courseOverview: 'Critical legal theory, feminist jurisprudence, constitutional guarantees of gender equality under Article 33, statutory protection against domestic violence under Domestic Violence Act 2010, prohibition of female genital mutilation under Prohibition of FGM Act 2010, property rights of spouses upon dissolution, and inheritance discrimination under Succession Act reforms.',
    coreStatutes: ['Domestic Violence Act, 2010 (Act No. 3 of 2010)', 'Prohibition of Female Genital Mutilation Act 2010', 'Succession (Amendment) Act 2022', '1995 Constitution (Articles 31, 32, 33)'],
    coreCases: ['Uganda Association of Women Lawyers (FIDA) & 5 Ors v AG (Divorce Grounds) [2004] UGCC 1', 'Mifumi (U) Ltd & Anor v AG (Bride Price) [2015] UGSC 13', 'Law & Advocacy for Women in Uganda v AG [2007] UGCC 1'],
    sourceMetadata: createVerifiedSource('MOJCA', 'Ugandan University LLB Curriculum Standards', 'Academic Curriculum', '2024/2025'),
    description: 'Constitutional equality, legal reform against gender-based violence, reproductive rights, and jurisprudence on customary cultural practices.',
    modules: [
      {
        id: 'mod_gender_1',
        title: 'Constitutional Gender Equality & Striking Down Discriminatory Customary Laws',
        overview: 'Articles 31, 32, 33 of the 1995 Constitution and landmark Constitutional Court & Supreme Court rulings on bride price and adultery laws.',
        notes: `Article 33 of the 1995 Constitution guarantees women full and equal dignity of the person with men, affirmative action, and prohibits laws, cultures, customs, or traditions which undermine women’s welfare or status. In Mifumi (U) Ltd & Anor v Attorney General (2015), the Supreme Court held that the customary practice of demanding refund of bride price upon dissolution of marriage is unconstitutional for treating women as chattels. In FIDA Uganda v AG (2004), the Constitutional Court struck down discriminatory divorce provisions under the Divorce Act Cap 249.`,
        definitions: [
          { term: 'Affirmative Action', definition: 'Constitutional measures under Article 32 designed to redress historical social, economic, or educational imbalances.' },
          { term: 'Feminist Jurisprudence', definition: 'A philosophy of law that examines the relationship between gender, power, and legal doctrine to eliminate subordination.' }
        ],
        keyCases: ['Mifumi (U) Ltd & Anor v Attorney General (2015) UGSC 13', 'FIDA Uganda & 5 Ors v Attorney General (2004) UGCC 1', 'Law & Advocacy for Women in Uganda v AG (2007) UGCC 1'],
        keyStatutes: ['1995 Constitution (Articles 21, 31, 32, 33)', 'Domestic Violence Act 2010', 'Succession (Amendment) Act 2022'],
        readingList: ['S. Tamale, When Hens Begin to Crow: Gender and Parliamentary Politics in Uganda', 'C. MacKinnon, Feminism Unmodified'],
        practiceQuestion: 'What was the Supreme Court’s ratio decidendi in Mifumi v Attorney General (2015) regarding refund of bride price?',
        modelAnswer: 'The Supreme Court ruled that demanding refund of bride price upon marriage breakdown is unconstitutional under Articles 31 and 33 because it reduces women to commodities and violates their right to freely exit an intolerable union.',
        shortAnswerQuestions: ['State the constitutional test under Article 33(6) regarding customary practices.'],
        essayQuestions: ['Critically evaluate the impact of the Succession (Amendment) Act 2022 on eliminating gender discrimination in the distribution of intestate estates in Uganda.'],
        mcqs: [{ question: 'In Mifumi v Attorney General (2015), which customary practice was declared unconstitutional by the Supreme Court?', options: ['Paying bride price at marriage', 'Demanding refund of bride price upon divorce', 'Church weddings', 'Naming children after fathers'], answer: 'Demanding refund of bride price upon divorce', explanation: 'The Supreme Court declared the mandatory refund of bride price unconstitutional for violating women dignity.' }],
        flashcards: [{ front: 'Article 33(6) Constitution', back: 'Laws, cultures, customs or traditions which are against the dignity, welfare or interest of women or which undermine their status, are prohibited.' }]
      }
    ]
  }
];

