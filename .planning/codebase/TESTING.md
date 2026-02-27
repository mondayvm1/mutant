# Testing

## Framework

- **Vitest ^3.2.4** — test runner (Vite-native, fast)
- **jsdom** — browser environment simulation
- **@testing-library/react ^16.0.0** — component testing utilities
- **@testing-library/jest-dom ^6.6.0** — DOM matchers (`toBeInTheDocument`, etc.)

## Configuration

**`vitest.config.ts`:**
```ts
{
  environment: 'jsdom',
  globals: true,
  setupFiles: ['src/test/setup.ts']
}
```

**`src/test/setup.ts`** — mocks `window.matchMedia` (required by `useIsMobile`):
```ts
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({ matches: false, ... }))
});
```

## Current Test Coverage

| File | Status |
|---|---|
| `src/test/example.test.ts` | Trivial placeholder — `expect(true).toBe(true)` |
| Everything else | **No tests** |

## What Should Be Tested

### High Priority

| Target | Type | Why |
|---|---|---|
| `CTASection` reservation form | Component | Core user flow — form validation, API call, error/success states |
| `api/reserve.ts` | Integration | Stripe + Resend calls, duplicate detection, error responses |
| `useScrollProgress` | Hook | Used for parallax — regression risk |
| `ScrollReveal` | Component | Entrance animations — IntersectionObserver behavior |

### Medium Priority

| Target | Type | Why |
|---|---|---|
| `use-toast` reducer | Unit | Pure reducer exported from hook, easily testable |
| `useIsMobile` | Hook | Breakpoint logic with matchMedia mock already in setup |
| `cn()` utility | Unit | Pure function, trivial to test |

### Lower Priority

- `HeroSection`, `FeaturesSection`, etc. — static content, low regression risk
- shadcn UI components — tested by the library itself

## Running Tests

```bash
npm test          # run once
npm run test:watch  # watch mode
```
