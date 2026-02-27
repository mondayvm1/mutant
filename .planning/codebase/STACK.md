# Tech Stack

## Language & Runtime

- **Language:** TypeScript 5.8.3
- **Runtime:** Browser (client-side SPA) + Vercel serverless functions (Node.js, via `@vercel/node ^5.6.9`)
- **Module format:** ESM (`"type": "module"` in package.json)

## Build Tool

- **Vite 5.4.19** — dev server on port 8080, HMR overlay disabled
- **SWC** via `@vitejs/plugin-react-swc ^3.11.0` for fast JSX/TS transpilation
- **Path alias:** `@` → `./src`

## Frameworks

- **React 18.3.1** (`react`, `react-dom`)
- **Vercel Node** (`@vercel/node ^5.6.9`) for the serverless API function in `api/`

## UI Library

- **shadcn/ui** (config at `components.json`) — style: `default`, base color: `slate`, CSS variables enabled
- Built on **Radix UI** primitives (full suite installed)
- **lucide-react ^0.462.0** — icon set
- **cmdk ^1.1.1** — command palette primitive
- **vaul ^0.9.9** — drawer primitive
- **embla-carousel-react ^8.6.0** — carousel
- **react-resizable-panels ^2.1.9** — resizable panel layouts
- **input-otp ^1.4.2** — OTP input
- **recharts ^2.15.4** — charting (installed, not yet used)
- **react-day-picker ^8.10.1** + **date-fns ^3.6.0** — calendar/date picking

## Styling

- **Tailwind CSS 3.4.17** with PostCSS and Autoprefixer
- **tailwindcss-animate ^1.0.7** — custom keyframe animations: `fade-up`, `fade-in`, `scale-in`, `slide-left`, `slide-right`, `pulse-glow`, `accordion-down/up`
- **tailwind-merge ^2.6.0** — merges conflicting Tailwind classes
- **class-variance-authority ^0.7.1** — component variant management
- **clsx ^2.1.1** — conditional class joining
- **CSS variables** for all design tokens (colors, radius) via HSL values in `src/index.css`
- **Dark mode** via `darkMode: ["class"]`
- **next-themes ^0.3.0** — theme switching (installed, not yet wired in)
- **Custom fonts:** `Bebas Neue` (`font-display`) and `Space Grotesk` (`font-body`)

## Animation

- **Framer Motion ^12.34.3** — scroll-parallax in `ActionSection.tsx`, reveal in `CTASection.tsx`
- **ScrollReveal** (`src/components/ScrollReveal.tsx`) — custom IntersectionObserver wrapper
- **Tailwind keyframe animations** for looping effects

## Form Handling

- Reservation form in `CTASection.tsx` uses plain React `useState` — no form library
- **react-hook-form ^7.61.1** + **@hookform/resolvers ^3.10.0** — installed, available for future forms
- **Zod ^3.25.76** — schema validation (installed, ready for use)

## State Management

- **TanStack React Query ^5.83.0** — `QueryClientProvider` wraps app; not yet used for active fetches
- **Local component state** (`useState`) for reservation form

## Routing

- **React Router DOM ^6.30.1** — `BrowserRouter` + `Routes`
- Routes: `/` → `Index.tsx`, `*` → `NotFound.tsx`
- In-page navigation via anchor links (`href="#reserve"`)

## Testing

- **Vitest ^3.2.4** — test runner
- **jsdom ^20.0.3** — browser environment simulation
- **@testing-library/react ^16.0.0** + **@testing-library/jest-dom ^6.6.0**
- Setup file: `src/test/setup.ts`

## TypeScript Configuration

- Path alias `@/*` → `./src/*`
- Relaxed: `noImplicitAny: false`, `strictNullChecks: false`, `skipLibCheck: true`

## Notable Dependencies

| Package | Version | Purpose |
|---|---|---|
| react / react-dom | ^18.3.1 | UI framework |
| typescript | ^5.8.3 | Language |
| vite | ^5.4.19 | Build tool |
| framer-motion | ^12.34.3 | Animation |
| react-router-dom | ^6.30.1 | Routing |
| @tanstack/react-query | ^5.83.0 | Server state |
| react-hook-form | ^7.61.1 | Form handling |
| zod | ^3.25.76 | Validation |
| stripe | ^20.4.0 | Payments (server) |
| resend | ^6.9.2 | Email (server) |
| @vercel/node | ^5.6.9 | Serverless runtime |
| sonner | ^1.7.4 | Toast notifications |
| vitest | ^3.2.4 | Testing |
