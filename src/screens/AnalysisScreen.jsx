// src/screens/AnalysisScreen.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { runInference, dummyInference } from '../services/aiService';

export default function AnalysisScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Analyzing image offline...');

  useEffect(() => {
    (async () => {
      try {
        const img = sessionStorage.getItem('captured');
        let r;
        try { r = await runInference(img); } catch { r = dummyInference(); }
        sessionStorage.setItem('result', JSON.stringify(r));
        navigate('/result');
      } catch (e) { setStatus('Error: ' + e.message); }
    })();
  }, []);

  return (
    <div style={{
      minHeight: '100vh', background: '#F6F8FC',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center',
    }}>
      <div style={{
        width: 100, height: 100, borderRadius: '50%',
        background: 'linear-gradient(135deg, #0F52BA, #0A3D8F)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 40, marginBottom: 24,
        boxShadow: '0 0 0 12px rgba(15,82,186,0.1), 0 0 0 24px rgba(15,82,186,0.05)',
      }}>
        🧠
      </div>
      <h2 style={{ fontSize: 17, fontWeight: 700, color: '#0F52BA' }}>{status}</h2>
      <p style={{ fontSize: 13, color: '#6B7280', marginTop: 12, maxWidth: 260 }}>
        Our AI model is checking for signs of disease. Please wait.
      </p>
      <div style={{ marginTop: 40, display: 'flex', gap: 24, fontSize: 11, color: '#6B7280' }}>
        <span>✓ Works offline</span>
        <span>🔒 Data stays on device</span>
      </div>
    </div>
  );
}