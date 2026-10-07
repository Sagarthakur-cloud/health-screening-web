import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import BottomNav from '../components/BottomNav';
import Field from '../components/Field';
import { savePatient } from '../services/dbService';

export default function PatientRegistration() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patientId: 'P-' + Date.now().toString().slice(-6),
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleNext = async () => {
    if (!form.age) return setError('Age is required');
    if (Number(form.age) <= 0 || Number(form.age) > 120) {
      return setError('Please enter a valid age (1-120)');
    }
    if (!form.name.trim()) return setError('Full name is required');

    setError('');
    try {
      await savePatient(form);
      sessionStorage.setItem('patient', JSON.stringify(form));
      navigate('/select-screening');
    } catch (e) {
      setError('Failed to save patient: ' + e.message);
    }
  };

  return (
    <div className="screen">
      <ScreenHeader title="Register Patient" backTo="/dashboard" />
      <div className="screen-body">
        <Field label="Patient ID *">
          <input
            className="input-field"
            value={form.patientId}
            readOnly
            style={{ background: '#f1f5f9', color: '#64748b' }}
          />
        </Field>

        <Field label="Age *">
          <input
            className="input-field"
            type="number"
            inputMode="numeric"
            placeholder="Enter patient age"
            value={form.age}
            onChange={handleChange('age')}
            min="1"
            max="120"
          />
        </Field>

        <Field label="Gender *">
          <div style={{ display: 'flex', gap: 8 }}>
            {['Male', 'Female', 'Other'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, gender: g }))}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: 14,
                  border: `1.5px solid ${form.gender === g ? '#2563eb' : '#e2e8f0'}`,
                  background: form.gender === g ? '#eff6ff' : 'white',
                  color: form.gender === g ? '#2563eb' : '#475569',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Full Name *">
          <input
            className="input-field"
            placeholder="Enter patient name"
            value={form.name}
            onChange={handleChange('name')}
          />
        </Field>

        <Field label="Phone Number (Optional)">
          <input
            className="input-field"
            type="tel"
            inputMode="tel"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handleChange('phone')}
          />
        </Field>

        <Field label="Address (Optional)">
          <input
            className="input-field"
            placeholder="Village / Area"
            value={form.address}
            onChange={handleChange('address')}
          />
        </Field>

        {error && (
          <p
            style={{
              fontSize: 13,
              color: '#ef4444',
              marginBottom: 12,
              fontWeight: 500,
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          className="btn-primary"
          onClick={handleNext}
          style={{ marginTop: 8 }}
        >
          Continue
        </button>
      </div>
      <BottomNav />
    </div>
  );
}