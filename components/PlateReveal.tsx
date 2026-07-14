"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* Placa de revelado: la foto nace cubierta por su "papel protector" arena;
   la placa sube como cortina mientras la foto asienta de 1.08 a 1.
   La imagen hija debe llevar la clase "plate-img".
   - mode "io": se revela al entrar al 30% del viewport (one-shot, estado React)
   - mode "choreo": lo dispara la partitura de carga vía CSS (html.choreo-ready) */
export default function PlateReveal({
  children,
  beat = 0,
  mode = "io",
  className = "",
  style,
}: {
  children: ReactNode;
  beat?: number;
  mode?: "io" | "choreo";
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (mode !== "io") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mode]);

  const stateClass = mode === "choreo" ? "choreo-plate" : revealed ? "is-revealed" : "";

  return (
    <div
      ref={ref}
      className={`plate-wrap ${stateClass} ${className}`}
      style={{ ...style, ["--beat" as string]: `${beat}ms` }}
    >
      {children}
      <div className="plate-cover" aria-hidden />
    </div>
  );
}
