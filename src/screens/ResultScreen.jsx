import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Info, Check } from 'lucide-react';
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
    const stored = sessionStorage.getItem('result');
    setR(stored ? JSON.parse(stored) : null);
    setImg(sessionStorage.getItem('captured'));
  }, []);

  if (!r || !r.length) return <div className="screen" style={{ padding: 40, textAlign: 'center' }}><p>Loading result...</p></div>;

  const max = r.indexOf(Math.max(...r));
  const conf = (r[max] * 100).toFixed(0);
  const high = max >= 2;

  const save = async () => {
    const p = JSON.parse(sessionStorage.getItem('patient') || '{}');
    await saveResult({
      id: Date.now().toString(),
      patientId: p.patientId || 'Unknown',
      patientName: p.name || 'Unknown',
      severity: max, label: LABELS[max],
      confidence: parseFloat(conf),
      date: new Date().toISOString(),
      syncStatus: 'pending',
    });
    setSaved(true);
  };

  return (
    <div className="screen">
      <ScreenHeader title="Screening Result" />
      <div className="screen-body">
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', marginBottom: 16, boxShadow: '0 8px 24px rgba(15,23,42,0.1)' }}>
          {img && <img src={img} alt="result" style={{ width: '100%', display: 'block' }} />}
          {high && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at 60% 45%, rgba(239,68,68,0.45) 0%, rgba(245,158,11,0.25) 35%, transparent 65%)',
              mixBlendMode: 'multiply',
            }} />
          )}
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, color: '#475569' }}>
            Heatmap
          </div>
        </div>

        <div style={{ padding: 18, borderRadius: 16, background: high ? '#fee2e2' : '#fef3c7', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {high ? <AlertTriangle size={22} color="#991b1b" /> : <Info size={22} color="#92400e" />}
            <h3 style={{ fontSize: 17, fontWeight: 800, color: high ? '#991b1b' : '#92400e', letterSpacing: '-0.01em' }}>
              {LABELS[max]}
            </h3>
          </div>
          <p style={{ fontSize: 13, marginTop: 12, color: high ? '#991b1b' : '#92400e', fontWeight: 600 }}>
            Confidence Score: <strong>{conf}%</strong>
          </p>
          <p style={{ fontSize: 13, marginTop: 8, color: high ? '#991b1b' : '#92400e', fontWeight: 500, lineHeight: 1.5 }}>
            <strong>What this means:</strong> {DESC[max]}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={save} disabled={saved}>
            {saved ? <><Check size={16} /> Saved</> : 'Save Result'}
          </button>
          <button className="btn-primary" onClick={() => navigate(high ? '/referral' : '/dashboard')}>
            {high ? 'Refer Specialist' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}