// Dexie.js offline database setup
import Dexie, { Table } from 'dexie';

// User data structure
export interface User {
  id?: number;
  email: string;
  role: 'owner' | 'driver' | 'admin';
  name: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
}

// Vehicle data structure
export interface Vehicle {
  id?: number;
  ownerId: number;
  make: string;
  model: string;
  year: number;
  plateNumber: string;
  status: 'available' | 'partnered' | 'inactive';
}

// Contract data structure
export interface Contract {
  id?: number;
  ownerId: number;
  driverId: number;
  vehicleId: number;
  status: 'pending' | 'active' | 'completed' | 'disputed';
  startDate: string;
  endDate?: string;
}

// Earnings report structure
export interface EarningsReport {
  id?: number;
  driverId: number;
  contractId: number;
  amount: number;
  date: string;
  status: 'pending' | 'approved' | 'paid';
}

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
