import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ScienceSection from "@/components/ScienceSection";
import PlatformSection from "@/components/PlatformSection";
import TeamSection from "@/components/TeamSection";
import NewsSection from "@/components/NewsSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";

// Single-page site: each section is an in-page anchor target, and the sticky
// header in components/SiteHeader.js tracks whichever one is on screen.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <ScienceSection />
      <PlatformSection />
      <TeamSection />
      <NewsSection />
      <AwardsSection />
      <ContactSection />
    </>
  );
}
