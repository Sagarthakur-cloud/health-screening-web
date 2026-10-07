import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User, Lock, ShieldCheck, ArrowRight, Loader2,
  Phone, MapPin, BadgeCheck,
} from 'lucide-react';
import MedicalLogo from '../components/MedicalLogo';
import InputRow from '../components/InputRow';
import { registerUser, loginUser } from '../services/authService';

export default function SignupScreen() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    workerId: '',
    name: '',
    password: '',
    confirmPassword: '',
    phone: '',
    district: '',
  });
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSignup = async () => {
    const { workerId, name, password, confirmPassword } = form;

    if (!workerId.trim()) return setError('Health Worker ID is required');
    if (workerId.trim().length < 4) return setError('Worker ID must be at least 4 characters');
    if (!name.trim()) return setError('Full name is required');
    if (!password) return setError('Password is required');
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');

    setError('');
    setLoading(true);
    try {
      await registerUser({
        workerId: workerId.trim(),
        name: name.trim(),
        password,
        phone: form.phone.trim(),
        district: form.district.trim(),
      });
      await loginUser({ workerId: workerId.trim(), password });
      navigate('/dashboard');
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Header */}
      <div
        style={{
          position: 'relative',
          height: '32%',
          minHeight: 180,
          maxHeight: 240,
          background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 60%, #1e40af 100%)',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
          <p
            style={{
              fontSize: 9,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'uppercase',
              marginBottom: 12,
              fontWeight: 600,
            }}
          >
            Government of India | National Health Mission
          </p>
          <div style={{ marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
            <MedicalLogo size={48} />
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
            Create Account
          </h1>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 4, fontWeight: 500 }}>
            Register as a Health Worker
          </p>
        </div>
      </div>

      {/* Form Sheet */}
      <div
        style={{
          flex: 1,
          background: 'white',
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          marginTop: -24,
          padding: '20px 22px 16px',
          position: 'relative',
          zIndex: 3,
          boxShadow: '0 -8px 32px rgba(15,23,42,0.08)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Scrollable form area */}
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, paddingRight: 2 }}>
          <div
            style={{
              width: 40,
              height: 4,
              background: '#e2e8f0',
              borderRadius: 999,
              margin: '0 auto 16px',
            }}
          />

          <InputRow
            icon={BadgeCheck}
            label="Health Worker ID *"
            fieldName="workerId"
            focused={focused}
            value={form.workerId}
            onChange={handleChange('workerId')}
            onFocus={() => setFocused('workerId')}
            onBlur={() => setFocused('')}
            placeholder="e.g. HW-2024-001"
          />

          <InputRow
            icon={User}
            label="Full Name *"
            fieldName="name"
            focused={focused}
            value={form.name}
            onChange={handleChange('name')}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused('')}
            placeholder="Enter your full name"
          />

          <InputRow
            icon={Lock}
            label="Password *"
            fieldName="password"
            focused={focused}
            type="password"
            value={form.password}
            onChange={handleChange('password')}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
            placeholder="Min. 6 characters"
          />

          <InputRow
            icon={Lock}
            label="Confirm Password *"
            fieldName="confirmPassword"
            focused={focused}
            type="password"
            value={form.confirmPassword}
            onChange={handleChange('confirmPassword')}
            onFocus={() => setFocused('confirmPassword')}
            onBlur={() => setFocused('')}
            onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
            placeholder="Re-enter password"
          />

          <InputRow
            icon={Phone}
            label="Phone (Optional)"
            fieldName="phone"
            focused={focused}
            type="tel"
            inputMode="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            onFocus={() => setFocused('phone')}
            onBlur={() => setFocused('')}
            placeholder="Mobile number"
          />

          <InputRow
            icon={MapPin}
            label="District (Optional)"
            fieldName="district"
            focused={focused}
            value={form.district}
            onChange={handleChange('district')}
            onFocus={() => setFocused('district')}
            onBlur={() => setFocused('')}
            placeholder="Your district"
          />

          {error && (
            <p
              style={{
                fontSize: 12,
                color: '#ef4444',
                marginBottom: 10,
                fontWeight: 500,
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Fixed bottom area */}
        <div style={{ flexShrink: 0, paddingTop: 12 }}>
          <button
            type="button"
            className="btn-primary"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <BadgeCheck size={16} strokeWidth={2.5} />
                <span>Create Account</span>
                <ArrowRight size={16} strokeWidth={2.5} />
              </>
            )}
          </button>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
              fontSize: 13,
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            Already have an account?&nbsp;
            <Link to="/" style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 10,
                fontWeight: 600,
                color: '#64748b',
                padding: '5px 10px',
                background: '#f8fafc',
                borderRadius: 999,
              }}
            >
              <ShieldCheck size={12} strokeWidth={2.5} />
              <span>Your data stays on this device</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}