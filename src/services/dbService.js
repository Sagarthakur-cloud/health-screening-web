import { openDB } from 'idb';

let dbPromise = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = openDB('health-screening', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('patients'))
          db.createObjectStore('patients', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('results'))
          db.createObjectStore('results', { keyPath: 'id' });
        if (!db.objectStoreNames.contains('syncQueue'))
          db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
      }
    });
  }
  return dbPromise;
}

export async function savePatient(patient) {
  const db = await getDB();
  await db.put('patients', patient);
}

export async function saveResult(result) {
  const db = await getDB();
  await db.put('results', result);
  await db.add('syncQueue', { ...result, syncStatus: 'pending' });
}

export async function getAllResults() {
  const db = await getDB();
  return db.getAll('results');
}

export async function getAllPatients() {
  const db = await getDB();
  return db.getAll('patients');
}

export async function getPendingSync() {
  const db = await getDB();
  return db.getAll('syncQueue');
}

export async function clearSyncQueue() {
  const db = await getDB();
  await db.clear('syncQueue');
}