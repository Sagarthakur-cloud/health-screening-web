import { useNavigate } from 'react-router-dom';
import { theme } from '../theme';

export default function Header({ title, showBack = true }) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      padding: theme.spacing.md,
      borderBottom: '1px solid #eee',
      background: 'white',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      {showBack && (
        <button onClick={() => navigate(-1)}
          style={{
            background: 'none', border: 'none',
            fontSize: '1.5rem', minWidth: 40, padding: 0,
          }}>
          ←
        </button>
      )}
      <h2 style={{ flex: 1, textAlign: 'center', fontSize: '1.1rem' }}>{title}</h2>
      <div style={{ width: 40 }} />
    </div>
  );
}