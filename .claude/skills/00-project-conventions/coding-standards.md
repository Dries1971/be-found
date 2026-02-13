# Coding Standards — be-found.online

## TypeScript

- **Strict mode** — no `any`, no `@ts-ignore`, no `as unknown as`
- **Prefer `interface` over `type`** for object shapes (extensibility)
- **Use `type` for unions, intersections, mapped types**
- **Export types explicitly** — `export interface Props { ... }`
- **Name component props** as `{ComponentName}Props`
- **Use `const` assertions** where appropriate
- **No enums** — use `as const` objects or union types

## React / Next.js

- **Server Components by default** — only add `"use client"` when needed
- **Colocate** — keep related files together (component + types + tests)
- **No default exports** except for pages (`page.tsx`, `layout.tsx`, `route.ts`)
- **Named exports** for components: `export function Button() { ... }`
- **Props destructuring** in function signature
- **Avoid `useEffect`** for data fetching — use Server Components or `use()`

## File Naming

- **Components**: PascalCase (`Button.tsx`, `HeroSection.tsx`)
- **Utilities/hooks**: camelCase (`useTheme.ts`, `formatDate.ts`)
- **Pages/layouts**: lowercase (`page.tsx`, `layout.tsx`)
- **CSS modules**: component name (`Button.module.css`)
- **Constants**: UPPER_SNAKE_CASE in file, camelCase filename

## CSS / Tailwind

- **Tailwind utility classes first** — avoid custom CSS unless necessary
- **Design tokens via CSS custom properties** in `theme.css`
- **Dark mode**: use `dark:` variant (class-based, not media query)
- **Responsive**: mobile-first (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- **CVA (class-variance-authority)** for component variants
- **No `!important`** — fix specificity instead

## Component Architecture

```
src/components/
├── ui/          # Primitives (Button, Input, Badge)
├── sections/    # Page sections (HeroSection, CTASection)
├── layout/      # Layout components (Header, Footer, Sidebar)
├── forms/       # Form components (ContactForm, NewsletterForm)
├── schema/      # Schema.org JSON-LD components
├── data/        # Data display (Tables, Charts)
└── blog/        # Blog-specific components
```

## Import Order

1. React / Next.js imports
2. Third-party libraries
3. Internal modules (`@/lib/`, `@/components/`)
4. Types
5. Styles

## Accessibility (WCAG 2.1 AA)

- **Semantic HTML** — use `<nav>`, `<main>`, `<article>`, `<section>`
- **All interactive elements** keyboard accessible
- **ARIA labels** on icon-only buttons
- **Color contrast** ≥ 4.5:1 (normal text), ≥ 3:1 (large text)
- **Focus indicators** visible and styled
- **Alt text** on all images (empty `alt=""` for decorative)
- **Skip to main content** link

## Performance

- **Lazy load** below-fold images and heavy components
- **Optimize images** via Next.js `<Image>` component
- **Code split** with `dynamic()` for heavy client components
- **Lighthouse ≥ 95** on all pages (Performance, Accessibility, Best Practices, SEO)
