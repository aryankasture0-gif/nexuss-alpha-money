import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Stats from './components/Stats';
import EligibilityChecker from './components/EligibilityChecker';
import LoanCategories from './components/LoanCategories';
import ProcessTimeline from './components/ProcessTimeline';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import About from './components/About';
import EMICalculator from './components/EMICalculator';
import Apply from './components/Apply';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingButtons from './components/FloatingButtons';
import MobileBar from './components/MobileBar';
import Footer from './components/Footer';
import LegalPage from './components/LegalPage';

const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'));

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const legalPage = path === '/privacy' ? 'privacy' : path === '/terms' ? 'terms' : null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Suspense fallback={<div className="fixed inset-0 -z-10 bg-navy-radial" />}>
        <AnimatedBackground />
      </Suspense>
      <Navbar />
      {legalPage ? (
        <LegalPage type={legalPage} />
      ) : (
        <main>
          <Hero />
          <TrustSection />
          <Stats />
          <EligibilityChecker />
          <LoanCategories />
          <ProcessTimeline />
          <WhyChooseUs />
          <Testimonials />
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
