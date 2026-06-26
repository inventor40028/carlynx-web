# Code Documentation Summary — Main Site (carlynx-web)

All key files in the main site now have detailed header comments explaining:
- What the file/page does
- What backend endpoints it needs
- Where data goes (Supabase tables, Storage buckets)
- Which admin dashboards see the same data

## Files Commented

### Core Libraries
- ✅ `lib/session.ts` — localStorage session (JWT replacement notes)
- ✅ `lib/db.ts` — Dexie placeholder (Supabase migration notes)
- ✅ `lib/blueprint.ts` — business rules (termination, payments, inspection, commission)

### Auth Pages
- ✅ `app/auth/signin/page.tsx` — POST /api/auth/login
- ✅ `app/auth/signup/page.tsx` — POST /api/auth/signup/owner
- ✅ `app/auth/driver-signup/page.tsx` — POST /api/auth/signup/driver

### Dashboards
- ✅ `app/owner/dashboard/page.tsx` — GET /api/owner/dashboard
- ✅ `app/driver/dashboard/page.tsx` — GET /api/driver/dashboard

### Owner Pages
- ✅ `app/owner/add-vehicle/page.tsx` — POST /api/owner/vehicles (multipart)
- ✅ `app/owner/drivers/page.tsx` — GET /api/owner/drivers (partnership requests)
- ✅ `app/owner/performance/page.tsx` — GET /api/owner/performance

### Driver Pages
- ✅ `app/driver/vehicles/page.tsx` — GET /api/driver/vehicles?available=true
- ✅ `app/driver/medical/page.tsx` — POST /api/driver/medical/upload
- ✅ `app/driver/profile/page.tsx` — PUT /api/driver/profile
- ✅ `app/driver/earnings/page.tsx` — POST /api/driver/earnings

### Shared Pages
- ✅ `app/shared/contracts/page.tsx` — GET /api/contracts/me
- ✅ `app/shared/payments/page.tsx` — GET /api/payments/me (Paystack webhook)
- ✅ `app/shared/kyc/page.tsx` — POST /api/kyc/start (Smile ID flow)
- ✅ `app/shared/inspection/page.tsx` — GET /api/inspections/me
- ✅ `app/shared/maintenance/page.tsx` — POST /api/maintenance/report
- ✅ `app/shared/disputes/page.tsx` — POST /api/disputes
- ✅ `app/shared/emergency/page.tsx` — POST /api/emergency/alert
- ✅ `app/shared/insurance-claims/page.tsx` — POST /api/insurance/claims

### Other Pages
- ✅ `app/subscriptions/page.tsx` — POST /api/subscriptions/subscribe
- ✅ `app/book-appointment/page.tsx` — POST /api/appointments

## What Each Comment Block Includes

Every commented file now has:

1. **Page purpose** — what the user sees, what role can access it
2. **Backend integration points** — exact endpoint paths and methods
3. **Data flow** — where data is stored (Supabase tables, Storage buckets)
4. **Admin portal link** — which admin dashboards see/manage the same data
5. **Business rules** — references to lib/blueprint.ts where applicable

## Next Steps for Backend Developer

Read `carlynx-web/BACKEND_NOTES.md` — it maps every route to its required endpoint and includes:
- Full Supabase schema suggestions mirrored from `lib/db.ts`
- Third-party integration specs (Paystack, Smile ID, Storage)
- Audit logging requirements
- Environment variables needed
- What frontend handles vs what backend handles

## Next Steps for Frontend Developer

Read `instructions/FRONTEND_GUIDE.md` — it covers:
- The two separate repos (main site vs admin portal)
- Brand rules (colors, fonts, no emojis, currency format)
- How to wire backend calls (replace Dexie with fetch)
- UI patterns to follow
- Animations to preserve
- What NOT to do (merge repos, break brand, add self-registration to admin)

---

All inline `// TODO backend:` comments in the admin portal already exist.
The main site now has the same level of documentation via header blocks.
