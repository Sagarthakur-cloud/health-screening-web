import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScreenHeader from '../components/ScreenHeader';
import { getAllResults } from '../services/dbService';

const LABELS = ['Normal', 'Mild', 'Moderate', 'High Risk', 'Proliferative'];
const COLORS = {
  bg: ['#dcfce7', '#fef3c7', '#fef3c7', '#fee2e2', '#fee2e2'],
  fg: ['#15803d', '#92400e', '#92400e', '#991b1b', '#991b1b'],
};

export default function HistoryScreen() {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllResults().then(r => {
      setResults(r.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    });
  }, []);

  const filtered = filter === 'all' ? results : results.filter(r => r.severity >= 2);

  return (
    <div className="screen">
      <ScreenHeader title="History" showBack={false} />
      <div className="screen-body">
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={() => setFilter('all')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 12, border: 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              background: filter === 'all' ? '#2563eb' : 'white',
              color: filter === 'all' ? 'white' : '#64748b',
              boxShadow: filter === 'all' ? '0 4px 12px rgba(37,99,235,0.25)' : '0 1px 3px rgba(15,23,42,0.04)',
              transition: 'all 0.2s',
            }}>All</button>
          <button onClick={() => setFilter('high')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 12, border: 'none',
              fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
              background: filter === 'high' ? '#dc2626' : 'white',
              color: filter === 'high' ? 'white' : '#64748b',
              boxShadow: filter === 'high' ? '0 4px 12px rgba(220,38,38,0.25)' : '0 1px 3px rgba(15,23,42,0.04)',
              transition: 'all 0.2s',
            }}>High Risk</button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 13 }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
            <ClipboardList size={44} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: 13, fontWeight: 600 }}>No records yet</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Screenings will appear here</p>
          </div>
        ) : filtered.map(r => (
          <div key={r.id} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 10, boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ fontSize: 14, color: '#0f172a', display: 'block' }}>{r.patientId}</strong>
                <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 3, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.patientName || 'Unknown'} • {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <span style={{ padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '0.02em', background: COLORS.bg[r.severity], color: COLORS.fg[r.severity], whiteSpace: 'nowrap', marginLeft: 12 }}>
                {LABELS[r.severity]}
              </span>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}