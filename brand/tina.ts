import client from "@/tina/__generated__/client";
import type { TinaSiteProps } from "@/components/ContentProvider";

/* Consulta el documento del sitio en Tina para habilitar la edición
   visual. Si no hay API disponible (build sin credenciales de Tina
   Cloud, o entorno sin el dev server local), devuelve null y el sitio
   se sirve con el contenido estático de content/site.json — idéntico. */
export async function getSiteTina(): Promise<TinaSiteProps> {
  // DIAGNÓSTICO (temporal): consulta cruda a la API de contenido de Tina
  // para leer el error exacto. El token viaja en el header desde el env;
  // nunca se registra su valor, solo la respuesta del servidor.
  try {
    const cid = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
    const tok = process.env.TINA_TOKEN;
    if (cid && tok) {
      const url = `https://content.tinajs.io/2.4/content/${cid}/github/main`;
      const r = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-API-KEY": tok },
        body: JSON.stringify({ query: '{ site(relativePath: "site.json") { __typename } }' }),
      });
      const body = await r.text();
      console.log("[tina-raw] status:", r.status, "| body:", body.slice(0, 500));
    } else {
      console.log("[tina-raw] faltan credenciales en el build");
    }
  } catch (e) {
    console.log("[tina-raw] error de fetch:", e instanceof Error ? e.message : String(e));
  }
  try {
    const res = await client.queries.site({ relativePath: "site.json" });
    console.log("[getSiteTina] OK — conectado a Tina Cloud");
    return { query: res.query, variables: res.variables, data: res.data };
  } catch (e) {
    console.error(
      "[getSiteTina] fallo:",
      e instanceof Error ? e.message : JSON.stringify(e),
    );
    return null;
  }
}
