import { openDB } from 'idb';

const DB_NAME = 'health-screening';
const DB_VERSION = 2;

let dbPromise = null;

function createDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion) {
      console.log(`[DB] Upgrade: v${oldVersion} → v${newVersion}`);

      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
        console.log('[DB] Created store: users');
      }

      if (!db.objectStoreNames.contains('patients')) {
        db.createObjectStore('patients', { keyPath: 'id' });
        console.log('[DB] Created store: patients');
      }

      if (!db.objectStoreNames.contains('results')) {
        db.createObjectStore('results', { keyPath: 'id' });
        console.log('[DB] Created store: results');
      }

      if (!db.objectStoreNames.contains('syncQueue')) {
        db.createObjectStore('syncQueue', {
          keyPath: 'id',
          autoIncrement: true,
        });
        console.log('[DB] Created store: syncQueue');
      }
    },
    blocked() {
      console.warn('[DB] Upgrade blocked. Close other tabs.');
    },
    blocking() {
      console.warn('[DB] This tab is blocking a newer version. Reloading...');
      if (dbPromise) {
        dbPromise.then((d) => d.close()).catch(() => {});
        dbPromise = null;
      }
    },
    terminated() {
      console.warn('[DB] Connection terminated unexpectedly.');
      dbPromise = null;
    },
  });
}

export function getDB() {
  if (!dbPromise) {
    dbPromise = createDB();
  }
  return dbPromise;
}

// ============ Users (Auth) ============
export async function saveUser(user) {
  const db = await getDB();
  await db.put('users', user);
  return user.id;
}

export async function getUser(id) {
  const db = await getDB();
  return db.get('users', id);
}

export async function getAllUsers() {
  const db = await getDB();
  return db.getAll('users');
}

export async function deleteUser(id) {
  const db = await getDB();
  await db.delete('users', id);
}

// ============ Patients ============
export async function savePatient(patient) {
  const db = await getDB();
  const id = patient.patientId || patient.id || Date.now().toString();
  await db.put('patients', { ...patient, id });
  return id;
}

export async function getAllPatients() {
  const db = await getDB();
  return db.getAll('patients');
}

export async function getPatient(id) {
  const db = await getDB();
  return db.get('patients', id);
}

// ============ Results ============
export async function saveResult(result) {
  const db = await getDB();
  await db.put('results', result);
  await db.add('syncQueue', { ...result, syncStatus: 'pending' });
  return result.id;
}

export async function getAllResults() {
  const db = await getDB();
  return db.getAll('results');
}

export async function getResult(id) {
  const db = await getDB();
  return db.get('results', id);
}

export async function markSynced(id) {
  const db = await getDB();
  const r = await db.get('results', id);
  if (r) {
    await db.put('results', { ...r, syncStatus: 'synced' });
  }
}

// ============ Sync Queue ============
export async function getPendingSync() {
  const db = await getDB();
  return db.getAll('syncQueue');
}

export async function removeFromSyncQueue(id) {
  const db = await getDB();
  await db.delete('syncQueue', id);
}

export async function clearSyncQueue() {
  const db = await getDB();
  await db.clear('syncQueue');
}

// ============ Debug Helpers ============
export async function listStores() {
  const db = await getDB();
  return Array.from(db.objectStoreNames);
}