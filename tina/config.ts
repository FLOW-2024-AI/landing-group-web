import { defineConfig } from "tinacms";

/* TinaCMS — edición visual del contenido de Landing Group.
   - Local: `npm run dev` levanta Tina + Next; admin en /admin/index.html
   - Producción: requiere proyecto en app.tina.io y los secretos
     NEXT_PUBLIC_TINA_CLIENT_ID / TINA_TOKEN en GitHub (ver README).
   El contenido vive en content/site.json; las fotos, en public/brand. */

const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\//, "");

const link = (name: string, label: string) => ({
  type: "object" as const,
  name,
  label,
  fields: [
    { type: "string" as const, name: "label", label: "Texto" },
    { type: "string" as const, name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
  ],
});

export default defineConfig({
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.GITHUB_BRANCH ||
    "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
    ...(basePath ? { basePath } : {}),
  },

  media: {
    tina: {
      // Raíz en "public" (mediaRoot vacío) para que los paths de imagen
      // sean "/brand/xxx.webp" exactamente como los referencia el sitio.
      mediaRoot: "",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "site",
        label: "Contenido del sitio",
        path: "content",
        format: "json",
        match: { include: "site" },
        ui: {
          allowedActions: { create: false, delete: false },
          /* Al abrir el documento, saltar directo a la edición visual
             sobre la portada del sitio (respetando el basePath de Pages). */
          router: () => (basePath ? `/${basePath}/` : "/"),
        },
        fields: [
          {
            type: "object",
            name: "brand",
            label: "Marca",
            fields: [
              { type: "string", name: "name", label: "Nombre" },
              { type: "string", name: "group", label: "Sufijo (GROUP)" },
              { type: "string", name: "legal", label: "Razón social (pie de página)" },
              { type: "string", name: "tagline", label: "Tagline" },
            ],
          },
          {
            type: "object",
            name: "nav",
            label: "Menú superior",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Enlaces del menú",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo técnico)" },
                ],
              },
              link("cta", "Botón principal"),
            ],
          },
          {
            type: "object",
            name: "hero",
            label: "Portada",
            fields: [
              { type: "string", name: "title", label: "Titular grande" },
              {
                type: "string",
                name: "accents",
                label: "Palabras del titular en verde",
                list: true,
                description: "Escribirlas exactamente como aparecen en el titular.",
              },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "sub", label: "Descripción", ui: { component: "textarea" } },
              link("ctaPrimary", "Botón principal"),
              link("ctaSecondary", "Enlace secundario"),
              {
                type: "object",
                name: "tiles",
                label: "Tarjetas flotantes (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Etiqueta grande" },
                  { type: "string", name: "note", label: "Nota pequeña" },
                ],
              },
            ],
          },
          {
            type: "string",
            name: "marquee",
            label: "Cinta en movimiento (palabras)",
            list: true,
          },
          {
            type: "object",
            name: "works",
            label: "Trabajos realizados",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Piezas del catálogo",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.piece].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "image", name: "src", label: "Foto" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "piece", label: "Pieza" },
                  { type: "string", name: "desc", label: "Descripción (hover)", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "services",
            label: "Servicios",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              {
                type: "object",
                name: "items",
                label: "Servicios (6)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.name].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "string", name: "n", label: "Número (01–06)" },
                  { type: "string", name: "slug", label: "URL del servicio (no cambiar sin apoyo técnico)" },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "image", name: "photo", label: "Foto de cabecera" },
                  {
                    type: "object",
                    name: "detail",
                    label: "Página de detalle",
                    fields: [
                      { type: "string", name: "claim", label: "Frase principal" },
                      { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
                      {
                        type: "string",
                        name: "bullets",
                        label: "Qué incluye (viñetas)",
                        list: true,
                      },
                      {
                        type: "object",
                        name: "gallery",
                        label: "Piezas reales (2 fotos)",
                        list: true,
                        ui: { itemProps: (item) => ({ label: item?.alt }) },
                        fields: [
                          { type: "image", name: "src", label: "Foto" },
                          { type: "string", name: "alt", label: "Pie de foto" },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Nuestra operación",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              {
                type: "object",
                name: "items",
                label: "Bloques (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value }) },
                fields: [
                  { type: "string", name: "value", label: "Dato grande" },
                  { type: "string", name: "label", label: "Explicación" },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "statement",
            label: "Frase editorial",
            fields: [
              { type: "string", name: "small", label: "Etiqueta pequeña" },
              { type: "string", name: "big", label: "Frase grande" },
              { type: "string", name: "accents", label: "Palabras en verde", list: true },
            ],
          },
          {
            type: "object",
            name: "process",
            label: "Proceso",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de sección" },
              { type: "string", name: "title", label: "Título" },
              {
                type: "object",
                name: "steps",
                label: "Pasos (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.title].filter(Boolean).join(" · ") }) },
                fields: [
                  { type: "string", name: "n", label: "Número (01–04)" },
                  { type: "string", name: "title", label: "Título del paso" },
                  { type: "string", name: "body", label: "Descripción", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "cta",
            label: "Bloque final de contacto",
            fields: [
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              link("button", "Botón"),
            ],
          },
          {
            type: "object",
            name: "agenda",
            label: "Página de agenda",
            fields: [
              { type: "string", name: "label", label: "Etiqueta" },
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "intro", label: "Introducción", ui: { component: "textarea" } },
              { type: "string", name: "slots", label: "Horarios disponibles", list: true },
              { type: "string", name: "email", label: "Correo que recibe las reuniones" },
              { type: "string", name: "disclaimer", label: "Nota bajo el botón", ui: { component: "textarea" } },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de página",
            fields: [
              {
                type: "object",
                name: "columns",
                label: "Columnas de enlaces",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "Título de columna" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino" },
                    ],
                  },
                ],
              },
              { type: "string", name: "note", label: "Nota final" },
            ],
          },
        ],
      },
    ],
  },
});

// Tina Cloud indexa la rama main vía webhook del push (setup inicial).
