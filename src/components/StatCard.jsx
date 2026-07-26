import React from 'react'

export const StatCard = ({ title, value, subtext, icon: Icon, color = '#6366f1', trend }) => {
  return (
    <div className="glass-panel" style={{
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        right: '-10px',
        bottom: '-10px',
        width: '90px',
        height: '90px',
        background: `${color}10`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
          {title}
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '6px' }}>
          {value}
        </div>
        {subtext && (
          <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            {trend && <span style={{ color: color, fontWeight: 700 }}>{trend}</span>}
            {subtext}
          </div>
        )}
      </div>

      {Icon && (
        <div style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          background: `${color}20`,
          color: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icon size={26} />
        </div>
      )}
    </div>
  )
}
