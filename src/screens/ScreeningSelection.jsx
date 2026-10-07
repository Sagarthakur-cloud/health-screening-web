import { useNavigate } from 'react-router-dom';
import { Eye, Users, Info } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function ScreeningSelection() {
  const navigate = useNavigate();

  const Card = ({ type, title, desc, Icon, color }) => (
    <button
      onClick={() => { sessionStorage.setItem('type', type); navigate('/camera'); }}
      style={{
        width: '100%', background: color, color: 'white',
        padding: 24, borderRadius: 18, marginBottom: 16,
        cursor: 'pointer', border: 'none', textAlign: 'left',
        display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'inherit',
        transition: 'transform 0.2s',
      }}
    >
      <Icon size={36} strokeWidth={1.6} />
      <div>
        <h3 style={{ fontSize: 17, fontWeight: 700 }}>{title}</h3>
        <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{desc}</p>
      </div>
    </button>
  );

  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Select Screening Type" />
      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 20 }}>
          Choose the type of screening for this patient
        </p>
        <Card type="dr" title="Diabetic Retinopathy" desc="Eye screening for diabetes-related vision damage" Icon={Eye} color="#0F52BA" />
        <Card type="oral" title="Oral Cancer" desc="Screening for suspicious lesions in mouth" Icon={Users} color="#10B981" />

        <div style={{
          marginTop: 24, padding: 14, background: '#EFF6FF',
          borderRadius: 12, fontSize: 12, color: '#1E40AF',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
          <span>Both screenings are done using AI analysis. No internet required.</span>
        </div>
      </div>
    </div>
  );
}