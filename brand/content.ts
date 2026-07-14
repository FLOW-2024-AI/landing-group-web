/*
  CONTENIDO — LANDING GROUP
  Copy alineado al brand book: voz clara, segura, específica y sobria.
  "Decimos: producción bajo control, personalización con propósito,
   entregas que representan tu marca. Evitamos: superlativos y clichés."
*/

import { assetPath } from "./paths";

export const content = {
  brand: {
    name: "LANDING",
    group: "GROUP",
    legal: "LANDING GROUP S.A.C.",
    tagline: "You think it, we land it.",
  },

  nav: {
    links: [
      { label: "Servicios", href: "/#servicios" },
      { label: "Operación", href: "/#resultados" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Trabajos", href: "/#casos" },
    ],
    cta: { label: "Hablemos", href: "/agenda" },
  },

  hero: {
    title: "De la idea a la experiencia.",
    accents: ["experiencia."],
    script: "You think it, we land it.",
    sub: "Merch, BTL y eventos corporativos que llevan las ideas de marca al mundo real. Producción bajo control y entregas que representan tu marca.",
    ctaPrimary: { label: "Conoce lo que hacemos", href: "/#servicios" },
    ctaSecondary: { label: "Hablemos", href: "/agenda" },
    tiles: [
      { label: "LA", note: "You think it, we land it." },
      { label: "BTL", note: "Eventos que se sienten" },
      { label: "Merch", note: "Detalle que se ve" },
    ],
  },

  marquee: [
    "Merch",
    "BTL",
    "Eventos corporativos",
    "Personalización",
    "Producción",
    "Entregas",
  ],

  /* Piezas reales del catálogo (assets 01–15 del banco) */
  works: {
    label: "Trabajos realizados",
    title: "Marcas que se vuelven tangibles.",
    intro: "Una selección de piezas producidas para campañas, equipos y experiencias de marca.",
    items: [
      {
        src: assetPath("/brand/work-heineken.webp"),
        brand: "Heineken",
        piece: "Bucket hat",
        desc: "Bucket hat promocional con una aplicación de marca visible y consistente.",
      },
      {
        src: assetPath("/brand/work-tottus-toalla.webp"),
        brand: "Tottus",
        piece: "Toalla promocional",
        desc: "Pieza estacional desarrollada para acompañar una campaña de verano.",
      },
      {
        src: assetPath("/brand/work-jackdaniels.webp"),
        brand: "Jack Daniel's",
        piece: "Lanyard",
        desc: "Lanyard corporativo con aplicación integral de identidad visual.",
      },
      {
        src: assetPath("/brand/work-trescruces.webp"),
        brand: "Tres Cruces",
        piece: "Mochila cooler",
        desc: "Merch funcional pensado para activaciones y consumo fuera de casa.",
      },
      {
        src: assetPath("/brand/work-primax.webp"),
        brand: "Primax",
        piece: "Tarjetero",
        desc: "Pieza compacta de uso cotidiano con presencia clara de marca.",
      },
      {
        src: assetPath("/brand/work-johnniewalker.webp"),
        brand: "Johnnie Walker",
        piece: "Set de cartas",
        desc: "Set promocional concebido como objeto de marca y entretenimiento.",
      },
      {
        src: assetPath("/brand/work-monster.webp"),
        brand: "Monster",
        piece: "Sombrilla",
        desc: "Elemento de gran formato para reforzar presencia en exteriores.",
      },
      {
        src: assetPath("/brand/work-toldo.webp"),
        brand: "Monster",
        piece: "Toldo promocional",
        desc: "Estructura para activaciones con lectura de marca a distancia.",
      },
      {
        src: assetPath("/brand/work-redbull.webp"),
        brand: "Red Bull",
        piece: "Cooler",
        desc: "Cooler promocional que integra función, exhibición y recordación.",
      },
      {
        src: assetPath("/brand/work-tottus-kit.webp"),
        brand: "Tottus",
        piece: "Kit playero",
        desc: "Conjunto coordinado de productos para una campaña estacional.",
      },
      {
        src: assetPath("/brand/work-four.webp"),
        brand: "Four",
        piece: "Lanyard destapador",
        desc: "Merch funcional diseñado para acompañar experiencias de consumo.",
      },
      {
        src: assetPath("/brand/work-delantal.webp"),
        brand: "Amoramar",
        piece: "Delantal",
        desc: "Delantal personalizado para el equipo de Amoramar, con la frase “Sabemos amar” como aplicación central.",
      },
      {
        src: assetPath("/brand/work-swan-negro.webp"),
        brand: "Swan",
        piece: "Hoodie negro",
        desc: "Textil corporativo de estética sobria y aplicación gráfica cuidada.",
      },
      {
        src: assetPath("/brand/work-swan-marron.webp"),
        brand: "Swan",
        piece: "Hoodie marrón",
        desc: "Variante textil desarrollada para extender el sistema de la marca.",
      },
      {
        src: assetPath("/brand/work-polos.webp"),
        brand: "Pollizos",
        piece: "Polos corporativos",
        desc: "Prendas personalizadas para uso de equipo y comunicación de marca.",
      },
    ],
  },

  services: {
    label: "Servicios",
    title: "Presencia tangible para tu marca.",
    items: [
      {
        n: "01",
        slug: "merch-corporativo",
        name: "Merch corporativo",
        body: "Textiles, drinkware y piezas que la gente conserva, con materiales y acabados bajo control.",
        photo: assetPath("/brand/svc-merch.webp"),
        detail: {
          claim: "Piezas que la gente conserva.",
          intro: "El merch que funciona no es el más barato: es el que tu equipo y tus clientes usan a diario. Seleccionamos materiales, controlamos acabados y cuidamos que cada pieza represente a tu marca fuera de la oficina.",
          bullets: [
            "Textiles: polos, hoodies, gorras y uniformes con telas de gramaje real (220–320 g).",
            "Drinkware y escritorio: botellas térmicas, libretas, bolígrafos y kits de bienvenida.",
            "Curaduría por presupuesto: proponemos el mix de piezas que maximiza uso y percepción.",
            "Muestras físicas antes de producir: apruebas tocando, no imaginando.",
          ],
          gallery: [
            { src: assetPath("/brand/work-heineken.webp"), alt: "Bucket hat producido para Heineken" },
            { src: assetPath("/brand/work-redbull.webp"), alt: "Cooler producido para Red Bull" },
          ],
        },
      },
      {
        n: "02",
        slug: "eventos-btl",
        name: "Eventos y BTL",
        body: "Activaciones y montajes que llevan la marca al mundo real, coordinados de punta a punta.",
        photo: assetPath("/brand/svc-eventos.webp"),
        detail: {
          claim: "La marca, en el mundo real.",
          intro: "Del plano al montaje: activaciones, stands y ambientaciones donde la marca se puede tocar. Coordinamos proveedores, tiempos y permisos para que el día del evento solo pase lo que planificamos.",
          bullets: [
            "Activaciones BTL: sampling, experiencias de marca y puntos de contacto en calle y retail.",
            "Montaje de eventos corporativos: escenografía, mobiliario brandeado y señalética.",
            "Producción de piezas de gran formato: toldos, banners, backings y sombrillas.",
            "Un solo responsable de punta a punta: menos proveedores, menos fricciones.",
          ],
          gallery: [
            { src: assetPath("/brand/work-toldo.webp"), alt: "Toldo producido para Monster" },
            { src: assetPath("/brand/work-monster.webp"), alt: "Sombrilla producida para Monster" },
          ],
        },
      },
      {
        n: "03",
        slug: "personalizacion",
        name: "Personalización",
        body: "Soluciones ajustadas a cada necesidad: técnicas, materiales y formatos según tu marca.",
        photo: assetPath("/brand/svc-personalizacion.webp"),
        detail: {
          claim: "La técnica correcta para cada pieza.",
          intro: "No todas las marcas se aplican igual. Elegimos la técnica según el material, el uso y el presupuesto: lo que va bordado va bordado, lo que va serigrafiado va serigrafiado.",
          bullets: [
            "Bordado plano y 3D para textiles de uso intensivo.",
            "Serigrafía y sublimación para tirajes grandes con color estable.",
            "Impresión UV directa sobre rígidos: coolers, drinkware y acrílicos.",
            "Pruebas de aplicación documentadas antes de cada tiraje.",
          ],
          gallery: [
            { src: assetPath("/brand/tile-la.webp"), alt: "Bordado de alta densidad en proceso" },
            { src: assetPath("/brand/work-johnniewalker.webp"), alt: "Set de cartas producido para Johnnie Walker" },
          ],
        },
      },
      {
        n: "04",
        slug: "produccion",
        name: "Producción bajo control",
        body: "Calidad supervisada pieza por pieza, antes de cada entrega.",
        photo: assetPath("/brand/svc-produccion.webp"),
        detail: {
          claim: "Calidad que se revisa, no se promete.",
          intro: "Producción bajo control significa exactamente eso: fichas técnicas, contramuestras y control de calidad pieza por pieza antes del empaque. Si algo no representa a tu marca, no sale.",
          bullets: [
            "Ficha técnica y contramuestra aprobada antes de producir.",
            "Control de calidad sobre el 100% de las piezas, no por muestreo.",
            "Trazabilidad por lote: sabes qué se produjo, cuándo y con qué materiales.",
            "Reposición ágil ante cualquier observación: respondemos, no discutimos.",
          ],
          gallery: [
            { src: assetPath("/brand/work-delantal.webp"), alt: "Delantal producido para Amoramar con la frase Sabemos amar" },
            { src: assetPath("/brand/work-swan-negro.webp"), alt: "Hoodie producido para Swan" },
          ],
        },
      },
      {
        n: "05",
        slug: "logistica",
        name: "Logística y entregas",
        body: "Coordinación, tiempos y despacho. Tu marca llega donde debe, cuando debe.",
        photo: assetPath("/brand/svc-logistica.webp"),
        detail: {
          claim: "Tu marca llega donde debe.",
          intro: "La mejor pieza pierde si llega tarde o llega mal. Empacamos, consolidamos y despachamos con fechas comprometidas — a una oficina o a cuarenta puntos de venta.",
          bullets: [
            "Empaque individual o por kit, listo para entregar.",
            "Despachos multi-punto: tiendas, sedes y eventos en simultáneo.",
            "Cronograma de entregas compartido y actualizado.",
            "Cobertura nacional desde Lima, con seguimiento por lote.",
          ],
          gallery: [
            { src: assetPath("/brand/work-trescruces.webp"), alt: "Mochila cooler producida para Tres Cruces" },
            { src: assetPath("/brand/work-tottus-kit.webp"), alt: "Kit playero producido para Tottus" },
          ],
        },
      },
      {
        n: "06",
        slug: "acompanamiento",
        name: "Acompañamiento",
        body: "Servicio claro y responsable, de la propuesta comercial al despacho final.",
        photo: assetPath("/brand/svc-acompanamiento.webp"),
        detail: {
          claim: "Un solo interlocutor, cero rodeos.",
          intro: "Trabajas con una persona que conoce tu proyecto de memoria: propone, cotiza claro, avisa a tiempo y responde. Seguridad sin exageración, claridad sin frialdad.",
          bullets: [
            "Propuesta comercial con alcance, materiales y tiempos sin letra chica.",
            "Un ejecutivo asignado durante todo el proyecto.",
            "Avances con evidencia: fotos y muestras en cada hito.",
            "Post-entrega: recogemos feedback y dejamos la reposición lista.",
          ],
          gallery: [
            { src: assetPath("/brand/work-polos.webp"), alt: "Polos producidos para Pollizos" },
            { src: assetPath("/brand/work-jackdaniels.webp"), alt: "Lanyard producido para Jack Daniel's" },
          ],
        },
      },
    ],
  },

  stats: {
    label: "Nuestra operación",
    title: "Diseñada para marcas exigentes.",
    items: [
      { value: "B2B", label: "Soluciones para empresas medianas y grandes" },
      { value: "Perú", label: "Ejecución desde Lima con cobertura nacional" },
      { value: "End to end", label: "Propuesta, producción, control y entrega" },
      { value: "A medida", label: "Merch, textil, BTL y eventos corporativos" },
    ],
  },

  statement: {
    small: "Lo que creemos",
    big: "Las grandes marcas nacen de los detalles.",
    accents: ["detalles."],
  },

  process: {
    label: "Proceso",
    title: "De la propuesta a la entrega.",
    steps: [
      {
        n: "01",
        title: "Propuesta comercial",
        body: "Claridad para decidir: alcance, materiales y tiempos, sin rodeos.",
      },
      {
        n: "02",
        title: "Plan de producción",
        body: "Fases, recursos y cronograma bajo control desde el día uno.",
      },
      {
        n: "03",
        title: "Producción",
        body: "Materiales y acabados supervisados en cada pieza.",
      },
      {
        n: "04",
        title: "Entrega",
        body: "Empaque, despacho y llegada representando a tu marca.",
      },
    ],
  },

  cta: {
    title: "You think it, we land it.",
    body: "Cuéntanos qué necesita tu marca y te enviamos una propuesta clara: alcance, materiales y tiempos.",
    button: { label: "Agenda una reunión", href: "/agenda" },
  },

  agenda: {
    label: "Agenda",
    title: "Reservemos 30 minutos.",
    script: "You think it, we land it.",
    intro: "Cuéntanos qué necesita tu marca. En la reunión revisamos alcance, materiales y tiempos, y sales con los siguientes pasos claros.",
    slots: ["09:00", "10:00", "11:00", "12:00", "15:00", "16:00", "17:00"],
    email: "marketing@grupolanding.pe",
    disclaimer: "Al confirmar se abrirá tu correo con los datos de la reunión listos para enviar. Te respondemos el mismo día hábil.",
  },

  footer: {
    columns: [
      {
        title: "Agencia",
        links: [
          { label: "Servicios", href: "/#servicios" },
          { label: "Proceso", href: "/#proceso" },
        ],
      },
      {
        title: "Trabajo",
        links: [
          { label: "Trabajos realizados", href: "/#casos" },
          { label: "Nuestra operación", href: "/#resultados" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { label: "Instagram", href: "https://www.instagram.com/somoslanding/" },
          { label: "Correo", href: "mailto:marketing@grupolanding.pe" },
        ],
      },
    ],
    note: "Lima, Perú. Entregas a todo el país.",
  },
} as const;

export type Content = typeof content;
export type ServiceItem = (typeof content.services.items)[number];
