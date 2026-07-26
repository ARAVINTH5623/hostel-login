import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/StatCard'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import {
  Lock,
  QrCode,
  Users,
  CheckCircle2,
  XCircle,
  Search,
  Plus,
  ShieldCheck
} from 'lucide-react'

export const SecurityPortal = ({ activeTab }) => {
  const { currentUser, leaves, visitors, gateLogs, updateVisitorGateStatus, addGateLog, addVisitor } = useAuth()

  const [scanCode, setScanCode] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false)

  const [newVisitorForm, setNewVisitorForm] = useState({
    visitorName: '',
    studentName: 'Aravinth Kumar',
    relation: 'Parent',
    phone: '',
    purpose: '',
    idProof: ''
  })

  const handleVerifyCode = (e) => {
    e.preventDefault()
    const foundLeave = leaves.find(l => l.gatepassCode.toLowerCase() === scanCode.trim().toLowerCase())
    if (foundLeave) {
      setScanResult({
        valid: true,
        data: foundLeave,
        message: 'AUTHORIZED HOSTEL GATEPASS VERIFIED'
      })
    } else {
      setScanResult({
        valid: false,
        message: 'INVALID OR EXPIRED GATEPASS CODE'
      })
    }
  }

  const handleRecordGateMovement = (type) => {
    if (!scanResult?.data) return
    addGateLog({
      studentName: scanResult.data.studentName,
      studentId: scanResult.data.studentId,
      type: type,
      gatepassCode: scanResult.data.gatepassCode
    })
    setScanResult(null)
    setScanCode('')
  }

  const handleAddVisitorSubmit = (e) => {
    e.preventDefault()
    addVisitor(newVisitorForm)
    setIsVisitorModalOpen(false)
    setNewVisitorForm({ visitorName: '', studentName: 'Aravinth Kumar', relation: 'Parent', phone: '', purpose: '', idProof: '' })
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Security Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px' }}>
            GATE SECURITY & MOVEMENT REGISTRATION
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
            Main Gate Monitor - <span style={{ color: '#f59e0b' }}>{currentUser?.name}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Assigned Duty: {currentUser?.gateAssigned || 'Main Gate 1'}
          </p>
        </div>
        <button className="gradient-btn" style={{ background: '#f59e0b' }} onClick={() => setIsVisitorModalOpen(true)}>
          <Plus size={18} /> Register Walk-in Visitor
        </button>
      </div>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard title="Gate Passcode Verification" value="Active Scanner" subtext="Live Student Movement" icon={QrCode} color="#f59e0b" />
        <StatCard title="Active Visitors Inside" value={visitors.filter(v => v.gateStatus === 'Inside Premises').length} subtext="Check-in Logged" icon={Users} color="#10b981" />
        <StatCard title="Total Gate Logs Today" value={gateLogs.length} subtext="Verified Passes" icon={ShieldCheck} color="#6366f1" />
      </div>

      {/* Code Verification Scanner Desk */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <QrCode size={20} color="#f59e0b" /> Scan / Enter Student Gatepass Code
        </h3>

        <form onSubmit={handleVerifyCode} style={{ display: 'flex', gap: '12px', maxWidth: '600px', marginBottom: '20px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              type="text"
              required
              className="input-field"
              style={{ paddingLeft: '42px' }}
              value={scanCode}
              onChange={e => setScanCode(e.target.value)}
              placeholder="e.g. GP-988214"
            />
          </div>
          <button type="submit" className="gradient-btn" style={{ background: '#f59e0b' }}>
            Verify Pass
          </button>
        </form>

        {/* Verification Result Card */}
        {scanResult && (
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            background: scanResult.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            border: `1px solid ${scanResult.valid ? '#10b981' : '#ef4444'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {scanResult.valid ? <CheckCircle2 size={36} color="#10b981" /> : <XCircle size={36} color="#ef4444" />}
              <div>
                <h4 style={{ color: scanResult.valid ? '#10b981' : '#ef4444', fontSize: '1.1rem' }}>
                  {scanResult.message}
                </h4>
                {scanResult.valid && (
                  <div style={{ fontSize: '0.88rem', color: '#fff', marginTop: '4px' }}>
                    Student: <strong>{scanResult.data.studentName}</strong> ({scanResult.data.studentId}) | Destination: {scanResult.data.destination}
                  </div>
                )}
              </div>
            </div>

            {scanResult.valid && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="gradient-btn" style={{ background: '#10b981' }} onClick={() => handleRecordGateMovement('Exit')}>
                  Confirm Exit
                </button>
                <button className="btn-secondary" onClick={() => handleRecordGateMovement('Entry')}>
                  Confirm Entry
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visitor Check-In / Check-Out Log */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={20} color="#10b981" /> Visitor Entry & Exit Register
        </h3>
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Visitor Name</th>
                <th>Host Student</th>
                <th>Relation & ID</th>
                <th>Purpose</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Gate Action</th>
              </tr>
            </thead>
            <tbody>
              {visitors.map(vis => (
                <tr key={vis.id}>
                  <td><strong style={{ color: '#fff' }}>{vis.visitorName}</strong></td>
                  <td>{vis.studentName}</td>
                  <td>{vis.relation} ({vis.idProof})</td>
                  <td>{vis.purpose}</td>
                  <td>{vis.checkInTime || 'Not Arrived'}</td>
                  <td>{vis.checkOutTime || 'On Premises'}</td>
                  <td>
                    {vis.gateStatus !== 'Checked Out' ? (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {!vis.checkInTime && (
                          <button className="gradient-btn" style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#10b981' }} onClick={() => updateVisitorGateStatus(vis.id, 'Check-In')}>
                            Check-In
                          </button>
                        )}
                        {vis.checkInTime && !vis.checkOutTime && (
                          <button className="btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#f59e0b' }} onClick={() => updateVisitorGateStatus(vis.id, 'Check-Out')}>
                            Check-Out
                          </button>
                        )}
                      </div>
                    ) : (
                      <Badge status="Approved" text="Checked Out" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Visitor Modal */}
      <Modal isOpen={isVisitorModalOpen} onClose={() => setIsVisitorModalOpen(false)} title="Register Gate Visitor">
        <form onSubmit={handleAddVisitorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Visitor Full Name</label>
            <input required type="text" className="input-field" value={newVisitorForm.visitorName} onChange={e => setNewVisitorForm({ ...newVisitorForm, visitorName: e.target.value })} placeholder="e.g. Ramesh Kumar" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Student Host</label>
            <input required type="text" className="input-field" value={newVisitorForm.studentName} onChange={e => setNewVisitorForm({ ...newVisitorForm, studentName: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Relationship</label>
              <input required type="text" className="input-field" value={newVisitorForm.relation} onChange={e => setNewVisitorForm({ ...newVisitorForm, relation: e.target.value })} placeholder="Father / Mother" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Govt ID Proof</label>
              <input required type="text" className="input-field" value={newVisitorForm.idProof} onChange={e => setNewVisitorForm({ ...newVisitorForm, idProof: e.target.value })} placeholder="Aadhaar / Driving License" />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Purpose of Visit</label>
            <input required type="text" className="input-field" value={newVisitorForm.purpose} onChange={e => setNewVisitorForm({ ...newVisitorForm, purpose: e.target.value })} />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%', marginTop: '10px', background: '#f59e0b' }}>
            <Plus size={16} /> Submit Visitor Register
          </button>
        </form>
      </Modal>
    </div>
  )
}
