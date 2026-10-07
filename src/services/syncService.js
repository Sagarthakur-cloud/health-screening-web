import { getPendingSync, getDB, markSynced } from './dbService';

export async function syncPending() {
  const queue = await getPendingSync();
  if (queue.length === 0) return { synced: 0, failed: 0 };

  let synced = 0, failed = 0;
  const db = await getDB();

  for (const record of queue) {
    try {
      const res = await fetch('https://your-api.com/api/sync/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (res.ok) {
        await db.delete('syncQueue', record.id);
        await markSynced(record.id);
        synced++;
      } else failed++;
    } catch (e) { failed++; }
  }
  return { synced, failed };
}