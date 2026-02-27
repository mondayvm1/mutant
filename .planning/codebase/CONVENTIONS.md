# Code Conventions

## TypeScript Patterns

- Named exports for section components (`export function CTASection()`)
- Default exports for pages (`export default Index`)
- Module-level constants for data arrays (`const DEMO_DAYS = [...]`)
- `as const` not yet used but available
- Loose tsconfig: `noImplicitAny: false`, `strictNullChecks: false` — types are present but not enforced strictly
- `interface` for props when typed, `type` for unions
- `unknown` for catch blocks: `catch (error: unknown)` with `instanceof Error` guard

## Component Structure

Standard section component shape:
```tsx
// Module-level constants
const DEMO_DAYS = [...];

// Named export
export function CTASection() {
  // State at top
  const [name, setName] = useState("");

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => { ... };

  // JSX return
  return (
    <section id="reserve" className="...">
      ...
    </section>
  );
}
```

## CSS / Tailwind Approach

Three-layer architecture in `src/index.css`:

1. **CSS Variables** (`:root`) — all design tokens as HSL values
   ```css
   --primary: 0 72% 51%;
   --background: 0 0% 4%;
   ```

2. **Base styles** (`@layer base`) — html/body/selection overrides

3. **Custom utilities** (`@layer utilities`) — project-specific classes:
   - `gradient-text` — primary gradient on text via background-clip
   - `gradient-section` — subtle section background
   - `box-glow` / `box-glow-strong` — glowing box shadow on hover
   - `text-glow` — glowing text shadow
   - `line-accent` — decorative left border accent
   - `scrollbar-hide` — hide scrollbar cross-browser

Typography uses fluid `clamp()`:
```tsx
className="font-display text-[clamp(3rem,8vw,8rem)]"
```

Dark-only palette — no light mode toggle implemented.

## Animation Conventions

Two co-existing systems:
1. **ScrollReveal wrapper** for entrance animations on scroll
   ```tsx
   <ScrollReveal delay={200}>
     <p>...</p>
   </ScrollReveal>
   ```
2. **Framer Motion** for imperative/stateful animations
   ```tsx
   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
   ```

## Naming

| Entity | Convention |
|---|---|
| Components | PascalCase files and functions |
| Pages | PascalCase, default export |
| Project hooks | camelCase (`useScrollProgress`) |
| shadcn hooks | kebab-case (`use-toast`, `use-mobile`) |
| Constants | `SCREAMING_SNAKE_CASE` |
| CSS utilities | kebab-case |

## Import Aliases

- `@/` resolves to `src/` — used for all cross-directory imports
- Relative imports only within the same directory

## Error Handling

Pattern in async handlers:
```tsx
try {
  const res = await fetch("/api/reserve", { ... });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed");
  setSubmitted(true);
} catch (err) {
  setError(err instanceof Error ? err.message : "Something went wrong.");
} finally {
  setLoading(false);
}
```

Server-side (api/reserve.ts):
```ts
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  return res.status(500).json({ error: `Failed: ${message}` });
}
```
