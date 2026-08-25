# GHL Student Area Inventory

Audit date: 2026-08-24

## Account

- Location ID: `i2hUJPae67Nohi62dB2H` (matches `GHL_LOCATION_ID` in Vercel/.env.local)
- Sub-account: Patricia Songel — L'Eliana (agency: Clinic Scale System)
- Plan: agency plan with unlimited sub-accounts (Agency Unlimited tier)
- Courses enabled: yes (module visible, no real course yet — sample data only)
- Communities enabled: yes (module visible, no community created yet)
- Client Portal: active, 2 users, 0 invited
- Stripe test mode connected: PENDING VERIFICATION (screenshot not provided; check Pagos → Integraciones)

## Domains

- Public site: ps-seminarios production URL (Vercel)
- Client Portal (current default): https://i2hujpae67nohi62db2h.app.clientclub.net/
- Client Portal (target branded subdomain): PENDING — likely `alumnos.{domain}` or `academy.{domain}`, parent domain undecided
- Checkout: PENDING (shown by GHL when offer is created)

## Products and access

| Course slug | GHL product | Offer | Community group | Active tag | Revoked tag |
|---|---|---|---|---|---|
| micropigmentacion | PENDING | PENDING | PENDING | alumno-activo-micropigmentacion | alumno-revocado-micropigmentacion |
| glowlips | PENDING | PENDING | PENDING | alumno-activo-glowlips | alumno-revocado-glowlips |

## Workflow IDs

| Purpose | Workflow name | Workflow ID |
|---|---|---|
| Purchase success | PS - Student access - grant | PENDING (Task 4) |
| Payment failure | PS - Student access - grace | PENDING (Task 4) |
| Cancellation | PS - Student access - revoke | PENDING (Task 4) |

## Access policy

- Payment model: PENDING (one_time | subscription | installments)
- Access duration: unlimited (confirmed 2026-07-02)
- Failed-payment grace period: PENDING (0 | 3 | 7 days)
- Refund action: PENDING (immediate_revoke | manual_review) — must include Spanish digital-content withdrawal consent at checkout (Art. 103.m)

## Video (decision 2026-08-24)

- Launch video source: YouTube unlisted embed (no DRM track for now)
- When production videos exist: replace embed URL; keep videos unlisted, playable only via embed
- Task 3 (DRM security pilot) skipped by owner decision

## Worktree note

- `git status` shows untracked `.claude/worktrees/`, `AGENTS.md`, `docs/superpowers/` — no blocking dirty state; build passes and prerenders 11 routes
