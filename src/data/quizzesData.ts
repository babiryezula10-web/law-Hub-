import { Quiz } from '../types';

export const comprehensiveQuizzesList: Quiz[] = [
  {
    id: 'quiz_const_01',
    title: 'Constitutional Law Mastery & Judicial Review',
    courseTitle: 'Constitutional Law',
    durationMinutes: 20,
    totalQuestions: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'cq_1',
        type: 'mcq',
        question: 'Under Article 2(2) of the 1995 Constitution of Uganda, what happens if an Act of Parliament is inconsistent with a constitutional provision?',
        options: [
          'The Act is suspended until Parliament amends it',
          'The Constitution prevails and the Act is void to the extent of the inconsistency',
          'The Supreme Court must consult the President before voiding the Act',
          'The Act remains enforceable until the next general election'
        ],
        correctAnswer: 'The Constitution prevails and the Act is void to the extent of the inconsistency',
        explanation: 'Article 2(2) is the supremacy clause of Ugandan jurisprudence: if any other law or custom is inconsistent with the Constitution, the Constitution prevails and the other law is void to the extent of inconsistency.'
      },
      {
        id: 'cq_2',
        type: 'mcq',
        question: 'Which landmark Supreme Court decision struck down Section 50 of the Penal Code Act (false news) as an unconstitutional limitation on freedom of expression?',
        options: [
          'Major General David Tinyefuza v Attorney General (1997)',
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004)',
          'Paul Ssemogerere v Attorney General (2000)',
          'Grace Ibingira v Uganda (1966)'
        ],
        correctAnswer: 'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004)',
        explanation: 'In Charles Onyango Obbo & Andrew Mwenda v AG (2004) UGSC 1, Justice Mulenga formulated the limitation test under Article 43, striking down Section 50 of the Penal Code Act for disproportionately chilling free speech.'
      },
      {
        id: 'cq_3',
        type: 'true_false',
        question: 'The right to a fair hearing under Article 28 is non-derogable and cannot be suspended during a state of emergency under Article 44(c).',
        correctAnswer: 'True',
        explanation: 'Article 44 explicitly lists four non-derogable rights: (a) Freedom from torture, (b) Freedom from slavery, (c) Right to fair hearing, and (d) Right to habeas corpus.'
      },
      {
        id: 'cq_4',
        type: 'mcq',
        question: 'Which court has exclusive original jurisdiction to interpret the provisions of the 1995 Constitution under Article 137?',
        options: [
          'High Court of Uganda',
          'Supreme Court of Uganda',
          'Court of Appeal sitting as the Constitutional Court',
          'Judicial Service Commission'
        ],
        correctAnswer: 'Court of Appeal sitting as the Constitutional Court',
        explanation: 'Under Article 137(1), any question as to the interpretation of the Constitution must be determined by the Court of Appeal sitting as the Constitutional Court.'
      },
      {
        id: 'cq_5',
        type: 'essay',
        question: 'Analyze how the Supreme Court decision in UNRA v Asuman Irumba & Peter Magelah (2014) altered the compulsory land acquisition procedure under Article 26.',
        correctAnswer: 'Prior compensation is mandatory before government takes possession of land.',
        explanation: 'In UNRA v Irumba (2014), the Supreme Court struck down Section 7(1) of the Land Acquisition Act, holding that prompt payment of fair and adequate compensation MUST occur PRIOR to taking possession of the land under Article 26(2).'
      }
    ]
  },
  {
    id: 'quiz_contracts_01',
    title: 'Contracts Act 2010: Formation, Breach & Remedies',
    courseTitle: 'Law of Contract',
    durationMinutes: 25,
    totalQuestions: 5,
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'ctq_1',
        type: 'mcq',
        question: 'Under Section 10(2) of the Contracts Act 2010, what is the required form for an enforceable contract in Uganda?',
        options: [
          'It must always be in writing and registered with URSB',
          'It must be signed by an Advocate of the High Court',
          'It may be oral, written, partly oral and partly written, or implied from conduct',
          'It must be executed under a formal corporate seal'
        ],
        correctAnswer: 'It may be oral, written, partly oral and partly written, or implied from conduct',
        explanation: 'Section 10(2) of the Contracts Act 2010 provides that a contract may be oral, written, partly oral and partly written, or implied from the conduct of the parties.'
      },
      {
        id: 'ctq_2',
        type: 'mcq',
        question: 'Which section of the Contracts Act 2010 codifies the statutory doctrine of frustration?',
        options: ['Section 10', 'Section 18', 'Section 66', 'Section 73'],
        correctAnswer: 'Section 66',
        explanation: 'Section 66 of the Contracts Act 2010 codifies the doctrine of frustration where an unforeseen post-formation event renders performance legally or physically impossible.'
      },
      {
        id: 'ctq_3',
        type: 'true_false',
        question: 'Under Section 11 of the Contracts Act 2010, an individual who is 17 years of age possesses full legal capacity to enter into general commercial contracts.',
        correctAnswer: 'False',
        explanation: 'Section 11(1) of the Contracts Act 2010 specifies that capacity requires a person to be 18 years or above of sound mind.'
      },
      {
        id: 'ctq_4',
        type: 'mcq',
        question: 'What is the primary rule for the measure of damages for breach of contract codified in Section 73 of the Contracts Act 2010?',
        options: [
          'Punitive damages to punish bad faith',
          'Compensation for loss naturally arising in the usual course of things or contemplated by parties (Hadley v Baxendale)',
          'Full refund of consideration regardless of actual loss',
          'Equitable forfeiture of all defendant assets'
        ],
        correctAnswer: 'Compensation for loss naturally arising in the usual course of things or contemplated by parties (Hadley v Baxendale)',
        explanation: 'Section 73 codifies the common law rule in Hadley v Baxendale (1854), restricting damages to losses naturally arising or reasonably contemplated by the parties at the time of contract.'
      },
      {
        id: 'ctq_5',
        type: 'mcq',
        question: 'What is the legal effect of a contract entered into as a result of coercion under Section 15 and Section 21 of the Contracts Act 2010?',
        options: [
          'Void ab initio',
          'Voidable at the option of the coerced party',
          'Valid subject to court fine',
          'Automatically converted into an arbitration agreement'
        ],
        correctAnswer: 'Voidable at the option of the coerced party',
        explanation: 'Contracts entered into without free consent due to coercion, undue influence, fraud, or misrepresentation are voidable at the option of the innocent party.'
      }
    ]
  },
  {
    id: 'quiz_land_01',
    title: 'Land Law & Torrens System in Uganda',
    courseTitle: 'Land Law',
    durationMinutes: 20,
    totalQuestions: 5,
    difficulty: 'Advanced',
    questions: [
      {
        id: 'lq_1',
        type: 'mcq',
        question: 'Under Section 39 of the Land Act Cap 227, what is the legal consequence of a landowner selling the family residence without prior written spousal consent?',
        options: [
          'The transaction is voidable within 6 months',
          'The transaction is void ab initio',
          'The spouse receives 10% of sale proceeds automatically',
          'The buyer gets an equitable lease of 5 years'
        ],
        correctAnswer: 'The transaction is void ab initio',
        explanation: 'Section 39(2) explicitly makes transactions of family land without prior written spousal consent void ab initio.'
      },
      {
        id: 'lq_2',
        type: 'mcq',
        question: 'What standard of fraud is required to impeach a registered certificate of title under Section 64 and Section 176 of the Registration of Titles Act (RTA Cap 230)?',
        options: [
          'Constructive or equitable mistake',
          'Actual dishonesty, moral turpitude, or fraudulent collusion brought home to the transferee',
          'Minor clerical irregularity in survey coordinates',
          'Failure to pay local market dues'
        ],
        correctAnswer: 'Actual dishonesty, moral turpitude, or fraudulent collusion brought home to the transferee',
        explanation: 'In Kampala District Land Board v Venansio Babweyaka (2007) and Assets Co v Mere Roihi, fraud means actual fraud involving dishonesty brought home to the registered owner.'
      },
      {
        id: 'lq_3',
        type: 'true_false',
        question: 'Under Article 237(2)(c) of the Constitution and Section 40 of the Land Act, a non-citizen of Uganda is constitutionally permitted to acquire Mailo or Freehold land.',
        correctAnswer: 'False',
        explanation: 'Article 237(2)(c) restricts non-citizens to leasehold tenure not exceeding 99 years; non-citizens cannot own Mailo or Freehold land in Uganda.'
      },
      {
        id: 'lq_4',
        type: 'mcq',
        question: 'Who is a "bonafide occupant" under Section 29(2) of the Land Act Cap 227?',
        options: [
          'Any tenant who paid Busuulu in the last 12 months',
          'A person who occupied and utilized land unchallenged by the registered owner for 12 years or more prior to 8th October 1995',
          'Any family member residing on ancestral land after 2010',
          'A licensee with a written 1-year agreement'
        ],
        correctAnswer: 'A person who occupied and utilized land unchallenged by the registered owner for 12 years or more prior to 8th October 1995',
        explanation: 'Section 29(2) defines bonafide occupant as someone who occupied land unchallenged by the registered owner for 12 years or more prior to the coming into force of the 1995 Constitution.'
      },
      {
        id: 'lq_5',
        type: 'mcq',
        question: 'Under Article 237(2)(b) of the Constitution, what doctrine mandates that the government holds natural lakes, rivers, wetlands, and forest reserves in trust for all citizens?',
        options: [
          'The Doctrine of Radical Title',
          'The Public Trust Doctrine',
          'The Eminent Domain Doctrine',
          'The Tenure Paravail Principle'
        ],
        correctAnswer: 'The Public Trust Doctrine',
        explanation: 'Article 237(2)(b) and Section 4 of the National Environment Act 2019 enshrine the Public Trust Doctrine for ecological protection.'
      }
    ]
  }
];
