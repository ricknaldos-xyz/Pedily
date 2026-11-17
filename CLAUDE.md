# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Pedily Landing is the marketing website for Pedily, a B2B SaaS product for order management ("pedidos" in Spanish). The landing page showcases the product with a hero section, benefits grid, product screenshots, feature showcase, integration logos, how-it-works flow, pricing table, ROI calculator, case studies, testimonials, comparison table, FAQ, and a final CTA. It also includes a contact page, pricing page, documentation, and legal pages (privacy policy, terms of service).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** CSS (sin librerías; `prefers-reduced-motion` las apaga)
- **Icons:** Lucide React
- **Capturas reales:** `scripts/copiar-capturas.sh` (LV2-C → `public/capturas`, `public/clips`) y `scripts/copiar-capturas-integraciones.sh` (fichas J → `public/capturas/integraciones`), registro en `src/lib/capturas.ts`
- **Marca (og-image, favicon, iconos):** `scripts/generar-marca.cjs` (Playwright de otro repo, ver cabecera)
- **Utilities:** clsx
- **Package Manager:** pnpm

## Commands

### Development

```bash
pnpm dev       # Start dev server
pnpm build     # Build for production
pnpm start     # Start production server
```

### Code Quality

```bash
pnpm lint      # Run Next.js linting
```

## Architecture

```
src/
  app/
    contacto/      # Contact page
    docs/          # Documentation page (Markdown rendered)
    legal/
      privacidad/  # Privacy policy
      terminos/    # Terms of service
    precios/       # Pricing page
    not-found.tsx  # Custom 404 page
    page.tsx       # Landing page (home)
    layout.tsx     # Root layout
    globals.css    # Global styles
  components/
    layout/        # Layout components (Header, Footer, Container, Section, LayoutWrapper)
    sections/      # Landing page section components
      Hero.tsx
      BenefitsGrid.tsx
      ProductScreenshots.tsx
      FeatureShowcase.tsx
      PricingTable.tsx
      ROICalculator.tsx
      CaseStudy.tsx
      Testimonials.tsx
      ComparisonTable.tsx
      FAQ.tsx
      FinalCTA.tsx
      HowItWorks.tsx
      IntegrationLogos.tsx
      LogoBar.tsx
    seo/           # SEO components (JSON-LD structured data)
    ui/            # Base UI primitives
docs/              # Documentation content
```

- Section-based landing page architecture with individual components per section
- SEO optimized with JSON-LD structured data components
- Spanish-language content (target market: Latin America)
- Documentation pages rendered from Markdown with syntax highlighting

## Git Workflow

- NEVER push directly to `main`. Always create a feature branch.
- Branch naming: `feat/<description>`, `fix/<description>`, `chore/<description>`
- After work is complete, create a PR using `gh pr create`
- Commit messages follow conventional commits: feat, fix, chore, docs, refactor

## Deployment

- Deployed on **Vercel**
