import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { theme } from '../theme';
import { savePatient } from '../services/dbService';

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    patientId: 'P-' + Date.now(),
    name: '', age: '', gender: 'Male', phone: '', address: '',
  });

  const handleNext = async () => {
    if (!form.name || !form.age) {
      alert('Name and Age required');
      return;
    }
    await savePatient(form);
    sessionStorage.setItem('currentPatient', JSON.stringify(form));
    navigate('/select-screening');
  };

  return (
    <div style={{ paddingBottom: 100 }}>
      <Header title="Register Patient" />
      <div style={{ padding: theme.spacing.md }}>
        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Patient ID</label>
        <input value={form.patientId} readOnly style={{ background: '#f3f4f6' }} />

        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Age</label>
        <input type="number" value={form.age}
          onChange={e => setForm({ ...form, age: e.target.value })} />

        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Gender</label>
        <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
          <option>Male</option><option>Female</option><option>Other</option>
        </select>

        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Full Name</label>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />

        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Phone Number (Optional)</label>
        <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />

        <label style={{ fontSize: '0.85rem', color: theme.colors.gray }}>Address (Optional)</label>
        <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />

        <button onClick={handleNext}
          style={{
            width: '100%', padding: 16, marginTop: 16,
            background: theme.colors.primary, color: 'white',
            fontSize: '1rem', fontWeight: 600,
          }}>
          Next
        </button>
      </div>
    </div>
  );
}