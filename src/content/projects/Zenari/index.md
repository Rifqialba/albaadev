---
title: "Zenari - Premium Matcha E-Commerce Platform"
summary: "A modern e-commerce platform for premium matcha products with multi-language support and CMS integration. Features minimalist design, product catalog, and seamless checkout experience."
date: "2026-01-15"
draft: false
tags:
  - Web Development
demoUrl: "private"
repoUrl: "private"
demoType: "website"
resultImage: "/images/projects/zenari/zenari-dashboard.png"
videoUrl: "https://www.tiktok.com/@alca.digihelp/video/7617293282602781972"
tools:
  - Astro 4.0
  - TailwindCSS
  - TypeScript
  - MDX
  - Cloudflare Pages
  - Content Collections
  - i18n (Astro i18n)
  - Framer Motion
techStack:
  - Astro
  - TailwindCSS
  - TypeScript
  - MDX
processSteps:
  - "Design system implementation with TailwindCSS and Figma design tokens"
  - "Multi-language support setup (EN, ID, JP) with dynamic routing"
  - "CMS integration using Astro content collections for product management"
  - "Product catalog with filtering, sorting, and search functionality"
  - "Checkout flow with cart management and order confirmation"
  - "Performance optimization with Astro islands architecture"
  - "Analytics integration for tracking user behavior"
features:
  - "Full i18n support with 3 languages (English, Indonesian, Japanese)"
  - "Fully responsive minimalist design"
  - "Dynamic product catalog managed via Markdown files"
  - "Advanced product filtering by category, price, and attributes"
  - "Shopping cart with persistent state"
  - "Real-time inventory management"
  - "Customizable product variants (matcha powder grades, accessories)"
  - "Blog section for matcha education and recipes"
  - "95+ Lighthouse score for performance"
  - "SEO-optimized with dynamic meta tags"
deployment:
  platform: "Cloudflare Pages"
  url: "https://zenari-matcha.com"
  status: "Production"
---

## Project Overview

Zenari is a modern e-commerce platform dedicated to premium matcha products. The project showcases a minimalist design approach while maintaining robust functionality for product discovery and purchase. Built with Astro for optimal performance and developer experience.

### Why Zenari?

The matcha market has seen significant growth, but many e-commerce platforms either lack modern design or are too complex for small businesses. Zenari bridges this gap by providing:

- **Simplicity**: Clean, uncluttered interface that puts products first
- **Flexibility**: CMS-driven product management without database complexity
- **Global Reach**: Built-in multi-language support for international customers
- **Performance**: Static-first approach with Astro for lightning-fast page loads

## Technical Architecture

### Frontend Stack

The project leverages Astro's innovative island architecture to deliver optimal performance:

```typescript
// Example of Astro component structure
src/
├── components/
│   ├── products/
│   │   ├── ProductCard.astro
│   │   ├── ProductFilter.astro
│   │   └── CartDrawer.astro
│   ├── layout/
│   │   ├── Header.astro
│   │   └── Footer.astro
│   └── i18n/
│       └── LanguageSelector.astro
├── content/
│   └── products/
│       ├── matcha-culinary-grade.md
│       ├── matcha-ceremonial-grade.md
│       └── matcha-accessories.md
├── pages/
│   ├── [lang]/
│   │   ├── index.astro
│   │   ├── products/
│   │   └── about.astro
│   └── api/
│       └── cart.ts
└── i18n/
    ├── en.json
    ├── id.json
    └── ja.json
```

## Challenges and Solutions

### Challenge 1: Multi-language SEO

**Solution**: Implemented dynamic sitemaps with hreflang tags for all language versions, ensuring proper indexing by search engines.

### Challenge 2: Cart State Management

**Solution**: Used localStorage with Zustand for persistent cart state across pages, syncing with URL parameters for shareable cart links.

### Challenge 3: Product Variants Complexity

**Solution**: Created a flexible variant system using JSON schema in frontmatter, allowing different attributes per product category.

## Conclusion

Zenari demonstrates how modern web technologies can create beautiful, performant, and functional e-commerce experiences. The combination of Astro's performance capabilities with thoughtful design creates a platform that serves both business needs and user experience equally well.

The project serves as a template for future e-commerce developments, showing how to balance complexity with simplicity, and performance with functionality.
