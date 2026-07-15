// tina/config.ts
import { defineConfig } from "tinacms";
var basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\//, "");
var link = (name, label) => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "string", name: "label", label: "Texto" },
    { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
  ]
});
var config_default = defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.GITHUB_BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    ...basePath ? { basePath } : {}
  },
  media: {
    tina: {
      mediaRoot: "brand",
      publicFolder: "public"
    }
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
          allowedActions: { create: false, delete: false }
        },
        fields: [
          {
            type: "object",
            name: "brand",
            label: "Marca",
            fields: [
              { type: "string", name: "name", label: "Nombre" },
              { type: "string", name: "group", label: "Sufijo (GROUP)" },
              { type: "string", name: "legal", label: "Raz\xF3n social (pie de p\xE1gina)" },
              { type: "string", name: "tagline", label: "Tagline" }
            ]
          },
          {
            type: "object",
            name: "nav",
            label: "Men\xFA superior",
            fields: [
              {
                type: "object",
                name: "links",
                label: "Enlaces del men\xFA",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Destino (no cambiar sin apoyo t\xE9cnico)" }
                ]
              },
              link("cta", "Bot\xF3n principal")
            ]
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
                description: "Escribirlas exactamente como aparecen en el titular."
              },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "sub", label: "Descripci\xF3n", ui: { component: "textarea" } },
              link("ctaPrimary", "Bot\xF3n principal"),
              link("ctaSecondary", "Enlace secundario"),
              {
                type: "object",
                name: "tiles",
                label: "Tarjetas flotantes (3)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Etiqueta grande" },
                  { type: "string", name: "note", label: "Nota peque\xF1a" }
                ]
              }
            ]
          },
          {
            type: "string",
            name: "marquee",
            label: "Cinta en movimiento (palabras)",
            list: true
          },
          {
            type: "object",
            name: "works",
            label: "Trabajos realizados",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Piezas del cat\xE1logo",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.brand, item?.piece].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "image", name: "src", label: "Foto" },
                  { type: "string", name: "brand", label: "Marca cliente" },
                  { type: "string", name: "piece", label: "Pieza" },
                  { type: "string", name: "desc", label: "Descripci\xF3n (hover)", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "services",
            label: "Servicios",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              {
                type: "object",
                name: "items",
                label: "Servicios (6)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.name].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "string", name: "n", label: "N\xFAmero (01\u201306)" },
                  { type: "string", name: "slug", label: "URL del servicio (no cambiar sin apoyo t\xE9cnico)" },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "body", label: "Resumen (tarjeta)", ui: { component: "textarea" } },
                  { type: "image", name: "photo", label: "Foto de cabecera" },
                  {
                    type: "object",
                    name: "detail",
                    label: "P\xE1gina de detalle",
                    fields: [
                      { type: "string", name: "claim", label: "Frase principal" },
                      { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
                      {
                        type: "string",
                        name: "bullets",
                        label: "Qu\xE9 incluye (vi\xF1etas)",
                        list: true
                      },
                      {
                        type: "object",
                        name: "gallery",
                        label: "Piezas reales (2 fotos)",
                        list: true,
                        ui: { itemProps: (item) => ({ label: item?.alt }) },
                        fields: [
                          { type: "image", name: "src", label: "Foto" },
                          { type: "string", name: "alt", label: "Pie de foto" }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "stats",
            label: "Nuestra operaci\xF3n",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              {
                type: "object",
                name: "items",
                label: "Bloques (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.value }) },
                fields: [
                  { type: "string", name: "value", label: "Dato grande" },
                  { type: "string", name: "label", label: "Explicaci\xF3n" }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "statement",
            label: "Frase editorial",
            fields: [
              { type: "string", name: "small", label: "Etiqueta peque\xF1a" },
              { type: "string", name: "big", label: "Frase grande" },
              { type: "string", name: "accents", label: "Palabras en verde", list: true }
            ]
          },
          {
            type: "object",
            name: "process",
            label: "Proceso",
            fields: [
              { type: "string", name: "label", label: "Etiqueta de secci\xF3n" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              {
                type: "object",
                name: "steps",
                label: "Pasos (4)",
                list: true,
                ui: { itemProps: (item) => ({ label: [item?.n, item?.title].filter(Boolean).join(" \xB7 ") }) },
                fields: [
                  { type: "string", name: "n", label: "N\xFAmero (01\u201304)" },
                  { type: "string", name: "title", label: "T\xEDtulo del paso" },
                  { type: "string", name: "body", label: "Descripci\xF3n", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "cta",
            label: "Bloque final de contacto",
            fields: [
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "body", label: "Texto", ui: { component: "textarea" } },
              link("button", "Bot\xF3n")
            ]
          },
          {
            type: "object",
            name: "agenda",
            label: "P\xE1gina de agenda",
            fields: [
              { type: "string", name: "label", label: "Etiqueta" },
              { type: "string", name: "title", label: "T\xEDtulo" },
              { type: "string", name: "script", label: "Frase manuscrita" },
              { type: "string", name: "intro", label: "Introducci\xF3n", ui: { component: "textarea" } },
              { type: "string", name: "slots", label: "Horarios disponibles", list: true },
              { type: "string", name: "email", label: "Correo que recibe las reuniones" },
              { type: "string", name: "disclaimer", label: "Nota bajo el bot\xF3n", ui: { component: "textarea" } }
            ]
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de p\xE1gina",
            fields: [
              {
                type: "object",
                name: "columns",
                label: "Columnas de enlaces",
                list: true,
                ui: { itemProps: (item) => ({ label: item?.title }) },
                fields: [
                  { type: "string", name: "title", label: "T\xEDtulo de columna" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    ui: { itemProps: (item) => ({ label: item?.label }) },
                    fields: [
                      { type: "string", name: "label", label: "Texto" },
                      { type: "string", name: "href", label: "Destino" }
                    ]
                  }
                ]
              },
              { type: "string", name: "note", label: "Nota final" }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
