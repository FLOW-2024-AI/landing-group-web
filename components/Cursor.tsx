"use client";

import { useEffect, useRef } from "react";

/* Cursor propio (solo desktop): una cruz abstracta CONSTANTE que sigue
   al mouse al instante. No cambia de forma ni de tamaño con el contexto
   — la forma la define .cursor-core en app/globals.css. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    const el = ref.current!;
    html.classList.add("has-cursor");

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (!html.hasAttribute("data-cursor-on")) html.setAttribute("data-cursor-on", "");
    };

    const onLeave = () => html.removeAttribute("data-cursor-on");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      html.classList.remove("has-cursor");
      html.removeAttribute("data-cursor-on");
    };
  }, []);

  return (
    <div ref={ref} className="cursor" aria-hidden>
      <div className="cursor-core" />
    </div>
  );
}
