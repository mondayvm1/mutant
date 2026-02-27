# Concerns & Technical Debt

## Security

### API — No Rate Limiting
`api/reserve.ts` has no rate limiting. A bot could spam thousands of Stripe Customers.
- **Risk:** Stripe API bill from customer creation volume, email spam via Resend
- **Fix:** Add Vercel's built-in rate limiting, or use Upstash Redis via `@upstash/ratelimit`

### API — No Input Sanitization
Name and email are passed directly to Stripe and Resend with no sanitization beyond TypeScript types.
- **Risk:** Stripe metadata injection, malformed email delivery
- **Fix:** Add Zod schema validation (already installed) at the top of the handler

### Resend Sender Domain — Placeholder
`from: "onboarding@resend.dev"` is Resend's shared test address.
- **Risk:** Emails land in spam for real users; sender impersonation not possible
- **Fix:** Verify a custom domain in Resend dashboard, update `from:` in `api/reserve.ts` lines 43 and 59

### No CSRF Protection
The `/api/reserve` endpoint accepts POST from any origin (`Access-Control-Allow-Origin: *`).
- **Risk:** Cross-site request forgery from other domains
- **Fix:** Restrict CORS to the production domain, or add a token/honeypot field

## Missing Infrastructure

### No Database
Reservations are stored only as Stripe Customer records. Stripe is not a database.
- **Risk:** No easy querying, no backup export, no admin view beyond Stripe dashboard
- **Fix (future):** Add Supabase or PlanetScale for a proper reservation table

### No Admin Dashboard
No way to view all reservations except logging into Stripe dashboard.
- **Fix (future):** Build a simple `/admin` page with a list of reservations

### No End-to-End Testing
The `api/reserve.ts` function has never been tested against real Stripe/Resend credentials.
- **Risk:** Silent failures in production — emails not sent, customers not created
- **Fix:** Test with Stripe test keys and Resend sandbox before going live

## Dependencies

### 16 npm Vulnerabilities
`npm audit` reports 6 moderate + 10 high vulnerabilities in the dependency tree.
- **Risk:** Likely in transitive deps; run `npm audit` to see specifics
- **Fix:** `npm audit fix` for auto-fixable issues; review the rest

### Heavy node_modules
598 packages installed for what is primarily a landing page. Many shadcn components (51 files) are installed but unused.
- **Risk:** Slow CI installs, larger attack surface
- **Fix (future):** Audit and remove unused shadcn components

## Code Debt

### Unused Installed Packages
| Package | Installed | Actually used |
|---|---|---|
| `react-hook-form` | ✓ | ✗ — CTASection uses raw useState |
| `zod` | ✓ | ✗ — no schemas defined |
| `recharts` | ✓ | ✗ — no charts on any page |
| `next-themes` | ✓ | ✗ — no dark mode toggle |
| `@tanstack/react-query` | ✓ | ✗ — QueryClient set up, no queries |
| `react-day-picker` + `date-fns` | ✓ | ✗ — no calendar UI |

### Loose TypeScript Config
`strictNullChecks: false` and `noImplicitAny: false` mean runtime null errors won't be caught at compile time.

### Demo Day Dates Are Hardcoded
Dates in `CTASection.tsx` and `api/reserve.ts` are hardcoded strings (March/April 2026). They'll go stale and need manual updates.
- **Fix:** Move to a config file or environment variable

## Fragile Areas

| Area | Risk |
|---|---|
| `api/reserve.ts` — Stripe duplicate check | `stripe.customers.list()` is eventually consistent; rapid duplicate submissions could slip through |
| `ScrollReveal` | Uses IntersectionObserver which isn't supported in all environments; no fallback |
| Hero parallax | Uses `useScroll` + `useTransform` — heavy on mobile, no reduced-motion handling |
