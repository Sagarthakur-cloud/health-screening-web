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

  if (!q) return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Image Quality Check" />
      <div style={{ padding: 40, textAlign: 'center', color: '#6B7280', fontSize: 13 }}>
        Analyzing quality...
      </div>
    </div>
  );

  const good = q.status === 'good';

  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Image Quality Check" />
      <div style={{ padding: 20 }}>
        {img && <img src={img} alt="captured" style={{ width: '100%', borderRadius: 16, marginBottom: 16 }} />}

        <div style={{
          padding: 16, borderRadius: 14,
          background: good ? '#D1FAE5' : '#FEE2E2',
          border: `1.5px solid ${good ? '#10B981' : '#EF4444'}`,
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {good ? <CheckCircle2 size={20} color="#065F46" /> : <AlertTriangle size={20} color="#991B1B" />}
            <h3 style={{ fontSize: 15, fontWeight: 700, color: good ? '#065F46' : '#991B1B', flex: 1 }}>
              {good ? 'Good Quality' : 'Poor Quality'}
            </h3>
            <span style={{ fontSize: 12, color: good ? '#065F46' : '#991B1B', fontWeight: 600 }}>
              {q.score}/100
            </span>
          </div>
          {!good && (
            <p style={{ fontSize: 12, marginTop: 10, color: '#991B1B' }}>
              {q.reason}
            </p>
          )}
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