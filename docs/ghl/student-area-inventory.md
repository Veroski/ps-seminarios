# GHL Student Area Inventory

Audit date: 2026-08-24

## Account

- Location ID: `i2hUJPae67Nohi62dB2H` (matches `GHL_LOCATION_ID` in Vercel/.env.local)
- Sub-account: Patricia Songel — L'Eliana (agency: Clinic Scale System)
- Plan: agency plan with unlimited sub-accounts (Agency Unlimited tier)
- Courses enabled: yes (module visible, no real course yet — sample data only)
- Communities enabled: yes (module visible, no community created yet)
- Client Portal: active, 2 users, 0 invited
- Stripe connected: yes — live mode enabled AND test mode enabled (verified 2026-08-24, Pagos → Integraciones)
- Apple Pay / Link domains: not registered
- **BLOCKER (found 2026-08-25)**: both offer checkouts (Micropigmentación and, by inference, Glowlips) serve Stripe's **live** publishable key (`pk_live_...`) in the embedded checkout, not `pk_test_...`, despite the account having a separate test-mode Stripe account connected (`acct_1SWy24I5S8AFJOSo`, €0.00 balance). Confirmed by reading the checkout page's HTML for the key prefix (no payment data entered) and by a real test-card attempt (`4242 4242 4242 4242`) being declined with "Your request was in live mode, but used a known test card." No toggle to select test vs. live per-offer or per-product was found anywhere in the GHL UI (offer details, checkout editor, product pricing, Payments → Integrations → Stripe → Manage). This blocks any real Stripe purchase test in this account until resolved — likely requires GHL support or direct Stripe dashboard access to fix which mode the connected "default" account resolves to for embedded checkouts.

## Domains

- Public site: ps-seminarios production URL (Vercel)
- Client Portal (current default): https://i2hujpae67nohi62db2h.app.clientclub.net/
- Client Portal (target branded subdomain): PENDING — likely `alumnos.{domain}` or `academy.{domain}`, parent domain undecided
- Checkout micropigmentacion (test, published offer): https://i2hujpae67nohi62db2h.app.clientclub.net/courses/offers/7cd9805c-6c12-4f94-a7db-9f3892e4be90
- Checkout glowlips (test, published offer): https://i2hujpae67nohi62db2h.app.clientclub.net/courses/offers/7510100b-0eca-49dd-b4df-a0539a5053fb

## Products and access

| Course slug | GHL product | Offer | Community group | Active tag | Revoked tag |
|---|---|---|---|---|---|
| micropigmentacion | PS - Micropigmentación Online (product_id: e1acadb6-2b3a-4d57-8abc-c13c71d516d9) | Pago único EUR 100 (test), created inline with course | Patricia Songel Alumnas (shared group, see below) | alumno-activo-micropigmentacion | alumno-revocado-micropigmentacion |
| glowlips | PS - Glowlips Online (product_id: 863c8ed1-50d3-4817-bd51-0e473478449c) | Pago único EUR 100 (test), created inline with course | Patricia Songel Alumnas (shared group, see below) | alumno-activo-glowlips | alumno-revocado-glowlips |

## Community

- Group name: Patricia Songel Alumnas
- Slug: patricia-songel-alumnas
- Created via Suscripciones → Comunidades → Crear una comunidad
- Description: "Espacio privado para alumnas de las formaciones de Patricia Songel: anuncios, dudas y comunidad."
- Channels: not configured individually (GHL create-group form has no per-channel step in this account's UI version — default channel(s) apply; revisit inside the group settings if separate anuncios/dudas channels are required)
- Branding (favicon/cover/logo): skipped, optional

## Client Portal — branding & language (Task 2D, closed 2026-08-24)

- Nombre del portal: "Patricia Songel"
- Descripción del portal: "Área de alumnas"
- Correo de asistencia / Derechos de autor: left blank (optional, pending)
- Logo/colores: default (blue), not customized — optional polish before live
- Idioma del portal: Spanish (changed from default English, saved and confirmed)
- Domain: still default `https://i2hujpae67nohi62db2h.app.clientclub.net/` — custom subdomain NOT configured (per plan, out of scope for this pass)

Course structure (both courses): 1 module "Course Contents" with lessons "Cómo usar la plataforma" (welcome text) and "Vídeo de la formación" (YouTube unlisted embed via Insertar contenido multimedia → tipo Youtube). Template leftover lessons (Lesson 2/3, What's Next) remain unpublished-unused, harmless — can be deleted later via GHL UI trash icon on hover.

## Workflow IDs

| Purpose | Workflow name | Workflow ID | Status |
|---|---|---|---|
| Purchase success (micropigmentacion) | PS - Student access - grant - micro | `32afb8c8-c738-429d-a076-e9eb81de2441` | Publicado |
| Purchase success (glowlips) | PS - Student access - grant - glowlips | `40666e31-ec82-44ed-ad32-2f79d61c47b5` | Publicado |
| Cancellation (both courses, OR trigger) | PS - Student access - revoke | `3a56e5ca-5f6d-4df5-af59-4495dd4dbccb` | Publicado |

Grace workflow intentionally not created — payment model is one-time, no grace period needed (per plan decision).

### Revoke workflow structure

Trigger: tag added `alumno-revocado-micropigmentacion` OR tag added `alumno-revocado-glowlips` (two OR-joined trigger boxes, since the single-trigger filter-value field is single-select despite chip UI).

Actions in order: Course revoke offer (Glowlips) → Course revoke offer (Micropigmentación) → Remove Tag (`alumno-activo-glowlips`, `alumno-activo-micropigmentacion`) → Email "Access ended email" (Spanish farewell copy).

**Manual pending step**: no native GHL action found for "remove community access" on offer/course revoke — same limitation confirmed on the grant workflows. Community removal on refund must be done manually by the owner until GHL exposes this action.

## Access policy

- Payment model: one_time (confirmed 2026-08-24)
- Price: EUR 100 provisional per course, in Stripe test mode (real price TBD before live)
- Access duration: unlimited (confirmed 2026-07-02)
- Failed-payment grace period: n/a — one-time payment; no grace workflow needed
- Refund action: manual_review (default; owner did not specify otherwise) — must include Spanish digital-content withdrawal consent at checkout (Art. 103.m) before going live

## Video (decision 2026-08-24)

- Launch video source: YouTube unlisted embed (no DRM track for now)
- When production videos exist: replace embed URL; keep videos unlisted, playable only via embed
- Task 3 (DRM security pilot) skipped by owner decision

## Worktree note

- `git status` shows untracked `.claude/worktrees/`, `AGENTS.md`, `docs/superpowers/` — no blocking dirty state; build passes and prerenders 11 routes
