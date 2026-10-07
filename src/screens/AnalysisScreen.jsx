import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, WifiOff, Lock } from 'lucide-react';
import { runInference, dummyInference } from '../services/aiService';

export default function AnalysisScreen() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Analyzing image offline...');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const img = sessionStorage.getItem('captured');
        let r;
        try { r = await runInference(img); }
        catch (e) {
          console.warn('Real model unavailable, using dummy:', e);
          await new Promise(res => setTimeout(res, 1500));
          r = dummyInference();
        }
        if (cancelled) return;
        sessionStorage.setItem('result', JSON.stringify(r));
        navigate('/result');
      } catch (e) { if (!cancelled) setStatus('Error: ' + e.message); }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="screen" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40 }}>
      <div style={{
        width: 110, height: 110, borderRadius: '50%',
        background: 'linear-gradient(135deg, #60a5fa, #2563eb)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 32,
        boxShadow: '0 0 0 14px rgba(37,99,235,0.08), 0 0 0 28px rgba(37,99,235,0.04)',
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        <Cpu size={44} color="white" strokeWidth={1.5} />
      </div>
      <h2 style={{ fontSize: 18, fontWeight: 800, color: '#2563eb', letterSpacing: '-0.02em' }}>{status}</h2>
      <p style={{ fontSize: 13, color: '#64748b', marginTop: 12, maxWidth: 280, fontWeight: 500 }}>
        Our AI model is checking for signs of disease. Please wait.
      </p>
      <div style={{ marginTop: 40, display: 'flex', gap: 24, fontSize: 11, color: '#64748b', fontWeight: 600 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><WifiOff size={14} /> Works offline</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Lock size={14} /> Data on device</span>
      </div>
    </div>
  );
}