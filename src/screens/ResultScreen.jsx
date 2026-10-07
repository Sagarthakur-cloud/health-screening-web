import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { saveResult } from '../services/dbService';

const LABELS = ['No DR', 'Mild', 'Moderate', 'Severe', 'Proliferative'];
const DESC = [
  'No signs of diabetic retinopathy detected.',
  'Mild signs detected. Follow-up recommended.',
  'Moderate signs detected. Specialist consultation recommended.',
  'Severe signs detected. Urgent referral needed.',
  'Proliferative stage. Immediate specialist referral needed.',
];

export default function ResultScreen() {
  const navigate = useNavigate();
  const [r, setR] = useState(null);
  const [img, setImg] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setR(JSON.parse(sessionStorage.getItem('result') || '[]'));
    setImg(sessionStorage.getItem('captured'));
  }, []);

  if (!r || !r.length) return <div style={{ padding: 40 }}>Loading...</div>;

  const max = r.indexOf(Math.max(...r));
  const conf = (r[max] * 100).toFixed(0);
  const high = max >= 2;

  const save = async () => {
    const p = JSON.parse(sessionStorage.getItem('patient') || '{}');
    await saveResult({
      id: Date.now().toString(),
      patientId: p.patientId, patientName: p.name,
      severity: max, label: LABELS[max],
      confidence: parseFloat(conf),
      date: new Date().toISOString(), syncStatus: 'pending',
    });
    setSaved(true);
  };

  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh', paddingBottom: 20 }}>
      <ScreenHeader title="Screening Result" />
      <div style={{ padding: 20 }}>
        {/* Heatmap overlay */}
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
          {img && <img src={img} alt="result" style={{ width: '100%', display: 'block' }} />}
          {high && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 60% 45%, rgba(239,68,68,0.45) 0%, rgba(245,158,11,0.25) 35%, transparent 65%)',
              mixBlendMode: 'multiply',
            }} />
          )}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
            padding: '4px 10px', borderRadius: 999, fontSize: 10,
            fontWeight: 600, color: '#374151',
          }}>
            Heatmap
          </div>
        </div>

        {/* Result Card */}
        <div style={{
          padding: 16, borderRadius: 14,
          background: high ? '#FEE2E2' : '#FEF3C7',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {high ? <AlertTriangle size={20} color="#991B1B" /> : <Info size={20} color="#92400E" />}
            <h3 style={{ fontSize: 16, fontWeight: 700, color: high ? '#991B1B' : '#92400E' }}>
              {LABELS[max]}
            </h3>
          </div>
          <p style={{ fontSize: 13, marginTop: 12, color: high ? '#991B1B' : '#92400E' }}>
            <strong>Confidence Score:</strong> {conf}%
          </p>
          <p style={{ fontSize: 13, marginTop: 8, color: high ? '#991B1B' : '#92400E' }}>
            <strong>What this means:</strong> {DESC[max]}
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={save} disabled={saved}>
            {saved ? 'Saved ✓' : 'Save Result'}
          </button>
          <button className="btn-primary" onClick={() => navigate(high ? '/referral' : '/dashboard')}>
            {high ? 'Refer to Specialist' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}