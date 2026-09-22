# Area de Alumnos con GoHighLevel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lanzar un area de alumnos para formaciones virtuales con checkout, acceso automatizado, comunidad y video protegido, utilizando GHL como sistema principal y su API solo cuando exista una necesidad comprobada.

**Architecture:** La primera entrega mantiene `ps-seminarios` como web publica y deriva compra y acceso a un Client Portal de GHL bajo subdominio propio. GHL gestiona Stripe, contactos, cursos, comunidad, altas y bajas mediante workflows nativos. La segunda entrega es condicional: si se exige marca de agua individual o el reproductor seguro no funciona dentro de Courses/GoKollab, una capa serverless valida el derecho de acceso en GHL y genera tokens de video de corta duracion.

**Tech Stack:** React 19, Vite 8, Vercel Functions, Vitest, GoHighLevel Courses/Communities/Workflows, Stripe, GoKollab, VdoCipher o Bunny Stream.

---

## Decision de arquitectura

| Necesidad | Solucion | API de GHL |
|---|---|---|
| Checkout GHL, curso GHL y video nativo | Workflows `Payment Received`, `Course Grant Offer` y `Course Revoke Offer` | No |
| Checkout GHL y reproductor externo embebido sin identidad individual | Curso o Funnel Lesson con iframe protegido por dominio/DRM | No |
| Compra realizada fuera de GHL | Upsert de contacto y entrada a workflow | Si |
| Marca de agua con email o ID del alumno | Backend que valida tags en GHL y solicita OTP de VdoCipher | Si |
| Portal completamente personalizado | GHL como fuente de entitlement y backend propio para sesiones | Si |
| Reconciliacion de suscripciones | Lectura de `/payments/subscriptions` | Si, solo lectura |

**Decision inicial:** implementar primero sin API adicional. Activar la ruta API solo si falla el criterio de seguridad o UX de la prueba tecnica.

## Inputs confirmed on 2026-07-02

- Pilot video: no production videos exist; use a disposable third-party or sample video for testing.
- Payment: GHL Fast Payment or payment links backed by the connected Stripe account.
- Price: pending commercial decision and not required for a test-mode pilot.
- Access duration: unlimited, subject to refund, fraud and terms enforcement.
- Refund wording: cannot be published as an unconditional no-refund rule. Spanish digital-content withdrawal requirements, including the conditions in Article 103.m, must be implemented and legally reviewed.
- Domain: likely `academy.{domain}`; final parent domain remains open.
- Security: strongest practical option, so the pilot must evaluate multi-DRM and per-student watermarking.
- Community: basic launch with structure that can add events, channels and richer interaction later.
- GHL state: Stripe is connected; Courses, Communities and plan entitlements require audit.
- Support email: deferred until before public launch.
- Hairstrokes: retain the route and restore or finish `CejasPage.jsx` before the first verified build.
- GoKollab: evaluate during the pilot. It is HighLevel's learner-facing web/mobile environment for joined courses, communities and purchase history.

## Precondiciones

- El worktree contiene cambios locales y `src/App.jsx` importa `src/pages/CejasPage.jsx`, que actualmente no existe. Antes de ejecutar este plan, el propietario debe decidir si recupera esa pagina o elimina la ruta. No mezclar esa resolucion con los commits del area de alumnos.
- Confirmar en GHL el `Location ID`, plan contratado, acceso a Courses y Communities, dominio disponible y conexion Stripe en modo test.
- Mantener `GHL_PRIVATE_KEY`, claves de streaming y secretos HMAC exclusivamente en Vercel. Nunca usar variables `VITE_*` para secretos.
- Before public checkout, add explicit digital-content consent and acknowledgement of withdrawal-right loss where legally applicable. Keep evidence in the order confirmation.

## File map

### Entrega 1, MVP nativo

- Create: `src/config/studentArea.js`. Configuracion publica de portal y checkouts.
- Create: `src/config/studentArea.test.js`. Validacion de URLs y compatibilidad con variables Stripe existentes.
- Modify: `src/components/Navbar.jsx`. Enlace externo `Area de alumnos` en desktop y movil.
- Modify: `src/pages/MicropigmentacionPage.jsx`. Usar checkout GHL desde configuracion central.
- Modify: `src/pages/GlowlipsPage.jsx`. Usar checkout GHL desde configuracion central.
- Modify: `package.json`. Añadir Vitest y scripts de prueba.
- Create: `.env.example`. Documentar solo variables publicas.
- Create: `docs/ghl/student-area-inventory.md`. Registrar IDs y decisiones operativas sin secretos.
- Create: `docs/ghl/student-area-acceptance.md`. Evidencias del piloto y criterios de lanzamiento.

### Subproyecto condicional, API para video individualizado

No se crean archivos de API durante el MVP. Si la prueba de seguridad exige marca de agua individual, el `API decision checkpoint` define el contrato y obliga a redactar un segundo plan TDD antes de modificar código.

---

### Task 1: Auditar GHL y fijar los identificadores operativos

**Files:**
- Create: `docs/ghl/student-area-inventory.md`

- [ ] **Step 1: Resolver el estado previo del worktree**

Run:

```powershell
git status --short
npm run build
```

Expected: el estado sucio queda documentado. El build solo puede continuar cuando la decision sobre `CejasPage.jsx` esté resuelta.

- [ ] **Step 2: Crear el inventario sin secretos**

Crear el archivo con esta estructura y sustituir cada valor mediante una lectura directa del panel de GHL:

```markdown
# GHL Student Area Inventory

## Account
- Location ID: registrado en Vercel como `GHL_LOCATION_ID`
- Plan: nombre exacto mostrado en Agency Billing
- Courses enabled: yes/no
- Communities enabled: yes/no
- Stripe test mode connected: yes/no

## Domains
- Public site: URL de produccion de ps-seminarios
- Client Portal: subdominio elegido
- Checkout: dominio mostrado por GHL

## Products and access
| Course slug | GHL product | Offer | Community group | Active tag | Revoked tag |
|---|---|---|---|---|---|
| micropigmentacion | nombre exacto | nombre exacto | nombre exacto | alumno-activo-micropigmentacion | alumno-revocado-micropigmentacion |
| glowlips | nombre exacto | nombre exacto | nombre exacto | alumno-activo-glowlips | alumno-revocado-glowlips |

## Workflow IDs
| Purpose | Workflow name | Workflow ID |
|---|---|---|
| Purchase success | PS - Student access - grant | valor copiado de GHL |
| Payment failure | PS - Student access - grace | valor copiado de GHL |
| Cancellation | PS - Student access - revoke | valor copiado de GHL |
```

- [ ] **Step 3: Confirmar la politica comercial**

Registrar en el mismo archivo una opcion por curso:

```markdown
## Access policy
- Payment model: one_time | subscription | installments
- Access duration: lifetime | fixed_date | while_subscription_active
- Failed-payment grace period: 0 | 3 | 7 days
- Refund action: immediate_revoke | manual_review
```

- [ ] **Step 4: Commit del inventario**

```powershell
git add docs/ghl/student-area-inventory.md
git commit -m "docs: record GHL student area inventory"
```

---

### Task 2: Construir el curso y la comunidad nativos en GHL

**Files:**
- Create through GHL UI: course products, offers, community group and Client Portal settings.
- Modify: `docs/ghl/student-area-inventory.md`

- [ ] **Step 1: Crear un curso privado de prueba**

En `Memberships > Courses > Products`, crear `PS Pilot - Micropigmentacion` con:

```text
Module 01 - Bienvenida
Lesson 01 - Como usar la plataforma
Lesson 02 - Video protegido de prueba
Module 02 - Evaluacion
Lesson 01 - Quiz de validacion
```

Expected: el curso no aparece para contactos sin oferta.

- [ ] **Step 2: Crear la comunidad de prueba**

En `Memberships > Communities`, crear el grupo privado `Patricia Songel Alumnas` y estos canales:

```text
anuncios       admin publishes, members read
presentaciones members publish and comment
dudas-tecnicas members publish and comment
soporte        members publish, moderators reply
```

- [ ] **Step 3: Configurar el Client Portal**

Configurar logo, colores, idioma español, email de soporte y el subdominio acordado. Mantener GoKollab como app del piloto. No contratar una app branded en esta fase.

- [ ] **Step 4: Crear una oferta no publicada**

Crear una oferta de Stripe en modo test asociada exclusivamente al curso piloto. No reutilizar ofertas de formaciones presenciales.

- [ ] **Step 5: Probar aislamiento**

Usar dos contactos de prueba:

```text
student.allowed@example.com: debe ver el curso
student.denied@example.com: no debe ver el curso
```

Expected: el segundo contacto recibe acceso denegado aunque conozca la URL.

---

### Task 3: Ejecutar la prueba de seguridad del video

**Files:**
- Modify through GHL UI: pilot lesson or Funnel Lesson.
- Create: `docs/ghl/student-area-acceptance.md`

- [ ] **Step 1: Probar video nativo como control**

Subir un clip sin valor comercial de 2 a 5 minutos. Comprobar reproducción, subtitulos y progreso en Chrome, Safari, iOS, Android y GoKollab.

- [ ] **Step 2: Probar reproductor externo**

Orden de prueba:

```text
1. VdoCipher quick embed or Bunny Stream signed/domain-restricted embed
2. Direct embed in a Course lesson
3. If unavailable, embed in a GHL Funnel page
4. Add that funnel as a Funnel Lesson
```

Expected: reproducción correcta sin exponer una URL MP4 y sin abandonar el entorno del curso.

- [ ] **Step 3: Ejecutar la matriz de ataques basicos**

Registrar PASS o FAIL para:

```markdown
| Test | Expected |
|---|---|
| Right-click save | No downloadable source file |
| Browser download extension | No playable exported file |
| Copy iframe URL to another domain | Denied or expired |
| Open lesson while logged out | Denied |
| Share GHL credentials | Recorded as residual risk |
| Screen recording | Blocked by DRM where supported or visibly watermarked |
| iOS playback | Works with encrypted media |
| Android playback | Works with encrypted media |
| GoKollab playback | Works without layout or login failure |
```

- [ ] **Step 4: Aplicar la puerta de decision**

```text
PASS without personal watermark -> continue with native GHL MVP
PASS but personal watermark required -> execute Tasks 7 to 10
FAIL on GoKollab but pass on mobile web -> launch web-only and hide app claims
FAIL on web and GoKollab -> pivot to custom student portal
```

- [ ] **Step 5: Commit de evidencias**

```powershell
git add docs/ghl/student-area-acceptance.md docs/ghl/student-area-inventory.md
git commit -m "docs: record student video security pilot"
```

---

### Task 4: Configurar checkout, alta, baja y recuperación en GHL

**Files:**
- Create through GHL UI: three workflows and email templates.
- Modify: `docs/ghl/student-area-inventory.md`

- [ ] **Step 1: Workflow de alta**

Crear `PS - Student access - grant`:

```text
Trigger: Payment Received
Filters: status=success, liveMode=true, product=curso exacto
Action 1: Add tag alumno-activo-{course}
Action 2: Remove tag alumno-revocado-{course}
Action 3: Course Grant Offer
Action 4: Grant community group access
Action 5: Send email PS - Bienvenida area de alumnos
Action 6: Internal notification with contact and order IDs
```

El email debe incluir el enlace SSO de Courses/Communities, soporte y pasos de primer acceso.

- [ ] **Step 2: Workflow de pago fallido**

Crear `PS - Student access - grace`:

```text
Trigger: Payment Received
Filter: status=failed, product=curso exacto
Action 1: Add tag alumno-pago-pendiente-{course}
Action 2: Send recovery email
Action 3: Wait configured grace period
Action 4: If payment recovered, stop
Action 5: Otherwise enter revoke workflow
```

- [ ] **Step 3: Workflow de baja**

Crear `PS - Student access - revoke`:

```text
Trigger: Subscription cancelled, refund approved or revoke tag added
Action 1: Course Revoke Offer
Action 2: Revoke community access
Action 3: Remove tag alumno-activo-{course}
Action 4: Add tag alumno-revocado-{course}
Action 5: Send access-ended email
Action 6: Create support task
```

- [ ] **Step 4: Prueba end-to-end en modo test**

Ejecutar compra, primer acceso, pago fallido, recuperación y cancelación. Verificar que cada transición deja un solo estado activo y no duplica emails.

---

### Task 5: Centralizar URLs publicas y añadir Area de alumnos

**Files:**
- Modify: `package.json`
- Create: `src/config/studentArea.js`
- Create: `src/config/studentArea.test.js`
- Create: `.env.example`

- [ ] **Step 1: Instalar test runner**

```powershell
npm install --save-dev vitest
```

Añadir a `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 2: Escribir el test fallido**

Crear `src/config/studentArea.test.js`:

```js
import { describe, expect, it } from 'vitest';
import { buildStudentAreaConfig } from './studentArea';

describe('buildStudentAreaConfig', () => {
  it('prefers GHL checkout URLs and preserves legacy Stripe fallback', () => {
    const config = buildStudentAreaConfig({
      VITE_GHL_PORTAL_URL: 'https://alumnos.example.com',
      VITE_GHL_CHECKOUT_MICRO: 'https://pay.example.com/micro',
      VITE_STRIPE_GLOWLIPS: 'https://buy.stripe.com/glow',
    });

    expect(config.portalUrl).toBe('https://alumnos.example.com');
    expect(config.checkout.micropigmentacion).toBe('https://pay.example.com/micro');
    expect(config.checkout.glowlips).toBe('https://buy.stripe.com/glow');
  });

  it('rejects non-https external URLs', () => {
    expect(() => buildStudentAreaConfig({
      VITE_GHL_PORTAL_URL: 'javascript:alert(1)',
    })).toThrow('VITE_GHL_PORTAL_URL must be an HTTPS URL');
  });
});
```

- [ ] **Step 3: Verificar que falla**

Run: `npm test -- src/config/studentArea.test.js`

Expected: FAIL because `studentArea.js` does not exist.

- [ ] **Step 4: Implementar configuracion minima**

Crear `src/config/studentArea.js`:

```js
function optionalHttpsUrl(env, key) {
  const value = env[key]?.trim();
  if (!value) return '';
  const url = new URL(value);
  if (url.protocol !== 'https:') {
    throw new Error(`${key} must be an HTTPS URL`);
  }
  return url.toString().replace(/\/$/, '');
}

export function buildStudentAreaConfig(env) {
  return Object.freeze({
    portalUrl: optionalHttpsUrl(env, 'VITE_GHL_PORTAL_URL'),
    checkout: Object.freeze({
      micropigmentacion:
        optionalHttpsUrl(env, 'VITE_GHL_CHECKOUT_MICRO') ||
        optionalHttpsUrl(env, 'VITE_STRIPE_MICRO'),
      glowlips:
        optionalHttpsUrl(env, 'VITE_GHL_CHECKOUT_GLOWLIPS') ||
        optionalHttpsUrl(env, 'VITE_STRIPE_GLOWLIPS'),
    }),
  });
}

export const studentAreaConfig = buildStudentAreaConfig(import.meta.env);
```

- [ ] **Step 5: Ejecutar tests**

Run: `npm test -- src/config/studentArea.test.js`

Expected: 2 tests PASS.

- [ ] **Step 6: Documentar variables publicas**

Crear `.env.example`:

```dotenv
VITE_GHL_PORTAL_URL=https://alumnos.example.com
VITE_GHL_CHECKOUT_MICRO=https://checkout.example.com/micropigmentacion
VITE_GHL_CHECKOUT_GLOWLIPS=https://checkout.example.com/glowlips
```

- [ ] **Step 7: Commit**

```powershell
git add package.json package-lock.json src/config/studentArea.js src/config/studentArea.test.js .env.example
git commit -m "feat: centralize GHL student area links"
```

---

### Task 6: Conectar Navbar y paginas comerciales al portal GHL

**Files:**
- Modify: `src/components/Navbar.jsx:1-153`
- Modify: `src/pages/MicropigmentacionPage.jsx:11,553-605`
- Modify: `src/pages/GlowlipsPage.jsx:25,539-591`

- [ ] **Step 1: Importar configuracion en Navbar**

Añadir:

```js
import { studentAreaConfig } from '../config/studentArea';
```

Renderizar en desktop y movil solo cuando exista URL:

```jsx
{studentAreaConfig.portalUrl && (
  <a
    href={studentAreaConfig.portalUrl}
    className={linkCls}
    rel="noreferrer"
  >
    Area de alumnos
  </a>
)}
```

- [ ] **Step 2: Sustituir constantes locales de checkout**

En `MicropigmentacionPage.jsx`:

```js
import { studentAreaConfig } from '../config/studentArea';
const CHECKOUT_URL = studentAreaConfig.checkout.micropigmentacion || null;
```

En `GlowlipsPage.jsx`:

```js
import { studentAreaConfig } from '../config/studentArea';
const CHECKOUT_URL = studentAreaConfig.checkout.glowlips || null;
```

Sustituir las cuatro referencias JSX a `STRIPE_URL` por `CHECKOUT_URL`. Conservar el formulario de informacion como fallback cuando el checkout no esté configurado.

- [ ] **Step 3: Verificar calidad**

```powershell
npm test
npm run lint
npm run build
```

Expected: tests PASS, lint without errors, Vite build exits 0.

- [ ] **Step 4: Verificar manualmente**

```text
Desktop: Area de alumnos visible y abre el subdominio correcto
Mobile: enlace visible, menu se cierra, no overflow
Micropigmentacion: CTA abre checkout correcto
Glowlips: CTA abre checkout correcto
Missing env: formulario de informacion sigue disponible
```

- [ ] **Step 5: Commit**

```powershell
git add src/components/Navbar.jsx src/pages/MicropigmentacionPage.jsx src/pages/GlowlipsPage.jsx
git commit -m "feat: link public site to GHL student portal"
```

---

## API decision checkpoint

La API no forma parte del MVP. Si Task 3 exige identidad individual, detener la ejecución después de Task 6 y crear un segundo plan de implementación dedicado. Ese subproyecto tendrá este contrato cerrado:

```text
GHL workflow after successful payment
  -> POST /api/student/issue-access
  -> update contact.student_access_url through contacts.write
  -> signed link /aula/{course}/{lesson}?access={HMAC}
  -> GET contact through contacts.readonly on playback
  -> require tag alumno-activo-{course}
  -> request short-lived VdoCipher OTP with email annotation
  -> return otp + playbackInfo to browser
```

Endpoints oficiales previstos:

```http
GET /contacts/{contactId}
PUT /contacts/{contactId}
POST /contacts/{contactId}/workflow/{workflowId}
GET /payments/subscriptions?altId={locationId}&altType=location&contactId={contactId}
```

Scopes máximos del PIT:

```text
contacts.readonly
contacts.write
payments/subscriptions.readonly only for reconciliation
```

Restricciones del futuro plan:

- VdoCipher requiere backend para mostrar email o ID en la marca de agua. Un iframe directo solo puede mostrar IP o texto estático.
- El backend firma enlaces con HMAC, comprueba caducidad, consulta el tag activo en GHL y usa una allowlist de IDs de video.
- Las claves `GHL_PRIVATE_KEY`, `STUDENT_ACCESS_SECRET` y `VDOCIPHER_API_SECRET` permanecen server-side.
- Cada reproducción recibe un OTP nuevo. El navegador nunca recibe el secreto del proveedor.
- La baja sigue ocurriendo en GHL. La API solo consume ese estado y no crea una segunda fuente de verdad.
- Este subproyecto necesita sus propias pruebas TDD para firma, caducidad, entitlement, allowlist, timeouts y fallos del proveedor.

### Task 7: Piloto, observabilidad y lanzamiento

**Files:**
- Modify: `docs/ghl/student-area-acceptance.md`

- [ ] **Step 1: Ejecutar cinco recorridos internos**

Cada usuario debe completar compra, email, SSO, primera leccion, comentario, logout, relogin y cancelacion.

- [ ] **Step 2: Ejecutar diez alumnas piloto**

Medir:

```text
checkout completion rate
minutes from payment to access
first-login failure rate
video playback failure rate by device
support tickets per student
refund requests
unauthorized playback attempts
```

- [ ] **Step 3: Aplicar gate de lanzamiento**

```text
100% correct entitlement assignment
100% correct revocation in policy window
0 reusable direct video URLs
>= 95% successful first playback
<= 10% students requiring login support
privacy notice and DPA reviewed
```

- [ ] **Step 4: Reconciliar por API solo si hay discrepancias**

Si aparecen divergencias entre tags y cobros, añadir un proceso read-only que consulte:

```http
GET /payments/subscriptions?altId={locationId}&altType=location&contactId={contactId}
Authorization: Bearer {sub-account PIT}
Version: 2021-07-28
```

No bloquear cada reproducción con esta llamada. Usarla para auditoria y reparación de estado.

- [ ] **Step 5: Commit del resultado del piloto**

```powershell
git add docs/ghl/student-area-acceptance.md
git commit -m "docs: record student area launch decision"
```

---

## Production environment variables

### Public variables

```dotenv
VITE_GHL_PORTAL_URL=https://subdomain-selected-in-ghl
VITE_GHL_CHECKOUT_MICRO=https://checkout-url-created-in-ghl
VITE_GHL_CHECKOUT_GLOWLIPS=https://checkout-url-created-in-ghl
```

### Server-only variables, conditional API track

```text
GHL_PRIVATE_KEY
GHL_LOCATION_ID
GHL_STUDENT_WEBHOOK_SECRET
STUDENT_ACCESS_SECRET
PUBLIC_SITE_URL
VDOCIPHER_API_SECRET
VDOCIPHER_GLOWLIPS_WELCOME_ID
VDOCIPHER_MICRO_WELCOME_ID
```

## Rollback

1. Hide `Area de alumnos` by removing `VITE_GHL_PORTAL_URL` from Vercel.
2. Disable checkout CTAs by removing the two `VITE_GHL_CHECKOUT_*` variables.
3. Pause GHL grant workflows before changing offers or products.
4. Revoke compromised links by rotating `STUDENT_ACCESS_SECRET`, then reissue access through the workflow.
5. Revoke a video vendor key immediately if it appears in client output or logs.
6. Preserve GHL contact and payment records during rollback. Do not delete purchase history.

## Official references

- HighLevel Contacts API: https://marketplace.gohighlevel.com/docs/ghl/contacts/upsert-contact/
- HighLevel workflow enrollment API: https://marketplace.gohighlevel.com/docs/ghl/contacts/add-contact-to-workflow/
- HighLevel subscriptions API: https://marketplace.gohighlevel.com/docs/ghl/payments/list-subscriptions/
- HighLevel webhook catalog: https://marketplace.gohighlevel.com/docs/category/webhook/
- VdoCipher OTP API: https://www.vdocipher.com/docs/server/playbackauth/anno/
- VdoCipher player: https://www.vdocipher.com/docs/player/v2/
- Bunny embed authentication: https://docs.bunny.net/stream/token-authentication
