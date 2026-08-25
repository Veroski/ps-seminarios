# Student Area — E2E Acceptance Results

Test date: 2026-08-25
Tester: Claude (autonomous execution), account: Patricia Songel — L'Eliana (`i2hUJPae67Nohi62dB2H`)

## Summary

Full end-to-end purchase testing (checkout → payment → automatic access) could **not** be completed. A blocker was found in Stripe checkout configuration (see below) that prevents any real purchase — test or otherwise — from succeeding safely. All steps that don't depend on a successful Stripe charge were verified where possible; the rest are marked BLOCKED.

## Blocker: Stripe checkout resolves to live mode

- Both course offers ("PS - Micropigmentación Online - Test", and by inference "PS - Glowlips Online - Test") serve Stripe's **live** publishable key in their embedded checkout, confirmed by:
  1. Reading the checkout page HTML for `pk_live_` vs `pk_test_` (no payment data entered, zero risk) — found `pk_live_`, not `pk_test_`.
  2. A real attempt to pay with Stripe's test card `4242 4242 4242 4242` was declined by Stripe with: *"Your request was in live mode, but used a known test card."* No charge occurred — Stripe blocks test cards in live mode by design.
- The GHL account has both Stripe modes connected (Payments → Integrations → Stripe → Manage confirms "El modo de live de Stripe está habilitado" and "El modo de test de Stripe está habilitado", with a separate test account `acct_1SWy24I5S8AFJOSo`, €0.00 balance) — but no UI control was found to select which mode an individual offer/product's checkout should use. Checked: offer details panel, checkout editor ("Editar el proceso de pago"), product pricing panel (Pagos → Productos → Valoración), and the Stripe integration management page itself.
- **Side effect observed**: the failed checkout attempt still created a real contact in GHL (`PS Test Uno`, `guillemvera+pstest1@gmail.com`) and a pending €100.00 transaction record, even though Stripe rejected the charge. No money moved.
- **Next step (owner action required)**: this likely needs to be resolved either via GHL support (ask how to force test-mode Stripe for an offer's embedded checkout when both modes are connected) or by checking the Stripe Dashboard directly (outside GHL) for the connected account's default-mode setting. Per project guardrails, the PIT's payment-write scopes are intentionally blocked and Stripe/GHL live resources must not be modified from this session — this is a config check for a human with dashboard access, not something to force through automation.

## Manual/tag-based grant simulation (workaround attempted)

Since a real purchase isn't currently possible without the blocker above, an attempt was made to simulate the grant flow without Stripe by manually tagging a test contact:

1. Test contact `PS Test Uno` (`guillemvera+pstest1@gmail.com`) — already existed from the failed checkout attempt above.
2. Manually added tag `alumno-activo-micropigmentacion` to the contact.
3. Checked workflow "PS - Student access - grant - micro" (ID `32afb8c8-c738-429d-a076-e9eb81de2441`) enrollment history: **0 enrollments** — the workflow did not fire.

**Root cause**: the grant workflow's trigger is the native GHL event **"Se ha concedido acceso a la oferta"** (Offer Access Granted), not a tag-added trigger. Manually adding the active tag does not simulate a real purchase and cannot exercise this workflow. This confirms the grant workflow logic itself was built correctly per the plan spec (verified by reading its configuration in a prior session), but it can only be fully exercised by a real successful Stripe checkout — which is blocked (see above).

## Test matrix — status by step

| # | Step | Status | Notes |
|---|---|---|---|
| 1 | Open checkout URL (Micropigmentación) in incognito | PASS | Page loads correctly, shows correct offer name and €100.00 |
| 2 | Purchase with test card `4242 4242 4242 4242` | **FAIL — BLOCKED** | Declined: checkout is in Stripe live mode, not test. No charge occurred. |
| 3a | Contact created with test email | PASS (side effect) | Contact created despite declined payment |
| 3b | Tag `alumno-activo-micropigmentacion` present | PARTIAL | Only present because added manually for this test; not the product of a real grant flow |
| 3c | Order in `Pagos → Transacciones` marked as TEST | **FAIL** | Transaction recorded as live-mode pending €100.00, not a test-mode transaction |
| 3d | Welcome email received | NOT TESTED | Grant workflow never fired (see above), so no email was sent by the automation |
| 4 | Portal login → course appears → lesson opens → video plays | NOT TESTED | Requires real course access grant, which requires the blocked purchase flow |
| 5 | Contact sees community | NOT TESTED | Same dependency |
| 6 | Isolation check: second non-purchasing contact does not see course | NOT TESTED | Not attempted — no purchasing contact exists yet to compare against |
| 7 | Revocation: add `alumno-revocado-micropigmentacion`, verify course/community access lost + email sent | NOT TESTED | Revoke workflow structure was verified directly in the workflow builder (Task 4) and is published, but not exercised end-to-end here |
| 8 | Repeat purchase test for Glowlips offer | NOT TESTED | Same Stripe blocker expected to apply (same account-level Stripe integration) |

## What IS verified and considered solid

- Courses, community, Client Portal branding, and both offers exist and are published exactly per the plan (Tasks 2A–2D, closed in prior session).
- All three workflows (grant-micro, grant-glowlips, revoke) are built correctly per the plan spec and are in Publicado state (Task 4, closed this session) — verified by direct inspection of each workflow's trigger and action chain in the GHL workflow builder.
- The revoke workflow's dual-trigger OR logic, course-revoke actions, tag removal, and farewell email were all individually configured and saved correctly (confirmed via UI screenshots during Task 4).
- No live/production resources were modified: no real charge was made, the PIT's blocked payment-write scopes were never invoked, and the only side effect of testing was one test contact + one permanently-pending (uncharged) transaction record, which is safe to leave or clean up manually.

## Recommendation before going live

1. Resolve the Stripe live/test mode issue for offer checkouts (owner or GHL support) — this is a hard blocker for any further automated purchase testing, and more importantly must be fixed before this pilot could ever safely go live, since the flip side of "test cards get rejected in live mode" is "real cards would actually be charged real money" if this were used as-is today.
2. Once resolved, repeat the full test matrix above with a genuine Stripe-test-mode purchase to validate the grant workflow, portal access, video playback, isolation, and revocation end-to-end.
3. Manually clean up (or leave, low risk) the test contact and pending transaction created during this session's blocked attempt.
