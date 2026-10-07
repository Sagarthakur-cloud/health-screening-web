import { getPendingSync, getDB } from './dbService';

export async function syncPending() {
  const queue = await getPendingSync();
  if (queue.length === 0) return { synced: 0, failed: 0 };

  let synced = 0, failed = 0;
  const db = await getDB();

  for (const record of queue) {
    try {
      // Yahan apna Django/Vercel API URL daalo
      const res = await fetch('https://your-api.com/api/sync/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) {
        await db.delete('syncQueue', record.id);
        synced++;
      } else {
        failed++;
      }
    } catch (e) {
      failed++;
    }
  }
  return { synced, failed };
}