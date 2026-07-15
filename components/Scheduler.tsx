"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/components/ContentProvider";
import BrandStar from "./BrandStar";
import Magnetic from "./Magnetic";
import RollText from "./RollText";

/* Agendador brandeado: día hábil + hora + datos, y confirma abriendo el
   correo con todo prellenado (sin backend todavía — SES vendrá después). */
const DAY_FMT = new Intl.DateTimeFormat("es-PE", { weekday: "short", day: "numeric", month: "short" });

function nextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  while (days.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) days.push(new Date(d));
  }
  return days;
}

export default function Scheduler() {
  const content = useContent();
  const days = useMemo(() => nextBusinessDays(10), []);
  const [day, setDay] = useState<Date | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [correo, setCorreo] = useState("");
  const [tema, setTema] = useState("");
  const [sent, setSent] = useState(false);

  const ready = day && slot && nombre.trim() && correo.trim();

  const confirmar = () => {
    if (!ready || !day || !slot) return;
    const fecha = new Intl.DateTimeFormat("es-PE", { dateStyle: "full" }).format(day);
    const subject = `Reunión LANDING GROUP — ${fecha}, ${slot}`;
    const body = [
      `Hola, soy ${nombre}${empresa ? ` de ${empresa}` : ""}.`,
      "",
      `Quisiera agendar una reunión de 30 minutos el ${fecha} a las ${slot}.`,
      tema ? `\nSobre el proyecto:\n${tema}` : "",
      "",
      `Mi correo: ${correo}`,
    ].join("\n");
    window.location.href = `mailto:${content.agenda.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-card bg-white p-10 text-center shadow-lift">
        <BrandStar auto className="mx-auto w-10" />
        <h2 className="display mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[0.95]">
          Solicitud lista.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.6] text-ink/70">
          Se abrió tu correo con los datos de la reunión — envíalo y te confirmamos el mismo día hábil.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Paso 1 y 2: día y hora */}
      <div className="rounded-card bg-white p-7 shadow-lift sm:p-9">
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
          1 · Elige el día
        </p>
        <div className="mt-4 grid grid-cols-5 gap-2">
          {days.map((d) => {
            const active = day?.toDateString() === d.toDateString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() => setDay(d)}
                className={`rounded-button border px-2 py-3 text-center text-[12px] uppercase tracking-[0.06em] transition-colors [font-weight:600] ${
                  active
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-line bg-paper/40 text-ink/70 hover:border-accent hover:text-accent"
                }`}
              >
                {DAY_FMT.format(d).replace(".", "")}
              </button>
            );
          })}
        </div>

        <p className="mt-8 text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
          2 · Elige la hora
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {content.agenda.slots.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              disabled={!day}
              className={`rounded-button border px-5 py-3 text-[13px] tracking-[0.06em] transition-colors [font-weight:600] disabled:cursor-not-allowed disabled:opacity-40 ${
                slot === s
                  ? "border-accent bg-accent text-accent-ink"
                  : "border-line bg-paper/40 text-ink/70 hover:border-accent hover:text-accent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <p className="mt-6 text-[12px] leading-[1.5] text-ink/50">
          Reuniones de 30 min por videollamada · hora de Lima (GMT-5).
        </p>
      </div>

      {/* Paso 3: datos */}
      <div className="rounded-card bg-white p-7 shadow-lift sm:p-9">
        <p className="text-[12px] uppercase tracking-[0.2em] text-accent [font-weight:600]">
          3 · Tus datos
        </p>
        <div className="mt-4 space-y-3">
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre y apellido"
            className="w-full rounded-button border border-line bg-paper/40 px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
          />
          <input
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Empresa"
            className="w-full rounded-button border border-line bg-paper/40 px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
          />
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            placeholder="Correo de trabajo"
            className="w-full rounded-button border border-line bg-paper/40 px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
          />
          <textarea
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="¿Qué necesita tu marca? (opcional)"
            rows={3}
            className="w-full resize-none rounded-button border border-line bg-paper/40 px-4 py-3.5 text-[14px] outline-none transition-colors placeholder:text-ink/40 focus:border-accent"
          />
        </div>

        {day && slot && (
          <p className="mt-4 text-[13px] leading-[1.5] text-ink/70">
            <span className="[font-weight:600]">Resumen:</span>{" "}
            {new Intl.DateTimeFormat("es-PE", { dateStyle: "full" }).format(day)} · {slot}
          </p>
        )}

        <div className="mt-6">
          <Magnetic strength={0.35}>
            <button
              type="button"
              onClick={confirmar}
              disabled={!ready}
              className="btn-fill group inline-block rounded-button bg-accent px-8 py-4 text-[12px] uppercase tracking-[0.16em] text-accent-ink [--fill:var(--brand-ink)] [font-weight:600] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RollText text="Confirmar reunión" />
            </button>
          </Magnetic>
        </div>
        <p className="mt-4 text-[12px] leading-[1.5] text-ink/50">{content.agenda.disclaimer}</p>
      </div>
    </div>
  );
}
