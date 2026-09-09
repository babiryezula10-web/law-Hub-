import { LegalCase } from '../types';
import { createVerifiedSource } from './verifiedSources';

export const caseLawDatabase: LegalCase[] = [
  {
    id: 'case_grace_ibingira',
    caseName: 'Grace Stuart Ibingira & Others v Uganda',
    citation: '[1966] EA 306',
    court: 'Court of Appeal for Eastern Africa',
    judges: ['Sir Charles Newbold P', 'Crabbe JA', 'Law JA'],
    year: 1966,
    dateDecided: '1966',
    parties: {
      appellantOrPlaintiff: 'Grace Stuart Ibingira, Mathias Ngobi, Balaki Kirya, George Magezi, Emmanuel Lumu',
      respondentOrDefendant: 'Uganda'
    },
    facts: 'The appellants, who were senior Cabinet Ministers in the Uganda Government, were arrested in February 1966 during a Cabinet meeting following allegations of political conspiracy. They were initially detained under the Deportation Ordinance. They filed a writ of habeas corpus challenging their detention on grounds that the Deportation Ordinance was inconsistent with the 1962 Constitution and void. The Court of Appeal declared the Deportation Ordinance unconstitutional and ordered their release. However, as they stepped out of prison, they were immediately re-arrested at the prison gates under newly promulgated emergency powers regulations.',
    issues: [
      'Whether the Deportation Ordinance was inconsistent with the constitutional protection of personal liberty and freedom of movement.',
      'Whether the executive could re-arrest individuals immediately upon court-ordered release using emergency regulations.'
    ],
    decision: 'The Court of Appeal held that the Deportation Ordinance was discriminatory and inconsistent with the 1962 Constitution, ordering the appellants release. On their subsequent re-arrest under emergency regulations, the court examined the validity of emergency executive powers.',
    ratioDecidendi: 'Statutory provisions that permit arbitrary executive detention and deportation within the country without trial violate fundamental constitutional guarantees of liberty and freedom of movement, and are void to the extent of such inconsistency.',
    obiterDicta: 'The executive is strictly bound to obey court orders of habeas corpus; circumvention of judicial release by immediate bad-faith re-arrest undermines the rule of law.',
    legalPrinciples: [
      'Constitutional Supremacy over Pre-existing Colonial Enactments',
      'Habeas Corpus Inviolability',
      'Protection from Arbitrary Detention without Trial'
    ],
    statutesConsidered: ['Deportation Ordinance (Cap 46)', '1962 Constitution of Uganda'],
    constitutionalArticlesConsidered: ['Article 23 (Personal Liberty analogue)', 'Article 29 (Freedom of Movement)'],
    topic: 'Constitutional & Administrative Law',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1966] EA 306 / ULII Precedent', 'Judicial Precedent', '1966', 'Historical Landmark')
  },
  {
    id: 'case_tinyefuza_1997',
    caseName: 'Major General David Tinyefuza v Attorney General',
    citation: 'Constitutional Petition No. 1 of 1997 [1997] UGCC 3 / (1997) UGSC 2',
    court: 'Supreme Court / Constitutional Court of Uganda',
    judges: ['Manyindo DCJ', 'Bageine JA', 'Mpagi-Bahigeine JA', 'Tabaro J', 'Egonda-Ntende J'],
    year: 1997,
    dateDecided: '25th April 1997 (CC) / 29th January 1998 (SC)',
    parties: {
      appellantOrPlaintiff: 'Major General David Tinyefuza',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'Major General David Tinyefuza, a senior military officer in the UPDF and presidential advisor, testified before a Parliamentary Sessional Committee on Defence regarding the insurgency in Northern Uganda. Following public criticism from the military leadership, he tendered his resignation from the Army and the High Command. The Minister of State for Defence refused to accept his resignation, insisting he remained subject to military law and would be court-martialed if he abandoned duty. Tinyefuza petitioned the Constitutional Court under Article 137, contending that compelling him to remain in military service amounted to forced labour (Article 25) and violated his fundamental rights.',
    issues: [
      'Whether the Constitutional Court had jurisdiction under Article 137 to hear the petition.',
      'Whether forcing a military officer to remain in service constitutes forced labour under Article 25.',
      'Whether the petitioner had locus standi to petition the Constitutional Court without exhausting military administrative remedies.'
    ],
    decision: 'The Constitutional Court initially ruled in favour of Tinyefuza, holding that locus standi under Article 137 was broad and that military officers enjoy constitutional human rights. On appeal, the Supreme Court partially varied the decision, holding that voluntary military enlistment implies acceptance of military statutory resignation procedures under the UPDF Act, but reaffirmed the broad constitutional interpretation mandate.',
    ratioDecidendi: 'Article 137 of the 1995 Constitution confers broad, unfettered jurisdiction on the Constitutional Court to interpret the Constitution. Locus standi under Article 137 is accessible to any person who alleges a constitutional violation without the restrictive locus burdens of classical common law.',
    obiterDicta: 'Military discipline and command structures must coexist with constitutional supremacy, but military personnel do not shed all constitutional protections upon donning uniform.',
    legalPrinciples: [
      'Broad Access and Locus Standi under Article 137',
      'Constitutional Review of Military Administrative Decisions',
      'Purposive Approach to Constitutional Interpretation'
    ],
    statutesConsidered: ['UPDF Act (National Resistance Army Statute 1992)', 'Judicature Act Cap 13'],
    constitutionalArticlesConsidered: ['Article 25 (Forced Labour)', 'Article 28 (Fair Hearing)', 'Article 137 (Constitutional Interpretation)'],
    topic: 'Constitutional Law & Military Jurisprudence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1997] UGCC 3 / (1997) UGSC 2 / ULII', 'Judicial Precedent', '1997', 'Landmark Authority')
  },
  {
    id: 'case_obbo_mwenda_2004',
    caseName: 'Charles Onyango Obbo & Andrew Mujuni Mwenda v Attorney General',
    citation: 'Constitutional Appeal No. 2 of 2002 [2004] UGSC 1',
    court: 'Supreme Court of Uganda',
    judges: ['Oder JSC', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC'],
    year: 2004,
    dateDecided: '11th February 2004',
    parties: {
      appellantOrPlaintiff: 'Charles Onyango Obbo and Andrew Mujuni Mwenda (Journalists)',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'The appellants were senior editors and journalists of The Monitor newspaper. They were criminally charged under Section 50 of the Penal Code Act with the offense of "publication of false news likely to cause public fear and alarm" after publishing an article alleging that the Government of the Democratic Republic of Congo had paid Uganda in gold for military assistance. The appellants petitioned the Constitutional Court challenging Section 50 as unconstitutional for infringing freedom of expression under Article 29(1)(a). The Constitutional Court dismissed the petition. They appealed to the Supreme Court.',
    issues: [
      'Whether Section 50 of the Penal Code Act (publication of false news) unconstitutionally restricted freedom of speech and the press under Article 29(1)(a).',
      'Whether the statutory limitation was justifiable in a free and democratic society under Article 43 of the Constitution.'
    ],
    decision: 'The Supreme Court unanimously allowed the appeal, declared Section 50 of the Penal Code Act null and void, and struck it down from the laws of Uganda.',
    ratioDecidendi: 'Freedom of expression is not confined to thoughts or information that are universally accepted or true; it extends to controversial, erroneous, or unpopular statements. A statutory limitation on fundamental rights is only valid if the State proves that it is demonstrably justifiable in a free and democratic society under Article 43. Section 50 failed the proportionality test because chilling public debate through criminal sanctions for false news is disproportionate and unacceptable in a democracy.',
    obiterDicta: 'Per Mulenga JSC: "The protection of freedom of expression is not confined to the right to tell the truth. Democratic societies tolerate and protect speech that may offend, shock or disturb the State or any section of the population."',
    legalPrinciples: [
      'The Proportionality and Democratic Justification Test under Article 43',
      'Protection of Free Speech and Investigative Journalism',
      'Striking Down Chilling Criminal Speech Enactments'
    ],
    statutesConsidered: ['Penal Code Act Cap 120 (Section 50)'],
    constitutionalArticlesConsidered: ['Article 29(1)(a) (Freedom of Expression)', 'Article 43 (Limitation Clause)'],
    topic: 'Constitutional Law & Press Freedom',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2004] UGSC 1 / ULII', 'Judicial Precedent', '11th February 2004', 'Supreme Court Landmark')
  },
  {
    id: 'case_ssemogerere_olum_2000',
    caseName: 'Paul K. Ssemogerere & Zachary Olum v Attorney General',
    citation: 'Constitutional Appeal No. 1 of 2000 [2000] UGSC 1',
    court: 'Supreme Court of Uganda',
    judges: ['Wambuzi CJ', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC'],
    year: 2000,
    dateDecided: '31st May 2000',
    parties: {
      appellantOrPlaintiff: 'Paul Kawanga Ssemogerere and Zachary Olum (Members of Parliament)',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'The appellants, Members of Parliament representing the Democratic Party, challenged the constitutional validity of the Referendum (Political Systems) Act, 1999 (Act No. 9 of 1999). They contended that Parliament enacted the statute without the requisite quorum prescribed under Article 88 and the Rules of Procedure of Parliament, and that voice voting instead of division voting violated constitutional norms. The Constitutional Court dismissed the petition on preliminary objections regarding parliamentary privilege. The appellants appealed to the Supreme Court.',
    issues: [
      'Whether the courts have jurisdiction to review internal legislative proceedings of Parliament for compliance with constitutional procedures.',
      'Whether an Act of Parliament passed without constitutional quorum is null and void under Article 2.',
      'Whether the Hansard is admissible in court to prove lack of quorum without leave of Parliament.'
    ],
    decision: 'The Supreme Court unanimously allowed the appeal, declared the Referendum (Political Systems) Act, 1999 null and void, and remitted the matter for assessment.',
    ratioDecidendi: 'Parliament is subject to the Constitution. The doctrine of parliamentary privilege cannot shield internal legislative proceedings from constitutional judicial review where Parliament is alleged to have violated mandatory constitutional procedural requirements such as quorum. Any Act passed in breach of constitutional procedure is void ab initio.',
    obiterDicta: 'The supremacy of the Constitution under Article 2 binds all three arms of government; Parliament is not a sovereign legislature above constitutional constraints.',
    legalPrinciples: [
      'Judicial Review of Parliamentary Procedure',
      'Constitutional Quorum as a Mandatory Condition Precedent to Valid Legislation',
      'Supremacy of the Constitution over Legislative Sovereignty'
    ],
    statutesConsidered: ['Referendum (Political Systems) Act 1999', 'Parliament (Powers and Privileges) Act Cap 258'],
    constitutionalArticlesConsidered: ['Article 2 (Supremacy)', 'Article 79 (Functions of Parliament)', 'Article 88 (Quorum)', 'Article 137'],
    topic: 'Constitutional Law & Parliamentary Procedure',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2000] UGSC 1 / ULII', 'Judicial Precedent', '31st May 2000', 'Supreme Court Landmark')
  },
  {
    id: 'case_crane_bank_bou_2022',
    caseName: 'Bank of Uganda v Crane Bank Limited (In Receivership) & Sudhir Ruparelia',
    citation: 'Supreme Court Civil Appeal No. 7 of 2020 [2022] UGSC 1',
    court: 'Supreme Court of Uganda',
    judges: ['Ruby Aweri Opio JSC', 'Faith Mwondha JSC', 'Lillian Tibatemwa-Ekirikubinza JSC', 'Percy Tuhaise JSC', 'Mike Chibita JSC'],
    year: 2022,
    dateDecided: '11th February 2022',
    parties: {
      appellantOrPlaintiff: 'Bank of Uganda (Central Bank)',
      respondentOrDefendant: 'Crane Bank Limited (In Receivership) and Sudhir Ruparelia'
    },
    facts: 'In October 2016, the Bank of Uganda (BOU) took over management of Crane Bank Ltd under statutory management pursuant to the Financial Institutions Act (FIA) 2004, and later placed it under receivership. BOU, in the name of Crane Bank in Receivership, sued its majority shareholder Sudhir Ruparelia for allegedly siphoning UGX 397 Billion. The respondents raised preliminary objections that a company in receivership cannot sue under Section 99(1) and (2) of the FIA, and that statutory receivership had terminated after 12 months, reverting the company to its shareholders.',
    issues: [
      'Whether a financial institution in receivership under the Financial Institutions Act has legal capacity to institute legal proceedings in its own name against former directors.',
      'What is the legal effect of the expiration of the statutory receivership period under the Financial Institutions Act.',
      'Whether costs should be borne personally by the Central Bank or out of receivership assets.'
    ],
    decision: 'The Supreme Court unanimously dismissed the Bank of Uganda’s appeal, ruling that statutory receivership under the FIA is time-bound (12 months maximum), after which receivership terminates. Once receivership ends, the Central Bank cannot sue in the name of the bank, and closed banks cannot remain in indefinite statutory limbo. Costs were awarded against BOU.',
    ratioDecidendi: 'Under the Financial Institutions Act, 2004, statutory receivership by the Central Bank is strictly time-limited. A financial institution in receivership lacks locus standi to institute court proceedings to recover assets once the statutory receivership duration has elapsed without liquidation or sale.',
    obiterDicta: 'Central banks exercising regulatory and oversight authority must strictly operate within the four corners of enabling statutes; administrative overreach in financial insolvency undermines investor confidence.',
    legalPrinciples: [
      'Strict Statutory Limits on Central Bank Receivership Powers',
      'Locus Standi of Insolvent Financial Entities',
      'Corporate Legal Capacity under the Financial Institutions Act'
    ],
    statutesConsidered: ['Financial Institutions Act 2004 (Sections 87, 88, 89, 94, 99)', 'Companies Act 2012'],
    constitutionalArticlesConsidered: ['Article 26 (Property Rights)', 'Article 161 (Bank of Uganda Mandate)'],
    topic: 'Banking, Insolvency & Commercial Law',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2022] UGSC 1 / ULII Commercial Series', 'Judicial Precedent', '11th February 2022', 'Supreme Court Landmark')
  },
  {
    id: 'case_susan_kigula_2009',
    caseName: 'Susan Kigula & 416 Others v Attorney General',
    citation: 'Constitutional Appeal No. 3 of 2006 [2009] UGSC 6',
    court: 'Supreme Court of Uganda',
    judges: ['Odoki CJ', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC', 'Katureebe JSC', 'Egonda-Ntende Ag. JSC'],
    year: 2009,
    dateDecided: '21st January 2009',
    parties: {
      appellantOrPlaintiff: 'Susan Kigula and 416 Condemned Inmates on Death Row',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: '417 death row inmates led by Susan Kigula brought a joint constitutional petition challenging the constitutionality of the death penalty in Uganda. They argued that: (1) capital punishment per se violates Article 24 (cruel, inhuman and degrading punishment); (2) the mandatory death penalty prescribed in the Penal Code Act for murder and aggravated robbery violates the right to fair trial and separation of powers; and (3) hanging is an inherently cruel mode of execution, and keeping condemned prisoners on death row for years awaiting execution (the death row phenomenon) constitutes cruel and inhuman treatment.',
    issues: [
      'Whether the death penalty is unconstitutional per se under Article 24 or saved by Article 22(1).',
      'Whether mandatory death sentences violate Article 21 (equality), Article 22 (life), and Article 28 (fair hearing / judicial sentencing discretion).',
      'Whether remaining on death row for over three years constitutes cruel, inhuman and degrading treatment.',
      'Whether execution by hanging is unconstitutional.'
    ],
    decision: 'The Supreme Court held that: (1) The death penalty is not unconstitutional per se because Article 22(1) explicitly permits it under strict judicial conditions; (2) The mandatory death sentence is unconstitutional because it strips the judiciary of discretion to consider mitigating circumstances in sentencing; (3) Keeping a condemned inmate on death row for more than three years without execution constitutes cruel, inhuman, and degrading treatment, entitling the inmate to have the sentence commuted to life imprisonment without remission.',
    ratioDecidendi: 'Mandatory death penalties violate constitutional fair trial rights by depriving courts of the essential judicial function of assessing individual culpability and mitigating factors. Prolonged detention on death row beyond three years constitutes cruel, inhuman, and degrading punishment under Article 24.',
    obiterDicta: 'Judicial discretion in sentencing is an integral component of the non-derogable right to a fair trial guaranteed under Article 28 and Article 44(c).',
    legalPrinciples: [
      'Unconstitutionality of Mandatory Capital Sentencing',
      'The Death Row Phenomenon and Time Limit (3 Years Rule)',
      'Judicial Discretion in Sentencing as an Element of Fair Trial'
    ],
    statutesConsidered: ['Penal Code Act Cap 120 (Sections 189, 286)', 'Trial on Indictments Act Cap 23', 'Prisons Act 2006'],
    constitutionalArticlesConsidered: ['Article 21', 'Article 22(1)', 'Article 24', 'Article 28', 'Article 44(a), (c)'],
    topic: 'Criminal Law & Constitutional Human Rights',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2009] UGSC 6 / ULII', 'Judicial Precedent', '21st January 2009', 'Supreme Court Landmark')
  },
  {
    id: 'case_muwanga_kivumbi_2008',
    caseName: 'Muwanga Kivumbi v Attorney General',
    citation: 'Constitutional Petition No. 9 of 2005 [2008] UGCC 4',
    court: 'Constitutional Court of Uganda',
    judges: ['Mukasa-Kikonyogo DCJ', 'Okello JA', 'Mpagi-Bahigeine JA', 'Engwau JA', 'Kitumba JA'],
    year: 2008,
    dateDecided: '27th May 2008',
    parties: {
      appellantOrPlaintiff: 'Muwanga Kivumbi (Civil Society Activist)',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'The petitioner, a human rights and political activist, challenged Section 32 of the Police Act (Cap. 303), which empowered the Inspector General of Police (IGP) to prohibit the convening of any public assembly or meeting if the IGP had reason to believe the assembly would cause a breach of the peace. Kivumbi argued that this provision effectively gave the police arbitrary prior-censorship and veto power over the constitutional right to assemble peacefully and demonstrate unarmed under Article 29(1)(d).',
    issues: [
      'Whether Section 32 of the Police Act, empowering the Police to prohibit public assemblies, violated Article 29(1)(d) of the Constitution.',
      'Whether the provision was saved by the limitation clause in Article 43.'
    ],
    decision: 'The Constitutional Court unanimously allowed the petition and declared Section 32 of the Police Act null and void.',
    ratioDecidendi: 'The right to assemble and demonstrate peacefully is a cornerstone of democratic governance. Conferring subjective, unchecked discretion upon the police to prohibit assemblies in advance is an impermissible prior restraint that cannot be justified under Article 43. Police powers are limited to regulating traffic and maintaining order, not preventing peaceful gatherings.',
    obiterDicta: 'The police must facilitate, rather than thwart, citizens seeking to exercise their fundamental democratic rights to assemble and express their views.',
    legalPrinciples: [
      'Prohibition of Prior Restraints on Peaceful Assembly',
      'Police Duty is Regulation, Not Prohibition',
      'Strict Application of the Article 43 Limitation Test'
    ],
    statutesConsidered: ['Police Act Cap 303 (Section 32)'],
    constitutionalArticlesConsidered: ['Article 29(1)(d) (Freedom of Assembly)', 'Article 43 (Limitation Clause)'],
    topic: 'Constitutional Law & Human Rights',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2008] UGCC 4 / ULII', 'Judicial Precedent', '27th May 2008', 'Constitutional Landmark')
  },
  {
    id: 'case_okiror_global_capital_2012',
    caseName: 'Alice Okiror & Michael Okiror v Global Capital Save 2004 Ltd & Anor',
    citation: 'High Court Civil Suit No. 0149 of 2010 [2012] UGHC 118',
    court: 'High Court of Uganda (Land Division at Kampala)',
    judges: ['Andrew Bashaija J'],
    year: 2012,
    dateDecided: '19th September 2012',
    parties: {
      appellantOrPlaintiff: 'Alice Okiror and Michael Okiror (Spouse & Son)',
      respondentOrDefendant: 'Global Capital Save 2004 Ltd and Stephen Okiror (Husband / Mortgagor)'
    },
    facts: 'Stephen Okiror, registered proprietor of matrimonial family land at Kyaliwajjala, mortgaged the property to Global Capital Save Ltd to secure a commercial loan without the knowledge or written consent of his lawful wedded wife Alice Okiror. When he defaulted on the loan, the money lender attempted to sell the family home by public auction. Alice Okiror sued, seeking a declaration that the mortgage was null and void ab initio under Section 39 of the Land Act for lack of spousal consent.',
    issues: [
      'Whether the mortgaged suit property constituted "family land" within the meaning of Section 38A of the Land Act.',
      'Whether a mortgage executed on family land without written spousal consent in statutory Form 4 is valid.',
      'What is the legal effect of a financial institution failing to conduct due diligence regarding the marital status of the mortgagor.'
    ],
    decision: 'The High Court held that the land was family land on which the family derived sustenance and resided. The mortgage created without written spousal consent was null and void ab initio. The attempted foreclosure and auction were restrained by permanent injunction.',
    ratioDecidendi: 'Under Section 39(1) of the Land Act (as amended in 2004), written spousal consent is a mandatory statutory condition precedent to the validity of any mortgage, sale, or lease of family land. A mortgage executed without such consent is void, and lending institutions have an affirmative legal duty to investigate marital occupancy before advancing credit.',
    obiterDicta: 'Lenders cannot hide behind Torrens title register certificates to bypass mandatory statutory family protections enacted to prevent spousal displacement and child destitution.',
    legalPrinciples: [
      'Mandatory Requirement of Written Spousal Consent (Form 4)',
      'Nullity of Family Land Transactions Lacking Spousal Consent',
      'Affirmative Due Diligence Burden on Commercial Lenders and Mortgages'
    ],
    statutesConsidered: ['Land Act Cap 227 (Sections 38A, 39)', 'Mortgage Act 2009', 'Land Regulations 2001'],
    constitutionalArticlesConsidered: ['Article 26 (Property)', 'Article 31 (Rights of Family & Marriage)', 'Article 33 (Rights of Women)'],
    topic: 'Land Law & Family Property Rights',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2012] UGHC 118 / ULII Land Series', 'Judicial Precedent', '19th September 2012', 'High Court Precedent')
  },
  {
    id: 'case_unra_irumba_2015',
    caseName: 'Uganda National Roads Authority (UNRA) v Asuman Irumba & Peter Magelah',
    citation: 'Supreme Court Constitutional Appeal No. 2 of 2014 [2015] UGSC 22',
    court: 'Supreme Court of Uganda',
    judges: ['Katureebe CJ', 'Tumwesigye JSC', 'Kisaakye JSC', 'Mwangusya JSC', 'Tibatemwa-Ekirikubinza JSC'],
    year: 2015,
    dateDecided: '29th October 2015',
    parties: {
      appellantOrPlaintiff: 'Uganda National Roads Authority (UNRA)',
      respondentOrDefendant: 'Asuman Irumba and Peter Magelah (Landowners / Public Interest Litigants)'
    },
    facts: 'During the construction of the Hoima-Kaiso-Tonya Road, UNRA took possession of private land before paying full compensation to the landowners, relying on Section 7(1) of the Land Acquisition Act (Cap. 226), which authorized the Government to take possession of compulsory acquired land before compensation was assessed and paid. The respondents petitioned the Constitutional Court, which declared Section 7(1) unconstitutional. UNRA appealed to the Supreme Court, arguing that mandatory prior payment would stall vital public infrastructure development.',
    issues: [
      'Whether Section 7(1) of the Land Acquisition Act, allowing Government to take possession of land before payment of compensation, was inconsistent with Article 26(2) of the Constitution.',
      'Whether the prompt, prior, fair and adequate compensation requirement under Article 26(2)(b)(i) is non-negotiable.'
    ],
    decision: 'The Supreme Court unanimously dismissed UNRA’s appeal and affirmed the nullification of Section 7(1) of the Land Acquisition Act.',
    ratioDecidendi: 'Article 26(2)(b)(i) of the 1995 Constitution explicitly mandates that payment of fair and adequate compensation must be made PRIOR to the taking of possession or acquisition of private property by the State. Any statute or government policy permitting possession prior to full compensation is unconstitutional and void.',
    obiterDicta: 'Public infrastructure projects, however commendable or urgent, must strictly respect constitutionally protected private property rights. The State cannot balance away explicit constitutional guarantees of prior compensation in the name of administrative convenience.',
    legalPrinciples: [
      'The Prior Compensation Doctrine in Compulsory Land Acquisition',
      'Inviolability of Article 26 Property Guarantees Against Pre-Emptive Expropriation',
      'Nullity of Colonial Compulsory Acquisition Enactments Inconsistent with 1995 Constitution'
    ],
    statutesConsidered: ['Land Acquisition Act Cap 226 (Section 7)', 'Land Act Cap 227'],
    constitutionalArticlesConsidered: ['Article 26(2)(b)(i) (Compulsory Acquisition)', 'Article 2 (Supremacy)'],
    topic: 'Land Law & Constitutional Property Rights',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2015] UGSC 22 / ULII Supreme Court Reports', 'Judicial Precedent', '29th October 2015', 'Supreme Court Landmark')
  },
  {
    id: 'case_giella_cassman_1973',
    caseName: 'Giella v Cassman Brown & Company Ltd',
    citation: '[1973] EA 358',
    court: 'Court of Appeal for Eastern Africa',
    judges: ['Spry VP', 'Mustafa JA', 'Lutta JA'],
    year: 1973,
    dateDecided: '1973',
    parties: {
      appellantOrPlaintiff: 'Giella (Former Employee / Contractor)',
      respondentOrDefendant: 'Cassman Brown & Co Ltd'
    },
    facts: 'The respondent company instituted a suit against the appellant for breach of a restrictive covenant in a contract of employment and applied under Order 39 of the Civil Procedure Rules for a temporary injunction restraining the appellant from working for a competitor or soliciting customers pending trial. The High Court granted the injunction. The appellant appealed to the Court of Appeal for East Africa.',
    issues: [
      'What are the mandatory conditions precedent for granting an interlocutory or temporary injunction in civil litigation?'
    ],
    decision: 'The Court of Appeal set out the three immutable principles governing the grant of temporary injunctions across East Africa.',
    ratioDecidendi: 'An applicant for a temporary injunction must establish: First, a prima facie case with a probability of success. Second, that the applicant might otherwise suffer irreparable injury which would not adequately be compensated by an award of damages. Third, if the court is in doubt on the first two grounds, the application is decided on a balance of convenience.',
    obiterDicta: 'Injunction is an equitable remedy and must not be granted as a matter of routine or where damages provide adequate restitution.',
    legalPrinciples: [
      'The Tripartite Test for Temporary Injunctions (Prima Facie Case, Irreparable Injury, Balance of Convenience)',
      'Equitable Discretion in Interlocutory Relief',
      'Damages as an Adequate Remedy Precluding Injunction'
    ],
    statutesConsidered: ['Civil Procedure Act Cap 71', 'Civil Procedure Rules S.I. 71-1 (Order 39)'],
    constitutionalArticlesConsidered: ['Article 126(2)'],
    topic: 'Civil Procedure & Commercial Injunctions',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1973] EA 358 / East Africa Law Reports', 'Judicial Precedent', '1973', 'Authoritative Precedent')
  },
  {
    id: 'case_kasirye_byaruhanga_2007',
    caseName: 'Kasirye Byaruhanga & Co Advocates v Uganda Development Bank',
    citation: 'Supreme Court Civil Appeal No. 2 of 2007 [2007] UGSC 2',
    court: 'Supreme Court of Uganda',
    judges: ['Oder JSC', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC'],
    year: 2007,
    dateDecided: '13th June 2007',
    parties: {
      appellantOrPlaintiff: 'Kasirye Byaruhanga & Co Advocates',
      respondentOrDefendant: 'Uganda Development Bank (UDB)'
    },
    facts: 'The appellant law firm acted for UDB in high-value recovery litigation. Following dispute over fees, the law firm filed an advocate-client bill of costs which was taxed by the Registrar. UDB filed a Chamber Summons reference challenging the taxation. The law firm objected that the reference was incompetent because the advocate representing UDB did not hold a valid Practicing Certificate at the date of signing the pleadings. UDB countered that Article 126(2)(e) of the Constitution required the court to overlook the defect as a technicality and administer substantive justice.',
    issues: [
      'Whether pleadings signed by an advocate without a valid practicing certificate are valid.',
      'Whether Article 126(2)(e) of the Constitution cures fundamental statutory illegalities and breaches of mandatory law.'
    ],
    decision: 'The Supreme Court held that pleadings signed and filed by an advocate without a valid practicing certificate are illegal, null, and void ab initio. Article 126(2)(e) cannot cure statutory illegalities.',
    ratioDecidendi: 'Article 126(2)(e) of the Constitution, which enjoins courts to administer substantive justice without undue regard to technicalities, is not a magic wand to bypass substantive statutory requirements or validate illegalities. Practicing law without a valid practicing certificate under the Advocates Act is a criminal offense and goes to the root of jurisdiction.',
    obiterDicta: 'A court of law cannot sanction an illegality once brought to its attention; ex turpi causa non oritur actio.',
    legalPrinciples: [
      'Limits of Article 126(2)(e) in Curing Fundamental Illegalities',
      'Pleadings Drawn by Unlicensed Advocates are Incurably Defective',
      'Mandatory Nature of Advocates Practicing Certificates'
    ],
    statutesConsidered: ['Advocates Act Cap 267 (Sections 14, 19, 57)', 'Civil Procedure Act Cap 71'],
    constitutionalArticlesConsidered: ['Article 126(2)(e) (Substantive Justice)'],
    topic: 'Civil Procedure & Legal Ethics',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2007] UGSC 2 / ULII Supreme Court Series', 'Judicial Precedent', '13th June 2007', 'Supreme Court Landmark')
  },
  {
    id: 'case_male_mabirizi_2019',
    caseName: 'Male H. Mabirizi K. Kiwanuka & 4 Ors v Attorney General (Age Limit Case)',
    citation: 'Constitutional Appeal No. 2 of 2018 [2019] UGSC 3',
    court: 'Supreme Court of Uganda',
    judges: ['Katureebe CJ', 'Tumwesigye JSC', 'Kisaakye JSC', 'Mwondha JSC', 'Tibatemwa-Ekirikubinza JSC', 'Mugamba JSC', 'Okello JSC'],
    year: 2019,
    dateDecided: '18th April 2019',
    parties: {
      appellantOrPlaintiff: 'Male H. Mabirizi K. Kiwanuka, Uganda Law Society, Gerald Karuhanga & Ors',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'Parliament enacted Constitution (Amendment) Act No. 1 of 2018, which removed the presidential age limit of 75 years under Article 102(b), extended the tenure of Parliament from 5 to 7 years, and reinstated presidential term limits. The appellants challenged the entire amendment on grounds of procedural violence during parliamentary debate (military intervention in the parliamentary chamber), failure to consult the public adequately under Article 1, and improper retrospective extension of parliamentary tenure without a referendum. The Constitutional Court at Mbale upheld the removal of the age limit but severed and struck down the 7-year tenure extension. The appellants appealed to the Supreme Court.',
    issues: [
      'Whether the violence in Parliament during the passage of the Bill invalidated the entire Constitution (Amendment) Act 2018.',
      'Whether Parliament had power to extend its own tenure from 5 to 7 years without popular referendum under Article 259.',
      'Whether the removal of the age limit under Article 102(b) violated the basic structure doctrine of the 1995 Constitution.'
    ],
    decision: 'The Supreme Court, by a majority of 4:3, upheld the removal of the presidential age limit under Article 102(b), and unanimously confirmed the invalidation of the 7-year parliamentary tenure extension as unconstitutional without a referendum.',
    ratioDecidendi: 'The basic structure doctrine is not explicitly entrenched in the 1995 Constitution of Uganda in a manner that prohibits Parliament from amending non-entrenched articles such as Article 102(b), provided the procedural amendment rules in Chapter 18 are complied with. However, extending the tenure of Parliament retrospectively undermines popular sovereignty under Article 1 and Article 77, requiring a direct referendum.',
    obiterDicta: 'Military invasion of Parliament during legislative debate is a grave breach of parliamentary privilege and constitutional decorum.',
    legalPrinciples: [
      'Constitutional Amendment Procedures under Chapter 18',
      'Basic Structure Doctrine Analysis in Ugandan Jurisprudence',
      'Severability Doctrine applied to Constitutional Amendments',
      'Popular Sovereignty and Referendum Mandate for Tenure Extension'
    ],
    statutesConsidered: ['Constitution (Amendment) Act No. 1 of 2018', 'Parliament (Powers and Privileges) Act Cap 258'],
    constitutionalArticlesConsidered: ['Article 1', 'Article 102(b)', 'Article 77', 'Article 259', 'Article 260'],
    topic: 'Constitutional Law & Electoral Jurisprudence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2019] UGSC 3 / ULII', 'Judicial Precedent', '18th April 2019', 'Supreme Court Landmark')
  },
  {
    id: 'case_oloka_onyango_2014',
    caseName: 'Prof. J. Oloka-Onyango & 9 Others v Attorney General',
    citation: 'Constitutional Petition No. 8 of 2014 [2014] UGCC 14',
    court: 'Constitutional Court of Uganda',
    judges: ['Kavuma ACJ', 'Nshimye JA', 'Opio Aweri JA', 'Mwondha JA', 'Tibatemwa-Ekirikubinza JA'],
    year: 2014,
    dateDecided: '1st August 2014',
    parties: {
      appellantOrPlaintiff: 'Prof. J. Oloka-Onyango, Andrew Mwenda, Morris Ogenga Latigo, Fox Odoi-Oywelowo & Ors',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'The petitioners challenged the enactment of the Anti-Homosexuality Act, 2014 on both substantive human rights grounds and procedural grounds. During the debate on 20th December 2013, the Prime Minister and Leader of Government Business repeatedly raised the lack of parliamentary quorum under Article 88. Despite the clear absence of quorum on the Hansard record, the Speaker put the bill to vote. The petitioners filed a constitutional petition seeking a declaration that the statute was passed without quorum and therefore void under Article 2(2).',
    issues: [
      'Whether the Anti-Homosexuality Act, 2014 was enacted without the requisite parliamentary quorum in contravention of Article 88 and Rule 23 of the Parliamentary Rules of Procedure.',
      'Whether an Act passed without constitutional quorum is null and void ab initio.'
    ],
    decision: 'The Constitutional Court unanimously allowed the petition and declared the Anti-Homosexuality Act, 2014 null and void for having been passed without the mandatory constitutional quorum.',
    ratioDecidendi: 'Compliance with constitutional quorum under Article 88 of the Constitution and the Rules of Procedure of Parliament is a mandatory condition precedent for valid legislative enactment. Where the official Hansard record confirms that the question of quorum was raised and ignored, the resulting statute is null, void, and of no legal effect.',
    obiterDicta: 'Courts have the constitutional mandate to enforce legislative rules when they are rooted in constitutional provisions, overriding parliamentary internal autonomy.',
    legalPrinciples: [
      'Mandatory Requirement of Constitutional Quorum in Enacting Legislation',
      'Constitutional Invalidation for Procedural Illegality under Article 88',
      'Evidentiary Value of Parliamentary Hansard'
    ],
    statutesConsidered: ['Anti-Homosexuality Act 2014', 'Parliament Rules of Procedure'],
    constitutionalArticlesConsidered: ['Article 2', 'Article 88 (Quorum)', 'Article 137'],
    topic: 'Constitutional Law & Parliamentary Quorum',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2014] UGCC 14 / ULII', 'Judicial Precedent', '1st August 2014', 'Constitutional Court Landmark')
  },
  {
    id: 'case_uls_black_mambas_2006',
    caseName: 'Uganda Law Society v Attorney General (The Black Mambas Case)',
    citation: 'Constitutional Petition No. 18 of 2005 [2006] UGCC 10',
    court: 'Constitutional Court of Uganda',
    judges: ['Okello JA', 'Mpagi-Bahigeine JA', 'Engwau JA', 'Twinomujuni JA', 'Kitumba JA'],
    year: 2006,
    dateDecided: '30th January 2006',
    parties: {
      appellantOrPlaintiff: 'Uganda Law Society (ULS)',
      respondentOrDefendant: 'Attorney General of Uganda'
    },
    facts: 'On 16th November 2005, heavily armed security operatives known as the "Black Mambas" (Joint Anti-Terrorism Taskforce) surrounded the High Court premises in Kampala while bail applications for Dr. Kizza Besigye and 14 co-accused were being heard. When the High Court granted bail, the armed personnel entered court premises to re-arrest the accused and transfer them to the General Court Martial on parallel treason and terrorism charges. The Uganda Law Society petitioned the Constitutional Court challenging the deployment of armed troops at the High Court, the interference with judicial independence, and the concurrent trial of civilians before the General Court Martial.',
    issues: [
      'Whether the military siege of the High Court violated the independence of the Judiciary under Article 128.',
      'Whether concurrent criminal proceedings in the High Court and General Court Martial against the same accused persons violated Article 28 (Fair Hearing).',
      'Whether civilians can be subjected to the jurisdiction of the General Court Martial.'
    ],
    decision: 'The Constitutional Court unanimously allowed the petition, holding that the armed invasion of the High Court was unconstitutional and violated judicial independence under Article 128.',
    ratioDecidendi: 'The High Court is a superior court of record with unlimited original jurisdiction under Article 139. The General Court Martial is subordinate to the High Court and cannot institute parallel or overriding trials for persons who have been granted bail or are appearing before the civil courts. The military deployment at court premises violated the constitutional independence of the judiciary guaranteed under Article 128.',
    obiterDicta: 'Judicial independence is the cornerstone of the rule of law; any armed intimidation of judicial officers or litigants within court premises strikes at the heart of constitutional democracy.',
    legalPrinciples: [
      'Inviolability of Judicial Independence under Article 128',
      'Subordination of Military Tribunals to the High Court',
      'Prohibition of Double Jeopardy and Parallel Prosecutions',
      'Protection of Court Premises from Executive and Military Intimidation'
    ],
    statutesConsidered: ['UPDF Act 2005', 'Trial on Indictments Act Cap 23', 'Judicature Act Cap 13'],
    constitutionalArticlesConsidered: ['Article 28 (Fair Hearing)', 'Article 128 (Judicial Independence)', 'Article 139 (High Court Jurisdiction)'],
    topic: 'Constitutional Law & Judicial Independence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2006] UGCC 10 / ULII', 'Judicial Precedent', '30th January 2006', 'Constitutional Landmark')
  },
  {
    id: 'case_hilda_namusoke_2018',
    caseName: 'Hilda Wilson Namusoke & 3 Others v Owalla’s Home Hotel Ltd',
    citation: 'Supreme Court Civil Appeal No. 15 of 2017 [2018] UGSC 54',
    court: 'Supreme Court of Uganda',
    judges: ['Katureebe CJ', 'Tumwesigye JSC', 'Kisaakye JSC', 'Nshimye JSC', 'Tibatemwa-Ekirikubinza JSC'],
    year: 2018,
    dateDecided: '22nd November 2018',
    parties: {
      appellantOrPlaintiff: 'Hilda Wilson Namusoke and 3 Others (Beneficiaries/Administrators)',
      respondentOrDefendant: 'Owalla’s Home Hotel Ltd'
    },
    facts: 'The appellants were administrators of the estate of the late Wilson Mukasa. A certificate of title for the estate land was fraudulently transferred to a third party and subsequently sold to Owalla’s Home Hotel Ltd. The trial judge found that the initial transfer was fraudulent but that the hotel was a bona fide purchaser for value without notice under Section 181 of the Registration of Titles Act (RTA Cap 230). The Court of Appeal affirmed. The appellants appealed to the Supreme Court, arguing that an estate title obtained through fraud cannot convey an indefeasible title to a purchaser who failed to conduct physical due diligence.',
    issues: [
      'What constitutes bona fide purchaser for value without notice under the Registration of Titles Act.',
      'Whether a purchaser of registered land is required to conduct physical search and inspection of the land in addition to searching the land registry.'
    ],
    decision: 'The Supreme Court allowed the appeal in part, establishing that a purchaser of registered land who fails to conduct a physical inspection of the land cannot claim the protection of a bona fide purchaser for value without notice.',
    ratioDecidendi: 'To qualify as a bona fide purchaser for value without notice under Section 181 of the RTA, a purchaser must not only conduct a search at the land registry but MUST also conduct a physical inspection on the ground to ascertain whether there are occupants, adverse claims, or equitable interests. Turning a blind eye to physical occupation amounts to constructive notice and defeats the plea of bona fide purchaser.',
    obiterDicta: 'Conveyancing in Uganda requires strict dual diligence: Registry verification plus on-site physical inquiry.',
    legalPrinciples: [
      'Dual Due Diligence in Land Transactions (Registry Search + Physical Inspection)',
      'Constructive Notice in Land Conveyancing',
      'Defeating Indefeasibility of Title under Section 77 & 181 RTA Cap 230'
    ],
    statutesConsidered: ['Registration of Titles Act Cap 230 (Sections 59, 77, 181)', 'Land Act Cap 227'],
    constitutionalArticlesConsidered: ['Article 26 (Right to Property)'],
    topic: 'Land Law & Real Property Conveyancing',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2018] UGSC 54 / ULII Supreme Court Series', 'Judicial Precedent', '22nd November 2018', 'Supreme Court Landmark')
  },
  {
    id: 'case_greenboat_kcc_2007',
    caseName: 'Greenboat Entertainment Ltd v Kampala City Council',
    citation: 'High Court Commercial Suit No. 0580 of 2003 [2007] UGCommC 14',
    court: 'High Court of Uganda (Commercial Division)',
    judges: ['Geoffrey Kiryabwire J'],
    year: 2007,
    dateDecided: '18th July 2007',
    parties: {
      appellantOrPlaintiff: 'Greenboat Entertainment Ltd',
      respondentOrDefendant: 'Kampala City Council (KCC)'
    },
    facts: 'The plaintiff entered into a commercial contract with Kampala City Council for street parking management and fee collection in Kampala. KCC later purported to unilaterally terminate the contract citing irregularities in its internal procurement process, arguing that the contract was ultra vires and unenforceable. Greenboat sued for breach of contract, special damages, and loss of expected profits.',
    issues: [
      'Whether a statutory municipal council can rely on its own internal procedural irregularities to escape liability for breach of a commercial contract.',
      'What is the measure of damages for wrongful repudiation of a long-term commercial contract.'
    ],
    decision: 'The High Court held KCC liable for breach of contract and awarded Greenboat substantial damages for breach and loss of expected profits.',
    ratioDecidendi: 'Under the indoor management rule (Turquand rule) and principles of contract law, third parties dealing in good faith with a statutory or corporate body are entitled to assume that internal approvals and procedural formalities have been regularly performed. A public authority cannot invoke its own administrative lapses to repudiate a binding contract.',
    obiterDicta: 'Public statutory corporations are held to standard commercial standards of good faith and contract performance when entering the commercial arena.',
    legalPrinciples: [
      'Indoor Management Rule in Public Commercial Contracts',
      'Measure of Damages for Repudiation of Commercial Service Contracts',
      'Estoppel against Public Bodies in Contractual Obligations'
    ],
    statutesConsidered: ['Contracts Act (Cap 73 / 2010 analogue)', 'Local Governments Act Cap 243'],
    constitutionalArticlesConsidered: ['Article 26', 'Article 42'],
    topic: 'Commercial Law & Law of Contract',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2007] UGCommC 14 / ULII', 'Judicial Precedent', '18th July 2007', 'Commercial Landmark')
  },
  {
    id: 'case_zaabwe_orient_2007',
    caseName: 'Fredrick J.K. Zaabwe v Orient Bank Ltd & 5 Others',
    citation: 'Supreme Court Civil Appeal No. 4 of 2006 [2007] UGSC 21',
    court: 'Supreme Court of Uganda',
    judges: ['Oder JSC', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC'],
    year: 2007,
    dateDecided: '10th July 2007',
    parties: {
      appellantOrPlaintiff: 'Fredrick J.K. Zaabwe (Advocate & Landowner)',
      respondentOrDefendant: 'Orient Bank Ltd, Mars Trading Co Ltd, Registrar of Titles'
    },
    facts: 'The appellant was the registered proprietor of commercial land in Kampala. An advocate acting under a Power of Attorney granted by Zaabwe for limited management purposes mortgaged the property to Orient Bank to secure commercial loans for a company in which Zaabwe had no interest. Upon default, the bank foreclosed and sold the property. Zaabwe sued to impeach the mortgage and sale on grounds of fraud, breach of fiduciary duty, and invalid attestation of the mortgage deed under Section 147 of the Registration of Titles Act (RTA).',
    issues: [
      'Whether an advocate holding a Power of Attorney can mortgage the donor’s property for his own commercial benefit or the benefit of third parties.',
      'What constitutes valid attestation of mortgage documents under Section 147 and 148 of the Registration of Titles Act.',
      'Whether failure to strictly comply with statutory attestation renders a registered mortgage void.'
    ],
    decision: 'The Supreme Court unanimously allowed the appeal, declared the mortgage and subsequent transfer fraudulent and void, and ordered the restoration of the appellant on the certificate of title.',
    ratioDecidendi: 'A Power of Attorney must be construed strictly. An agent or attorney cannot use a general power of attorney to alienate or mortgage the principal’s property for his own private benefit without clear and express authorization. Furthermore, under Section 147 and 148 of the RTA, execution of statutory land instruments must be properly attested by an independent witness; an advocate who prepares or benefits from the instrument cannot be the attesting witness.',
    obiterDicta: 'Banks and financial institutions owe a duty of due diligence to examine the scope of powers of attorney before accepting third-party mortgages.',
    legalPrinciples: [
      'Strict Construction of Powers of Attorney',
      'Fiduciary Duty and Prohibition of Self-Dealing by Attorneys',
      'Mandatory Attestation Requirements under Registration of Titles Act',
      'Impeachment of Mortgages for Constructive and Actual Fraud'
    ],
    statutesConsidered: ['Registration of Titles Act Cap 230 (Sections 147, 148, 176, 181)', 'Mortgage Act'],
    constitutionalArticlesConsidered: ['Article 26 (Right to Property)'],
    topic: 'Land Law, Mortgages & Banking Jurisprudence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2007] UGSC 21 / ULII Supreme Court Series', 'Judicial Precedent', '10th July 2007', 'Supreme Court Landmark')
  },
  {
    id: 'case_kwoyelo_2018',
    caseName: 'Uganda v Thomas Kwoyelo alias Latoni',
    citation: 'High Court International Crimes Division Case No. 02 of 2010 [2018] UGICD 1',
    court: 'High Court of Uganda (International Crimes Division)',
    judges: ['Jane Persis Kiggundu J', 'Michael Elubu J', 'Duncan Gaswaga J'],
    year: 2018,
    dateDecided: '2018 / 2024 Judgement',
    parties: {
      appellantOrPlaintiff: 'Uganda (Director of Public Prosecutions)',
      respondentOrDefendant: 'Thomas Kwoyelo alias Latoni (Lord’s Resistance Army Commander)'
    },
    facts: 'Thomas Kwoyelo, a former commander in the Lord’s Resistance Army (LRA), was captured by the UPDF in the DRC and indicted before the International Crimes Division of the High Court on 93 counts of war crimes, crimes against humanity, murder, hostage-taking, and cruel treatment under the Geneva Conventions Act and Penal Code Act. Kwoyelo applied for amnesty under Section 3 of the Amnesty Act, which grants blanket pardon to any insurgent who renounces rebellion. The Constitutional Court held that the Amnesty Commission could not deny him amnesty. The Supreme Court overturned this, holding that the Amnesty Act does not grant blanket immunity for grave breaches of international humanitarian law and war crimes.',
    issues: [
      'Whether the Amnesty Act Cap 294 grants blanket immunity from prosecution for war crimes and crimes against humanity under international humanitarian law.',
      'Whether domestic courts have jurisdiction to prosecute international crimes under the Geneva Conventions Act and Rome Statute.'
    ],
    decision: 'The Supreme Court and International Crimes Division held that customary international law and the Geneva Conventions Act obligate Uganda to prosecute war crimes, and domestic amnesty legislation cannot shield perpetrators of gross human rights violations.',
    ratioDecidendi: 'Amnesty legislation cannot be interpreted to extinguish international legal obligations to prosecute grave breaches of the Geneva Conventions and crimes against humanity. Domestic statutes must be harmonized with customary international criminal law and Uganda’s treaty obligations.',
    obiterDicta: 'The International Crimes Division of the High Court of Uganda possesses full competency to try international core crimes in accordance with international fair trial standards.',
    legalPrinciples: [
      'Incompatibility of Blanket Amnesties with International War Crimes Prosecutions',
      'Domestic Jurisdiction over Grave Breaches of Geneva Conventions',
      'Harmonization of International Criminal Law with National Jurisprudence'
    ],
    statutesConsidered: ['Geneva Conventions Act Cap 363', 'Amnesty Act Cap 294', 'Penal Code Act Cap 120', 'International Criminal Court Act 2010'],
    constitutionalArticlesConsidered: ['Article 28 (Fair Hearing)', 'Article 139 (High Court Jurisdiction)'],
    topic: 'International Humanitarian Law & Criminal Jurisprudence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2018] UGICD 1 / ULII', 'Judicial Precedent', '2018', 'International Crimes Landmark')
  },
  {
    id: 'case_besigye_museveni_2001',
    caseName: 'Col. (Rtd) Dr. Besigye Kizza v Yoweri Kaguta Museveni & Electoral Commission',
    citation: 'Presidential Election Petition No. 1 of 2001 [2001] UGSC 3',
    court: 'Supreme Court of Uganda',
    judges: ['Oder JSC', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC', 'Kanyeihamba JSC'],
    year: 2001,
    dateDecided: '20th April 2001',
    parties: {
      appellantOrPlaintiff: 'Col. (Rtd) Dr. Besigye Kizza (Presidential Candidate)',
      respondentOrDefendant: 'Yoweri Kaguta Museveni (1st Respondent) & Electoral Commission (2nd Respondent)'
    },
    facts: 'The petitioner, a candidate in the 12th March 2001 presidential elections, petitioned the Supreme Court under Section 58 of the Presidential Elections Act and Article 104 of the Constitution challenging the declaration of Yoweri Kaguta Museveni as President-elect. The petitioner alleged extensive non-compliance with the electoral laws, disenfranchisement of voters, falsification of results, intimidation, and bribery by the 1st respondent and state agents.',
    issues: [
      'Whether the 2001 presidential election was conducted in compliance with the provisions of the Constitution and the Presidential Elections Act.',
      'Whether non-compliance with the electoral law affected the result of the election in a substantial manner under Section 59(6)(a) of the Presidential Elections Act.'
    ],
    decision: 'The Supreme Court unanimously found that there was significant non-compliance with the electoral law and instances of voter disenfranchisement. However, by a 3:2 majority, the Court dismissed the petition, holding that the petitioner had failed to prove that the non-compliance affected the final result in a substantial manner.',
    ratioDecidendi: 'To annul a presidential election under Section 59(6)(a) of the Presidential Elections Act, the petitioner must prove two cumulative limbs: (1) that there was non-compliance with the electoral principles and laws, AND (2) that such non-compliance affected the results of the election in a substantial manner.',
    obiterDicta: 'Electoral management bodies must adhere strictly to statutory guidelines, transparent voter registration, and impartial tallying to preserve democratic legitimacy.',
    legalPrinciples: [
      'The "Substantial Effect" Test in Presidential Election Petitions',
      'Burden and Standard of Proof in Election Petitions (Higher than balance of probabilities)',
      'Supreme Court Exclusive Original Jurisdiction under Article 104'
    ],
    statutesConsidered: ['Presidential Elections Act 2000', 'Electoral Commission Act Cap 140'],
    constitutionalArticlesConsidered: ['Article 104 (Presidential Election Petitions)', 'Article 1 (Sovereignty of the People)'],
    topic: 'Constitutional Law & Electoral Jurisprudence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[2001] UGSC 3 / ULII', 'Judicial Precedent', '20th April 2001', 'Apex Court Landmark')
  },
  {
    id: 'case_upimc_ueb_1998',
    caseName: 'Uganda Projects Implementation and Management Centre v Uganda Electricity Board',
    citation: 'Supreme Court Civil Appeal No. 2 of 1998 [1998] UGSC 36',
    court: 'Supreme Court of Uganda',
    judges: ['Wambuzi CJ', 'Oder JSC', 'Tsekooko JSC', 'Karokora JSC', 'Mulenga JSC'],
    year: 1998,
    dateDecided: '18th December 1998',
    parties: {
      appellantOrPlaintiff: 'Uganda Projects Implementation and Management Centre (UPIMC)',
      respondentOrDefendant: 'Uganda Electricity Board (UEB)'
    },
    facts: 'The appellant entered into a management consultancy contract with UEB for organizational restructuring. UEB subsequently cancelled the contract before full completion. The appellant filed a suit claiming breach of contract and damages for wrongful termination. UEB contended that the contract was void ab initio for failure to comply with internal statutory board approval procedures.',
    issues: [
      'Whether a statutory corporation is bound by contracts executed by its authorized executive officers where internal board resolutions were incomplete.',
      'What remedies are available for anticipatory breach and repudiation of commercial consulting contracts.'
    ],
    decision: 'The Supreme Court allowed the appeal, holding UEB liable for breach and awarding damages to the management consultants.',
    ratioDecidendi: 'Under the doctrine of ostensible authority and the indoor management rule, an innocent commercial contractor dealing with the executive management of a statutory body is not bound to inspect internal records to verify that necessary board resolutions were passed. The statutory body is bound by the contract and liable for damages upon wrongful termination.',
    obiterDicta: 'Commercial certainty requires that statutory bodies respect executed agreements and cannot shelter behind internal bureaucratic omissions.',
    legalPrinciples: [
      'Ostensible Authority of Corporate Officers',
      'Indoor Management Rule Applied to Statutory Bodies',
      'Damages for Anticipatory Breach of Consulting Contracts'
    ],
    statutesConsidered: ['Contracts Act Cap 73', 'Public Enterprises Reform and Divestiture Act'],
    constitutionalArticlesConsidered: ['Article 26', 'Article 126(2)'],
    topic: 'Commercial Law & Corporate Governance',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1998] UGSC 36 / ULII', 'Judicial Precedent', '18th December 1998', 'Supreme Court Landmark')
  },
  {
    id: 'case_andrea_v_republic_1970',
    caseName: 'Andrea v Republic',
    citation: '[1970] EA 46',
    court: 'Court of Appeal for Eastern Africa',
    judges: ['Duffus P', 'Spry VP', 'Mustafa JA'],
    year: 1970,
    dateDecided: '1970',
    parties: {
      appellantOrPlaintiff: 'Andrea',
      respondentOrDefendant: 'Republic'
    },
    facts: 'The appellant was convicted of murder. The trial court rejected his defense of alibi on the grounds that the accused had failed to prove the alibi with supporting corroborating witnesses. The appellant appealed, contending that the trial judge improperly shifted the burden of proof onto the accused person.',
    issues: [
      'Who bears the burden of proof when an accused person raises the defense of alibi in criminal proceedings?'
    ],
    decision: 'The Court of Appeal quashed the murder conviction and established the fundamental rule regarding the defense of alibi in East Africa.',
    ratioDecidendi: 'An accused person who sets up an alibi does not assume any burden of proving it. The burden remains throughout on the prosecution to prove the guilt of the accused beyond reasonable doubt and to disprove the alibi by placing the accused at the scene of the crime.',
    obiterDicta: 'The Woolmington principle applies with full force in East Africa; the prosecution must prove its case without any burden on the accused to establish innocence or an alibi.',
    legalPrinciples: [
      'Burden of Proof for Defense of Alibi in Criminal Law',
      'Prosecution Obligation to Disprove Alibi beyond Reasonable Doubt',
      'Inviolability of Presumption of Innocence'
    ],
    statutesConsidered: ['Evidence Act Cap 6 (Sections 101, 103, 105)', 'Penal Code Act Cap 120'],
    constitutionalArticlesConsidered: ['Article 28(3)(a) (Presumption of Innocence)'],
    topic: 'Criminal Law & Law of Evidence',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1970] EA 46 / East Africa Law Reports', 'Judicial Precedent', '1970', 'Authoritative Precedent')
  },
  {
    id: 'case_tubere_v_r_1945',
    caseName: 'Tubere S/O Ochen v R',
    citation: '(1945) 12 EACA 63',
    court: 'Court of Appeal for Eastern Africa',
    judges: ['Sir Joseph Sheridan CJ', 'Graham Paul CJ', 'Webb CJ'],
    year: 1945,
    dateDecided: '1945',
    parties: {
      appellantOrPlaintiff: 'Tubere S/O Ochen',
      respondentOrDefendant: 'Regina / Crown'
    },
    facts: 'The appellant was convicted of murder after striking the deceased with a heavy stick following a heated dispute during a communal beer gathering. The trial court inferred malice aforethought solely from the fact of death. The appellant argued that the weapon used, the single blow, and the lack of premeditation negated an intention to kill or inflict grievous harm.',
    issues: [
      'What factors determine whether malice aforethought is established in homicide cases where death results from blunt force trauma or a single strike?'
    ],
    decision: 'The Court of Appeal reduced the conviction from murder to manslaughter.',
    ratioDecidendi: 'In determining whether malice aforethought exists under criminal law, the court must evaluate: (1) the nature and lethality of the weapon used, (2) the amount of force applied, (3) the part of the body struck, (4) the number of blows, and (5) the conduct of the accused before and after the incident. Where the weapon is not inherently lethal and only a single blow is struck in heat of passion, malice aforethought cannot be readily presumed.',
    obiterDicta: 'Courts must not confuse intentional assault resulting in unintended death with malice aforethought.',
    legalPrinciples: [
      'The Five-Factor Test for Inferring Malice Aforethought in Homicide',
      'Distinction between Murder and Manslaughter under Section 188 & 187 Penal Code',
      'Assessment of Lethality of Weapons in Criminal Trials'
    ],
    statutesConsidered: ['Penal Code Act Cap 120 (Sections 188, 191)'],
    constitutionalArticlesConsidered: ['Article 22 (Right to Life)', 'Article 28'],
    topic: 'Criminal Law & Mens Rea',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '(1945) 12 EACA 63 / East African Court of Appeal Reports', 'Judicial Precedent', '1945', 'Authoritative Precedent')
  },
  {
    id: 'case_woobei_uganda_1969',
    caseName: 'Woobei v Uganda',
    citation: '[1969] EA 349',
    court: 'Court of Appeal for Eastern Africa',
    judges: ['Sir Charles Newbold P', 'Duffus VP', 'Law JA'],
    year: 1969,
    dateDecided: '1969',
    parties: {
      appellantOrPlaintiff: 'Woobei',
      respondentOrDefendant: 'Uganda'
    },
    facts: 'The appellant was charged and convicted of murder. He relied on the defense of intoxication under Section 12 of the Penal Code Act, claiming he was heavily intoxicated by local brew at the time of the incident and lacked the specific intent (malice aforethought) required for murder. The trial judge convicted him, ruling that voluntary drunkenness is no excuse in criminal law.',
    issues: [
      'To what extent does voluntary intoxication negate specific intent (mens rea) required for specific intent crimes like murder?'
    ],
    decision: 'The Court of Appeal allowed the appeal in part, reducing the conviction to manslaughter.',
    ratioDecidendi: 'While voluntary intoxication is generally not a complete defense, where a crime requires a specific intent (such as malice aforethought in murder), evidence of intoxication must be considered to determine whether the accused was capable of forming the necessary specific intention. If intoxication incapacitated the accused from forming malice aforethought, the offense is reduced to manslaughter.',
    obiterDicta: 'Drunkenness that destroys specific intent reduces murder to manslaughter because manslaughter requires only unlawful act resulting in death without specific intent.',
    legalPrinciples: [
      'Defense of Intoxication under Section 12 Penal Code Act',
      'Impact of Intoxication on Specific Intent Crimes',
      'Reduction of Murder to Manslaughter for Lack of Malice Aforethought'
    ],
    statutesConsidered: ['Penal Code Act Cap 120 (Section 12, Section 188)'],
    constitutionalArticlesConsidered: ['Article 28 (Fair Hearing)'],
    topic: 'Criminal Law & General Defenses',
    fullTextAvailable: true,
    sourceType: 'Official Legal Source',
    sourceMetadata: createVerifiedSource('JUDICIARY', '[1969] EA 349 / East Africa Law Reports', 'Judicial Precedent', '1969', 'Authoritative Precedent')
  }
];

