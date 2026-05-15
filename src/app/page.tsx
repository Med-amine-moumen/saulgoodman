import { IntroSequence } from "@/components/IntroSequence";
import { SiteHeader } from "@/components/SiteHeader";
import { FlyingCash } from "@/components/FlyingCash";
import { BreakingNewsTicker } from "@/components/BreakingNewsTicker";
import { LiveCounter } from "@/components/LiveCounter";
import { Hero } from "@/components/sections/Hero";
import { MeetYourLawyer } from "@/components/sections/MeetYourLawyer";
import { Services } from "@/components/sections/Services";
import { NotableCases } from "@/components/sections/NotableCases";
import { JusticeForAll } from "@/components/sections/JusticeForAll";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
// ADDED: quiet outro section between Contact and Footer
import { OutroJimmy } from "@/components/sections/OutroJimmy";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      <FlyingCash />
      <SiteHeader />

      <main className="relative z-20">
        <Hero />
        <BreakingNewsTicker tone="red" />
        <MeetYourLawyer />
        <BreakingNewsTicker tone="yellow" />
        <Services />
        <NotableCases />
        <JusticeForAll />
        <Testimonials />
        <LiveCounter />
        {/* CHANGED: outro now comes BEFORE Contact so the loud CTA is the final note,
            and the quiet Kim line lands as a contrast inside the page flow. */}
        <OutroJimmy />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
