"use client";

import { useEffect, useRef, useState } from "react";

/* Odómetro editorial: cada dígito es un tambor que rueda con física de
   muelle y asienta de derecha a izquierda; el sufijo aparece al clavar
   la última columna. El lector de pantalla anuncia la cifra completa. */
const TURNS = 2; /* vueltas completas antes de asentar */
const STRIP = Array.from({ length: TURNS * 10 + 10 }, (_, i) => i % 10);

export default function Odometer({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const digits = String(Math.round(value)).split("");
  const wrap = useRef<HTMLSpanElement>(null);
  const strips = useRef<(HTMLSpanElement | null)[]>([]);
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const cols = strips.current.filter(Boolean) as HTMLSpanElement[];
    const targets = digits.map((d) => TURNS * 10 + Number(d));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cols.forEach((col, i) => {
        col.style.transform = `translateY(${-targets[i]}em)`;
      });
      setDone(true);
      return;
    }

    /* muelle manual: y'' = k(target - y) - c·y' ; asienta der. → izq. */
    const n = cols.length;
    const y = new Array(n).fill(0);
    const v = new Array(n).fill(0);
    const startAt = digits.map((_, i) => (n - 1 - i) * 80);
    const t0 = performance.now();
    let last = t0;
    let raf = 0;

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      let settled = 0;
      cols.forEach((col, i) => {
        if (now - t0 < startAt[i]) return;
        const target = targets[i];
        v[i] += (140 * (target - y[i]) - 16 * v[i]) * dt;
        y[i] += v[i] * dt;
        if (Math.abs(target - y[i]) < 0.001 && Math.abs(v[i]) < 0.01) {
          y[i] = target;
          v[i] = 0;
          settled++;
        }
        col.style.transform = `translateY(${(-y[i]).toFixed(3)}em)`;
      });
      if (settled === n) {
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  return (
    <span ref={wrap} className={`odo ${done ? "odo-done" : ""} ${className}`}>
      {/* los lectores de pantalla anuncian la cifra completa, no tambores */}
      <span className="sr-only">{`${prefix}${Math.round(value)}${suffix}`}</span>
      {prefix && <span aria-hidden>{prefix}</span>}
      <span aria-hidden className="inline-flex">
        {digits.map((_, i) => (
          <span key={i} className="odo-col">
            <span
              ref={(node) => {
                strips.current[i] = node;
              }}
              className="odo-strip"
            >
              {STRIP.map((d, j) => (
                <span key={j}>{d}</span>
              ))}
            </span>
          </span>
        ))}
      </span>
      {suffix && (
        <span aria-hidden className="odo-affix">
          {suffix}
        </span>
      )}
    </span>
  );
}
