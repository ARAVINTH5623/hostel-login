import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/StatCard'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import {
  Wrench,
  CheckSquare,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react'

export const MaintenancePortal = ({ activeTab }) => {
  const { currentUser, complaints, updateComplaintStatus } = useAuth()

  const [selectedTicket, setSelectedTicket] = useState(null)
  const [resolutionNotes, setResolutionNotes] = useState('')

  const myWorkOrders = complaints.filter(c => c.assignedTo === currentUser?.name || c.assignedTo === 'Unassigned')
  const pendingOrders = myWorkOrders.filter(c => c.status !== 'Resolved')
  const completedOrders = myWorkOrders.filter(c => c.status === 'Resolved')

  const handleResolveSubmit = (e) => {
    e.preventDefault()
    if (!selectedTicket) return
    updateComplaintStatus(selectedTicket.id, 'Resolved', resolutionNotes)
    setSelectedTicket(null)
    setResolutionNotes('')
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Maintenance Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '1px' }}>
            MAINTENANCE & REPAIR SERVICE DESK
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
            Technician Dashboard - <span style={{ color: '#3b82f6' }}>{currentUser?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Specialization: {currentUser?.specialization || 'Electrical & General Maintenance'}
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard title="Assigned Work Orders" value={myWorkOrders.length} subtext="Active Repair List" icon={Wrench} color="#3b82f6" />
        <StatCard title="Pending Repairs" value={pendingOrders.length} subtext="Requires Attention" icon={Clock} color="#f59e0b" />
        <StatCard title="Resolved Tickets" value={completedOrders.length} subtext="Completed Tasks" icon={CheckSquare} color="#10b981" />
      </div>

      {/* Assigned Tickets Desk */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wrench size={20} color="#3b82f6" /> Maintenance Tickets & Work Orders
        </h3>

        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Student & Room</th>
                <th>Category & Fault Details</th>
                <th>Priority</th>
                <th>Current Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myWorkOrders.map(cmp => (
                <tr key={cmp.id}>
                  <td><strong style={{ color: '#3b82f6' }}>{cmp.id}</strong></td>
                  <td>
                    <div>{cmp.studentName}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Room {cmp.roomNo}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{cmp.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{cmp.description}</div>
                  </td>
                  <td><Badge status={cmp.priority === 'Urgent' ? 'Urgent' : 'Pending'} text={cmp.priority} /></td>
                  <td><Badge status={cmp.status} /></td>
                  <td>
                    {cmp.status !== 'Resolved' ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {cmp.status === 'Pending' && (
                          <button
                            className="gradient-btn"
                            style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#3b82f6' }}
                            onClick={() => updateComplaintStatus(cmp.id, 'In Progress')}
                          >
                            Start Work
                          </button>
                        )}
                        <button
                          className="gradient-btn"
                          style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#10b981' }}
                          onClick={() => setSelectedTicket(cmp)}
                        >
                          Mark Resolved
                        </button>
                      </div>
                    ) : (
                      <Badge status="Approved" text="Resolved" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Resolve Modal */}
      <Modal isOpen={!!selectedTicket} onClose={() => setSelectedTicket(null)} title="Mark Maintenance Ticket Resolved">
        {selectedTicket && (
          <form onSubmit={handleResolveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '12px', borderRadius: '8px', fontSize: '0.88rem' }}>
              <div><strong>Ticket:</strong> {selectedTicket.id} - {selectedTicket.title}</div>
              <div><strong>Location:</strong> Room {selectedTicket.roomNo}</div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Technician Resolution Summary</label>
              <textarea
                required
                rows={3}
                className="input-field"
                value={resolutionNotes}
                onChange={e => setResolutionNotes(e.target.value)}
                placeholder="Describe fix implemented (e.g. Replaced fan regulator coil and tested speed)"
              />
            </div>
            <button type="submit" className="gradient-btn" style={{ width: '100%', background: '#10b981' }}>
              <CheckCircle2 size={16} /> Close Ticket & Notify Student
            </button>
          </form>
        )}
      </Modal>
    </div>
  )
}
