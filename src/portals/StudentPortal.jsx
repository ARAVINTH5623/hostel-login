import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { StatCard } from '../components/StatCard'
import { Badge } from '../components/Badge'
import { Modal } from '../components/Modal'
import {
  Building,
  CalendarCheck,
  Wrench,
  CreditCard,
  Plus,
  QrCode,
  Download,
  Utensils,
  Bell,
  UserCheck,
  Send,
  AlertCircle
} from 'lucide-react'

export const StudentPortal = ({ activeTab }) => {
  const { currentUser, leaves, complaints, fees, notices, messMenu, rooms, addLeaveRequest, addComplaint, addVisitor } = useAuth()

  // Modal States
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false)
  const [isRoomChangeModalOpen, setIsRoomChangeModalOpen] = useState(false)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState(null)
  const [selectedGatepass, setSelectedGatepass] = useState(null)

  // Forms
  const [leaveForm, setLeaveForm] = useState({
    reason: '',
    destination: '',
    travelMode: 'Express Train',
    fromDate: '',
    toDate: '',
    emergencyPhone: currentUser?.guardianPhone || ''
  })

  const [complaintForm, setComplaintForm] = useState({
    category: 'Electrical',
    title: '',
    description: '',
    priority: 'Medium'
  })

  const [roomChangeForm, setRoomChangeForm] = useState({
    reason: '',
    preferredBlock: 'Block A - Everest (Boys)',
    preferredFloor: '2nd Floor'
  })

  // User specific filters
  const myLeaves = leaves.filter(l => l.studentId === currentUser?.studentId || l.studentName === currentUser?.name)
  const myComplaints = complaints.filter(c => c.studentId === currentUser?.studentId || c.studentName === currentUser?.name)
  const myFees = fees.filter(f => f.studentId === currentUser?.studentId || f.studentName === currentUser?.name)
  const myRoom = rooms.find(r => r.roomNo === currentUser?.roomNo?.split('-')[0]) || rooms[1]

  const handleLeaveSubmit = (e) => {
    e.preventDefault()
    addLeaveRequest(leaveForm)
    setIsLeaveModalOpen(false)
    setLeaveForm({ reason: '', destination: '', travelMode: 'Express Train', fromDate: '', toDate: '', emergencyPhone: currentUser?.guardianPhone || '' })
  }

  const handleComplaintSubmit = (e) => {
    e.preventDefault()
    addComplaint(complaintForm)
    setIsComplaintModalOpen(false)
    setComplaintForm({ category: 'Electrical', title: '', description: '', priority: 'Medium' })
  }

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Student Welcome Banner */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(30, 41, 59, 0.8) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--brand-accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            STUDENT DEDICATED PORTAL
          </span>
          <h2 style={{ fontSize: '1.8rem', color: '#fff', margin: '4px 0' }}>
            Welcome back, <span className="gradient-text">{currentUser?.name}</span>!
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {currentUser?.department} | {currentUser?.block} - Room {currentUser?.roomNo}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="gradient-btn" onClick={() => setIsLeaveModalOpen(true)}>
            <Plus size={18} /> Apply Leave
          </button>
          <button className="btn-secondary" onClick={() => setIsComplaintModalOpen(true)}>
            <Wrench size={18} /> File Complaint
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <StatCard title="Hostel Room" value={`Room ${currentUser?.roomNo}`} subtext={currentUser?.block} icon={Building} color="#6366f1" />
        <StatCard title="Active Leave Status" value={myLeaves[0]?.status || 'No Active Leave'} subtext={myLeaves[0]?.gatepassCode || 'Normal Stay'} icon={CalendarCheck} color="#10b981" />
        <StatCard title="Total Complaints" value={myComplaints.length} subtext={`${myComplaints.filter(c => c.status === 'Resolved').length} Resolved`} icon={Wrench} color="#f59e0b" />
        <StatCard title="Fee Payment" value={myFees[0]?.status || 'Paid'} subtext={`Receipt: ${myFees[0]?.receiptNo || 'N/A'}`} icon={CreditCard} color="#3b82f6" />
      </div>

      {/* Tab Switcher Content */}
      {activeTab === 'room' && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={20} color="#6366f1" /> Room & Accommodation Details
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--brand-accent)', marginBottom: '12px' }}>Room Specification</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                <div><strong>Hostel Block:</strong> {currentUser?.block}</div>
                <div><strong>Room Number:</strong> {currentUser?.roomNo}</div>
                <div><strong>Room Type:</strong> {myRoom?.type || 'Double Non-AC'}</div>
                <div><strong>Floor Level:</strong> {myRoom?.floor || '1st Floor'}</div>
                <div><strong>Occupancy Capacity:</strong> {myRoom?.capacity || 2} Beds</div>
              </div>
              <button className="btn-secondary" style={{ marginTop: '16px', width: '100%' }} onClick={() => setIsRoomChangeModalOpen(true)}>
                Request Room Transfer
              </button>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: '#10b981', marginBottom: '12px' }}>Roommates Information</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {myRoom?.occupants?.map((name, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                    <UserCheck size={20} color="#10b981" />
                    <div>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Bed Position: {idx === 0 ? 'A' : 'B'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Management Tab */}
      {(activeTab === 'dashboard' || activeTab === 'leave') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CalendarCheck size={20} color="#10b981" /> Leave Applications & Gatepass History
            </h3>
            <button className="gradient-btn" onClick={() => setIsLeaveModalOpen(true)}>
              <Plus size={16} /> New Application
            </button>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Leave ID</th>
                  <th>Reason</th>
                  <th>Destination</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>Gatepass QR</th>
                </tr>
              </thead>
              <tbody>
                {myLeaves.map(leave => (
                  <tr key={leave.id}>
                    <td><strong style={{ color: 'var(--brand-accent)' }}>{leave.id}</strong></td>
                    <td>{leave.reason}</td>
                    <td>{leave.destination}</td>
                    <td>{leave.fromDate} &rarr; {leave.toDate}</td>
                    <td><Badge status={leave.status} /></td>
                    <td>
                      {leave.status === 'Approved' ? (
                        <button
                          className="btn-secondary"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          onClick={() => setSelectedGatepass(leave)}
                        >
                          <QrCode size={14} /> View Passcode
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Pending Warden Approval</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Complaints Tab */}
      {(activeTab === 'dashboard' || activeTab === 'complaints') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Wrench size={20} color="#f59e0b" /> Registered Maintenance Complaints
            </h3>
            <button className="btn-secondary" onClick={() => setIsComplaintModalOpen(true)}>
              <Plus size={16} /> Report Issue
            </button>
          </div>

          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Category</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned Staff</th>
                </tr>
              </thead>
              <tbody>
                {myComplaints.map(cmp => (
                  <tr key={cmp.id}>
                    <td><strong style={{ color: '#f59e0b' }}>{cmp.id}</strong></td>
                    <td><span className="badge badge-info">{cmp.category}</span></td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{cmp.title}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{cmp.description}</div>
                    </td>
                    <td><Badge status={cmp.priority === 'Urgent' ? 'Urgent' : cmp.priority === 'High' ? 'Rejected' : 'Pending'} text={cmp.priority} /></td>
                    <td><Badge status={cmp.status} /></td>
                    <td>{cmp.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mess Menu Tab */}
      {(activeTab === 'mess') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Utensils size={20} color="#ec4899" /> Weekly Mess Menu Schedule
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {Object.entries(messMenu).map(([day, meals]) => (
              <div key={day} style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--brand-accent)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '10px' }}>
                  {day}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                  <div><strong style={{ color: '#f59e0b' }}>Breakfast:</strong> {meals.breakfast}</div>
                  <div><strong style={{ color: '#10b981' }}>Lunch:</strong> {meals.lunch}</div>
                  <div><strong style={{ color: '#3b82f6' }}>Snacks:</strong> {meals.snacks}</div>
                  <div><strong style={{ color: '#a855f7' }}>Dinner:</strong> {meals.dinner}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fees & Receipts Tab */}
      {(activeTab === 'fees') && (
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={20} color="#3b82f6" /> Hostel Fee Structure & Receipts
          </h3>
          <div className="data-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt No</th>
                  <th>Academic Period</th>
                  <th>Hostel Rent</th>
                  <th>Mess Fee</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myFees.map(fee => (
                  <tr key={fee.id}>
                    <td><strong>{fee.receiptNo}</strong></td>
                    <td>{fee.academicYear}</td>
                    <td>₹{fee.hostelRent.toLocaleString()}</td>
                    <td>₹{fee.messCharges.toLocaleString()}</td>
                    <td><strong>₹{fee.totalAmount.toLocaleString()}</strong></td>
                    <td><Badge status={fee.status} /></td>
                    <td>
                      <button
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                        onClick={() => {
                          setSelectedReceipt(fee)
                          setIsReceiptModalOpen(true)
                        }}
                      >
                        <Download size={14} /> Download Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Application Modal */}
      <Modal isOpen={isLeaveModalOpen} onClose={() => setIsLeaveModalOpen(false)} title="Submit Hostel Leave Application">
        <form onSubmit={handleLeaveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Reason for Leave</label>
            <input required type="text" className="input-field" value={leaveForm.reason} onChange={e => setLeaveForm({ ...leaveForm, reason: e.target.value })} placeholder="e.g. Family Function / Medical Checkup" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Destination City & Address</label>
            <input required type="text" className="input-field" value={leaveForm.destination} onChange={e => setLeaveForm({ ...leaveForm, destination: e.target.value })} placeholder="e.g. Coimbatore, Tamil Nadu" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Departure Date</label>
              <input required type="date" className="input-field" value={leaveForm.fromDate} onChange={e => setLeaveForm({ ...leaveForm, fromDate: e.target.value })} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Expected Return Date</label>
              <input required type="date" className="input-field" value={leaveForm.toDate} onChange={e => setLeaveForm({ ...leaveForm, toDate: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Emergency Contact Phone</label>
            <input required type="tel" className="input-field" value={leaveForm.emergencyPhone} onChange={e => setLeaveForm({ ...leaveForm, emergencyPhone: e.target.value })} />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%', marginTop: '10px' }}>
            <Send size={16} /> Submit to Warden
          </button>
        </form>
      </Modal>

      {/* Complaint Registration Modal */}
      <Modal isOpen={isComplaintModalOpen} onClose={() => setIsComplaintModalOpen(false)} title="Register Room Maintenance Complaint">
        <form onSubmit={handleComplaintSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Category</label>
            <select className="input-field" value={complaintForm.category} onChange={e => setComplaintForm({ ...complaintForm, category: e.target.value })}>
              <option value="Electrical">Electrical (Fan, Light, Socket)</option>
              <option value="Plumbing">Plumbing (Tap, Leakage, Toilet)</option>
              <option value="Internet">Internet / Wi-Fi</option>
              <option value="Furniture">Furniture (Bed, Table, Cupboard)</option>
              <option value="Cleanliness">Cleanliness & Sanitation</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Issue Title</label>
            <input required type="text" className="input-field" value={complaintForm.title} onChange={e => setComplaintForm({ ...complaintForm, title: e.target.value })} placeholder="Short description of the fault" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Detailed Explanation</label>
            <textarea required rows={3} className="input-field" value={complaintForm.description} onChange={e => setComplaintForm({ ...complaintForm, description: e.target.value })} placeholder="Specify exact room location and symptoms" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px' }}>Priority Level</label>
            <select className="input-field" value={complaintForm.priority} onChange={e => setComplaintForm({ ...complaintForm, priority: e.target.value })}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%', marginTop: '10px' }}>
            <Wrench size={16} /> Register Ticket
          </button>
        </form>
      </Modal>

      {/* Gatepass Modal */}
      <Modal isOpen={!!selectedGatepass} onClose={() => setSelectedGatepass(null)} title="Approved Digital Gatepass">
        {selectedGatepass && (
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <div style={{
              background: '#fff',
              color: '#000',
              padding: '24px',
              borderRadius: '16px',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              <QrCode size={160} />
              <div style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '1.2rem', marginTop: '12px' }}>
                {selectedGatepass.gatepassCode}
              </div>
            </div>
            <div style={{ textAlign: 'left', background: 'var(--bg-secondary)', padding: '16px', borderRadius: '12px', fontSize: '0.88rem' }}>
              <div><strong>Student:</strong> {selectedGatepass.studentName} ({selectedGatepass.studentId})</div>
              <div><strong>Validity:</strong> {selectedGatepass.fromDate} to {selectedGatepass.toDate}</div>
              <div><strong>Approved By:</strong> {selectedGatepass.approvedBy}</div>
            </div>
          </div>
        )}
      </Modal>

      {/* Receipt Modal */}
      <Modal isOpen={isReceiptModalOpen} onClose={() => setIsReceiptModalOpen(false)} title="Hostel Fee Receipt">
        {selectedReceipt && (
          <div style={{ background: '#fff', color: '#000', padding: '24px', borderRadius: '12px', fontSize: '0.9rem' }}>
            <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.3rem' }}>SMART HOSTEL MANAGEMENT SYSTEM</h3>
              <p style={{ fontSize: '0.8rem' }}>Official Institutional Payment Receipt</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div><strong>Receipt No:</strong> {selectedReceipt.receiptNo}</div>
              <div><strong>Transaction ID:</strong> {selectedReceipt.transactionId}</div>
              <div><strong>Student Name:</strong> {selectedReceipt.studentName}</div>
              <div><strong>Student ID:</strong> {selectedReceipt.studentId}</div>
              <div><strong>Academic Year:</strong> {selectedReceipt.academicYear}</div>
              <div><strong>Payment Date:</strong> {selectedReceipt.paymentDate}</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #000' }}>
                  <th>Fee Description</th>
                  <th style={{ textAlign: 'right' }}>Amount (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Hostel Rent Charges</td><td style={{ textAlign: 'right' }}>₹{selectedReceipt.hostelRent.toLocaleString()}</td></tr>
                <tr><td>Mess Charges</td><td style={{ textAlign: 'right' }}>₹{selectedReceipt.messCharges.toLocaleString()}</td></tr>
                <tr><td>Amenities & Maintenance</td><td style={{ textAlign: 'right' }}>₹{selectedReceipt.maintenanceFee.toLocaleString()}</td></tr>
                <tr style={{ borderTop: '2px solid #000', fontWeight: 'bold' }}>
                  <td>Total Paid</td>
                  <td style={{ textAlign: 'right' }}>₹{selectedReceipt.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.78rem', color: '#555' }}>
              This is a computer-generated institutional receipt. Signature not required.
            </div>
            <button className="gradient-btn no-print" style={{ width: '100%', marginTop: '16px' }} onClick={() => window.print()}>
              <Download size={16} /> Print Receipt
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}
