/* Trazos manuales del lenguaje gráfico LANDING (brand book pág. 20):
   estrella garabateada y subrayado a pincel. Heredan currentColor. */

export function StarDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={className}
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M24 5 L29 19 L44 19 L32 28 L37 43 L24 33 L11 43 L16 28 L4 19 L19 19 Z M24 5 L20 42" />
    </svg>
  );
}

export function UnderlineDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 14"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={className}
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    >
      <path d="M4 9 C 60 4, 150 3, 214 6 C 258 8, 292 9, 316 7" />
      <path d="M42 11 C 120 8, 210 8, 282 10" strokeWidth="2.4" opacity="0.65" />
    </svg>
  );
}
