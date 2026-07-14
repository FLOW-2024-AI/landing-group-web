"use client";

import { useEffect, useRef } from "react";
import { content } from "@/brand/content";

/* Dos bandas cruzadas que reaccionan al scroll: aceleran con la
   velocidad y se inclinan (skew) en la dirección del movimiento.
   Sin JS (o con reduced-motion) quedan las animaciones CSS de base. */
const ROTATION = [-1.6, 1.3];

function Band({ reverse = false, className = "" }: { reverse?: boolean; className?: string }) {
  const items = [...content.marquee, ...content.marquee, ...content.marquee, ...content.marquee];
  return (
    <div data-band={reverse ? "rev" : "fwd"} className={`w-[110%] -ml-[5%] overflow-hidden py-3.5 ${className}`}>
      <div
        data-track
        className={`flex w-max items-center gap-8 pr-8 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
        aria-hidden
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="display text-[17px] tracking-[0.14em]">{item}</span>
            <span className="text-[9px] opacity-60">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;

    const bands = Array.from(el.querySelectorAll<HTMLElement>("[data-band]"));
    const tracks = bands.map((b) => b.querySelector<HTMLElement>("[data-track]")!);
    if (tracks.some((t) => !t)) return;

    /* el JS toma el control: apaga la animación CSS y mueve a mano */
    tracks.forEach((t) => (t.style.animation = "none"));
    let half = tracks.map((t) => t.scrollWidth / 2);
    const pos = bands.map((b, i) => (b.dataset.band === "rev" ? -half[i] : 0));

    /* remedir tras el font swap (Barlow cambia el ancho del track) */
    document.fonts?.ready?.then(() => {
      half = tracks.map((t) => t.scrollWidth / 2);
      pos.forEach((p, i) => {
        pos[i] = -((-p) % half[i]);
      });
    });

    let lastY = window.scrollY;
    let vel = 0;
    let raf = 0;
    let active = false;

    const tick = () => {
      if (!active) return;
      const y = window.scrollY;
      vel += (y - lastY - vel) * 0.12; /* velocidad suavizada */
      lastY = y;

      const speed = 1.1 + Math.min(Math.abs(vel) * 0.35, 11);
      const skew = Math.max(-9, Math.min(9, -vel * 0.28));

      bands.forEach((b, i) => {
        const dir = b.dataset.band === "rev" ? 1 : -1;
        pos[i] += dir * speed;
        if (pos[i] <= -half[i]) pos[i] += half[i];
        if (pos[i] > 0) pos[i] -= half[i];
        tracks[i].style.transform = `translateX(${pos[i].toFixed(1)}px)`;
        b.style.transform = `rotate(${ROTATION[i]}deg) skewX(${skew.toFixed(2)}deg)`;
      });

      raf = requestAnimationFrame(tick);
    };

    /* el loop solo corre con las bandas en viewport; al reanudar se
       resincroniza lastY/vel para no interpretar la distancia scrolleada
       durante la pausa como un latigazo de velocidad */
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !active) {
        active = true;
        lastY = window.scrollY;
        vel = 0;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && active) {
        active = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="relative overflow-hidden py-12">
      <Band className="rotate-[-1.6deg] bg-accent text-paper" />
      <Band reverse className="-mt-4 rotate-[1.3deg] bg-sand text-ink" />
    </div>
  );
}
