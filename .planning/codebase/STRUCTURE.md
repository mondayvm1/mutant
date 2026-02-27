# Directory Structure

```
mutant/
├── api/                          # Vercel serverless functions
│   └── reserve.ts                # POST /api/reserve — reservation handler
│
├── public/                       # Static assets (served as-is)
│   ├── favicon.ico
│   ├── robots.txt
│   ├── placeholder.svg
│   └── images/                   # Product photography (HEIC + JPG)
│       ├── mutant-*.HEIC/JPG     # 10 product images
│       ├── og-share.png
│       └── og-share.jpg
│
├── src/
│   ├── main.tsx                  # React entry — createRoot()
│   ├── App.tsx                   # Providers + BrowserRouter + Routes
│   ├── App.css                   # App-level styles (minimal)
│   ├── index.css                 # Global styles, CSS variables, custom utilities
│   ├── vite-env.d.ts             # Vite type declarations
│   │
│   ├── pages/
│   │   ├── Index.tsx             # Landing page — composes all sections
│   │   └── NotFound.tsx          # 404 page
│   │
│   ├── components/
│   │   ├── HeroSection.tsx       # Full-screen hero with parallax bg
│   │   ├── ProblemSection.tsx    # 3-column problem statement
│   │   ├── SolutionSection.tsx   # Image + text side-by-side
│   │   ├── FeaturesSection.tsx   # 4-column stats grid
│   │   ├── ActionSection.tsx     # Full-width action image + overlay
│   │   ├── CTASection.tsx        # Reservation form (id="reserve")
│   │   ├── Footer.tsx            # Site footer
│   │   ├── NavLink.tsx           # Navigation link component
│   │   ├── ScrollReveal.tsx      # IntersectionObserver animation wrapper
│   │   └── ui/                   # shadcn/ui generated components (51 files)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── toast.tsx
│   │       └── ... (45 more)
│   │
│   ├── hooks/
│   │   ├── use-mobile.tsx        # useIsMobile() — breakpoint detection
│   │   ├── use-toast.ts          # Toast state management (reducer-based)
│   │   └── useScrollProgress.ts  # useScrollProgress() — scroll % tracker
│   │
│   ├── lib/
│   │   └── utils.ts              # cn() — clsx + tailwind-merge
│   │
│   ├── assets/
│   │   ├── hero-mutant.jpg
│   │   ├── mutant-action.jpg
│   │   ├── mutant-detail.jpg
│   │   └── mutant-side.jpg
│   │
│   └── test/
│       ├── setup.ts              # Vitest setup — mocks window.matchMedia
│       └── example.test.ts       # Placeholder test (trivial)
│
├── .planning/                    # GSD planning artifacts (this directory)
│   └── codebase/                 # Codebase map documents
│
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite config — port 8080, @/ alias
├── tailwind.config.ts            # Tailwind theme, fonts, animations
├── tsconfig.json                 # TS root config (references app + node)
├── tsconfig.app.json             # Browser TS config
├── tsconfig.node.json            # Node/Vite TS config
├── postcss.config.js             # PostCSS — tailwind + autoprefixer
├── eslint.config.js              # ESLint 9 flat config
├── vitest.config.ts              # Vitest — jsdom, globals, setup file
├── components.json               # shadcn/ui config
├── package.json
├── package-lock.json
├── bun.lockb                     # Bun lock file (project may support bun)
├── .env.example                  # Required env vars template
├── .gitignore
└── README.md
```

## Key Locations

| What | Where |
|---|---|
| Reservation form | `src/components/CTASection.tsx` |
| Serverless API | `api/reserve.ts` |
| Global CSS variables | `src/index.css` |
| Tailwind theme | `tailwind.config.ts` |
| Route definitions | `src/App.tsx` |
| All page sections | `src/pages/Index.tsx` |
| shadcn components | `src/components/ui/` |

## Naming Conventions

| Entity | Convention | Example |
|---|---|---|
| Components | PascalCase | `CTASection.tsx`, `ScrollReveal.tsx` |
| Pages | PascalCase | `Index.tsx`, `NotFound.tsx` |
| Project hooks | camelCase | `useScrollProgress.ts` |
| shadcn hooks | kebab-case | `use-toast.ts`, `use-mobile.tsx` |
| Constants | SCREAMING_SNAKE_CASE | `DEMO_DAYS`, `OWNER_EMAIL` |
| CSS utilities | kebab-case | `gradient-text`, `box-glow` |
| Import alias | `@/` | `@/components/ui/button` |
