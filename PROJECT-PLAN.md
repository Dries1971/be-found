# Be-Found.online — Project Plan

> **Companion document bij MASTERPLAN.md**
> Het MASTERPLAN definieert WAT en WAAROM. Dit document definieert WIE, WANNEER, en HOE.
>
> Datum: 13 februari 2026
> Versie: 1.0

---

## Executive Summary

| Item | Waarde |
|---|---|
| **Scope** | 29 hoofdstukken MASTERPLAN, volledig geïmplementeerd |
| **Timeline** | 10 weken (5 sprints × 2 weken) |
| **Launch datum** | Week 10 — **vrijdag 25 april 2026** |
| **Talen bij launch** | 6 (EN, NL, DE, FR, ES, PT) |
| **URL's bij launch** | ~207-231 |
| **Team** | Dries (eigenaar), Joost (coördinator), Claude Code (builder) |
| **Methode** | Sprint-based (2 weken), Kanban binnen sprints |
| **Geschatte totale effort** | ~740 uur |

---

## 1. Team & RACI

### 1.1 Teamrollen

| Persoon | Rol | Beschikbaarheid | Focus |
|---|---|---|---|
| **Dries de Gelder** | Product Owner, Content Director, Decision Maker | ~30-40 uur/week | Beslissingen, content review, expert input, externe contacten |
| **Joost Winnink** | Project Coördinator, QA Lead | ~15-25 uur/week (aanname — afstemmen!) | Voortgangsbewaking, QA, vertaalcoördinatie, testing |
| **Claude Code** | Lead Developer, Content Writer | On-demand (hoge throughput) | Code, content creatie (EN), vertalingen, technische implementatie |

> **⚠️ OPEN PUNT**: Joost's exacte beschikbaarheid en taken moeten in Sprint 0 (voorbereiding) worden afgestemd.

### 1.2 RACI Matrix (per werkgebied)

| Werkgebied | Claude Code | Dries | Joost |
|---|---|---|---|
| **Technische architectuur** | R | A | I |
| **UI/Component development** | R | A | C |
| **Design tokens + dark mode** | R | A | I |
| **EN content schrijven** | R | A (review) | I |
| **Content vertaling (5 talen)** | R | A (steekproef) | C (coördinatie) |
| **Native speaker review** | I | C | A (coördineert extern) |
| **Juridische review** | I | A | R (coördineert extern) |
| **Schema.org implementatie** | R | I | I |
| **SEO/GEO optimalisatie** | R | A (valideert data) | I |
| **Testing (unit + E2E)** | R | I | C (QA review) |
| **Lighthouse + accessibility** | R | I | R (handmatige QA) |
| **CI/CD pipeline** | R | I | I |
| **Railway + DNS setup** | R | A (DNS eigenaar) | I |
| **External dependencies ophalen** | I | R (foto's, testimonials, logo's) | R (legal, native speakers) |
| **Sprint planning + retro** | C | A | R (facilitator) |
| **Stakeholder communicatie** | I | R | C |
| **Bloffee blog coördinatie** | I | A | R |

**Legenda**: **R** = Responsible (doet het werk), **A** = Accountable (keurt goed), **C** = Consulted, **I** = Informed

---

## 2. Sprint Structuur

### 2.1 Sprint Cadence

| Moment | Wat | Wie | Duur |
|---|---|---|---|
| **Maandag 09:00** (Week 1 van sprint) | Sprint Planning | Dries + Joost + Claude Code | 30 min |
| **Dagelijks 09:00** | Standup (async of sync) | Iedereen | 10 min |
| **Vrijdag 16:00** (Week 2 van sprint) | Sprint Review + Demo | Dries + Joost | 45 min |
| **Vrijdag 16:45** (Week 2 van sprint) | Sprint Retro | Dries + Joost | 15 min |

### 2.2 Sprint Overzicht

```
Sprint 1 (W1-2)   ████████████████ Foundation + Design System Core
Sprint 2 (W3-4)   ████████████████ Section Components + Core Pages (EN)
Sprint 3 (W5-6)   ████████████████ Content Engine + Pillar Pages + i18n Start
Sprint 4 (W7-8)   ████████████████ i18n Completering + SEO/GEO Optimalisatie
Sprint 5 (W9-10)  ████████████████ Testing + Polish + LAUNCH 🚀
```

### 2.3 Definition of Done (globaal)

Een taak is "Done" wanneer:
1. ✅ Code geschreven en werkend
2. ✅ TypeScript strict — geen `any`, geen errors
3. ✅ Dark mode werkt (light + dark)
4. ✅ Responsive (mobile-first, 320px → 1920px)
5. ✅ Keyboard navigeerbaar + screen reader labels
6. ✅ Lighthouse ≥ 95/100/100/100 op betreffende pagina
7. ✅ Schema.org aanwezig (indien relevant)
8. ✅ EN content aanwezig en gereviewd
9. ✅ Gecommit met juiste credit footer

---

## 3. Work Breakdown Structure (WBS)

### Effort-schaal

| Size | Uren | Voorbeeld |
|---|---|---|
| **XS** | 1-2u | Security header toevoegen |
| **S** | 2-4u | Eén UI component bouwen |
| **M** | 4-8u | Eén page template + content |
| **L** | 8-16u | Complex systeem (i18n setup, MDX pipeline) |
| **XL** | 16-32u | Homepage (10 secties), pillar page |

---

### Sprint 1: Foundation + Design System Core (Week 1-2)

**Sprint Goal**: Werkende skeleton deployed op staging. Design tokens, dark mode, core UI components, layout. Elke route in 6 talen bereikbaar (leeg).

**Capaciteit**: ~100 uur (CC onbeperkt, Dries ~20u, Joost ~10u)

#### Week 1: Infrastructure + Tokens

| # | Taak | Size | Uren | Wie (R) | Blokkeert | Ref |
|---|---|---|---|---|---|---|
| 1.01 | Next.js 16 project setup (TS strict, Tailwind v4, App Router) | S | 3 | CC | Alles | H10 |
| 1.02 | .claude/ configuratie finaliseren (CLAUDE.md, STACK.md, initiële skills) | XS | 2 | CC | Development workflow | H12, H13 |
| 1.03 | Git repo structuur + branch strategie (main, staging, feature/*) | XS | 1 | CC | CI/CD | H15 |
| 1.04 | Railway project aanmaken + GitHub repo koppelen (deploy via push) | S | 3 | CC + Dries (account) | Deployment | H15 |
| 1.05 | DNS configuratie (be-found.online, www redirect, staging subdomain) | S | 2 | Dries (registrar) | Domein live | H15, H29 |
| 1.06 | SSL + security headers in next.config.ts | XS | 2 | CC | Productie-readiness | H21 |
| 1.07 | Environment variables setup (Railway + .env.local) | XS | 1 | CC + Dries | API integraties | H15 |
| 1.08 | Sentry integratie + /api/health endpoint | S | 3 | CC | Monitoring | H20 |
| 1.09 | Uptime monitoring setup (BetterStack of OpenStatus) | XS | 1 | Dries | Monitoring | H20 |
| 1.10 | next-intl v4 foundation (6 locales, routing, middleware, message loading) | L | 10 | CC | Alle pagina's | H11 |
| 1.11 | Design tokens (theme.css: kleuren, spacing, fonts, radii, shadows) | M | 5 | CC | Alle componenten | H9 |
| 1.12 | Dark mode infrastructure (system pref + toggle + localStorage + FOUC prevention) | M | 5 | CC | Alle componenten | H25 |
| 1.13 | Font setup (Inter variable + JetBrains Mono via next/font) | S | 2 | CC | Typografie | H9 |

**Week 1 subtotaal**: ~40 uur CC, ~3 uur Dries

#### Week 2: UI Components + Layout

| # | Taak | Size | Uren | Wie (R) | Blokkeert | Ref |
|---|---|---|---|---|---|---|
| 1.14 | Button component (primary/secondary/ghost/link + CVA varianten) | S | 3 | CC | Alle pagina's | H9 |
| 1.15 | Card component (default/featured/stat/product/tech varianten) | S | 4 | CC | Alle pagina's | H9 |
| 1.16 | Badge component (status/category/tag/geo-score) | S | 2 | CC | Content pagina's | H9 |
| 1.17 | Input component (text/email/textarea/select + Zod validation) | S | 3 | CC | Forms | H9 |
| 1.18 | Stat component (number + label + trend) | S | 2 | CC | Homepage, data pagina's | H9 |
| 1.19 | Alert component (info/success/warning/error) | XS | 2 | CC | Form feedback | H9 |
| 1.20 | Header component (nav, mobile menu, locale switcher, dark mode toggle) | L | 10 | CC | Alle pagina's | H9, H10 |
| 1.21 | Footer component (links, newsletter CTA, social links, privacy badge) | M | 6 | CC | Alle pagina's | H9 |
| 1.22 | PageLayout template (header + content + footer) | S | 3 | CC | Alle pagina's | H9 |
| 1.23 | LandingLayout template (hero + sections + CTA) | S | 3 | CC | Landing pages | H9 |
| 1.24 | ArticleLayout template (prose + sidebar) | S | 3 | CC | Pillar pages, blog | H9 |
| 1.25 | Global Schema.org entities (Organization, WebSite, Person × JSON-LD) | M | 5 | CC | SEO foundation | H7 |
| 1.26 | CI pipeline (lint → type-check → test → build → deploy) | M | 6 | CC | Quality gates | H14, H15 |
| 1.27 | Staging deployment verificatie (alles draait, 6 locale routes werken) | S | 2 | CC + Joost (QA) | Sprint 2 | H15 |

**Week 2 subtotaal**: ~54 uur CC, ~2 uur Joost

#### Sprint 1 Totaal: ~96 uur

| Deliverable | Acceptance Criteria |
|---|---|
| Staging URL live | `staging.be-found.online` laadt in alle 6 talen |
| Design tokens werkend | Alle kleuren, spacing, fonts correct in light + dark mode |
| 6 UI components | Button, Card, Badge, Input, Stat, Alert — alle varianten |
| Layout compleet | Header (met nav + locale switch + dark mode), Footer, 3 page templates |
| CI pipeline groen | lint + type-check + build slagen |
| Schema.org basis | Organization + WebSite + Person in page source |
| Monitoring actief | Sentry + uptime monitor draaien |

**🚦 Go/No-Go Gate Sprint 1 → 2:**
- [ ] Staging URL bereikbaar in 6 talen
- [ ] Dark mode toggle werkt
- [ ] CI pipeline groen
- [ ] Dries heeft design tokens visueel goedgekeurd

---

### Sprint 2: Section Components + Core Pages EN (Week 3-4)

**Sprint Goal**: Alle section components gebouwd. Alle vaste pagina's live in het Engels op staging. Site ziet er professioneel uit.

**Capaciteit**: ~120 uur (CC onbeperkt, Dries ~25u review + content input, Joost ~15u QA)

#### Week 3: Section Components

| # | Taak | Size | Uren | Wie (R) | Blokkeert | Ref |
|---|---|---|---|---|---|---|
| 2.01 | HeroSection (dark/light/featured varianten) | M | 6 | CC | Homepage, landing pages | H9 |
| 2.02 | AuthorityBar (metrics balk) | S | 3 | CC | Homepage, landing pages | H9, H27 |
| 2.03 | ProblemSolution (probleem → oplossing layout) | S | 4 | CC | Homepage | H9 |
| 2.04 | StatGrid (3-4 stat cards + count-up animatie hook) | M | 5 | CC | Homepage, data pagina's | H9, H26 |
| 2.05 | ServiceGrid (diensten grid met iconen) | S | 4 | CC | Services pagina | H9 |
| 2.06 | EcosystemSection (Bloffee + GEO-Score product cards) | M | 5 | CC | Homepage | H9 |
| 2.07 | DataShowcase (live GEO data preview) | M | 6 | CC | Homepage | H9 |
| 2.08 | TeamSection (leden met foto + credentials) | S | 4 | CC | About, Homepage | H9 |
| 2.09 | TestimonialSection (quotes, voorbereid voor P2 data) | S | 3 | CC | Homepage (social proof) | H9, H27 |
| 2.10 | LatestInsights (blog post cards, mock data tot Bloffee live) | S | 3 | CC | Homepage | H9 |
| 2.11 | CTASection (audit/newsletter/download varianten) | S | 4 | CC | Alle pagina's | H9 |
| 2.12 | ComparisonTable (vergelijkingstabellen) | S | 3 | CC | Pillar pages | H9 |
| 2.13 | FAQSection (accordion) | S | 3 | CC | FAQ pagina | H9 |
| 2.14 | PricingSection (tiered cards + toggle) | M | 5 | CC | Pricing pagina | H9 |
| 2.15 | CiteThisBlock (APA/BibTeX/plain-text + copy knop) | S | 3 | CC | Pillar pages | H9 |
| 2.16 | Quote component (blockquote met auteur + bron) | XS | 2 | CC | Content pagina's | H9 |
| 2.17 | Table component (responsive, sorteerbaar) | S | 3 | CC | Data pagina's | H9 |
| 2.18 | Tabs component | S | 2 | CC | Content organisatie | H9 |
| 2.19 | Accordion component | S | 2 | CC | FAQ | H9 |
| 2.20 | Progress component (bar + circular) | S | 2 | CC | GEO scores | H9 |
| 2.21 | CodeBlock component (syntax highlighted, teal) | S | 3 | CC | Tech secties | H9 |

**Week 3 subtotaal**: ~75 uur CC

#### Week 4: Core Pages (EN)

| # | Taak | Size | Uren | Wie (R) | Review | Ref |
|---|---|---|---|---|---|---|
| 2.22 | Homepage (10 secties samenstellen + EN content) | XL | 16 | CC | Dries | H9.6 |
| 2.23 | About page (Dries + Joost profiel, credentials) | M | 6 | CC | Dries (persoonlijke info) | H7, H9 |
| 2.24 | Editorial Process page | S | 4 | CC | Dries | H9 |
| 2.25 | AI Policy page | S | 4 | CC | Dries | H17 |
| 2.26 | Services overzicht page | M | 5 | CC | Dries | H9 |
| 2.27 | GEO Consulting service page | M | 6 | CC | Dries | H9 |
| 2.28 | AI Content Strategy service page | M | 6 | CC | Dries | H9 |
| 2.29 | GEO Audit service page | M | 6 | CC | Dries | H9 |
| 2.30 | Products: Bloffee showcase page | M | 5 | CC | Dries | H9 |
| 2.31 | Products: GEO-Score showcase page | M | 5 | CC | Dries | H9 |
| 2.32 | Contact page + API route (TransIP SMTP + honeypot + time check + Zod) | M | 8 | CC | Joost (test) | H21, H23 |
| 2.33 | 404 page (zoeksuggesties, meertalig, Plausible event) | S | 4 | CC | — | H10, H29 |
| 2.34 | Dries content review sessie (alle EN pagina's doorlopen) | — | 8 | Dries | — | — |

**Week 4 subtotaal**: ~75 uur CC, ~8 uur Dries review, ~3 uur Joost QA

#### Sprint 2 Totaal: ~153 uur

| Deliverable | Acceptance Criteria |
|---|---|
| 15 Section components | Alle varianten werkend in light + dark mode |
| Homepage (EN) | 10 secties, professioneel, responsive, Lighthouse 95+ |
| About + Editorial + AI Policy (EN) | Content gereviewd door Dries |
| Services (5 pagina's EN) | Overzicht + 3 detail, ServiceGrid werkt |
| Products (2 pagina's EN) | Bloffee + GEO-Score showcase |
| Contact form | Werkend: submit → TransIP SMTP email → bevestiging |
| 404 pagina | Suggesties, locale-aware |

**🚦 Go/No-Go Gate Sprint 2 → 3:**
- [ ] Alle EN pagina's live op staging en gereviewd door Dries
- [ ] Contact form werkend (end-to-end test met echte email)
- [ ] Lighthouse ≥ 95 op homepage
- [ ] Alle section components werkend in dark + light mode
- [ ] Dries akkoord op visuele kwaliteit ("ziet dit eruit als een authority hub?")

---

### Sprint 3: Content Engine + Pillar Pages + i18n Start (Week 5-6)

**Sprint Goal**: Alle content-zware pagina's in EN klaar. MDX systeem draait. Vertaling gestart voor NL + DE (hoogste prioriteit markten).

**Capaciteit**: ~130 uur (CC onbeperkt, Dries ~25u, Joost ~20u coördinatie)

#### Week 5: Content Pages + MDX System

| # | Taak | Size | Uren | Wie (R) | Ref |
|---|---|---|---|---|---|
| 3.01 | Pricing page (EN) — tiers, anchoring, FAQ | M | 8 | CC | H1, H9 |
| 3.02 | FAQ page (EN) — FAQPage schema, accordion | M | 6 | CC | H7 |
| 3.03 | Privacy Policy (EN) — GDPR compliant | M | 5 | CC | H17 |
| 3.04 | Terms of Service (EN) | S | 4 | CC | H17 |
| 3.05 | Cookie Policy (EN) — "geen cookies" uitleg | S | 3 | CC | H17 |
| 3.06 | Impressum (template, DE-specifiek) | S | 2 | CC | H17 |
| 3.07 | MDX pillar page systeem (content/ directory, Zod frontmatter, rendering) | L | 12 | CC | H10, H24 |
| 3.08 | Newsletter signup component + API route (Postgres DB opslag, TransIP SMTP bevestiging) | M | 6 | CC | H18, H23 |
| 3.09 | OG Image generatie (/api/og — 5 templates) | M | 8 | CC | H22 |
| 3.10 | Dries review: Pricing + Legal pages (EN) | — | 4 | Dries | — |

**Week 5 subtotaal**: ~54 uur CC, ~4 uur Dries

#### Week 6: Pillar Pages + i18n Start

| # | Taak | Size | Uren | Wie (R) | Ref |
|---|---|---|---|---|---|
| 3.11 | Pillar page #1: GEO Statistics 2026 (EN) — data-heavy, grafieken, Recharts | XL | 24 | CC | H3, H5, H6 |
| 3.12 | Pillar page #2: Complete Guide to GEO (EN) — long-form, 5.000+ woorden | XL | 20 | CC | H3, H5, H6 |
| 3.13 | SpeakableSpecification op alle P0 pagina's | S | 3 | CC | H7 |
| 3.14 | UI string vertalingen: NL (messages/nl.json) | M | 5 | CC | H11 |
| 3.15 | UI string vertalingen: DE (messages/de.json) | M | 5 | CC | H11 |
| 3.16 | UI string vertalingen: FR (messages/fr.json) | M | 5 | CC | H11 |
| 3.17 | UI string vertalingen: ES (messages/es.json) | M | 5 | CC | H11 |
| 3.18 | UI string vertalingen: PT (messages/pt.json) | M | 5 | CC | H11 |
| 3.19 | Dries review: beide pillar pages (data-validatie, expert insight) | — | 8 | Dries | — |
| 3.20 | Joost: native speaker reviewers regelen (NL, DE, FR, ES, PT) | — | 6 | Joost | — |

**Week 6 subtotaal**: ~72 uur CC, ~8 uur Dries, ~6 uur Joost

#### Sprint 3 Totaal: ~130 uur

| Deliverable | Acceptance Criteria |
|---|---|
| Pricing page (EN) | Tiers correct, responsive, Dries gereviewd |
| Legal pages (EN) | Privacy, Terms, Cookies, Impressum |
| FAQ page (EN) | FAQPage schema, accordion |
| MDX systeem | Pillar pages renderen correct vanuit .mdx files |
| GEO Statistics 2026 (EN) | Data correct, grafieken werkend, Dries gevalideerd |
| Complete Guide to GEO (EN) | Long-form content, Dries gevalideerd |
| OG Images | Genereren correct voor alle 5 templates |
| Newsletter signup | Double opt-in flow werkend (Postgres + TransIP SMTP) |
| UI strings | Alle 6 talen beschikbaar |

**🚦 Go/No-Go Gate Sprint 3 → 4:**
- [ ] ALLE EN pagina's compleet en gereviewd
- [ ] Pillar pages data gevalideerd door Dries
- [ ] MDX systeem werkend
- [ ] OG images genereren correct (test via LinkedIn debugger)
- [ ] UI strings in alle 6 talen
- [ ] Native speaker reviewers geregeld (Joost)

---

### Sprint 4: i18n Completering + SEO/GEO Optimalisatie (Week 7-8)

**Sprint Goal**: Alle 6 talen compleet op alle pagina's. Volledige Schema.org coverage. SEO/GEO optimalisatie afgerond.

**Capaciteit**: ~140 uur (CC max throughput op vertalingen, Dries ~20u, Joost ~25u coördinatie + QA)

#### Week 7: Page Content Vertalingen

| # | Taak | Size | Uren | Wie (R) | Ref |
|---|---|---|---|---|---|
| 4.01 | Alle vaste pagina's vertalen → NL (16 pagina's) | XL | 24 | CC | H11 |
| 4.02 | Alle vaste pagina's vertalen → DE (16 pagina's) | XL | 24 | CC | H11 |
| 4.03 | Alle vaste pagina's vertalen → FR (16 pagina's) | XL | 24 | CC | H11 |
| 4.04 | Pillar pages vertalen → NL (2 pagina's) | L | 8 | CC | H11 |
| 4.05 | Pillar pages vertalen → DE (2 pagina's) | L | 8 | CC | H11 |
| 4.06 | Native speaker review coördinatie NL + DE | — | 6 | Joost | H11 |
| 4.07 | Dries steekproef NL vertalingen | — | 4 | Dries | H11 |

**Week 7 subtotaal**: ~88 uur CC, ~4 uur Dries, ~6 uur Joost

#### Week 8: Resterende Vertalingen + SEO/GEO

| # | Taak | Size | Uren | Wie (R) | Ref |
|---|---|---|---|---|---|
| 4.08 | Alle vaste pagina's vertalen → ES (16 pagina's) | XL | 24 | CC | H11 |
| 4.09 | Alle vaste pagina's vertalen → PT (16 pagina's) | XL | 24 | CC | H11 |
| 4.10 | Pillar pages vertalen → FR, ES, PT (6 pagina's) | L | 16 | CC | H11 |
| 4.11 | Schema.org completering ALLE paginatypes (per-page JSON-LD @graph) | L | 16 | CC | H7 |
| 4.12 | Sitemap.xml (alle locales + xhtml:link alternates) | S | 3 | CC | H5 |
| 4.13 | robots.txt + llms.txt finaliseren | S | 2 | CC | H5, H6 |
| 4.14 | OpenGraph + Twitter Cards op alle pagina's (via generateMetadata) | M | 4 | CC | H22 |
| 4.15 | GEO-optimalisatie alle content (writing rules H6 toepassen) | L | 12 | CC | H6 |
| 4.16 | Internal linking strategie implementeren | M | 4 | CC | H5 |
| 4.17 | Redirects configureren in next.config.ts (www→non-www, etc.) | S | 2 | CC | H29 |
| 4.18 | Google Search Console + Bing Webmaster Tools setup | S | 2 | Dries | H5 |
| 4.19 | Plausible analytics events configureren (alle 11 events) | M | 4 | CC | H19 |
| 4.20 | Content freshness: dateModified op alle pagina's | S | 2 | CC | H6 |
| 4.21 | Native speaker review coördinatie FR + ES + PT | — | 8 | Joost | H11 |
| 4.22 | Vertaalfeedback verwerken (alle talen) | M | 8 | CC | H11 |

**Week 8 subtotaal**: ~121 uur CC, ~2 uur Dries, ~8 uur Joost

#### Sprint 4 Totaal: ~141 uur (zwaarste sprint — vertalingen!)

| Deliverable | Acceptance Criteria |
|---|---|
| Alle pagina's in 6 talen | Elke URL in EN/NL/DE/FR/ES/PT bereikbaar en correct |
| Schema.org volledig | Elke paginatype heeft correcte JSON-LD @graph |
| Sitemap.xml | Alle ~207-231 URL's met alternates |
| SEO compleet | Meta tags, OG tags, hreflang, canonical op elke pagina |
| GEO geoptimaliseerd | Alle content voldoet aan H6 writing rules |
| Analytics actief | Plausible events configureerd en testbaar |
| Internal linking | Elke pagina linkt naar relevante andere pagina's |

**🚦 Go/No-Go Gate Sprint 4 → 5:**
- [ ] Alle 6 talen live op staging
- [ ] Schema.org gevalideerd (Google Rich Results Test — 0 errors)
- [ ] Sitemap.xml correct (alle URL's, alle alternates)
- [ ] Native speaker feedback verwerkt (NL + DE minimaal, rest mag nog lopen)
- [ ] Dries akkoord op GEO-optimalisatie kwaliteit

---

### Sprint 5: Testing + Polish + LAUNCH 🚀 (Week 9-10)

**Sprint Goal**: Alle quality gates groen. Animaties. Final polish. Pre-launch checklist compleet. **LAUNCH op vrijdag Week 10.**

**Capaciteit**: ~120 uur (CC focus op fixes, Dries ~20u final review, Joost ~20u QA)

#### Week 9: Testing + Fixes

| # | Taak | Size | Uren | Wie (R) | Ref | Status |
|---|---|---|---|---|---|---|
| 5.01 | Vitest setup + unit tests (schema validatie, utils, components) | L | 14 | CC | H14 | ✅ DONE |
| 5.02 | Playwright setup + E2E tests (cross-browser, responsive, forms, navigation) | L | 14 | CC | H14 | ✅ DONE |
| 5.03 | Lighthouse audit alle pagina's + optimalisatie tot ≥ 95 | L | 10 | CC | H8 | ✅ DONE |
| 5.04 | WCAG 2.1 AA audit + fixes (contrast, keyboard, screen reader, focus) | M | 8 | CC | H8 | ✅ DONE |
| 5.05 | Cross-browser testing (Chrome, Firefox, Safari, Edge) | M | 6 | Joost + CC | H8 | ⬜ |
| 5.06 | Mobile + tablet handmatige QA (320px, 768px, 1024px, 1440px) | M | 6 | Joost | H8 | ⬜ |
| 5.07 | Schema.org validatie (Google Rich Results Test op elke paginatype) | S | 3 | CC | H7 | ✅ DONE |
| 5.08 | Bug fixes uit testing | L | 12 | CC | — | ⬜ |

**Week 9 subtotaal**: ~67 uur CC, ~12 uur Joost

#### Week 10: Polish + Launch

| # | Taak | Size | Uren | Wie (R) | Ref | Status |
|---|---|---|---|---|---|---|
| 5.09 | CSS animations (fade-ins, hover states, scroll reveals) | M | 8 | CC | H26 | ✅ DONE |
| 5.10 | View Transitions (page transitions) | S | 4 | CC | H26 | ✅ DONE |
| 5.11 | Loading states (skeleton pulse) | S | 3 | CC | H26 | ✅ DONE |
| 5.12 | Rate limiting finaliseren op alle API routes | S | 3 | CC | H21 | ✅ DONE |
| 5.13 | Storybook setup + stories voor alle components | L | 14 | CC | H9 | ✅ DONE |
| 5.14 | Final bug fixes + polish | M | 8 | CC | — | ✅ DONE |
| 5.15 | Pre-launch checklist doorlopen (MASTERPLAN Verificatie sectie) | M | 4 | CC + Joost | Verificatie | ⬜ |
| 5.16 | Email signup flow testen (signup → bevestigingsmail → confirmed in DB) | S | 2 | Joost | H23 | ⬜ |
| 5.17 | Gated content flow testen (signup → email → download) | S | 2 | Joost | H18 | ⬜ |
| 5.18 | Dries final sign-off op ALLE pagina's | — | 8 | Dries | — | ⬜ |
| 5.19 | DNS switch: staging → production | XS | 1 | Dries + CC | H15 | ⬜ |
| 5.20 | Post-deploy verificatie (health check, monitoring, schema) | S | 2 | CC + Joost | H15, H20 | ⬜ |
| 5.21 | **🚀 LAUNCH** | — | — | Dries | — | ⬜ |

**Week 10 subtotaal**: ~49 uur CC, ~8 uur Dries, ~8 uur Joost

#### Sprint 5 Totaal: ~118 uur

| Deliverable | Acceptance Criteria |
|---|---|
| Unit tests | Vitest suite groen, schema validatie, component tests |
| E2E tests | Playwright suite groen, alle critical paths |
| Lighthouse | ≥ 95/100/100/100 op ALLE pagina's |
| WCAG | Keyboard navigeerbaar, contrast OK, screen reader labels |
| Animations | Fade-ins, hover states, page transitions, prefers-reduced-motion |
| Storybook | Alle UI + section components gedocumenteerd |
| Pre-launch checklist | 100% afgevinkt |
| **LIVE** | **be-found.online bereikbaar, alle 6 talen, alle pagina's** |

**🚦 Launch Gate (MOET allemaal groen):**
- [ ] Lighthouse ≥ 95/100/100/100 op homepage + pillar pages
- [ ] Schema.org 0 errors (Rich Results Test)
- [ ] Alle 6 talen correct (steekproef door Dries)
- [ ] Contact form werkend (live test)
- [ ] Newsletter signup werkend (live test)
- [ ] SSL actief
- [ ] Security headers actief
- [ ] Monitoring actief (Sentry + uptime)
- [ ] CI pipeline volledig groen
- [ ] Dries final sign-off ✍️

---

## 4. Critical Path

```
                                    CRITICAL PATH
                                    ═════════════

Sprint 1 ─────────────────────────────────────────────────────────
│
├─ [1.01] Next.js setup ──→ [1.10] next-intl ──→ [1.11] Design tokens
│                                                        │
│                                                        ▼
│                                              [1.12] Dark mode ──→ [1.14-1.19] UI Components
│                                                                          │
│                                                                          ▼
│                                                                 [1.20-1.21] Header + Footer
│                                                                          │
Sprint 2 ─────────────────────────────────────────────────────────         │
│                                                                          ▼
├─ [2.01-2.21] Section Components (parallel, 3 weken na start)
│         │
│         ▼
├─ [2.22-2.33] Core Pages EN (requires sections + Dries review)
│         │
Sprint 3 ─│───────────────────────────────────────────────────────
│         ▼
├─ [3.07] MDX systeem ──→ [3.11-3.12] Pillar Pages EN
│                                  │
│                                  ├── [Dries review - BLOCKING]
│                                  │
Sprint 4 ─────────────────────────│────────────────────────────────
│                                  ▼
├─ [4.01-4.10] Vertalingen (zwaarste fase — ~180 uur)
│         │
│         ├── [Native speaker review - EXTERNAL DEPENDENCY]
│         │
│         ▼
├─ [4.11] Schema.org completering
│         │
Sprint 5 ─│───────────────────────────────────────────────────────
│         ▼
├─ [5.01-5.08] Testing + Fixes
│         │
│         ▼
├─ [5.09-5.14] Polish + Animations
│         │
│         ▼
└─ [5.18] Dries sign-off ──→ [5.21] 🚀 LAUNCH
```

### Kritieke afhankelijkheden op het pad:

| # | Dependency | Risico | Impact als vertraagd |
|---|---|---|---|
| **CP-1** | Design tokens → alles | Laag (Sprint 1 dag 3-4) | Alles schuift |
| **CP-2** | next-intl foundation → alle pagina's | Laag (Sprint 1 week 1) | Alle pagina's schuiven |
| **CP-3** | Section components → core pages | Medium (Sprint 2 week 3) | Pages schuiven naar Sprint 3 |
| **CP-4** | Dries content review → vertalingen starten | **Hoog** | Vertalingen schuiven → launch schuift |
| **CP-5** | Native speaker reviewers → vertaalfeedback | **Hoog** | Kwaliteit vertalingen onzeker |
| **CP-6** | Alle vertalingen → testing | Medium | Testing scope beperkt |

---

## 5. External Dependencies Tracker

| # | Dependency | Eigenaar | Nodig in | Deadline | Status | Blokkerend? |
|---|---|---|---|---|---|---|
| **ED-1** | Railway account + GitHub repo (`Dries1971/be-found.git`) koppelen | Dries | Sprint 1, Week 1 | Dag 1 | ⬜ TODO | Ja — deployment |
| **ED-2** | DNS toegang (registrar) | Dries | Sprint 1, Week 1 | Dag 2-3 | ⬜ TODO | Ja — domein |
| **ED-3** | Profielfoto Dries (professionele headshot) | Dries | Sprint 2, Week 4 | Week 4 | ⬜ TODO | Nee (placeholder mogelijk) |
| **ED-4** | Profielfoto Joost (professionele headshot) | Joost | Sprint 2, Week 4 | Week 4 | ⬜ TODO | Nee (placeholder mogelijk) |
| **ED-5** | Persoonlijke bio Dries (About page input) | Dries | Sprint 2, Week 4 | Week 3 | ⬜ TODO | Ja — About page |
| **ED-6** | Persoonlijke bio Joost | Joost | Sprint 2, Week 4 | Week 3 | ⬜ TODO | Ja — About page |
| **ED-7** | TransIP SMTP credentials (voor contact form) | Dries | Sprint 2, Week 4 | Week 3 | ⬜ TODO | Ja — contact form |
| **ED-8** | Sentry DSN | Dries | Sprint 1, Week 1 | Dag 3 | ⬜ TODO | Ja — error tracking |
| **ED-9** | Plausible account + domain | Dries | Sprint 4, Week 8 | Week 7 | ⬜ TODO | Nee (kan post-launch) |
| **ED-10** | BetterStack/OpenStatus account | Dries | Sprint 1, Week 1 | Dag 4 | ⬜ TODO | Nee (nice to have week 1) |
| **ED-11** | Native speaker reviewer NL | Joost | Sprint 4, Week 7 | Week 6 | ⬜ TODO | Ja — NL kwaliteit |
| **ED-12** | Native speaker reviewer DE | Joost | Sprint 4, Week 7 | Week 6 | ⬜ TODO | Ja — DE kwaliteit |
| **ED-13** | Native speaker reviewer FR | Joost | Sprint 4, Week 7 | Week 6 | ⬜ TODO | Ja — FR kwaliteit bij launch |
| **ED-14** | Native speaker reviewer ES | Joost | Sprint 4, Week 7 | Week 6 | ⬜ TODO | Ja — ES kwaliteit bij launch |
| **ED-15** | Native speaker reviewer PT | Joost | Sprint 4, Week 7 | Week 6 | ⬜ TODO | Ja — PT kwaliteit bij launch |
| **ED-16** | Klant logo's (toestemming) | Dries | Sprint 5 (P2) | Week 8 | ⬜ TODO | Nee (fallback: geen logo's) |
| **ED-17** | Testimonials (3-5 quotes) | Dries | Sprint 5 (P2) | Week 8 | ⬜ TODO | Nee (fallback: authority bar) |
| **ED-18** | Juridische review NL | Joost | Sprint 4, Week 8 | Week 8 | ⬜ TODO | Nee (EN legal voldoet bij launch) |
| **ED-19** | Juridische review DE | Joost | Sprint 4, Week 8 | Week 8 | ⬜ TODO | Ja — DE markt (Impressum!) |
| **ED-20** | Cloudinary account | Dries | Sprint 1, Week 2 | Week 2 | ⬜ TODO | Nee (lokale images als fallback) |
| **ED-21** | Bloffee blog posts (16-20 artikelen) | Bloffee/Dries | Sprint 5 | Week 9 | ⬜ TODO | Nee (mock data als fallback) |
| **ED-22** | Joost beschikbaarheid bevestigen | Joost | Sprint 0 | **Dag 0** | ⬜ TODO | Ja — planning |

---

## 6. Risk Register

| # | Risico | Kans | Impact | Score | Mitigatie | Eigenaar |
|---|---|---|---|---|---|---|
| **R-1** | Vertalingen kosten meer tijd dan geschat | Hoog | Hoog | 🔴 | CC parallel vertalingen; alle 6 talen bij launch; Sprint 3 al starten met UI strings; vertalingen per pagina (niet per taal) voor snelle feedback | CC + Joost |
| **R-2** | Native speakers niet op tijd beschikbaar | Medium | Hoog | 🟠 | Week 3 al starten met zoeken; NL kan Dries zelf; online platforms (Fiverr/Upwork) als backup | Joost |
| **R-3** | Dries review bottleneck (te druk) | Hoog | Hoog | 🔴 | Vaste review-blokken in agenda (2u/dag); Joost als eerste reviewer; "silence = consent" na 48u | Dries |
| **R-4** | Pillar page content niet data-accuraat | Laag | Hoog | 🟠 | Dries valideert alle data claims; alle bronnen gelinkt; fact-check sessie ingepland | Dries + CC |
| **R-5** | Lighthouse < 95 na alle features | Medium | Medium | 🟡 | Performance budget bewaken per sprint; lazy loading; bundle size check in CI | CC |
| **R-6** | Railway deployment issues | Laag | Medium | 🟡 | Deploy via GitHub push; staging branch als test; CLI + SSH beschikbaar als fallback | CC |
| **R-7** | Schema.org validatie fouten | Laag | Laag | 🟢 | Schema validatie in CI pipeline; schema-dts types | CC |
| **R-8** | Dark mode bugs | Medium | Laag | 🟡 | Dark-first bouwen; Storybook dark mode toggle; QA per component | CC + Joost |
| **R-9** | Scope creep ("nog even dit toevoegen") | Hoog | Hoog | 🔴 | MASTERPLAN is frozen tot launch; nieuwe ideeën → backlog post-launch | Dries (discipline) |
| **R-10** | Bloffee blog niet klaar bij launch | Medium | Laag | 🟡 | LatestInsights sectie toont "Coming soon" of featured pillar pages | CC |
| **R-11** | Claude Code context/quality limieten | Medium | Medium | 🟡 | Dries + Joost review; skills laden voor context; kleine gerichte taken | CC + Dries |
| **R-12** | Joost minder beschikbaar dan aangenomen | Medium | Medium | 🟡 | Dries neemt QA-taken over; prioriteer NL+DE native review zelf | Dries |
| **R-13** | Juridische review DE vertraagd | Medium | Hoog | 🟠 | Impressum template vroeg klaarzetten (Sprint 3); standaard template is 80% correct | Joost |

### Top 3 risico's met actieplan:

**🔴 R-1: Vertalingen kosten meer tijd**
- Actie 1: CC begint vertalingen zodra EN content klaar is (geen wachten op sprint-grens)
- Actie 2: Vertalingen per pagina (niet per taal) — elke pagina in alle 6 talen tegelijk afronden
- Actie 3: UI strings al in Sprint 3 klaar (alle 6 talen) — voorsprong op page content
- Actie 4: Parallelliseer: terwijl Dries EN reviewed, vertaalt CC al eerder goedgekeurde pagina's
- Actie 5: Alle 6 talen bij launch. Geen uitzonderingen. Punt.

**🔴 R-3: Dries als bottleneck**
- Actie 1: Dries blokkeert elke dag 2 uur voor review (09:00-11:00)
- Actie 2: Review batches: max 5 pagina's tegelijk, 48 uur response time
- Actie 3: Joost doet eerste QA-pass; Dries krijgt alleen "klaar voor final review"
- Actie 4: "Silence = consent" regel na 48 uur (pagina gaat door tenzij Dries bezwaar maakt)

**🔴 R-9: Scope creep**
- Actie 1: MASTERPLAN is **bevroren** tot launch — geen nieuwe hoofdstukken
- Actie 2: Nieuwe ideeën gaan naar `BACKLOG-POST-LAUNCH.md`
- Actie 3: Elke scope-wijziging moet door Dries EN Joost goedgekeurd worden
- Actie 4: "Is dit blokkerend voor launch?" — zo nee, het gaat naar post-launch

---

## 7. Budget Overzicht

### 7.1 Tool Kosten (maandelijks, na launch)

| Tool | Kosten | Categorie | Nodig vanaf |
|---|---|---|---|
| **Railway** (Pro) | ~$20/mo | Hosting | Sprint 1 |
| **Plausible** (hosted) | €9/mo | Analytics | Sprint 4 |
| **Sentry** (free tier) | €0 | Error tracking | Sprint 1 |
| **BetterStack** (free tier) | €0 | Uptime | Sprint 1 |
| **Cloudinary** (free tier) | €0 | Images | Sprint 2 |
| **TransIP email** | ~€0/mo (bestaand) | Email (SMTP) | Sprint 2 |
| **Domein** (be-found.online) | ~€15/jaar | DNS | Bestaand |
| **Totaal tools** | **~€25-35/mo** | | |

### 7.2 Eenmalige / Externe Kosten

| Item | Geschatte kosten | Wanneer |
|---|---|---|
| Native speaker reviews (5 talen × ~€50-150) | €250-750 | Sprint 4 |
| Juridische review DE (Impressum + Datenschutz) | €200-500 | Sprint 4 |
| Juridische review NL (optioneel, post-launch) | €200-400 | Post-launch |
| Prolific survey (State of GEO, 100-200 respondenten) | €300-600 | Post-launch (Q2) |
| **Totaal eenmalig** | **€950-2.250** | |

### 7.3 Monitoring Tools (post-launch)

| Tool | Kosten | Categorie |
|---|---|---|
| **Ahrefs** (Lite) | ~$129/mo | SEO monitoring |
| **Otterly/Profound** | ~€50-100/mo | AI citation monitoring |
| **Totaal monitoring** | **~€180-230/mo** | |

---

## 8. Communicatie

| Kanaal | Doel | Frequentie | Wie |
|---|---|---|---|
| **Daily standup** (async: Slack/WhatsApp) | Blokkades + voortgang | Dagelijks 09:00 | Iedereen |
| **Sprint Review** (sync: call) | Demo + feedback | Elke 2 weken vrijdag | Dries + Joost |
| **Sprint Retro** (sync: call) | Wat ging goed/fout | Elke 2 weken vrijdag | Dries + Joost |
| **Ad hoc beslissingen** | Blokkerend punt | Wanneer nodig | Dries (max 4u response) |
| **MASTERPLAN updates** | Beslissingen vastleggen | Bij elke beslissing | CC documenting |

---

## 9. Post-Launch Roadmap (Week 11+)

Dit valt buiten scope van dit projectplan, maar de eerste 4 weken na launch:

| Week | Focus |
|---|---|
| **Week 11** | Bug fixes, performance monitoring, content freshness, missing vertaal-feedback verwerken |
| **Week 12** | Blog publicatie start (cited.be-found.online), LinkedIn thought leadership start |
| **Week 13-14** | Pillar page #3 planning (GEO vs SEO), cluster articles, newsletter sequence live |
| **Maand 2-3** | A/B testing, case studies, testimonials, volgende pillar pages |

---

## 10. Effort Samenvatting

| Sprint | CC (uren) | Dries (uren) | Joost (uren) | Totaal |
|---|---|---|---|---|
| **Sprint 1** (W1-2) | ~94 | ~3 | ~2 | ~99 |
| **Sprint 2** (W3-4) | ~150 | ~8 | ~3 | ~161 |
| **Sprint 3** (W5-6) | ~126 | ~12 | ~6 | ~144 |
| **Sprint 4** (W7-8) | ~209 | ~6 | ~14 | ~229 |
| **Sprint 5** (W9-10) | ~116 | ~8 | ~20 | ~144 |
| **TOTAAL** | **~695** | **~37** | **~45** | **~777** |

### Verdeling per persoon:

| Persoon | Totaal | Per week (10 weken) | Haalbaar? |
|---|---|---|---|
| **Claude Code** | ~695 uur | ~70 uur/week | ✅ Ja (AI, kan parallelliseren) |
| **Dries** | ~37 uur | ~4 uur/week | ✅ Ja (reviews + beslissingen) |
| **Joost** | ~45 uur | ~4,5 uur/week | ✅ Ja (mits beschikbaar) |

> **Kanttekening**: Dries' werkelijke betrokkenheid zal hoger zijn dan 37 uur — ad hoc vragen, Slack/WhatsApp communicatie, en dagelijkse standups zijn niet meegerekend. Reken op ~8-10 uur/week totaal.

---

## 11. Sprint 0 — Voorbereiding (vóór Week 1)

**Voordat Sprint 1 kan starten, moeten deze zaken geregeld zijn:**

| # | Taak | Eigenaar | Status |
|---|---|---|---|
| S0.1 | Joost beschikbaarheid + rol bevestigen | Dries + Joost | ✅ Done |
| S0.2 | Railway account + koppeling aan GitHub repo (`Dries1971/be-found.git`) | Dries | ⬜ |
| S0.3 | TransIP SMTP credentials klaarzetten | Dries | ⬜ |
| S0.4 | Sentry account aanmaken (free tier) | Dries | ⬜ |
| S0.5 | DNS-toegang valideren (registrar login) | Dries | ⬜ |
| S0.6 | Cloudinary account aanmaken (free tier) | Dries | ⬜ |
| S0.7 | Dit PROJECT-PLAN reviewen en goedkeuren | Dries | ✅ Done |
| S0.8 | MASTERPLAN freeze tot launch afspreken | Dries + Joost | ⬜ |
| S0.9 | Daily standup format + kanaal afspreken | Dries + Joost | ⬜ |
| S0.10 | Native speaker reviewers zoeken starten | Joost | ⬜ |

---

## Appendix A: Fase 6 Post-Launch Taken (uit MASTERPLAN H16)

Ongewijzigd overgenomen — zie MASTERPLAN H16 "Fase 6: Post-Launch (doorlopend)".

---

## Appendix B: Pre-Launch Checklist (uit MASTERPLAN Verificatie)

Ongewijzigd overgenomen — zie MASTERPLAN sectie "Verificatie > Pre-launch Checklist".

---

*Created by Dries de Gelder*
*Commissioned by Be-Found*
*In collaboration with Claude Code, OpenAI, Deepseek and Gemini*
