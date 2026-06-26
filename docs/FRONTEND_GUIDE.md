# CarLynk Africa — Frontend Developer Guide

> For the frontend developer (and any AI assisting them) working on either the **main site** or the **admin portal**.
> Read this before you touch any UI file.

---

## 1. What CarLynk Africa is

A Ghana-based digital mobility platform connecting **car owners** with **verified professional drivers**.

- Owner side: list a car, get matched with a vetted driver, track earnings, manage contracts.
- Driver side: browse owner cars, build a verified profile, log earnings, report issues.
- Behind both: the **admin portal** for the executive team (CEO, CTO, HR, Operations, Finance, Legal, etc.) — 16 distinct dashboards with role-based access.

Backend (Node.js + Supabase) is being built by a separate developer. Your job is the UI for both apps.

---

## 2. Two separate repos / projects

| App | Path | Repo | Branch | Hosted on |
|---|---|---|---|---|
| **Main website** (public, owner + driver) | `C:\Users\ASUS\Desktop\CARLYNX\carlynx-web` | `inventor40028/carlynx-web` | `master` | Vercel |
| **Admin portal** (internal, 16 exec roles) | `C:\Users\ASUS\Desktop\CARLYNX\carlynk-admin` | `inventor40028/carlynk-admin` | `dev` | Vercel |
| Backend (someone else) | TBD | TBD | TBD | TBD |

Don't merge the two frontend repos. They share a brand identity but have different audiences, layouts, navigation, theme rules, and access rules.

---

## 3. Tech stack (both repos)

- **Next.js 16** App Router + Turbopack
- **TypeScript**
- **Tailwind CSS v4** (with arbitrary color classes like `bg-[#0d1b2e]`)
- **lucide-react** for icons (NEVER emojis in UI per brand)
- **Poppins** (Google Fonts) — the official brand typeface
- **Dexie.js** (main site only) — placeholder offline DB; backend replaces it
- **next-pwa** (main site only) — Progressive Web App support

### Running locally
```
cd carlynx-web      && npm install && npm run dev          # → http://localhost:3000
cd carlynk-admin    && npm install && npm run dev          # → http://localhost:3001 (set port to avoid clash)
```

### Building
```
npm run build
```
Must compile clean before pushing.

---

## 4. Brand rules (non-negotiable)

Source of truth: `CarLynk Africa Brand Guide` PDF + `CARLYNK_THEME_OPTIONS.md`.

### Identity
- Correct name: **CarLynk Africa** (not "CARLYNX", not "Carlynk Ghana")
- Tagline: "Linking Car Owners with Trusted Drivers."
- Headquarters: Accra, Ghana
- Currency: **GHS** (Ghana Cedis), display as **GH₵**

### Logo
- `public/logo-white.png` — on navy or dark surfaces
- `public/logo-blue.png` — on white or light surfaces
- Never recolor, gradient, stretch, skew, or rotate the logo
- Minimum digital size: 120px

### Colour palette
| Token | Hex | Use |
|---|---|---|
| Deep Navy | `#0D1B2E` | Header, footer, hero, primary buttons |
| Navy Hover / Depth | `#122844` | Button hover, gradient depth |
| Royal Navy | `#1A3260` | Secondary panels, dashboard cards |
| Royal Blue / Driver Blue | `#1D4ED8` | Links, focus rings, driver action states |
| Light Gold | `#E8C96A` | CTA accents, active nav |
| Kente Gold | `#C8A84B` / `#D4940A` | Stronger gold, warmer surfaces |
| Off White | `#F7F8FA` / `#FAFAF7` | Backgrounds, light panels |
| Trust Green | `#1B6B45` | Verified, success, owner accents |
| Alert Red | `#C0392B` / `#DC2626` | Errors, danger |
| Body Ink | `#111827` | Main text |
| Muted | `#5B6575` / `#6B7280` | Secondary text |

Usage ratio: Navy 55% · Black 10% · Kente Gold 20% · Neutrals 15%.

### Typography
- **Poppins** for all body and headings.
- Bold (700/800/900) for display, hero, headings.
- 400 regular for body, 1.6 line-height.
- Uppercase + 0.1–0.2em tracking for tiny labels (badges, eyebrows).

### Hard geometry
Per brand guide: "no curves or rounded forms." The **logo** is geometric. Rounded corners on UI elements are okay where they aid usability (buttons, cards) but keep them modest. Don't make the brand feel "soft."

### Icons
- **lucide-react** only. No emojis. No clip-art. No social-brand trademarked icons from lucide — write custom inline SVG for Twitter/Facebook/Instagram/LinkedIn (already done in `components/ui/SocialIcons.tsx` on the main site).

---

## 5. Main site structure (`carlynx-web/`)

```
carlynx-web/
├── app/
│   ├── page.tsx                  ← Landing page
│   ├── about, careers, contacts, customer-service
│   ├── book-appointment
│   ├── auth/
│   │   ├── signin, signup, driver-signup, select-role, signup-success
│   ├── owner/                    ← Owner role pages
│   │   └── dashboard, onboarding, add-vehicle, drivers, performance
│   ├── driver/                   ← Driver role pages
│   │   └── dashboard, onboarding, medical, earnings, profile, vehicles
│   ├── shared/                   ← Shared role pages (contracts, kyc, payments, etc.)
│   ├── subscriptions
│   ├── quiz                      ← Onboarding quizzes
│   ├── theme                     ← Theme picker
│   └── loader                    ← Loader preview
├── components/ui/                ← Header, Footer, RoleNav, Card, Button, theme stuff, animations
├── lib/
│   ├── session.ts                ← localStorage session (placeholder)
│   ├── db.ts                     ← Dexie offline DB (placeholder)
│   ├── themes.ts                 ← Theme definitions (6 themes)
│   ├── blueprint.ts              ← Business rules (termination types, etc.)
│   └── company.ts                ← Static company info
└── public/
    ├── logo-white.png, logo-blue.png
    ├── images/                   ← Hero, owner, driver, trust imagery
    ├── loader/                   ← Loader SVG pieces
    └── manifest.json             ← PWA manifest
```

### The theme system (main site only)
- 6 themes: Royal Default, Golden Mist (Gold/Navy variants), Slate Fleet, Glass Morphic (Blue/Gold variants), Kente Night.
- Stored in `localStorage['carlynk_theme']`. Selected on `/theme`. Applied via `html[data-theme="..."]` + `app/themes.css` overrides.
- The `/theme` page itself stays in the default look (forced by `ThemeProvider`) so users can preview cleanly.

### The admin portal has its OWN theme system
The admin portal also has a theme toggle, but it's separate: stored as `localStorage['carlynk_admin_theme']` and applied via `html[data-admin-theme="..."]`. Currently supports Royal Default + Kente Night.

Do not try to share the theme state between the two apps — they're different repos and different localStorage keys.

---

## 6. Admin portal structure (`carlynk-admin/`)

```
carlynk-admin/
├── app/
│   ├── page.tsx                  ← Sign-in (only entry — no self-registration)
│   └── admin/
│       ├── layout.tsx            ← Shared layout + auth guard
│       └── <role>/page.tsx       ← 16 role dashboards
├── components/
│   ├── AdminNav.tsx              ← Top bar
│   ├── ui.tsx                    ← Card, StatCard, Badge, Button, DataTable
│   ├── AdminThemeProvider.tsx
│   ├── AdminThemeToggle.tsx
│   └── useAdminSession.ts
├── lib/
│   └── session.ts                ← Demo accounts + role map
└── BACKEND_NOTES.md              ← Backend endpoint spec
```

### The 16 roles
Defined in `carlynk-admin/lib/session.ts` as `DEMO_ACCOUNTS`:
CEO, CTO, HR Manager, Customer Service Lead, Marketing Lead, PR & Comms Lead, Secretary & PA, Operations Manager, Senior Engineer, Cyber Security Analyst, Fleet Manager, Finance Manager, Legal Officer, Logistics Manager, Branding Lead, Corporate Affairs.

### RBAC rule
Only the **CEO** (Super Administrator) can create new admin accounts. Every other role has scope-limited access — never expose CEO-level controls to other roles. See `instructions/AdminCarlynk.md` for full role boundaries.

---

## 7. Communicating with backend (when you wire it)

The backend is on Node.js + Supabase. Endpoints are documented in:
- `carlynx-web/BACKEND_NOTES.md` (main site endpoints)
- `carlynk-admin/BACKEND_NOTES.md` (admin endpoints)

When you wire a form:
1. Replace the placeholder Dexie/localStorage call with `fetch(NEXT_PUBLIC_API_BASE_URL + '/api/...', { ... })`.
2. Add `// TODO backend: GET /api/...` comment **above** the call so it's traceable.
3. Keep the existing UI/animation/state logic — only swap the data source.

### Auth flow
- `lib/session.ts` exposes `getSession`, `setSession`, `clearSession`.
- Backend will return `{ token, session }` from `/api/auth/login`; call `setSession(session)`. The frontend doesn't need to handle the JWT itself — it goes in an `httpOnly` cookie.

### Currency rule
Always format money as `GH₵ 1,234` (with the cedi symbol). Never USD/EUR.

---

## 8. UI patterns you should follow

### Layout
- Wrap pages in `<Header />` + `<main>` + `<Footer />` (main site) or `<AdminNav />` + `<main>` + footer (admin).
- Max width: `max-w-7xl mx-auto px-6` for content; `max-w-screen-2xl` for dashboards.
- Padding: `py-8` or `py-12` for sections.

### Cards & buttons
- Main site: use `components/ui/Card.tsx` and `Button.tsx`.
- Admin: use `components/ui.tsx` (`Card`, `StatCard`, `Button`, `Badge`, `DataTable`).
- Border-color via `borderColor` prop (e.g. owner pages use `#0f766e`, driver pages use `#1d4ed8`).

### Forms
- Use the `Input` component on the main site.
- All required fields must have the `required` attribute.
- Show inline errors using the red palette.

### Animations
- Use the existing `fade-in-up` / `scale-in` / `fade-in` classes — the `ScrollAnimations` component handles `.visible` toggling.
- Don't add new animation libraries; CSS keyframes are enough.

### Responsiveness
- Hamburger menu below `xl` breakpoint (1280px). Inline nav above.
- Logo always visible; everything else collapses to the hamburger panel on mobile.

### Accessibility
- Respect `prefers-reduced-motion` in custom animations (see `CarDriveStrip`, `FormDeliveryFrame`).
- Provide `aria-label` for icon-only buttons.

---

## 9. Animations / decorative components (don't break these)

The main site has several signature animations — don't accidentally rip them out:

- `components/ui/GlobalLoader.tsx` — 2-second loader on every nav (uses `public/loader/leftlogo.png` + `rightlogo.png`).
- `components/ui/CarDriveStrip.tsx` — side-view car drives in between hero and "Choose Your Path".
- `components/ui/FormDeliveryFrame.tsx` — top-view car drags forms onto auth pages.
- `components/ui/RippleEffect.tsx` — blue ripple on click.
- `components/ui/ScrollAnimations.tsx` — adds `.visible` class on scroll-in.

If any of these break (e.g. missing image, wrong animation duration), check the comment at the top of the file for the original spec.

---

## 10. What NOT to do

- ❌ Don't add **emojis** to UI. Use lucide-react icons or custom SVG.
- ❌ Don't break **brand colors** by introducing off-palette tints. If a theme variant needs a tweak, edit `app/themes.css` — don't hardcode new hex values into components.
- ❌ Don't add **self-registration to the admin portal**. Admin accounts are CEO-created only.
- ❌ Don't store sensitive data in `localStorage` (only the demo session, which the backend will replace).
- ❌ Don't merge the two repos.
- ❌ Don't change the **logo files**. If a redesign happens, replace `public/logo-white.png` / `public/logo-blue.png` only.
- ❌ Don't make the cedi symbol "GHS" or "₵" inline — use **`GH₵`**.
- ❌ Don't commit `node_modules`, `.next`, or `.devserver.log` / `.adminserver.log`.

---

## 11. Where to look first

For any new feature:

1. **PDFs**: `C:\Users\ASUS\Desktop\CARLYNX\instructions\*.pdf` — read the relevant brand / blueprint / quiz / admin guide.
2. **Compiled reference**: `CARLYNK_MASTER_REFERENCE.md` (root) — single-page summary of all PDFs.
3. **This file**: `instructions/FRONTEND_GUIDE.md` — patterns, rules, gotchas.
4. **Backend specs**: `carlynx-web/BACKEND_NOTES.md` (main site) and `carlynk-admin/BACKEND_NOTES.md` (admin portal).
5. **Theme rules**: `instructions/CARLYNK_THEME_OPTIONS.md`.
6. **Admin RBAC**: `instructions/AdminCarlynk.md`.

---

## 12. Quick reference — common file paths

```
Main site code:           C:\Users\ASUS\Desktop\CARLYNX\carlynx-web\
Admin portal code:        C:\Users\ASUS\Desktop\CARLYNX\carlynk-admin\
Source PDFs & MDs:        C:\Users\ASUS\Desktop\CARLYNX\instructions\
Brand assets (original):  C:\Users\ASUS\Desktop\CARLYNX\assets\
This guide:               C:\Users\ASUS\Desktop\CARLYNX\instructions\FRONTEND_GUIDE.md
```

---

## 13. Final reminder for the AI

When the user asks you to "do X to the website":
- Confirm whether they mean the **main site** or the **admin portal** if it's ambiguous.
- Read this file plus the relevant `BACKEND_NOTES.md` before making changes that touch data/auth.
- Don't invent backend endpoints — document them as `// TODO backend: ...` and add them to the backend notes file.
- Never break the brand identity (navy + gold + Royal Blue must always be visible).
- Run `npm run build` before claiming work is done.
- Don't push to git unless the user explicitly asks.
