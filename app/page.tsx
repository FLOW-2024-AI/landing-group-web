import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PhotoStrip from "@/components/PhotoStrip";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Statement from "@/components/Statement";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import CtaFinal from "@/components/CtaFinal";
import Footer from "@/components/Footer";
import ContentProvider from "@/components/ContentProvider";
import { getSiteTina } from "@/brand/tina";

export default async function Home() {
  const tina = await getSiteTina();
  return (
    <ContentProvider tina={tina}>
      <Nav />
      {/* El footer institucional permanece siempre como módulo final. */}
      <main className="telon-main">
        <Hero />
        {/* pliego-cover: este bloque sube y cubre el hero fijado */}
        <div className="pliego-cover">
          <Marquee />
          <PhotoStrip />
          <Services />
          <Stats />
          <Statement />
          <Process />
          <Testimonials />
          <CtaFinal />
        </div>
      </main>
      <Footer />
    </ContentProvider>
  );
}
