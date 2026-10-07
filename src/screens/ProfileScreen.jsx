import { Wifi, Cpu, HardDrive, Globe, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScreenHeader from '../components/ScreenHeader';

export default function ProfileScreen() {
  const workerId = sessionStorage.getItem('workerId') || 'HW-001';

  const items = [
    { Icon: Wifi, label: 'Device Status', value: navigator.onLine ? 'Online' : 'Offline', color: navigator.onLine ? '#10B981' : '#F59E0B' },
    { Icon: Cpu, label: 'Model Version', value: 'v1.0.0' },
    { Icon: HardDrive, label: 'App Storage', value: '2.1MB / 5MB' },
    { Icon: Globe, label: 'Language', value: 'English' },
    { Icon: HelpCircle, label: 'Help & Support', value: '' },
  ];

  return (
    <div style={{ paddingBottom: 100, background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Profile & Settings" showBack={false} />
      <div style={{ padding: 20 }}>
        <div style={{
          padding: 24, background: 'linear-gradient(135deg, #0F52BA, #0A3D8F)',
          color: 'white', borderRadius: 16, textAlign: 'center', marginBottom: 20,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px', fontSize: 24, fontWeight: 700,
          }}>
            {workerId.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>Ramesh Kumar</h3>
          <p style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>ID: {workerId}</p>
        </div>

        {items.map(({ Icon, label, value, color }, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: 16, background: 'white', borderRadius: 12, marginBottom: 8,
            cursor: 'pointer',
          }}>
            <Icon size={18} color="#6B7280" />
            <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: 12, color: color || '#6B7280', fontWeight: 600 }}>{value}</span>
            <ChevronRight size={16} color="#D1D5DB" />
          </div>
        ))}

        <button style={{
          width: '100%', height: 52, marginTop: 20,
          background: '#FEE2E2', color: '#EF4444',
          borderRadius: 14, border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <LogOut size={16} /> Logout
        </button>
      </div>
      <BottomNav />
    </div>
  );
}