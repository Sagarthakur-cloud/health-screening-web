import { useNavigate } from 'react-router-dom';
import { Wifi, Cpu, HardDrive, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScreenHeader from '../components/ScreenHeader';
import { getSession, logoutUser } from '../services/authService';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const session = getSession();
  const workerId = session?.workerId || 'HW-001';
  const userName = session?.name || 'Health Worker';

  const items = [
    { Icon: Wifi, label: 'Device Status', value: navigator.onLine ? 'Online' : 'Offline', color: navigator.onLine ? '#16a34a' : '#ea580c' },
    { Icon: Cpu, label: 'Model Version', value: 'v1.0.0' },
    { Icon: HardDrive, label: 'App Storage', value: '2.1MB / 5MB' },
    { Icon: Globe, label: 'Language', value: 'English' },
    { Icon: HelpCircle, label: 'Help & Support', value: '' },
  ];

  const handleLogout = () => {
    if (confirm('Logout from this device?')) {
      logoutUser();
      navigate('/');
    }
  };

  return (
    <div className="screen">
      <ScreenHeader title="Profile" showBack={false} />
      <div className="screen-body">
        <div style={{
          padding: 24,
          background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
          color: 'white', borderRadius: 20, textAlign: 'center', marginBottom: 20,
          boxShadow: '0 12px 32px rgba(37,99,235,0.25)',
        }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px', fontSize: 28, fontWeight: 800,
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(255,255,255,0.3)',
          }}>
            {userName.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>{userName}</h3>
          <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4, fontWeight: 500 }}>ID: {workerId}</p>
        </div>

        <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
          {items.map(({ Icon, label, value, color }, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '16px 18px',
              borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none',
              cursor: 'pointer',
            }}>
              <Icon size={18} color="#64748b" strokeWidth={2.2} />
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{label}</span>
              {value && <span style={{ fontSize: 12, color: color || '#64748b', fontWeight: 700 }}>{value}</span>}
              <ChevronRight size={16} color="#cbd5e1" />
            </div>
          ))}
        </div>

        <button onClick={handleLogout}
          style={{
            width: '100%', height: 52, marginTop: 20,
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#dc2626', borderRadius: 16, border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit',
          }}>
          <LogOut size={16} /> Logout
        </button>

        <p style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', marginTop: 24, fontWeight: 500, lineHeight: 1.6 }}>
          Dr. Screen v1.0.2<br />Authorized for ASHA & Health Workers Only
        </p>
      </div>
      <BottomNav />
    </div>
  );
}