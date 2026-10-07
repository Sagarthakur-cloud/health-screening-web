import { getDB } from './dbService';

// SHA-256 hash function (browser built-in crypto)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ===== Register New User =====
export async function registerUser({ workerId, name, password, phone, district }) {
  const db = await getDB();

  // Check if workerId already exists
  const existing = await db.get('users', workerId);
  if (existing) {
    throw new Error('This Health Worker ID is already registered');
  }

  // Hash password
  const passwordHash = await hashPassword(password);

  const user = {
    id: workerId,
    workerId,
    name,
    phone: phone || '',
    district: district || '',
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  await db.put('users', user);
  return { workerId, name };
}

// ===== Login User =====
export async function loginUser({ workerId, password }) {
  const db = await getDB();
  const user = await db.get('users', workerId);

  if (!user) {
    throw new Error('No account found with this Health Worker ID');
  }

  const passwordHash = await hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    throw new Error('Incorrect password');
  }

  // Save session (not password)
  const session = {
    workerId: user.workerId,
    name: user.name,
    loginAt: new Date().toISOString(),
  };
  sessionStorage.setItem('session', JSON.stringify(session));

  return session;
}

// ===== Get Current Session =====
export function getSession() {
  const raw = sessionStorage.getItem('session');
  return raw ? JSON.parse(raw) : null;
}

// ===== Logout =====
export function logoutUser() {
  sessionStorage.removeItem('session');
}

// ===== Check if logged in =====
export function isLoggedIn() {
  return !!getSession();
}