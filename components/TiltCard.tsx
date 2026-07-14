"use client";

import { useRef, type ReactNode, type HTMLAttributes } from "react";

/* Tarjeta 3D: rota siguiendo el cursor (máx ~6°) y expone --gx/--gy
   para que un .glare interno ilumine donde está el mouse. */
type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  max?: number;
};

export default function TiltCard({ children, className = "", max = 6, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-py * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(px * max).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      {...rest}
      ref={ref}
      data-tilt
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
