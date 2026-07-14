# LANDING GROUP — Manifiesto de assets (pedir a ChatGPT)

**Instrucciones:** genera cada archivo con el nombre EXACTO de la lista y ponlos
todos en una carpeta `landing-assets` en el Escritorio. JPG o PNG da igual
(yo convierto y optimizo); los SVG entrégalos como archivo .svg (código).
Cuando esté la carpeta, me avisas y los integro todos de una.

## Bloque de estilo (pégalo al final de CADA prompt de foto)

> Fotografía editorial premium, luz natural suave, grano sutil de película,
> paleta estrictamente controlada: verde bosque profundo #074532, beige arena
> #D9CBA8, papel gris cálido #DFE1E0, negro #141B1C. Material y texturas
> reales, detalle visible. SIN texto, SIN logos, SIN marcas de agua en ninguna
> superficie (las prendas/objetos lisos o con etiqueta en blanco). Composición
> limpia con aire, estilo lookbook de agencia.

Los logos los compongo yo encima con el vector — por eso todo va sin logo.

## 1. Logos (vector, lo más importante)

| Archivo | Spec | Prompt |
|---|---|---|
| `logo.svg` | SVG código, un solo color `currentColor`, viewBox ajustado, sin efectos | "SVG de wordmark LANDING en mayúsculas, sans geométrica grotesk de trazos uniformes, la A SIN barra horizontal (forma Λ), y debajo centrado GROUP pequeño con tracking 0.5em. Solo paths, fill currentColor." Adjunta captura del logo del brandbook como referencia y pide que lo replique fiel. |
| `logo-mark.svg` | SVG código, cuadrado, `currentColor` | "SVG del monograma: letras L y Λ (A sin barra) lado a lado, trazos rectos de grosor uniforme, terminales rectos, viewBox cuadrado, fill currentColor." Misma referencia. |

## 2. Hero — 3 piezas flotantes

Formato: **4:5 vertical, mínimo 1600px de ancho**.

| Archivo | Sujeto |
|---|---|
| `hero-1.jpg` | Macro de bordado en tela verde bosque (aguja/hilos crema visibles, textura de tejido protagonista) |
| `hero-2.jpg` | Montaje de evento corporativo: truss/escenario con banners de tela verde lisos, luz de venue |
| `hero-3.jpg` | Bodegón de merch sobre mesa de piedra clara: tote, botella térmica y libreta verdes alineadas |

## 3. Tira de producto — 5 fotos

Formato: **4:5 vertical, mínimo 1200px de ancho**. Producto individual centrado sobre fondo papel/arena.

| Archivo | Sujeto |
|---|---|
| `product-1.jpg` | Gorra verde bosque |
| `product-2.jpg` | Lanyard verde con mosquetón metálico |
| `product-3.jpg` | Libreta verde con bolígrafo |
| `product-4.jpg` | Botella térmica verde mate |
| `product-5.jpg` | Tote bag de lona verde |

## 4. Servicios — 6 fotos (cabecera de cada tarjeta)

Formato: **3:2 horizontal, mínimo 1600px de ancho**.

| Archivo | Sujeto |
|---|---|
| `service-1.jpg` | Pila de textiles verdes doblados con etiquetas en blanco (merch corporativo) |
| `service-2.jpg` | Activación BTL: stand/escenario en armado, personas trabajando con propósito (eventos) |
| `service-3.jpg` | Máquina de bordado o pantalla de serigrafía trabajando sobre tela verde (personalización) |
| `service-4.jpg` | Mesa de control de calidad: piezas alineadas, manos revisando costuras (producción) |
| `service-5.jpg` | Cajas kraft selladas y etiquetadas en blanco, listas en zona de despacho (logística) |
| `service-6.jpg` | Mesa de reunión con muestrarios de tela y papel, manos señalando opciones (acompañamiento) |

## 5. Banda panorámica (sección nueva de showcase)

Formato: **21:9 panorámica, mínimo 2560px de ancho**.

| Archivo | Sujeto |
|---|---|
| `wide-1.jpg` | Plano general de taller/almacén de producción en actividad: mesas, textiles verdes, cajas kraft, personas trabajando — profundidad y escala |

## 6. Casos — 2 fotos

Formato: **1:1, mínimo 1200px**.

| Archivo | Sujeto |
|---|---|
| `case-1.jpg` | Kit de merch corporativo entregado en caja abierta (unboxing premium) |
| `case-2.jpg` | Evento corporativo en marcha: público y ambientación verde de fondo |

## 7. Lenguaje gráfico

| Archivo | Spec | Prompt |
|---|---|---|
| `torn-paper.png` | PNG **con fondo transparente**, ≥2400px ancho, tira horizontal | "Tira horizontal de papel texturizado color #DFE1E0 con el borde SUPERIOR rasgado a mano de forma irregular y realista, fondo transparente" |
| `doodle-star.svg` | SVG stroke `currentColor` | "SVG de estrella de 5 puntas garabateada en una sola pasada de marcador, trazo suelto" |
| `doodle-underline.svg` | SVG stroke `currentColor` | "SVG de subrayado a pincel: trazo horizontal orgánico con leve curva y presión variable" |
| `doodle-arrow.svg` | SVG stroke `currentColor` | "SVG de flecha dibujada a mano apuntando a la derecha, trazo de marcador suelto" |

## 8. Social (opcional — puedo componerla yo)

| Archivo | Spec |
|---|---|
| `og.jpg` | 1200×630, fondo #074532, wordmark crema centrado + "You think it, we land it." |

---

### Qué haré cuando llegue la carpeta

1. Optimizar todo (tamaños web, WebP donde convenga) → `public/brand/`.
2. Reemplazar los crops del PDF: nav/footer con `logo.svg`, favicon con `logo-mark.svg`.
3. Hero tiles → `hero-1/2/3`. Tira → `product-1..5`.
4. Tarjetas de servicio con cabecera fotográfica → `service-1..6`.
5. Nueva banda panorámica con parallax → `wide-1` (entre Statement y Proceso).
6. Casos con foto → `case-1/2`.
7. Doodles oficiales reemplazan los míos; `torn-paper.png` como transición rasgada entre secciones clave.
