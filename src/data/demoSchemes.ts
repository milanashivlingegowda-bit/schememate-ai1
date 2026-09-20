import { DemoScheme } from '../types/scheme';

export const DEMO_SCHEMES: DemoScheme[] = [
  {
    id: 'pm-kisan-demo',
    name: 'Pradhan Mantri Kisan Samman Nidhi (Demo)',
    category: 'Agriculture',
    department: 'Department of Agriculture & Farmers Welfare, Ministry of Agriculture',
    shortDescription: 'Direct income support of ₹6,000 per year in three equal instalments to eligible landholding farmer families.',
    description: 'A central sector welfare scheme designed to augment the income of small and marginal farmers across India, ensuring their financial stability for procuring agricultural inputs and domestic necessities.',
    benefits: {
      summary: '₹6,000 annual direct benefit transfer into verified bank accounts.',
      financialBenefit: '₹6,000 per year',
      frequency: '3 instalments of ₹2,000 each (Every 4 months)',
      disbursementMethod: 'Direct Benefit Transfer (DBT via Aadhaar-linked Bank Account)',
      items: [
        'Direct financial assistance for seed, fertilizer, and agricultural costs',
        'No intermediate broker charges; 100% direct bank credit',
        'SMS notifications upon successful instalment release'
      ]
    },
    eligibility: {
      minAge: 18,
      farmerOnly: true,
      incomeLimit: 'Must be landholding farmer family; institutional landholders excluded',
      criteriaList: [
        'Must be an individual or family holding cultivable agricultural land in revenue records',
        'Must have valid bank account linked with Aadhaar (UIDAI)',
        'Not applicable to institutional landholders or serving/retired constitutional post holders',
        'Annual household income threshold applies as per state agricultural land guidelines'
      ]
    },
    documents: [
      'Proof of Land Ownership (Khatauni / Jamabandi / RoR document)',
      'Aadhaar Card (identity verification)',
      'Bank Account Passbook or Cancelled Cheque (DBT-enabled)',
      'Active Mobile Number for OTP authentication'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'Online Registration or CSC Visit',
        description: 'Visit the official PM-KISAN portal or nearby Common Service Centre (CSC) to start self-registration.'
      },
      {
        step: 2,
        title: 'Land Detail Verification',
        description: 'Enter your State, District, Sub-district, Village and upload authenticated land record coordinates.'
      },
      {
        step: 3,
        title: 'e-KYC and Bank Validation',
        description: 'Complete mandatory Aadhaar OTP-based eKYC and confirm bank account branch IFSC.'
      },
      {
        step: 4,
        title: 'State Revenue Approval',
        description: 'Nodal district officers review physical/digital records before adding beneficiary to active pay list.'
      }
    ],
    officialSource: {
      portalName: 'National PM-KISAN Portal (Demo Reference)',
      urlPlaceholder: 'https://pmkisan.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'September 2026 (Demo Verification)',
    targetGroups: ['Farmers', 'Rural Households', 'Cultivators', 'Small Landholders'],
    tags: ['Agriculture', 'Direct Cash Transfer', 'Rural Development', 'Farmer Welfare']
  },
  {
    id: 'post-matric-scholarship-demo',
    name: 'National Post-Matric Scholarship Scheme (Demo)',
    category: 'Education',
    department: 'Ministry of Social Justice & Empowerment / Ministry of Tribal Affairs',
    shortDescription: 'Financial scholarship and maintenance allowance for higher education after Class 10 for students from underprivileged backgrounds.',
    description: 'Enables students belonging to SC, ST, OBC and low-income categories to pursue post-secondary or college level education without financial hardship, covering tuition fees and study maintenance.',
    benefits: {
      summary: 'Full tuition fee reimbursement + monthly study allowance up to ₹1,200/month.',
      financialBenefit: 'Up to ₹20,000/year (Course fee + Maintenance grant)',
      frequency: 'Annual disbursement per academic year',
      disbursementMethod: 'Direct bank transfer through National Scholarship Portal (NSP)',
      items: [
        'Reimbursement of compulsory non-refundable university/college fees',
        'Maintenance allowance for hostellers (₹1,200/month) and day scholars (₹550/month)',
        'Book grant and special thesis study allowance for postgraduate scholars'
      ]
    },
    eligibility: {
      minAge: 15,
      maxAge: 35,
      studentOnly: true,
      maxIncomeRangeRank: 2, // Up to 3 Lakh
      allowedCategories: ['SC', 'ST', 'OBC', 'EWS'],
      incomeLimit: 'Family income must not exceed ₹2.50 Lakh per annum',
      criteriaList: [
        'Must have passed Class 10 (Secondary School) or intermediate examination',
        'Must be enrolled in a recognized government/private college, polytechnic, or university',
        'Annual parental/household income must not exceed ₹2,50,000',
        'Should not be recipient of another parallel government central scholarship'
      ]
    },
    documents: [
      'Class 10 / Previous Marksheets and Passing Certificates',
      'Current Academic Admission Fee Receipt / College ID Card',
      'Income Certificate issued by Tehsildar or Sub-Divisional Magistrate (SDM)',
      'Caste / Community Certificate (for SC/ST/OBC applicants)',
      'Aadhaar Card and Student Bank Passbook'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'NSP Portal Student Registration',
        description: 'Register on National Scholarship Portal (NSP) with valid Aadhaar and mobile number.'
      },
      {
        step: 2,
        title: 'Institution & Scheme Selection',
        description: 'Choose your AISHE college code and select Post-Matric Scholarship option.'
      },
      {
        step: 3,
        title: 'Upload Income & Academic Proofs',
        description: 'Upload scanned copies of latest marksheets, bonafide student certificate and income proof.'
      },
      {
        step: 4,
        title: 'Institute & State Nodal Verification',
        description: 'College verification followed by district welfare officer digital clearance.'
      }
    ],
    officialSource: {
      portalName: 'National Scholarship Portal (Demo Reference)',
      urlPlaceholder: 'https://scholarships.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'August 2026 (Demo Verification)',
    targetGroups: ['Students', 'Youth', 'Higher Education Aspirants', 'Low Income Families'],
    tags: ['Education', 'Scholarship', 'College Support', 'Tuition Waiver']
  },
  {
    id: 'pm-ayushman-arogya-demo',
    name: 'Ayushman Bharat National Health Protection Scheme (Demo)',
    category: 'Healthcare',
    department: 'National Health Authority (NHA), Ministry of Health and Family Welfare',
    shortDescription: 'Cashless hospitalisation coverage of up to ₹5 Lakh per family per year for secondary and tertiary care.',
    description: 'World’s largest government-funded healthcare assurance scheme offering paperless, cashless treatment across thousands of empaneled public and private hospitals across the country.',
    benefits: {
      summary: 'Up to ₹5,00,000 free hospitalization cover per family per year.',
      financialBenefit: '₹5,00,000 health insurance cover',
      frequency: 'Annual renewable family floater cover',
      disbursementMethod: 'Cashless treatment at empaneled hospitals via Ayushman Card',
      items: [
        'Covers medical examination, consultation, diagnostics, medicines, and intensive care',
        'Pre-hospitalization costs (up to 3 days) and post-hospitalization costs (up to 15 days)',
        'Includes pre-existing conditions from Day 1 without waiting period'
      ]
    },
    eligibility: {
      maxIncomeRangeRank: 3, // Up to 5 Lakh
      incomeLimit: 'Identified families under socio-economic caste census or state NFSA lists',
      criteriaList: [
        'Families residing in kutcha/semi-pucca houses or identified vulnerable categories',
        'Holders of valid Ration Card / Antyodaya Anna Yojana (AAY) or BPL registration',
        'Senior citizens aged 70+ now eligible regardless of family income tier (recent update)'
      ]
    },
    documents: [
      'Ration Card / Food Security Card',
      'Aadhaar Card for all family members',
      'Proof of Residence (Voter ID or Electricity Bill)',
      'Active Mobile number for Ayushman Card download'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'Check Eligibility Online',
        description: 'Search using Mobile Number, Ration Card Number or SECC Family ID on the portal.'
      },
      {
        step: 2,
        title: 'Visit Empaneled Hospital or CSC',
        description: 'Approach the Ayushman Mitra desk at any nearby government or empaneled private hospital.'
      },
      {
        step: 3,
        title: 'Biometric Verification',
        description: 'Present Aadhaar and complete iris or fingerprint authentication.'
      },
      {
        step: 4,
        title: 'Ayushman Card Generation',
        description: 'Receive your laminated PVC Ayushman Bharat Golden Card for instant cashless admissions.'
      }
    ],
    officialSource: {
      portalName: 'Ayushman Bharat PM-JAY Portal (Demo Reference)',
      urlPlaceholder: 'https://pmjay.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'September 2026 (Demo Verification)',
    targetGroups: ['Families', 'Senior Citizens', 'Low Income Citizens', 'Vulnerable Populations'],
    tags: ['Healthcare', 'Insurance', 'Cashless Hospital', 'Medical Aid']
  },
  {
    id: 'pmegp-business-demo',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP Demo)',
    category: 'Business',
    department: 'Khadi and Village Industries Commission (KVIC), Ministry of MSME',
    shortDescription: 'Credit-linked capital subsidy up to 35% for establishing new micro-enterprises in manufacturing and services.',
    description: 'Provides soft capital subsidies on bank loans to encourage self-employment and micro-business entrepreneurship among youth, artisans, women, and rural citizens.',
    benefits: {
      summary: 'Up to 35% margin money subsidy on project cost up to ₹50 Lakh.',
      financialBenefit: 'Up to 35% subsidy on project cost (Max ₹50 Lakh for Mfg, ₹20 Lakh for Services)',
      frequency: 'One-time project setup subsidy',
      disbursementMethod: 'Bank loan release with subsidy kept in Term Deposit Receipt for 3 years',
      items: [
        'Subsidy rate: 15% to 25% for general category in urban/rural areas',
        'Special subsidy rate: 25% to 35% for Women, SC/ST, OBC, Minorities, and Ex-servicemen',
        'Free EDP (Entrepreneurship Development Programme) practical training included'
      ]
    },
    eligibility: {
      minAge: 18,
      businessOwnerOnly: true,
      criteriaList: [
        'Any individual above 18 years of age wanting to launch a new micro-business',
        'Minimum Class 8 educational qualification for manufacturing projects above ₹10 Lakh',
        'Existing units or units that have already availed government subsidies are not eligible',
        'Self Help Groups (SHGs) and registered cooperative institutions also eligible'
      ]
    },
    documents: [
      'Detailed Project Report (DPR) / Business Plan Outline',
      'Educational Qualification Certificate (Class 8 or higher mark sheet)',
      'Aadhaar Card and PAN Card',
      'Caste / Special Category Certificate (if claiming 25-35% subsidy rate)',
      'Rural Area Certificate from Gram Panchayat (if claiming rural rate)'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'KVIC e-Portal Application',
        description: 'Submit an online project proposal along with proposed bank branch selection.'
      },
      {
        step: 2,
        title: 'Task Force Scrutiny',
        description: 'District Level Task Force Committee evaluates business feasibility.'
      },
      {
        step: 3,
        title: 'Bank Loan Sanction',
        description: 'Designated financing bank approves credit line and releases first installment.'
      },
      {
        step: 4,
        title: 'EDP Training & Margin Credit',
        description: 'Complete 10-day EDP training module to claim government margin deposit.'
      }
    ],
    officialSource: {
      portalName: 'KVIC PMEGP Portal (Demo Reference)',
      urlPlaceholder: 'https://kviconline.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'July 2026 (Demo Verification)',
    targetGroups: ['Entrepreneurs', 'Micro-business Owners', 'Artisans', 'Self-Employed Youth'],
    tags: ['Business', 'MSME', 'Startup Subsidy', 'Self Employment']
  },
  {
    id: 'lakhpati-didi-women-demo',
    name: 'Lakhpati Didi Women Self-Help Group Initiative (Demo)',
    category: 'Women',
    department: 'Deendayal Antyodaya Yojana - National Rural Livelihoods Mission (DAY-NRLM)',
    shortDescription: 'Financial inclusion, skill training, and interest-subvention loans to help women SHG members earn at least ₹1 Lakh/year.',
    description: 'Empowers rural and peri-urban women organized into Self-Help Groups (SHGs) with technical training, market linkages, digital literacy, and collateral-free loan access to establish micro-enterprises.',
    benefits: {
      summary: 'Collateral-free subsidized micro-credit up to ₹5 Lakh + free livelihood training.',
      financialBenefit: 'Subsidized loan up to ₹5 Lakh at low interest rates',
      frequency: 'Revolving credit access as per enterprise cycle',
      disbursementMethod: 'Bank credit through Women SHG Community Investment Fund',
      items: [
        'Dedicated training in agro-processing, digital services, dairy, tailoring, and solar installation',
        'Access to community revolving investment funds with interest subvention down to 4%',
        'Mentorship support from Krishi Sakhi / Pashu Sakhi community facilitators'
      ]
    },
    eligibility: {
      minAge: 18,
      maxAge: 55,
      genderPreference: ['female'],
      criteriaList: [
        'Must be a woman resident of India',
        'Must be an active member of a registered Village Organization / Self-Help Group (SHG)',
        'Household willing to undertake livelihood activities to achieve sustainable annual income',
        'Priority given to rural and semi-urban women from economically weaker households'
      ]
    },
    documents: [
      'Self-Help Group (SHG) Membership Certificate / Resolution Copy',
      'Aadhaar Card and Voter Identity Card',
      'SHG Bank Passbook and Individual Bank Account Passbook',
      'Passport size photographs and mobile number'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'SHG Meeting Consultation',
        description: 'Propose micro-enterprise plan during regular village SHG / Gram Panchayat meeting.'
      },
      {
        step: 2,
        title: 'Livelihood Plan Approval',
        description: 'Village Organization evaluates business scope and assigns training module.'
      },
      {
        step: 3,
        title: 'Skill Development Course',
        description: 'Attend district vocational training sessions run by RSETI or NRLM partners.'
      },
      {
        step: 4,
        title: 'Credit Linkage & Fund Release',
        description: 'Receive loan sanction directly into bank account under low interest subvention.'
      }
    ],
    officialSource: {
      portalName: 'National Rural Livelihoods Mission (Demo Reference)',
      urlPlaceholder: 'https://nrlm.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'September 2026 (Demo Verification)',
    targetGroups: ['Women', 'Self-Help Groups', 'Rural Women', 'Micro-entrepreneurs'],
    tags: ['Women Empowerment', 'Microfinance', 'Livelihood', 'Rural Economy']
  },
  {
    id: 'pm-awas-yojana-demo',
    name: 'Pradhan Mantri Awas Yojana - Housing for All (Demo)',
    category: 'Housing',
    department: 'Ministry of Housing and Urban Affairs / Ministry of Rural Development',
    shortDescription: 'Financial assistance of ₹1.20 Lakh (Rural) to ₹2.50 Lakh (Urban) for constructing a permanent pucca house with amenities.',
    description: 'Enables homeless families and those living in dilapidated or kutcha houses to build a durable, hygienic home equipped with toilet, clean cooking gas, electricity connection, and piped water.',
    benefits: {
      summary: 'Direct financial subsidy of ₹1,20,000 to ₹2,50,000 + 90 days MGNREGA wages.',
      financialBenefit: '₹1.20 Lakh to ₹2.50 Lakh construction subsidy',
      frequency: 'Released in 3-4 milestone-based stages based on geo-tagged photo proof',
      disbursementMethod: 'Direct Benefit Transfer (DBT) to beneficiary account',
      items: [
        'Geo-tagged milestone payments: Foundation, Lintel, Roof completion, and Final coat',
        'Additional ₹12,000 assistance under Swachh Bharat for toilet construction',
        'Convergent benefits: Free LPG connection (Ujjwala) and electricity meter'
      ]
    },
    eligibility: {
      minAge: 18,
      maxIncomeRangeRank: 3, // Up to 5 Lakh
      incomeLimit: 'EWS/LIG families without an existing pucca house anywhere in India',
      criteriaList: [
        'Beneficiary family must not own a pucca house in their name or any family member’s name',
        'Should not have availed housing subsidy under any other central/state government scheme',
        'Ownership of the house must preferably be in the name of the female head or joint ownership'
      ]
    },
    documents: [
      'Aadhaar Card of all family members',
      'Affidavit / Self-declaration of not owning any other pucca house',
      'Land Title Deed / Patta or NOC from local Gram Panchayat / Municipality',
      'Bank Account Passbook (Aadhaar linked)',
      'MNREGA Job Card (for rural unorganized labor assistance)'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'Gram Sabha / Urban Portal Survey',
        description: 'Enroll through local Gram Sabha socio-economic survey or urban ward municipal counter.'
      },
      {
        step: 2,
        title: 'Physical Land & House Verification',
        description: 'Officials inspect existing kutcha dwelling and record GPS geo-coordinates.'
      },
      {
        step: 3,
        title: 'Sanction Order Generation',
        description: 'District collectorate issues official beneficiary registration number.'
      },
      {
        step: 4,
        title: 'Milestone Inspection & DBT Tranches',
        description: 'Upload construction photos via AwaasApp to trigger phased direct bank deposits.'
      }
    ],
    officialSource: {
      portalName: 'PMAY Housing Portal (Demo Reference)',
      urlPlaceholder: 'https://pmaymis.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'August 2026 (Demo Verification)',
    targetGroups: ['Homeless Families', 'Kutcha House Residents', 'Low Income Families', 'Rural Laborers'],
    tags: ['Housing', 'Pucca House', 'Shelter', 'Infrastructure']
  },
  {
    id: 'naps-apprenticeship-demo',
    name: 'National Apprenticeship Promotion Scheme (NAPS Demo)',
    category: 'Employment',
    department: 'Ministry of Skill Development and Entrepreneurship (MSDE)',
    shortDescription: 'Monthly stipend support of up to ₹1,500/month along with hands-on industrial training across major commercial sectors.',
    description: 'Bridges the gap between academic education and practical workplace demands by offering structured industry apprenticeships with shared government stipend support.',
    benefits: {
      summary: 'Government shares 25% of prescribed monthly stipend (up to ₹1,500/month) + certified work experience.',
      financialBenefit: 'Up to ₹1,500/month direct government stipend share',
      frequency: 'Monthly credit during apprenticeship duration (6 to 36 months)',
      disbursementMethod: 'Direct bank transfer to apprentice',
      items: [
        'Practical on-the-job industrial experience in automotive, IT, retail, manufacturing, logistics',
        'National Apprenticeship Certificate (NAC) recognized by public and private employers',
        'Potential conversion into permanent full-time employment based on performance'
      ]
    },
    eligibility: {
      minAge: 16,
      maxAge: 35,
      criteriaList: [
        'Candidates who have passed Class 5th, 8th, 10th, 12th, ITI, Diploma, or Graduate degree',
        'Must possess a valid Aadhaar card and active personal bank account',
        'Should not be currently undergoing another full-time regular government apprenticeship'
      ]
    },
    documents: [
      'Aadhaar Card for identity and age verification',
      'Educational Qualification Certificates (10th/12th/ITI/Degree Certificate)',
      'Resume / Curriculum Vitae',
      'Bank Account Passbook for stipend DBT credit'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'Apprenticeship India Portal Signup',
        description: 'Create an apprentice profile at the official national apprenticeship portal.'
      },
      {
        step: 2,
        title: 'Search & Apply for Openings',
        description: 'Filter openings by trade, location, sector, and industry establishment.'
      },
      {
        step: 3,
        title: 'Establishment Interview / Selection',
        description: 'Participate in employer screening and receive an apprenticeship offer letter.'
      },
      {
        step: 4,
        title: 'Contract Signing & Induction',
        description: 'Digitally execute the apprenticeship contract and commence paid hands-on training.'
      }
    ],
    officialSource: {
      portalName: 'Apprenticeship India Portal (Demo Reference)',
      urlPlaceholder: 'https://www.apprenticeshipindia.gov.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'September 2026 (Demo Verification)',
    targetGroups: ['Job Seekers', 'ITI Graduates', 'Unemployed Youth', 'College Students'],
    tags: ['Employment', 'Apprenticeship', 'Skill Development', 'Job Training']
  },
  {
    id: 'nsap-senior-pension-demo',
    name: 'National Social Assistance Programme - Senior Pension (Demo)',
    category: 'Social Welfare',
    department: 'Department of Rural Development, Ministry of Rural Development',
    shortDescription: 'Monthly social security financial pension for elderly citizens from low-income and vulnerable households.',
    description: 'Ensures a minimum social safety net for elderly citizens aged 60 years and above who belong to households living below the poverty line or with minimal familial financial support.',
    benefits: {
      summary: 'Monthly cash pension of ₹1,000 to ₹3,000 (Central + State combined share).',
      financialBenefit: '₹1,000 - ₹3,000 per month',
      frequency: 'Monthly credit directly into post office or bank savings account',
      disbursementMethod: 'Direct Benefit Transfer / Post Office Savings Account',
      items: [
        'Regular uninterrupted monthly livelihood pension support',
        'Higher assistance slab automatically triggered upon reaching age 80',
        'Exemption from cumbersome physical verification through Doorstep Digital Life Certificate'
      ]
    },
    eligibility: {
      minAge: 60,
      seniorOnly: true,
      maxIncomeRangeRank: 2, // Up to 3 Lakh
      criteriaList: [
        'Applicant must be aged 60 years or above',
        'Belonging to a household living below the poverty line (BPL) as per state criteria',
        'Should not be in receipt of another central government retirement pension'
      ]
    },
    documents: [
      'Age Proof (Aadhaar Card, Birth Certificate, or Voter ID Card)',
      'BPL Ration Card or Income Certificate issued by competent revenue authority',
      'Bank or Post Office Savings Passbook (Single account)',
      'Digital Life Certificate (Jeevan Pramaan) or Physical Verification from local authority'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'Application Submission',
        description: 'Submit prescribed application at Gram Panchayat office, Block Development Office (BDO), or Municipal ward.'
      },
      {
        step: 2,
        title: 'Social Audit & Age Verification',
        description: 'Field officer visits or cross-checks election voter rolls to verify age and residence.'
      },
      {
        step: 3,
        title: 'Sanction by Sub-Divisional Officer',
        description: 'SDO / Tehsildar approves pension roll addition.'
      },
      {
        step: 4,
        title: 'Monthly Direct Credit',
        description: 'Monthly pension disbursed directly into the beneficiary’s bank or postal account.'
      }
    ],
    officialSource: {
      portalName: 'NSAP Social Welfare Portal (Demo Reference)',
      urlPlaceholder: 'https://nsap.nic.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'August 2026 (Demo Verification)',
    targetGroups: ['Senior Citizens', 'Elderly Widows', 'Vulnerable Pensioners'],
    tags: ['Senior Citizens', 'Pension', 'Social Security', 'Elderly Care']
  },
  {
    id: 'divyangjan-assistive-aid-demo',
    name: 'ADIP Scheme for Assistance to Persons with Disabilities (Demo)',
    category: 'Social Welfare',
    department: 'Department of Empowerment of Persons with Disabilities, Ministry of Social Justice',
    shortDescription: 'Free assistive aids, appliances, wheelchairs, hearing aids, and motorized tricycles for persons with disabilities.',
    description: 'Promotes physical, social, and psychological rehabilitation of persons with disabilities (PwD) by providing modern, high-quality assistive aids and appliances to enhance mobility and independence.',
    benefits: {
      summary: '100% free distribution of customized assistive aids, motorized tricycles, smart canes, and hearing aids.',
      financialBenefit: 'Aids valued up to ₹50,000 provided free of cost',
      frequency: 'Provided once every 3 years (or replacement on wear & tear)',
      disbursementMethod: 'Physical distribution through district assessment camps and ALIMCO centers',
      items: [
        'Motorized tricycles and wheelchairs for locomotor disabilities',
        'Digital programmable hearing aids and speech synthesizers for hearing impaired',
        'Daisy players, smart canes, and Braille kits for visually impaired beneficiaries',
        'Free maintenance and repair warranty through district camps'
      ]
    },
    eligibility: {
      pwdOnly: true,
      maxIncomeRangeRank: 3, // Up to 5 Lakh
      incomeLimit: 'Monthly income up to ₹20,000 for 100% subsidy; up to ₹30,000 for 50% subsidy',
      criteriaList: [
        'Must hold a valid Disability Certificate (UDID card) showing minimum 40% disability',
        'Resident Indian citizen of any age',
        'Should not have received assistance for the same appliance in the past 3 years from any government source'
      ]
    },
    documents: [
      'UDID Card (Unique Disability ID) or State Disability Certificate with 40%+ rating',
      'Income Certificate issued by Tehsildar / Employer / Sarpanch',
      'Aadhaar Card and Passport size photo showing disability condition',
      'Recommendation slip from camp medical specialist'
    ],
    applicationProcess: [
      {
        step: 1,
        title: 'UDID Enrollment / Camp Check',
        description: 'Locate upcoming district ALIMCO assessment camp or apply online at ALIMCO portal.'
      },
      {
        step: 2,
        title: 'Clinical Assessment',
        description: 'Specialist medical rehabilitation team tests hearing, vision, or locomotion needs.'
      },
      {
        step: 3,
        title: 'Appliance Fitting & Customization',
        description: 'Specs recorded for custom sizing of motorized tricycles or digital hearing devices.'
      },
      {
        step: 4,
        title: 'Free Distribution Camp',
        description: 'Appliances delivered with operational training and warranty booklet.'
      }
    ],
    officialSource: {
      portalName: 'ALIMCO Assistive Aids Portal (Demo Reference)',
      urlPlaceholder: 'https://alimco.in (Official Govt Domain for reference)',
      isDemo: true
    },
    lastVerified: 'September 2026 (Demo Verification)',
    targetGroups: ['Persons with Disabilities', 'Divyangjan', 'Special Needs Citizens'],
    tags: ['Disability Support', 'Assistive Aids', 'Wheelchairs', 'Inclusion']
  }
];

export const INDIAN_STATES_DISTRICTS: Record<string, string[]> = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Kurnool', 'Nellore', 'Anantapur'],
  'Assam': ['Guwahati', 'Dibrugarh', 'Silchar', 'Jorhat', 'Nagaon', 'Tezpur'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia'],
  'Delhi (NCT)': ['Central Delhi', 'New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Hisar', 'Karnal', 'Rohtak'],
  'Karnataka': ['Bengaluru Urban', 'Bengaluru Rural', 'Mysuru', 'Hubballi-Dharwad', 'Mangaluru', 'Belagavi', 'Kalaburagi'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Kannur', 'Palakkad'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar'],
  'Maharashtra': ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Chhatrapati Sambhajinagar'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Alwar'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Vellore'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Rangareddy'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Prayagraj', 'Agra', 'Noida', 'Gorakhpur', 'Meerut'],
  'West Bengal': ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol', 'Darjeeling']
};
