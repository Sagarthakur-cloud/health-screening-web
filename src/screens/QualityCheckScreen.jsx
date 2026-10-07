import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { checkQuality } from '../services/qualityService';

export default function QualityCheckScreen() {
  const navigate = useNavigate();
  const [q, setQ] = useState(null);
  const [img, setImg] = useState(null);

  useEffect(() => {
    const i = sessionStorage.getItem('captured');
    setImg(i);
    if (i) checkQuality(i).then(setQ);
  }, []);

  if (!q) {
    return (
      <div className="screen">
        <ScreenHeader title="Image Quality" />
        <div className="screen-body" style={{ textAlign: 'center', color: '#64748b', fontSize: 13, fontWeight: 500, paddingTop: 40 }}>
          Analyzing quality...
        </div>
      </div>
    );
  }

  const good = q.status === 'good';

  return (
    <div className="screen">
      <ScreenHeader title="Image Quality" />
      <div className="screen-body">
        {img && (
          <img src={img} alt="captured"
            style={{ width: '100%', borderRadius: 20, marginBottom: 16, boxShadow: '0 8px 24px rgba(15,23,42,0.08)' }} />
        )}

        <div style={{
          padding: 16, borderRadius: 16,
          background: good ? '#dcfce7' : '#fee2e2',
          border: `1.5px solid ${good ? '#22c55e' : '#ef4444'}`,
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {good ? <CheckCircle2 size={22} color="#15803d" /> : <AlertTriangle size={22} color="#991b1b" />}
            <h3 style={{ fontSize: 15, fontWeight: 800, flex: 1, color: good ? '#15803d' : '#991b1b' }}>
              {good ? 'Good Quality' : 'Poor Quality'}
            </h3>
            <span style={{ fontSize: 13, color: good ? '#15803d' : '#991b1b', fontWeight: 700 }}>
              {q.score}/100
            </span>
          </div>
          {!good && <p style={{ fontSize: 12, marginTop: 10, color: '#991b1b', fontWeight: 500 }}>{q.reason}</p>}
        </div>

        <button className="btn-secondary" onClick={() => navigate('/camera')} style={{ marginBottom: 10 }}>
          <RefreshCw size={16} /> Retake Image
        </button>
        <button className="btn-primary" disabled={!good} onClick={() => navigate('/analysis')}>
          Use This Image
        </button>
      </div>
    </div>
  );
}