"use client";

import { useContent } from "@/components/ContentProvider";
import Reveal from "./Reveal";
import SplitWords from "./SplitWords";
import MarkerStroke from "./MarkerStroke";

/* Cabecera de la página de agenda (lee el contenido en vivo del CMS). */
export default function AgendaHeader() {
  const content = useContent();
  return (
    <>
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
    </>
  );
}
