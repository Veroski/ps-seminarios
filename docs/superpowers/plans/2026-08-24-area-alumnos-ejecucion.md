# Área de alumnos GHL — Plan de ejecución (para agente ejecutor)

> **Para el agente ejecutor (Sonnet):** este plan es autocontenido. Ejecuta task por task, marca los checkboxes, y registra cada ID real en `docs/ghl/student-area-inventory.md`. No improvises fuera del plan. Si un paso falla o la UI de GHL no coincide con lo descrito, PARA y reporta al usuario en vez de inventar una alternativa.

**Objetivo:** dejar funcionando en modo test el flujo completo: web pública → checkout GHL (Stripe test) → alta automática en curso + comunidad → email de bienvenida → acceso al portal → lección con vídeo de YouTube oculto → revocación por tag.

**Fecha:** 2026-08-24
**Repo:** `C:\Users\user\Desktop\clinic-scale-system\ps-seminarios`
**Plan padre:** `docs/superpowers/plans/2026-07-01-area-alumnos-ghl.md` (referencia; este plan lo supersede en alcance para el piloto)

---

## Decisiones cerradas (no reabrir)

| Decisión | Valor |
|---|---|
| Modelo de pago | Pago único |
| Precio provisional | 100 € por curso (test mode; el real se fijará antes de live) |
| Acceso | Ilimitado |
| Vídeo | Embed de YouTube en modo **oculto/no listado** (sin DRM por ahora). Cuando existan vídeos reales, se sustituye la URL del embed |
| Grace period | No aplica (pago único) → NO crear workflow de grace |
| Reembolso | Revisión manual → la revocación se dispara añadiendo tag manualmente |
| App móvil | GoKollab por defecto, sin app branded |
| Dominio del portal | Mantener el default `https://i2hujpae67nohi62db2h.app.clientclub.net/` para el piloto. Subdominio propio se decidirá antes de live |
| API de GHL | Solo para lo que la UI no haga más rápido. NO construir backend propio |

## Datos de cuenta (verificados 2026-08-24)

- Location ID: `i2hUJPae67Nohi62dB2H` (subcuenta Patricia Songel, L'Eliana)
- Stripe: conectado, live Y test habilitados
- Courses: habilitado, vacío (solo datos de muestra)
- Communities: habilitado, sin comunidad creada
- Client Portal: activo, 2 usuarios existentes
- Portal URL: `https://i2hujpae67nohi62db2h.app.clientclub.net/`

## Credenciales y accesos que el usuario debe dar al ejecutor

1. **PIT** (Private Integration Token, empieza por `pit-`): scopes mínimos `contacts.readonly`, `contacts.write`, `payments/orders.readonly`, `payments/subscriptions.readonly`, `products.readonly`, `products.write`. Uso: verificación de contactos/pedidos tras la compra test y creación de productos si la UI falla.
2. **Chrome con sesión GHL abierta** en la subcuenta Patricia Songel (extensión Claude in Chrome conectada). La mayoría del trabajo es UI.
3. **Un vídeo de YouTube oculto (unlisted) de prueba** — cualquier clip sin valor. Si el usuario no lo pasa, usar cualquier vídeo público de YouTube como placeholder y dejar anotado que debe sustituirse.
4. **Email de prueba** que el usuario pueda leer (para verificar el email de bienvenida y el SSO). Sugerido: guillemvera+pstest1@gmail.com (Gmail acepta el sufijo +).

## Guardarraíles (obligatorios)

- **Todo en modo TEST de Stripe.** Antes de crear cada oferta/checkout, verificar que está en test mode. Ninguna oferta debe quedar comprable con dinero real.
- **NO tocar** la integración de Stripe (no desconectar, no cambiar modo live), los 2 usuarios existentes del portal, ni ningún workflow/pipeline existente de la subcuenta (hay pipelines de leads en uso: "Seminarios", "Micropigmentacion 3.0").
- **NO poner las variables `VITE_GHL_*` en Vercel todavía.** La web pública en producción NO debe mostrar checkouts de test. La verificación del frontend se hace en local con `.env.local`.
- El PIT no se escribe en ningún archivo del repo ni en ningún log. Solo variables de entorno o headers en memoria.
- Nombres de todo lo creado con prefijo `PS - ` para distinguirlo de lo existente.
- Registrar cada ID/URL real en `docs/ghl/student-area-inventory.md` inmediatamente después de crearlo.

---

## Task 2A — Crear los dos cursos

UI: menú `Suscripciones` (Memberships) → `Cursos` → `+ Crear curso`.

- [ ] **Curso 1:** nombre `PS - Micropigmentación Online`. Elegir plantilla en blanco/custom si se ofrece.
- [ ] Estructura mínima:
  - Módulo `01 - Bienvenida`
    - Lección `Cómo usar la plataforma` (texto breve de bienvenida, 2-3 frases en español)
    - Lección `Vídeo de la formación` → insertar embed de YouTube: en el editor de lección, añadir bloque de vídeo con la URL del vídeo unlisted (formato `https://www.youtube.com/watch?v=XXXX`). Si el bloque de vídeo nativo no acepta YouTube, usar bloque HTML/embed con iframe estándar de YouTube.
- [ ] Visibilidad: curso **publicado** pero SIN oferta gratuita ni acceso público. El acceso solo debe llegar vía oferta (Task 2C).
- [ ] **Curso 2:** nombre `PS - Glowlips Online`. Misma estructura. Puede clonarse del primero si la UI lo permite.
- [ ] Registrar en inventario: nombre exacto e IDs/URLs de ambos cursos.

## Task 2B — Crear la comunidad

UI: `Suscripciones` → `Comunidades` → `Crear una comunidad`.

- [ ] Nombre: `Patricia Songel Alumnas`. Privada (solo por invitación/oferta, no descubrible públicamente si la opción existe).
- [ ] Canales (crear los que la UI permita; si los permisos por canal no existen, crear solo `Anuncios` y `Dudas` y anotarlo):
  - `anuncios` — solo admin publica
  - `presentaciones` — miembros publican
  - `dudas` — miembros publican
- [ ] Registrar en inventario: nombre del grupo e ID/URL.

## Task 2C — Crear las ofertas de pago (test)

UI: dentro de Memberships → `Ofertas` (Offers).

- [ ] **Oferta 1:** `PS - Micropigmentación Online - Test`
  - Incluye: curso `PS - Micropigmentación Online`
  - Precio: pago único **100 €**, moneda EUR
  - **Modo test de Stripe activado en el checkout**
  - NO publicar en ningún catálogo público
- [ ] **Oferta 2:** `PS - Glowlips Online - Test` — igual con el curso 2.
- [ ] Copiar la **URL de checkout** de cada oferta.
- [ ] Si la comunidad puede vincularse a la oferta directamente, vincularla; si no, el alta a comunidad la hará el workflow (Task 4).
- [ ] Registrar en inventario: nombres, IDs y URLs de checkout de ambas ofertas.

## Task 2D — Configurar el Client Portal

UI: `Suscripciones` → `Portal del cliente` → configuración.

- [ ] Idioma: español.
- [ ] Branding básico: nombre `Patricia Songel`, logo si está disponible en Media (buscar en `Contenido multimedia`; si no hay logo, dejar default y anotar), colores aproximados a la marca (marfil/negro; no bloquear por esto).
- [ ] Email de soporte: dejar el existente o anotar como pendiente.
- [ ] NO configurar dominio propio todavía.
- [ ] Verificar que la URL del portal sigue siendo `https://i2hujpae67nohi62db2h.app.clientclub.net/`.

## Task 4 — Workflows de alta y baja

UI: `Automatización` → `Workflows` → crear. **Solo 2 workflows** (sin grace).

- [ ] **Workflow 1: `PS - Student access - grant`**
  - Trigger: compra de oferta / pago recibido. Preferir trigger `Offer Access Granted` o `Payment Received` filtrado por producto/oferta exacta (una rama o workflow por oferta si los filtros no permiten ambas en uno; en ese caso nombrar `PS - Student access - grant - micro` y `... - glowlips`).
  - Acciones, en orden:
    1. Add tag `alumno-activo-micropigmentacion` (o `-glowlips` según rama/oferta)
    2. Remove tag `alumno-revocado-{curso}` (si existe)
    3. Grant offer / grant course access (si el trigger no lo hace ya automáticamente — con compra de oferta el acceso al curso es automático; verificar y no duplicar)
    4. Añadir a la comunidad `Patricia Songel Alumnas` (acción "Grant community access" o equivalente; si no existe la acción, anotarlo como paso manual pendiente)
    5. Email `PS - Bienvenida área de alumnas`: crear plantilla simple en español con (a) enlace al portal `https://i2hujpae67nohi62db2h.app.clientclub.net/`, (b) instrucciones de primer acceso (el alumno recibe invitación/contraseña del propio portal — verificar qué email automático manda GHL para no duplicar), (c) contacto de soporte.
    6. Notificación interna (email al owner) con nombre y email del contacto.
  - [ ] Publicar el workflow (activarlo).
- [ ] **Workflow 2: `PS - Student access - revoke`**
  - Trigger: tag añadido `alumno-revocado-micropigmentacion` O `alumno-revocado-glowlips` (revisión manual de reembolso → el owner añade el tag a mano).
  - Acciones:
    1. Revoke offer / remove course access del curso correspondiente
    2. Quitar acceso a la comunidad
    3. Remove tag `alumno-activo-{curso}`
    4. Email breve de acceso finalizado
  - [ ] Publicar el workflow.
- [ ] Registrar en inventario: nombres y Workflow IDs.

## Task E2E — Prueba end-to-end en test

- [ ] 1. Abrir la URL de checkout de `PS - Micropigmentación Online - Test` en incógnito.
- [ ] 2. Comprar con el email de prueba y tarjeta test de Stripe: `4242 4242 4242 4242`, caducidad futura cualquiera, CVC `123`, código postal cualquiera.
- [ ] 3. Verificar (UI o PIT):
  - Contacto creado con el email de prueba
  - Tag `alumno-activo-micropigmentacion` presente
  - Pedido en `Pagos → Transacciones` marcado como TEST
  - Email de bienvenida recibido (pedir al usuario que confirme en su buzón)
- [ ] 4. Login en el portal con el contacto de prueba → el curso aparece → la lección abre → el vídeo de YouTube reproduce dentro del portal.
- [ ] 5. Verificar que el contacto ve la comunidad.
- [ ] 6. Verificar aislamiento: un segundo contacto sin compra NO ve el curso (crear contacto manual, invitarlo al portal sin oferta, comprobar).
- [ ] 7. Revocación: añadir tag `alumno-revocado-micropigmentacion` al contacto de prueba → verificar que pierde el curso y la comunidad, y le llega el email.
- [ ] 8. Repetir compra (pasos 1-4) con la oferta de Glowlips, con `guillemvera+pstest2@gmail.com`.
- [ ] Registrar resultados PASS/FAIL por punto en `docs/ghl/student-area-acceptance.md` (crear el archivo).

## Task FE — Verificación del frontend en local (NO Vercel)

- [ ] En `.env.local` del repo añadir (sin tocar las líneas existentes):
  ```
  VITE_GHL_PORTAL_URL=https://i2hujpae67nohi62db2h.app.clientclub.net
  VITE_GHL_CHECKOUT_MICRO={URL checkout test micro}
  VITE_GHL_CHECKOUT_GLOWLIPS={URL checkout test glowlips}
  ```
- [ ] `npm test` → los 3 tests pasan. `npm run dev` → verificar:
  - Navbar "Alumnas" lleva al portal (nota: `studentArea.js` actual manda a `/alumnos` interno vía `internalPath`; con `portalUrl` definido, `loginUrl` apunta al portal — verificar qué usa la Navbar y, si sigue enlazando `internalPath`, cambiar la Navbar a `loginUrl`. Cambio mínimo, con test si aplica.)
  - CTA de compra en `/formacion/micropigmentacion` y `/formacion/glowlips` abre el checkout correcto
- [ ] `npm run lint` y `npm run build` limpios.
- [ ] Commit del cambio de frontend si lo hubo: `feat: point navbar to GHL portal when configured`.

## Task DOC — Cierre documental

- [ ] Actualizar `docs/ghl/student-area-inventory.md` con TODOS los IDs, URLs y nombres reales (cursos, comunidad, ofertas, workflows, plantillas de email).
- [ ] Crear `docs/ghl/student-area-acceptance.md` con la matriz E2E y resultado.
- [ ] Commits:
  ```
  docs: record GHL pilot resources and IDs
  docs: record student area E2E test results
  ```

---

## Qué queda para LIVE (fuera de este plan — requiere decisión del usuario)

1. Precio real y textos comerciales de las ofertas.
2. Consentimiento legal en checkout: renuncia al derecho de desistimiento para contenido digital con acceso inmediato (Art. 103.m TRLGDCU) + actualizar Privacidad/Términos. **Bloqueante legal antes de cobrar.**
3. Duplicar ofertas en modo live (o cambiar las de test a live) y regenerar URLs de checkout.
4. Poner `VITE_GHL_PORTAL_URL` y `VITE_GHL_CHECKOUT_*` en Vercel (production) → deploy.
5. Sustituir vídeos placeholder por los reales (YouTube unlisted → más adelante, valorar migrar a Bunny/VdoCipher según plan padre).
6. Subdominio propio del portal (`alumnos.{dominio}`) cuando se decida el dominio padre.
7. Email de soporte definitivo.

## Criterio de éxito del piloto

Compra test → acceso automático correcto en < 5 min, vídeo reproduce en desktop y móvil, contacto sin compra no accede, revocación por tag funciona, cero recursos live tocados.
