import React from 'react'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Building,
  CalendarCheck,
  Wrench,
  Users,
  CreditCard,
  Bell,
  Utensils,
  ShieldAlert,
  FileText,
  User,
  CheckSquare
} from 'lucide-react'

export const Sidebar = ({ activeTab, setActiveTab, isMobileOpen, closeMobileSidebar }) => {
  const { currentUser } = useAuth()

  const role = currentUser?.role || 'student'

  const getMenuItems = () => {
    switch (role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
          { id: 'room', label: 'My Room & Bed', icon: Building },
          { id: 'leave', label: 'Leave & Gatepass', icon: CalendarCheck },
          { id: 'complaints', label: 'File Complaint', icon: Wrench },
          { id: 'mess', label: 'Mess Menu', icon: Utensils },
          { id: 'fees', label: 'Fee Payments', icon: CreditCard },
          { id: 'notices', label: 'Notices Board', icon: Bell },
          { id: 'profile', label: 'My Profile', icon: User }
        ]

      case 'warden':
        return [
          { id: 'dashboard', label: 'Occupancy Overview', icon: LayoutDashboard },
          { id: 'rooms', label: 'Room Allocations', icon: Building },
          { id: 'leaves', label: 'Leave Approvals', icon: CalendarCheck },
          { id: 'complaints', label: 'Maintenance Queue', icon: Wrench },
          { id: 'visitors', label: 'Visitor Permissions', icon: Users },
          { id: 'notices', label: 'Publish Announcements', icon: Bell },
          { id: 'reports', label: 'Hostel Reports', icon: FileText }
        ]

      case 'administrator':
        return [
          { id: 'dashboard', label: 'Admin Control Center', icon: LayoutDashboard },
          { id: 'students', label: 'Student Directory', icon: Users },
          { id: 'infrastructure', label: 'Blocks & Floor Config', icon: Building },
          { id: 'fees', label: 'Fee Collections & Dues', icon: CreditCard },
          { id: 'reports', label: 'System Analytics & Export', icon: FileText },
          { id: 'database', label: 'Supabase REST API DB', icon: ShieldAlert }
        ]

      case 'security':
        return [
          { id: 'dashboard', label: 'Gate Scan & Logs', icon: LayoutDashboard },
          { id: 'scanner', label: 'Verify Gatepass Code', icon: CheckSquare },
          { id: 'visitors', label: 'Visitor Check-In / Out', icon: Users },
          { id: 'logbook', label: 'Digital Gate Register', icon: FileText }
        ]

      case 'maintenance':
        return [
          { id: 'dashboard', label: 'Work Order Desk', icon: LayoutDashboard },
          { id: 'assigned', label: 'Assigned Repair Tickets', icon: Wrench },
          { id: 'completed', label: 'Completed Repairs History', icon: CheckSquare }
        ]

      default:
        return [{ id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }]
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      padding: '20px 16px',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      position: 'relative'
    }} className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Top User Profile Card */}
      <div>
        <div style={{
          padding: '14px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt="User avatar"
            style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand-primary)' }}
          />
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {currentUser?.name || 'User Resident'}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {currentUser?.studentId || currentUser?.employeeId || 'ID-001'}
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-subtle)', paddingLeft: '8px', marginBottom: '4px' }}>
            MAIN NAVIGATION
          </div>
          {menuItems.map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  closeMobileSidebar && closeMobileSidebar()
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'var(--brand-gradient)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={18} color={isActive ? '#fff' : 'var(--text-muted)'} />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{
        paddingTop: '16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '0.75rem',
        color: 'var(--text-subtle)',
        textAlign: 'center'
      }}>
        Smart Hostel v2.4 (Supabase)
      </div>
    </aside>
  )
}
