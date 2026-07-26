import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/StatCard'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import {
  Building2,
  Users,
  CreditCard,
  FileText,
  ShieldCheck,
  Server,
  Plus,
  Download,
  CheckCircle2
} from 'lucide-react'

export const AdminPortal = ({ activeTab }) => {
  const { currentUser, users, blocks, rooms, fees, complaints, leaves, supabaseApiState, addUser } = useAuth()

  // User Add Modal
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [newUserForm, setNewUserForm] = useState({
    role: 'student',
    name: '',
    email: '',
    studentId: '',
    block: 'Block A (Everest)',
    roomNo: '103-A',
    department: 'Computer Science'
  })

  const totalFeeCollected = fees.reduce((acc, f) => acc + (f.paidAmount || 0), 0)
  const totalDuesPending = fees.reduce((acc, f) => acc + (f.dueAmount || 0), 0)

  const handleAddUserSubmit = (e) => {
    e.preventDefault()
    addUser(newUserForm)
    setIsUserModalOpen(false)
    setNewUserForm({ role: 'student', name: '', email: '', studentId: '', block: 'Block A (Everest)', roomNo: '103-A', department: 'Computer Science' })
  }

  const exportToCSV = (data, filename) => {
    if (!data.length) return
    const keys = Object.keys(data[0])
    const csvContent = "data:text/csv;charset=utf-8," +
      [keys.join(","), ...data.map(row => keys.map(k => `"${row[k] || ''}"`).join(","))].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${filename}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Admin Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1px' }}>
            INSTITUTIONAL CHIEF ADMINISTRATOR PORTAL
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
            System Control Panel - <span style={{ color: '#a855f7' }}>{currentUser?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Institutional Level User Control, Financial Audits & Supabase REST API Sync
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="gradient-btn" onClick={() => setIsUserModalOpen(true)}>
            <Plus size={18} /> Add User Account
          </button>
          <button className="btn-secondary" onClick={() => exportToCSV(users, 'Hostel_Students_List')}>
            <Download size={18} /> Export CSV Report
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard title="Total Registered Users" value={users.length} subtext={`${users.filter(u => u.role === 'student').length} Students`} icon={Users} color="#a855f7" />
        <StatCard title="Fee Collections" value={`₹${totalFeeCollected.toLocaleString()}`} subtext={`₹${totalDuesPending.toLocaleString()} Pending Dues`} icon={CreditCard} color="#10b981" />
        <StatCard title="Hostel Blocks Configured" value={blocks.length} subtext={`${rooms.length} Active Rooms`} icon={Building2} color="#6366f1" />
        <StatCard title="Supabase API Endpoint" value="Rest API v1" subtext="https://dxtnjfizdafgdcjpvvhl.supabase.co" icon={Server} color="#3b82f6" />
      </div>

      {/* User Directory Management */}
      {(activeTab === 'dashboard' || activeTab === 'students') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="#a855f7" /> User Accounts & Staff Directory
            </h3>
            <button className="btn-secondary" onClick={() => exportToCSV(users, 'Users_Directory')}>
              <Download size={16} /> Export Users
            </button>
          </div>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>ID / Code</th>
                  <th>Department / Block</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img src={u.avatar} alt="avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        <strong style={{ color: '#fff' }}>{u.name}</strong>
                      </div>
                    </td>
                    <td><span className="badge badge-info" style={{ textTransform: 'capitalize' }}>{u.role}</span></td>
                    <td>{u.email}</td>
                    <td><strong>{u.studentId || u.employeeId || 'N/A'}</strong></td>
                    <td>{u.department || u.block || u.assignedBlock || 'General'}</td>
                    <td>{u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fees & Collections Audit */}
      {(activeTab === 'fees') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={20} color="#10b981" /> Institutional Fee Collections Audit
            </h3>
            <button className="gradient-btn" onClick={() => exportToCSV(fees, 'Fee_Collections_Audit')}>
              <Download size={16} /> Export Financial Audit
            </button>
          </div>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt No</th>
                  <th>Student Name</th>
                  <th>Total Fee</th>
                  <th>Paid Amount</th>
                  <th>Due Amount</th>
                  <th>Payment Status</th>
                  <th>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {fees.map(f => (
                  <tr key={f.id}>
                    <td><strong>{f.receiptNo}</strong></td>
                    <td>{f.studentName}</td>
                    <td>₹{f.totalAmount.toLocaleString()}</td>
                    <td style={{ color: '#10b981', fontWeight: 700 }}>₹{f.paidAmount.toLocaleString()}</td>
                    <td style={{ color: f.dueAmount > 0 ? 'var(--status-danger)' : 'var(--text-subtle)', fontWeight: 700 }}>
                      ₹{f.dueAmount.toLocaleString()}
                    </td>
                    <td><Badge status={f.status} /></td>
                    <td>{f.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Supabase API DB Console View */}
      {(activeTab === 'database') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={20} color="#3b82f6" /> Supabase REST API Console Status
          </h3>
          <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <CheckCircle2 size={24} color="#10b981" />
              <div>
                <h4 style={{ color: '#fff' }}>Target Supabase Endpoint Active</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>https://dxtnjfizdafgdcjpvvhl.supabase.co/rest/v1/</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--brand-accent)' }}>students</strong> table: Synced
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--brand-accent)' }}>wardens</strong> table: Synced
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--brand-accent)' }}>leave_applications</strong> table: Synced
              </div>
              <div style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--brand-accent)' }}>complaints</strong> table: Synced
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <Modal isOpen={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title="Create New System User Account">
        <form onSubmit={handleAddUserSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Role Type</label>
            <select className="input-field" value={newUserForm.role} onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="warden">Hostel Warden</option>
              <option value="security">Security Guard</option>
              <option value="maintenance">Maintenance Technician</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Full Name</label>
            <input required type="text" className="input-field" value={newUserForm.name} onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })} placeholder="e.g. Ramesh Kumar" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Institutional Email</label>
            <input required type="email" className="input-field" value={newUserForm.email} onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="ramesh@hostel.edu" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Student / Staff ID</label>
            <input required type="text" className="input-field" value={newUserForm.studentId} onChange={e => setNewUserForm({ ...newUserForm, studentId: e.target.value })} placeholder="STU-2026-9900" />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%', marginTop: '10px' }}>
            <Plus size={16} /> Save Account
          </button>
        </form>
      </Modal>
    </div>
  )
}
