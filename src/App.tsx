import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Stats from './components/Stats';
import EligibilityChecker from './components/EligibilityChecker';
import LoanCategories from './components/LoanCategories';
import ProcessTimeline from './components/ProcessTimeline';
import WhyChooseUs from './components/WhyChooseUs';
import ExperienceSection from './components/ExperienceSection';
import ServiceAreas from './components/ServiceAreas';
import About from './components/About';
import EMICalculator from './components/EMICalculator';
import Apply from './components/Apply';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingButtons from './components/FloatingButtons';
import MobileBar from './components/MobileBar';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';
import LoanLanding, { LOAN_PAGES } from './components/LoanLanding';
import GuideLanding, { GUIDES } from './components/GuideLanding';
import AdminDashboard from './components/AdminDashboard';

const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'));

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const legalPage = path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : null;
  const loanSlug = path.startsWith('/loans/') ? path.replace('/loans/', '') : null;
  const guideSlug = path.startsWith('/guides/') ? path.replace('/guides/', '') : null;

  if (path === '/admin' || path === '/admin/dashboard') return <AdminDashboard />;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-navy-radial" />}>
        <AnimatedBackground />
      </Suspense>
      <Navbar />
      {legalPage ? (
        <LegalPage type={legalPage} />
      ) : loanSlug && LOAN_PAGES[loanSlug] ? (
        <LoanLanding slug={loanSlug} />
      ) : guideSlug && GUIDES[guideSlug] ? (
        <GuideLanding slug={guideSlug} />
      ) : (
        <main>
          <Hero />
          <TrustSection />
          <Stats />
          <EligibilityChecker />
          <LoanCategories />
          <ProcessTimeline />
          <WhyChooseUs />
          <ExperienceSection />
          <ServiceAreas />
          <About />
          <EMICalculator />
          <Apply />
          <FAQ />
          <Contact />
        </main>
      )}
      <Footer />
      {!legalPage && <FloatingButtons />}
      {!legalPage && <MobileBar />}
    </div>
  );
}

export default App;
