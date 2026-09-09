import { LegalMaxim } from '../types';

export const legalMaximsList: LegalMaxim[] = [
  {
    id: 'mx_audi_alteram_partem',
    latinPhrase: 'Audi Alteram Partem',
    englishTranslation: 'Listen to the other side; no person shall be condemned unheard.',
    explanation: 'The fundamental principle of natural justice requiring that before any judicial, administrative, or disciplinary decision affecting a person’s rights, status, or property is made, they must be given notice of the allegations and an adequate opportunity to defend themselves.',
    practicalExample: 'A university disciplinary committee expelling a law student without serving a charge sheet or allowing them to call witnesses violates this maxim, rendering the expulsion null and void under Article 42.',
    legalPrinciple: 'Rule of Fair Hearing & Procedural Natural Justice',
    relevantUgandanCases: [
      'John Jet Tumwebaze v Makerere University Council (2007) HCT-00-CV-MC-0021-2007',
      'Ridge v Baldwin [1964] AC 40',
      'Dr. David Tinyefuza v Attorney General (1997) UGCC 3'
    ]
  },
  {
    id: 'mx_nemo_judex_in_causa_sua',
    latinPhrase: 'Nemo Judex In Causa Sua',
    englishTranslation: 'No one should be a judge in their own cause.',
    explanation: 'The second pillar of natural justice prohibiting any person who has a direct personal, financial, or familial interest in a dispute from sitting as an adjudicator or presiding judge in the matter.',
    practicalExample: 'A judicial officer who is a shareholder in a commercial bank must recuse themselves from hearing a loan dispute between that bank and a borrower.',
    legalPrinciple: 'Rule Against Judicial & Administrative Bias',
    relevantUgandanCases: [
      'Tumusiime & Anor v Makerere University (2004) KALR 89',
      'R v Sussex Justices, Ex Parte McCarthy [1924] 1 KB 256',
      'Fredrick J.K. Zaabwe v Orient Bank Ltd [2007] UGSC 21'
    ]
  },
  {
    id: 'mx_ignorantia_juris_neminem_excusat',
    latinPhrase: 'Ignorantia Juris Neminem Excusat',
    englishTranslation: 'Ignorance of the law excuses no one.',
    explanation: 'A person who is unaware of a law may not escape liability for violating that law merely because they did not know of its content or existence.',
    practicalExample: 'An employer who fails to make mandatory NSSF contributions for employees cannot claim they were unaware of the National Social Security Fund Act.',
    legalPrinciple: 'Universal Presumption of Knowledge of Public Law',
    relevantUgandanCases: [
      'Uganda v Peter Otim [1989] HCB 12',
      'Penal Code Act Cap 120 Section 6'
    ]
  },
  {
    id: 'mx_res_ipsa_loquitur',
    latinPhrase: 'Res Ipsa Loquitur',
    englishTranslation: 'The thing speaks for itself.',
    explanation: 'A doctrine in the law of torts allowing the court to infer negligence from the very nature of the accident or injury in the absence of direct evidence, when the accident could not have happened without negligence and the defendant had exclusive control of the instrumentality.',
    practicalExample: 'A heavy surgical instrument left inside a patient\'s abdomen after routine surgery is prima facie proof of medical negligence without requiring expert witness testimony on the specific surgical movement.',
    legalPrinciple: 'Evidentiary Inference of Negligence in Tort',
    relevantUgandanCases: [
      'Byarugaba v Attorney General [1992] KALR 112',
      'Scott v London & St. Katherine Docks Co (1865) 3 H&C 596',
      'Kiyimba v Mulago Hospital Board [2001] UGHC 14'
    ]
  },
  {
    id: 'mx_volenti_non_fit_injuria',
    latinPhrase: 'Volenti Non Fit Injuria',
    englishTranslation: 'To a willing person, no injury is done.',
    explanation: 'A defense in tort law asserting that a person who voluntarily consents to take the risk of injury cannot recover damages for resulting harm.',
    practicalExample: 'A spectator at a boxing tournament at Lugogo who is injured by a boxer thrown towards the ringside cannot sue for trespass to person, having voluntarily assumed the inherent risk.',
    legalPrinciple: 'Voluntary Assumption of Known Risk as Complete Tort Defense',
    relevantUgandanCases: [
      'Kaganda v Attorney General [1980] HCB 89',
      'Wooldridge v Sumner [1963] 2 QB 43'
    ]
  },
  {
    id: 'mx_delegatus_non_potest_delegare',
    latinPhrase: 'Delegatus Non Potest Delegare',
    englishTranslation: 'A delegate cannot further delegate their delegated power.',
    explanation: 'A person or authority to whom powers have been delegated by statute or contract cannot sub-delegate those powers to another body without express statutory authorization.',
    practicalExample: 'Where an Act of Parliament empowers a specific Minister to make statutory instruments, the Minister cannot sub-delegate that rule-making power to a permanent secretary without statutory warrant.',
    legalPrinciple: 'Prohibition of Unlawful Sub-Delegation in Administrative Law',
    relevantUgandanCases: [
      'Amalgamated Properties Ltd v Attorney General [1976] HCB 44',
      'Barnard v National Dock Labour Board [1953] 2 QB 18'
    ]
  },
  {
    id: 'mx_actus_non_facit_reum_nisi_mens_sit_rea',
    latinPhrase: 'Actus Non Facit Reum Nisi Mens Sit Rea',
    englishTranslation: 'An act does not make a person guilty unless their mind is also guilty.',
    explanation: 'To establish criminal liability at common law and under Section 8 & 9 of the Penal Code Act Cap 120, the prosecution must prove both the physical wrongful act (actus reus) and the guilty mental state (mens rea).',
    practicalExample: 'Taking someone else\'s jacket by genuine accident in a dark lecture hall lacks mens rea (animus furandi) and therefore does not constitute the offence of theft.',
    legalPrinciple: 'Concurrence of Physical Conduct and Mental Intent in Criminal Law',
    relevantUgandanCases: [
      'Woolmington v DPP [1935] AC 462',
      'Uganda v Thomas Kwoyelo [2018] UGICD 1',
      'Andrea v Republic [1970] EA 46'
    ]
  },
  {
    id: 'mx_ubi_jus_ibi_remedium',
    latinPhrase: 'Ubi Jus Ibi Remedium',
    englishTranslation: 'Where there is a legal right, there is a remedy.',
    explanation: 'The foundational common law and constitutional doctrine providing that wherever the law confers a right or recognizes an infringement, it provides a legal mechanism for obtaining redress.',
    practicalExample: 'Article 50 of the 1995 Constitution gives effect to this maxim by empowering anyone whose fundamental human right has been infringed to apply directly to a competent court for redress.',
    legalPrinciple: 'Constitutional and Equitable Enforcement of Rights',
    relevantUgandanCases: [
      'Ashby v White (1703) 92 ER 126',
      'Charles Onyango Obbo & Andrew Mwenda v Attorney General [2004] UGSC 1',
      'Foundation for Human Rights Initiative v Attorney General [2008] UGCC 1'
    ]
  },
  {
    id: 'mx_expressio_unius_est_exclusio_alterius',
    latinPhrase: 'Expressio Unius Est Exclusio Alterius',
    englishTranslation: 'The express mention of one thing excludes all others.',
    explanation: 'A statutory interpretation rule providing that when a statute expressly lists specific items or categories, items not included are presumed to have been intentionally excluded by Parliament.',
    practicalExample: 'Where a tax statute states that exemptions apply specifically to "registered primary schools and secondary schools," university tertiary colleges are excluded from the exemption.',
    legalPrinciple: 'Canons of Statutory Construction',
    relevantUgandanCases: [
      'Uganda Revenue Authority v Uganda Consolidated Properties Ltd [2000] UGSC 14',
      'Tempest v Kilner (1846) 3 CB 249'
    ]
  },
  {
    id: 'mx_nemo_dat_quod_non_habet',
    latinPhrase: 'Nemo Dat Quod Non Habet',
    englishTranslation: 'No one can give what they do not have.',
    explanation: 'A seller of goods or property cannot transfer a better legal title than they themselves possess, unless an established exception (such as estoppel, mercantile agency, or registered title indefeasibility) applies.',
    practicalExample: 'A thief who steals a registered motor vehicle cannot pass good legal title to an innocent buyer, and the true owner is entitled to recover the vehicle.',
    legalPrinciple: 'Title Transfer in Commercial and Real Property Law',
    relevantUgandanCases: [
      'David Sejjaka Nalima v Rebecca Musoke [1992] KALR 65',
      'Sale of Goods and Supply of Services Act 2017 Section 32'
    ]
  },
  {
    id: 'mx_pacta_sunt_servanda',
    latinPhrase: 'Pacta Sunt Servanda',
    englishTranslation: 'Agreements must be kept.',
    explanation: 'A universal principle of contract law and public international law asserting that validly formed agreements, treaties, and contractual covenants are legally binding upon the parties and must be executed in good faith.',
    practicalExample: 'Under Section 10 and 65 of the Contracts Act 2010, commercial parties cannot arbitrarily unilaterally repudiate agreed contractual terms without lawful justification or breach by the other party.',
    legalPrinciple: 'Sanctity and Binding Force of Contracts and Treaties',
    relevantUgandanCases: [
      'Greenboat Entertainment Ltd v Kampala City Council [2007] HCT-00-CC-CS-0580-2003',
      'Transroad Ltd v Bank of Uganda [2001] 2 EA 565'
    ]
  },
  {
    id: 'mx_vigilantibus_non_dormientibus',
    latinPhrase: 'Vigilantibus Non Dormientibus Jura Subveniunt',
    englishTranslation: 'The law assists the vigilant, not those who sleep on their rights.',
    explanation: 'The equitable doctrine and statutory rule of limitation providing that courts will not assist claimants who delay unreasonably or sleep on their legal rights without reasonable cause.',
    practicalExample: 'Filing a breach of contract claim after the expiry of the 6-year statutory limitation period under the Limitation Act Cap 80 will result in the claim being dismissed as time-barred.',
    legalPrinciple: 'Doctrine of Laches and Statutory Limitation of Actions',
    relevantUgandanCases: [
      'Kasirye Byaruhanga & Co Advocates v Uganda Development Bank [2007] UGSC 2',
      'Limitation Act Cap 80 Section 3'
    ]
  }
];
