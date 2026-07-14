"use client";

import { useEffect, useRef, useState } from "react";

/* La mano que anota: trazos de marcador que se dibujan solos
   (pathLength=1 + stroke-dashoffset, ver .marker-stroke en globals).
   Tres modos de disparo:
   - drawn (controlado): el padre decide cuándo (ej. Statement)
   - auto: se dibuja al entrar en viewport (ej. Casos, CTA)
   - className="choreo-draw": lo dispara la partitura de carga vía CSS */
type Shape = "underline" | "star" | "circle";

const SHAPES: Record<
  Shape,
  { viewBox: string; preserve?: string; strokeWidth: number; paths: string[] }
> = {
  underline: {
    viewBox: "0 0 320 14",
    preserve: "none",
    strokeWidth: 4.5,
    paths: [
      "M4 9 C 60 4, 150 3, 214 6 C 258 8, 292 9, 316 7",
      "M42 11 C 120 8, 210 8, 282 10",
    ],
  },
  star: {
    viewBox: "0 0 48 48",
    strokeWidth: 2.4,
    paths: ["M24 5 L29 19 L44 19 L32 28 L37 43 L24 33 L11 43 L16 28 L4 19 L19 19 Z M24 5 L20 42"],
  },
  circle: {
    viewBox: "0 0 64 40",
    preserve: "none",
    strokeWidth: 3,
    paths: ["M8 22 C 6 10, 28 4, 44 7 C 58 10, 60 24, 48 31 C 34 38, 10 34, 9 23 C 8 16, 18 9, 34 8"],
  },
};

export default function MarkerStroke({
  shape,
  drawn,
  auto = false,
  beat = 0,
  className = "",
}: {
  shape: Shape;
  drawn?: boolean;
  auto?: boolean;
  beat?: number;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [selfDrawn, setSelfDrawn] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSelfDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto]);

  const spec = SHAPES[shape];
  const isDrawn = drawn ?? selfDrawn;

  return (
    <svg
      ref={ref}
      viewBox={spec.viewBox}
      preserveAspectRatio={spec.preserve}
      aria-hidden
      fill="none"
      className={`marker-stroke ${isDrawn ? "is-drawn" : ""} ${className}`}
      style={{ ["--beat" as string]: `${beat}ms` }}
    >
      {spec.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          stroke="currentColor"
          strokeWidth={spec.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={i > 0 ? { transitionDelay: `calc(var(--beat, 0ms) + ${i * 180}ms)` } : undefined}
        />
      ))}
    </svg>
  );
}
