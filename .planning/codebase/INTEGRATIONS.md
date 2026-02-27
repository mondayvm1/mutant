# External Integrations

## Stripe

**Package:** `stripe ^20.4.0`
**Used in:** `api/reserve.ts` (Vercel serverless function)
**Purpose:** Reservation list — stores each reservation as a Stripe Customer record. No payment charged at reservation time ($0 down waitlist).

### How it works

1. Frontend (`src/components/CTASection.tsx`) POSTs to `/api/reserve` with `{ name, email, demoDay }`
2. `api/reserve.ts` initializes: `new Stripe(process.env.STRIPE_SECRET_KEY!)`
3. Checks duplicates: `stripe.customers.list({ email, limit: 1 })` — returns 409 if exists
4. Creates Customer: `stripe.customers.create({ email, name, metadata: {...} })`
5. Returns `customer.id` on success

### Metadata on Stripe Customer

| Key | Value |
|---|---|
| `reserved_at` | ISO timestamp |
| `demo_day` | Selected demo day string or `"none"` |
| `source` | `"mutant-landing-page"` |
| `status` | `"reserved"` |

### Required Env Vars

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_live_...` or `sk_test_...`) |

### What is NOT done with Stripe

- No payment intents, charges, or subscriptions
- No webhooks configured
- No price/product objects
- No frontend Stripe.js / Elements

---

## Resend

**Package:** `resend ^6.9.2`
**Used in:** `api/reserve.ts`
**Purpose:** Sends two transactional emails per reservation.

### Emails sent

1. **Owner notification** → `renebetancourtiii@gmail.com`
   - From: `Mutant Reservations <onboarding@resend.dev>`
   - Includes: name, email, demo day, Stripe customer ID (dashboard link), timestamp ET

2. **Customer confirmation** → submitted email
   - From: `Mutant <onboarding@resend.dev>`
   - Dark-themed HTML confirming $0 down, 100 units, 2026 delivery, and demo day

### ⚠️ Sender Domain

Currently using Resend's shared `onboarding@resend.dev`. Must configure a verified custom domain before production (e.g., `reservations@mutant.com`). Update `from:` in `api/reserve.ts` lines 43 and 59.

### Required Env Vars

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key (`re_...`) |

---

## Vercel

**Package:** `@vercel/node ^5.6.9`
**Used in:** `api/reserve.ts`
**Purpose:** Typed serverless function handler. `api/` directory auto-deploys as Vercel serverless functions.

### CORS

Permissive headers set (`Access-Control-Allow-Origin: *`), OPTIONS preflight handled.

---

## What is NOT Integrated

| Capability | Status |
|---|---|
| Database | None — Stripe Customers are the reservation store |
| Authentication | None |
| Analytics | None |
| Payment processing | No charges — Stripe for customer storage only |
| Custom email domain | Using Resend shared domain; needs verified domain for production |
| next-themes dark mode | Package installed, not wired into UI |
| react-hook-form / Zod | Installed, not used in current forms |
| recharts | Installed, not used in any page |
