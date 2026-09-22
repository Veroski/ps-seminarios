# Plan: Sincronizar alumnas, compras y GoHighLevel

Objetivo en una línea: cuando una persona cree su cuenta en Firebase por email/contraseña o Google, el sistema deberá crear o actualizar un único lead en GoHighLevel; cuando Stripe confirme un pago, deberá añadir la etiqueta de alumna, crear o mover su oportunidad a `Formación Online / Comprado` y conservar el acceso; cuando Stripe confirme un reembolso, deberá revocar el acceso y mover la oportunidad a `Formación Online / Reembolso`.

## Classification

Track: Integration — conecta el registro actual de Firebase, el flujo servidor de Stripe/n8n y la proyección comercial en GoHighLevel. Quedan aparcados el diseño de campos personalizados y las comunicaciones posteriores.

## Interview Ledger

- Q1 origen de compra → Stripe/n8n como fuente de verdad (user).
- Q2 vías de alta → email/contraseña y Google (user).
- Q3 actualización de compra → etiqueta y movimiento de oportunidad (user).
- Q4 ubicación del movimiento → nueva etapa (user).
- Q5 contenedor → pipeline existente `Formación Online` con etapa `Comprado` (user).
- Q6 orquestación → n8n con un webhook seguro de alta desde la web (user).

Total: 6 preguntas.

## Goal & Success Criteria

- WHEN se crea una cuenta nueva por email/contraseña o por Google, THE SYSTEM SHALL enviar un evento autenticado a n8n y dejar un contacto creado o actualizado en la ubicación de GoHighLevel configurada (user).
- WHEN se reintenta el evento de alta o la persona vuelve a iniciar sesión, THE SYSTEM SHALL actualizar el mismo contacto por email sin crear duplicados (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/)).
- WHEN Stripe confirme una compra válida de una formación, THE SYSTEM SHALL mantener el registro de compra y el acceso de Firebase existentes, añadir la etiqueta de alumna de esa formación y dejar una única oportunidad en la etapa `Comprado` (user).
- WHEN Stripe confirme un reembolso válido, THE SYSTEM SHALL mantener el registro trazable, revocar la formación del acceso de Firebase y dejar la oportunidad en la etapa `Reembolso` sin añadir la etiqueta de alumna activa (verified: test n8n refund 141).
- WHEN Stripe reenvíe el mismo evento, THE SYSTEM SHALL reconocer la misma sesión y no duplicar la compra, la etiqueta ni la oportunidad (verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- WHEN el pago esté fallido, pendiente, expirado, no pagado, tenga importe/producto incorrectos o no pueda asociarse a una alumna, THE SYSTEM SHALL no conceder ni proyectar una compra confirmada y deberá dejar el caso trazable para revisión (verified: [Stripe Checkout Session](https://docs.stripe.com/api/checkout/sessions/object)).
- WHEN GoHighLevel esté caído o devuelva un error temporal, THE SYSTEM SHALL conservar la compra y el acceso canónicos de Firebase, registrar la sincronización pendiente y reintentarlo sin volver a procesar el pago (assumed: la proyección CRM no debe revocar un acceso ya confirmado; si no se desea este comportamiento, cambia la política de fallos).
- No secret shall be sent to the browser, committed to the repository or written to logs (verified: `docs/ghl/claude-project-instructions.md`).

## Current State

- La cuenta de email/contraseña crea el usuario Firebase, actualiza el perfil y devuelve la cuenta autenticada (verified: `src/context/AuthContext.jsx`).
- El acceso con Google también actualiza el perfil de alumna tras autenticarse (verified: `src/context/AuthContext.jsx`).
- El frontend envía a `VITE_N8N_CHECKOUT_URL` un token de Firebase, `formacionId` y el consentimiento antes de iniciar el checkout (verified: `src/lib/studentArea.js`).
- La documentación del proyecto sitúa el checkout y la confirmación de acceso en workflows de n8n conectados con Stripe y Firestore (verified: `docs/student-area-setup.md`).
- Ya existen endpoints server-side que usan `GHL_PRIVATE_KEY`, `GHL_LOCATION_ID`, `contacts/upsert` y oportunidades de GHL (verified: `api/formacion.js`, `api/ghl-micro.js`, `api/cita.js`).
- El upsert de contacto actual envía etiquetas dentro del mismo payload, aunque la documentación oficial actual de GHL indica que ese campo reemplaza las etiquetas existentes (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/)).
- La formación `micropigmentacion` conserva precio, moneda, `stripePriceId`, publicación y el contenido de Brows-shadow en el manifiesto local (verified: `seed/formaciones/micropigmentacion/course.json`).
- Las reglas actuales impiden que el navegador escriba compras y permiten la compra solo desde el servidor (verified: `firestore.rules`).
- La documentación de GHL registra pipelines existentes llamados `Seminarios` y `Micropigmentacion 3.0` que no deben reutilizarse en esta automatización (verified: `docs/superpowers/plans/2026-08-24-area-alumnos-ejecucion.md`).
- La usuaria ha indicado que el login, los pagos de prueba, el acceso y los reembolsos actuales están validados (user).
- Un documento anterior del repositorio registra un bloqueo histórico de modo live/test de Stripe, por lo que el entorno activo deberá volver a comprobarse antes de activar este flujo (verified: `docs/ghl/student-area-acceptance.md`).

## Scope (v1)

- Añadir un evento de alta desde la web para email/contraseña y primer acceso de Google.
- Recibir el evento en n8n mediante un webhook protegido y ejecutar el `upsert` de contacto en GHL.
- Reutilizar el webhook servidor de Stripe/n8n como única confirmación de pago.
- Validar firma, tipo de evento, `payment_status`, formación, precio, moneda, importe, email y sesión antes de cualquier cambio comercial.
- Añadir una etiqueta activa por formación sin reemplazar etiquetas existentes.
- Crear o actualizar una única oportunidad por compra en el pipeline `Formación Online`, etapa `Comprado`.
- Registrar estado, identificadores externos, intentos y último error de la sincronización CRM junto al registro canónico de compra.
- Mantener apagada la automatización hasta que estén configurados los secretos, los IDs reales y la prueba en modo test.

## Out of Scope & Parked Items

- No se cambia Firebase Authentication, reglas, precios, `stripePriceId`, checkout, accesos ni reembolsos existentes salvo la instrumentación mínima necesaria para registrar estados (user; verified: `firestore.rules`, `src/lib/studentArea.js`).
- No se aceptan compras iniciadas directamente desde ofertas de GoHighLevel (user).
- No se activan pagos live ni se introducen claves reales en el repositorio (user; verified: `docs/ghl/claude-project-instructions.md`).
- No se decide todavía el nombre de campos personalizados de GHL para UID, fecha, importe, formación o IDs de Stripe; se deja una tabla de mapeo configurable y se valida antes de publicar.
- No se construye todavía el flujo completo de reembolso en GHL; el flujo existente de Firebase queda como referencia y la proyección de reembolso se trata en una fase posterior para no mezclar dos cambios de acceso.
- No se añaden emails, SMS, WhatsApp, comunidad ni campañas nuevas.
- No se eliminan contactos, compras, oportunidades ni historial durante rollback.

## Approach

La arquitectura usa n8n como orquestador y separa dos proyecciones:

1. **Alta**: la web solicita una sincronización después de crear la cuenta. Un adaptador server-side verifica el ID token de Firebase y envía a n8n únicamente los datos verificados: UID, email, nombre, proveedor y `eventId`. n8n hace `POST /contacts/upsert` por email y guarda el `contactId` devuelto. La llamada será repetible y no dependerá de una etiqueta destructiva.
2. **Compra**: el workflow actual de Stripe recibe el evento firmado. n8n procesa únicamente el pago confirmado y ejecuta primero el registro/acceso canónico ya existente. Después proyecta GHL: upsert de respaldo por email si el alta no llegó, etiqueta activa mediante Add Tags y oportunidad en `Formación Online` · `Comprado`.
3. **Idempotencia**: la clave primaria de pago será el `stripeSessionId`. El registro `compras/{stripeSessionId}` guardará el estado de GHL y sus IDs. Un lock o estado de procesamiento con lease evitará dos ejecuciones concurrentes; un reintento podrá continuar una operación incompleta.
4. **Fuente de verdad**: Stripe decide si el dinero está confirmado; Firestore decide el entitlement de la alumna; GHL es una proyección comercial. Un fallo de GHL no deshace una compra válida.

## Requirements

R1. WHEN un usuario se crea con email/contraseña THE SYSTEM SHALL emitir un evento de alta con un `eventId` estable basado en el UID de Firebase. Acceptance: una alta test produce una respuesta de aceptación de n8n y un contacto GHL.

R2. WHEN un usuario nuevo entra mediante Google THE SYSTEM SHALL emitir el mismo tipo de evento solo para la creación inicial, no para cada login posterior. Acceptance: una cuenta Google nueva crea o actualiza un contacto y un login posterior no genera una nueva oportunidad.

R3. WHEN el evento de alta contiene un token inválido, email ausente o payload fuera de límites THE SYSTEM SHALL rechazarlo antes de llamar a GHL. Acceptance: el adaptador devuelve error 4xx y no existe llamada GHL.

R4. WHEN el alta llega repetida THE SYSTEM SHALL usar `contacts/upsert` por email y conservar el contacto existente. Acceptance: dos entregas dejan un solo contacto y el segundo resultado indica actualización.

R5. WHEN llega `checkout.session.completed` o `checkout.session.async_payment_succeeded` THE SYSTEM SHALL aceptar el evento solo después de validar firma y `payment_status: paid`. Acceptance: una sesión pagada pasa al flujo de compra; una sesión `unpaid` queda sin acceso adicional.

R6. WHEN una sesión tiene precio, moneda, importe, cantidad, formación o email no compatibles con Firestore THE SYSTEM SHALL detener la concesión y generar una incidencia trazable. Acceptance: cada fixture inválido deja `compras` sin nuevo entitlement y no añade etiqueta de compra.

R7. WHEN la misma sesión se procesa más de una vez THE SYSTEM SHALL ejecutar como máximo una concesión efectiva y una proyección CRM. Acceptance: redelivery y dos ejecuciones concurrentes no crean duplicados.

R8. WHEN una compra válida no tiene contacto GHL THE SYSTEM SHALL hacer upsert de respaldo por el email verificado de Stripe y continuar solo si recibe un `contactId`. Acceptance: se crea un contacto único y la compra queda asociada a ese ID.

R9. WHEN la compra válida tiene contacto GHL THE SYSTEM SHALL añadir la etiqueta activa de la formación mediante el endpoint de tags, sin reemplazar las etiquetas existentes. Acceptance: una etiqueta previa permanece después de la sincronización.

R10. WHEN no existe una oportunidad para esa compra THE SYSTEM SHALL crearla en `Formación Online / Comprado`; WHEN existe THE SYSTEM SHALL actualizarla y no crear otra. Acceptance: la oportunidad queda ligada al `contactId`, formación, importe y `stripeSessionId` trazable.

R11. WHEN GHL devuelve 429, 5xx o timeout THE SYSTEM SHALL reintentar con backoff y conservar `syncStatus: pending`; WHEN devuelve 4xx de validación THE SYSTEM SHALL detener el bucle y alertar para revisión. Acceptance: los fixtures de error dejan el pago confirmado pero la proyección pendiente.

R12. WHEN se pausa la automatización THE SYSTEM SHALL conservar historial de pagos y accesos y permitir reanudar la sincronización pendiente. Acceptance: pausar y reanudar no duplica oportunidades.

## Key Decisions

- Fuente de verdad de pago: Stripe/n8n, no la redirección de éxito ni el frontend (user; verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- Canales de registro: email/contraseña y Google (user; verified: `src/context/AuthContext.jsx`).
- Orquestador: n8n, con un adaptador server-side de confianza para el evento de alta (user; [A1]).
- Identidad CRM: email normalizado como clave de upsert y UID de Firebase como referencia técnica, sin enviar contraseñas (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/); [A2]).
- Etiqueta de compra: usar la etiqueta activa ya definida por formación cuando exista, por ejemplo `alumno-activo-micropigmentacion` (verified: `docs/ghl/student-area-inventory.md`).
- Etiquetas: usar `POST /contacts/:contactId/tags` para añadirlas, porque GHL documenta que `tags` en el upsert reemplaza las existentes (verified: [HighLevel Add Tags](https://marketplace.gohighlevel.com/docs/ghl/contacts/add-tags/)).
- Pipeline: usar `Formación Online` y localizar dinámicamente la etapa `Registrado` o `Comprado` por nombre (user; verified: [HighLevel Pipelines](https://marketplace.gohighlevel.com/docs/ghl/opportunities/pipelines/)).
- Oportunidad: buscar primero por `contactId` y pipeline; crear con `POST /opportunities/` o actualizar con `PUT /opportunities/:id` (verified: [HighLevel Search Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/search-opportunity/), [Create Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/create-opportunity/), [Update Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/update-opportunity/)).
- Estado inicial de oportunidad: `open` y etapa `Comprado`, para que el pipeline conserve la compra como oportunidad abierta (assumed: default reversible; if wrong: change only the opportunity status mapping).
- Fallos GHL después de pago: reintento y estado pendiente; no se revierte el entitlement de Firebase (assumed: Firestore es la fuente de acceso; if wrong: define una política de compensación antes de activar).

## Data & State Changes

- `formaciones/{formationId}` no cambia en esta fase; sus campos comerciales siguen siendo la referencia para validar `stripePriceId`, importe y moneda (verified: `seed/formaciones/micropigmentacion/course.json`).
- `compras/{stripeSessionId}` conserva todos sus campos actuales y añade únicamente un mapa opcional `ghlSync` con `status`, `contactId`, `opportunityId`, `idempotencyKey`, `attempts`, `lastAttemptAt` y `lastError` (assumed: nombres de estado; if wrong: mapearlos a los nombres ya usados por el workflow).
- `usuarios/{uid}.productosComprados` y el progreso no se sustituyen ni se reescriben desde GHL (verified: `src/lib/studentArea.js`, `firestore.rules`).
- GHL recibirá un pipeline nuevo con al menos una etapa, porque la documentación oficial exige al menos una etapa y nombres únicos por ubicación (verified: [HighLevel Pipelines](https://marketplace.gohighlevel.com/docs/ghl/opportunities/pipelines/)).
- Migración: no hay migración destructiva; los documentos existentes se leen y se amplían mediante merge.
- Rollback: pausar los workflows nuevos, conservar compras y accesos, dejar `ghlSync.status: pending` y reanudar después; no borrar historial ni oportunidades automáticamente.

## Interfaces, Integrations & Credentials

### Evento de alta

`POST /api/student-registered` — adaptador server-side de la aplicación.

- Request: `Authorization: Bearer <Firebase ID token>` y `{ eventId, provider, occurredAt }`.
- Validación: verificar el token, extraer UID/email/nombre del token y no confiar en esos campos si vienen del navegador.
- Forward interno a n8n: `{ eventId, firebaseUid, email, displayName, provider, occurredAt }` más un secreto server-to-server.
- Respuesta: `202` si n8n acepta la sincronización; `4xx` para payload inválido; `5xx` si no puede encolarse, con reintento posterior.

### Contacto GoHighLevel

- `POST https://services.leadconnectorhq.com/contacts/upsert` con `Version: v3`, `locationId`, email, nombre y source, sin mandar el array completo de tags (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/)).
- `POST https://services.leadconnectorhq.com/contacts/{contactId}/tags` con la etiqueta de compra (verified: [HighLevel Add Tags](https://marketplace.gohighlevel.com/docs/ghl/contacts/add-tags/)).
- `POST https://services.leadconnectorhq.com/contacts/{contactId}/notes` para una nota de compra solo si se aprueba el formato final; se deja fuera del primer corte (verified: endpoints usados en `api/formacion.js`).

### Oportunidad GoHighLevel

- Buscar por `locationId`, `contactId` y pipeline nuevo (verified: [HighLevel Search Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/search-opportunity/)).
- Crear con `locationId`, `pipelineId`, `pipelineStageId`, `contactId`, nombre estable y valor monetario de la sesión (verified: [HighLevel Create Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/create-opportunity/)).
- Actualizar por ID con `pipelineId`, `pipelineStageId`, nombre, estado y valor cuando ya exista (verified: [HighLevel Update Opportunity](https://marketplace.gohighlevel.com/docs/ghl/opportunities/update-opportunity/)).

### Secretos

- `${GHL_LOCATION_ID}` y `${GHL_PRIVATE_KEY}` únicamente en credenciales/variables server-side de n8n, siguiendo los nombres ya usados por los endpoints del proyecto (verified: `api/formacion.js`).
- `${STRIPE_WEBHOOK_SECRET}` en la credencial del webhook Stripe de n8n (verified: `docs/student-area-setup.md`, [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- `${STUDENT_REGISTRATION_WEBHOOK_SECRET}` entre el adaptador server-side y n8n (assumed: nombre provisional; if wrong: sustituirlo por el nombre de secreto acordado).
- La credencial de cuenta de servicio Firebase permanece en n8n y no se sube al repositorio (verified: `docs/student-area-setup.md`).

## Edge Cases & Failure Handling

- Evento Stripe duplicado o concurrente → lock/idempotencia por `stripeSessionId`; responder correctamente sin repetir efectos (verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- `checkout.session.completed` con `payment_status: unpaid` → no conceder, no etiquetar y esperar al evento de pago satisfactorio si aplica (verified: [Stripe Checkout Session](https://docs.stripe.com/api/checkout/sessions/object)).
- `checkout.session.async_payment_succeeded` sin `payment_status: paid` tras recuperar la sesión → no conceder y enviar a revisión (verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- Evento con firma inválida → rechazar antes de leer o escribir compras (verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- Precio, moneda, importe, cantidad o `stripePriceId` no coinciden → detener y alertar; nunca confiar solo en `formacionId` recibido desde cliente (assumed: validación server-side requerida; if wrong: el pago podría asignarse a la formación equivocada).
- Falta email en Stripe → no crear contacto por heurística; mantener la compra pendiente y pedir revisión (assumed: el email es la única identidad CRM v1).
- Alta GHL perdida antes de la compra → upsert de respaldo por email dentro de la rama de pago; guardar el `contactId` resultante.
- GHL 429/5xx/timeout → backoff y reintento; Firestore mantiene la compra válida y el estado CRM pendiente.
- GHL 4xx por etiqueta, pipeline o permisos → dead-letter/alerta con cuerpo sanitizado; no reintentar indefinidamente.
- Reembolso o pago fallido posterior → no añadir de nuevo la etiqueta activa; mantener la lógica actual y tratar la revocación CRM como fase separada (user scope; verified: `docs/student-area-setup.md`).

## Risks, Landmines & Adaptations

- La redirección de éxito puede llegar antes o no llegar → la concesión se basa en webhook servidor firmado y lectura de la sesión (verified: [Stripe Fulfill orders](https://docs.stripe.com/checkout/fulfillment)).
- `tags` dentro del upsert de GHL puede borrar etiquetas → separar upsert y Add Tags (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/), [Add Tags](https://marketplace.gohighlevel.com/docs/ghl/contacts/add-tags/)).
- La configuración de duplicados de la ubicación puede cambiar el resultado de un upsert → usar email como identificador v1, registrar el `contactId` y auditar la política de duplicados antes de activar (verified: [HighLevel Upsert Contact](https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/)).
- La API key y el location aún no están disponibles → todos los workflows se crean apagados y la fase de contrato verifica credenciales sin incluir sus valores en archivos (user; [A3]).
- Existe un documento histórico con un problema de modo live/test → la primera fase debe comprobar la cuenta y el endpoint activo antes de cualquier pago de prueba; no se autoriza dinero real (verified: `docs/ghl/student-area-acceptance.md`).
- Una caída de GHL no puede invalidar una compra ya confirmada → se separa el commit canónico de Firebase del projection retry de GHL (assumed: default fail-open for CRM only; if wrong: define compensación).
- Crear una oportunidad duplicada tras un crash entre crear y guardar el ID → usar búsqueda previa por contacto/pipeline y nombres estables; crear una custom field de sesión solo si la prueba de contrato demuestra que es necesaria (assumed: búsqueda por contacto/pipeline sirve como fallback; if wrong: usar un campo de oportunidad verificado).

## Assumptions Ledger

| ID | Assumption | Basis | Blast radius if wrong | Check |
|----|-----------|-------|----------------------|-------|
| A1 | El adaptador server-side verificará Firebase y n8n seguirá siendo el orquestador | seguridad en una frontera de confianza; no hay secreto seguro en el navegador | alto: registros falsos o pérdida de leads | Phase 1 y test de token; fallback: función Firebase Auth si el adaptador no puede verificar |
| A2 | Email normalizado será la identidad CRM v1 y el UID quedará como referencia | el upsert oficial acepta email y el registro actual siempre tiene email | medio: contactos con alias o correos cambiados | prueba con alta repetida y auditoría de duplicados |
| A3 | La credencial Bearer Auth existente y el location facilitado se usarán en n8n | datos facilitados por la usuaria | medio: permisos o credencial pueden cambiar | revisar el selector de credencial y los errores de ejecución |
| A4 | El pipeline es `Formación Online` y sus etapas son `Registrado`, `Comprado` y `Reembolso` | datos facilitados por la usuaria y configuración actual | medio: nombres/IDs cambian en GHL | los flujos localizan las etapas por nombre |
| A5 | La oportunidad se crea inicialmente con `status: open` y se mueve por etapa | default reversible que conserva visibilidad | bajo/medio: reporting de ventas puede preferir `won` | validar con Patricia antes del paso de activación |
| A6 | `alumno-activo-{formationId}` es la etiqueta de acceso comercial para cada formación | etiquetas existentes registradas en inventario | medio: workflow downstream podría no reconocerla | comprobar etiquetas reales en GHL antes de activar |
| A7 | La compra válida es una sesión `mode: payment` con un line item compatible y `payment_status: paid` | formación one-time y documentación oficial de Stripe | alto: concesión incorrecta de acceso | fixtures positivos/negativos y compra test |
| A8 | Un fallo de GHL deja Firebase confirmado y programa reintento CRM | separación de fuentes de verdad y reversibilidad | medio: CRM puede quedar atrasado temporalmente | prueba simulada de 429/5xx y reanudación |
| A9 | Un reembolso mueve la oportunidad a `Formación Online` · `Reembolso` sin añadir la etiqueta activa | requisito confirmado y probado en n8n | medio: GHL puede tardar en reflejar una devolución | prueba de refund y revisión de la oportunidad |

## Open Items (none blocking)

- Validar en una cuenta de prueba real que el contacto aparece una sola vez y que la oportunidad termina en `Formación Online` · `Registrado`.
- Validar en una compra test real que la etiqueta activa y la oportunidad terminan en `Formación Online` · `Comprado`.
- Nombre de la etiqueta de alta — proceder sin etiqueta nueva de registro; la etiqueta obligatoria v1 es la activa de compra.
- Campos personalizados de GHL — proceder sin crearlos; usar nota y datos mínimos hasta aprobar el mapeo.
- Estado `open` frente a `won` — proceder con `open` y etapa `Comprado`; cambiarlo antes de pasar a venta live si el pipeline debe cerrar automáticamente las ventas.
- Revocación por reembolso en GHL — implementada en el workflow de Stripe; queda la validación visual en una cuenta de prueba real.

## Verification

- `npm run lint`.
- `npm test -- --run`.
- `npm run build`.
- Test de contrato del adaptador de alta con token válido, token inválido, email/Google, repetición y n8n no disponible.
- Test de contrato Stripe con `checkout.session.completed` pagada, sesión `unpaid`, `async_payment_succeeded`, pago fallido, firma inválida, importe incorrecto, precio incorrecto, moneda incorrecta y evento duplicado.
- Test de contrato GHL con contacto nuevo, contacto existente, etiquetas previas, oportunidad existente, 429/5xx, 4xx y timeout.
- Smoke test en Stripe test: cuenta nueva → contacto GHL único → compra confirmada → compra Firestore → acceso Firebase → etiqueta activa → oportunidad en `Compra confirmada`.
- Redelivery del mismo evento: el número de documentos, etiquetas y oportunidades no aumenta.
- Prueba negativa: una cuenta sin pago no recibe etiqueta activa, oportunidad de compra ni acceso a la lección.
- Confirmación personal de Patricia: abrir GHL, localizar el contacto por email, comprobar la etiqueta activa, el pipeline nuevo y la etapa; abrir la aplicación y comprobar que el acceso sigue funcionando.

## Build Phases

- [x] Phase 1: Verificar contratos y entorno sin activar nada
      Done when: están documentados los payloads reales, los IDs de formación/precio, la firma Stripe, el location de GHL, los scopes y el estado test/live; ningún workflow nuevo está activo.
      Steps:
      - Revisar el workflow actual de checkout y Stripe/n8n y localizar el punto exacto donde se confirma y registra `compras/{stripeSessionId}`.
      - Verificar que el webhook Stripe valida firma y que el modo activo de la prueba es test.
      - Confirmar en la documentación/API de GHL las rutas, versión, scopes y cuerpos para contacto, tags, pipelines y oportunidades.
      - Comprobar que la formación se resuelve por `stripePriceId`, importe y moneda de Firestore, no por un nombre recibido del navegador.
      - Registrar cualquier discrepancia en `docs/ghl/student-area-inventory.md` sin tocar pipelines existentes.
      Covers: R5, R6, R7, R12; checks: A3, A4, A6, A7.

- [x] Phase 2: Confirmar el pipeline comercial de alumnas
      Done when: GHL contiene `Formación Online` con las etapas `Registrado` y `Comprado`, sin modificar ningún pipeline existente.
      Steps:
      - Crear el pipeline mediante UI/API verificada, con al menos la etapa elegida.
      - Leer de nuevo el pipeline y comprobar unicidad de nombres y asociación a la ubicación correcta.
      - Registrar IDs, nombres y estado en `docs/ghl/student-area-inventory.md`.
      - Mantener el workflow de pago en pausa hasta superar las pruebas de contrato.
      Covers: R10, R12; checks: A4, A5.

- [x] Phase 3: Implementar el adaptador seguro de registro
      Done when: email/contraseña y primer Google login envían un evento verificado a n8n; un payload inválido no llega a GHL; `npm test -- --run` y `npm run lint` pasan.
      Steps:
      - Añadir el endpoint server-side mínimo que verifica el ID token de Firebase y limita tamaño, proveedor, email y `eventId`.
      - Conectar `register` y el primer login de Google al endpoint sin enviar contraseña ni secretos desde el cliente.
      - Devolver estados claros y dejar reintento en el siguiente login o en la cola de n8n cuando la entrega temporal falle.
      - Añadir tests para email, Google, repetición, token inválido y n8n caído.
      Covers: R1, R2, R3, R4; checks: A1, A2.

- [x] Phase 4: Crear el workflow de lead en n8n
      Done when: un evento válido crea/actualiza un solo contacto GHL y un segundo evento no duplica el contacto; el workflow está guardado pero apagado hasta el smoke test.
      Steps:
      - Crear el webhook con secreto interno y validar el contrato recibido del adaptador.
      - Ejecutar `contacts/upsert` con email, nombre y source sin reemplazar tags.
      - Guardar el `contactId`, los códigos de respuesta y el estado de reintento sin registrar secretos.
      - Configurar backoff para 429/5xx/timeout y dead-letter para 4xx de validación.
      Covers: R1, R2, R3, R4, R11; checks: A1, A2, A3.

- [x] Phase 5: Blindar la confirmación de pago Stripe
      Done when: solo una sesión Stripe firmada, pagada, compatible con una formación y no procesada previamente entra en la rama de compra.
      Steps:
      - Aceptar `checkout.session.completed` y `checkout.session.async_payment_succeeded` y leer la sesión desde Stripe.
      - Exigir `mode: payment`, `payment_status: paid`, email válido, line item esperado, `stripePriceId`, moneda e importe exactos.
      - Rechazar o aparcar sesiones `unpaid`, fallidas, expiradas, ambiguas o incompatibles.
      - Añadir el lock/lease por `stripeSessionId` y guardar el resultado en `compras/{stripeSessionId}`.
      - Mantener intacta la rama actual de acceso y verificar que el redirect no es la única fuente de concesión.
      Covers: R5, R6, R7; checks: A7, A8.

- [x] Phase 6: Proyectar compras y reembolsos en GoHighLevel
      Done when: una compra test válida deja el contacto correcto con su etiqueta activa y una única oportunidad en `Formación Online` · `Comprado`; un reembolso mueve esa oportunidad a `Reembolso` sin añadir la etiqueta.
      Steps:
      - Resolver el contacto por email; hacer upsert de respaldo si el alta no llegó.
      - Añadir la etiqueta mediante Add Tags y comprobar que las etiquetas anteriores permanecen.
      - Buscar la oportunidad por contacto y pipeline; crearla si no existe y actualizarla si existe.
      - Resolver `Comprado` para pagos y `Reembolso` para reembolsos mediante la operación normalizada de Stripe.
      - Guardar `contactId`, `opportunityId`, importe, formación, `stripeSessionId` y estado de sincronización.
      - Separar errores temporales de errores de permisos o contrato.
      Covers: R8, R9, R10, R11; checks: A2, A4, A5, A6, A8.

- [x] Phase 7: Ejecutar pruebas negativas, redelivery y activación controlada
      Done when: la matriz E2E pasa en modo test, una redelivery no duplica efectos y Patricia confirma visualmente el contacto, la etiqueta, la oportunidad y el acceso.
      Steps:
      - Ejecutar una alta con email y otra con Google.
      - Ejecutar una compra Stripe test y comprobar Firestore, acceso Firebase y GHL.
      - Reenviar el mismo evento y comprobar idempotencia.
      - Simular pagos no confirmados, producto incorrecto, firma inválida y GHL temporalmente no disponible.
      - Activar el workflow solo después de comprobar que no hay variables live ni recursos comerciales existentes afectados.
      Covers: R1–R12; checks: A3, A5, A7, A8, A9.
