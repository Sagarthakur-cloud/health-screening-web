import { useEffect, useState } from 'react';
import { RefreshCw, CheckCircle2, Cloud, CloudOff } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScreenHeader from '../components/ScreenHeader';
import { getAllResults, getPendingSync } from '../services/dbService';
import { syncPending } from '../services/syncService';

export default function OfflineSyncScreen() {
  const [pending, setPending] = useState(0);
  const [synced, setSynced] = useState(0);
  const [online, setOnline] = useState(navigator.onLine);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await getPendingSync();
      const all = await getAllResults();
      setPending(p.length);
      setSynced(all.filter(r => r.syncStatus === 'synced').length);
    })();
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  const doSync = async () => {
    setSyncing(true);
    const r = await syncPending();
    setSyncing(false);
    setPending(p => Math.max(0, p - r.synced));
    alert(`Synced: ${r.synced}, Failed: ${r.failed}`);
  };

  return (
    <div style={{ paddingBottom: 100, background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Offline Sync" showBack={false} />
      <div style={{ padding: 20 }}>
        <div style={{
          padding: 20, borderRadius: 14, textAlign: 'center', marginBottom: 16,
          background: online ? '#D1FAE5' : '#FEF3C7',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
            {online ? <Cloud size={32} color="#065F46" /> : <CloudOff size={32} color="#92400E" />}
          </div>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: online ? '#065F46' : '#92400E' }}>
            {online ? 'Online Mode' : 'Offline Mode'}
          </h3>
          <p style={{ fontSize: 12, color: online ? '#065F46' : '#92400E', marginTop: 6, opacity: 0.85 }}>
            {online
              ? 'You are online. Data will sync automatically when available.'
              : 'No internet connection. Data will sync automatically when a connection is available.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <div className="stat-card" style={{ flex: 1 }}>
            <Cloud size={18} color="#F59E0B" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color: '#F59E0B' }}>{pending}</div>
            <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2, fontWeight: 500 }}>Pending Sync</div>
          </div>
          <div className="stat-card" style={{ flex: 1 }}>
            <CheckCircle2 size={18} color="#10B981" style={{ marginBottom: 6 }} />
            <div style={{ fontSize: 22, fontWeight: 700, color: '#10B981' }}>{synced}</div>
            <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2, fontWeight: 500 }}>Synced</div>
          </div>
        </div>

        <button className="btn-primary" disabled={!online || syncing} onClick={doSync}>
          <RefreshCw size={16} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync Now'}
        </button>
      </div>
      <BottomNav />
    </div>
  );
}