# Spezialleuchten.ch static prototype

## Implementation notes
- HTML/CSS-first, framework-free prototype with progressive enhancement.
- Shared design tokens and layered styles in `styles/`.
- Minimal JavaScript in `assets/main.js` for quote wizard steps and product filtering.
- Placeholder assets are included for structure and linking.
- In environments without binary support, image placeholders are provided as SVG and datasheets as HTML placeholders.
- Provisional font stack uses system sans-serif; verify against live site before production.

## Accessibility checklist
- [x] Skip link on all pages
- [x] Semantic landmarks (`header`, `main`, `nav`, `footer`)
- [x] Hierarchical headings (`h1` per page + section headings)
- [x] Visible focus style with `:focus-visible`
- [x] Keyboard-usable wizard controls
- [x] Form labels bound to inputs
- [x] Error messaging slots tied via `aria-describedby`
- [x] Minimum tap target sizing (~44px on controls)

## Performance checklist
- [x] LCP hero image is not lazy loaded and uses `fetchpriority="high"`
- [x] Width/height specified for key images
- [x] Lazy loading only for offscreen/product images
- [x] Responsive image attributes (`srcset`/`sizes`) included in key areas
- [x] CSS split into reusable layers and kept lightweight
- [x] Minimal JS only where needed

## SEO checklist
- [x] Unique page `<title>` and meta descriptions
- [x] Canonical links
- [x] `hreflang` placeholders for DE/FR/EN
- [x] Robots meta
- [x] JSON-LD Organization (home), BreadcrumbList (listing/detail), Product (detail)

## Verification steps for provisional colors and fonts
1. Compare `--c-brand-500`, `--c-ink-900`, and supporting neutrals to the live website using Eyedropper and/or exported CSS variables.
2. Replace provisional token values in `styles/tokens.css` with validated brand values.
3. Confirm actual typeface(s) from live site CSS/network font files.
4. Update `--font-sans` token and validate rendering across breakpoints.

## Structure
- `/index.html`
- `/produkte/index.html`
- `/produkte/seezeichen/m550/index.html`
- `/kontakt/index.html`
- `/angebot/index.html`
- `/styles/{tokens,base,components,pages}.css`
- `/data/products.example.json`
- `/assets/...`
