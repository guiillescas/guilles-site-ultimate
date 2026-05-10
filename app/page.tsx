import { Preloader } from "@/components/chrome/Preloader";
import { BgCanvas } from "@/components/chrome/BgCanvas";
import { Nav } from "@/components/chrome/Nav";
import { SkipLink } from "@/components/chrome/SkipLink";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Signal } from "@/components/sections/Signal";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <SkipLink />
      <Preloader />
      <BgCanvas />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Signal />
        <About />
        <Experience />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
