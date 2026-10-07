import { useNavigate } from 'react-router-dom';

export default function ScreenHeader({ title, showBack = true, rightAction }) {
  const navigate = useNavigate();
  return (
    <div className="screen-header">
      {showBack ? (
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
      ) : <div style={{ width: 32 }} />}
      <h1 className="screen-title">{title}</h1>
      <div style={{ width: 32 }}>{rightAction}</div>
    </div>
  );
}