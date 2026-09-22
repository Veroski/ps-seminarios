# Área de Alumnas GHL — Patricia Songel — Instrucciones de proyecto Claude

> Pega esto tal cual en "Project instructions" de un Claude Project en claude.ai.
> Sube como Project Knowledge los archivos listados al final.

## Qué es esto

MVP de "área de alumnas" para la clínica de Patricia Songel, construido sobre GoHighLevel (GHL): dos cursos de pago (Micropigmentación y Glowlips), una comunidad compartida, Client Portal de marca en español, workflows de alta/baja automática, y un frontend público (`ps-seminarios`, React/Vite) que enlaza al portal.

Repo: `C:\Users\user\Desktop\clinic-scale-system\ps-seminarios`

## Estado actual (2026-09-01)

Completado y en `main` (3 commits ya pusheados: `feat: point navbar to GHL portal when configured`, `docs: record GHL pilot resources and IDs`, `docs: record student area E2E test results`):

- Task 2A–2D: cursos, comunidad, ofertas de pago test, Client Portal — creados y publicados en GHL.
- Task 4: workflows de grant (micro, glowlips) y revoke — publicados, verificados por inspección directa.
- Task FE: frontend local apuntando al portal vía `studentAreaConfig.loginUrl`, `.env.local` con las 3 vars `VITE_GHL_*` (NO subidas a Vercel todavía, según guardrail).
- Task DOC: inventario y acta de aceptación E2E documentados.
- Verificación adicional: el embed de YouTube unlisted SÍ funciona sin login, usando `youtube-nocookie.com` + `referrerpolicy="strict-origin-when-cross-origin"` (si algún embed da Error 153 dentro de GHL, ese es el fix a aplicar).

## EL CUELLO DE BOTELLA ACTUAL: Stripe en modo live, no test

Este es el tema prioritario a resolver antes de poder avanzar con cualquier prueba de compra real.

**Síntoma:** el checkout embebido de ambas ofertas sirve la clave pública `pk_live_...` de Stripe, no `pk_test_...`, aunque la cuenta GHL tiene AMBOS modos conectados (test: `acct_1SWy24I5S8AFJOSo`, €0.00 balance). Confirmado leyendo el HTML del checkout (sin introducir datos de pago) y con un intento real de tarjeta de test `4242 4242 4242 4242`, rechazada por Stripe: *"Your request was in live mode, but used a known test card."* No se movió dinero.

**Por qué bloquea todo:** no se puede validar el flujo grant (alta automática por compra) porque su trigger nativo es el evento GHL "Se ha concedido acceso a la oferta" (Offer Access Granted) — no hay forma de simular esto sin una compra real, y una compra real en modo live cobraría dinero de verdad. Se intentó un workaround (añadir tag manualmente) y no dispara el workflow, confirmado en el historial de inscripciones (0 enrollments).

**Qué se investigó sin éxito:** no existe ningún toggle test/live por oferta o producto en la UI de GHL (revisado: detalles de oferta, editor de checkout, panel de precios del producto, Pagos → Integraciones → Stripe → Manage).

**Camino a resolver (acción humana, fuera de Claude):**
1. Contactar soporte de GHL — preguntar cómo forzar modo test en el checkout embebido de una oferta cuando la cuenta tiene ambos modos Stripe conectados.
2. Alternativamente, revisar el Stripe Dashboard directo (fuera de GHL) de la cuenta conectada, si se tiene acceso, para ver si hay una config de "modo por defecto" a nivel de cuenta conectada.
3. **NO intentar workarounds vía API** — el PIT tiene deliberadamente bloqueados los scopes de escritura de pagos (`payments/orders.write`, `payments/subscriptions.write`, etc.) y esto NUNCA debe forzarse.

## Guardrails de seguridad (obligatorios, no negociables)

- El PIT (Private Integration Token) tiene scopes de escritura de pagos bloqueados a propósito — NUNCA invocar esos endpoints vía API aunque técnicamente se pudiera.
- Todo flujo de pago pasa por la UI de checkout Stripe/GHL, en modo TEST únicamente. Nunca dinero real, nunca recursos de producción.
- NO tocar la integración de Stripe existente (no desconectar, no cambiar modo live), los 2 usuarios existentes del Client Portal, ni ningún workflow/pipeline existente ("Seminarios", "Micropigmentacion 3.0").
- NO poner las variables `VITE_GHL_*` en Vercel todavía — la web pública en producción no debe mostrar checkouts de test.
- El PIT no se escribe en ningún archivo del repo ni en ningún log — solo en `.env.local` (gitignored via `.env*`).
- Prefijo `PS - ` en todo lo creado en GHL, para distinguirlo de recursos existentes.
- Registrar cada ID/URL real en `docs/ghl/student-area-inventory.md` inmediatamente después de crearlo.

## Inventario técnico (ver docs/ghl/student-area-inventory.md para la versión viva)

- Location ID: `i2hUJPae67Nohi62dB2H` (Patricia Songel — L'Eliana)
- Portal: `https://i2hujpae67nohi62db2h.app.clientclub.net/`
- Checkout micro: `.../courses/offers/7cd9805c-6c12-4f94-a7db-9f3892e4be90`
- Checkout glowlips: `.../courses/offers/7510100b-0eca-49dd-b4df-a0539a5053fb`
- Workflows: grant-micro `32afb8c8-c738-429d-a076-e9eb81de2441`, grant-glowlips `40666e31-ec82-44ed-ad32-2f79d61c47b5`, revoke `3a56e5ca-5f6d-4df5-af59-4495dd4dbccb`
- Comunidad: "Patricia Songel Alumnas" (patricia-songel-alumnas)
- Contacto de prueba existente: `PS Test Uno` / `guillemvera+pstest1@gmail.com` (id `YN8SA5xtcdftAsDrf9JM`) — tiene una transacción pendiente de €100 sin cobrar, seguro dejarla o limpiarla manualmente.

## Próximos pasos (en orden)

1. **[BLOQUEADO — acción humana]** Resolver el modo live/test de Stripe (ver sección arriba).
2. Una vez resuelto: repetir la matriz E2E completa de `docs/ghl/student-area-acceptance.md` con una compra real en test mode — validar grant automático, acceso al curso, reproducción de vídeo, aislamiento (un contacto sin compra no debe ver el curso), y revocación por tag.
3. Repetir el mismo test para la oferta Glowlips.
4. Limpieza opcional: borrar o destaggear el contacto de prueba y su transacción pendiente.
5. Fuera de alcance hasta nueva instrucción explícita: precios/copy comercial reales, consentimiento legal de derecho de desistimiento para contenido digital (Art. 103.m TRLGDCU) — bloqueador legal antes de cobrar dinero real, subdominio de portal propio, vídeos definitivos, email de soporte definitivo, subir `VITE_GHL_*` a Vercel producción.

## Archivos a subir como Project Knowledge

- `docs/superpowers/plans/2026-08-24-area-alumnos-ejecucion.md` (plan original completo)
- `docs/ghl/student-area-inventory.md` (inventario vivo de IDs/URLs)
- `docs/ghl/student-area-acceptance.md` (resultados E2E y bloqueador)
- `src/config/studentArea.js` (config del frontend)
- `src/components/Navbar.jsx` (consumidor del config)
