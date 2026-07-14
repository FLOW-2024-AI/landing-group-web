"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/brand/content";
import Reveal from "./Reveal";
import MarkerStroke from "./MarkerStroke";

/* Statement scrubbed: las palabras se "pintan" con el scroll
   (bidireccional); cuando la palabra clave termina de pintarse de verde,
   una mano invisible la subraya con marcador (one-shot). */
export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [underlined, setUnderlined] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLElement>(".scrub-word"));
    const accentIndex = words.findIndex((w) => w.classList.contains("is-accent"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      words.forEach((w) => w.classList.add("filled"));
      setUnderlined(true);
      return;
    }

    let raf = 0;
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.88 - r.top) / (r.height + vh * 0.5)));
      let accentFilled = false;
      words.forEach((w, i) => {
        const filled = (i + 0.6) / words.length <= p;
        w.classList.toggle("filled", filled);
        if (i === accentIndex && filled) accentFilled = true;
      });
      if (accentFilled) setUnderlined(true); /* one-shot: no se des-subraya */
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const normalized = (w: string) => w.toLowerCase().replace(/[.,;:!?¿¡"'()]/g, "");
  const accentSet = new Set(content.statement.accents.map(normalized));

  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-32 sm:px-8 sm:py-44">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="text-[12px] uppercase tracking-[0.2em] text-ink/45 [font-weight:600]">
            {content.statement.small}
          </p>
        </Reveal>
        <p ref={ref} className="display mt-8 text-[clamp(3rem,7.5vw,6.4rem)] leading-[0.95]">
          <span className="sr-only">{content.statement.big}</span>
          {content.statement.big.split(" ").map((word, i) => {
            const isAccent = accentSet.has(normalized(word));
            return (
              <span
                key={i}
                aria-hidden
                className={`scrub-word ${isAccent ? "is-accent relative" : ""}`}
              >
                {word}
                {isAccent && (
                  <MarkerStroke
                    shape="underline"
                    drawn={underlined}
                    className="absolute -bottom-3 left-0 h-[12px] w-full text-sage"
                  />
                )}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
