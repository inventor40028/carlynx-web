// Central blueprint data — single source of truth for all CarLynk operations pages.
// Backend will replace these arrays with real API data later.

// ---------- Vehicles (driver Find-a-Car) ----------
export type Transmission = 'Automatic' | 'Manual';

export interface CarView {
  src: string;
  label: string;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  plate: string;
  location: string;
  owner: string;
  transmission: Transmission;
  fuel: string;
  seats: number;
  mileage: number;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  status: string;
  // Backend note: these 4 views only exist once a car is approved by CarLynk.
  // Approved cars live in a folder named after owner+car; unapproved stay in a "pending" folder.
  views: CarView[];
  damages: string[];
  problems: string[];
}

// The 4 generic view images live in /public/cars (front/back/sideleft/sideright).
const CAR_VIEWS: CarView[] = [
  { src: '/cars/front.png', label: 'Front View' },
  { src: '/cars/back.png', label: 'Back View' },
  { src: '/cars/sideleft.png', label: 'Left Side' },
  { src: '/cars/sideright.png', label: 'Right Side' },
];

export const sampleVehicles: Vehicle[] = [
  {
    id: 1, make: 'Toyota', model: 'Corolla', year: 2020, plate: 'GR-1234-20',
    location: 'Accra', owner: 'John Doe', transmission: 'Automatic', fuel: 'Petrol',
    seats: 5, mileage: 52000, dailyRate: 150, weeklyRate: 900, monthlyRate: 3500,
    status: 'available', views: CAR_VIEWS,
    damages: ['Minor scratch on rear bumper', 'Small dent on left door'],
    problems: ['AC needs servicing soon'],
  },
  {
    id: 2, make: 'Honda', model: 'Civic', year: 2019, plate: 'GR-5678-19',
    location: 'Kumasi', owner: 'Jane Smith', transmission: 'Manual', fuel: 'Petrol',
    seats: 5, mileage: 68000, dailyRate: 140, weeklyRate: 850, monthlyRate: 3200,
    status: 'available', views: CAR_VIEWS,
    damages: ['No visible damage'],
    problems: ['None reported'],
  },
  {
    id: 3, make: 'Nissan', model: 'Sentra', year: 2021, plate: 'GR-9012-21',
    location: 'Accra', owner: 'Michael Brown', transmission: 'Automatic', fuel: 'Petrol',
    seats: 5, mileage: 31000, dailyRate: 160, weeklyRate: 950, monthlyRate: 3700,
    status: 'available', views: CAR_VIEWS,
    damages: ['Cracked windscreen (scheduled for repair)'],
    problems: ['Rear left tire wear'],
  },
  {
    id: 4, make: 'Hyundai', model: 'Elantra', year: 2022, plate: 'GR-3456-22',
    location: 'Tema', owner: 'Grace Owusu', transmission: 'Automatic', fuel: 'Hybrid',
    seats: 5, mileage: 18000, dailyRate: 170, weeklyRate: 1000, monthlyRate: 3900,
    status: 'available', views: CAR_VIEWS,
    damages: ['No visible damage'],
    problems: ['None reported'],
  },
];

export function getVehicle(id: number): Vehicle | undefined {
  return sampleVehicles.find((v) => v.id === id);
}

// ---------- Subscriptions ----------
export interface DriverPlan {
  name: string; monthly: number; yearly: number; insurance: string; freeMedical: boolean; popular?: boolean;
}
export const driverPlans: DriverPlan[] = [
  { name: 'Bronze', monthly: 50, yearly: 500, insurance: 'None. Medical at partner rate.', freeMedical: false },
  { name: 'Silver', monthly: 100, yearly: 1000, insurance: 'Accident 10K. Medical at partner rate.', freeMedical: false },
  { name: 'Gold', monthly: 180, yearly: 1800, insurance: '20K + Med 5K. Free medical.', freeMedical: true, popular: true },
  { name: 'Diamond', monthly: 280, yearly: 2800, insurance: '50K + Med + Income. Free medical.', freeMedical: true },
];

export interface OwnerPlan {
  name: string; vehicles: string; monthly: number; yearly: number;
}
export const ownerPlans: OwnerPlan[] = [
  { name: 'Silver', vehicles: '1–3', monthly: 80, yearly: 800 },
  { name: 'Bronze', vehicles: '4–10', monthly: 200, yearly: 2000 },
  { name: 'Diamond', vehicles: '11–20', monthly: 400, yearly: 4000 },
  { name: 'Gold', vehicles: '21–30', monthly: 650, yearly: 6500 },
  { name: 'Commercial', vehicles: '31–50+', monthly: 1000, yearly: 10000 },
];

// ---------- Medical Exam (Step 2.5) ----------
export interface MedicalTest { n: string; test: string; checks: string; priority: 'Mandatory' | 'Recommended' | 'Optional'; }
export const medicalTests: MedicalTest[] = [
  { n: '1', test: 'Visual Acuity', checks: 'Distance, near, peripheral, color', priority: 'Mandatory' },
  { n: '2', test: 'Blood Pressure', checks: 'Hypertension screen', priority: 'Mandatory' },
  { n: '3', test: 'Blood Sugar', checks: 'Diabetes screen', priority: 'Mandatory' },
  { n: '4', test: 'Hearing', checks: 'Whisper / tuning fork', priority: 'Mandatory' },
  { n: '5', test: 'Physical', checks: 'Heart, reflexes, mobility', priority: 'Mandatory' },
  { n: '6', test: 'Epilepsy', checks: 'History + assessment', priority: 'Mandatory' },
  { n: '7', test: 'Drug / Alcohol', checks: 'Urine screen', priority: 'Recommended' },
  { n: '8', test: 'Mental Health', checks: 'PHQ-2 screening', priority: 'Recommended' },
  { n: '9', test: 'Chest X-Ray', checks: 'TB screen', priority: 'Optional' },
];
export interface FitnessCategory { category: string; action: string; }
export const fitnessCategories: FitnessCategory[] = [
  { category: 'FIT', action: 'Proceed to insurance' },
  { category: 'FIT WITH CONDITIONS', action: 'Proceed, noted in profile, re-exam at renewal' },
  { category: 'TEMPORARILY UNFIT', action: 'Re-exam 30–90 days. Subscription paused.' },
  { category: 'PERMANENTLY UNFIT', action: 'Cannot join. Refunded. May appeal.' },
];
export const medicalSchedule = [
  { when: 'Initial', what: 'Full exam' },
  { when: 'Annual', what: 'Repeat every 12 months' },
  { when: 'Post-Accident', what: 'Re-exam before returning' },
  { when: 'Age 50+', what: 'Every 6 months' },
];

// ---------- 42-Point Inspection ----------
export interface InspectionItem { code: string; item: string; }
export interface InspectionSection { key: string; title: string; items: InspectionItem[]; }
export const inspectionSections: InspectionSection[] = [
  { key: 'A', title: 'Exterior', items: [
    { code: 'A1', item: 'Body / dents' }, { code: 'A2', item: 'Paint' }, { code: 'A3', item: 'Headlights' },
    { code: 'A4', item: 'Tail / brake lights' }, { code: 'A5', item: 'Indicators' }, { code: 'A6', item: 'Windscreen' },
    { code: 'A7', item: 'Mirrors' }, { code: 'A8', item: 'Tires (4)' }, { code: 'A9', item: 'Spare' },
    { code: 'A10', item: 'Wipers' }, { code: 'A11', item: 'Plates' }, { code: 'A12', item: 'Doors' },
  ]},
  { key: 'B', title: 'Interior', items: [
    { code: 'B1', item: 'Dashboard' }, { code: 'B2', item: 'Seatbelts' }, { code: 'B3', item: 'AC' },
    { code: 'B4', item: 'Horn' }, { code: 'B5', item: 'Odometer' }, { code: 'B6', item: 'Fuel level' },
    { code: 'B7', item: 'Interior condition' }, { code: 'B8', item: 'Windows' }, { code: 'B9', item: 'Rear mirror' },
    { code: 'B10', item: 'Boot' },
  ]},
  { key: 'C', title: 'Mechanical', items: [
    { code: 'C1', item: 'Engine start' }, { code: 'C2', item: 'Engine idle' }, { code: 'C3', item: 'Brakes' },
    { code: 'C4', item: 'Steering' }, { code: 'C5', item: 'Gears' }, { code: 'C6', item: 'Clutch' },
    { code: 'C7', item: 'Oil' }, { code: 'C8', item: 'Coolant' }, { code: 'C9', item: 'Brake fluid' },
    { code: 'C10', item: 'Battery' },
  ]},
  { key: 'D', title: 'Safety', items: [
    { code: 'D1', item: 'Fire extinguisher' }, { code: 'D2', item: 'First aid' }, { code: 'D3', item: 'Triangle' },
    { code: 'D4', item: 'Jack' }, { code: 'D5', item: 'GPS' }, { code: 'D6', item: 'Dashcam' },
    { code: 'D7', item: 'Insurance' }, { code: 'D8', item: 'Roadworthy' }, { code: 'D9', item: 'Registration' },
    { code: 'D10', item: 'CarLynk sticker' },
  ]},
];
export const rejectCriteria = [
  'Warning light on', 'Tires below 1.6mm', 'Insurance expired', 'GPS offline', 'Structural damage',
];

// ---------- Emergency / SOS ----------
export interface EmergencyLevel { level: string; type: string; time: string; color: string; }
export const emergencyLevels: EmergencyLevel[] = [
  { level: 'P1', type: 'CRITICAL — accident, fire', time: '2 min', color: '#dc2626' },
  { level: 'P2', type: 'HIGH — theft, tamper', time: '5 min', color: '#ea580c' },
  { level: 'P3', type: 'MEDIUM — breakdown', time: '15 min', color: '#1d4ed8' },
  { level: 'P4', type: 'LOW — warning light', time: '1 hour', color: '#5b6575' },
];
export const emergencyContacts = [
  { name: 'CarLynk Hotline', number: '0XX-XXX-XXXX' },
  { name: 'Police', number: '191' },
  { name: 'Ambulance', number: '193' },
  { name: 'Fire Service', number: '192' },
];
export const p1Protocol = [
  'Stop the vehicle and put on hazard lights',
  'Check for injuries',
  'Call 193 (ambulance) if anyone is hurt',
  'Call 191 (police)',
  'Press the SOS button in the app',
  'Take photos of the scene',
  'Do NOT admit fault to anyone',
];

// ---------- Insurance Claims ----------
export const claimTypes = [
  { claim: 'Vehicle Accident', cover: 'Comprehensive', holder: 'Owner' },
  { claim: 'Theft', cover: 'Comprehensive', holder: 'Owner' },
  { claim: 'Driver Injury', cover: 'Personal Accident', holder: 'Driver' },
  { claim: 'Medical', cover: 'Gold / Diamond', holder: 'Driver' },
  { claim: 'Income Loss', cover: 'Diamond', holder: 'Driver' },
];
export const claimSteps = [
  { step: '1', title: 'Immediate (0–2h)', detail: 'Emergency done. Photos. Police report.' },
  { step: '2', title: 'Evidence (2–24h)', detail: 'Report, photos, dashcam, GPS, 3rd-party details.' },
  { step: '3', title: 'Submit (48h)', detail: 'Form + evidence to insurer. Get reference number.' },
  { step: '4', title: 'Assessment (1–3wk)', detail: 'Insurer inspects. CarLynk attends.' },
  { step: '5', title: 'Payout', detail: 'Repair / Write-off / Appeal.' },
  { step: '6', title: 'Cost Split', detail: 'Driver fault = excess. Other = their insurance. Theft = owner.' },
];

// ---------- Contract Termination ----------
export const terminationTypes = [
  { type: 'Natural Expiry', notice: '14 days (auto)' },
  { type: 'Mutual', notice: '7 days' },
  { type: 'Owner Recall', notice: '14 days' },
  { type: 'Driver Resign', notice: '7 days' },
  { type: 'CarLynk (fraud)', notice: 'Immediate' },
  { type: 'Emergency', notice: '24 hours' },
];

// ---------- Maintenance ----------
export const maintenanceSchedule = [
  { interval: 'Monthly', type: 'Basic self-check (app)', cost: 'Free' },
  { interval: '3 Months', type: 'Standard service', cost: 'GH₵ 400–800' },
  { interval: '6 Months', type: 'Major service', cost: 'GH₵ 1,000–2,000' },
  { interval: '12 Months', type: 'Full overhaul', cost: 'GH₵ 2,500–5,000' },
];
export const partnerMechanics = [
  { name: 'AutoCare Hub — Accra', discount: '25%', services: 'Standard & major service' },
  { name: 'Precision Motors — Tema', discount: '20%', services: 'Engine & transmission' },
  { name: 'CleanDrive Garage — Kumasi', discount: '30%', services: 'Full overhaul & bodywork' },
];

// ---------- Payments (weekly settlement) ----------
export const weeklySettlement = [
  { line: 'A', item: 'Weekly Earnings', ghs: 1750 },
  { line: 'B', item: "Owner's Share", ghs: 700 },
  { line: 'C', item: 'Commission (5%)', ghs: 35 },
  { line: 'D', item: 'Maintenance Fund', ghs: 75 },
  { line: 'E', item: 'Insurance', ghs: 25 },
];
export const settlementTotalDue = 835;
export const driverKeeps = 915;
export const latePaymentTimeline = [
  { day: 'Mon 6PM', action: 'SMS reminder' },
  { day: 'Tue 12PM', action: 'Phone call + owner notified' },
  { day: 'Wed (D3)', action: 'Warning. Restricted.' },
  { day: 'Fri (D5)', action: 'Suspended.' },
  { day: 'Mon (D7)', action: 'Recall. Termination.' },
];

// ---------- Trust Score ----------
export const trustPenalties = [
  { action: 'Driver no notice', penalty: 'GH₵ 200 + trust −15' },
  { action: 'Owner no notice', penalty: '1 week earnings' },
  { action: 'GPS tampering', penalty: 'Auto-suspend + GH₵ 5K' },
  { action: 'Off-platform payment', penalty: 'GH₵ 2K penalty' },
  { action: 'Subletting', penalty: 'Instant ban' },
];
