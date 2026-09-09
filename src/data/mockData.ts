import {
  UserProfile,
  SavedNote,
  LegalDraftTemplate
} from '../types';

// Re-export full, verified, and cited legal databases
export { constitutionChapters } from './constitutionData';
export { statutesList } from './statutesData';
export { caseLawDatabase } from './casesData';
export { lawCoursesCatalog } from './coursesData';
export { regulationsList, statutoryInstrumentsList } from './regulationsData';
export { comprehensiveQuizzesList as quizPresets, comprehensiveQuizzesList } from './quizzesData';
export { pastPapersList, pastPapersList as pastPapersArchive } from './pastPapersData';
export { legalDictionaryTerms, blacksLawDictionary, legalDictionaryTerms as legalTermsDatabase } from './legalDictionaryData';
export { legalMaximsList } from './legalMaximsData';
export { legalResourceGuides } from './resourceGuidesData';
export { redVolumesList } from './redVolumesData';


export const mockUser: UserProfile = {
  id: 'usr_001',
  name: 'Babirye Zula',
  email: 'babiryezula10@gmail.com',
  role: 'Student',
  institution: 'Gulu University — Founder & Developer Profile',
  avatarUrl: '',
  studyStreakDays: 14,
  completedQuizzes: 28,
  savedNotesCount: 19,
  bookmarkedCasesCount: 42,
  joinedDate: 'January 2025'
};

export const initialNotesList: SavedNote[] = [
  {
    id: 'note_01',
    title: 'Ratio Decidendi Summary - Obbo & Mwenda v AG (2004)',
    category: 'Constitutional Law',
    content: 'Key take-away: Section 50 of Penal Code Act (false news) was struck down because freedom of expression under Article 29 protects even unpopular or false statements unless strictly justified under Article 43. The standard of proof for restricting expression is extremely high in a free and democratic society.',
    tags: ['Freedom of Speech', 'Article 29', 'Supreme Court', 'Uganda Media Law'],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-18'
  },
  {
    id: 'note_02',
    title: 'Requirements of Valid Contract under Section 10 Contracts Act 2010',
    category: 'Law of Contract',
    content: '1. Offer & Acceptance\n2. Free Consent (S.14 - no coercion, undue influence, fraud, misrepresentation)\n3. Competent Parties (Majority 18+, sound mind)\n4. Lawful Consideration & Object\n5. Intention to create legal relations.',
    tags: ['Contracts Act 2010', 'Section 10', 'LLB Year 1'],
    createdAt: '2025-02-01',
    updatedAt: '2025-02-01'
  },
  {
    id: 'note_03',
    title: 'Prior Compensation Rule - UNRA v Asuman Irumba (2014)',
    category: 'Land Law',
    content: 'Supreme Court confirmed Article 26(2) requires prompt payment of fair and adequate compensation PRIOR to the state taking possession or acquiring any land for public infrastructure projects.',
    tags: ['Land Acquisition', 'Article 26', 'Supreme Court', 'Compulsory Acquisition'],
    createdAt: '2025-02-10',
    updatedAt: '2025-02-10'
  }
];

export const initialNotes = initialNotesList;

export const legalDraftTemplates: LegalDraftTemplate[] = [
  {
    id: 'draft_01',
    title: 'Agreement for Sale of Land (Mailo / Freehold)',
    category: 'Agreements',
    description: 'Standard Ugandan land sale agreement with spousal consent clause under S.39 Land Act Cap 227, LC1 witness block, and boundary disclosure.',
    requiredFields: [
      { key: 'vendorName', label: 'Vendor (Seller) Full Name', placeholder: 'e.g., Kato Paul' },
      { key: 'purchaserName', label: 'Purchaser (Buyer) Full Name', placeholder: 'e.g., Nakato Mary' },
      { key: 'landLocation', label: 'Land Location / Village & District', placeholder: 'e.g., Kyaddondo Block 210 Plot 45, Wakiso' },
      { key: 'purchasePrice', label: 'Purchase Price (UGX)', placeholder: 'e.g., 85,000,000/-' },
      { key: 'spouseName', label: 'Spouse Name (For S.39 Consent)', placeholder: 'e.g., Mukasa Sarah' }
    ],
    defaultTemplate: `THE REPUBLIC OF UGANDA
IN THE MATTER OF THE LAND ACT, CAP 227
AND IN THE MATTER OF AGREEMENT FOR SALE OF LAND

THIS LAND SALE AGREEMENT is made this _____ day of _______________ 2025
BETWEEN:
[vendorName] of P.O. Box ____________, Uganda (hereinafter referred to as "THE VENDOR") of the one part;
AND
[purchaserName] of P.O. Box ____________, Uganda (hereinafter referred to as "THE PURCHASER") of the other part.

WHEREBY IT IS AGREED AS FOLLOWS:
1. THE PROPERTY: The Vendor agrees to sell and the Purchaser agrees to purchase all that piece of land situated at [landLocation] measuring approximately __________ acres.
2. CONSIDERATION: The agreed purchase price is UGX [purchasePrice] (Uganda Shillings ____________________________________________________ Only).
3. SPOUSAL CONSENT: In compliance with Section 39 of the Land Act, Cap 227, the Vendor's spouse, [spouseName], hereby appends her/his signature signifying full, voluntary consent to this transaction.
4. WITNESSES: Signed in the presence of Local Council I Chairman and Advocates.`
  },
  {
    id: 'draft_02',
    title: 'Affidavit of Means / Identity',
    category: 'Affidavits',
    description: 'Sworn affidavit under the Oaths Act Cap 19 for use in Ugandan High Court proceedings.',
    requiredFields: [
      { key: 'deponentName', label: 'Deponent Full Name', placeholder: 'e.g., Zula Babirye' },
      { key: 'residence', label: 'Place of Residence', placeholder: 'e.g., Ntinda, Kampala' },
      { key: 'matterDescription', label: 'Purpose of Affidavit', placeholder: 'e.g., Application for Police Bond / Identity Verification' }
    ],
    defaultTemplate: `THE REPUBLIC OF UGANDA
IN THE HIGH COURT OF UGANDA AT KAMPALA
(CIVIL DIVISION)
AFFIDAVIT OF [deponentName]

I, [deponentName], of c/o [residence], do hereby solemnly make oath and state as follows:
1. That I am a female/male adult Ugandan of sound mind and the deponent herein.
2. That I reside at [residence], Kampala District.
3. That this affidavit is made in support of [matterDescription].
4. That whatever is stated herein is true and correct to the best of my knowledge and belief.

SWORN at Kampala this _____ day of ____________ 2025
By the said [deponentName]
DEPONENT

BEFORE ME:
___________________________________
COMMISSIONER FOR OATHS`
  },
  {
    id: 'draft_03',
    title: 'Formal Demand Letter for Breach of Contract',
    category: 'Formal Letters',
    description: 'Pre-litigation demand letter issued by Advocates giving 7 days statutory notice before court action.',
    requiredFields: [
      { key: 'clientName', label: 'Client Name (Creditor)', placeholder: 'e.g., LawHub Tech Ltd' },
      { key: 'debtorName', label: 'Debtor Name / Company', placeholder: 'e.g., Quick Logistics Ltd' },
      { key: 'amountOwed', label: 'Amount Owed (UGX)', placeholder: 'e.g., 25,000,000/-' },
      { key: 'breachDetails', label: 'Brief Breach Description', placeholder: 'e.g., Non-payment of Invoice No. 402 for software services' }
    ],
    defaultTemplate: `LAWHUB ADVOCATES & LEGAL CONSULTANTS
Plot 12 Kampala Road, Jubilee Insurance Center
P.O. Box 7788, Kampala, Uganda

OUR REF: LHA/INT/2025/04
DATE: 12th August 2025

TO: [debtorName]
P.O. Box ____________, Kampala

RE: FORMAL DEMAND NOTICE FOR PAYMENT OF UGX [amountOwed] DUE TO [clientName]

We act for and on behalf of our client, [clientName], on whose strict instructions we address you as follows:
1. That our client entered into an agreement with you regarding [breachDetails].
2. That despite repeated reminders, you have defaulted on paying the outstanding sum of UGX [amountOwed].
3. TAKE NOTICE that we hereby demand payment of the full sum together with 10% legal collection fees within SEVEN (7) DAYS from receipt hereof.
4. TAKE FURTHER NOTICE that should you fail to comply, we have firm instructions to file civil proceedings against you in court without further notice at your sole peril as to costs.

YOURS FAITHFULLY,
___________________________________
LAWHUB ADVOCATES`
  }
];

