import { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import ScreenHeader from '../components/ScreenHeader';
import { getAllResults } from '../services/dbService';

const LABELS = ['Normal', 'Mild', 'Moderate', 'High Risk', 'Proliferative'];
const COLORS = {
  bg: ['#D1FAE5', '#FEF3C7', '#FEF3C7', '#FEE2E2', '#FEE2E2'],
  fg: ['#065F46', '#92400E', '#92400E', '#991B1B', '#991B1B'],
};

export default function HistoryScreen() {
  const [results, setResults] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => { getAllResults().then(setResults); }, []);

  const filtered = filter === 'all' ? results : results.filter(r => r.severity >= 2);

  return (
    <div style={{ paddingBottom: 100, background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Screening History" showBack={false} />
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button onClick={() => setFilter('all')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 10,
              border: 'none', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              background: filter === 'all' ? '#0F52BA' : '#E5E7EB',
              color: filter === 'all' ? 'white' : '#374151',
            }}>All</button>
          <button onClick={() => setFilter('high')}
            style={{
              flex: 1, padding: '10px 0', borderRadius: 10,
              border: 'none', fontSize: 13, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'inherit',
              background: filter === 'high' ? '#EF4444' : '#E5E7EB',
              color: filter === 'high' ? 'white' : '#374151',
            }}>High Risk</button>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9CA3AF' }}>
            <ClipboardList size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <p style={{ fontSize: 13 }}>No records yet</p>
          </div>
        ) : filtered.map(r => (
          <div key={r.id} className="card" style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: 14, color: '#111827' }}>{r.patientId}</strong>
                <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                  {r.patientName || 'Unknown'} • {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <span style={{
                padding: '4px 10px', borderRadius: 999,
                fontSize: 10, fontWeight: 600,
                background: COLORS.bg[r.severity],
                color: COLORS.fg[r.severity],
              }}>
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