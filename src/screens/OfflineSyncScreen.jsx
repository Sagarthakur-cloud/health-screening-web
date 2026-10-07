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

  const refresh = async () => {
    const p = await getPendingSync();
    const all = await getAllResults();
    setPending(p.length);
    setSynced(all.filter(r => r.syncStatus === 'synced').length);
  };

  useEffect(() => {
    refresh();
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  const doSync = async () => {
    setSyncing(true);
    try {
      const r = await syncPending();
      await refresh();
      alert(`Synced: ${r.synced}, Failed: ${r.failed}`);
    } catch (e) { alert('Sync failed: ' + e.message); }
    setSyncing(false);
  };

  return (
    <div className="screen">
      <ScreenHeader title="Sync" showBack={false} />
      <div className="screen-body">
        <div style={{
          padding: 20, borderRadius: 20, textAlign: 'center', marginBottom: 16,
          background: online ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          boxShadow: online ? '0 8px 24px rgba(34,197,94,0.15)' : '0 8px 24px rgba(245,158,11,0.15)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
            {online ? <Cloud size={36} color="#15803d" strokeWidth={1.8} /> : <CloudOff size={36} color="#92400e" strokeWidth={1.8} />}
          </div>
          <h3 style={{ fontSize: 15, fontWeight: 800, color: online ? '#15803d' : '#92400e' }}>{online ? 'Online' : 'Offline Mode'}</h3>
          <p style={{ fontSize: 12, color: online ? '#15803d' : '#92400e', marginTop: 6, opacity: 0.85, fontWeight: 500, lineHeight: 1.5 }}>
            {online ? 'Connected. Your data will sync automatically.' : 'No internet. Data will sync when connection returns.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, background: 'white', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
            <Cloud size={20} color="#ea580c" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 26, fontWeight: 800, color: '#ea580c', letterSpacing: '-0.03em' }}>{pending}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, fontWeight: 600 }}>Pending Sync</div>
          </div>
          <div style={{ flex: 1, background: 'white', borderRadius: 16, padding: 16, textAlign: 'center', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
            <CheckCircle2 size={20} color="#16a34a" style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: 26, fontWeight: 800, color: '#16a34a', letterSpacing: '-0.03em' }}>{synced}</div>
            <div style={{ fontSize: 11, color: '#64748b', marginTop: 2, fontWeight: 600 }}>Synced</div>
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