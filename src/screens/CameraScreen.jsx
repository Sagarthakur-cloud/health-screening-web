import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function CameraScreen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: 640, height: 480 }
        });
        if (videoRef.current) videoRef.current.srcObject = s;
        setStream(s);
      } catch (e) { setError(e.message); }
    })();
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  const capture = () => {
    const c = canvasRef.current;
    c.width = 224; c.height = 224;
    c.getContext('2d').drawImage(videoRef.current, 0, 0, 224, 224);
    sessionStorage.setItem('captured', c.toDataURL('image/jpeg', 0.85));
    navigate('/quality-check');
  };

  return (
    <div style={{ background: '#F6F8FC', minHeight: '100vh' }}>
      <ScreenHeader title="Capture Image" />
      <div style={{ padding: 20 }}>
        {error ? (
          <div style={{
            padding: 20, background: '#FEE2E2', borderRadius: 12,
            color: '#991B1B', fontSize: 13, display: 'flex', gap: 10,
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>Camera error: {error}</span>
          </div>
        ) : (
          <>
            <div style={{
              position: 'relative', borderRadius: 16, overflow: 'hidden',
              background: '#000', aspectRatio: '4/3',
            }}>
              <video ref={videoRef} autoPlay playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute', inset: 0,
                border: '3px dashed rgba(255,255,255,0.4)',
                borderRadius: 16, margin: 20, pointerEvents: 'none',
              }} />
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#6B7280', marginTop: 10, fontWeight: 500 }}>
              Keep the phone steady
            </p>

            <div style={{ marginTop: 16, padding: 16, background: 'white', borderRadius: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Tips for good image:</p>
              <ul style={{ fontSize: 12, color: '#6B7280', paddingLeft: 20, lineHeight: 1.9 }}>
                <li>Keep proper distance (10-15 cm)</li>
                <li>Good lighting (avoid flash)</li>
                <li>Keep the eye steady</li>
                <li>Avoid blur and reflections</li>
              </ul>
            </div>

            <button onClick={capture} className="btn-primary" style={{ marginTop: 20 }}>
              <Camera size={18} /> Capture Image
            </button>
          </>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}