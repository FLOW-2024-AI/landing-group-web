"use client";

import Image from "next/image";
import { assetPath } from "@/brand/paths";
import { useEffect, useRef, useState } from "react";

/* Estrella de marcador REAL del brand book (extraída en HD de la portada,
   con alfa). Con auto=true hace pop al entrar en viewport; sin auto queda
   a merced de las clases del caller (ej. star-pop de la partitura). */
export default function BrandStar({
  className = "",
  auto = false,
}: {
  className?: string;
  auto?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!auto) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [auto]);

  return (
    <span
      ref={ref}
      aria-hidden
      className={`inline-block ${auto ? `brand-star ${inView ? "bs-in" : ""}` : ""} ${className}`}
    >
      <Image src={assetPath("/brand/star.png")} alt="" width={275} height={325} className="h-auto w-full" />
    </span>
  );
}
