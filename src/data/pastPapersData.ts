import { PastPaper } from '../types';
import { createVerifiedSource } from './verifiedSources';

export const pastPapersList: PastPaper[] = [
  {
    id: 'pp_gulu_const_2024',
    title: 'Constitutional Law I — End of Semester Examination',
    institution: 'Gulu University Faculty of Law',
    courseCode: 'LAW 1101',
    courseTitle: 'Constitutional Law',
    year: 2024,
    semester: 'Semester I',
    lecturer: 'Department of Public & Comparative Law',
    examType: 'End of Semester',
    sourceMetadata: createVerifiedSource('MOJCA', 'Gulu University Faculty of Law Exam Archive', 'Past Examination', 'December 2024'),
    questions: [
      'Question 1: In February 2024, Parliament passed the hypothetical "National Civic Harmony and Public Demonstrations Act, 2024". Section 4 of the Act provides that "No public meeting or political demonstration shall take place in any municipality without the prior written authorization of the Inspector General of Police, who shall have absolute discretion to grant or refuse permission without assigning any reason." Okello, a community activist in Gulu City, organized a peaceful, unarmed demonstration to protest poor road infrastructure. He was arrested and charged under Section 4. With reference to the 1995 Constitution of Uganda and relevant landmark authorities (including Muwanga Kivumbi v Attorney General and Charles Onyango Obbo v Attorney General), advise Okello on the constitutionality of Section 4 and his remedies.',
      'Question 2: "The 1995 Constitution of Uganda establishes constitutional supremacy rather than parliamentary supremacy." Critically evaluate this statement, analyzing the scope of judicial review under Article 137 and the doctrine of severability under Article 2(2).',
      'Question 3: Examine the constitutional grounds and procedural requirements for the impeachment and removal of the President of the Republic of Uganda under Article 107 of the Constitution.'
    ],
    hasModelAnswers: true,
    modelAnswerSummary: `MODEL ANSWER FOR QUESTION 1 (IRAC METHOD):

1. ISSUE:
Whether Section 4 of the National Civic Harmony Act 2024, which grants the IGP absolute discretion to prohibit public demonstrations without reasons, violates the constitutional right to freedom of assembly under Article 29(1)(d), and whether such limitation is saved by Article 43.

2. RULE OF LAW:
- Article 29(1)(d) guarantees every person the right to assemble and demonstrate together with others peacefully and unarmed.
- Article 2(2) renders any statutory provision inconsistent with the Constitution null and void to the extent of inconsistency.
- In Muwanga Kivumbi v Attorney General (Constitutional Petition No. 9 of 2005) [2008] UGCC 4, the Constitutional Court struck down Section 32(2) of the Police Act, holding that police powers to regulate assemblies do not include the power to prohibit or require prior permission.
- In Charles Onyango Obbo & Andrew Mwenda v AG (2004) UGSC 1, Justice Mulenga held that limitations under Article 43 must be demonstrably justifiable in a free and democratic society and satisfy the strict proportionality test.

3. APPLICATION TO FACTS:
Section 4 grants "absolute discretion" without reasons. This replicates the unconstitutional mischief of the struck-down Section 32 of the Police Act. Blanket, arbitrary discretion to ban peaceful protests cannot survive the Article 43 democratic justification test. The demonstration in Gulu was peaceful and unarmed.

4. CONCLUSION & REMEDIES:
Okello should petition the Constitutional Court under Article 137(3) for a declaration that Section 4 is null and void under Article 2(2), and apply to the trial magistrate to stay criminal proceedings or refer the constitutional question under Article 137(5).`
  },
  {
    id: 'pp_mak_contracts_2023',
    title: 'Law of Contract II — End of Semester Examination',
    institution: 'Makerere University School of Law',
    courseCode: 'LAW 1102',
    courseTitle: 'Law of Contract',
    year: 2023,
    semester: 'Semester II',
    lecturer: 'Department of Commercial Law',
    examType: 'End of Semester',
    sourceMetadata: createVerifiedSource('MOJCA', 'Makerere Law Faculty Archive', 'Past Examination', 'June 2023'),
    questions: [
      'Question 1: By a written agreement dated 10th January 2023, Nile Agro Exporters Ltd agreed to supply 500 metric tons of organic Arabica coffee to London Commodities PLC for USD 1,500,000, CIF Mombasa. Delivery was scheduled for 30th April 2023. On 15th March 2023, due to unexpected landslides in the Mt. Elgon region, the coffee harvest in Eastern Uganda dropped by 70%, and local coffee prices doubled. Nile Agro informed London Commodities that the contract was frustrated by act of God and that they were discharged from performance. London Commodities had to purchase substitute coffee on the spot market at USD 2,200,000 and now sues Nile Agro for USD 700,000 damages. Advise Nile Agro under Section 66 and Section 73 of the Contracts Act 2010.',
      'Question 2: Critically examine the doctrine of privity of contract in Uganda and the statutory and equitable exceptions recognized under modern commercial law.'
    ],
    hasModelAnswers: true,
    modelAnswerSummary: `MODEL ANSWER FOR QUESTION 1:
1. ISSUE: Whether increased cost and commercial difficulty caused by landslides constitute statutory frustration under Section 66 Contracts Act 2010, and whether London Commodities is entitled to recover market difference damages under Section 73.
2. RULE: In Tsakiroglou & Co Ltd v Noblee Thorl GmbH [1962] AC 93 and Victoria Industries Ltd v Ramanbhai Bros Ltd [1961] EA 11, courts established that mere increase in expense or commercial hardship does NOT frustrate a contract. Frustration requires performance to become physically or legally impossible.
3. APPLICATION: Nile Agro contracted to supply generic commodity (Arabica coffee), not a specific identified crop from a single farm. Coffee could still be procured from alternative sources.
4. CONCLUSION: Frustration fails; Nile Agro is in fundamental breach and liable under Section 73 for expectation damages of USD 700,000.`
  },
  {
    id: 'pp_ldc_bar_land_2024',
    title: 'Land Transactions & Conveyancing — Bar Course Final Practical Exam',
    institution: 'Law Development Centre (LDC) Kampala',
    courseCode: 'BAR 4101',
    courseTitle: 'Land Law & Conveyancing',
    year: 2024,
    semester: 'Term II Final Bar Examination',
    lecturer: 'Department of Post-Graduate Legal Studies',
    examType: 'Bar Course Pre-Entry / Final',
    sourceMetadata: createVerifiedSource('JUDICIARY', 'Law Development Centre Bar Examination Repository', 'Past Examination', 'October 2024'),
    questions: [
      'Question 1: Hajji Musa is the registered proprietor of Mailo land comprised in Kyadondo Block 180 Plot 34 situated at Kisaasi, Kampala, measuring 2.5 acres. On the land is a family residential bungalow where Hajji Musa resides with his first wife Hajat Amina and their four children. Unknown to Hajat Amina, Hajji Musa entered into an agreement to sell 1 acre of the land to Apex Real Estate Ltd for UGX 450,000,000. Hajji Musa signed the sale agreement and executed a transfer form in favor of Apex Real Estate Ltd. When Apex surveyors arrived to fence off the 1 acre, Hajat Amina confronted them, stating that she never consented to the sale. Hajji Musa contends that the 1 acre sold is vacant land separate from the main house and that under customary/religious norms his consent as head of household is sufficient. Apex Real Estate Ltd threatens to lodge the transfer at the Land Registry. Advise Hajat Amina on her legal remedies under Section 39 of the Land Act Cap 227 and the Registration of Titles Act Cap 230.'
    ],
    hasModelAnswers: true,
    modelAnswerSummary: `MODEL ANSWER FOR BAR COURSE PRACTICAL PROBLEM:
1. STEP 1: IMMEDIATELY LODGE A CAVEAT at the Department of Land Registration under Section 139 of the Registration of Titles Act (RTA Cap 230) supported by a statutory affidavit claiming spousal interest.
2. STEP 2: INSTITUTE A CIVIL SUIT in the High Court Land Division under Section 39(1) of the Land Act Cap 227 and Land Regulations 2001 (Form 4).
3. STEP 3: APPLY FOR A TEMPORARY INJUNCTION under Order 39 CPR restraining Apex Real Estate Ltd and the Registrar from transferring title.
4. LEGAL SUBSTANCE: Under Section 39(1) of the Land Act, "family land" includes land from which the spouse derives sustenance or which is contiguous to the residence. In Alice Okiror v Global Capital Ltd, the High Court confirmed that any transaction lacking prior written spousal consent is void ab initio. Hajat Amina is entitled to an order canceling the sale agreement and setting aside the transfer form.`
  }
];
