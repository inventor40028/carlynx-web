# CarLynk Africa — Team Sprint Plan
## Finish Line: Tomorrow | 3-Person Remote Team

---

**Date:** 2026-06-26  
**Deadline:** 2026-06-27 end-of-day  
**Objective:** Wire backend, test locally, push production-ready code

---

## 👥 Team Roster

| Name | Role | Strengths | AI Support |
|---|---|---|---|
| **Brian Smith** | Frontend Lead | UI/UX, fast iteration with Claude Code | ✅ Full AI pair programming |
| **Edward** | Backend Developer | Node.js, Supabase, API design | Manual (can use AI for debugging) |
| **Welbee** | Cyber Security Agent | Auth, auditing, security review | Manual (security-focused tools) |

---

## 🎯 Success Criteria (by tomorrow EOD)

1. ✅ Backend API live on a subdomain (e.g., `api.carlynk.com` or `localhost:4000` for testing)
2. ✅ Main site frontend wired to backend (no more Dexie/localStorage)
3. ✅ Auth flow working: signup → login → role dashboard
4. ✅ At least 3 core flows testable end-to-end:
   - Owner: signup → add vehicle → see dashboard
   - Driver: signup → browse cars → see dashboard
   - Admin: signin → view one dashboard (e.g., CEO or Operations)
5. ✅ Security review pass (Welbee signs off on auth + audit log)
6. ✅ Local build clean (`npm run build` passes on both repos)
7. ✅ Push to GitHub, deploy to Vercel

---

## 🏊 Swim Lanes — Who Does What

### **Brian (Frontend + AI)**

**Your job:** Keep the UI intact, wire it to Edward's API, test in browser.

**Tasks (in priority order):**
1. **Auth wiring** — Replace demo login with Edward's `/api/auth/login` endpoint
   - Files: `app/auth/signin/page.tsx`, `app/auth/signup/page.tsx`, `app/auth/driver-signup/page.tsx`
   - Change: Replace `setSession({ ... })` with `fetch('/api/auth/login', ...)` → extract session from response → call `setSession(session)`
   - Test: Can you sign up, sign in, and land on the correct dashboard?

2. **Owner flow** — Add vehicle form → backend
   - File: `app/owner/add-vehicle/page.tsx`
   - Change: Wire form submit to `POST /api/owner/vehicles` (multipart for photos)
   - Test: Can you add a vehicle and see it on `/owner/dashboard`?

3. **Driver flow** — Browse cars → backend
   - File: `app/driver/vehicles/page.tsx`
   - Change: Replace mock `vehicles` array with `fetch('/api/driver/vehicles?available=true')`
   - Test: Do you see real vehicles Edward added?

4. **Dashboard stats** — Replace mock stats with real API
   - Files: `app/owner/dashboard/page.tsx`, `app/driver/dashboard/page.tsx`
   - Change: `fetch('/api/owner/dashboard')` and `fetch('/api/driver/dashboard')`
   - Test: Do stats match what Edward's DB shows?

5. **Local testing** — Run `npm run dev` + Edward's backend, walk through all 3 flows, take screenshots
6. **Build verification** — `npm run build` must pass before pushing

**Your AI (Claude Code) strengths:**
- Fast find-and-replace across files
- Catch TypeScript errors before you run
- Suggest error handling for fetch() calls
- Write .env variable setup for you

**Your blockers:**
- You need Edward's API base URL (e.g., `http://localhost:4000` or `https://api-staging.carlynk.com`)
- You need Edward to tell you when each endpoint is ready

**Parallel work:** You can mock Edward's API responses locally while he builds. Use `json-server` or just hardcode `fetch()` to return static JSON until his API is live.

---

### **Edward (Backend Developer)**

**Your job:** Build the API, set up Supabase, handle auth + data.

**Tasks (in priority order):**
1. **Supabase setup** — Create project, define schema from `carlynx-web/BACKEND_NOTES.md` section 5
   - Tables: `users`, `owners`, `drivers`, `vehicles`, `vehicle_photos`, `partnerships`, `contracts`, `payments`, `kyc_submissions`, `audit_logs`
   - Storage buckets: `vehicle-photos/`, `driver-profiles/`, `medical-docs/`
   - Do NOT build all tables at once — start with `users`, `vehicles`, and you can add the rest later

2. **Auth endpoints** — JWT-based, httpOnly cookie
   - `POST /api/auth/signup/owner` — hash password (bcrypt), insert `users` + `owners`, return `{ token, session }`
   - `POST /api/auth/signup/driver` — same but `users` + `drivers`
   - `POST /api/auth/login` — check password, return `{ token, session }`
   - `GET /api/auth/me` — verify JWT, return session
   - `POST /api/auth/logout` — invalidate JWT server-side
   - Welbee will review your JWT secret + cookie flags

3. **Owner endpoints** (minimal for tomorrow)
   - `POST /api/owner/vehicles` — multipart upload, store photos in Supabase Storage, insert `vehicles` + `vehicle_photos`
   - `GET /api/owner/dashboard` — return stats: `{ totalVehicles, activePartnerships, pendingRequests, monthlyEarnings }`

4. **Driver endpoints** (minimal for tomorrow)
   - `GET /api/driver/vehicles?available=true` — return `Vehicle[]` with owner info, include photo URLs
   - `GET /api/driver/dashboard` — return stats: `{ weeklyEarnings, monthlyEarnings, contractStatus, kycStatus }`

5. **Admin auth** (stretch goal if time allows)
   - Admin portal uses the SAME backend but different role check
   - `POST /api/admin/auth/login` — check role is one of the 16 admin roles (not 'owner' or 'driver')
   - Admin dashboards can wait until after tomorrow — just get the signin working

6. **Audit log writer** — Every write operation calls `insertAuditLog({ actorUserId, action, module, ... })`

7. **CORS + env** — Allow Brian's `http://localhost:3000` origin, set `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000` in his `.env.local`

**Your strengths:**
- You know Node.js + Supabase — you can scaffold this fast
- You've done JWT auth before

**Your blockers:**
- You need Welbee to give you the JWT secret and review your cookie flags before you deploy
- You need to tell Brian when each endpoint is ready (use a shared checklist — see "Real-Time Collab" below)

**Parallel work:** Start with auth endpoints first (Brian needs those to test anything). While he tests auth, you build the vehicle endpoints. You don't need to finish all 33 routes — just the 7 above.

---

### **Welbee (Cyber Security Agent)**

**Your job:** Review auth implementation, audit log, and approve before deploy.

**Tasks (in priority order):**
1. **JWT secret generation** — Generate a 256-bit secret for Edward, ensure it's in `.env` (NOT committed to Git)
2. **Cookie flags review** — Edward's JWT cookie MUST have:
   - `httpOnly: true` (prevent XSS)
   - `secure: true` (HTTPS only — allow `false` for localhost testing)
   - `sameSite: 'lax'` or `'strict'` (prevent CSRF)
3. **Password hashing review** — Confirm Edward uses bcrypt with cost ≥ 10 (NOT plain SHA or MD5)
4. **Audit log schema check** — Ensure every write operation calls `insertAuditLog` and includes:
   - `actorUserId`, `actorRole`, `action`, `module`, `subjectId`, `previousValue`, `newValue`, `timestamp`, `ipAddress`, `device`
5. **CORS check** — Edward's API should only allow `https://carlynx.com`, `https://admin.carlynk.com`, and `http://localhost:3000` (dev only)
6. **SQL injection scan** — Check Edward's queries use parameterized queries (Supabase client does this by default, but verify)
7. **Rate limiting** — Auth endpoints MUST have rate limiting (e.g., 5 login attempts per IP per minute)
8. **Secrets audit** — Scan both repos for accidentally committed secrets (`.env`, API keys, JWT secret)
   - Run: `git log -p | grep -i "secret\|password\|api_key"` on both repos
9. **Final signoff** — Before Brian pushes to production, you review the deployed API and give go/no-go

**Your strengths:**
- You know OWASP Top 10 — you'll catch what Edward and Brian miss
- You can script security checks (e.g., automated secret scanner)

**Your blockers:**
- You need Edward's code access to review (he shares his repo link with you)
- You need to see Brian's `.env.local` to confirm no secrets are hardcoded in frontend

**Parallel work:** While Edward builds, you prepare the security checklist. Once he has auth working, you review it immediately (don't wait until the end).

---

## 🔄 Real-Time Collaboration Strategy

### **Communication Hub**
Use **Discord** or **Slack** (if you don't have one, set up a Discord server in 5 minutes):
- Channel `#general` — status updates, blockers
- Channel `#backend-ready` — Edward announces when an endpoint is live
- Channel `#frontend-testing` — Brian shares screenshots of what's working/broken
- Channel `#security-review` — Welbee posts findings, Edward + Brian respond

**Check-in schedule (tomorrow):**
- 9:00 AM — Kickoff: confirm roles, share repo access, set up comms
- 12:00 PM — Midday sync: what's done, what's blocked
- 3:00 PM — Integration test: Brian tests Edward's API live
- 6:00 PM — Security review: Welbee signs off or flags issues
- 8:00 PM — Final build + push

### **Git Workflow**
- **Edward:** Work on `backend` repo (create it if it doesn't exist), branch `dev`
- **Brian:** Work on `carlynx-web` repo, branch `dev-backend-wiring`
- **Welbee:** Read-only access to both repos for review

**DO NOT push to `master` or `main` until Welbee signs off.**

Push sequence:
1. Edward pushes backend to `dev` → deploys to staging subdomain (e.g., `api-staging.carlynk.com`)
2. Brian wires frontend to staging API, tests locally
3. Welbee reviews both repos
4. If pass: Edward merges `dev` → `main`, Brian merges `dev-backend-wiring` → `master`
5. Deploy both to production

### **Shared Checklist (Live Google Doc or Notion)**
Create a shared checklist so everyone knows what's done:

```
## Backend Endpoints (Edward)
- [ ] POST /api/auth/signup/owner
- [ ] POST /api/auth/signup/driver
- [ ] POST /api/auth/login
- [ ] GET /api/auth/me
- [ ] POST /api/owner/vehicles
- [ ] GET /api/owner/dashboard
- [ ] GET /api/driver/vehicles
- [ ] GET /api/driver/dashboard

## Frontend Wiring (Brian)
- [ ] Auth signin wired
- [ ] Auth signup wired
- [ ] Owner add-vehicle wired
- [ ] Owner dashboard wired
- [ ] Driver vehicles wired
- [ ] Driver dashboard wired
- [ ] Local testing: owner flow
- [ ] Local testing: driver flow
- [ ] Build passes

## Security Review (Welbee)
- [ ] JWT secret generated
- [ ] Cookie flags reviewed
- [ ] Password hashing reviewed
- [ ] Audit log schema checked
- [ ] CORS config reviewed
- [ ] Secrets audit passed
- [ ] Rate limiting confirmed
- [ ] Final signoff for deploy
```

Update this in real-time. Brian checks it to see when Edward's endpoints are ready. Welbee checks it to know when to review.

### **Supabase Sharing (if Edward uses Supabase)**
Edward should:
1. Create a Supabase project
2. Add Brian + Welbee as **Project Members** (read-only for Welbee, write for Brian if needed)
3. Share the `anon` key + project URL with Brian (goes in his `.env.local`)

This way Brian can see live data Edward is inserting, and Welbee can audit the schema.

---

## 🧪 Testing Plan (Brian + Edward pair at 3 PM tomorrow)

### **Local Setup**
1. **Edward:** Run backend on `http://localhost:4000`
2. **Brian:** Set `.env.local`:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```
   Then run: `npm run dev` (main site on `http://localhost:3000`)

### **Test Scenarios**
Run these in order, take screenshots, note failures:

1. **Owner signup**
   - Go to `http://localhost:3000/auth/signup`
   - Fill form, submit
   - Should redirect to `/owner/onboarding` (or `/owner/dashboard` if onboarding skipped for MVP)
   - Check Supabase: new row in `users` + `owners`

2. **Owner add vehicle**
   - Sign in as that owner
   - Go to `/owner/add-vehicle`
   - Fill form, upload 1 photo (skip the other 3 for speed)
   - Submit
   - Should redirect to `/owner/dashboard`
   - Check dashboard: vehicle count = 1
   - Check Supabase: new row in `vehicles`, photo in Storage bucket

3. **Driver signup**
   - Go to `http://localhost:3000/auth/driver-signup`
   - Fill multi-step form, submit
   - Should redirect to `/driver/dashboard`
   - Check Supabase: new row in `users` + `drivers`

4. **Driver browse cars**
   - Sign in as that driver
   - Go to `/driver/vehicles`
   - Should see the vehicle the owner added
   - Click "View Details" modal → should show photo + specs

5. **Admin signin**
   - Go to `http://localhost:3001/` (admin portal)
   - Use demo CEO credentials: `ceo@carlynk.com` / `ceo123`
   - Should land on `/admin/ceo` dashboard
   - (Backend must allow role='ceo' from demo `DEMO_ACCOUNTS` in admin repo)

### **If something breaks:**
- Brian screenshots the error
- Edward checks backend logs
- Fix, retest
- Don't move to next scenario until current one passes

---

## 📦 Build & Deploy Checklist (before pushing)

### **Brian (Frontend)**
Run these commands:
```bash
cd C:\Users\ASUS\Desktop\CARLYNX\carlynx-web
npm run build
```
If it fails: fix TypeScript errors, repeat.

```bash
cd C:\Users\ASUS\Desktop\CARLYNX\carlynk-admin
npm run build
```
If it fails: fix TypeScript errors, repeat.

### **Edward (Backend)**
- Run linter (if you have one): `npm run lint`
- Check all env vars are in `.env.example` (NOT `.env` — that's gitignored)
- Confirm Supabase migrations are committed (if using migrations)

### **Welbee (Security)**
Run final checks:
```bash
# Check for secrets in Git history
cd carlynx-web && git log -p | grep -iE "secret|password|api[_-]key|jwt" | head -20
cd carlynk-admin && git log -p | grep -iE "secret|password|api[_-]key|jwt" | head -20

# Check .env files are gitignored
git check-ignore .env .env.local
# Should output: .env, .env.local (if not, they're NOT ignored — fix .gitignore)
```

### **Push Sequence**
1. Edward: `git push origin dev` (backend)
2. Brian: `git push origin dev-backend-wiring` (main site)
3. Welbee: Reviews both on GitHub, approves PR if clean
4. Edward: Merge PR → `main`, backend auto-deploys (if Vercel/Railway/Render configured)
5. Brian: Merge PR → `master`, frontend auto-deploys to Vercel
6. Everyone: Test live URLs, confirm auth works on production

---

## 🚨 Common Pitfalls (avoid these)

### **Brian:**
- ❌ Don't hardcode `http://localhost:4000` in components — use `process.env.NEXT_PUBLIC_API_BASE_URL`
- ❌ Don't commit `.env.local` — it's gitignored for a reason
- ❌ Don't skip error handling in `fetch()` — wrap in try/catch, show user-friendly errors
- ❌ Don't remove Dexie until AFTER backend is wired (you need it for local dev if Edward's API isn't ready yet)

### **Edward:**
- ❌ Don't use `SELECT *` in queries — specify columns (performance + security)
- ❌ Don't skip `bcrypt` — NEVER store plain passwords
- ❌ Don't allow CORS `origin: '*'` in production — whitelist specific domains
- ❌ Don't skip audit logs — every write MUST log who/what/when
- ❌ Don't deploy without HTTPS — Vercel/Railway give you free SSL

### **Welbee:**
- ❌ Don't approve if you see plain passwords in code
- ❌ Don't approve if JWT secret is <32 characters
- ❌ Don't approve if `httpOnly: false` on the JWT cookie
- ❌ Don't approve if audit log is missing `ipAddress` or `device`

---

## 🎯 MVP vs Nice-to-Have (prioritize for tomorrow)

### **Must Ship Tomorrow (MVP)**
- ✅ Auth: signup, login, logout
- ✅ Owner: add vehicle, see dashboard
- ✅ Driver: browse vehicles, see dashboard
- ✅ Admin: signin, view one dashboard (CEO or Operations)
- ✅ Audit log: writes on signup, add-vehicle, login
- ✅ Security: JWT, bcrypt, httpOnly cookie, CORS whitelist

### **Can Wait (post-launch)**
- ⏳ KYC (Smile ID integration)
- ⏳ Payments (Paystack integration)
- ⏳ Partnerships (driver requests vehicle, owner approves)
- ⏳ Contracts, disputes, maintenance, inspections
- ⏳ All 16 admin dashboards (just get signin working for 1 role)
- ⏳ Email notifications
- ⏳ Push notifications
- ⏳ Rate limiting (Welbee flags it, Edward adds post-launch)

**Why:** You can't build 33 routes + 16 admin dashboards in 1 day. Ship the core auth + data flow first. The rest is iteration.

---

## 📞 Contact & Escalation

If blocked for >30 minutes:
1. Post in Discord/Slack `#general` with: "BLOCKED: <issue>"
2. Other two teammates drop what they're doing and help unblock
3. If still stuck after 1 hour, escalate: Brian uses Claude Code to debug, Edward googles the error, Welbee suggests alternative approach

**No one works in silence.** Over-communicate. "I'm stuck" is better than "I'll figure it out" when the deadline is tomorrow.

---

## 🏁 Definition of Done (tomorrow 8 PM)

- ✅ All 3 can sign up, sign in, and see their role dashboard
- ✅ Owner can add a vehicle and see it on their dashboard
- ✅ Driver can browse that vehicle
- ✅ Admin can sign in and see one dashboard (CEO or Operations)
- ✅ Welbee signed off on auth + audit log
- ✅ Both frontends build clean (`npm run build` passes)
- ✅ Pushed to GitHub, deployed to Vercel/Railway/Render
- ✅ Live URLs work (not just localhost)

If all ✅, you're done. Ship it.

---

## 💪 Brian's Role (You + Claude Code)

You're not alone — Claude Code is your pair programmer. Here's how to maximize it:

### **What Claude Code is great at:**
- Find-and-replace across 30 files in seconds (e.g., replace all `db.users.toArray()` with `fetch('/api/users')`)
- Generate TypeScript types from API responses
- Catch build errors before you run `npm run build`
- Write fetch() wrappers with error handling
- Suggest React state patterns for async data

### **What you handle:**
- Testing in the browser (Claude can't click buttons for you)
- Confirming Edward's API responses match what the UI expects
- Taking screenshots of what works / what breaks
- Reporting blockers to Edward in Discord/Slack

### **Your workflow tomorrow:**
1. Read Edward's endpoint docs (he'll share them in Discord)
2. Tell Claude: "Wire `app/auth/signin/page.tsx` to `POST /api/auth/login` — here's the endpoint spec: ..."
3. Claude writes the fetch() call for you
4. You test it in browser, take screenshot
5. If broken: Claude debugs from the error message you paste
6. Repeat for next endpoint

You're the **integration glue** — Edward builds the API, you plug the UI into it. Claude speeds you up 5x.

---

## 🔐 Welbee's Role (Security Gate)

You're the last line of defense before production. Here's your review checklist:

### **Before Edward deploys backend:**
- [ ] JWT secret is 256-bit (64 hex chars) and in `.env` (NOT in code)
- [ ] JWT cookie has `httpOnly: true`, `secure: true`, `sameSite: 'lax'`
- [ ] Passwords hashed with `bcrypt` cost ≥ 10
- [ ] Audit log includes: `actorUserId`, `action`, `module`, `timestamp`, `ipAddress`
- [ ] CORS whitelist is `['https://carlynx.com', 'https://admin.carlynk.com']` (NOT `*`)
- [ ] SQL queries are parameterized (Supabase client does this by default — verify)
- [ ] Rate limiting on `/api/auth/login` (5 attempts per IP per minute)

### **Before Brian deploys frontend:**
- [ ] No secrets in `.env.local` committed to Git
- [ ] `NEXT_PUBLIC_API_BASE_URL` is set (NOT hardcoded in components)
- [ ] No API keys or JWT tokens in localStorage (only non-sensitive session data)

### **Your final signoff (8 PM tomorrow):**
If all ✅ above: "APPROVED FOR DEPLOY 🚀"  
If any ❌: "BLOCKED — fix X before deploy" → Edward/Brian fix → you re-review

---

## ⏱️ Timeline (Tomorrow, 2026-06-27)

| Time | What |
|---|---|
| 9:00 AM | **Kickoff call** — confirm roles, share repo access, set up Discord/Slack |
| 9:30 AM | **Edward** starts backend (auth endpoints first) |
| 9:30 AM | **Brian** sets up `.env.local` with Edward's localhost URL |
| 9:30 AM | **Welbee** generates JWT secret, shares with Edward |
| 11:00 AM | **Edward** announces in `#backend-ready`: "Auth endpoints live" |
| 11:00 AM | **Brian** wires signin/signup pages to Edward's API |
| 12:00 PM | **Midday sync** — status update, blockers, adjust priorities |
| 1:00 PM | **Edward** finishes vehicle endpoints |
| 1:00 PM | **Welbee** reviews Edward's auth code |
| 2:00 PM | **Brian** wires owner/driver vehicle pages |
| 3:00 PM | **Integration test** — Brian + Edward pair-test all 5 scenarios |
| 5:00 PM | **Brian** runs `npm run build` on both repos, fixes errors |
| 6:00 PM | **Welbee** runs final security audit |
| 7:00 PM | **All** push to GitHub (if Welbee approved) |
| 8:00 PM | **Test live URLs** — confirm production works |
| 8:30 PM | **DONE** 🎉 |

---

## 📄 This Document

**Location:** `C:\Users\ASUS\Desktop\CARLYNX\instructions\TEAM_SPRINT_PLAN.md`

**To convert to PDF:**
- Open in VSCode → right-click → "Markdown: Export to PDF" (if extension installed)
- Or: paste into Google Docs, File → Download → PDF
- Or: use Pandoc: `pandoc TEAM_SPRINT_PLAN.md -o TEAM_SPRINT_PLAN.pdf`

**Print 3 copies** (one per person) or share the PDF link in Discord.

---

## 🚀 Let's Ship This

You have everything you need:
- **Brian + Claude Code:** Fast UI wiring
- **Edward:** Solid backend skills
- **Welbee:** Security expertise

The plan is tight but achievable. Stay focused on the MVP. Over-communicate. Help each other unblock.

**Tomorrow at 8:30 PM, you'll have a live, secure, working CarLynk Africa platform.**

Let's go. 🏁
