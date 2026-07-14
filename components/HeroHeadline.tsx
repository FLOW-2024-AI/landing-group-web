"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/brand/content";

/* Titular del hero: cada carácter emerge de su máscara en cascada cuando
   la tipografía está lista (cap de 800ms para nunca bloquear), y al
   scrollear el bloque se va con parallax. La cascada vive en estado React
   (sobrevive a Fast Refresh); el parallax se auto-repara con el scroll. */
export default function HeroHeadline() {
  const ref = useRef<HTMLSpanElement>(null);
  const [charsIn, setCharsIn] = useState(false);

  useEffect(() => {
    let raf = 0;
    /* doble rAF tras fonts.ready: pinta el estado inicial antes de animar */
    const go = () => {
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setCharsIn(true));
      });
    };
    let timer: ReturnType<typeof setTimeout> | null = setTimeout(go, 800);
    document.fonts?.ready?.then(() => {
      if (timer) clearTimeout(timer);
      timer = null;
      go();
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => {
        if (timer) clearTimeout(timer);
        cancelAnimationFrame(raf);
      };
    }

    const h1 = ref.current?.closest("h1") as HTMLElement | null;
    let scrollRaf = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRaf);
      scrollRaf = requestAnimationFrame(() => {
        if (!h1) return;
        const y = Math.min(window.scrollY, 800);
        h1.style.transform = `translateY(${(-y * 0.16).toFixed(1)}px)`;
        h1.style.opacity = `${Math.max(0, 1 - y / 680).toFixed(3)}`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollRaf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const normalized = (w: string) => w.toLowerCase().replace(/[.,;:!?¿¡"'()]/g, "");
  const accentSet = new Set(content.hero.accents.map(normalized));
  let charIndex = 0;

  return (
    <>
      <span className="sr-only">{content.hero.title}</span>
      <span ref={ref} aria-hidden className={charsIn ? "chars-in" : ""}>
        {content.hero.title.split(" ").map((word, wi) => (
          <span
            key={wi}
            className={`char-mask ${accentSet.has(normalized(word)) ? "text-accent" : ""}`}
          >
            {word.split("").map((ch, ci) => (
              <span
                key={ci}
                className="char"
                style={{ ["--d" as string]: `${250 + charIndex++ * 20}ms` }}
              >
                {ch}
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}
