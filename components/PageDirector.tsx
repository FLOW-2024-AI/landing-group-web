"use client";

import { useEffect } from "react";

/* Director de página: un solo rAF global que orquesta
   - la partitura de carga (html.choreo-ready, gateada por fonts.ready)
   - el pliego que cede (--hero-exit + inert del hero cubierto, solo lg)
   Todo scrub es bidireccional y se auto-repara con el siguiente scroll. */
export default function PageDirector() {
  useEffect(() => {
    const html = document.documentElement;

    /* Partitura: arranca cuando la tipografía está lista (cap de 800ms) */
    const ready = () => html.classList.add("choreo-ready");
    let fontTimer: ReturnType<typeof setTimeout> | null = setTimeout(ready, 800);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (fontTimer) clearTimeout(fontTimer);
        fontTimer = null;
        ready();
      });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ready();
      return () => {
        if (fontTimer) clearTimeout(fontTimer);
      };
    }

    const hero = document.getElementById("hero");
    const lg = window.matchMedia("(min-width: 1024px)");

    let raf = 0;
    let lastP = -1;
    let lastCovered = false;

    const tick = () => {
      /* lecturas primero, escrituras después: cero flush intra-frame */
      const vh = window.innerHeight;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / (vh * 0.9)));
      const covered = lg.matches && p > 0.98;

      if (Math.abs(p - lastP) > 0.002) {
        lastP = p;
        html.style.setProperty("--hero-exit", p.toFixed(3));
      }
      /* estado propio: sobrevive a cruces de breakpoint (rotar tablet) */
      if (covered !== lastCovered) {
        lastCovered = covered;
        hero?.toggleAttribute("inert", covered);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    lg.addEventListener("change", onScroll);

    return () => {
      if (fontTimer) clearTimeout(fontTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      lg.removeEventListener("change", onScroll);
      cancelAnimationFrame(raf);
      hero?.removeAttribute("inert");
    };
  }, []);

  return null;
}
