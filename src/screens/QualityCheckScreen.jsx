import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import ScreenHeader from '../components/ScreenHeader';
import { checkQuality, getQualityLabel, getQualityColor } from '../services/qualityService';

export default function QualityCheckScreen() {
  const navigate = useNavigate();
  const [quality, setQuality] = useState(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const img = sessionStorage.getItem('captured');
    if (!img) {
      navigate('/camera');
      return;
    }
    setImage(img);

    checkQuality(img)
      .then(setQuality)
      .catch((e) => setError('Quality check failed: ' + e.message));
  }, [navigate]);

  if (error) {
    return (
      <div className="screen">
        <ScreenHeader title="Image Quality" />
        <div className="screen-body">
          <div
            style={{
              padding: 20,
              background: '#fee2e2',
              borderRadius: 16,
              color: '#991b1b',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {error}
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate('/camera')}
            style={{ marginTop: 16 }}
          >
            Retake Image
          </button>
        </div>
      </div>
    );
  }

  if (!quality) {
    return (
      <div className="screen">
        <ScreenHeader title="Image Quality" />
        <div
          className="screen-body"
          style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: 13,
            fontWeight: 500,
            paddingTop: 60,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid #e2e8f0',
              borderTopColor: '#2563eb',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite',
            }}
          />
          <p>Analyzing image quality...</p>
        </div>
      </div>
    );
  }

  const isGood = quality.status === 'good';
  const colors = getQualityColor(quality.status);
  const label = getQualityLabel(quality.status);

  return (
    <div className="screen">
      <ScreenHeader title="Image Quality" />
      <div className="screen-body">
        {/* Image Preview */}
        {image && (
          <div
            style={{
              position: 'relative',
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 16,
              boxShadow: '0 8px 24px rgba(15,23,42,0.08)',
            }}
          >
            <img
              src={image}
              alt="captured"
              style={{ width: '100%', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '5px 12px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 700,
                color: colors.fg,
              }}
            >
              {isGood ? '✓ Ready' : '✗ Retake'}
            </div>
          </div>
        )}

        {/* Quality Result */}
        <div
          style={{
            padding: 18,
            borderRadius: 16,
            background: colors.bg,
            border: `1.5px solid ${colors.border}`,
            marginBottom: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {isGood ? (
              <CheckCircle2 size={22} color={colors.fg} />
            ) : (
              <AlertTriangle size={22} color={colors.fg} />
            )}
            <h3
              style={{
                fontSize: 16,
                fontWeight: 800,
                flex: 1,
                color: colors.fg,
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </h3>
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: colors.fg,
              }}
            >
              {quality.score}/100
            </span>
          </div>

          <p
            style={{
              fontSize: 13,
              marginTop: 10,
              color: colors.fg,
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            {quality.reason}
          </p>

          {/* Metrics */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 14,
              paddingTop: 14,
              borderTop: `1px solid ${colors.border}40`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: colors.fg,
                  opacity: 0.75,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                BRIGHTNESS
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: colors.fg,
                  marginTop: 2,
                }}
              >
                {quality.brightness}
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 10,
                  color: colors.fg,
                  opacity: 0.75,
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                }}
              >
                SHARPNESS
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 800,
                  color: colors.fg,
                  marginTop: 2,
                }}
              >
                {quality.sharpness}
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        {!isGood && (
          <div
            style={{
              padding: 12,
              background: '#eff6ff',
              borderRadius: 12,
              fontSize: 12,
              color: '#1e40af',
              display: 'flex',
              gap: 8,
              alignItems: 'flex-start',
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>Please retake the image in better conditions for accurate AI analysis.</span>
          </div>
        )}

        {/* Actions */}
        <button
          className="btn-secondary"
          onClick={() => navigate('/camera')}
          style={{ marginBottom: 10 }}
        >
          <RefreshCw size={16} /> Retake Image
        </button>

        <button
          className="btn-primary"
          disabled={!isGood}
          onClick={() => navigate('/analysis')}
        >
          {isGood ? 'Use This Image' : 'Image Not Usable'}
        </button>
      </div>
    </div>
  );
}