# LANDING GROUP — estado de la identidad en la landing

**La identidad del Brand Book 2026 ya está aplicada** (13-jul-2026). Este
documento registra el mapeo y lo que falta por reemplazar con material real.

## 1. Identidad aplicada (fuente: Brand Book 2026)

| Elemento | Valor | Dónde vive |
|---|---|---|
| Landing Green | `#074532` | `--brand-accent` en `brand/tokens.css` |
| Deep Ink | `#141B1C` | `--brand-ink` |
| Paper | `#DFE1E0` | `--brand-paper` (lienzo) |
| Warm Sand | `#D9CBA8` | `--brand-sand` |
| Muted Sage | `#2A6557` | `--brand-sage` |
| White | `#FFFFFF` | `--brand-white` (tarjetas) |
| Titulares | Barlow Condensed SemiBold, MAYÚSCULAS | clase `.display` (globals) + `app/layout.tsx` |
| Texto | Inter Regular | `app/layout.tsx` |
| Acento manual | Caveat (sustituto de la caligrafía del book) | `font-script` |
| Botones | Redondeados (14px), uppercase, tracking 0.16em | componentes |
| Lenguaje gráfico | Grano de papel (body::before), estrella y subrayado a mano (`components/Doodles.tsx`) | global |
| Voz | Clara, segura, específica, sobria — sin superlativos | `brand/content.ts` |

## Motion v3 — "La mesa de imprenta" (14-jul-2026)

Sistema diseñado por panel de 3 direcciones + crítico de coherencia, en tres voces
(conserva todo lo anterior: cursor cruz, cascada, marquee con velocidad, scrub del
statement, tilt+glare, magnéticos, roll, fill, cards de afuera hacia adentro):

**Voz 1 — pliegos que se cubren y descubren**
- *El pliego cede*: en desktop el hero queda fijado y la página sube por encima como una hoja; el hero escala a 0.96 bajo un velo de tinta (`--hero-exit`, lo escribe `PageDirector`). El hero cubierto recibe `inert`.
- *Placas de revelado* (`PlateReveal`): las fotos de portfolio nacen bajo su "papel protector" arena que despega hacia arriba mientras la foto asienta de 1.08→1.
- *Hero tiles*: las tres tarjetas entran desde arriba, abajo e izquierda; conservan profundidad y flotación. Al hover, la tarjeta activa sube de capa, se desplaza y escala para que su copy quede completamente legible.
- *Cierre institucional*: el footer vive en flujo normal inmediatamente después del CTA para asegurar que marca, redes, contacto y datos legales siempre queden visibles.

**Voz 2 — la mano que anota** (`MarkerStroke`: pathLength=1 + dashoffset)
- *La firma que se escribe*: "You think it, we land it." se escribe con barrido de tinta + subrayado que se dibuja + estrella con pop.
- *Statement*: al pintarse "detalles." de verde, se subraya solo (one-shot).
- *El hilo del proceso*: línea de marcador scrubbed por scroll que conecta los 4 pasos; óvalos rodean los números alcanzados y los títulos pasan de gris a tinta.
- *Casos*: estrella que se dibuja junto a cada atribución.

**Voz 3 — mecánica de imprenta**
- *Odómetro* (`Odometer`): cifras como tambores que ruedan con física de muelle (única física de la página), asientan derecha→izquierda, sufijo aparece al clavar.

**Partitura de carga**: `html.js` (script inline) + `html.choreo-ready` (fonts.ready,
cap 800ms) orquestan: chars 0ms → firma 700 → sub 850 → CTAs 950 → tiles 1050+ →
nav 1150. Sin splash: el contenido es la apertura.

**Garantías** (auditadas por revisión adversarial multi-agente):
- Sin JS o con bundle caído: página 100% visible (estados ocultos bajo `.js` + forced-reveal a los 3.5s).
- `prefers-reduced-motion`: todo degrada a estático.
- Lectores de pantalla: cifras y statement con `sr-only` (tambores/palabras aria-hidden).
- Presupuesto: 1 región fijada (hero), un solo scrub central, marquee gateada por viewport, lecturas-antes-de-escrituras en el rAF global, `will-change` solo durante interacción.
- Cursor cruz constante y sin scroll-hijacking: el scroll nativo manda.

## 2. Assets en uso (banco web oficial, 14-jul-2026)

Fuente: `~/Desktop/landing_group_web_asset_bank` (30 assets + identidad vectorial,
manifiesto CSV y README de Codex). Instalados optimizados en `public/brand/`:

| Asset web | Origen (banco) | Uso |
|---|---|---|
| `logo-black.png` / `logo-white-lg.png` | wordmark original HD entregado por el cliente | Nav responsive, footer y wordmark gigante |
| `la-mark-*.svg` | identity/ monograma vectorial | Favicons y aplicaciones compactas |
| `app/icon.png` + `app/apple-icon.png` | identity/ favicons oficiales | Favicon / iOS |
| `work-*.webp` (15 piezas) | 01–15 portfolio REAL (catálogo) | Selección destacada + galería completa de trabajos realizados |
| `tile-la/btl/merch.webp` | 22 / 19 / 16 conceptuales 4K | Tiles flotantes del hero |
| `svc-merch/eventos/personalizacion/produccion/logistica/acompanamiento.webp` | 17/20/23/21/24/18 conceptuales | Cabecera fotográfica de las 6 tarjetas de servicio |
| `cta-bg.webp` | 25 fondo CTA oscuro | Fondo del bloque final bajo velo de tinta |
| `texture-paper/green.webp` + `overlay-grid.webp` | 26/27/30 | Fondos táctiles en portfolio y bloque de operación |
| `app/opengraph-image.png` / `twitter-image.png` | generación final alineada al hero | Vista previa al compartir la web |

Regla del README del banco: los assets 16–25 son **conceptuales de marca** — no
describirlos como trabajos/eventos ejecutados; 01–15 sí son piezas reales de catálogo.
Todos los assets de portfolio ya están integrados. Las texturas 28/29 quedan disponibles
como reserva para futuras páginas o campañas.

## 3. Pendiente

- [x] ~~Vector original del logo~~ → resuelto con el asset bank (logo-ink/white.svg + favicons oficiales).
- [x] ~~Fotografía~~ → resuelto con el banco (portfolio real + conceptuales 4K).
- [x] ~~Métricas provisionales~~ → retiradas; se reemplazaron por capacidades verificables de la operación.
- [x] ~~Testimonios anónimos provisionales~~ → retirados; la sección ahora muestra trabajos reales.
- [x] ~~Correo provisional~~ → reemplazado por `marketing@grupolanding.pe`; Instagram enlaza a `@somoslanding`.
- [x] ~~Tarjeta social~~ → Open Graph y X/Twitter listas con una pieza visual propia.
- [ ] **Dominio final** → confirmar URL pública antes del deploy y configurar metadata base/canonical.
- [ ] **Agenda conectada** → el flujo actual prepara un correo; reemplazar por calendario real cuando el cliente elija proveedor/cuenta.
- [ ] **Analítica y privacidad** → definir herramienta de medición, consentimiento y textos legales antes de publicar.
- [ ] **Validación comercial** → el cliente debe aprobar el copy técnico y confirmar que las 15 piezas pueden mostrarse públicamente.

## 4. Reglas para mantener

- Jerarquía: display condensado en mayúsculas para titulares; Inter para todo lo demás; manuscrita solo como acento puntual.
- Una sola voz cromática (Landing Green); sand y sage como apoyo; nada fuera de la paleta oficial.
- Copy: "producción bajo control", "personalización con propósito", "entregas que representan tu marca". Evitar: "somos los mejores", "calidad 100% garantizada", "increíble/único".
- Esquinas redondeadas por decisión de Hugo (13-jul-2026): tarjetas 24px, botones 14px — el book proponía esquinas casi rectas; si el cliente pide volver al look editorial recto, es un cambio de 3 valores en `brand/tokens.css`.

## 5. Correr el proyecto

```bash
npm run dev     # desarrollo (launcher: puerto 3010)
npm run build   # verificación de producción
```

Gotcha de verificación: si el Browser pane está oculto, Chrome pausa
rAF/IntersectionObserver y las animaciones parecen muertas — es la pestaña
en background, no un bug. Verificar con la pestaña visible o con Chrome headless.
