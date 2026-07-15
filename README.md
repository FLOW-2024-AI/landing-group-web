# Landing Group

Sitio comercial de Landing Group para presentar servicios de merch corporativo,
eventos BTL, personalización, producción, logística y trabajos realizados.

## Sitio público

[https://flow-2024-ai.github.io/landing-group-web/](https://flow-2024-ai.github.io/landing-group-web/)

## Desarrollo local

```bash
npm ci
npm run dev -- -p 3010
```

## Validación

```bash
npm run lint
npm run build
```

Cada actualización de `main` se compila y publica automáticamente mediante
GitHub Pages.

## Editar el contenido sin tocar código (CMS)

Todo el contenido editable del sitio (textos, servicios, trabajos, fotos,
horarios de agenda, pie de página) vive en **`content/site.json`**, y el
esquema **`.pages.yml`** lo expone como formularios amigables en
[Pages CMS](https://pagescms.org).

### Puesta en marcha (una sola vez, por el administrador del repo)

1. Invitar al editor como colaborador: **Settings → Collaborators → Add people**
   (necesita una cuenta de GitHub y permiso *Write*).
2. El editor entra a [app.pagescms.org](https://app.pagescms.org), inicia sesión
   **Sign in with GitHub** y autoriza el repositorio `landing-group-web`.

### Flujo de edición (el cliente, cuando quiera)

1. Entrar a [app.pagescms.org](https://app.pagescms.org) → elegir **landing-group-web**.
2. Abrir **Contenido del sitio** y editar con formularios: textos, fotos
   (se suben a `public/brand/`), viñetas, horarios…
3. **Save**: cada guardado es un commit a `main` y el sitio se republica
   solo en ~2 minutos.

Notas:
- Los campos marcados "no cambiar sin apoyo técnico" (destinos `href`, `slug`)
  afectan enlaces y URLs; todo lo demás es libre.
- Las fotos de catálogo lucen mejor con fondo blanco (pipeline de limpieza
  documentado en `BRAND_HANDOFF.md`).
