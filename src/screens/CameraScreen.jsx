import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function CameraScreen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let activeStream = null;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } },
        });
        activeStream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.onloadedmetadata = () => setReady(true);
        }
        setStream(s);
      } catch (e) { setError(e.message || 'Camera access denied'); }
    })();
    return () => { activeStream?.getTracks().forEach(t => t.stop()); };
  }, []);

  const capture = () => {
    if (!videoRef.current || !ready) return;
    const c = canvasRef.current;
    c.width = 224; c.height = 224;
    c.getContext('2d').drawImage(videoRef.current, 0, 0, 224, 224);
    sessionStorage.setItem('captured', c.toDataURL('image/jpeg', 0.85));
    navigate('/quality-check');
  };

  return (
    <div className="screen">
      <ScreenHeader title="Capture Image" />
      <div className="screen-body">
        {error ? (
          <div style={{ padding: 20, background: '#fee2e2', borderRadius: 16, color: '#991b1b', fontSize: 13, display: 'flex', gap: 10, fontWeight: 500 }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>Camera error: {error}</span>
          </div>
        ) : (
          <>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: '#000', aspectRatio: '4/3', boxShadow: '0 8px 24px rgba(15,23,42,0.12)' }}>
              <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, border: '3px dashed rgba(255,255,255,0.5)', borderRadius: 20, margin: 20, pointerEvents: 'none' }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: '#64748b', marginTop: 12, fontWeight: 600 }}>Keep the phone steady</p>

            <div style={{ marginTop: 14, padding: 14, background: 'white', borderRadius: 16, boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
              <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>Tips for a good image</p>
              <ul style={{ fontSize: 12, color: '#64748b', paddingLeft: 20, lineHeight: 1.8, fontWeight: 500 }}>
                <li>Keep proper distance (10-15 cm)</li>
                <li>Ensure good lighting</li>
                <li>Keep the subject steady</li>
                <li>Avoid blur and reflections</li>
              </ul>
            </div>

            <button onClick={capture} className="btn-primary" disabled={!ready} style={{ marginTop: 16 }}>
              <Camera size={18} /> {ready ? 'Capture Image' : 'Starting camera...'}
            </button>
          </>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}