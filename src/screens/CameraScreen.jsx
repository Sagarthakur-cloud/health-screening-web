import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, X } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';

export default function CameraScreen() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let activeStream = null;

    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 },
          },
        });
        activeStream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.onloadedmetadata = () => setReady(true);
        }
        setStream(s);
      } catch (e) {
        setError(e.message || 'Camera access denied');
      }
    })();

    return () => {
      activeStream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = () => {
    if (!videoRef.current || !ready || capturing) return;
    setCapturing(true);

    try {
      const c = canvasRef.current;
      c.width = 224;
      c.height = 224;
      const ctx = c.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 224, 224);

      const dataUrl = c.toDataURL('image/jpeg', 0.85);

      if (!dataUrl || dataUrl.length < 100) {
        throw new Error('Failed to capture image');
      }

      sessionStorage.setItem('captured', dataUrl);

      // Stop camera before navigation
      stream?.getTracks().forEach((t) => t.stop());

      navigate('/quality-check');
    } catch (e) {
      setError('Capture failed: ' + e.message);
      setCapturing(false);
    }
  };

  return (
    <div className="screen">
      <ScreenHeader title="Capture Image" />
      <div className="screen-body">
        {error ? (
          <div
            style={{
              padding: 20,
              background: '#fee2e2',
              borderRadius: 16,
              color: '#991b1b',
              fontSize: 13,
              display: 'flex',
              gap: 10,
              fontWeight: 500,
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Camera Error</div>
              <div>{error}</div>
              <button
                onClick={() => navigate('/select-screening')}
                style={{
                  marginTop: 12,
                  padding: '8px 16px',
                  background: '#991b1b',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                }}
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Video Preview */}
            <div
              style={{
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#000',
                aspectRatio: '4/3',
                boxShadow: '0 8px 24px rgba(15,23,42,0.12)',
              }}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />

              {/* Guide Frame */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  border: '3px dashed rgba(255,255,255,0.6)',
                  borderRadius: 20,
                  margin: 20,
                  pointerEvents: 'none',
                }}
              />

              {/* Center Target */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 100,
                  height: 100,
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }}
              />

              {/* Status Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: 12,
                  padding: '4px 10px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: ready ? '#10b981' : '#f59e0b',
                  }}
                />
                {ready ? 'Ready' : 'Starting...'}
              </div>
            </div>

            <p
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#64748b',
                marginTop: 12,
                fontWeight: 600,
              }}
            >
              Align the subject within the frame
            </p>

            {/* Tips */}
            <div
              style={{
                marginTop: 14,
                padding: 14,
                background: 'white',
                borderRadius: 16,
                boxShadow: '0 1px 3px rgba(15,23,42,0.04)',
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: '#0f172a',
                }}
              >
                Tips for a good image
              </p>
              <ul
                style={{
                  fontSize: 12,
                  color: '#64748b',
                  paddingLeft: 20,
                  lineHeight: 1.8,
                  fontWeight: 500,
                }}
              >
                <li>Keep distance of 10-15 cm</li>
                <li>Ensure good lighting</li>
                <li>Keep the phone steady</li>
                <li>Avoid blur and reflections</li>
              </ul>
            </div>

            {/* Capture Button */}
            <button
              onClick={capture}
              className="btn-primary"
              disabled={!ready || capturing}
              style={{ marginTop: 16 }}
            >
              <Camera size={18} />
              {capturing ? 'Capturing...' : ready ? 'Capture Image' : 'Starting camera...'}
            </button>
          </>
        )}

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}