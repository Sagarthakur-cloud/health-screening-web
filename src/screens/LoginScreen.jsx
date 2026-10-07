// src/screens/LoginScreen.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, ShieldCheck } from 'lucide-react';
import MedicalLogo from '../components/MedicalLogo';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#F6F8FC', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        position: 'relative', height: '42vh', minHeight: 280,
        background: 'linear-gradient(135deg, #0F52BA 0%, #0A3D8F 100%)',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
          <defs>
            <pattern id="g" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)" />
        </svg>
        <div style={{ position: 'relative', textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', marginBottom: 20, fontWeight: 500 }}>
            Government of India | National Health Mission
          </p>
          <div style={{ marginBottom: 16 }}><MedicalLogo size={56} /></div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>Dr. Screen</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6 }}>Field Screening App</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>Better Screening • Healthier Communities</p>
        </div>
      </div>

      {/* Sheet */}
      <div style={{
        flex: 1, background: 'white', borderTopLeftRadius: 28, borderTopRightRadius: 28,
        marginTop: -24, padding: '28px 24px 24px', position: 'relative', zIndex: 2,
        boxShadow: '0 -8px 24px rgba(15,82,186,0.08)',
      }}>
        <div style={{ width: 40, height: 4, background: '#E5E7EB', borderRadius: 999, margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>Sign in to continue</h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 24 }}>
          Enter your credentials to access screening tools
        </p>

        <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>
          Health Worker ID
        </label>
        <div style={{
          display: 'flex', alignItems: 'center', borderRadius: 14,
          border: `2px solid ${focused ? '#0F52BA' : '#E5E7EB'}`,
          background: 'white', transition: 'all 0.2s',
          boxShadow: focused ? '0 0 0 4px rgba(15,82,186,0.1)' : 'none',
          marginBottom: 16,
        }}>
          <div style={{ paddingLeft: 14, paddingRight: 10, color: '#9CA3AF' }}>
            <User size={18} />
          </div>
          <input
            type="text"
            value={id}
            onChange={e => setId(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Enter your worker ID"
            style={{ flex: 1, padding: '14px 14px 14px 0', border: 'none', outline: 'none', fontSize: 15, fontWeight: 500, minWidth: 0 }}
          />
        </div>

        <button className="btn-primary" onClick={() => { if (id) { sessionStorage.setItem('workerId', id); navigate('/dashboard'); } }}>
          Login <ArrowRight size={16} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#F9FAFB', border: '1px solid #F3F4F6',
            padding: '8px 14px', borderRadius: 999,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            <ShieldCheck size={13} color="#6B7280" />
            <span style={{ fontSize: 11, fontWeight: 500, color: '#4B5563' }}>Works Offline • Data Secured</span>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center' }}>
            Authorized for ASHA & Health Workers Only | v1.0.2
          </p>
        </div>
      </div>
    </div>
  );
}