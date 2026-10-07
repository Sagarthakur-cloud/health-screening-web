// src/screens/DashboardScreen.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Users, AlertTriangle, Cloud, CheckCircle2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getAllResults } from '../services/dbService';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 28, high: 3, pending: 12, synced: 16 });
  const workerId = sessionStorage.getItem('workerId') || 'HW-001';

  useEffect(() => {
    getAllResults().then(r => {
      if (r.length > 0) {
        setStats({
          total: r.length,
          high: r.filter(x => x.severity >= 2).length,
          pending: r.filter(x => x.syncStatus === 'pending').length,
          synced: r.filter(x => x.syncStatus === 'synced').length,
        });
      }
    });
  }, []);

  const Stat = ({ value, label, color }) => (
    <div className="stat-card" style={{ flex: 1 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>{label}</div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 90, background: '#F6F8FC', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'white', padding: '20px 20px 16px', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 18, fontWeight: 700 }}>Hello, Health Worker</h1>
            <p style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>ID: {workerId}</p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: '#0F52BA', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 16, fontWeight: 600 }}>
              {workerId.charAt(0)}
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {/* Stats Grid */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <Stat value={stats.total} label="Total Screenings" color="#0F52BA" />
          <Stat value={stats.high} label="High Risk Cases" color="#EF4444" />
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <Stat value={stats.pending} label="Pending Sync" color="#F59E0B" />
          <Stat value={stats.synced} label="Synced Today" color="#10B981" />
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Quick Actions</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => { sessionStorage.setItem('type', 'dr'); navigate('/register'); }}
            style={{
              flex: 1, padding: '24px 16px', background: '#0F52BA',
              color: 'white', borderRadius: 16, border: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10, cursor: 'pointer',
            }}
          >
            <Eye size={28} strokeWidth={1.8} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Eye Screening</span>
            <span style={{ fontSize: 10, opacity: 0.75 }}>Diabetic Retinopathy</span>
          </button>
          <button
            onClick={() => { sessionStorage.setItem('type', 'oral'); navigate('/register'); }}
            style={{
              flex: 1, padding: '24px 16px', background: '#10B981',
              color: 'white', borderRadius: 16, border: 'none',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10, cursor: 'pointer',
            }}
          >
            <Users size={28} strokeWidth={1.8} />
            <span style={{ fontSize: 12, fontWeight: 600 }}>Oral Screening</span>
            <span style={{ fontSize: 10, opacity: 0.75 }}>Oral Cancer</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}