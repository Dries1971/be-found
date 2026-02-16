# Tech Stack — be-found.online

> Last updated: 2026-02-13

## Core

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| i18n | next-intl | ^4.8.2 |
| Content | MDX (next-mdx-remote) | TBD |
| Icons | Lucide React | TBD |
| Email | TransIP SMTP (native nodemailer) | TBD |
| Validation | Zod | TBD |
| Charts | Recharts | TBD |
| Component Variants | class-variance-authority (CVA) | ^0.7.1 |
| Class Merging | clsx + tailwind-merge | ^2.1.1 / ^3.4.1 |
| Accessible Primitives | @radix-ui/react-slot | ^1.2.4 |

## Infrastructure

| Service | Provider |
|---------|----------|
| Hosting | Railway |
| Domain | be-found.online |
| CDN / Images | Cloudinary |
| Analytics | Plausible |
| Email Service | TransIP SMTP |

## Development

| Tool | Technology |
|------|-----------|
| Testing (Unit) | Vitest |
| Testing (E2E) | Playwright |
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
