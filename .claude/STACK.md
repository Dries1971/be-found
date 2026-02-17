# Tech Stack — be-found.online

> Last updated: 2026-02-17

## Core

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| i18n | next-intl | ^4.8.2 |
| Content | MDX (next-mdx-remote) | ^6.0.0 |
| Icons | Lucide React | ^0.564.0 |
| Email | nodemailer (TransIP SMTP) | ^8.0.1 |
| Validation | Zod | ^4.3.6 |
| Database | postgres (postgres.js) | ^3.4.8 |
| Schema.org | schema-dts | ^1.1.5 |
| OG Images | @vercel/og | ^0.8.6 |
| Component Variants | class-variance-authority (CVA) | ^0.7.1 |
| Class Merging | clsx + tailwind-merge | ^2.1.1 / ^3.4.1 |
| Accessible Primitives | @radix-ui/react-slot | ^1.2.4 |

## Infrastructure

| Service | Provider |
|---------|----------|
| Hosting | Railway |
| Domain | be-found.online |
| Database | Railway PostgreSQL |
| CDN / Images | Cloudinary |
| Analytics | Plausible |
| Email Service | TransIP SMTP |

## Development

| Tool | Technology |
|------|-----------|
| Testing (Unit) | Vitest ^4.0.18 |
| Testing (E2E) | Playwright ^1.58.2 |
| Component Docs | Storybook 10.x (@storybook/nextjs-vite) |
| Linting | ESLint |
| Package Manager | npm |

## Design System

| Element | Choice |
|---------|--------|
| Typography | Inter (via next/font) |
| Icons | Lucide React |
| Style | Clean & Minimalist |
| Color Palette | Navy + Gold + Teal (implemented) |
| Component Pattern | CVA variants, cn() utility, Radix Slot |

## Locales

| Code | Language | Status |
|------|----------|--------|
| en | English | Primary (default, no prefix) |
| nl | Dutch | Active |
| de | German | Active |
| fr | French | Active |
| es | Spanish | Active |
| pt | Portuguese | Active |
