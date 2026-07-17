import { BRAND } from '../lib/site';

type LegalPageProps = {
  type: 'privacy' | 'terms';
};

const privacySections = [
  {
    title: 'Information We Collect',
    body: 'We collect only the details you choose to submit through the loan enquiry form, such as name, phone number, email address, preferred loan type, applicant profile, requested amount, and requirement notes.',
  },
  {
    title: 'How We Use Information',
    body: 'Submitted details are used to respond to your enquiry, understand loan requirements, and coordinate follow-up support. We do not sell personal information.',
  },
  {
    title: 'Form Protection',
    body: 'The online form uses spam checks and may use Cloudflare Turnstile to confirm the submission is from a real visitor. This reduces automated abuse without collecting unnecessary extra information.',
  },
  {
    title: 'Data Sharing',
    body: 'Information may be shared only with relevant banking, NBFC, or advisory partners when needed to process your enquiry and only after reasonable business need.',
  },
  {
    title: 'Retention',
    body: 'Lead details are retained only as long as needed for enquiry handling, compliance, dispute resolution, and legitimate business records.',
  },
  {
    title: 'Contact',
    body: `For privacy questions or deletion requests, contact ${BRAND.email} or call ${BRAND.phone}.`,
  },
];

const termsSections = [
  {
    title: 'Service Scope',
    body: `${BRAND.name} provides loan advisory and facilitation support. Final loan approval, interest rate, eligibility, documentation, and disbursement remain subject to the lender's policies.`,
  },
  {
    title: 'No Guaranteed Approval',
    body: 'Website content and eligibility tools are informational. They do not guarantee approval, sanction, disbursement, or a specific financial offer.',
  },
  {
    title: 'User Responsibilities',
    body: 'Visitors must provide accurate information and valid contact details. False or incomplete information may delay or prevent processing.',
  },
  {
    title: 'Third-Party Services',
    body: 'The website may link to WhatsApp, maps, lenders, or other third-party services. Their own terms and privacy practices apply.',
  },
  {
    title: 'Security',
    body: 'We apply reasonable safeguards to protect submitted information, but no internet transmission or electronic storage method is completely risk-free.',
  },
  {
    title: 'Contact',
    body: `For terms-related questions, contact ${BRAND.email} or call ${BRAND.phone}.`,
  },
];

export default function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions';
  const sections = isPrivacy ? privacySections : termsSections;

  return (
    <main className="relative px-6 pb-24 pt-36 lg:px-10 lg:pb-32">
      <section className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-medium text-gold-300 transition-colors hover:text-gold-200">
          Back to home
        </a>
        <h1 className="mt-8 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60">
          Last updated: June 24, 2026. This page explains how {BRAND.name} handles website use,
          enquiries, and customer information.
        </p>

        <div className="mt-12 space-y-5">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-white/[0.07] bg-white/[0.025] p-6">
              <h2 className="font-display text-xl font-semibold text-white">{section.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-white/58">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
