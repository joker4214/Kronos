import Navbar from '@/components/dharma/Navbar';
import Hero from '@/components/dharma/Hero';
import StatsBar from '@/components/dharma/StatsBar';
import About from '@/components/dharma/About';
import Packages from '@/components/dharma/Packages';
import WebDesign from '@/components/dharma/WebDesign';
import AlaCarteCart from '@/components/dharma/AlaCarteCart';
import Team from '@/components/dharma/Team';
import FAQ from '@/components/dharma/FAQ';
import FinalCTA from '@/components/dharma/FinalCTA';
import AnimatedFooter from '@/components/dharma/AnimatedFooter';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Packages />
      <WebDesign />
      <AlaCarteCart />
      <Team />
      <FAQ />
      <FinalCTA />
      <AnimatedFooter />
    </>
  );
}
