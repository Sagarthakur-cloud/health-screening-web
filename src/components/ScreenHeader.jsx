import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ScreenHeader({ title, showBack = true, backTo, rightAction }) {
  const navigate = useNavigate();
  const handleBack = () => { if (backTo) navigate(backTo); else navigate(-1); };

  return (
    <div className="screen-header">
      {showBack ? (
        <button className="back-btn" onClick={handleBack} aria-label="Go back">
          <ArrowLeft size={20} strokeWidth={2.2} />
        </button>
      ) : <div style={{ width: 36 }} />}
      <h1 className="screen-title">{title}</h1>
      <div style={{ width: 36, display: 'flex', justifyContent: 'flex-end' }}>{rightAction}</div>
    </div>
  );
}