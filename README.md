# CarLynk Africa - Web Frontend

> "Linking Car Owners with Trusted Drivers."

The CarLynk web app is a Next.js PWA for connecting verified Ghanaian car owners with professional drivers. This repository contains the **frontend only**; backend services such as Node.js APIs, Supabase, Smile ID, Paystack/Hubtel, tracking, and admin systems are expected to be built separately.

---

## Quick Start

```bash
cd C:\Users\ASUS\Desktop\CARLYNX\carlynx-web
npm install
npm run dev
```

Open <https://carlynk-alpha.vercel.app/>.

### Demo Logins

- **Owner:** `owner@carlynx.com` / `owner123`
- **Driver:** `driver@carlynx.com` / `driver123`

These are frontend-only demo credentials in `app/auth/signin/page.tsx`. Backend authentication should replace this with real session, token, and role handling.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 App Router with Turbopack |
| Language | TypeScript |
| Styling | Tailwind v4 plus project CSS overrides |
| Icons | lucide-react, plus a few custom SVG icons |
| Offline/local storage | Dexie.js and browser storage helpers |
| PWA | `public/manifest.json` |
| Animations | CSS keyframes, IntersectionObserver, route-aware client components |

---

## Brand

| Token | Hex | Usage |
|-------|-----|-------|
| Navy | `#0d1b2e` | Primary brand background |
| Navy 2 | `#122844` | Hover / secondary navy panels |
| Navy Mid | `#152440` | Dark panels and quiz cards |
| Gold | `#e8c96a` | CTA, highlights, progress |
| Owner Teal | `#0f766e` | Owner role accents |
| Driver Blue | `#1d4ed8` | Driver/action accents |
| Trust Green | `#1B6B45` | Success/verified states |
| Danger Red | `#dc2626` | Warnings/fail states |
| Tint | `#eef3f8` | Light page background |
| Line | `#cfd6e3` | Borders |
| Muted | `#5b6575` | Secondary text |

Buttons, cards, inputs, modals, and badges intentionally use rounded corners. Earlier docs mention hard geometry, but the current UI direction uses polished rounded surfaces.

---

## Current Routes

```text
/
/about
/careers
/contacts
/customer-service
/book-appointment
/loader
/quiz
/theme
/subscriptions

/auth/signin
/auth/signup
/auth/driver-signup
/auth/select-role
/auth/signup-success

/owner/dashboard
/owner/add-vehicle
/owner/drivers
/owner/onboarding
/owner/performance

/driver/dashboard
/driver/vehicles
/driver/onboarding
/driver/medical
/driver/profile
/driver/earnings

/shared/kyc
/shared/contracts
/shared/payments
/shared/disputes
/shared/inspection
/shared/emergency
/shared/insurance-claims
/shared/maintenance
```

---

## Project Structure

```text
carlynx-web/
├─ app/
│  ├─ page.tsx                    # Landing page
│  ├─ layout.tsx                  # Root layout, loaders, theme provider
│  ├─ globals.css                 # Base CSS tokens and shared animation classes
│  ├─ themes.css                  # Theme skin overrides
│  ├─ loader/                     # Loader preview route
│  ├─ quiz/                       # Temporary onboarding quiz test route
│  ├─ theme/                      # Theme picker route
│  ├─ auth/                       # Sign in, owner signup, driver signup, role select
│  ├─ owner/                      # Owner dashboard and workflow screens
│  ├─ driver/                     # Driver dashboard and workflow screens
│  └─ shared/                     # Shared operational modules
├─ components/
│  ├─ ui/                         # Shared UI, loader, theme, nav helpers
│  ├─ driver/                     # Driver navigation and vehicle UI
│  └─ owner/                      # Owner navigation and vehicle UI
├─ lib/
│  ├─ blueprint.ts                # Blueprint data used by operational pages
│  ├─ db.ts                       # Dexie schema for demo/local data
│  ├─ onboardingQuizzes.json      # Extracted multilingual quiz data
│  ├─ session.ts                  # Demo session helpers
│  ├─ themes.ts                   # Theme registry and localStorage helpers
│  └─ utils.ts                    # Currency/date/status utilities
└─ public/
   ├─ manifest.json
   ├─ logo-blue.png / logo-white.png
   ├─ loader/                     # Split-logo loader images
   ├─ images/                     # Landing/auth/animation imagery
   └─ cars/                       # Vehicle placeholder image set
```

---

## Major Frontend Features

### Public Site

- Landing page with hero, side-view car/tire animation, role cards, trust section, app explore links, and CTA.
- About, careers, contacts, customer service, and book appointment pages.
- Public header with hamburger menu on smaller screens.

### Authentication Flow

- `/auth/signin` uses demo credentials for owner/driver role sessions.
- `/auth/signup` is owner signup.
- `/auth/driver-signup` is the driver signup flow.
- `/auth/select-role` routes users into owner or driver flow.
- Auth pages use form delivery animation with `topview.png`; the global loader preloads auth page assets first.

### Owner Flow

- Owner dashboard with metrics/trust score.
- Add vehicle flow with image upload previews.
- Drivers, performance, and owner onboarding screens.
- Owner nav includes a theme entry on desktop and mobile.

### Driver Flow

- Driver dashboard with metrics/trust score.
- Find-a-car browser with car image carousel and vehicle detail modal.
- Driver onboarding tracker includes training, medical, insurance, matching, and handover steps.
- Medical, earnings, profile, and vehicle pages.
- Driver nav includes a theme entry on desktop and mobile.

### Shared Operations

Implemented from the CarLynk Africa Operations Blueprint:

- Subscription plans for driver and owner tiers.
- 42-point inspection checklist.
- Emergency/SOS priorities and contacts.
- Insurance claims flow.
- Maintenance schedule and partner mechanic concept.
- Contracts and termination types.
- Weekly payment settlement and late-payment timeline.
- KYC and dispute screens.

---

## Loader System

### Global Loader

`components/ui/GlobalLoader.tsx` is mounted in `app/layout.tsx`.

Behavior:

- Shows on refresh/page load.
- Uses split-logo `inficir` animation from `public/loader/leftlogo.png` and `public/loader/rightlogo.png`.
- Waits for window `load`, preloads required assets, then fades out.
- Default minimum loader time is 2 seconds.
- Auth routes use a shorter 1-second minimum while still preloading route-specific assets.

Backend note: the loader is frontend-only. Backend route latency should still be handled with API loading states when real API calls are integrated.

### Loader Preview

`/loader` is a test route for the split-logo animation. It is not intended as a redirect route.

---

## Theme System

Theme support is implemented through:

- `app/theme/page.tsx` - theme picker UI.
- `lib/themes.ts` - available themes and localStorage helpers.
- `app/themes.css` - CSS remapping for theme skins.
- `components/ui/ThemeProvider.tsx` - applies saved `data-theme` to `<html>`.
- `components/ui/ThemeToast.tsx` - confirmation toast after theme selection.
- `components/ui/ThemeIcon.tsx` - theme icon in public/owner/driver navigation.

Current themes:

- Royal Default
- Golden Mist Gold
- Golden Mist Navy
- Slate Fleet
- Royal Operations
- Glass Morphic Blue
- Glass Morphic Gold
- Kente Night

Implementation detail:

- The project has many hardcoded Tailwind arbitrary colors like `bg-[#0d1b2e]`.
- `themes.css` remaps those classes under `html[data-theme="..."]` instead of rewriting every component.
- Saved theme key: `carlynk_theme` in `localStorage`.
- `/theme` intentionally renders in the default look while choosing themes.

Backend note: theme selection is currently local-only. If backend wants cross-device theme sync later, store the selected theme id per user and hydrate it before render or return it in the user profile payload.

---

## Quiz System

`/quiz` is a temporary test route for onboarding quiz UX. It can be deleted or integrated properly later.

Data source:

- `lib/onboardingQuizzes.json`
- Extracted from English, Twi, Ga, and Ewe onboarding quiz PDFs.

Current behavior:

- User first selects Driver or Car Owner.
- A 3-second loader animation plays before the quiz starts.
- User can switch language at any question without losing selected answers or score.
- Supported languages: English, Twi, Ga, Ewe.
- Correct answers glow green.
- Wrong answers turn red and shake.
- End screen shows score and prompts users scoring below 5 to rewatch training.
- Pass mark uses 80% of available questions.

Backend integration notes:

- The frontend currently scores locally using `correct_answer` in the JSON file.
- Production backend should own quiz completion records, attempts, timestamps, and pass/fail state.
- Backend should decide whether correct answers are sent to the client before submission. For stricter integrity, send questions/options only, accept submitted answers, then score server-side.
- Suggested stored fields: `userId`, `role`, `language`, `quizVersion`, `answers`, `score`, `passed`, `attemptNumber`, `startedAt`, `completedAt`.

---

## Image and Asset Conventions

### Vehicle Images

For real backend integration, approved car records should provide image URLs for:

- `front`
- `back`
- `sideleft`
- `sideright`

Recommended backend convention:

- Approved cars live in a folder named after the owner/vehicle id.
- Pending/unapproved uploads live separately until approved.
- Frontend should receive image URLs from the vehicle record and should not infer paths.

### Animation Assets

Current animation files live under `public/images` and `public/loader`:

- `sideview.png` - landing boundary car body.
- `tyre.png` - separate spinning wheel overlay.
- `topview.png` - auth form delivery car.
- `leftlogo.png` / `rightlogo.png` - loader halves.

---

## Frontend and Backend Boundaries

The backend is the source of truth. The frontend:

- Displays state.
- Collects user input.
- Shows progress, validation, status, and animations.
- Can cache UI data locally for UX.

The frontend must not be the final authority for:

- Authentication or role access.
- KYC/identity approval.
- Payment approval, escrow, or disbursement.
- Contract enforcement or termination decisions.
- Vehicle approval.
- Driver-owner matching approval.
- Quiz completion in production.
- Medical fitness status.
- Insurance claim approval.
- Emergency priority decisions.

---

## Backend Integration Checklist

### Auth and Users

- Replace demo login logic in `app/auth/signin/page.tsx`.
- Provide real login/register endpoints.
- Return user role: `owner`, `driver`, or future `admin`.
- Provide secure session/token storage strategy.
- Replace `lib/session.ts` demo browser session with backend-backed auth state.

### Owner APIs

- Owner profile and dashboard metrics.
- Vehicle listing creation and document/photo upload.
- Vehicle approval status.
- Driver applications for owner review.
- Owner subscription plan and billing status.

### Driver APIs

- Driver profile and verification status.
- Driver onboarding step state.
- Medical exam status and clinic scheduling.
- Vehicle marketplace/listing availability.
- Vehicle application and matching status.
- Earnings and weekly settlement data.

### Shared APIs

- KYC status and document upload.
- Contracts and signatures.
- Payments, escrow, and settlement timeline.
- Inspection checklists and photo evidence.
- Disputes and resolution status.
- Emergency/SOS event creation and response state.
- Insurance claims and evidence upload.
- Maintenance schedules and partner mechanic directory.

### Files and Uploads

- Use backend-signed upload URLs or a controlled upload API.
- Return final public/private asset URLs to the frontend.
- Keep pending uploads separate from approved vehicle images.
- Store metadata for image type, vehicle id, uploader, status, and timestamps.

---

## Data Notes

- `lib/blueprint.ts` contains many mock/static blueprint arrays used by operational pages.
- `lib/db.ts` defines Dexie local tables for demo/offline behavior.
- Backend should treat frontend mock data as placeholders only.
- Look for comments such as `Backend will provide real data` for integration points.

---

## Animations and Interactions

- Global loader: split-logo `inficir` animation.
- `/loader`: loader preview route.
- Auth pages: top-view car drags form into place.
- Landing page: side-view car peeks from the hero/Choose Your Path boundary with separate spinning tires.
- Scroll animations: `.fade-in-up`, `.fade-in`, `.scale-in` via `ScrollAnimations`.
- Click ripple: blue bubble via `RippleEffect`.
- Quiz transitions: slide/fade question motion, green correct glow, red wrong shake.
- Theme toast: navy/gold pill with subtle bubble animation.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local dev server at `localhost:3000` |
| `npm run build` | Production build validation |
| `npm start` | Run the built app |
| `npm run lint` | ESLint, if configured |

---

## Deployment Notes

- Main branch: `master`.
- Vercel should rebuild automatically after pushes to GitHub.
- `public/manifest.json` uses app name `CarLynk`.
- `.devserver.log` is ignored and should not be committed.

---

## License

© 2026 CarLynk Africa. All rights reserved.
