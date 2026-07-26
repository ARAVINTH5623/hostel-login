import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  Lock,
  Wrench,
  User,
  KeyRound,
  ArrowRight,
  Sparkles,
  Server,
  CheckCircle2
} from 'lucide-react'

export const LoginView = () => {
  const { login, supabaseApiState, theme, toggleTheme } = useAuth()
  const [selectedRole, setSelectedRole] = useState('student')
  const [email, setEmail] = useState('student@hostel.edu')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const roles = [
    {
      id: 'student',
      label: 'Student Portal',
      icon: GraduationCap,
      color: '#6366f1',
      defaultEmail: 'student@hostel.edu',
      desc: 'Access profile, leave applications, complaints, fee status, and mess menu.'
    },
    {
      id: 'warden',
      label: 'Warden Portal',
      icon: ShieldCheck,
      color: '#10b981',
      defaultEmail: 'warden@hostel.edu',
      desc: 'Monitor occupancy, approve leave requests, allocate rooms & manage visitors.'
    },
    {
      id: 'administrator',
      label: 'Admin Portal',
      icon: Building2,
      color: '#a855f7',
      defaultEmail: 'admin@hostel.edu',
      desc: 'Institutional control panel, user CRUD, room setup, fees & analytics.'
    },
    {
      id: 'security',
      label: 'Security Portal',
      icon: Lock,
      color: '#f59e0b',
      defaultEmail: 'security@hostel.edu',
      desc: 'Verify gate entry/exit, scan student gatepasses & log visitors.'
    },
    {
      id: 'maintenance',
      label: 'Maintenance Portal',
      icon: Wrench,
      color: '#3b82f6',
      defaultEmail: 'maintenance@hostel.edu',
      desc: 'View assigned repair tasks, update progress & resolve complaints.'
    }
  ]

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId)
    const roleObj = roles.find(r => r.id === roleId)
    if (roleObj) {
      setEmail(roleObj.defaultEmail)
    }
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      const res = login(selectedRole, email, password)
      setLoading(false)
      if (!res.success) {
        setError(res.message || 'Login failed. Please check your credentials.')
      }
    }, 400)
  }

  const currentRoleConfig = roles.find(r => r.id === selectedRole)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: 'radial-gradient(circle at 50% 20%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 1) 70%)',
      position: 'relative'
    }}>
      {/* Background ambient light */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '400px',
        height: '400px',
        background: 'rgba(99, 102, 241, 0.2)',
        filter: 'blur(120px)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: '1050px', position: 'relative', zIndex: 1 }}>
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '6px 16px',
            borderRadius: '99px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            color: '#818cf8',
            fontWeight: 600,
            fontSize: '0.85rem',
            marginBottom: '14px'
          }}>
            <Sparkles size={16} /> Institutional Digital Portal
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '8px' }}>
            Smart Hostel <span className="gradient-text">Management System</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Multi-portal web administration platform with role-based security & Supabase REST API backend.
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          marginBottom: '28px'
        }}>
          {roles.map(role => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-lg)',
                  background: isSelected ? 'rgba(30, 41, 59, 0.95)' : 'rgba(30, 41, 59, 0.4)',
                  border: isSelected ? `2px solid ${role.color}` : '1px solid var(--border-color)',
                  color: isSelected ? '#fff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  boxShadow: isSelected ? `0 8px 24px ${role.color}33` : 'none'
                }}
              >
                <div style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-md)',
                  background: `${role.color}20`,
                  color: role.color,
                  display: 'flex'
                }}>
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{role.label.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8 }}>Portal</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Login Card */}
        <div className="glass-panel" style={{ padding: '36px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
          {/* Left Column: Form */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: `${currentRoleConfig?.color}20`,
                color: currentRoleConfig?.color
              }}>
                {currentRoleConfig && <currentRoleConfig.icon size={26} />}
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#fff' }}>{currentRoleConfig?.label} Login</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Enter your registered institutional credentials</p>
              </div>
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--status-danger-bg)',
                border: '1px solid var(--status-danger)',
                color: 'var(--status-danger)',
                fontSize: '0.88rem',
                marginBottom: '16px'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Institutional Email
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '42px' }}
                    placeholder="name@hostel.edu"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '42px' }}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="gradient-btn"
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  marginTop: '8px',
                  background: currentRoleConfig?.color
                }}
              >
                {loading ? 'Authenticating...' : `Enter ${currentRoleConfig?.label.split(' ')[0]} Portal`}
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          {/* Right Column: Portal Feature Summary & Demo Fast Login */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.6)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justify: 'space-between',
            height: '100%'
          }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '8px' }}>Portal Capabilities</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '20px', lineHeight: 1.6 }}>
                {currentRoleConfig?.desc}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color={currentRoleConfig?.color} /> Role-Based Access Security
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color={currentRoleConfig?.color} /> Live Supabase REST API Sync
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                  <CheckCircle2 size={16} color={currentRoleConfig?.color} /> Real-time Activity Logs & Digital Passcode
                </div>
              </div>
            </div>

            {/* Supabase Status Footer & Demo Notice */}
            <div style={{
              paddingTop: '16px',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <Server size={14} color="#10b981" />
                Backend REST API: <span style={{ color: '#10b981', fontWeight: 600 }}>Active</span>
              </div>
              <button
                type="button"
                onClick={() => login(selectedRole, currentRoleConfig.defaultEmail, 'pass')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: currentRoleConfig?.color,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  textDecoration: 'underline'
                }}
              >
                Instant Demo Entry &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
