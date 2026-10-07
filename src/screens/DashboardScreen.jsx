import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Sparkles, TrendingUp, AlertTriangle, Cloud, CheckCircle2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import { getAllResults } from '../services/dbService';
import { getSession } from '../services/authService';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const session = getSession();
  const workerId = session?.workerId || 'HW-001';
  const userName = session?.name || 'Health Worker';

  const [stats, setStats] = useState({ total: 0, high: 0, pending: 0, synced: 0 });

  useEffect(() => {
    getAllResults().then((r) => {
      if (r && r.length > 0) {
        setStats({
          total: r.length,
          high: r.filter((x) => x.severity >= 2).length,
          pending: r.filter((x) => x.syncStatus === 'pending').length,
          synced: r.filter((x) => x.syncStatus === 'synced').length,
        });
      }
    }).catch(() => {});
  }, []);

  const StatCard = ({ value, label, Icon, bg, iconColor }) => (
    <div className="stat-card" style={{ background: bg }}>
      <div className="stat-icon-wrap">
        <Icon size={18} color={iconColor} strokeWidth={2.2} />
      </div>
      <div>
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );

  const ActionCard = ({ title, subtitle, Icon, gradient, shadow, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        background: gradient,
        border: 'none',
        borderRadius: 20,
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: shadow,
        transition: 'transform 0.15s ease',
        color: 'white',
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <Icon size={30} color="white" strokeWidth={1.8} />
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</div>
        <div style={{ fontSize: 10, opacity: 0.85, marginTop: 3, fontWeight: 500 }}>{subtitle}</div>
      </div>
    </button>
  );

  return (
    <div className="screen">
      <div className="screen-body">
        {/* Header */}
        <div
          style={{
            paddingTop: 4,
            paddingBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#1e293b',
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Hello, {userName.split(' ')[0]}
            </h1>
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4, fontWeight: 500 }}>
              ID: {workerId}
            </p>
          </div>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
              flexShrink: 0,
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
          <StatCard value={stats.total} label="Total Screenings" Icon={TrendingUp} bg="#dbeafe" iconColor="#2563eb" />
          <StatCard value={stats.high} label="High Risk Cases" Icon={AlertTriangle} bg="#fecaca" iconColor="#dc2626" />
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <StatCard value={stats.pending} label="Pending Sync" Icon={Cloud} bg="#ffedd5" iconColor="#ea580c" />
          <StatCard value={stats.synced} label="Synced" Icon={CheckCircle2} bg="#dcfce7" iconColor="#16a34a" />
        </div>

        {/* Quick Actions */}
        <h3
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1e293b',
            marginBottom: 12,
            letterSpacing: '-0.01em',
          }}
        >
          Quick Actions
        </h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <ActionCard
            title="Eye Screening"
            subtitle="Diabetic Retinopathy"
            Icon={Eye}
            gradient="linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)"
            shadow="0 8px 24px rgba(37, 99, 235, 0.35)"
            onClick={() => {
              sessionStorage.setItem('type', 'dr');
              navigate('/register');
            }}
          />
          <ActionCard
            title="Oral Screening"
            subtitle="Oral Cancer"
            Icon={Sparkles}
            gradient="linear-gradient(135deg, #2dd4bf 0%, #0f766e 100%)"
            shadow="0 8px 24px rgba(15, 118, 110, 0.35)"
            onClick={() => {
              sessionStorage.setItem('type', 'oral');
              navigate('/register');
            }}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}