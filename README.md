# CarLynk Africa — Web Frontend

> "Linking Car Owners with Trusted Drivers."

The CarLynk web app — a Next.js PWA for connecting verified Ghanaian car owners with professional drivers. This repo contains the **frontend only**; the backend (Node.js + Supabase + Smile ID + Paystack) is built separately.

---

## Quick Start

```bash
cd C:\Users\ASUS\Desktop\CARLYNX\carlynx-web
npm install
npm run dev
```

Open <http://localhost:3000>.

### Demo logins
- **Owner:** `owner@carlynx.com` / `owner123`
- **Driver:** `driver@carlynx.com` / `driver123`

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind v4 |
| Icons | lucide-react (no emojis anywhere) |
| Offline | Dexie.js (IndexedDB wrapper) |
| Animations | IntersectionObserver-driven CSS classes |

---

## Brand

| Token | Hex |
|-------|-----|
| Navy (primary) | `#0d1b2e` |
| Gold (accent) | `#e8c96a` |
| Owner Teal | `#0f766e` |
| Driver Blue | `#1d4ed8` |
| Privacy Purple | `#4c1d95` |
| Trust Green | `#1B6B45` |
| Danger Red | `#dc2626` |
| Page background | `#eef3f8` |

Buttons / cards / inputs use intentional rounded corners (12–16px). Status badges use full-pill rounding.

---

## Project Structure

```
carlynx-web/
├─ app/
│  ├─ page.tsx                    # Landing
│  ├─ auth/
│  │  ├─ signin/                  # Sign in (demo logins)
│  │  ├─ signup/                  # Owner signup
│  │  ├─ driver-signup/           # 3-step driver signup
│  │  ├─ select-role/             # Role chooser
│  │  └─ signup-success/          # Success page
│  ├─ subscriptions/              # ★ Driver + Owner plans
│  ├─ driver/
│  │  ├─ dashboard/               # Stats + trust score + quick links
│  │  ├─ vehicles/                # ★ Find a Car (image cards + detail popup)
│  │  ├─ onboarding/              # ★ 8-step tracker (incl. medical 2.5)
│  │  ├─ medical/                 # ★ Medical exam (9 tests + fitness)
│  │  ├─ profile/
│  │  └─ earnings/
│  ├─ owner/
│  │  ├─ dashboard/               # Stats + trust score + quick links
│  │  ├─ onboarding/              # ★ 6-step tracker
│  │  ├─ add-vehicle/             # Vehicle listing form
│  │  ├─ drivers/
│  │  └─ performance/
│  └─ shared/
│     ├─ inspection/              # ★ 42-point interactive checklist
│     ├─ emergency/               # ★ SOS + priorities + contacts
│     ├─ insurance-claims/        # ★ 6-step claims process
│     ├─ maintenance/             # ★ Service schedule + partner mechanics
│     ├─ contracts/               # ★ Active + termination types + process
│     ├─ payments/                # ★ Weekly settlement + late timeline
│     ├─ kyc/
│     └─ disputes/
├─ components/
│  ├─ ui/                         # Button, Card, Input, StatusBadge, Header, Footer, ImageUpload, RippleEffect, ScrollAnimations
│  ├─ driver/                     # DriverNav, CarImageCarousel, VehicleDetailModal
│  └─ owner/                      # OwnerNav
├─ lib/
│  ├─ blueprint.ts                # ★ Central data source (all blueprint tables)
│  ├─ db.ts                       # Dexie schema (users/vehicles/contracts/earnings)
│  └─ utils.ts                    # formatCurrency, formatDate, status colors
└─ public/
   ├─ logo-blue.png / logo-white.png
   └─ cars/                       # front, back, sideleft, sideright (placeholders)
```

★ = added in the Blueprint update.

---

## Blueprint Features

Implemented from the **CarLynk Africa Operations Blueprint v1.2 (July 2025):**

- **Subscription Plans** — driver (Bronze → Diamond) and owner (Silver → Commercial), monthly/yearly toggle.
- **Driver Onboarding** — 8 steps including Medical Exam (Step 2.5) with `current/done/todo` states.
- **Owner Onboarding** — 6 steps.
- **Medical Examination** — 9 tests with priority pills, fitness categories, schedule.
- **42-Point Inspection** — interactive checklist, live progress bar, reject criteria, sign-off.
- **Emergency SOS** — red SOS button, 4 priority levels (P1–P4), P1 protocol, emergency contacts.
- **Insurance Claims** — claim types + 6-step process.
- **Maintenance** — service schedule + partner mechanics (10% referral model).
- **Contracts** — active contract + termination types/notice + 7-step process + penalties.
- **Payments** — weekly settlement breakdown, late payment escalation (D5/D7 in red), escrow note.
- **Trust Score** — on driver (92/100) and owner (95/100) dashboards.

### Find a Car (Driver)

The driver's vehicle browser is the centerpiece UX:

- **List view:** each card shows the **front view** only (1:1 square), transmission, fuel, location, monthly price, and a "View Details" button.
- **Detail popup:** all four car views (front / back / left / right) in a swipeable carousel with **dot indicators per view**, full specs (transmission auto/manual, fuel, seats, mileage), partnership rates, **reported damages**, **known problems**, and a "Request Partnership" button at the bottom.

**Image conventions (for the backend team):**
- All approved cars live under their own folder named after the owner+car and contain `front.png`, `back.png`, `sideleft.png`, `sideright.png`.
- Unapproved cars stay in a `pending/` folder.
- The frontend reads the 4 view URLs from each vehicle record — generic placeholders live in `public/cars/`.

---

## Adding a Vehicle (Owner)

`/owner/add-vehicle` collects vehicle metadata + four photo uploads (front, side, back, interior) via the `ImageUpload` component with image preview and remove-and-reupload support.

---

## Animations & Interactions

- **Ripple click effect:** a blue (`#1d4ed8`) bubble appears at every click via `components/ui/RippleEffect.tsx` (mounted in the root layout).
- **Scroll animations:** any element with `.fade-in-up`, `.fade-in`, or `.scale-in` animates in when it enters the viewport. The observer **resets on every route change** (`usePathname` in `ScrollAnimations.tsx`) so animations work after client navigation, not only on hard refresh.
- **Custom scrollbar:** blue thumb on a white track.

---

## Frontend Boundaries

The backend is the source of truth. The frontend:

- ✅ Displays data, collects input, shows status.
- ❌ Never decides payment approval, KYC verification, contract enforcement, or access rights.

Look for `// Backend will provide real data` comments next to mock arrays — those are the integration points.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) at `localhost:3000` |
| `npm run build` | Production build |
| `npm start` | Run the built app |
| `npm run lint` | ESLint |

---

## License

© 2026 CarLynk Africa. All rights reserved.
