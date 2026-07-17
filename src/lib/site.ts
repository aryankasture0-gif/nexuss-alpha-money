export const BRAND = {
  name: 'Nexuss Alpha Money',
  shortName: 'Nexuss',
  tagline: 'Smart Financing for Your Big Dreams.',
  about: 'Nexuss Alpha Money is a trusted financial consultancy connecting individuals and businesses with 350+ banks and NBFCs across India. We provide expert guidance across 25+ loan categories, from personal loans and home financing to business funding, project finance, and specialized professional loans. Our mission is to make loan processing transparent, fast, and hassle-free for every customer.',
  phone: '+91 9922566893',
  phoneE164: '919922566893',
  email: 'nexussalphamoney@gmail.com',
  location: 'Camp, Pune, Maharashtra, India',
  copyright: '© 2026 Nexuss Alpha Money. All Rights Reserved.',
};

export const HIGHLIGHTS = [
  'Fast document-led processing',
  'Zero hidden charges',
  'All-India loan support',
  'Secure application handling',
  'Transparent terms',
  'Trusted customer guidance',
  'Flexible repayment support',
];

export type Service = {
  name: string;
  group: string;
  description: string;
};

export const SERVICES: Service[] = [
  { name: 'Personal Loans', group: 'Personal', description: 'Support for important purchases, family needs, education expenses, travel, and urgent financial requirements.' },
  { name: 'Business Loans', group: 'Business', description: 'Funding assistance for business expansion, stock purchase, equipment needs, working capital, and growth plans.' },
  { name: 'Home Loans', group: 'Home & Property', description: 'Guidance for home loans with competitive terms and customer-focused support.' },
  { name: 'Mortgage Loans', group: 'Home & Property', description: 'Property-backed funding with transparent terms and practical repayment options.' },
  { name: 'Construction Loans', group: 'Home & Property', description: 'Funding for construction and property development requirements.' },
  { name: 'Agriculture Loans', group: 'Agriculture', description: 'Loan assistance for farming, agriculture activity, equipment requirements, and rural business growth.' },
  { name: 'Project Funding', group: 'Projects', description: 'Funding guidance for business projects, builders, hospitals, schools, and infrastructure-related requirements.' },
  { name: 'Builder Funding', group: 'Projects', description: 'Dedicated funding support for builders and real-estate development projects.' },
  { name: 'Hospital Funding', group: 'Projects', description: 'Financial support for hospital setup, expansion, and medical infrastructure.' },
  { name: 'School Funding', group: 'Projects', description: 'Funding support for school establishment, expansion, and educational infrastructure.' },
  { name: 'Education Loans', group: 'Education & Vehicles', description: 'Loan assistance for higher education and academic goals.' },
  { name: 'Vehicle Loans', group: 'Education & Vehicles', description: 'Flexible vehicle funding for personal and commercial use.' },
  { name: 'Car Loans', group: 'Education & Vehicles', description: 'Quick car loan assistance with clear terms and competitive guidance.' },
  { name: 'Used Car Loans', group: 'Education & Vehicles', description: 'Pre-owned vehicle funding support with practical repayment options.' },
  { name: 'Subsidy Loans', group: 'Specialty', description: 'Guidance for subsidy-linked loan schemes and government-backed programs.' },
  { name: 'Mahamandal Loans', group: 'Specialty', description: 'Support for Mahamandal and specialised regional loan schemes.' },
  { name: 'All Types of Insurance', group: 'Specialty', description: 'Comprehensive insurance support across categories to protect what matters.' },
  { name: 'Flexible Credit Solutions', group: 'Specialty', description: 'Profile-based guidance for salaried and self-employed applicants with practical repayment options.' },
];

export const LOAN_TYPES = [
  'Personal Loan',
  'Business Loan',
  'Home Loan',
  'Mortgage Loan',
  'Construction Loan',
  'Agriculture Loan',
  'Project Funding',
  'Builder Funding',
  'Hospital Funding',
  'School Funding',
  'Education Loan',
  'Vehicle Loan',
  'Car Loan',
  'Used Car Loan',
  'Subsidy Loan',
  'Mahamandal Loan',
  'All Types of Insurance',
  'Flexible Credit Solution',
];

export const APPLICANT_PROFILES = ['Salaried', 'Self-employed', 'Business Owner'];

export const DOCUMENTS = [
  'Identity Proof',
  'Address Proof',
  'Income Proof',
  'Salary Slips',
  'Bank Statement',
  'Business Proof (if self-employed)',
];

export const PROCESS_STEPS = [
  { step: 'Step 1', title: 'Share Requirement', description: 'Tell us your loan requirement and goals — our advisors listen first.' },
  { step: 'Step 2', title: 'Eligibility Review', description: 'We assess your profile and match you with the right loan options.' },
  { step: 'Step 3', title: 'Document Check', description: 'Document-led processing with secure handling and clear checklists.' },
  { step: 'Step 4', title: 'Processing Support', description: 'Dedicated support through processing until your loan moves forward.' },
];

export const FAQS = [
  {
    q: 'Is it safe to apply for a loan with Nexuss Alpha Money?',
    a: 'Yes. Customer trust and data security are top priorities.',
  },
  {
    q: 'What types of loans are provided?',
    a: 'Personal Loans, Business Loans, Home Loans, Mortgage Loans, Construction Loans, Agriculture Loans, Project Funding, Builder Funding, Hospital Funding, School Funding, Education Loans, Vehicle Loans, Car Loans, Used Car Loans, Subsidy Loans, Mahamandal Loans, Insurance support, and flexible credit solutions.',
  },
  {
    q: 'How long does the approval process take?',
    a: 'Once documentation is verified, the team works to process applications as quickly as possible.',
  },
  {
    q: 'Who is eligible to apply?',
    a: 'Salaried and self-employed applicants with stable income and valid documentation may apply.',
  },
];

export const HERO_HEADLINE = 'Get the Right Loan Solution with 350+ Bank & NBFC Partners';
export const HERO_DESCRIPTION = 'Your trusted partner for all types of loans. Connect with 350+ banks and NBFCs across India for fast, secure, and hassle-free loan solutions tailored to your needs.';

export const TRUST_BADGES = [
  'PAN India Service',
  'Multiple Loan Categories',
  'Fast Processing Support',
  'Secure Application',
];

export const STATS = [
  { label: 'Bank & NBFC Partners', value: 350, suffix: '+' },
  { label: 'Loan Categories', value: 25, suffix: '+' },
  { label: 'Customers Assisted', value: 5000, suffix: '+' },
  { label: 'PAN India Service', value: 1, suffix: '', prefix: 'Nationwide', static: true },
  { label: 'Fast Approval', value: 1, suffix: '', prefix: '24-48 Hours', static: true },
];

export const LOAN_CATEGORIES = [
  { name: 'Personal Loan', icon: 'Wallet' },
  { name: 'Business Loan', icon: 'Briefcase' },
  { name: 'Home Loan', icon: 'Home' },
  { name: 'Car Loan', icon: 'Car' },
  { name: 'Used Car Loan', icon: 'CircleDot' },
  { name: 'Loan Against Property', icon: 'Landmark' },
  { name: 'Mortgage Loan', icon: 'Building' },
  { name: 'MSME Loan', icon: 'Factory' },
  { name: 'Startup Loan', icon: 'Rocket' },
  { name: 'Working Capital Loan', icon: 'Banknote' },
  { name: 'Professional Loan', icon: 'UserCheck' },
  { name: 'Doctor Loan', icon: 'Stethoscope' },
  { name: 'CA Loan', icon: 'Calculator' },
  { name: 'Education Loan', icon: 'GraduationCap' },
  { name: 'Gold Loan', icon: 'Gem' },
  { name: 'Machinery Loan', icon: 'Cog' },
  { name: 'Commercial Vehicle Loan', icon: 'Truck' },
  { name: 'Construction Loan', icon: 'Shield' },
  { name: 'Balance Transfer Loan', icon: 'Repeat' },
  { name: 'Top-Up Loan', icon: 'ArrowUpCircle' },
  { name: 'Equipment Finance', icon: 'Wrench' },
  { name: 'Invoice Financing', icon: 'FileText' },
  { name: 'Project Finance', icon: 'Building2' },
  { name: 'Overdraft Facility', icon: 'CreditCard' },
  { name: 'Debt Consolidation', icon: 'Layers' },
];

export const LOAN_PROCESS = [
  {
    step: 1,
    title: 'Apply Online',
    description: 'Fill out our simple online application form with your basic details and loan requirements.',
    icon: 'FileText',
  },
  {
    step: 2,
    title: 'Document Verification',
    description: 'Submit your documents securely. Our experts review and verify everything within hours.',
    icon: 'ShieldCheck',
  },
  {
    step: 3,
    title: 'Bank Matching',
    description: 'We match your profile with the best loan options from our 350+ bank and NBFC partner network.',
    icon: 'Building2',
  },
  {
    step: 4,
    title: 'Approval & Disbursement',
    description: 'Get final approval and receive the funds directly in your bank account.',
    icon: 'CircleDollarSign',
  },
];

export const WHY_CHOOSE = [
  {
    title: '350+ Banking Partners',
    description: 'Access to an extensive network of banks and NBFCs ensuring the best loan options for your profile.',
    icon: 'Landmark',
  },
  {
    title: 'Multiple Loan Options',
    description: 'From personal loans to business financing, we cover 25+ loan categories to meet every need.',
    icon: 'LayoutGrid',
  },
  {
    title: 'PAN India Service',
    description: 'Serving customers across all states in India with local support and regional expertise.',
    icon: 'Globe',
  },
  {
    title: 'Quick Documentation',
    description: 'Simplified document requirements and fast verification process to get you approved sooner.',
    icon: 'FileCheck',
  },
  {
    title: 'Expert Loan Guidance',
    description: 'Dedicated loan advisors with years of experience to guide you through every step.',
    icon: 'Users',
  },
  {
    title: 'Transparent Process',
    description: 'No hidden charges, no surprises. Complete transparency in rates, fees, and processing time.',
    icon: 'Eye',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    location: 'Mumbai, Maharashtra',
    text: 'Nexuss Alpha Money helped me get a personal loan at a great interest rate. The process was smooth and I received the funds within 3 days. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    text: 'As a small business owner, I needed working capital urgently. Their team connected me with the right bank and the loan was disbursed in record time.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    location: 'Bangalore, Karnataka',
    text: 'Excellent service for home loan processing. They handled all the paperwork and bank coordination. Got my dream home thanks to their guidance!',
    rating: 5,
  },
  {
    name: 'Dr. Sneha Gupta',
    location: 'Delhi NCR',
    text: 'The doctor loan process was seamless. Special rates and quick approval for medical professionals. The team was very professional throughout.',
    rating: 5,
  },
  {
    name: 'Vijay Mehta',
    location: 'Pune, Maharashtra',
    text: 'Used their balance transfer service for my existing home loan. Saved significantly on interest. The entire process was transparent and hassle-free.',
    rating: 5,
  },
  {
    name: 'Neha Desai',
    location: 'Hyderabad, Telangana',
    text: 'Education loan for my child\'s overseas studies was processed quickly. Their guidance on documentation was invaluable. Thank you Nexuss Alpha!',
    rating: 5,
  },
];

export const DEFAULT_WHATSAPP_MESSAGE = "Hello Nexuss Alpha Money, I am interested in applying for a loan. Please assist me.";

export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE, phone: string = BRAND.phoneE164) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildApplyWhatsAppMessage(fields: {
  name: string;
  phone: string;
  email: string;
  amount: string;
  loanType: string;
  profile: string;
  requirement: string;
}) {
  const lines = [
    '*New Loan Inquiry — Nexuss Alpha Money*',
    '',
    `*Name:* ${fields.name}`,
    `*Phone:* ${fields.phone}`,
    `*Email:* ${fields.email}`,
    `*Preferred Amount:* ${fields.amount}`,
    `*Loan Type:* ${fields.loanType}`,
    `*Applicant Profile:* ${fields.profile}`,
    `*Requirement:* ${fields.requirement}`,
  ];
  return lines.join('\n');
}
