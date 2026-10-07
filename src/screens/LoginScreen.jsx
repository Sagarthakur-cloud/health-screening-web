import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import MedicalLogo from '../components/MedicalLogo';
import { loginUser, getSession } from '../services/authService';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Agar already logged in, dashboard par jao
  useEffect(() => {
    if (getSession()) navigate('/dashboard');
  }, [navigate]);

  const handleLogin = async () => {
    if (!id.trim()) return setError('Please enter your Health Worker ID');
    if (!password) return setError('Please enter your password');

    setError('');
    setLoading(true);
    try {
      await loginUser({ workerId: id.trim(), password });
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Gradient Header */}
      <div style={{
        position: 'relative', height: '38%', minHeight: 220, maxHeight: 300,
        background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 60%, #1e40af 100%)',
        overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
          <defs>
            <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
            Government of India | National Health Mission
          </p>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
            <MedicalLogo size={52} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1 }}>Dr. Screen</h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.9)', marginTop: 4, fontWeight: 600 }}>Field Screening App</p>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div style={{
        flex: 1, background: 'white',
        borderTopLeftRadius: 32, borderTopRightRadius: 32, marginTop: -24,
        padding: '24px 22px 20px', position: 'relative', zIndex: 3,
        boxShadow: '0 -8px 32px rgba(15,23,42,0.08)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', minHeight: 0,
      }}>
        <div style={{ width: 40, height: 4, background: '#e2e8f0', borderRadius: 999, margin: '0 auto 16px', flexShrink: 0 }} />

        <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
          Welcome back
        </h2>
        <p style={{ fontSize: 12, color: '#64748b', marginTop: 4, marginBottom: 16, fontWeight: 500 }}>
          Sign in to access screening tools
        </p>

        {/* Worker ID */}
        <label className="label">Health Worker ID</label>
        <div style={{
          display: 'flex', alignItems: 'center', borderRadius: 16,
          border: `2px solid ${focused === 'id' ? '#2563eb' : '#e2e8f0'}`,
          background: 'white', transition: 'all 0.2s ease',
          boxShadow: focused === 'id' ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
          marginBottom: 12, flexShrink: 0,
        }}>
          <div style={{ paddingLeft: 14, paddingRight: 10, color: '#94a3b8', display: 'flex' }}>
            <User size={18} strokeWidth={2.2} />
          </div>
          <input
            type="text"
            value={id}
            onChange={(e) => { setId(e.target.value); if (error) setError(''); }}
            onFocus={() => setFocused('id')}
            onBlur={() => setFocused('')}
            placeholder="e.g. HW-2024-001"
            style={{
              flex: 1, padding: '13px 14px 13px 0',
              border: 'none', outline: 'none',
              fontSize: 15, fontWeight: 600,
              fontFamily: 'inherit', background: 'transparent',
              minWidth: 0, color: '#0f172a',
            }}
          />
        </div>

        {/* Password */}
        <label className="label">Password</label>
        <div style={{
          display: 'flex', alignItems: 'center', borderRadius: 16,
          border: `2px solid ${focused === 'pwd' ? '#2563eb' : '#e2e8f0'}`,
          background: 'white', transition: 'all 0.2s ease',
          boxShadow: focused === 'pwd' ? '0 0 0 4px rgba(37,99,235,0.1)' : 'none',
          marginBottom: 8, flexShrink: 0,
        }}>
          <div style={{ paddingLeft: 14, paddingRight: 10, color: '#94a3b8', display: 'flex' }}>
            <Lock size={18} strokeWidth={2.2} />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
            onFocus={() => setFocused('pwd')}
            onBlur={() => setFocused('')}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter your password"
            style={{
              flex: 1, padding: '13px 14px 13px 0',
              border: 'none', outline: 'none',
              fontSize: 15, fontWeight: 600,
              fontFamily: 'inherit', background: 'transparent',
              minWidth: 0, color: '#0f172a',
            }}
          />
        </div>

        {error && (
          <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 8, fontWeight: 500, flexShrink: 0 }}>
            {error}
          </p>
        )}

        <button className="btn-primary" onClick={handleLogin} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? (
            <><Loader2 size={18} className="animate-spin" /><span>Signing in...</span></>
          ) : (
            <><Lock size={16} strokeWidth={2.5} /><span>Sign In</span><ArrowRight size={16} strokeWidth={2.5} /></>
          )}
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 14, fontSize: 13, fontWeight: 500, color: '#64748b', flexShrink: 0 }}>
          New here?&nbsp;
          <Link to="/signup" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
            Create Account
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14, flexShrink: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f8fafc', border: '1px solid #f1f5f9', padding: '6px 12px', borderRadius: 9999, fontSize: 10, fontWeight: 600, color: '#475569' }}>
            <span style={{ position: 'relative', display: 'flex', width: 7, height: 7 }}>
              <span style={{ position: 'absolute', display: 'inline-flex', width: '100%', height: '100%', borderRadius: '50%', background: '#34d399', opacity: 0.75, animation: 'ping 1.5s infinite' }} />
              <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', width: 7, height: 7, background: '#10b981' }} />
            </span>
            <ShieldCheck size={12} color="#64748b" strokeWidth={2.5} />
            <span>Offline Ready • Data Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}