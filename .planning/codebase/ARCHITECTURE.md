# Architecture

## Pattern

**SPA + Serverless** — React single-page app deployed as static assets on Vercel, with a single Vercel serverless function for the reservation API.

```
Browser (React SPA)
       │
       │  POST /api/reserve
       ▼
Vercel Serverless Function (api/reserve.ts)
       │              │
       ▼              ▼
  Stripe API      Resend API
  (create        (send emails)
  customer)
```

## Entry Points

| File | Role |
|---|---|
| `index.html` | HTML shell, mounts `#root` |
| `src/main.tsx` | React root, renders `<App />` |
| `src/App.tsx` | Providers wrapper + router |
| `src/pages/Index.tsx` | Landing page, composes all sections |
| `api/reserve.ts` | Serverless POST handler at `/api/reserve` |

## Component Hierarchy

```
App
├── QueryClientProvider (React Query)
├── TooltipProvider (Radix)
├── Toaster (Sonner + shadcn)
└── BrowserRouter
    └── Routes
        ├── / → Index
        │   ├── <nav> (sticky)
        │   ├── HeroSection
        │   ├── ProblemSection
        │   ├── SolutionSection
        │   ├── FeaturesSection
        │   ├── ActionSection
        │   ├── CTASection ← reservation form
        │   └── Footer
        └── * → NotFound
```

## Data Flow — Reservation

```
User fills CTASection form
  → handleSubmit fires
  → fetch('/api/reserve', { method: 'POST', body: { name, email, demoDay } })
  → api/reserve.ts handler
      → stripe.customers.list() — check duplicate
      → stripe.customers.create() — store reservation
      → resend.emails.send() × 2 — notify owner + confirm customer
      → return { success: true, customerId }
  → CTASection shows success state
```

## Layers

| Layer | Location | Responsibility |
|---|---|---|
| Presentation | `src/components/` | UI sections, animations |
| Pages | `src/pages/` | Route-level composition |
| Hooks | `src/hooks/` | Scroll behavior, mobile detection, toast |
| Utilities | `src/lib/utils.ts` | `cn()` class merge helper |
| API | `api/` | Serverless business logic |

## Key Abstractions

- **`ScrollReveal`** (`src/components/ScrollReveal.tsx`) — wraps children with IntersectionObserver; supports `direction` (`up`/`left`/`right`/`scale`/`fade`) and `delay` props
- **`useScrollProgress`** (`src/hooks/useScrollProgress.ts`) — tracks scroll percentage for parallax
- **`cn()`** (`src/lib/utils.ts`) — `clsx + tailwind-merge` for conditional class composition

## Scroll & Animation Strategy

Two parallel systems:
1. **Framer Motion** — imperative, for parallax (`useScroll`, `useTransform`) and mount animations
2. **ScrollReveal + CSS transitions** — declarative, for section entrance animations via IntersectionObserver

## Static Assets

- `public/images/` — product HEIC/JPG photos (not imported via JS, referenced by path)
- `src/assets/` — images imported directly into components (bundled by Vite)
