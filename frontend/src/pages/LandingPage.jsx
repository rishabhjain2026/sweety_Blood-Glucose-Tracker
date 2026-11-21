import Navbar from '../components/landing/Navbar.jsx';
import Hero from '../components/landing/Hero.jsx';
import Features from '../components/landing/Features.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import Trust from '../components/landing/Trust.jsx';
import Footer from '../components/landing/Footer.jsx';

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Trust />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
