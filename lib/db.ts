// ─────────────────────────────────────────────────────────────────────────────
// OFFLINE DATABASE (Dexie.js) — PLACEHOLDER ONLY
// ─────────────────────────────────────────────────────────────────────────────
//
// Why this exists:
//   Dexie.js gives us a typed, IndexedDB-backed local database so the UI can
//   be built and demoed without a live backend. It is NOT production storage.
//
// What backend replaces this with:
//   Every call to `db.users`, `db.vehicles`, `db.contracts`, `db.earnings`
//   must become a fetch() call to the corresponding API endpoint:
//
//   db.users      → GET /api/auth/me, GET /api/users/:id
//   db.vehicles   → GET /api/owner/vehicles, GET /api/driver/vehicles
//   db.contracts  → GET /api/contracts/me, POST /api/contracts/:id/terminate
//   db.earnings   → GET /api/driver/earnings, GET /api/owner/performance
//
//   The data shapes below (User, Vehicle, Contract, EarningsReport) describe
//   exactly what the frontend expects. Use them as the API response contract.
//   Mirror them in your Supabase schema.
//
// How to migrate a page:
//   1. Find the page that calls e.g. `db.vehicles.toArray()`.
//   2. Replace it with `fetch('/api/owner/vehicles', headers)`.
//   3. Keep the same response shape so the component doesn't need to change.
// ─────────────────────────────────────────────────────────────────────────────
import Dexie, { Table } from 'dexie';

// ── User ─────────────────────────────────────────────────────────────────────
// Supabase table: `users`
// Backend also returns this shape from GET /api/auth/me and GET /api/users/:id
export interface User {
  id?: number;
  email: string;
  role: 'owner' | 'driver' | 'admin';
  name: string;
  kycStatus: 'pending' | 'approved' | 'rejected'; // Set by Smile ID KYC integration
}

// ── Vehicle ───────────────────────────────────────────────────────────────────
// Supabase table: `vehicles`
// Owner creates vehicles via POST /api/owner/vehicles (multipart — includes photos)
// Drivers browse via GET /api/driver/vehicles?available=true
export interface Vehicle {
  id?: number;
  ownerId: number;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'available' | 'partnered' | 'inactive';
}

// ── Contract ──────────────────────────────────────────────────────────────────
// Supabase table: `contracts`
// Created when a driver–owner partnership is formed.
// Termination rules and penalties live in lib/blueprint.ts — enforce server-side too.
export interface Contract {
  id?: number;
  ownerId: number;
  driverId: number;
  vehicleId: number;
  status: 'pending' | 'active' | 'completed' | 'disputed';
  startDate: string;
  endDate?: string;
}

// ── EarningsReport ───────────────────────────────────────────────────────────
// Supabase table: `payments` (use the same table for driver payments)
// Backend computes earnings from Paystack webhooks. amount is in GHS (Ghana Cedis).
export interface EarningsReport {
  id?: number;
  driverId: number;
  contractId: number;
  amount: number; // GHS — always display as "GH₵ X,XXX"
  date: string;   // ISO-8601
  status: 'pending' | 'approved' | 'paid';
}

// ── Local DB instance ─────────────────────────────────────────────────────────
// Used only in dev/demo. Remove all `db.*` calls once backend API is wired.
class CarlynxDatabase extends Dexie {
  users!: Table<User>;
  vehicles!: Table<Vehicle>;
  contracts!: Table<Contract>;
  earnings!: Table<EarningsReport>;

  constructor() {
    super('CarlynxDB');
    this.version(1).stores({
      users: '++id, email, role, kycStatus',
      vehicles: '++id, ownerId, status',
      contracts: '++id, ownerId, driverId, vehicleId, status',
      earnings: '++id, driverId, contractId, status'
    });
  }
}

export const db = new CarlynxDatabase();
