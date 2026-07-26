import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/StatCard'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import {
  Building,
  CalendarCheck,
  Wrench,
  Users,
  CheckCircle2,
  XCircle,
  Plus,
  Send,
  UserCheck
} from 'lucide-react'

export const WardenPortal = ({ activeTab }) => {
  const {
    currentUser,
    blocks,
    rooms,
    leaves,
    complaints,
    visitors,
    notices,
    users,
    updateLeaveStatus,
    assignComplaint,
    updateVisitorGateStatus,
    addNotice
  } = useAuth()

  // Notice Modal
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false)
  const [noticeForm, setNoticeForm] = useState({
    title: '',
    category: 'General',
    target: 'All Hostel Residents',
    content: ''
  })

  // Maintenance Technicians list
  const technicians = users.filter(u => u.role === 'maintenance')

  const totalBeds = blocks.reduce((acc, b) => acc + b.totalBeds, 0)
  const occupiedBeds = blocks.reduce((acc, b) => acc + b.occupiedBeds, 0)
  const vacantBeds = totalBeds - occupiedBeds
  const pendingLeaves = leaves.filter(l => l.status === 'Pending')
  const pendingComplaints = complaints.filter(c => c.status === 'Pending')

  const handleNoticeSubmit = (e) => {
    e.preventDefault()
    addNotice(noticeForm)
    setIsNoticeModalOpen(false)
    setNoticeForm({ title: '', category: 'General', target: 'All Hostel Residents', content: '' })
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Warden Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px' }}>
            WARDEN ADMINISTRATION DASHBOARD
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
            Welcome, <span style={{ color: '#10b981' }}>{currentUser?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Assigned Supervision: {currentUser?.assignedBlock || 'All Blocks'}
          </p>
        </div>
        <button className="gradient-btn" onClick={() => setIsNoticeModalOpen(true)}>
          <Plus size={18} /> Publish New Notice
        </button>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard title="Hostel Occupancy" value={`${occupiedBeds} / ${totalBeds}`} subtext={`${vacantBeds} Vacant Beds`} icon={Building} color="#10b981" />
        <StatCard title="Pending Leave Requests" value={pendingLeaves.length} subtext="Requires Gatepass Sign-off" icon={CalendarCheck} color="#6366f1" />
        <StatCard title="Pending Complaints" value={pendingComplaints.length} subtext="Requires Tech Assignment" icon={Wrench} color="#f59e0b" />
        <StatCard title="Total Visitors" value={visitors.length} subtext="Active Gate Logs" icon={Users} color="#3b82f6" />
      </div>

      {/* Leave Approval Queue */}
      {(activeTab === 'dashboard' || activeTab === 'leaves') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarCheck size={20} color="#10b981" /> Student Leave Application Queue
          </h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Room / Block</th>
                  <th>Reason & Destination</th>
                  <th>Dates</th>
                  <th>Emergency Phone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map(leave => (
                  <tr key={leave.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{leave.studentName}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{leave.studentId}</div>
                    </td>
                    <td>{leave.roomNo} ({leave.block})</td>
                    <td>
                      <div><strong>{leave.reason}</strong></div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>To: {leave.destination}</div>
                    </td>
                    <td>{leave.fromDate} &rarr; {leave.toDate}</td>
                    <td>{leave.emergencyPhone}</td>
                    <td><Badge status={leave.status} /></td>
                    <td>
                      {leave.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            className="gradient-btn"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', background: '#10b981' }}
                            onClick={() => updateLeaveStatus(leave.id, 'Approved', currentUser?.name)}
                          >
                            <CheckCircle2 size={14} /> Approve
                          </button>
                          <button
                            className="btn-secondary"
                            style={{ padding: '4px 10px', fontSize: '0.78rem', color: 'var(--status-danger)' }}
                            onClick={() => updateLeaveStatus(leave.id, 'Rejected', currentUser?.name)}
                          >
                            <XCircle size={14} /> Reject
                          </button>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Code: {leave.gatepassCode}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Complaint Assignment & Routing */}
      {(activeTab === 'dashboard' || activeTab === 'complaints') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wrench size={20} color="#f59e0b" /> Complaint Ticket Routing & Assignment
          </h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Student & Room</th>
                  <th>Category & Details</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assign Technician</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map(cmp => (
                  <tr key={cmp.id}>
                    <td><strong>{cmp.id}</strong></td>
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
                      <select
                        className="input-field"
                        style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                        value={cmp.assignedTo}
                        onChange={(e) => assignComplaint(cmp.id, e.target.value)}
                      >
                        <option value="Unassigned">-- Select Technician --</option>
                        {technicians.map(t => (
                          <option key={t.id} value={t.name}>{t.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Room Allocations Grid */}
      {(activeTab === 'rooms') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={20} color="#10b981" /> Hostel Block Rooms & Capacity Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {rooms.map(room => (
              <div key={room.id} style={{
                background: 'var(--bg-secondary)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <h4 style={{ color: '#fff' }}>Room {room.roomNo}</h4>
                  <Badge status={room.status} />
                </div>
                <div style={{ fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
                  <div><strong>Block:</strong> {room.block}</div>
                  <div><strong>Floor:</strong> {room.floor} | {room.type}</div>
                  <div><strong>Occupancy:</strong> {room.occupied} / {room.capacity} Beds</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Publish Notice Modal */}
      <Modal isOpen={isNoticeModalOpen} onClose={() => setIsNoticeModalOpen(false)} title="Publish Official Hostel Notice">
        <form onSubmit={handleNoticeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Notice Title</label>
            <input required type="text" className="input-field" value={noticeForm.title} onChange={e => setNoticeForm({ ...noticeForm, title: e.target.value })} placeholder="e.g. Mandatory Hostel Assembly" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Tag Category</label>
              <select className="input-field" value={noticeForm.category} onChange={e => setNoticeForm({ ...noticeForm, category: e.target.value })}>
                <option value="Urgent">Urgent</option>
                <option value="Event">Event</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Exam">Exam</option>
                <option value="General">General</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Target Audience</label>
              <select className="input-field" value={noticeForm.target} onChange={e => setNoticeForm({ ...noticeForm, target: e.target.value })}>
                <option value="All Hostel Residents">All Hostel Residents</option>
                <option value="Block A Residents">Block A Residents</option>
                <option value="Block B Residents">Block B Residents</option>
              </select>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Announcement Body</label>
            <textarea required rows={4} className="input-field" value={noticeForm.content} onChange={e => setNoticeForm({ ...noticeForm, content: e.target.value })} placeholder="Type full text announcement..." />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%', marginTop: '10px' }}>
            <Send size={16} /> Broadcast Notice
          </button>
        </form>
      </Modal>
    </div>
  )
}
