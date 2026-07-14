import type { Metadata } from "next";
import { content } from "@/brand/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SplitWords from "@/components/SplitWords";
import MarkerStroke from "@/components/MarkerStroke";
import Scheduler from "@/components/Scheduler";

export const metadata: Metadata = {
  title: "Agenda una reunión — LANDING GROUP",
  description: content.agenda.intro,
};

export default function AgendaPage() {
  return (
    <>
      <Nav />
      <main className="telon-main">
        <section className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-32 sm:px-8">
          <Reveal>
            <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
              {content.agenda.label}
            </p>
          </Reveal>
          <h1 className="display mt-4 max-w-3xl text-[clamp(2.8rem,6.5vw,5.4rem)] leading-[0.92]">
            <SplitWords text={content.agenda.title} step={70} />
          </h1>
          <Reveal delay={300}>
            <p className="mt-3 font-script text-[clamp(1.4rem,2.4vw,1.9rem)] leading-none text-accent">
              {content.agenda.script}
            </p>
          </Reveal>
          <MarkerStroke shape="underline" auto beat={600} className="mt-1 h-[10px] w-[min(280px,55vw)] text-sage" />
          <Reveal delay={450}>
            <p className="mt-6 max-w-xl text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-ink/70">
              {content.agenda.intro}
            </p>
          </Reveal>

          <div className="mt-12">
            <Scheduler />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
