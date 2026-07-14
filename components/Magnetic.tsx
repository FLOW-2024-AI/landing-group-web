"use client";

import { useRef, type ReactNode } from "react";

/* Envuelve un botón para que se incline hacia el cursor (efecto magnético). */
export default function Magnetic({
  children,
  strength = 0.35,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <span ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </span>
  );
}
