# CarLynk Africa Main Site — Backend Integration Notes

> For the backend developer (and any AI assisting them).
> Main site frontend: `C:\Users\ASUS\Desktop\CARLYNX\carlynx-web`
> Admin portal frontend (separate repo): `C:\Users\ASUS\Desktop\CARLYNX\carlynk-admin` — see its own `BACKEND_NOTES.md`.
>
> The main site is the **public-facing app** that owners and drivers use.
> The admin portal is the **internal executive tool** for the 16 staff roles.
> Both must hit the **same backend** and share the **same data sources** (users, vehicles, contracts, payments, KYC, audit log).

---

## 1. Architecture overview

- **Frontend (this repo)**: Next.js 16 App Router + TypeScript + Tailwind v4. PWA enabled via `next-pwa`.
- **Local storage today**: Dexie.js (`lib/db.ts`) — placeholder offline DB. Real persistence is the backend's job.
- **Session today**: `lib/session.ts` stores `{ role, name, email }` in `localStorage` under key `carlynk_session`. Roles: `'owner' | 'driver' | 'admin'`.
- **Backend stack (agreed)**: Node.js + Supabase. Auth via Smile ID for KYC, payments via Paystack.
- **Hosting**: Main site on Vercel (`inventor40028/carlynx-web`, branch `master`). Admin on Vercel (`inventor40028/carlynk-admin`, branch `dev`). Backend will live on its own subdomain.

### Required subdomains (suggested)
| Service | Subdomain |
|---|---|
| Main site | `carlynk.com`, `www.carlynk.com` |
| Admin portal | `admin.carlynk.com` |
| Backend API | `api.carlynk.com` |
| Webhooks (Paystack, Smile ID) | `webhooks.carlynk.com` or `api.carlynk.com/webhooks/...` |

---

## 2. The link between Main Site ↔ Admin Portal

Treat both as **two faces of one system**, sharing the same database.

| User-facing concept (main site) | Admin module that manages it |
|---|---|
| Owner / driver signup, KYC | HR + Operations + Customer Service review queues |
| Vehicle listing & approval | Fleet Manager registry + Operations approval |
| Partnership contract (driver–owner) | Legal Officer contracts table + Operations partnerships |
| Driver/Owner dashboards | Operations Manager partnerships + Fleet maintenance |
| Earnings reports | Finance Manager transaction list |
| Payments / subscriptions | Finance Manager — Paystack webhook funnel |
| Disputes & insurance claims | Legal Officer disputes + Operations incident reports |
| Maintenance records | Fleet Manager maintenance schedule |
| Support tickets / "Customer Service" page | Customer Service Lead ticket queue |
| Trust score | Cross-cutting — computed server-side from KYC, contracts, incidents, payments |

Whenever an owner/driver does something in the main site, the corresponding admin dashboard must reflect it. The reverse is also true — when an admin approves a KYC or terminates a contract, the user sees it on their dashboard.

**Single source of truth:** the backend. Both frontends are read/write clients.

---

## 3. Public site route map (what each page needs from backend)

| Route | Audience | Backend endpoints needed |
|---|---|---|
| `/` | Public | `GET /api/landing/stats` (optional — driver/owner counts) |
| `/about`, `/careers`, `/contacts`, `/customer-service` | Public | Static. CMS optional later. |
| `/book-appointment` | Public | `POST /api/appointments` (lead-capture form) |
| `/auth/signin` | Public | `POST /api/auth/login` |
| `/auth/select-role` | Public | none (UI-only) |
| `/auth/signup` | Owner signup | `POST /api/auth/signup/owner` |
| `/auth/driver-signup` | Driver signup | `POST /api/auth/signup/driver` |
| `/auth/signup-success` | Both | none |
| `/owner/dashboard` | Owner | `GET /api/owner/dashboard` |
| `/owner/onboarding` | Owner | `GET /api/owner/onboarding`, `POST /api/owner/onboarding/step/:n` |
| `/owner/add-vehicle` | Owner | `POST /api/owner/vehicles` (multipart for photos) |
| `/owner/drivers` | Owner | `GET /api/owner/drivers` (browse driver marketplace) |
| `/owner/performance` | Owner | `GET /api/owner/performance` |
| `/driver/dashboard` | Driver | `GET /api/driver/dashboard` |
| `/driver/vehicles` | Driver | `GET /api/driver/vehicles?available=true` |
| `/driver/onboarding` | Driver | `GET /api/driver/onboarding`, `POST /api/driver/onboarding/step/:n` |
| `/driver/medical` | Driver | `GET /api/driver/medical`, `POST /api/driver/medical/upload` |
| `/driver/earnings` | Driver | `GET /api/driver/earnings?period=week\|month` |
| `/driver/profile` | Driver | `GET /api/driver/profile`, `PUT /api/driver/profile` |
| `/shared/contracts` | Both | `GET /api/contracts/me`, `POST /api/contracts/:id/terminate` |
| `/shared/payments` | Both | `GET /api/payments/me?period=...` |
| `/shared/kyc` | Both | `GET /api/kyc/status`, `POST /api/kyc/start` (Smile ID flow) |
| `/shared/inspection` | Both | `GET /api/inspections/me`, `POST /api/inspections/:id/respond` |
| `/shared/maintenance` | Both | `GET /api/maintenance/me`, `POST /api/maintenance/report` |
| `/shared/disputes` | Both | `GET /api/disputes/me`, `POST /api/disputes` |
| `/shared/emergency` | Both | `POST /api/emergency/alert` (panic button) |
| `/shared/insurance-claims` | Both | `GET /api/insurance/claims`, `POST /api/insurance/claims` |
| `/subscriptions` | Both | `GET /api/subscriptions/plans`, `POST /api/subscriptions/subscribe` |
| `/quiz` | Both | `GET /api/onboarding/quiz?role=...`, `POST /api/onboarding/quiz/submit` |
| `/theme` | Public | none (theme stored in `localStorage` only — see §10) |
| `/loader` | Internal preview | none |

---

## 4. Authentication

### Current frontend behavior
`lib/session.ts` exposes:
```ts
getSession(): Session | null
setSession(s: Session): void
clearSession(): void
type Session = { role: 'owner'|'driver'|'admin'; name: string; email: string }
```
It stores the session in `localStorage` under `'carlynk_session'` and dispatches a `'carlynk-session-change'` window event so React components re-render.

### What backend must replace
Replace the demo `setSession` call with a real flow:

**`POST /api/auth/login`**
- Body: `{ email, password }`
- Returns: `{ token: string (JWT), session: { role, name, email, userId, kycStatus, trustScore } }`
- Set token in `httpOnly` cookie + return same shape so the frontend's `setSession()` works unchanged.

**`POST /api/auth/signup/owner`** and **`POST /api/auth/signup/driver`**
- Body matches the signup form fields (see `app/auth/signup/page.tsx` and `app/auth/driver-signup/page.tsx`).
- Returns: `{ token, session }`. The frontend then redirects to onboarding.

**`POST /api/auth/logout`**
- Invalidate the JWT server-side. Frontend already calls `clearSession()`.

**`GET /api/auth/me`**
- Verify JWT, return current session. Called by the frontend's session hook on page load.

### Demo credentials in code today
Inside the signin page (`app/auth/signin/page.tsx`) and select-role page, there are visible demo accounts:
- Owner: `owner@carlynx.com` / `owner123`
- Driver: `driver@carlynx.com` / `driver123`

These are placeholder UI text — remove them in production. Real accounts are created via signup.

### Important: account creation policy
- **Owners and Drivers**: can self-register via the public signup pages.
- **Admin staff (16 roles)**: cannot self-register. Only the CEO/Super Administrator creates them via the admin portal. See admin portal's `BACKEND_NOTES.md` for the RBAC rules.

---

## 5. Data models (suggested Supabase schema)

The frontend already defines its **expected shapes** in `lib/db.ts` (Dexie placeholder). Mirror these in Supabase:

```ts
// lib/db.ts — current frontend shapes
User       { id, email, role, name, kycStatus }
Vehicle    { id, ownerId, make, model, year, plateNumber, status }
Contract   { ... }       // see file for fields
```

Suggested tables:

- `users` — id (uuid), email, password_hash, role, name, phone, kyc_status, trust_score, created_at
- `owners` — user_id, business_name, address, momo_number, ...
- `drivers` — user_id, license_number, medical_status, profile_photo_url, ...
- `vehicles` — id, owner_id, make, model, year, plate_number, color, mileage, location, daily_rate, weekly_rate, monthly_rate, status, created_at
- `vehicle_photos` — id, vehicle_id, position (front/side/back/interior), storage_url
- `partnerships` — id, owner_id, driver_id, vehicle_id, start_date, end_date, status, ...
- `contracts` — id, partnership_id, document_url, start_date, status, signed_owner_at, signed_driver_at
- `payments` — id, payer_id, payee_id, amount_ghs, type, paystack_reference, status, created_at
- `subscriptions` — id, user_id, plan, started_at, expires_at, status
- `kyc_submissions` — id, user_id, provider (smile-id), provider_reference, status, response_json
- `inspections` — id, vehicle_id, type (initial/periodic/return), checklist_json, score, status
- `maintenance_records` — id, vehicle_id, issue, scheduled_date, completed_date, cost, status
- `disputes` — id, partnership_id, raised_by, issue, status, resolution
- `insurance_claims` — id, vehicle_id, incident_date, description, evidence_urls, status
- `support_tickets` — id, user_id, subject, body, priority, status
- `emergency_alerts` — id, user_id, lat, lng, type, status, created_at
- `appointments` — id, name, email, phone, role, preferred_date, message, status
- `audit_logs` — id, actor_user_id, actor_role, action, module, subject_id, prev_json, next_json, ip, device, timestamp

---

## 6. Third-party integrations

| Service | Where | What to do |
|---|---|---|
| **Paystack** | Payments, subscriptions | Webhook → `POST /api/webhooks/paystack`. Events: `charge.success`, `transfer.success`, `refund.processed`. On success, update `payments` table + Finance dashboard reflects. |
| **Smile ID** | KYC for driver + owner | When user submits KYC on `/shared/kyc`, frontend calls `POST /api/kyc/start`, backend talks to Smile ID, webhook → `POST /api/webhooks/smile-id` updates `kyc_status`. Notify HR + Fleet admin dashboards. |
| **Supabase Storage** | Vehicle photos, contract PDFs, KYC docs | Bucket per resource: `vehicle-photos/`, `contracts/`, `kyc/`. Frontend currently uses `ImageUpload` component — replace its local handler with a signed-URL upload. |
| **Google Maps** | Vehicle tracking, "Find a car" map | Add backend endpoint `GET /api/vehicles/nearby?lat&lng&radius` later. |
| **Firebase FCM / OneSignal** | Push notifications | When KYC approved, payment received, dispute updated → trigger push. |
| **Email** (Resend / Postmark) | Transactional emails | Signup confirmation, payment receipt, dispute updates. |

---

## 7. Brand colors (must match across both frontends)

Both apps use the same palette. The backend doesn't need this directly but it matters for any **server-rendered emails, PDFs, or webhook templates** — they must match the brand.

| Token | Hex |
|---|---|
| Deep Navy | `#0D1B2E` |
| Navy Hover | `#122844` |
| Royal Navy | `#1A3260` |
| Kente Gold | `#C8A84B` (PDF docs), `#D4940A` (warm) |
| Light Gold | `#E8C96A` |
| Royal Blue | `#1D4ED8` |
| Trust Green | `#1B6B45` |
| Alert Red | `#C0392B` |

Font: **Poppins** (Google Fonts).

---

## 8. Audit logging — required

Every action that changes data (signup, vehicle listing, contract signing, payment, KYC approval, dispute filing, etc.) must record an audit log entry:

```json
{
  "actorUserId": "uuid",
  "actorRole": "owner|driver|admin|<admin-role>",
  "action": "CREATE_VEHICLE",
  "module": "vehicles",
  "subjectId": "uuid",
  "previousValue": {},
  "newValue": {...},
  "timestamp": "ISO-8601",
  "device": "Chrome / Windows",
  "ipAddress": "196.x.x.x",
  "browser": "Chrome 126"
}
```

The CEO and Security Analyst dashboards both read from this log. Same writer, same schema for main site + admin portal actions.

---

## 9. Find every "TODO backend" in the code

The main site does **not** yet have inline `TODO backend:` comments throughout — that was done in the admin portal. The frontend dev should add them as forms get wired up. For now this document is the spec.

When a backend endpoint is added, the corresponding `lib/db.ts` Dexie call must be replaced with a `fetch('/api/...')` call against `api.carlynk.com`.

---

## 10. Frontend-only concerns (NOT backend responsibility)

The backend should **not** try to implement or store any of these:

- **Theme system** (`lib/themes.ts`, `app/themes.css`) — purely a client `localStorage` skin toggle. 6 themes total: `royal-default`, `golden-mist-gold`, `golden-mist-navy`, `slate-fleet`, `glass-morphic-blue`, `glass-morphic-gold`, `kente-night`. Saved per-device under `localStorage['carlynk_theme']`.
- **Loader animations** (`components/ui/GlobalLoader.tsx`, `/loader` route).
- **Form-delivery / car-drive animations** (`CarDriveStrip`, `FormDeliveryFrame`).
- **Ripple effect, scroll animations, hamburger menu** — all client UI.
- **MetaMask suppression** (`MetaMaskSuppressor.tsx`).

---

## 11. Environment variables the frontend will need (when wired)

Set on Vercel for `carlynx-web`:

```
NEXT_PUBLIC_API_BASE_URL=https://api.carlynk.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
NEXT_PUBLIC_SMILE_ID_PARTNER_ID=...
NEXT_PUBLIC_GOOGLE_MAPS_KEY=...
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Backend secrets (Vercel server-side env, not exposed to client):

```
SUPABASE_SERVICE_ROLE_KEY=...
PAYSTACK_SECRET_KEY=sk_live_...
SMILE_ID_API_KEY=...
JWT_SECRET=...
RESEND_API_KEY=...
```

---

## 12. Where to look first (cheat sheet for backend AI)

1. **Page list**: `app/` folder. Each `page.tsx` is a route.
2. **Data shapes**: `lib/db.ts` (current Dexie definitions — convert to Supabase schema).
3. **Auth flow**: `lib/session.ts`, `components/ui/useSession.ts`, `app/auth/`.
4. **Form fields the backend needs to accept**: read each `app/auth/*/page.tsx` and `app/owner/add-vehicle/page.tsx` directly.
5. **What the admin portal expects on the same DB**: `../carlynk-admin/BACKEND_NOTES.md`.

---

## 13. Open questions for backend planning (heads up)

- Trust score formula — defined in `lib/blueprint.ts`? Confirm with frontend dev.
- Termination penalty rules — see `lib/blueprint.ts` `terminationTypes`. Backend must enforce same rules.
- Partnership commission rate — currently shown as 15% (GH₵ 420 on GH₵ 2,800). Confirm.
- Subscription plan tiers — see `/subscriptions` page; backend must price-match.
- Quiz scoring rules — see `lib/onboardingQuizzes.json` for content; backend decides pass/fail thresholds.
