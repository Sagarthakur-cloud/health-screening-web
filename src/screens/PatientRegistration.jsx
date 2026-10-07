import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../components/ScreenHeader';
import BottomNav from '../components/BottomNav';
import { savePatient } from '../services/dbService';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientId: 'P-' + Date.now().toString().slice(-6),
    name: '', age: '', gender: 'Male', phone: '', address: '',
  });
  const [error, setError] = useState('');

  const handleNext = async () => {
    if (!form.age) { setError('Age is required'); return; }
    if (!form.name) { setError('Full name is required'); return; }
    setError('');
    await savePatient(form);
    sessionStorage.setItem('patient', JSON.stringify(form));
    navigate('/select-screening');
  };

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 14 }}>
      <label className="label">{label}</label>
      {children}
    </div>
  );

  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh', paddingBottom: 100 }}>
      <ScreenHeader title="Register Patient" backTo="/dashboard" />
      <div style={{ padding: 20 }}>
        <Field label="Patient ID *">
          <input className="input-field" value={form.patientId} readOnly style={{ background: '#F3F4F6', color: '#6B7280' }} />
        </Field>
        <Field label="Age *">
          <input className="input-field" type="number" placeholder="Enter patient age"
            value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
        </Field>
        <Field label="Gender *">
          <div style={{ display: 'flex', gap: 8 }}>
            {['Male', 'Female', 'Other'].map(g => (
              <button key={g} onClick={() => setForm({ ...form, gender: g })}
                style={{
                  flex: 1, padding: '12px 8px', borderRadius: 12,
                  border: `1.5px solid ${form.gender === g ? '#0F52BA' : '#E5E7EB'}`,
                  background: form.gender === g ? '#EFF6FF' : 'white',
                  color: form.gender === g ? '#0F52BA' : '#4B5563',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'all 0.2s',
                }}>
                {g}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Full Name *">
          <input className="input-field" placeholder="Enter patient name"
            value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </Field>
        <Field label="Phone Number (Optional)">
          <input className="input-field" placeholder="Enter phone number"
            value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="Address (Optional)">
          <input className="input-field" placeholder="Village / Area"
            value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        </Field>

        {error && (
          <p style={{ fontSize: 12, color: '#EF4444', marginBottom: 12 }}>{error}</p>
        )}

        <button className="btn-primary" onClick={handleNext} style={{ marginTop: 8 }}>Next</button>
      </div>
      <BottomNav />
    </div>
  );
}