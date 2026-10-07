import { useNavigate, useLocation } from 'react-router-dom';
import { Home, UserPlus, ClipboardList, RefreshCw, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const tabs = [
    { path: '/dashboard', label: 'Home', Icon: Home },
    { path: '/register', label: 'Register', Icon: UserPlus },
    { path: '/history', label: 'History', Icon: ClipboardList },
    { path: '/sync', label: 'Sync', Icon: RefreshCw },
    { path: '/profile', label: 'Profile', Icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map(({ path, label, Icon }) => {
        const active = pathname === path;
        return (
          <button key={path} onClick={() => navigate(path)}
            style={{
              background: 'none', border: 'none',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              color: active ? '#2563eb' : '#94a3b8',
              fontSize: 10, fontWeight: 600, minWidth: 56,
              cursor: 'pointer', padding: '4px 8px',
              fontFamily: 'inherit', transition: 'color 0.2s',
            }}>
            <Icon size={22} strokeWidth={active ? 2.5 : 2} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}