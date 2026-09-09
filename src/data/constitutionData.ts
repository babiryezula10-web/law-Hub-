import { ConstitutionChapter, ConstitutionSchedule, ConstitutionAmendmentInfo } from '../types';
import { createVerifiedSource } from './verifiedSources';

export const constitutionPreamble = {
  title: 'Preamble to the 1995 Constitution of the Republic of Uganda',
  sourceMetadata: createVerifiedSource(
    'PARLIAMENT',
    'Const. 1995 Preamble / Legal Notice No. 1 of 1995 (Consolidated 31 December 2023)',
    'Constitution',
    '8th October 1995',
    '1995 Consolidated Edition (As at 31 December 2023)'
  ),
  text: `WE THE PEOPLE OF UGANDA:

RECALLING our history which has been characterized by political and constitutional instability;

RECOGNISING struggles against the forces of tyranny, oppression and exploitation;

COMMITTED to building a better future by establishing a socio-economic and political order through a popular and durable national Constitution based on the principles of unity, peace, equality, democracy, freedom, social justice and progress;

EXERCISING our sovereign and inalienable right to determine the form of governance for our country, and having fully participated in the Constitution-making process;

NOTING that a Constituent Assembly was assembled to debate the Draft Constitution prepared by the Uganda Constitutional Commission to enact this Constitution:

DO HEREBY, in and through this Constituent Assembly, SOLEMNLY ADOPT, ENACT AND GIVE TO OURSELVES AND TO FUTURE GENERATIONS, THIS CONSTITUTION OF THE REPUBLIC OF UGANDA, on this 22nd day of September, in the year 1995.`
};

export const nationalObjectives = [
  {
    number: 'Objective I',
    title: 'Implementation of objectives',
    description: '(i) The State shall be guided by the following directive principles in taking executive, legislative, and judicial decisions.\n(ii) The President shall report to Parliament and the nation once a year all steps taken to realize these policy objectives.'
  },
  {
    number: 'Objective II',
    title: 'Democratic principles',
    description: '(i) The State shall be based on democratic principles which empower and encourage the active participation of all citizens at all levels in their governance.\n(ii) All organs of State and public bodies shall provide equal opportunity for citizens to choose their leaders in free and fair elections.\n(iii) The composition of Government shall reflect the national character and diversity of the people of Uganda.'
  },
  {
    number: 'Objective III',
    title: 'National unity and stability',
    description: '(i) All organs of State and people of Uganda shall work towards the promotion of national unity and peace.\n(ii) Every effort shall be made to integrate all peoples of Uganda while preserving cultural diversity.'
  },
  {
    number: 'Objective IV',
    title: 'National sovereignty, independence and territorial integrity',
    description: '(i) The State and citizens shall at all times defend national sovereignty, territorial integrity, and the independence of Uganda.\n(ii) The State shall build a professional, non-partisan, disciplined national defence force.'
  },
  {
    number: 'Objective V',
    title: 'Fundamental and other human rights and freedoms',
    description: '(i) The State shall guarantee and respect the fundamental rights and freedoms of all individuals.\n(ii) Society and the State shall recognize the role of women in society and accord them equal status and opportunities.'
  },
  {
    number: 'Objective VI',
    title: 'Gender balance and fair representation of marginalized groups',
    description: 'The State shall ensure gender balance and fair representation of marginalized groups on all constitutional and public bodies.'
  },
  {
    number: 'Objective VII',
    title: 'Protection of the aged',
    description: 'The State shall make reasonable provision for the welfare and maintenance of the aged.'
  },
  {
    number: 'Objective VIII',
    title: 'Provision of adequate resources for organs of government',
    description: 'The distribution of national powers and functions shall be accompanied by adequate resources to enable each organ of government to discharge its duties.'
  },
  {
    number: 'Objective IX',
    title: 'Right to development',
    description: 'In order to facilitate rapid and equitable development, the State shall encourage private enterprise, rural development, and citizen initiative.'
  },
  {
    number: 'Objective X',
    title: 'Role of the people in development',
    description: 'The State shall take all necessary steps to involve the people in the formulation and implementation of development plans and programmes.'
  },
  {
    number: 'Objective XI',
    title: 'Role of the state in development',
    description: 'The State shall stimulate agricultural and industrial production and ensure balanced socio-economic development across all regions of Uganda.'
  },
  {
    number: 'Objective XII',
    title: 'Balanced and equitable development',
    description: 'The State shall adopt balanced and equitable development policies to bridge historical disparities between regions and communities.'
  },
  {
    number: 'Objective XIII',
    title: 'Protection of natural resources',
    description: 'The State shall protect important natural resources including land, water, wetlands, minerals, flora, fauna, and clean air on behalf of the people.'
  },
  {
    number: 'Objective XIV',
    title: 'General social and economic objectives',
    description: 'The State shall endeavor to fulfill the fundamental rights of all Ugandans to social justice, clean water, adequate food, shelter, education, and health services.'
  },
  {
    number: 'Objective XV',
    title: 'Recognition of the role of the family',
    description: 'The family is the natural and basic unit of society and is entitled to protection by society and the State.'
  },
  {
    number: 'Objective XVI',
    title: 'Recognition of the rights of persons with disabilities',
    description: 'Society and the State shall recognize the rights of persons with disabilities to respect, human dignity, and equal opportunities.'
  },
  {
    number: 'Objective XVII',
    title: 'Support for the medical and health sector',
    description: 'The State shall take all practical measures to promote good health, sanitation, nutrition, and medical services for all citizens.'
  },
  {
    number: 'Objective XVIII',
    title: 'Educational objectives',
    description: 'The State shall promote free and compulsory basic education and afford every citizen equal opportunity to attain higher education.'
  },
  {
    number: 'Objective XIX',
    title: 'Protection of cultural heritage and preservation of public values',
    description: 'The State and society shall promote and preserve cultural values and practices which enhance the dignity and well-being of Ugandans.'
  },
  {
    number: 'Objective XX',
    title: 'Accountability and transparency',
    description: 'All public offices shall be held in trust for the people. All persons placed in positions of leadership and responsibility shall be accountable to the people.'
  },
  {
    number: 'Objective XXI',
    title: 'Eradication of corruption and abuse of office',
    description: 'The State shall take effective measures to eradicate corruption and abuse or misuse of power by those holding political and other public offices.'
  },
  {
    number: 'Objective XXII',
    title: 'Promotion of good governance and rule of law',
    description: 'The State shall ensure that all laws and government policies conform to the rule of law, separation of powers, and constitutional order.'
  },
  {
    number: 'Objective XXIII',
    title: 'Natural disaster preparedness',
    description: 'The State shall institute effective mechanisms for dealing with natural disasters, floods, droughts, epidemics, and climate change emergencies.'
  },
  {
    number: 'Objective XXIV',
    title: 'Duties of a citizen',
    description: 'It is the duty of every citizen to respect the Constitution, defend the nation, pay lawful taxes, protect public property, and combat corruption.'
  },
  {
    number: 'Objective XXV',
    title: 'Preservation of public property and assets',
    description: 'The State shall ensure the strict protection of public property, public funds, and national assets against embezzlement and illegal alienation.'
  },
  {
    number: 'Objective XXVI',
    title: 'Clean and healthy environment',
    description: 'The State shall promote sustainable development and public awareness of the need to manage land, air, and water resources in a balanced manner.'
  },
  {
    number: 'Objective XXVII',
    title: 'Sustainable management of the environment',
    description: 'The State shall prevent environmental degradation, protect biodiversity, and maintain ecological balance for future generations.'
  },
  {
    number: 'Objective XXVIII',
    title: 'Foreign policy objectives',
    description: 'The foreign policy of Uganda shall be based on respect for international law and treaty obligations, peaceful co-existence, non-alignment, and regional integration.'
  },
  {
    number: 'Objective XXIX',
    title: 'African integration and regional solidarity',
    description: 'The State shall actively participate in regional, sub-regional, and African organizations to promote peace, economic cooperation, and African unity.'
  }
];

export const constitutionSchedules: ConstitutionSchedule[] = [
  {
    number: 'First Schedule',
    title: 'Districts of Uganda (Article 5)',
    summary: 'Lists the official constitutionally recognized districts of Uganda comprising the regional geographical boundaries of the Republic.',
    content: 'Comprises all officially gazetted districts of Uganda organized across Central, Eastern, Northern, and Western regions as established under Article 5 and local government enactments.'
  },
  {
    number: 'Second Schedule',
    title: 'The Boundary of the Republic of Uganda (Article 5)',
    summary: 'The precise legal demarcation and geographical coordinates of the international boundaries of Uganda.',
    content: 'Commencing at the highest point of Mount Sabinio, along the boundary line of Rwanda, the Democratic Republic of the Congo, South Sudan, Kenya, and Tanzania, establishing the sovereign territorial borders.'
  },
  {
    number: 'Third Schedule',
    title: 'Uganda’s Indigenous Communities as at 1st February, 1926 (Article 10(a))',
    summary: 'List of indigenous ethnic communities whose members are constitutionally deemed citizens of Uganda by birth.',
    content: 'Lists the 65 indigenous communities (including Acholi, Alur, Baganda, Bagisu, Bakiga, Batoro, Banyankole, Banyoro, Basoga, Iteso, Karamojong, Lugbara, Langi, Madi, Sebei, etc.) existing within the borders of Uganda as at 1st February 1926.'
  },
  {
    number: 'Fourth Schedule',
    title: 'Oaths of the Republic of Uganda (Articles 81, 98, 108, 115, 149)',
    summary: 'Statutory texts of the Oath of Allegiance, Presidential Oath, Vice Presidential Oath, Judicial Oath, Member of Parliament Oath, and Official Oaths.',
    content: 'Provides the solemn oaths taken by the President, Vice President, Prime Minister, Ministers, Chief Justice, Justices and Judges of Courts of Judicature, Speaker, and Members of Parliament.'
  },
  {
    number: 'Fifth Schedule',
    title: 'Regional Governments (Article 178)',
    summary: 'Constitutional framework for two or more districts cooperating to form regional governments, governance councils, and regional assemblies.',
    content: 'Establishes the governance structure, composition, regional assembly powers, and leadership elections for regional governments created by district council resolutions under Article 178.'
  },
  {
    number: 'Sixth Schedule',
    title: 'Functions and Services for which Regional Governments are Responsible (Article 178)',
    summary: 'The statutory jurisdiction, secondary education, regional hospitals, cultural development, and roads devolved to regional governments.',
    content: 'Deuterated services include regional infrastructure, cultural affairs, secondary and tertiary education facilities, environmental management, and regional development planning.'
  },
  {
    number: 'Seventh Schedule',
    title: 'Unconditional Grant Allocation Formula to Local Governments (Article 193)',
    summary: 'Mathematical formula for calculating statutory central government unconditional fiscal grants to local government councils.',
    content: 'Prescribes the fiscal transfer formula balancing population size, geographical land area, index of deprivation, and basic administrative overhead costs.'
  }
];

export const constitutionAmendmentsHistory: ConstitutionAmendmentInfo[] = [
  {
    actName: 'Constitution (Amendment) Act, 2000 (Act No. 13 of 2000)',
    year: 2000,
    actNumber: 'Act No. 13 of 2000',
    promulgationDate: '1st September 2000',
    affectedArticles: ['Article 88', 'Article 89', 'Article 90', 'Article 97'],
    summary: 'Reformed parliamentary voting procedures, quorums, and validation of past parliamentary business following the Constitutional Court nullification in Ssemogerere v AG.'
  },
  {
    actName: 'Constitution (Amendment) Act, 2005 (Act No. 11 of 2005)',
    year: 2005,
    actNumber: 'Act No. 11 of 2005',
    promulgationDate: '30th September 2005',
    affectedArticles: ['Article 1', 'Article 5', 'Article 10', 'Article 178', 'First & Fifth Schedules'],
    summary: 'Introduced Kampala as capital city in Buganda, established framework for regional governments, dual citizenship, and amended schedules on districts.'
  },
  {
    actName: 'Constitution (Amendment) (No. 2) Act, 2005 (Act No. 21 of 2005)',
    year: 2005,
    actNumber: 'Act No. 21 of 2005',
    promulgationDate: '30th December 2005',
    affectedArticles: ['Article 69', 'Article 70', 'Article 71', 'Article 72', 'Article 105'],
    summary: 'Historic constitutional amendment lifting presidential two-term limits under Article 105(2), transitioning Uganda from Movement system to multi-party political system, and introducing the office of the Prime Minister as Leader of Government Business in Parliament.'
  },
  {
    actName: 'Constitution (Amendment) Act, 2015 (Act No. 12 of 2015)',
    year: 2015,
    actNumber: 'Act No. 12 of 2015',
    promulgationDate: '1st October 2015',
    affectedArticles: ['Article 60', 'Article 81', 'Article 83', 'Article 147'],
    summary: 'Renamed Electoral Commission to Independent Electoral Commission, reformed tenure of members, and clarified rules on floor-crossing by Members of Parliament.'
  },
  {
    actName: 'Constitution (Amendment) Act, 2018 (Act No. 1 of 2018)',
    year: 2018,
    actNumber: 'Act No. 1 of 2018',
    promulgationDate: '5th January 2018',
    affectedArticles: ['Article 102(b)', 'Article 104', 'Article 291'],
    summary: 'Removed the presidential age limit (lower age of 35 and upper age of 75 years) under Article 102(b), adjusted presidential election petition timelines, and affirmed in Supreme Court judgment Male Mabirizi v AG [2019] UGSC 3.'
  }
];

export const constitutionChapters: ConstitutionChapter[] = [
  // CHAPTER 1
  {
    number: 1,
    title: 'The Constitution',
    articles: [
      {
        number: 'Article 1',
        title: 'Sovereignty of the People',
        chapterNumber: 1,
        chapterTitle: 'The Constitution',
        content: `(1) All power belongs to the people who shall exercise their sovereignty in accordance with this Constitution.
(2) Without prejudice to clause (1) of this article, all authority in the State emanates from the people of Uganda; and the people shall be governed through their representatives in accordance with this Constitution.
(3) All power and authority of Government and its organs derive from this Constitution, which shall be obeyed by all citizens and state organs.
(4) The people shall express their will and consent on who shall govern them and how they should be governed, through regular, free and fair elections of their representatives or through referenda.`,
        clauses: [
          { clauseNumber: '(1)', text: 'All power belongs to the people who shall exercise their sovereignty in accordance with this Constitution.' },
          { clauseNumber: '(2)', text: 'All authority in the State emanates from the people of Uganda.' },
          { clauseNumber: '(3)', text: 'All power and authority of Government and its organs derive from this Constitution.' },
          { clauseNumber: '(4)', text: 'The people shall express their will through regular, free and fair elections or referenda.' }
        ],
        keywords: ['sovereignty', 'power belongs to the people', 'elections', 'constitutional authority', 'democracy'],
        keyCases: ['Paul Ssemogerere & Ors v Attorney General (2000) UGSC 1', 'Major General David Tinyefuza v Attorney General (1997) UGCC 3'],
        relatedActs: ['Electoral Commission Act Cap 140', 'Political Parties and Organisations Act 2005'],
        explanation: 'Article 1 establishes popular sovereignty as the foundational bedrock of the Ugandan legal order. Government organs hold delegated authority strictly derived from the citizenry and bounded by the Constitution.',
        keyPrinciples: ['Constitutional Democracy', 'Popular Sovereignty', 'Derivation of State Power', 'Electoral Legitimacy'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 1', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 2',
        title: 'Supremacy of the Constitution',
        chapterNumber: 1,
        chapterTitle: 'The Constitution',
        content: `(1) This Constitution is the supreme law of Uganda and shall have binding force on all authorities and persons throughout Uganda.
(2) If any other law or any custom is inconsistent with any of the provisions of this Constitution, the Constitution shall prevail, and that other law or custom shall, to the extent of the inconsistency, be void.`,
        clauses: [
          { clauseNumber: '(1)', text: 'This Constitution is the supreme law of Uganda and shall have binding force on all authorities and persons throughout Uganda.' },
          { clauseNumber: '(2)', text: 'If any other law or custom is inconsistent with any provision of this Constitution, the Constitution shall prevail, and that other law or custom shall, to the extent of the inconsistency, be void.' }
        ],
        keywords: ['constitutional supremacy', 'inconsistency', 'voidness', 'custom', 'ultra vires'],
        keyCases: [
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1',
          'Muwanga Kivumbi v Attorney General (2008) UGCC 4',
          'Susan Kigula & 416 Ors v Attorney General (2009) UGSC 6'
        ],
        relatedActs: ['Acts of Parliament (All)', 'Customary Marriage (Registration) Act Cap 248'],
        explanation: 'Article 2 provides the supreme norm of the Ugandan legal system. Any Act of Parliament, statutory instrument, municipal by-law, cultural practice, or administrative action contrary to the Constitution is void ab initio.',
        keyPrinciples: ['Constitutional Supremacy', 'Doctrine of Voidness & Inconsistency', 'Hierarchy of Laws'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 2', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 3',
        title: 'Defense of the Constitution',
        chapterNumber: 1,
        chapterTitle: 'The Constitution',
        content: `(1) It is prohibited for any person or group of persons to take or retain control of the Government of Uganda except in accordance with the provisions of this Constitution.
(2) Any person who, by any means, overthrows or attempts to overthrow or abrogate this Constitution commits the offence of treason and shall be dealt with according to law.
(3) This Constitution shall not lose its force and effect even where its observance is interrupted by a government established by the force of arms.
(4) All citizens of Uganda shall have the right and duty at all times— (a) to defend this Constitution; and (b) to do all in their power to restore this Constitution after that interruption.
(5) Any person or group of persons who resists an attempt to overthrow this Constitution commits no offence.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Prohibition of taking unconstitutional control of Government.' },
          { clauseNumber: '(2)', text: 'Overthrowing or attempting to overthrow the Constitution is treason.' },
          { clauseNumber: '(3)', text: 'Constitution retains legal force during unconstitutional interruptions.' },
          { clauseNumber: '(4)', text: 'Right and duty of citizens to defend and restore the Constitution.' },
          { clauseNumber: '(5)', text: 'Immunity for citizens resisting unlawful overthrow of constitutional order.' }
        ],
        keywords: ['defense of constitution', 'treason', 'coup detat', 'citizen duty', 'restoration of constitution'],
        keyCases: ['Uganda v Thomas Kwoyelo (2018) UGICD 1', 'Matovu Case (Ex parte Matovu [1966] EA 514)'],
        relatedActs: ['Penal Code Act Cap 120 S.23', 'Uganda Peoples’ Defence Forces Act 2005'],
        explanation: 'Article 3 explicitly repudiates the Kelsenian jurisprudence established in Ex Parte Matovu (1966), establishing that unconstitutional seizures of power do not create legal legitimacy.',
        keyPrinciples: ['Constitutional Continuity', 'Treason for Coup d’État', 'Citizen Right of Resistance'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 3', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 4',
        title: 'Promotion of Public Awareness of the Constitution',
        chapterNumber: 1,
        chapterTitle: 'The Constitution',
        content: `The State shall promote public awareness of this Constitution by—
(a) translating it into Ugandan languages and disseminating it as widely as possible; and
(b) providing for the teaching of the Constitution in all educational institutions and Armed Forces training programmes.`,
        clauses: [
          { clauseNumber: '(a)', text: 'Translation and wide national dissemination of the Constitution.' },
          { clauseNumber: '(b)', text: 'Mandatory civic education and curriculum teaching of the Constitution in schools and security forces.' }
        ],
        keywords: ['civic education', 'translation', 'curriculum', 'public awareness', 'armed forces'],
        keyCases: ['Uganda Law Society v Attorney General (2006) UGCC 10'],
        relatedActs: ['Uganda Human Rights Commission Act Cap 24', 'Education Act 2008'],
        explanation: 'Imposes a positive constitutional duty upon the State to translate the Constitution into indigenous languages and include constitutional law in national school curricula.',
        keyPrinciples: ['Civic Consciousness', 'Constitutional Literacy', 'State Educational Obligations'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 4', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 2
  {
    number: 2,
    title: 'The Republic',
    articles: [
      {
        number: 'Article 5',
        title: 'The Republic of Uganda and Territory',
        chapterNumber: 2,
        chapterTitle: 'The Republic',
        content: `(1) Uganda is one sovereign State and a Republic.
(2) Uganda shall consist of the districts specified in the First Schedule to this Constitution and such other districts as may be established in accordance with this Constitution.
(3) The territory of Uganda shall comprise the areas bounded in the Second Schedule to this Constitution.
(4) Kampala, located in Buganda, shall be the capital city for Uganda and shall be administered by the Central Government.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Uganda is a single indivisible sovereign Republic.' },
          { clauseNumber: '(2)', text: 'Composition of districts under First Schedule.' },
          { clauseNumber: '(3)', text: 'Sovereign territorial boundary specified in Second Schedule.' },
          { clauseNumber: '(4)', text: 'Kampala designated capital city administered by Central Government.' }
        ],
        keywords: ['territory', 'districts', 'Kampala Capital City', 'First Schedule', 'Second Schedule'],
        keyCases: ['Kampala Capital City Authority v Lord Mayor Erias Lukwago (2014) UGCA 3'],
        relatedActs: ['Kampala Capital City Authority Act 2010', 'Local Governments Act Cap 243'],
        explanation: 'Defines the territorial sovereignty of Uganda, incorporating the First and Second Schedules, and establishes Kampala as the capital city administered directly by the Central Government.',
        keyPrinciples: ['Territorial Sovereignty', 'Unitary Republic', 'Capital City Administration'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 5 (As amended 2005)', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 6',
        title: 'Official Language',
        chapterNumber: 2,
        chapterTitle: 'The Republic',
        content: `(1) The official language of Uganda is English.
(2) Swahili shall be the second official language in Uganda, to be used in such circumstances as Parliament may by law prescribe.
(3) Subject to this article, any other language may be used as a medium of instruction in schools or for legislative, administrative or judicial purposes.`,
        clauses: [
          { clauseNumber: '(1)', text: 'English is the primary official language.' },
          { clauseNumber: '(2)', text: 'Swahili is the second official language as prescribed by Parliament.' },
          { clauseNumber: '(3)', text: 'Indigenous languages permitted for education, administration, and judicial proceedings.' }
        ],
        keywords: ['official language', 'English', 'Swahili', 'medium of instruction', 'indigenous languages'],
        keyCases: ['East African Community Treaty Decisions (2018) EACJ'],
        relatedActs: ['National Curriculum Development Centre Act Cap 135'],
        explanation: 'Establishes English as the primary official language and Swahili as the second official language, while safeguarding indigenous languages in courts and educational instruction.',
        keyPrinciples: ['National Language Policy', 'Linguistic Rights', 'Regional EAC Integration'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 6 (As amended 2005)', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 3
  {
    number: 3,
    title: 'Citizenship',
    articles: [
      {
        number: 'Article 9',
        title: 'Citizenship of Uganda',
        chapterNumber: 3,
        chapterTitle: 'Citizenship',
        content: `Every person who, on the commencement of this Constitution, is a citizen of Uganda shall continue to be such a citizen.`,
        clauses: [
          { clauseNumber: 'Art 9', text: 'Preservation of existing citizenship acquired prior to 8th October 1995.' }
        ],
        keywords: ['citizenship preservation', 'commencement', 'nationality'],
        keyCases: ['Dr. Olara Otunnu v Attorney General (2011) UGCA'],
        relatedActs: ['Uganda Citizenship and Immigration Control Act Cap 66'],
        explanation: 'Guarantees the continuity of citizenship held prior to the promulgation of the 1995 Constitution.',
        keyPrinciples: ['Continuity of Legal Status', 'Non-Deprivation of Vested Nationality'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 9', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 10',
        title: 'Citizenship by Birth',
        chapterNumber: 3,
        chapterTitle: 'Citizenship',
        content: `The following persons shall be citizens of Uganda by birth—
(a) every person born in Uganda one of whose parents or grandparents was a member of any of the indigenous communities existing and residing within the borders of Uganda as at the first day of February, 1926, and set out in the Third Schedule; and
(b) every person born in or outside Uganda one of whose parents or grandparents was at the time of birth of that person a citizen of Uganda by birth.`,
        clauses: [
          { clauseNumber: '(a)', text: 'Born in Uganda with parent/grandparent from indigenous community in Third Schedule.' },
          { clauseNumber: '(b)', text: 'Born in or outside Uganda with a parent/grandparent citizen by birth.' }
        ],
        keywords: ['citizenship by birth', 'Third Schedule', 'indigenous communities', 'jus sanguinis', 'jus soli'],
        keyCases: ['Proscovia Boonabana v AG [2018] UGCC 12'],
        relatedActs: ['Uganda Citizenship and Immigration Control Act Cap 66 S.12'],
        explanation: 'Sets the constitutional standard for citizenship by birth based on descent from indigenous communities listed in the Third Schedule or descent from Ugandan citizen parents.',
        keyPrinciples: ['Citizenship by Descent', 'Third Schedule Communities', 'Jus Sanguinis'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 10', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 15',
        title: 'Dual Citizenship',
        chapterNumber: 3,
        chapterTitle: 'Citizenship',
        content: `(1) A citizen of Uganda of eighteen years and above who voluntarily acquires the citizenship of a country other than Uganda may retain the citizenship of Uganda subject to this Constitution and any law enacted by Parliament.
(2) A person who is not a citizen of Uganda may, on acquiring the citizenship of Uganda, retain the citizenship of another country in accordance with law.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Ugandan citizen acquiring another nationality may retain Ugandan citizenship.' },
          { clauseNumber: '(2)', text: 'Foreign national acquiring Ugandan citizenship may retain original citizenship.' }
        ],
        keywords: ['dual citizenship', 'nationality', 'diaspora', 'passport', 'immigration'],
        keyCases: ['Uganda Diaspora Association v Directorate of Citizenship (2016)'],
        relatedActs: ['Uganda Citizenship and Immigration Control (Amendment) Act 2009'],
        explanation: 'Inserted by the 2005 constitutional amendment to authorize dual citizenship for Ugandans in the diaspora and foreign spouses.',
        keyPrinciples: ['Dual Nationality', 'Diaspora Rights', 'Immigration Flexibility'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 15 (As amended 2005)', 'Constitution', '2005', 'Current in Force')
      }
    ]
  },

  // CHAPTER 4: FUNDAMENTAL HUMAN RIGHTS
  {
    number: 4,
    title: 'Protection and Promotion of Fundamental and Other Human Rights and Freedoms',
    articles: [
      {
        number: 'Article 20',
        title: 'Fundamental and Other Human Rights and Freedoms Inhering in the Individual',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) Fundamental rights and freedoms of the individual are inherent and not granted by the State.
(2) The rights and freedoms of the individual and groups enshrined in this Chapter shall be respected, upheld and promoted by all organs and agencies of Government and by all persons.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Human rights are inherent in the human person and not gifts granted by the State.' },
          { clauseNumber: '(2)', text: 'Mandatory obligation on all State organs, agencies, and private persons to uphold rights.' }
        ],
        keywords: ['inherent rights', 'natural rights', 'State obligation', 'vertical and horizontal application'],
        keyCases: [
          'Major General David Tinyefuza v Attorney General (1997) UGCC 3',
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1'
        ],
        relatedActs: ['Human Rights (Enforcement) Act 2019 S.3', 'Uganda Human Rights Commission Act Cap 24'],
        explanation: 'Article 20 establishes the natural law foundation of Chapter 4: human rights inhere in the individual by virtue of humanity, not as privileges conferred by the State.',
        keyPrinciples: ['Inherent Nature of Human Rights', 'Universal State Obligation', 'Horizontal Human Rights Duty'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 20', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 21',
        title: 'Equality and Freedom from Discrimination',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) All persons are equal before and under the law in all spheres of political, economic, social and cultural life and in every other respect and shall enjoy equal protection of the law.
(2) Without prejudice to clause (1) of this article, a person shall not be discriminated against on the ground of sex, race, colour, ethnic origin, tribe, birth, creed or religion, social or economic standing, political opinion or disability.
(3) For the purposes of this article, "discriminate" means to give different treatment to different persons attributable wholly or mainly to their respective descriptions.
(4) Nothing in this article shall prevent Parliament from enacting laws that are necessary for implementing policies and programmes aimed at redressing social, economic, educational or other imbalance in society.`,
        clauses: [
          { clauseNumber: '(1)', text: 'All persons equal before and under the law; equal protection.' },
          { clauseNumber: '(2)', text: 'Prohibited grounds of discrimination: sex, race, tribe, disability, creed, etc.' },
          { clauseNumber: '(3)', text: 'Definition of discrimination.' },
          { clauseNumber: '(4)', text: 'Affirmative action authorization to redress historical imbalances.' }
        ],
        keywords: ['equality', 'non-discrimination', 'equal protection', 'affirmative action', 'gender equality'],
        keyCases: [
          'Uganda Association of Women Lawyers (FIDA) & 5 Ors v AG (2004) UGCC 2',
          'Mifumi (U) Ltd & 12 Ors v Attorney General (2015) UGCC 2'
        ],
        relatedActs: ['Equal Opportunities Commission Act 2007', 'Persons with Disabilities Act 2020'],
        explanation: 'Guarantees substantive equality and authorizes affirmative action programmes to remedy historical marginalization.',
        keyPrinciples: ['Substantive Equality', 'Non-Discrimination', 'Affirmative Action'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 21', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 22',
        title: 'Protection of Right to Life',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) No person shall be deprived of life intentionally except in the execution of a sentence of death passed in a fair trial by a court of competent jurisdiction in respect of a criminal offence under the laws of Uganda and the sentence has been confirmed by the highest appellate court.
(2) No person has the right to terminate the life of an unborn child except as may be authorized by law.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Right to life; death penalty exception requires fair trial and confirmation by highest court.' },
          { clauseNumber: '(2)', text: 'Protection of the unborn child.' }
        ],
        keywords: ['right to life', 'death penalty', 'capital punishment', 'unborn child', 'highest appellate court'],
        keyCases: [
          'Susan Kigula & 416 Ors v Attorney General (2009) UGSC 6',
          'Uganda v Kwoyelo (2018) UGICD 1'
        ],
        relatedActs: ['Penal Code Act Cap 120 S.188, 189', 'Trial on Indictments Act Cap 23'],
        explanation: 'Protects the right to life. In Susan Kigula, the Supreme Court ruled that mandatory death sentences violate Article 22, making death sentences discretionary and commutable after 3 years on death row.',
        keyPrinciples: ['Inviolability of Life', 'Discretionary Capital Sentencing', 'Kigula 3-Year Commutation Rule'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 22', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 23',
        title: 'Protection of Personal Liberty',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) No person shall be deprived of personal liberty except in accordance with procedures authorized by law.
(2) A person arrested, restricted or detained shall be kept in a place authorized by law.
(3) A person arrested, restricted or detained shall be informed immediately, in a language that the person understands, of the reasons for the arrest and of his or her right to a lawyer of his or her choice.
(4) A person arrested or detained— (a) for the purpose of bringing him or her before a court; or (b) upon reasonable suspicion of his or her having committed a criminal offence, shall, if not earlier released, be brought to court as soon as possible but in any case not later than forty-eight hours from the time of his or her arrest.
(5) Where a person is restricted or detained— (a) the next-of-kin of that person shall, at the request of that person, be informed as soon as practicable; (b) that person shall be allowed reasonable access to the next-of-kin, lawyer, and personal doctor; and (c) that person shall be allowed reasonable access to medical treatment.
(6) Where a person is arrested in respect of a criminal offence— (a) the person is entitled to apply to the court to be released on bail, and the court may grant that person bail on such conditions as the court considers reasonable; (b) in the case of an offence triable by subordinate courts, if that person has been on remand for sixty days before trial, that person shall be released on bail on reasonable conditions; (c) in the case of an offence triable only by the High Court, if that person has been on remand for one hundred and eighty days before the case is committed to the High Court, that person shall be released on bail on reasonable conditions.
(7) A person unlawfully arrested, restricted or detained shall be entitled to compensation from the person or authority causing the arrest.
(8) Where a person is convicted and sentenced to imprisonment, the period spent on remand shall be taken into account in determining the period of imprisonment.
(9) The right to an order of habeas corpus shall be inviolable and shall not be suspended.`,
        clauses: [
          { clauseNumber: '(1)-(2)', text: 'Deprivation of liberty only under authorized legal procedure and in authorized places.' },
          { clauseNumber: '(3)', text: 'Right to immediate reasons for arrest and legal representation.' },
          { clauseNumber: '(4)', text: 'Mandatory 48-Hour Rule for producing suspects before court.' },
          { clauseNumber: '(5)', text: 'Access to next-of-kin, medical doctors, and legal counsel.' },
          { clauseNumber: '(6)', text: 'Constitutional right to apply for bail; mandatory bail after 60/180 days on remand.' },
          { clauseNumber: '(7)', text: 'Right to compensation for unlawful detention.' },
          { clauseNumber: '(8)', text: 'Mandatory deduction of remand period from final prison sentence.' },
          { clauseNumber: '(9)', text: 'Inviolability of the writ of habeas corpus.' }
        ],
        keywords: ['personal liberty', '48 hour rule', 'bail', 'remand deduction', 'habeas corpus', 'safe houses'],
        keyCases: [
          'Foundation for Human Rights Initiative v Attorney General (2008) UGCC 1',
          'Grace Ibingira & Ors v Uganda [1966] EA 306',
          'Bukenya v Uganda (2017) UGSC 12',
          'Dr. Kizza Besigye v Uganda (2002) UGHC 1'
        ],
        relatedActs: ['Police Act Cap 303', 'Trial on Indictments Act Cap 23 S.14', 'Human Rights (Enforcement) Act 2019'],
        explanation: 'Comprehensive charter of personal liberty establishing the strict 48-hour rule, constitutional bail guarantees, remand deductions, and prohibition of ungazetted detention centres (safe houses).',
        keyPrinciples: ['Presumption of Liberty', '48-Hour Rule', 'Right to Apply for Bail', 'Habeas Corpus Inviolability'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 23', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 26',
        title: 'Protection from Deprivation of Property',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) Every person has a right to own property either individually or in association with others.
(2) No person shall be compulsorily deprived of property or any interest in or right over property of any description except where the following conditions are satisfied—
(a) the taking of possession or acquisition is necessary for public use or in the interest of defence, public safety, public order, public morality or public health; and
(b) the compulsory taking of possession or acquisition of property is made under a law which makes provision for—
(i) prompt payment of fair and adequate compensation, prior to the taking of possession or acquisition of the property; and
(ii) a right of access to a court of law by any person who has an interest or right over the property.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Right to own property individually or in association with others.' },
          { clauseNumber: '(2)(a)', text: 'Compulsory acquisition strictly limited to legitimate public interest purposes.' },
          { clauseNumber: '(2)(b)(i)', text: 'Mandatory PROMPT payment of FAIR and ADEQUATE compensation PRIOR to taking possession.' },
          { clauseNumber: '(2)(b)(ii)', text: 'Right of direct access to court of law to challenge valuation or acquisition.' }
        ],
        keywords: ['property rights', 'compulsory acquisition', 'prior compensation', 'eminent domain', 'public use'],
        keyCases: [
          'Uganda National Roads Authority (UNRA) v Asuman Irumba & Peter Magelah (2014) UGSC 14',
          'Advocates Coalition for Development and Environment (ACODE) v AG (2005)'
        ],
        relatedActs: ['Land Acquisition Act Cap 226', 'Land Act Cap 227 S.42'],
        explanation: 'In UNRA v Asuman Irumba, the Supreme Court struck down Section 7(1) of the Land Acquisition Act, holding that compensation MUST be paid PRIOR to the state taking possession of private land.',
        keyPrinciples: ['Individual Property Rights', 'Prior Adequate Compensation', 'Judicial Review of Expropriation'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 26', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 28',
        title: 'Right to a Fair Hearing',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) In the determination of civil rights and obligations or any criminal charge, a person shall be entitled to a fair, speedy and public hearing before an independent and impartial court or tribunal established by law.
(2) Nothing in clause (1) of this article shall prevent the court or tribunal from excluding the press or the public from all or any part of the proceedings for reasons of morality, public order or national security.
(3) Every person who is charged with a criminal offence shall—
(a) be presumed to be innocent until proved guilty or until that person has pleaded guilty;
(b) be informed immediately, in a language that the person understands and in detail, of the nature of the offence;
(c) be given adequate time and facilities for the preparation of his or her defence;
(d) be permitted to appear before the court in person or, at that person's own expense, by a lawyer of his or her choice;
(e) in the case of any offence which carries a sentence of death or imprisonment for life, be entitled to legal representation at the expense of the State;
(f) be afforded, without payment, the assistance of an interpreter if that person cannot understand or speak the language used at the trial;
(g) be afforded facilities to examine witnesses and obtain attendance of witnesses;
(h) not be compelled to give self-incriminating evidence.
(4) No person shall be held guilty of any criminal offence on account of any act or omission that did not, at the time it took place, constitute an offence (no retroactive criminal law).
(5) A person shall not be charged with or convicted of a criminal offence unless the offence is defined and the penalty for it is prescribed by law (principle of legality).
(6) No person shall be tried for a criminal offence if that person has been previously acquitted or convicted of that offence (rule against double jeopardy).`,
        clauses: [
          { clauseNumber: '(1)', text: 'Right to a fair, speedy, and public trial by an independent, impartial tribunal.' },
          { clauseNumber: '(3)(a)', text: 'Presumption of innocence until guilt proved beyond reasonable doubt.' },
          { clauseNumber: '(3)(b)-(d)', text: 'Detailed notice of charge, adequate facilities, and counsel of choice.' },
          { clauseNumber: '(3)(e)', text: 'State-funded legal aid (state brief) for capital and life imprisonment offences.' },
          { clauseNumber: '(3)(f)-(h)', text: 'Free court interpreter, witness examination, privilege against self-incrimination.' },
          { clauseNumber: '(4)-(5)', text: 'Principle of legality: No retroactive crimes; offences and penalties must be written in law.' },
          { clauseNumber: '(6)', text: 'Autrefois acquit and autrefois convict (Protection against double jeopardy).' }
        ],
        keywords: ['fair hearing', 'presumption of innocence', 'state brief', 'interpreter', 'double jeopardy', 'legality'],
        keyCases: [
          'Uganda Law Society v Attorney General (2006) UGCC 10',
          'David Tinyefuza v AG (1997) UGCC 3',
          'Woolmington v DPP [1935] AC 462',
          'Uganda v Thomas Kwoyelo (2018) UGICD 1'
        ],
        relatedActs: ['Trial on Indictments Act Cap 23', 'Magistrates Courts Act Cap 16', 'Evidence Act Cap 6'],
        explanation: 'Article 28 is a non-derogable right under Article 44(c). Guarantees the presumption of innocence, state-funded legal aid for capital trials, and prohibition of unwritten or retroactive crimes.',
        keyPrinciples: ['Presumption of Innocence', 'State Brief Representation', 'Non-Derogable Fair Trial', 'Legality'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 28', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 29',
        title: 'Protection of Freedom of Conscience, Expression, Movement, Assembly and Association',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) Every person shall have the right to—
(a) freedom of speech and expression which shall include freedom of the press and other media;
(b) freedom of thought, conscience and belief which shall include academic freedom in institutions of learning;
(c) freedom to practise any religion and manifest such practice which shall include the right to belong to and participate in the practices of any religious body or organisation;
(d) freedom to assemble and to demonstrate together with others peacefully and unarmed and to petition; and
(e) freedom of association which shall include the freedom to form and join associations or unions, including trade unions and other political and other civic organisations.
(2) Every Ugandan citizen shall have the right— (a) to move freely throughout Uganda and to reside and settle in any part of Uganda; (b) to enter, remain in and leave Uganda; and (c) to a passport or other travel document.`,
        clauses: [
          { clauseNumber: '(1)(a)', text: 'Freedom of speech, expression, press, and media.' },
          { clauseNumber: '(1)(b)', text: 'Freedom of thought, conscience, and academic freedom.' },
          { clauseNumber: '(1)(c)', text: 'Freedom of religion and worship.' },
          { clauseNumber: '(1)(d)', text: 'Freedom of peaceful, unarmed assembly and demonstration.' },
          { clauseNumber: '(1)(e)', text: 'Freedom of association and formation of trade unions and political parties.' },
          { clauseNumber: '(2)', text: 'Freedom of movement, right to reside anywhere in Uganda, and right to a passport.' }
        ],
        keywords: ['freedom of expression', 'freedom of the press', 'peaceful assembly', 'trade unions', 'passport rights'],
        keyCases: [
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1',
          'Muwanga Kivumbi v Attorney General (2008) UGCC 4',
          'Paul K. Ssemogerere & Zachary Olum v Attorney General (2000) UGSC 1'
        ],
        relatedActs: ['Press and Journalist Act Cap 105', 'Public Order Management Act 2013', 'Labour Unions Act 2006'],
        explanation: 'In Obbo & Mwenda, the Supreme Court struck down Section 50 of the Penal Code (false news) as an unconstitutional infringement of Article 29(1)(a). In Muwanga Kivumbi, police powers to prohibit public assemblies were nullified.',
        keyPrinciples: ['Freedom of Press and Speech', 'Peaceful Public Assembly', 'Democratic Expression Standard'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 29', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 42',
        title: 'Right to Just and Fair Administrative Treatment',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `Any person appearing before any administrative official or body has a right to be treated justly and fairly and shall have a right to apply to a court of law in respect of any administrative decision taken against him or her, or of any failure to take an administrative decision or of any administrative act performed or omitted to be performed.`,
        clauses: [
          { clauseNumber: 'Art 42', text: 'Right to just, fair, reasoned administrative action, and right to judicial review.' }
        ],
        keywords: ['administrative justice', 'judicial review', 'natural justice', 'fair treatment', 'reasoned decisions'],
        keyCases: [
          'John Jet Tumwebaze v Makerere University Council (2007) HCT-00-CV-MC-0021',
          'Ridge v Baldwin [1964] AC 40',
          'Amalgamated Properties v Attorney General [1976] HCB 44'
        ],
        relatedActs: ['Judicature Act Cap 13 S.36', 'Civil Procedure Rules Order 52'],
        explanation: 'Elevates common-law judicial review and the rules of natural justice to a constitutional right binding all public officers and statutory bodies.',
        keyPrinciples: ['Constitutional Right to Fair Hearing', 'Duty to Act Reasonably and Impartially', 'Judicial Review Redress'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 42', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 43',
        title: 'General Limitation on Fundamental Human Rights and Freedoms',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) In the enjoyment of the rights and freedoms prescribed in this Chapter, no person shall prejudice the fundamental or other human rights and freedoms of others or the public interest.
(2) Public interest under this article shall not permit—
(a) political persecution;
(b) detention without trial;
(c) any limitation of the enjoyment of the rights and freedoms prescribed by this Chapter beyond what is acceptably and demonstrably justifiable in a free and democratic society, or what is provided in this Constitution.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Rights must not prejudice rights of others or public interest.' },
          { clauseNumber: '(2)(a)-(b)', text: 'Public interest cannot justify political persecution or detention without trial.' },
          { clauseNumber: '(2)(c)', text: 'The Oakes / Obbo Test: Limitations must be demonstrably justifiable in a free and democratic society.' }
        ],
        keywords: ['limitation of rights', 'public interest', 'demonstrably justifiable in a free and democratic society'],
        keyCases: [
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1',
          'Muwanga Kivumbi v Attorney General (2008) UGCC 4'
        ],
        relatedActs: ['Human Rights (Enforcement) Act 2019'],
        explanation: 'The golden constitutional proportionality standard. The State bears the heavy burden to prove that any restriction on rights is strictly necessary and proportionate in a democratic society.',
        keyPrinciples: ['Proportionality Test', 'Strict Scrutiny', 'Prohibition of Detention Without Trial'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 43', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 44',
        title: 'Prohibition of Derogation from Particular Human Rights and Freedoms',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `Notwithstanding anything in this Constitution, there shall be no derogation from the enjoyment of the following rights and freedoms—
(a) freedom from torture and cruel, inhuman or degrading treatment or punishment;
(b) freedom from slavery or servitude;
(c) the right to fair hearing;
(d) the right to an order of habeas corpus.`,
        clauses: [
          { clauseNumber: '(a)', text: 'Absolute non-derogable freedom from torture, cruel, inhuman or degrading treatment.' },
          { clauseNumber: '(b)', text: 'Absolute non-derogable freedom from slavery or servitude.' },
          { clauseNumber: '(c)', text: 'Absolute non-derogable right to a fair hearing.' },
          { clauseNumber: '(d)', text: 'Absolute non-derogable right to an order of habeas corpus.' }
        ],
        keywords: ['non-derogable rights', 'torture', 'habeas corpus', 'fair hearing', 'state of emergency'],
        keyCases: [
          'Susan Kigula & 416 Ors v Attorney General (2009) UGSC 6',
          'Uganda Law Society v Attorney General (2006) UGCC 10',
          'Michael Kabaziguruka v Attorney General (2021) UGCC 14'
        ],
        relatedActs: ['Prevention and Prohibition of Torture Act 2012 (Act No. 3 of 2012)', 'Human Rights (Enforcement) Act 2019'],
        explanation: 'Lists the four absolute, non-derogable rights that cannot be suspended even during states of emergency, war, or public disasters.',
        keyPrinciples: ['Absolute Non-Derogability', 'Inviolability in Emergencies', 'Zero Tolerance for Torture'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 44', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 50',
        title: 'Enforcement of Rights and Freedoms by Courts',
        chapterNumber: 4,
        chapterTitle: 'Fundamental Human Rights and Freedoms',
        content: `(1) Any person who claims that a fundamental or other right or freedom guaranteed under this Constitution has been infringed or threatened, is entitled to apply to a competent court for redress which may include compensation.
(2) Any person or organisation may bring an action against the violation of another person’s or group’s human rights (Public Interest Litigation).
(3) Any person aggrieved by any decision of the court may appeal to the appropriate court.
(4) Parliament shall make laws for the enforcement of the rights and freedoms under this Chapter.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Right of direct application to competent court for redress and compensation.' },
          { clauseNumber: '(2)', text: 'Universal standing (Actio Popularis / Public Interest Standing).' },
          { clauseNumber: '(3)', text: 'Right of appeal against human rights rulings.' },
          { clauseNumber: '(4)', text: 'Parliamentary mandate enacted in Human Rights (Enforcement) Act 2019.' }
        ],
        keywords: ['human rights enforcement', 'public interest litigation', 'actio popularis', 'locus standi', 'compensation'],
        keyCases: [
          'Uganda Law Society v Attorney General (2006) UGCC 10',
          'Center for Health, Human Rights and Development (CEHURD) v AG (2015) UGSC 23',
          'Dr. Busingye v AG (2018)'
        ],
        relatedActs: ['Human Rights (Enforcement) Act 2019 (Act No. 8 of 2019)'],
        explanation: 'Enables any individual, advocate, or NGO to institute public interest litigation in court without showing personal victim status.',
        keyPrinciples: ['Public Interest Standing', 'Broad Judicial Remedies', 'Direct Human Rights Enforcement'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 50', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 5: REPRESENTATION OF THE PEOPLE
  {
    number: 5,
    title: 'Representation of the People',
    articles: [
      {
        number: 'Article 59',
        title: 'Right to Vote',
        chapterNumber: 5,
        chapterTitle: 'Representation of the People',
        content: `(1) Every citizen of Uganda of eighteen years of age or above has a right to vote.
(2) It is the duty of every citizen of Uganda of eighteen years of age or above to register as a voter for public elections and referenda.
(3) The State shall take all necessary steps to ensure that all citizens qualified to vote register and exercise their right to vote.
(4) Parliament shall make laws to provide for the facilitation of citizens with disabilities and other special needs to exercise their right to vote.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Universal adult suffrage for citizens aged 18+.' },
          { clauseNumber: '(2)', text: 'Civic duty of voter registration.' },
          { clauseNumber: '(3)', text: 'State duty to facilitate voting and registration.' },
          { clauseNumber: '(4)', text: 'Special voting accessibility for persons with disabilities.' }
        ],
        keywords: ['right to vote', 'universal adult suffrage', 'elections', 'disability voting facilitation'],
        keyCases: ['Amama Mbabazi v Yoweri Kaguta Museveni & 2 Ors (2016) UGSC 3'],
        relatedActs: ['Electoral Commission Act Cap 140', 'Presidential Elections Act 2005'],
        explanation: 'Guarantees universal adult suffrage and places an affirmative duty on the State to ensure electoral access for all citizens.',
        keyPrinciples: ['Universal Suffrage', 'Democratic Participation', 'Electoral Access for PWDs'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 59', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 60',
        title: 'Electoral Commission',
        chapterNumber: 5,
        chapterTitle: 'Representation of the People',
        content: `(1) There shall be an Electoral Commission which shall consist of a Chairperson, a Deputy Chairperson and five other members appointed by the President with the approval of Parliament.
(2) The members of the Commission shall be persons of high moral character and proven integrity.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Composition of Electoral Commission: 7 members appointed with Parliamentary approval.' },
          { clauseNumber: '(2)', text: 'Requirement of high moral character and proven integrity.' }
        ],
        keywords: ['electoral commission', 'appointment', 'electoral integrity', 'independence'],
        keyCases: ['Dr. Kizza Besigye v Electoral Commission & Yoweri Museveni (2006) UGSC 24'],
        relatedActs: ['Electoral Commission Act Cap 140'],
        explanation: 'Establishes the independent constitutional body responsible for organizing, conducting, and supervising all national elections and referenda.',
        keyPrinciples: ['Independent Electoral Administration', 'Constitutional Appointments'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 60 (As amended 2015)', 'Constitution', '2015', 'Current in Force')
      },
      {
        number: 'Article 69',
        title: 'Political Systems',
        chapterNumber: 5,
        chapterTitle: 'Representation of the People',
        content: `(1) The people of Uganda shall have the right to choose and adopt a political system of their choice through free and fair elections or referenda.
(2) The political systems referred to in clause (1) of this article shall include—
(a) the movement political system;
(b) the multi-party political system; and
(c) any other democratic and representative political system.`,
        clauses: [
          { clauseNumber: '(1)', text: 'People’s sovereign right to determine national political system.' },
          { clauseNumber: '(2)', text: 'Recognized political systems: Movement, Multi-party, or other representative systems.' }
        ],
        keywords: ['political systems', 'multi-party democracy', 'movement system', 'referendum'],
        keyCases: ['Paul K. Ssemogerere & Zachary Olum v Attorney General (2000) UGSC 1'],
        relatedActs: ['Political Parties and Organisations Act 2005'],
        explanation: 'Recognizes the right of Ugandans to adopt their preferred political system, providing the constitutional framework for the transition to multi-party democracy in 2005.',
        keyPrinciples: ['Democratic Pluralism', 'Right to Political Choice', 'Constitutional Systems'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 69 (As amended 2005)', 'Constitution', '2005', 'Current in Force')
      }
    ]
  },

  // CHAPTER 6: THE LEGISLATURE
  {
    number: 6,
    title: 'The Legislature',
    articles: [
      {
        number: 'Article 77',
        title: 'Parliament of Uganda',
        chapterNumber: 6,
        chapterTitle: 'The Legislature',
        content: `(1) There shall be a Parliament of Uganda.
(2) The composition and functions of Parliament shall be as prescribed by this Constitution.
(3) The term of Parliament shall be five years from the date of its first sitting after a general election.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Establishment of the Parliament of Uganda.' },
          { clauseNumber: '(3)', text: 'Five-year parliamentary tenure.' }
        ],
        keywords: ['parliament', 'legislative power', 'tenure of parliament'],
        keyCases: ['Male Mabirizi & Ors v Attorney General (2019) UGSC 3'],
        relatedActs: ['Administration of Parliament Act Cap 257'],
        explanation: 'In Male Mabirizi, the Supreme Court struck down Parliament\'s attempt to extend its own tenure from 5 to 7 years without citizen referenda.',
        keyPrinciples: ['Parliamentary Establishment', 'Fixed 5-Year Mandate', 'Democratic Accountability'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 77', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 79',
        title: 'Functions of Parliament',
        chapterNumber: 6,
        chapterTitle: 'The Legislature',
        content: `(1) Subject to the provisions of this Constitution, Parliament shall have power to make laws on any matter for the peace, order, development and good governance of Uganda.
(2) Except as provided in this Constitution, no person or body other than Parliament shall have power to make provisions having the force of law in Uganda except under authority conferred by an Act of Parliament.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Exclusive plenary power to enact laws for peace, order, and good governance.' },
          { clauseNumber: '(2)', text: 'Delegated subsidiary legislation strictly requires statutory authority from Parliament.' }
        ],
        keywords: ['functions of parliament', 'plenary legislative power', 'delegated legislation', 'statutory authority'],
        keyCases: ['Oloka-Onyango & 9 Ors v Attorney General (2014) UGCC 14'],
        relatedActs: ['Acts of Parliament (All)'],
        explanation: 'Vests exclusive law-making authority in Parliament and prohibits any executive decree from having the force of law without statutory authorization.',
        keyPrinciples: ['Exclusive Legislative Supremacy', 'Prohibition of Executive Law-Making', 'Delegated Powers Oversight'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 79', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 7: THE EXECUTIVE
  {
    number: 7,
    title: 'The Executive',
    articles: [
      {
        number: 'Article 98',
        title: 'The President of Uganda',
        chapterNumber: 7,
        chapterTitle: 'The Executive',
        content: `(1) There shall be a President of Uganda who shall be the Head of State, Head of Government and Commander-in-Chief of the Uganda Peoples’ Defence Forces and the Fountain of Honour.
(2) The President shall take precedence over all persons in Uganda.
(4) While holding office, the President shall not be liable to proceedings in any court (Presidential Immunity).
(5) Civil or criminal proceedings may be instituted against a person after ceasing to hold office as President in respect of anything done in a personal capacity.`,
        clauses: [
          { clauseNumber: '(1)', text: 'President is Head of State, Head of Government, Commander-in-Chief, and Fountain of Honour.' },
          { clauseNumber: '(4)', text: 'Presidential immunity from court proceedings while holding office.' },
          { clauseNumber: '(5)', text: 'Legal proceedings permitted after leaving office for acts in personal capacity.' }
        ],
        keywords: ['president', 'head of state', 'commander-in-chief', 'fountain of honour', 'presidential immunity'],
        keyCases: ['Dr. Kizza Besigye v Yoweri Museveni & Electoral Commission (2001) UGSC 3'],
        relatedActs: ['Presidential Elections Act 2005', 'Presidential Emoluments and Benefits Act'],
        explanation: 'Defines the executive authority of the President and establishes presidential immunity during tenure, while clarifying that immunity ceases upon vacating office for private acts.',
        keyPrinciples: ['Executive Leadership', 'Presidential Immunity', 'Fountain of Honour'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 98', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 99',
        title: 'Executive Authority of Uganda',
        chapterNumber: 7,
        chapterTitle: 'The Executive',
        content: `(1) The executive authority of Uganda is vested in the President and shall be exercised in accordance with this Constitution and the laws of Uganda.
(2) The executive authority shall extend to the execution and maintenance of this Constitution and all laws made under or continued in force by this Constitution.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Executive authority vested in President to be exercised under the Constitution.' },
          { clauseNumber: '(2)', text: 'Executive duty to maintain and execute the Constitution and laws of Uganda.' }
        ],
        keywords: ['executive authority', 'execution of laws', 'constitutional execution'],
        keyCases: ['Attorney General v Major General David Tinyefuza (1998) UGSC 2'],
        relatedActs: ['Public Finance Management Act 2015'],
        explanation: 'Confers executive power on the President, subordinate to the Constitution and statutory limitations imposed by Parliament.',
        keyPrinciples: ['Executive Power Bound by Law', 'Separation of Powers'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 99', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 102',
        title: 'Qualifications of the President',
        chapterNumber: 7,
        chapterTitle: 'The Executive',
        content: `A person is qualified for election as President if that person—
(a) is a citizen of Uganda by birth;
(b) is a registered voter; and
(c) has completed a minimum formal education of Advanced Level standard or its equivalent.`,
        clauses: [
          { clauseNumber: '(a)', text: 'Must be a Ugandan citizen by birth.' },
          { clauseNumber: '(b)', text: 'Must be a registered voter.' },
          { clauseNumber: '(c)', text: 'Minimum formal education of A-Level standard or verified equivalent.' }
        ],
        keywords: ['presidential qualifications', 'citizenship by birth', 'A Level standard', 'registered voter'],
        keyCases: ['Male Mabirizi & Ors v Attorney General (2019) UGSC 3'],
        relatedActs: ['Presidential Elections Act 2005 S.4'],
        explanation: 'Following the 2018 amendment and Supreme Court affirmation in Male Mabirizi, the former 35-year lower and 75-year upper age restrictions were repealed.',
        keyPrinciples: ['Eligibility for Public Office', 'Educational Threshold', 'Citizen Suffrage Qualification'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 102 (As amended 2018)', 'Constitution', '2018', 'Current in Force')
      }
    ]
  },

  // CHAPTER 8: THE JUDICIARY
  {
    number: 8,
    title: 'The Judiciary',
    articles: [
      {
        number: 'Article 126',
        title: 'Exercise of Judicial Power',
        chapterNumber: 8,
        chapterTitle: 'The Judiciary',
        content: `(1) Judicial power is derived from the people and shall be exercised by the courts established under this Constitution in the name of the people and in conformity with law and with the values, norms and aspirations of the people.
(2) In adjudicating cases of both a civil and criminal nature, the courts shall, subject to the law, apply the following principles—
(a) justice shall be done to all irrespective of their social or economic status;
(b) justice shall not be delayed;
(c) adequate compensation shall be awarded to victims of wrongs;
(d) reconciliation between parties shall be promoted; and
(e) substantive justice shall be administered without undue regard to technicalities.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Judicial power derives from the people and is exercised in their name.' },
          { clauseNumber: '(2)(a)', text: 'Equality of all before courts regardless of status.' },
          { clauseNumber: '(2)(b)', text: 'Prohibition of unreasonable judicial delay (speedy justice).' },
          { clauseNumber: '(2)(c)', text: 'Adequate compensation for victims.' },
          { clauseNumber: '(2)(d)', text: 'Promotion of Alternative Dispute Resolution (ADR) and reconciliation.' },
          { clauseNumber: '(2)(e)', text: 'Substantive justice overrules procedural technicalities (Article 126(2)(e)).' }
        ],
        keywords: ['judicial power', 'substantive justice', 'technicalities', 'speedy trial', 'ADR', 'reconciliation'],
        keyCases: [
          'Kasirye Byaruhanga & Co Advocates v Uganda Development Bank (2007) UGSC 2',
          'Stephen Mabosi v Uganda Revenue Authority (1995) UGCA',
          'Auto Garage v Motokov (No. 3) [1971] EA 514'
        ],
        relatedActs: ['Judicature Act Cap 13', 'Civil Procedure Act Cap 71', 'Arbitration and Conciliation Act Cap 4'],
        explanation: 'Article 126(2)(e) is Uganda\'s most frequently cited procedural principle, instructing courts to resolve disputes on their substantive merits rather than dismissing suits on minor technical errors.',
        keyPrinciples: ['Substantive Justice over Technicalities', 'Public Derivation of Judicial Power', 'Speedy Adjudication'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 126', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 128',
        title: 'Independence of the Judiciary',
        chapterNumber: 8,
        chapterTitle: 'The Judiciary',
        content: `(1) In the exercise of judicial power, the courts shall be independent and shall not be subject to the control or direction of any person or authority.
(2) No person or authority shall interfere with the courts or judicial officers in the exercise of their judicial functions.
(3) All organs and agencies of the State shall accord to the courts such assistance as may be required to ensure the effectiveness of the courts.
(4) A person exercising judicial power shall not be liable to any action or suit for any act or omission done by that person in the exercise of judicial power (Judicial Immunity).
(7) The administrative expenses of the Judiciary, including all salaries, allowances and pensions payable to judicial officers, shall be charged on the Consolidated Fund (Financial Autonomy).`,
        clauses: [
          { clauseNumber: '(1)-(2)', text: 'Absolute judicial independence from executive, legislative, or private interference.' },
          { clauseNumber: '(3)', text: 'State duty to enforce and assist court orders.' },
          { clauseNumber: '(4)', text: 'Judicial immunity from civil and criminal suits for judicial decisions.' },
          { clauseNumber: '(7)', text: 'Direct Consolidated Fund financing guaranteeing financial autonomy.' }
        ],
        keywords: ['judicial independence', 'non-interference', 'judicial immunity', 'Consolidated Fund', 'rule of law'],
        keyCases: [
          'Uganda Law Society v Attorney General (2006) UGCC 10 (Black Mambas Siege Case)',
          'Dr. Kizza Besigye v Attorney General (2007) UGCC'
        ],
        relatedActs: ['Administration of the Judiciary Act 2020 (Act No. 8 of 2020)'],
        explanation: 'Guarantees the institutional, financial, and individual independence of the Ugandan judiciary and prohibits military or executive interference in court premises.',
        keyPrinciples: ['Institutional Judicial Independence', 'Judicial Immunity', 'Direct Consolidated Fund Security'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 128', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 132',
        title: 'Jurisdiction of the Supreme Court of Uganda',
        chapterNumber: 8,
        chapterTitle: 'The Judiciary',
        content: `(1) The Supreme Court shall be the final court of appeal in Uganda.
(2) An appeal shall lie to the Supreme Court from such decisions of the Court of Appeal as may be prescribed by law.
(3) Any party aggrieved by a decision of the Court of Appeal sitting as a Constitutional Court is entitled to appeal to the Supreme Court as of right.
(4) The Supreme Court may, while treating its own previous decisions as normally binding, depart from a previous decision when it appears to it right to do so; and all other courts shall be bound to follow the decisions of the Supreme Court on questions of law (Stare Decisis).`,
        clauses: [
          { clauseNumber: '(1)', text: 'Supreme Court is the apex and final court of appeal.' },
          { clauseNumber: '(3)', text: 'Automatic right of appeal in constitutional matters.' },
          { clauseNumber: '(4)', text: 'Apex binding precedent (Stare Decisis); Supreme Court departure power.' }
        ],
        keywords: ['Supreme Court', 'final court of appeal', 'stare decisis', 'constitutional appeals', 'precedent'],
        keyCases: [
          'Major General David Tinyefuza v Attorney General (1998) UGSC 2',
          'Bank of Uganda v Crane Bank Ltd (In Receivership) (2022) UGSC 13'
        ],
        relatedActs: ['Judicature Act Cap 13 S.3-10', 'Judicature (Supreme Court Rules) Directions S.I. 13-11'],
        explanation: 'Article 132(4) codifies the doctrine of judicial precedent in Uganda, establishing that Supreme Court rulings bind all subordinate courts in the country.',
        keyPrinciples: ['Apex Appellate Finality', 'Doctrine of Stare Decisis', 'Constitutional Appeals as of Right'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 132', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 137',
        title: 'Questions as to the Interpretation of the Constitution',
        chapterNumber: 8,
        chapterTitle: 'The Judiciary',
        content: `(1) Any question as to the interpretation of this Constitution shall be determined by the Court of Appeal sitting as the Constitutional Court.
(2) When sitting as a Constitutional Court, the Court of Appeal shall consist of a bench of five members of that Court.
(3) A person who alleges that—
(a) an Act of Parliament or any other law or anything in or done under the authority of any law; or
(b) any act or omission by any person or authority,
is inconsistent with or in contravention of a provision of this Constitution, may petition the Constitutional Court for a declaration to that effect, and for redress where appropriate.
(5) Where any question as to the interpretation of this Constitution arises in any proceedings in a court of law other than a Field Court Martial, that court—
(a) may, if it considers that the question is substantial; and
(b) shall, if any party to the proceedings requests it, refer the question to the Constitutional Court for decision.`,
        clauses: [
          { clauseNumber: '(1)-(2)', text: 'Exclusive original jurisdiction for constitutional interpretation in Constitutional Court (coram of 5).' },
          { clauseNumber: '(3)', text: 'Constitutional Petitions challenging laws, executive acts, or omissions.' },
          { clauseNumber: '(5)', text: 'Constitutional Reference from trial courts to Constitutional Court.' }
        ],
        keywords: ['constitutional interpretation', 'Constitutional Court', 'constitutional petition', 'constitutional reference'],
        keyCases: [
          'Major General David Tinyefuza v Attorney General (1997) UGCC 3',
          'Charles Onyango Obbo & Andrew Mwenda v Attorney General (2004) UGSC 1',
          'Ismail Serugo v Kampala City Council (1998) UGSC 2'
        ],
        relatedActs: ['Constitutional Court (Petitions and References) Rules S.I. 13-15'],
        explanation: 'The exclusive constitutional gateway in Uganda for striking down unconstitutional statutes, subsidiary legislation, or executive actions under Article 137(3).',
        keyPrinciples: ['Exclusive Constitutional Jurisdiction', 'Constitutional Petitions & References', 'Judicial Review of Legislation'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 137', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 9: FINANCE
  {
    number: 9,
    title: 'Finance',
    articles: [
      {
        number: 'Article 152',
        title: 'Taxation and Imposition of Taxes',
        chapterNumber: 9,
        chapterTitle: 'Finance',
        content: `(1) No tax shall be imposed except under the authority of an Act of Parliament.
(2) Where a law enacted under clause (1) of this article confers powers on any person or authority to waive or vary a tax imposed by that law, that person or authority shall report to Parliament periodically on the exercise of those powers.`,
        clauses: [
          { clauseNumber: '(1)', text: 'No taxation without Parliamentary legislation.' },
          { clauseNumber: '(2)', text: 'Mandatory reporting to Parliament on tax waivers and exemptions.' }
        ],
        keywords: ['taxation', 'no taxation without representation', 'tax waivers', 'statutory authority'],
        keyCases: ['Uganda Revenue Authority v Uganda Consolidated Properties (2000) UGSC 14'],
        relatedActs: ['Income Tax Act Cap 340', 'Value Added Tax Act Cap 349', 'Tax Procedures Code Act 2014'],
        explanation: 'Codifies the core democratic principle of "No Taxation without Representation", requiring express statutory authorization for all national taxes.',
        keyPrinciples: ['Legality of Taxation', 'Parliamentary Financial Control'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 152', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 153',
        title: 'Consolidated Fund',
        chapterNumber: 9,
        chapterTitle: 'Finance',
        content: `(1) There shall be a Consolidated Fund into which shall be paid all revenues or other moneys raised or received for the purpose of, or on behalf of, or in trust for the Government.
(2) The revenues or other moneys referred to in clause (1) of this article shall not include revenues or other moneys that are payable by or under an Act of Parliament into some other fund established for a specific purpose.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Consolidated Fund holds all national state revenue.' },
          { clauseNumber: '(2)', text: 'Special statutory funds exception.' }
        ],
        keywords: ['Consolidated Fund', 'public revenues', 'statutory withdrawals'],
        keyCases: ['Severino Twinobusingye v Attorney General (2011) UGCC 1'],
        relatedActs: ['Public Finance Management Act 2015 S.14'],
        explanation: 'Establishes the central national repository for public funds and prohibits unauthorized withdrawals without Parliamentary Appropriation.',
        keyPrinciples: ['Treasury Unity', 'Parliamentary Appropriation Oversight'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 153', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 10: THE PUBLIC SERVICE
  {
    number: 10,
    title: 'The Public Service',
    articles: [
      {
        number: 'Article 165',
        title: 'Public Service Commission',
        chapterNumber: 10,
        chapterTitle: 'The Public Service',
        content: `(1) There shall be a Public Service Commission for Uganda.
(2) The Commission shall consist of a Chairperson, a Deputy Chairperson and seven other members appointed by the President with the approval of Parliament.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Establishment of Public Service Commission.' },
          { clauseNumber: '(2)', text: 'Composition of 9 members appointed with Parliamentary approval.' }
        ],
        keywords: ['public service', 'civil service', 'appointments', 'disciplinary control'],
        keyCases: ['Fox Odoi & Anor v Attorney General (2003) UGCC'],
        relatedActs: ['Public Service Act 2008'],
        explanation: 'Establishes the body regulating recruitment, promotion, and disciplinary standards across the national public service.',
        keyPrinciples: ['Merit-Based Public Service', 'Constitutional Appointments'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 165', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 11: LOCAL GOVERNMENT
  {
    number: 11,
    title: 'Local Government',
    articles: [
      {
        number: 'Article 176',
        title: 'Local Government System in Uganda',
        chapterNumber: 11,
        chapterTitle: 'Local Government',
        content: `(1) The system of local government in Uganda shall be based on the district as a unit under which there shall be such lower local governments and administrative units as Parliament may by law provide.
(2) The following principles shall apply to the local government system—
(a) the system shall be such as to ensure that functions, powers and responsibilities are devolved and transferred from the Government to local government units in a coordinated manner (Devolution of Power);
(b) decentralisation shall be a principle applying to all levels of local government;
(c) the system shall ensure the full realisation of democratic governance at all local levels.`,
        clauses: [
          { clauseNumber: '(1)', text: 'District is primary local government unit.' },
          { clauseNumber: '(2)(a)', text: 'Devolution of powers and functions to local government.' },
          { clauseNumber: '(2)(b)', text: 'Principle of democratic decentralization.' }
        ],
        keywords: ['local government', 'decentralization', 'devolution', 'district councils'],
        keyCases: ['Kampala District Land Board v Venansio Babweyaka (2007) UGSC 2'],
        relatedActs: ['Local Governments Act Cap 243'],
        explanation: 'Enshrines decentralization and devolution of governance, administrative, and fiscal authority to district councils across Uganda.',
        keyPrinciples: ['Democratic Decentralization', 'Subsidiarity and Devolution'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 176', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 12: DEFENSE AND NATIONAL SECURITY
  {
    number: 12,
    title: 'Defense and National Security',
    articles: [
      {
        number: 'Article 208',
        title: 'Uganda Peoples’ Defence Forces (UPDF)',
        chapterNumber: 12,
        chapterTitle: 'Defense and National Security',
        content: `(1) There shall be armed forces to be known as the Uganda Peoples’ Defence Forces.
(2) The Uganda Peoples’ Defence Forces shall be a non-partisan force, national in character, patriotic, professional, disciplined, productive and subordinate to the civilian authority as established under this Constitution.
(3) No person shall raise an armed force except in accordance with this Constitution or an Act of Parliament.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Establishment of UPDF national armed forces.' },
          { clauseNumber: '(2)', text: 'Non-partisan, professional character subordinate to civilian authority.' },
          { clauseNumber: '(3)', text: 'Prohibition of illegal militias and unauthorized armed groups.' }
        ],
        keywords: ['UPDF', 'national defense', 'civilian subordination', 'non-partisan military'],
        keyCases: [
          'Major General David Tinyefuza v Attorney General (1997) UGCC 3',
          'Michael Kabaziguruka v Attorney General (2021) UGCC 14'
        ],
        relatedActs: ['Uganda Peoples’ Defence Forces Act 2005 (Act No. 7 of 2005)'],
        explanation: 'In Michael Kabaziguruka, the Constitutional Court reaffirmed that UPDF military courts martial cannot try civilians, upholding civilian subordination.',
        keyPrinciples: ['Subordination of Military to Civilian Authority', 'Non-Partisanship', 'Constitutional Armed Forces'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 208', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 13: INSPECTORATE OF GOVERNMENT
  {
    number: 13,
    title: 'Inspectorate of Government',
    articles: [
      {
        number: 'Article 223',
        title: 'Establishment of Inspectorate of Government (IGG)',
        chapterNumber: 13,
        chapterTitle: 'Inspectorate of Government',
        content: `(1) There shall be an Inspectorate of Government.
(2) The Inspectorate of Government shall consist of— (a) the Inspector General of Government; and (b) such number of Deputy Inspectors General as Parliament may prescribe.
(3) At least one of the persons referred to in clause (2) of this article shall be a person qualified to be appointed a Judge of the High Court.`,
        clauses: [
          { clauseNumber: '(1)-(2)', text: 'Establishment of IGG and Deputy IGGs.' },
          { clauseNumber: '(3)', text: 'Requirement for High Court judicial qualification.' }
        ],
        keywords: ['IGG', 'Inspectorate of Government', 'anti-corruption', 'ombudsman'],
        keyCases: ['Sam Kutesa & 2 Ors v Attorney General (2012) UGCC 3'],
        relatedActs: ['Inspectorate of Government Act 2002', 'Leadership Code Act 2002'],
        explanation: 'Constitutes the premier national ombudsman and anti-corruption agency in Uganda with prosecutorial and investigatory powers.',
        keyPrinciples: ['Anti-Corruption Oversight', 'Public Sector Accountability', 'Constitutional Ombudsman'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 223', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 225',
        title: 'Functions of Inspectorate',
        chapterNumber: 13,
        chapterTitle: 'Inspectorate of Government',
        content: `(1) The functions of the Inspectorate of Government shall include—
(a) to promote and foster strict adherence to the rule of law and principles of natural justice in administration;
(b) to eliminate and foster the elimination of corruption, abuse of authority and of public office;
(c) to promote fair, efficient and good governance in public offices;
(d) to supervise the enforcement of the Leadership Code of Conduct;
(e) to investigate any act, omission, advice or recommendation by any public officer; and
(f) to stimulate public awareness about the values of constitutionalism and the evils of corruption.`,
        clauses: [
          { clauseNumber: '(a)-(b)', text: 'Promote rule of law and eliminate corruption and abuse of office.' },
          { clauseNumber: '(c)-(d)', text: 'Good governance promotion and Leadership Code enforcement.' },
          { clauseNumber: '(e)-(f)', text: 'Administrative investigations and civic awareness.' }
        ],
        keywords: ['functions of IGG', 'anti-corruption', 'leadership code', 'investigation of public officers'],
        keyCases: ['Uganda v Geoffrey Kazinda (2014) UGHC'],
        relatedActs: ['Anti-Corruption Act 2009', 'Leadership Code Act 2002'],
        explanation: 'Vests comprehensive investigatory, prosecutorial, and ombudsman authority in the IGG.',
        keyPrinciples: ['Good Governance', 'Zero Tolerance for Public Corruption', 'Leadership Integrity'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 225', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 14: LEADERSHIP CODE OF CONDUCT
  {
    number: 14,
    title: 'Leadership Code of Conduct',
    articles: [
      {
        number: 'Article 233',
        title: 'Leadership Code of Conduct',
        chapterNumber: 14,
        chapterTitle: 'Leadership Code of Conduct',
        content: `(1) Parliament shall by law establish a Leadership Code of Conduct for persons holding such offices as may be specified by Parliament.
(2) The Leadership Code of Conduct shall—
(a) require specified officers to declare their incomes, assets and liabilities periodically;
(b) prohibit conduct likely to compromise the honesty, impartiality and integrity of specified officers;
(c) prescribe penalties for breach of the Code including forfeiture of assets and dismissal from office.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Parliamentary mandate to enact Leadership Code.' },
          { clauseNumber: '(2)(a)', text: 'Mandatory periodic declaration of incomes, assets, and liabilities.' },
          { clauseNumber: '(2)(b)-(c)', text: 'Prohibition of conflicts of interest and penalties including asset forfeiture.' }
        ],
        keywords: ['leadership code', 'asset declaration', 'conflict of interest', 'forfeiture of illicit wealth'],
        keyCases: ['Fox Odoi-Oywelowo & Anor v Attorney General (2003) UGCC 2'],
        relatedActs: ['Leadership Code Act 2002', 'Leadership Code (Amendment) Act 2017 & 2021'],
        explanation: 'Mandates biannual asset declarations for political and public leaders and prohibits illicit enrichment.',
        keyPrinciples: ['Public Sector Integrity', 'Asset Transparency', 'Illicit Wealth Forfeiture'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 233', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 15: LAND AND ENVIRONMENT
  {
    number: 15,
    title: 'Land and Environment',
    articles: [
      {
        number: 'Article 237',
        title: 'Land Ownership and Tenure Systems in Uganda',
        chapterNumber: 15,
        chapterTitle: 'Land and Environment',
        content: `(1) Land in Uganda belongs to the citizens of Uganda and shall vest in them in accordance with the land tenure systems provided for in this Constitution.
(2) Notwithstanding clause (1) of this article—
(a) the Government or a local government may, subject to article 26 of this Constitution, acquire land in the public interest; and the conditions governing such acquisition shall be as prescribed by Parliament;
(b) the Government or a local government as determined by Parliament shall hold in trust for the people and protect natural lakes, rivers, wetlands, forest reserves, game reserves and national parks for the common good of all citizens (Public Trust Doctrine).
(3) Land in Uganda shall be owned in accordance with the following land tenure systems—
(a) Customary;
(b) Freehold;
(c) Mailo; and
(d) Leasehold.
(4) On the coming into force of this Constitution— (a) all Uganda citizens owning land under customary tenure may acquire certificates of customary ownership; and (b) land held under customary tenure may be converted to freehold land ownership.
(7) Non-citizens of Uganda may acquire only leases in land in accordance with law for a period not exceeding ninety-nine years.
(8) Upon the coming into force of this Constitution and until Parliament enacts an appropriate law under clause (9) of this article, the lawful or bona fide occupants of mailo land, freehold or leasehold land shall enjoy security of occupancy on the land.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Land in Uganda belongs to the citizens of Uganda and vests in them.' },
          { clauseNumber: '(2)(b)', text: 'Public Trust Doctrine: Government holds natural resources, lakes, wetlands, and forests in trust for all citizens.' },
          { clauseNumber: '(3)', text: 'Four constitutionally recognized tenure systems: Customary, Freehold, Mailo, Leasehold.' },
          { clauseNumber: '(4)', text: 'Customary certificates and conversion of customary land to freehold.' },
          { clauseNumber: '(7)', text: 'Non-citizens can only hold leaseholds up to 99 years; cannot own mailo/freehold.' },
          { clauseNumber: '(8)', text: 'Constitutional security of occupancy for lawful and bona fide occupants (tenants).' }
        ],
        keywords: ['land ownership', 'customary tenure', 'freehold', 'mailo', 'leasehold', 'public trust doctrine', 'bonafide occupant'],
        keyCases: [
          'Hilda Wilson Namusoke & 3 Ors v Owalla’s Home Hotel Ltd [2018] UGSC 54',
          'Advocates Coalition for Development and Environment (ACODE) v AG (2005)',
          'Alice Okiror v Global Capital Ltd [2012] UGCOMMC 142'
        ],
        relatedActs: ['Land Act Cap 227', 'Registration of Titles Act Cap 230', 'National Environment Act 2019'],
        explanation: 'The cornerstone of Ugandan real property law. Reverses colonial vesting by declaring all land belongs to citizens, establishes the four tenure systems, constitutionalizes the Public Trust Doctrine, and protects bona fide tenants.',
        keyPrinciples: ['Citizen Land Ownership', 'Four Land Tenures', 'Public Trust Doctrine', 'Bona Fide Occupant Protection'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 237', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 245',
        title: 'Protection and Preservation of the Environment',
        chapterNumber: 15,
        chapterTitle: 'Land and Environment',
        content: `Parliament shall, by law, provide for measures intended—
(a) to protect and preserve the environment from abuse, pollution and degradation;
(b) to manage the environment for sustainable development; and
(c) to promote environmental awareness.`,
        clauses: [
          { clauseNumber: '(a)', text: 'Protection against environmental pollution and degradation.' },
          { clauseNumber: '(b)', text: 'Sustainable ecological management.' },
          { clauseNumber: '(c)', text: 'Promotion of national environmental education and awareness.' }
        ],
        keywords: ['environment', 'pollution', 'sustainable development', 'NEMA', 'ecological protection'],
        keyCases: ['Greenwatch v Attorney General & NEMA (2002) UGHC 28'],
        relatedActs: ['National Environment Act 2019 (Act No. 5 of 2019)'],
        explanation: 'Constitutional anchor for Uganda\'s environmental framework, executed by NEMA and the National Environment Act 2019.',
        keyPrinciples: ['Ecological Sustainability', 'Intergenerational Equity', 'Polluter Pays Principle'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 245', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 16: INSTITUTIONAL AND CUSTOMARY AUTHORITIES
  {
    number: 16,
    title: 'Traditional / Cultural Leaders',
    articles: [
      {
        number: 'Article 246',
        title: 'Institution of Traditional or Cultural Leaders',
        chapterNumber: 16,
        chapterTitle: 'Traditional or Cultural Leaders',
        content: `(1) Subject to this Constitution, the institution of traditional leader or cultural leader may exist in any area of Uganda in accordance with the culture, customs and traditions of the people to whom it applies.
(2) In any community, where the people wish to restore or establish a traditional leader or cultural leader, the issue shall be determined by the people themselves.
(3) The following provisions shall apply in relation to traditional leaders or cultural leaders—
(a) the institution shall be a non-partisan institution and shall not exercise any administrative, legislative or executive powers of Government;
(b) a person shall not, while remaining a traditional leader, join or participate in partisan politics;
(c) a traditional leader shall enjoy such privileges and benefits as may be conferred by Parliament.`,
        clauses: [
          { clauseNumber: '(1)-(2)', text: 'Recognition and restoration of cultural leaders by community choice.' },
          { clauseNumber: '(3)(a)-(b)', text: 'Strict prohibition on partisan politics and exercise of state administrative powers.' },
          { clauseNumber: '(3)(c)', text: 'Parliamentary authorization of privileges and benefits.' }
        ],
        keywords: ['traditional leaders', 'cultural institutions', 'Kabaka', 'non-partisan culture', 'cultural heritage'],
        keyCases: ['Prince David Wasajja v James Mulwana & Ors (2008) UGHC'],
        relatedActs: ['Institution of Traditional or Cultural Leaders Act 2011'],
        explanation: 'Restores customary monarchies and cultural leaders while strictly separating cultural leadership from partisan political competition.',
        keyPrinciples: ['Cultural Pluralism', 'Separation of Cultural Leadership from Partisan Politics'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 246', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 17: GENERAL AND MISCELLANEOUS
  {
    number: 17,
    title: 'General and Miscellaneous Provisions',
    articles: [
      {
        number: 'Article 257',
        title: 'Interpretation and Definitions of Terms',
        chapterNumber: 17,
        chapterTitle: 'General and Miscellaneous Provisions',
        content: `(1) In this Constitution, unless the context otherwise requires—
"Act of Parliament" means a law made by Parliament;
"article" means an article of this Constitution;
"Chief Justice" means the Chief Justice of Uganda;
"court" means a court of judicature established by or under this Constitution;
"district" means a district referred to in article 5 of this Constitution;
"oath" includes affirmation;
"public office" means an office in the public service;
"public officer" means a person holding or acting in any public office;
"public service" means service in any civil capacity of the Government;
"session" means a series of sittings of Parliament;
"sitting" includes a period during which Parliament is sitting continuously without adjournment.`,
        clauses: [
          { clauseNumber: 'Art 257', text: 'Constitutional statutory definitions and construction rules.' }
        ],
        keywords: ['definitions', 'interpretation of terms', 'public officer', 'statutory definitions'],
        keyCases: ['Ismail Serugo v Kampala City Council (1998) UGSC 2'],
        relatedActs: ['Interpretation Act Cap 3'],
        explanation: 'Provides authoritative constitutional definitions for words and terms employed throughout the 1995 Constitution.',
        keyPrinciples: ['Constitutional Construction', 'Statutory Precision'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 257', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 18: AMENDMENT OF THE CONSTITUTION
  {
    number: 18,
    title: 'Amendment of the Constitution',
    articles: [
      {
        number: 'Article 258',
        title: 'Amendment of the Constitution',
        chapterNumber: 18,
        chapterTitle: 'Amendment of the Constitution',
        content: `(1) Subject to the provisions of this Constitution, Parliament may amend by way of addition, variation or repeal, any provision of this Constitution in accordance with the procedure laid down in this Chapter.
(2) This Constitution shall not be amended by implication (prohibition of implied constitutional amendment).`,
        clauses: [
          { clauseNumber: '(1)', text: 'Parliamentary power to amend Constitution following prescribed procedures.' },
          { clauseNumber: '(2)', text: 'Absolute prohibition of implied constitutional amendments.' }
        ],
        keywords: ['amendment of constitution', 'no implied amendment', 'constitutional amendment procedure'],
        keyCases: [
          'Paul K. Ssemogerere & Zachary Olum v Attorney General (2004) UGSC 1',
          'Male Mabirizi & Ors v Attorney General (2019) UGSC 3'
        ],
        relatedActs: ['Acts of Parliament Act Cap 2'],
        explanation: 'In Ssemogerere (2004) and Male Mabirizi (2019), the Supreme Court ruled that constitutional amendments must strictly comply with mandatory procedures and cannot be achieved implicitly or through ordinary legislation.',
        keyPrinciples: ['Strict Amendment Formalism', 'Prohibition of Implied Amendment', 'Basic Structure Safeguards'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 258', 'Constitution', '1995', 'Current in Force')
      },
      {
        number: 'Article 259',
        title: 'Amendments Requiring a Referendum',
        chapterNumber: 18,
        chapterTitle: 'Amendment of the Constitution',
        content: `(1) A bill for an Act of Parliament seeking to amend any of the provisions specified in clause (2) of this article shall not be taken as passed unless—
(a) it is supported at the second and third readings in Parliament by not less than two-thirds of all members of Parliament; and
(b) it has been referred to a decision of the people and approved by them in a referendum.
(2) The provisions referred to in clause (1) of this article include—
(a) Chapter 1 (Articles 1, 2);
(b) Chapter 4 (Articles 20, 26, 44);
(c) Chapter 5 (Article 69);
(d) Chapter 6 (Article 79(2));
(e) Chapter 7 (Article 105(1));
(f) Chapter 8 (Article 128(1));
(g) Chapter 16.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Two-thirds Parliamentary majority AND national referendum approval.' },
          { clauseNumber: '(2)', text: 'Entrenched articles on sovereignty, fundamental rights, judiciary independence, and political systems.' }
        ],
        keywords: ['referendum', 'entrenched provisions', 'two-thirds majority', 'constitutional sanctity'],
        keyCases: ['Male Mabirizi & Ors v Attorney General (2019) UGSC 3'],
        relatedActs: ['Referendum and other Provisions Act 2005'],
        explanation: 'Lists deeply entrenched core constitutional provisions that can only be altered through a direct national referendum of the Ugandan electorate.',
        keyPrinciples: ['Entrenchment of Core Norms', 'Direct Democracy Referendum Mandate'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 259', 'Constitution', '1995', 'Current in Force')
      }
    ]
  },

  // CHAPTER 19: TRANSITIONAL PROVISIONS
  {
    number: 19,
    title: 'Transitional Provisions',
    articles: [
      {
        number: 'Article 274',
        title: 'Existing Law and Conformity with Constitution',
        chapterNumber: 19,
        chapterTitle: 'Transitional Provisions',
        content: `(1) Subject to the provisions of this article, the operation of the existing law after the coming into force of this Constitution shall not be affected by the coming into force of this Constitution but the existing law shall be construed with such modifications, adaptations, qualifications and exceptions as may be necessary to bring it into conformity with this Constitution.
(2) For the purposes of this article, the expression "existing law" means the written and unwritten law of Uganda or of any part of it as existed immediately before the coming into force of this Constitution.`,
        clauses: [
          { clauseNumber: '(1)', text: 'Existing pre-1995 laws must be construed with modifications to conform with Constitution.' },
          { clauseNumber: '(2)', text: 'Definition of pre-existing colonial and statutory laws.' }
        ],
        keywords: ['existing law', 'transitional provisions', 'conformity with constitution', 'statutory adaptation'],
        keyCases: [
          'Uganda Association of Women Lawyers (FIDA) v AG (2004) UGCC 2',
          'Susan Kigula & 416 Ors v AG (2009) UGSC 6'
        ],
        relatedActs: ['Penal Code Act Cap 120', 'Divorce Act Cap 249'],
        explanation: 'Empowers judges to read down or modify pre-1995 colonial statutes (e.g. discriminatory sections of Divorce Act or Penal Code) to align with Chapter 4 fundamental rights.',
        keyPrinciples: ['Conforming Statutory Interpretation', 'Purposive Reading-Down of Colonial Laws'],
        sourceMetadata: createVerifiedSource('PARLIAMENT', '1995 Constitution Art 274', 'Constitution', '1995', 'Current in Force')
      }
    ]
  }
];
