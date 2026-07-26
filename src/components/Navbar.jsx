import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import {
  Bell,
  Sun,
  Moon,
  LogOut,
  UserCheck,
  Server,
  Sparkles,
  ChevronDown,
  Menu,
  X
} from 'lucide-react'

export const Navbar = ({ toggleMobileSidebar, isMobileOpen }) => {
  const { currentUser, logout, switchRole, theme, toggleTheme, supabaseApiState, notices } = useAuth()
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [showNoticesMenu, setShowNoticesMenu] = useState(false)

  const roles = [
    { id: 'student', name: 'Student Portal', color: '#6366f1' },
    { id: 'warden', name: 'Warden Portal', color: '#10b981' },
    { id: 'administrator', name: 'Admin Portal', color: '#a855f7' },
    { id: 'security', name: 'Security Portal', color: '#f59e0b' },
    { id: 'maintenance', name: 'Maintenance Portal', color: '#3b82f6' }
  ]

  const currentRoleInfo = roles.find(r => r.id === currentUser?.role) || roles[0]

  return (
    <nav style={{
      height: '70px',
      background: 'var(--glass-bg)',
      backdropFilter: 'var(--glass-backdrop)',
      borderBottom: 'var(--glass-border)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Left: Mobile Menu Toggle & App Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={toggleMobileSidebar}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-main)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          className="mobile-menu-btn"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--brand-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 800,
            fontSize: '1.2rem',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)'
          }}>
            SH
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, lineHeight: 1.1 }}>
              Smart<span className="gradient-text">Hostel</span>
            </h2>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Institutional Portal</span>
          </div>
        </div>
      </div>

      {/* Center: Role Switcher & API Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Role Badge Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: '99px',
              background: `${currentRoleInfo.color}18`,
              border: `1px solid ${currentRoleInfo.color}40`,
              color: currentRoleInfo.color,
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentRoleInfo.color }} />
            {currentRoleInfo.name}
            <ChevronDown size={14} />
          </button>

          {showRoleMenu && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              top: '42px',
              right: 0,
              width: '220px',
              padding: '8px',
              zIndex: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-subtle)', padding: '6px 10px' }}>
                SWITCH USER ROLE
              </div>
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    switchRole(r.id)
                    setShowRoleMenu(false)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: currentUser?.role === r.id ? 'var(--bg-tertiary)' : 'transparent',
                    border: 'none',
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: r.color }} />
                    {r.name}
                  </div>
                  {currentUser?.role === r.id && <UserCheck size={14} color={r.color} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Supabase REST API Status Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 12px',
          borderRadius: '99px',
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: '#10b981',
          fontSize: '0.78rem',
          fontWeight: 600
        }} title="Connected to Supabase REST API: https://dxtnjfizdafgdcjpvvhl.supabase.co/rest/v1/">
          <Server size={14} />
          Supabase REST: Active
        </div>
      </div>

      {/* Right: Notifications, Theme & Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Notice Bell */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNoticesMenu(!showNoticesMenu)}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-main)',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            {notices.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'var(--status-danger)',
                color: '#fff',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {notices.length}
              </span>
            )}
          </button>

          {showNoticesMenu && (
            <div className="glass-panel animate-fade-in" style={{
              position: 'absolute',
              top: '48px',
              right: 0,
              width: '320px',
              padding: '16px',
              zIndex: 200
            }}>
              <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Latest Hostel Notices
                <span className="badge badge-info">{notices.length} New</span>
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '250px', overflowY: 'auto' }}>
                {notices.slice(0, 3).map(n => (
                  <div key={n.id} style={{
                    padding: '10px',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.82rem'
                  }}>
                    <div style={{ fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{n.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{n.content.substring(0, 70)}...</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--status-danger)',
            padding: '8px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  )
}
