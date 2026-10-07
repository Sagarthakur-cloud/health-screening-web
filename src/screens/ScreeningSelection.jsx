import { useNavigate } from 'react-router-dom';
import { Eye, Sparkles, Info } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function ScreeningSelection() {
  const navigate = useNavigate();

  const Card = ({ type, title, desc, Icon, gradient, shadow }) => (
    <button onClick={() => { sessionStorage.setItem('type', type); navigate('/camera'); }}
      style={{
        width: '100%', background: gradient, color: 'white',
        padding: 22, borderRadius: 20, marginBottom: 14,
        cursor: 'pointer', border: 'none', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 12,
        fontFamily: 'inherit', boxShadow: shadow, transition: 'transform 0.15s',
      }}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}>
      <Icon size={34} strokeWidth={1.8} />
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ fontSize: 12, opacity: 0.9, marginTop: 4, fontWeight: 500 }}>{desc}</p>
      </div>
    </button>
  );

  return (
    <div className="screen">
      <ScreenHeader title="Select Screening" />
      <div className="screen-body">
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 18, fontWeight: 500 }}>
          Choose the type of screening for this patient
        </p>
        <Card type="dr" title="Diabetic Retinopathy" desc="Eye screening for diabetes-related vision damage" Icon={Eye}
          gradient="linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)" shadow="0 8px 24px rgba(37, 99, 235, 0.3)" />
        <Card type="oral" title="Oral Cancer" desc="Screening for suspicious lesions in mouth" Icon={Sparkles}
          gradient="linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)" shadow="0 8px 24px rgba(15, 118, 110, 0.3)" />

        <div style={{ marginTop: 20, padding: 14, background: '#eff6ff', borderRadius: 14, fontSize: 12, color: '#1e40af', display: 'flex', gap: 10, alignItems: 'flex-start', fontWeight: 500 }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Both screenings are done using AI analysis. No internet required.</span>
        </div>
      </div>
    </div>
  );
}