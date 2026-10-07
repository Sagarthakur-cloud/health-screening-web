import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function ReferralScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Referral Recommendation" />
      <div style={{ padding: 20 }}>
        <div style={{
          padding: 20, borderRadius: 16,
          background: '#FEE2E2', border: '2px solid #EF4444',
          marginBottom: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <AlertTriangle size={22} color="#991B1B" />
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#991B1B' }}>High Risk Case</h2>
          </div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: '#991B1B', opacity: 0.7, fontWeight: 600 }}>RISK LEVEL</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#991B1B' }}>High</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#991B1B', opacity: 0.7, fontWeight: 600 }}>CONFIDENCE</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#991B1B' }}>92%</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#991B1B', fontWeight: 600, marginBottom: 6 }}>
            Possible Findings:
          </p>
          <ul style={{ fontSize: 12, color: '#991B1B', paddingLeft: 18, lineHeight: 1.8 }}>
            <li>Suspicious lesion detected</li>
            <li>Requires specialist evaluation</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: '#FEF3C7', borderRadius: 14, marginBottom: 16 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#92400E' }}>Refer to Specialist</h3>
          <p style={{ fontSize: 12, color: '#92400E', marginTop: 6, lineHeight: 1.6 }}>
            This patient needs further evaluation by an ophthalmologist at a regional or district health center.
          </p>
        </div>

        <button
          className="btn-primary"
          style={{ background: '#EF4444' }}
          onClick={() => navigate('/dashboard')}
        >
          <Phone size={16} /> Refer to Specialist
        </button>
      </div>
    </div>
  );
}