import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import MedicalLogo from '../components/MedicalLogo';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!id.trim()) {
      setError('Please enter your Health Worker ID');
      return;
    }
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    sessionStorage.setItem('workerId', id);
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F6F8FC', display: 'flex', flexDirection: 'column' }}>
      {/* Top Gradient Header */}
      <div style={{
        position: 'relative',
        height: '42vh',
        minHeight: 280,
        background: 'linear-gradient(135deg, #0F52BA 0%, #0A3D8F 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
          <p style={{
            fontSize: 9,
            letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
            marginBottom: 20,
            fontWeight: 500,
          }}>
            Government of India | National Health Mission
          </p>
          <div style={{ marginBottom: 16 }}>
            <MedicalLogo size={56} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
            Dr. Screen
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', marginTop: 6, fontWeight: 500 }}>
            Field Screening App
          </p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>
            Better Screening • Healthier Communities
          </p>
        </div>
      </div>

      {/* Bottom White Sheet */}
      <div style={{
        flex: 1,
        background: 'white',
        borderTopLeftRadius: 28,
        borderTopRightRadius: 28,
        marginTop: -24,
        padding: '28px 24px 24px',
        position: 'relative',
        zIndex: 3,
        boxShadow: '0 -8px 24px rgba(15,82,186,0.06)',
      }}>
        <div style={{
          width: 40,
          height: 4,
          background: '#E5E7EB',
          borderRadius: 999,
          margin: '0 auto 24px',
        }} />

        <h2 style={{ fontSize: 18, fontWeight: 600, color: '#111827' }}>
          Sign in to continue
        </h2>
        <p style={{ fontSize: 13, color: '#6B7280', marginTop: 4, marginBottom: 24 }}>
          Enter your credentials to access screening tools
        </p>

        <label className="label">Health Worker ID</label>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 14,
          border: `2px solid ${focused ? '#0F52BA' : error ? '#F87171' : '#E5E7EB'}`,
          background: 'white',
          transition: 'all 0.2s ease',
          boxShadow: focused ? '0 0 0 4px rgba(15,82,186,0.1)' : 'none',
          marginBottom: 16,
        }}>
          <div style={{ paddingLeft: 14, paddingRight: 10, color: '#9CA3AF', display: 'flex' }}>
            <User size={18} strokeWidth={2} />
          </div>
          <input
            type="text"
            value={id}
            onChange={e => { setId(e.target.value); if (error) setError(''); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="e.g. HW-2024-001"
            style={{
              flex: 1,
              padding: '14px 14px 14px 0',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              fontWeight: 500,
              fontFamily: 'inherit',
              background: 'transparent',
              minWidth: 0,
            }}
          />
        </div>
        {error && (
          <p style={{ fontSize: 12, color: '#EF4444', marginTop: -8, marginBottom: 12 }}>
            {error}
          </p>
        )}

        <button className="btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <Lock size={16} strokeWidth={2.5} />
              <span>Secure Login</span>
              <ArrowRight size={16} strokeWidth={2.5} />
            </>
          )}
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <div className="status-pill">
            <span className="dot-pulse">
              <span className="ping" />
              <span className="dot" />
            </span>
            <ShieldCheck size={13} color="#6B7280" strokeWidth={2.5} />
            <span>Offline Ready • PWA Enabled</span>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid #F3F4F6' }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center', lineHeight: 1.6 }}>
            Authorized for ASHA & Health Workers Only
            <span style={{ margin: '0 6px', color: '#D1D5DB' }}>|</span>
            v1.0.2
          </p>
        </div>
      </div>
    </div>
  );
}