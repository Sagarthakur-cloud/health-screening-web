import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Phone, ArrowRight } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function ReferralScreen() {
  const navigate = useNavigate();
  return (
    <div className="screen">
      <ScreenHeader title="Referral" />
      <div className="screen-body">
        <div style={{
          padding: 20, borderRadius: 20,
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          border: '2px solid #ef4444', marginBottom: 16,
          boxShadow: '0 8px 24px rgba(239,68,68,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle size={22} color="#991b1b" />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#991b1b', letterSpacing: '-0.02em' }}>High Risk Case</h2>
          </div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: '#991b1b', opacity: 0.75, fontWeight: 700, letterSpacing: '0.05em' }}>RISK LEVEL</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#991b1b', marginTop: 2 }}>High</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#991b1b', opacity: 0.75, fontWeight: 700, letterSpacing: '0.05em' }}>CONFIDENCE</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#991b1b', marginTop: 2 }}>92%</div>
            </div>
          </div>
          <p style={{ fontSize: 12, color: '#991b1b', fontWeight: 700, marginBottom: 8, letterSpacing: '0.02em' }}>
            POSSIBLE FINDINGS
          </p>
          <ul style={{ fontSize: 13, color: '#991b1b', paddingLeft: 20, lineHeight: 1.9, fontWeight: 500 }}>
            <li>Suspicious lesion detected</li>
            <li>Requires specialist evaluation</li>
            <li>Immediate consultation advised</li>
          </ul>
        </div>

        <div style={{ padding: 16, background: 'white', borderRadius: 16, marginBottom: 16, boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>Next Steps</h3>
          <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6, fontWeight: 500 }}>
            This patient needs further evaluation at a regional or district health center. Please share the referral details with the patient.
          </p>
        </div>

        <button className="btn-danger" onClick={() => navigate('/dashboard')} style={{ marginBottom: 10 }}>
          <Phone size={16} /> Refer to Specialist <ArrowRight size={16} />
        </button>
        <button className="btn-secondary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}