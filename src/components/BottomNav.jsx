import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ClipboardList, RefreshCw, User, UserPlus } from 'lucide-react';

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
          <button
            key={path}
            onClick={() => navigate(path)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              color: active ? '#0F52BA' : '#9CA3AF',
              fontSize: 10,
              fontWeight: 500,
              minWidth: 56,
              cursor: 'pointer',
              padding: 4,
              transition: 'color 0.2s',
              fontFamily: 'inherit',
            }}
          >
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}