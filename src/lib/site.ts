export const BRAND = {
  name: 'Nexuss Alpha Money',
  shortName: 'Nexuss',
  tagline: 'Clear guidance for your next financial step.',
  about: 'Nexuss Alpha Money is a loan assistance and consultancy service. We help individuals and businesses understand available options, prepare their enquiry, and coordinate with relevant banks or NBFCs, subject to lender policies, eligibility, availability, and final approval by the lender.',
  phone: '+91 9371735519',
  phoneE164: '919371735519',
  email: 'nexussalphamoney@gmail.com',
  location: 'Bheda Chowk, Karad · MG Road, Pune',
  copyright: '© 2026 Nexuss Alpha Money. All Rights Reserved.',
};

export const HIGHLIGHTS = [
  'Clear enquiry and document guidance',
  'Lender-dependent terms explained upfront',
  'Support across India, subject to availability',
  'Secure enquiry handling',
  'No promise of approval or disbursal',
  'Guidance for salaried and self-employed applicants',
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
  { step: 'Step 2', title: 'Initial Review', description: 'We review the information you provide and explain which options may be relevant.' },
  { step: 'Step 3', title: 'Document Check', description: 'Document-led processing with secure handling and clear checklists.' },
  { step: 'Step 4', title: 'Lender Processing', description: 'If you proceed, the selected lender evaluates the application and makes the final decision.' },
];

export const FAQS = [
  {
    q: 'Is it safe to apply for a loan with Nexuss Alpha Money?',
    a: 'We collect only the information needed for an enquiry and use reasonable safeguards for the form and submission flow. Please do not share OTPs, passwords, PINs, or unnecessary sensitive documents through public channels.',
  },
  {
    q: 'What types of loans are provided?',
    a: 'We assist with enquiries for personal, business, home, property-backed, education, vehicle, agriculture, and selected project or specialty funding, subject to the availability and policies of relevant lenders.',
  },
  {
    q: 'How long does the approval process take?',
    a: 'There is no guaranteed timeline. Processing depends on the lender, product, documentation, verification, and other case-specific factors.',
  },
  {
    q: 'Who is eligible to apply?',
    a: 'Salaried, self-employed, and business applicants may submit an enquiry. The lender decides eligibility after its own assessment; the website checker is only an indicative guide.',
  },
  {
    q: 'Are there any charges?',
    a: 'Nexuss Alpha Money does not charge a customer service fee for submitting an enquiry. A lender, government authority, lawyer, valuator, or other third party may separately charge processing, legal, valuation, insurance, or other applicable fees. Confirm every charge before proceeding.',
  },
];

export const HERO_HEADLINE = 'Clear guidance for your next loan enquiry';
export const HERO_DESCRIPTION = 'Nexuss Alpha Money helps you understand loan options, prepare your enquiry, and connect with relevant banks or NBFCs. Final eligibility, pricing, approval, and disbursal always depend on the lender.';

export const TRUST_BADGES = [
  'PAN India Service',
  'Multiple Loan Categories',
  'Fast Processing Support',
  'Secure Application',
];

export const STATS = [
  { label: 'Service model', value: 1, suffix: '', prefix: 'Guidance', static: true },
  { label: 'Coverage', value: 1, suffix: '', prefix: 'India-wide*', static: true },
  { label: 'Enquiry flow', value: 1, suffix: '', prefix: 'Private', static: true },
  { label: 'Terms', value: 1, suffix: '', prefix: 'Lender-led', static: true },
  { label: 'Approval', value: 1, suffix: '', prefix: 'No promise', static: true },
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
    title: 'Document Guidance',
    description: 'Share only the documents requested through an agreed channel. We help you understand what may be needed.',
    icon: 'ShieldCheck',
  },
  {
    step: 3,
    title: 'Bank Matching',
    description: 'We discuss relevant lender options where available; no lender match or approval is guaranteed.',
    icon: 'Building2',
  },
  {
    step: 4,
    title: 'Lender Decision',
    description: 'The lender independently decides the terms, approval, documentation, and disbursal timeline.',
    icon: 'CircleDollarSign',
  },
];

export const WHY_CHOOSE = [
  {
    title: 'Relevant lender guidance',
    description: 'We help you understand suitable categories and next steps without promising a particular lender or outcome.',
    icon: 'Landmark',
  },
  {
    title: 'Multiple loan categories',
    description: 'Explore common personal, business, property, education, vehicle, agriculture, and project funding enquiries.',
    icon: 'LayoutGrid',
  },
  {
    title: 'PAN India Service',
    description: 'Enquiries can be considered across India, subject to lender availability and service coverage.',
    icon: 'Globe',
  },
  {
    title: 'Clear documentation',
    description: 'Understand the next document step and avoid sharing unnecessary sensitive information.',
    icon: 'FileCheck',
  },
  {
    title: 'Expert Loan Guidance',
    description: 'A practical point of contact for your enquiry, documents, and lender-process questions.',
    icon: 'Users',
  },
  {
    title: 'Transparent expectations',
    description: 'We explain that rates, fees, timelines, eligibility, approval, and disbursal are lender-dependent.',
    icon: 'Eye',
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
