import { RedVolumeEntry } from '../types';

export const redVolumesList: RedVolumeEntry[] = [
  // RED VOLUME 1: CIVIL PROCEDURE & REMEDIES
  {
    id: 'red_vol1_01',
    volumeNumber: 1,
    volumeTitle: 'Red Volume 1: Civil Procedure, High Court Rules & Remedies',
    partTitle: 'Part I: Pleadings, Cause of Action & Plaints',
    title: 'Order 6 & 7: Framing Pleadings and Plaint Requirements',
    statutoryRef: 'Civil Procedure Rules (S.I. 71-1) Orders 6, 7 & Civil Procedure Act Cap 71',
    summary: 'Comprehensive procedural compendium for drafting civil plaints in the High Court of Uganda. Outlines essential averments, disclosure of cause of action under Order 7 Rule 11, verification requirements, and filing deadlines.',
    fullText: `1. ESSENTIAL INGREDIENTS OF A CAUSE OF ACTION:
Under Order 7 Rule 11 of the Civil Procedure Rules (S.I. 71-1) and the landmark Supreme Court decision in Auto Garage v Motokov (No. 3) [1971] EA 514, every plaint must clearly establish three essential ingredients:
(a) That the plaintiff enjoyed a recognized legal right;
(b) That the defendant violated or infringed that legal right;
(c) That the defendant's wrongful act or omission resulted in recoverable loss or damage to the plaintiff.

2. PLEADING FACTS, NOT LAW OR EVIDENCE:
Order 6 Rule 1 provides that every pleading shall contain only a statement in concise form of the material facts on which the party relying on them depends for their claim or defence, but not the evidence by which they are to be proved.

3. SPECIAL DAMAGES MUST BE SPECIFICALLY PLEADED AND STRICTLY PROVED:
As held in Uganda Telecom Ltd v Telecom Productions Ltd (2008) UGSC 6, claims for special damages must be specifically itemized in the plaint with exact figures and receipt dates, and must be strictly proved at trial with documentary evidence.

4. REJECTION OF PLAINT UNDER ORDER 7 RULE 11:
A plaint shall be rejected where:
(a) It does not disclose a cause of action;
(b) The relief claimed is undervalued and the plaintiff fails to correct the valuation;
(c) The suit appears from the statement in the plaint to be barred by any law (e.g. Limitation Act Cap 80).`,
    keyRulesOrForms: [
      'Order 6 Rule 1: Pleading material facts only',
      'Order 7 Rule 1: Particulars to be contained in Plaint',
      'Order 7 Rule 11: Mandatory rejection of plaint for no cause of action',
      'High Court Form No. 1: General Form of Plaint'
    ],
    practiceDirections: [
      'Practice Direction No. 1 of 2013 on Electronic Case Management (ECCMIS)',
      'Circular on Mandatory Witness Statements in Civil Trials (2019)'
    ],
    relatedCases: [
      'Auto Garage & Ors v Motokov (No. 3) [1971] EA 514',
      'Uganda Telecom Ltd v Telecom Productions Ltd [2008] UGSC 6',
      'Kasirye Byaruhanga & Co Advocates v UDB [2007] UGSC 2'
    ],
    subject: 'Civil Procedure & Pleadings'
  },
  {
    id: 'red_vol1_02',
    volumeNumber: 1,
    volumeTitle: 'Red Volume 1: Civil Procedure, High Court Rules & Remedies',
    partTitle: 'Part II: Summary Procedure & Liquidated Demands',
    title: 'Order 36: Summary Procedure on Specially Endorsed Plaints',
    statutoryRef: 'Civil Procedure Rules (S.I. 71-1) Order 36',
    summary: 'Procedural guide for recovering liquidated commercial debts and promissory notes in High Court Commercial Division without full trial, unless defendant secures leave to appear and defend.',
    fullText: `1. APPLICATION AND SCOPE OF ORDER 36:
Order 36 applies to suits where the plaintiff seeks to recover a debt or liquidated demand in money payable by the defendant, with or without interest, arising upon a contract express or implied, bond, bill of exchange, promissory note, or cheque.

2. SERVICE OF SPECIALLY ENDORSED SUMMONS:
The plaintiff files a specially endorsed plaint with an affidavit verifying the debt. The summons served on the defendant warns that unless an application for leave to appear and defend is filed within ten (10) days of service, the plaintiff is entitled to immediate summary judgment.

3. TEST FOR GRANTING LEAVE TO DEFEND:
Under Order 36 Rule 4, the defendant must file an affidavit disclosing a bona fide, triable issue or a plausible defence on the merits. As held in Maluku Interglobal Trade v Bank of Uganda [1985] HCB 65, leave to defend will be granted if the defendant demonstrates any bona fide triable issue of law or fact.

4. CONDITIONAL VS UNCONDITIONAL LEAVE:
Where the defence appears shadowy or doubtful, the High Court may grant leave subject to conditions, such as depositing the disputed sum or providing bank security.`,
    keyRulesOrForms: [
      'Order 36 Rule 1: Specially endorsed plaint scope',
      'Order 36 Rule 3: Application for leave to appear and defend (10-day rule)',
      'Order 36 Rule 6: Summary judgment in default of leave'
    ],
    practiceDirections: [
      'Commercial Court Practice Direction on Expedited Summary Trials',
      'Judicature (Mediation) Rules 2013 S.I. 55 of 2013'
    ],
    relatedCases: [
      'Maluku Interglobal Trade v Bank of Uganda [1985] HCB 65',
      'Uganda Commercial Bank v Mukoome Agencies [1982] HCB 22'
    ],
    subject: 'Commercial Debt Recovery'
  },
  {
    id: 'red_vol1_03',
    volumeNumber: 1,
    volumeTitle: 'Red Volume 1: Civil Procedure, High Court Rules & Remedies',
    partTitle: 'Part III: Interlocutory Injunctions & Status Quo',
    title: 'Order 39: Injunctions, Interlocutory Orders & Preservation of Property',
    statutoryRef: 'Civil Procedure Rules (S.I. 71-1) Order 39 & Judicature Act Cap 13 S.33',
    summary: 'Detailed statutory standards and case principles for obtaining temporary restraining orders and preservation of disputed assets pending trial in Ugandan courts.',
    fullText: `1. JURISDICTION UNDER ORDER 39:
The High Court has equitable and statutory jurisdiction under Section 33 of the Judicature Act and Order 39 Rule 1 CPR to grant temporary injunctions where property in dispute is in danger of being wasted, damaged, alienated, or wrongfully sold in execution.

2. THE THREE GIELLA V CASSMAN BROWN CONDITIONS:
To succeed in an application for a temporary injunction, the applicant must establish three cumulative tests settled in Giella v Cassman Brown & Co Ltd [1973] EA 358:
First: The applicant must demonstrate a prima facie case with a probability of success (not that success is guaranteed, but a serious triable issue exists).
Second: The applicant must show that they will suffer irreparable injury that cannot be adequately compensated in monetary damages.
Third: If the court is in doubt on the first two, the application is decided on the balance of convenience (which party would suffer greater hardship).

3. UNDERTAKING AS TO DAMAGES:
An applicant granted an interlocutory injunction is normally required to give an undertaking to pay any damages the respondent may suffer if the injunction turns out to have been wrongly granted.`,
    keyRulesOrForms: [
      'Order 39 Rule 1: Cases in which temporary injunction may be granted',
      'Order 39 Rule 2: Injunction to restrain repetition of breach',
      'Order 39 Rule 4: Discharge, variation, or setting aside of injunction'
    ],
    practiceDirections: [
      'Practice Direction on Urgent Vacation Applications for Injunctions'
    ],
    relatedCases: [
      'Giella v Cassman Brown & Co Ltd [1973] EA 358',
      'Kiyimba Kaggwa v Haji Abdu Nasser Katende [1985] HCB 43',
      'Kasirye Byaruhanga & Co Advocates v UDB (2007) UGSC 2'
    ],
    subject: 'Equitable Remedies & Injunctions'
  },

  // RED VOLUME 2: CRIMINAL PROCEDURE & EVIDENCE
  {
    id: 'red_vol2_01',
    volumeNumber: 2,
    volumeTitle: 'Red Volume 2: Criminal Procedure, Evidence & Directives',
    partTitle: 'Part I: Charge Sheets, Indictments & Committal Proceedings',
    title: 'Trial on Indictments Act (TIA) & Magistrates Courts Act: Drafting Charges',
    statutoryRef: 'Trial on Indictments Act Cap 23 & Magistrates Courts Act Cap 16 S.85-88',
    summary: 'Procedural rules and judicial guidelines on drafting criminal charge sheets, particulars of offence, joinder of counts, joinder of offenders, and committal of capital cases to the High Court.',
    fullText: `1. STATUTORY REQUIREMENTS OF A VALID CHARGE / INDICTMENT:
Under Section 85 of the Magistrates Courts Act Cap 16 and Section 22 of the Trial on Indictments Act Cap 23, every count in a charge sheet or indictment must contain:
(a) Statement of the Offence: Describing the offence briefly and citing the specific statutory section and Act (e.g. Murder contrary to Sections 188 & 189 of the Penal Code Act Cap 120);
(b) Particulars of the Offence: Giving reasonable information as to the time, date, place, victim, and specific wrongful acts alleged against the accused person.

2. RULE AGAINST DUPLICITY:
A single count must not charge more than one separate offence. Charging distinct offences in one count is duplicitous and violates Article 28(3)(b) (right to be informed promptly of the exact nature of the charge).

3. COMMITTAL PROCEDURE UNDER SECTION 168 MCA:
Where an accused is charged with an offence triable only by the High Court (such as murder, aggravated robbery, treason, or aggravated defilement), the magistrate only reads the charge (no plea taken) and remands the accused until the DPP completes the summary of case (indictment), whereupon the magistrate formally commits the accused to the High Court for trial.`,
    keyRulesOrForms: [
      'MCA Cap 16 Section 85: General rules as to description of offences',
      'TIA Cap 23 Section 22: Form of indictments',
      'MCA Cap 16 Section 168: Committal of accused to High Court'
    ],
    practiceDirections: [
      'Judicature (Plea Bargaining) Rules 2019 S.I. 102 of 2019',
      'DPP Guidelines on the Exercise of Prosecutorial Discretion'
    ],
    relatedCases: [
      'Uganda v Thomas Kwoyelo [2018] UGICD 1',
      'Cherere s/o Gukula v R [1955] 22 EACA 478',
      'Uganda v Kyamanywa [1972] EA 22'
    ],
    subject: 'Criminal Pleadings & Committal'
  },
  {
    id: 'red_vol2_02',
    volumeNumber: 2,
    volumeTitle: 'Red Volume 2: Criminal Procedure, Evidence & Directives',
    partTitle: 'Part II: Constitutional Bail & Police Bond',
    title: 'Article 23(6) Bail Applications & Judicature Practice Directives',
    statutoryRef: '1995 Constitution Art 23(6), TIA Cap 23 S.14, MCA Cap 16 S.75',
    summary: 'Constitutional standards, statutory criteria, and High Court practice guidelines for bail applications, bail pending trial, bail pending appeal, and mandatory statutory release periods.',
    fullText: `1. CONSTITUTIONAL RIGHT TO APPLY FOR BAIL:
Under Article 23(6)(a) of the 1995 Constitution of Uganda, every person arrested in respect of a criminal offence has the fundamental right to apply to court for release on bail. The court has discretion to grant bail on reasonable conditions.

2. STATUTORY FACTORS CONSIDERED BY COURTS:
Under Section 14 of the Trial on Indictments Act and Section 75 of the Magistrates Courts Act, the court considers:
(a) The nature and gravity of the offence charged;
(b) The likelihood of the accused absconding from jurisdiction (flight risk);
(c) The character, antecedents, associations, and community ties of the accused;
(d) Whether the accused has fixed place of abode within the court's jurisdiction;
(e) The availability of substantial sureties capable of compelling attendance;
(f) Likelihood of interfering with state witnesses or evidence;
(g) Medical condition of the accused (supported by a certificate from a government medical officer showing exceptional grave illness not treatable in prison).

3. MANDATORY STATUTORY BAIL PERIODS UNDER ARTICLE 23(6)(b) & (c):
(a) For offences triable by subordinate courts: Mandatory release on bail after 60 days on remand before trial;
(b) For offences triable only by the High Court: Mandatory release on bail after 180 days on remand before committal.`,
    keyRulesOrForms: [
      '1995 Constitution Article 23(6): Constitutional right to apply for bail',
      'TIA Cap 23 Section 14: Release on bail in High Court trials',
      'MCA Cap 16 Section 75: High Court and Magistrate bail powers'
    ],
    practiceDirections: [
      'Judiciary Bail Guidelines for Courts of Judicature (Practice Direction 2022)',
      'Standard Bail Bond and Recognizance Form'
    ],
    relatedCases: [
      'Foundation for Human Rights Initiative v Attorney General [2008] UGCC 1',
      'Dr. Kizza Besigye v Uganda [2002] UGHC 1',
      'Uganda v John Tumukunde [2005] UGCC 4'
    ],
    subject: 'Criminal Procedure & Human Rights'
  },
  {
    id: 'red_vol2_03',
    volumeNumber: 2,
    volumeTitle: 'Red Volume 2: Criminal Procedure, Evidence & Directives',
    partTitle: 'Part III: Sentencing Guidelines & Capital Punishment',
    title: 'Sentencing Principles, Mitigation & Kigula Rule',
    statutoryRef: 'Constitution of Uganda 1995 Art 22, 28, 44 & Sentencing Guidelines Regulations',
    summary: 'The legal framework for criminal sentencing in Uganda, abolition of mandatory death penalty under the Susan Kigula precedent, sentencing objectives, aggravating and mitigating factors, and victim impact assessments.',
    fullText: `1. THE LANDMARK SUSAN KIGULA DOCTRINE:
In Susan Kigula & 416 Ors v Attorney General (Constitutional Appeal No. 03 of 2006) [2009] UGSC 6, the Supreme Court of Uganda ruled that:
(a) Any statutory provision imposing a MANDATORY death penalty violates Article 21, 22(1), 28, and 44(a) of the Constitution because it strips the court of its judicial discretion to hear mitigating circumstances before passing sentence;
(b) The death penalty remains a discretionary maximum sentence for capital offences;
(c) Where a death row inmate has been condemned for three (3) years without execution by the state, the sentence is automatically commuted to life imprisonment without further order.

2. STATUTORY SENTENCING OBJECTIVES IN UGANDA:
Under the Constitution (Sentencing Guidelines) Regulations:
(a) Retribution (Just deserts for harm caused);
(b) Deterrence (General and specific prevention);
(c) Rehabilitation and Reformation of the offender;
(d) Incapacitation / Protection of society;
(e) Restitution, reconciliation, and victim compensation.

3. MANDATORY DEDUCTION OF PRE-TRIAL REMAND PERIOD:
Under Article 23(8) of the Constitution, the trial court MUST deduct any period the convict spent on remand awaiting trial from the final term of imprisonment. Failure to expressly record and compute remand deduction renders the sentence illegal on appeal (as affirmed in Bukenya v Uganda [2017] UGSC 12).`,
    keyRulesOrForms: [
      'Constitution (Sentencing Guidelines for Courts of Judicature) Regulations',
      '1995 Constitution Article 22(1) & 23(8): Remand deduction',
      'Standard Victim Impact Statement Form'
    ],
    practiceDirections: [
      'Chief Justice Practice Direction on Sentencing & Remand Deduction (2018)'
    ],
    relatedCases: [
      'Susan Kigula & 416 Ors v Attorney General [2009] UGSC 6',
      'Bukenya v Uganda [2017] UGSC 12',
      'Livingstone Kakooza v Uganda [1993] UGSC 8'
    ],
    subject: 'Criminal Sentencing & Human Rights'
  }
];
