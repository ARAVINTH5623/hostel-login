import React from 'react'

export const Badge = ({ status, text }) => {
  const display = text || status

  const getStyle = () => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'paid':
      case 'resolved':
      case 'occupied':
      case 'active':
      case 'checked out':
      case 'online':
        return 'badge-success'

      case 'pending':
      case 'in progress':
      case 'partial':
      case 'available':
      case 'inside premises':
        return 'badge-warning'

      case 'rejected':
      case 'unpaid':
      case 'urgent':
      case 'maintenance':
      case 'overdue':
        return 'badge-danger'

      default:
        return 'badge-info'
    }
  }

  return (
    <span className={`badge ${getStyle()}`}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
      {display}
    </span>
  )
}
