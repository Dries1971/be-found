# Claude Project Configuration

> **Dit bestand wordt ALTIJD eerst gelezen door Claude**

## Taalregels / Language Rules

| Context | Taal |
|---------|------|
| **Communicatie met gebruiker** | Nederlands |
| **Code & comments** | English |
| **Commit messages** | English |
| **Documentatie** | English |
| **Variabele namen** | English |
| **UI teksten voor NL markt** | Nederlands |

## Project Overview

**be-found.online** is the authority hub for GEO (Generative Engine Optimization) & AI visibility.
Parent brand for Bloffee.com (AI blog automation) and geo-score.online (GEO analysis tool).

## Skills Locatie

Alle skills bevinden zich in: `.claude/skills/`

### Skill Categorieën

```
.claude/skills/
├── 00-project-conventions/    # Altijd eerst laden
├── frontend/                  # Next.js, React, Tailwind
├── seo/                       # SEO, Schema.org, GEO, Lighthouse
├── content/                   # Blog systeem, MDX, i18n
├── backend/                   # API routes, email (TransIP SMTP)
├── testing/                   # Vitest, Playwright
└── devops/                    # Railway, CI/CD
```

## Project Stack

Zie `.claude/STACK.md` voor de volledige stack met versies.

## Workflow

1. **Start** -> Lees CLAUDE.md + STACK.md
2. **Taak ontvangen** -> Todo planning
3. **Uitvoeren** -> Relevante skills laden
4. **Voltooien** -> Verificatie
5. **Documenteren** -> Stack.md updaten indien nodig

## KRITIEKE REGEL: Nieuw Onderdeel Starten

> **STOP! Voordat je ook maar één regel code schrijft voor een nieuw onderdeel:**

Wanneer we aan een **nieuw hoofdstuk/onderdeel** uit het MASTERPLAN beginnen, is dit de VERPLICHTE volgorde:

1. **Onderzoeken** — Lees het relevante hoofdstuk uit `MASTERPLAN.md`. Onderzoek best practices, concurrenten, en alternatieven. Gebruik web search waar nodig.
2. **Bekritiseren** — Wat klopt er niet? Wat mist er? Wat kan beter? Stel kritische vragen aan de gebruiker.
3. **Beslissingen vastleggen** — Alle keuzes expliciet bespreken en vastleggen in `MASTERPLAN.md` onder "Genomen Beslissingen".
4. **Optimaliseren** — Het plan aanscherpen op basis van de discussie. Open punten sluiten.
5. **Skills inventariseren** — Welke `.claude/skills/` zijn nodig? Bestaan ze al of moeten ze aangemaakt worden?
6. **Pas dan: bouwen** — Alleen na goedkeuring van de gebruiker beginnen met implementatie.

**Dit is niet optioneel.** Begin NOOIT direct met coderen bij een nieuw onderdeel. De discussiefase levert betere beslissingen op en voorkomt dat we werk dubbel doen.

## KRITIEKE REGEL: Commits & Documentatie

> **Geen commit zonder documentatie. Geen afwijking zonder discussie.**

### Voor elke commit/push:
1. **Documenteer EERST** — Voordat je commit, zorg dat alle gemaakte keuzes vastgelegd zijn in `MASTERPLAN.md`:
   - Wat is er besloten en waarom
   - Hoe zijn we tot deze beslissing gekomen
   - Welke alternatieven zijn overwogen en afgewezen
2. **Update "Genomen Beslissingen"** — Nieuwe beslissingen toevoegen aan de tabel in MASTERPLAN.md
3. **Update STACK.md** — Als er technologie-keuzes zijn gemaakt of versies zijn veranderd
4. **Pas dan: committen** — Met duidelijke commit message die de wijzigingen beschrijft

### Bij afwijking van het MASTERPLAN:
1. **STOP** — Wijk NOOIT stilzwijgend af van een vastgelegde beslissing
2. **Meld de afwijking** — Leg aan de gebruiker uit wat je wilt veranderen en waarom
3. **Discussie voeren** — Bespreek de voor- en nadelen van de afwijking
4. **Pas na akkoord** — Documenteer de nieuwe beslissing in MASTERPLAN.md met:
   - De oorspronkelijke beslissing
   - Waarom we afwijken
   - De nieuwe beslissing
   - Datum van wijziging

**Doel**: Het MASTERPLAN is de single source of truth. Het moet altijd actueel zijn en de werkelijke staat van het project weerspiegelen.

## Belangrijke Afspraken

- **Mobile-first design** (responsive for all devices)
- **Internationale markt** (EN primary, NL, DE, FR, ES, PT — alle 6 bij launch)
- **TypeScript strict mode** altijd
- **Lighthouse score 95+** vereist
- **GEO-Score 80+** op kernpagina's vereist
- **WCAG 2.1 AA** accessibility
- **Railway** voor deployment
- **Plausible** voor analytics (privacy-first)
- **Clean & minimalistisch design** (Backlinko/Ahrefs inspired)

## Credits (ALTIJD gebruiken bij commits en creaties)

Bij ELKE commit message en bij ELKE creatie moet deze credit footer worden toegevoegd:

```
Created by Dries de Gelder
Commissioned by Be-Found
In collaboration with Claude Code, OpenAI, Deepseek and Gemini
```
