import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  INITIAL_USERS,
  INITIAL_BLOCKS,
  INITIAL_ROOMS,
  INITIAL_LEAVES,
  INITIAL_COMPLAINTS,
  INITIAL_VISITORS,
  INITIAL_FEES,
  INITIAL_NOTICES,
  INITIAL_MESS_MENU,
  INITIAL_GATE_LOGS
} from '../services/mockData'
import { SupabaseApiService } from '../services/supabaseClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('hostel_theme') || 'dark')

  // Auth User state (default: student login or null)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hostel_current_user')
    return saved ? JSON.parse(saved) : INITIAL_USERS[0] // Default active demo user: Student
  })

  // Supabase API health state
  const [supabaseApiState, setSupabaseApiState] = useState({ status: 'checking', url: 'https://dxtnjfizdafgdcjpvvhl.supabase.co/rest/v1/' })

  // Persistent Application State
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('hostel_users')
    return saved ? JSON.parse(saved) : INITIAL_USERS
  })

  const [blocks, setBlocks] = useState(() => {
    const saved = localStorage.getItem('hostel_blocks')
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS
  })

  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('hostel_rooms')
    return saved ? JSON.parse(saved) : INITIAL_ROOMS
  })

  const [leaves, setLeaves] = useState(() => {
    const saved = localStorage.getItem('hostel_leaves')
    return saved ? JSON.parse(saved) : INITIAL_LEAVES
  })

  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('hostel_complaints')
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS
  })

  const [visitors, setVisitors] = useState(() => {
    const saved = localStorage.getItem('hostel_visitors')
    return saved ? JSON.parse(saved) : INITIAL_VISITORS
  })

  const [fees, setFees] = useState(() => {
    const saved = localStorage.getItem('hostel_fees')
    return saved ? JSON.parse(saved) : INITIAL_FEES
  })

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('hostel_notices')
    return saved ? JSON.parse(saved) : INITIAL_NOTICES
  })

  const [messMenu, setMessMenu] = useState(() => {
    const saved = localStorage.getItem('hostel_mess_menu')
    return saved ? JSON.parse(saved) : INITIAL_MESS_MENU
  })

  const [gateLogs, setGateLogs] = useState(() => {
    const saved = localStorage.getItem('hostel_gate_logs')
    return saved ? JSON.parse(saved) : INITIAL_GATE_LOGS
  })

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('hostel_theme', theme)
    document.documentElement.className = theme === 'light' ? 'light-theme' : ''
  }, [theme])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hostel_current_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('hostel_current_user')
    }
  }, [currentUser])

  useEffect(() => { localStorage.setItem('hostel_users', JSON.stringify(users)) }, [users])
  useEffect(() => { localStorage.setItem('hostel_blocks', JSON.stringify(blocks)) }, [blocks])
  useEffect(() => { localStorage.setItem('hostel_rooms', JSON.stringify(rooms)) }, [rooms])
  useEffect(() => { localStorage.setItem('hostel_leaves', JSON.stringify(leaves)) }, [leaves])
  useEffect(() => { localStorage.setItem('hostel_complaints', JSON.stringify(complaints)) }, [complaints])
  useEffect(() => { localStorage.setItem('hostel_visitors', JSON.stringify(visitors)) }, [visitors])
  useEffect(() => { localStorage.setItem('hostel_fees', JSON.stringify(fees)) }, [fees])
  useEffect(() => { localStorage.setItem('hostel_notices', JSON.stringify(notices)) }, [notices])
  useEffect(() => { localStorage.setItem('hostel_gate_logs', JSON.stringify(gateLogs)) }, [gateLogs])

  // Check Supabase API Health on mount
  useEffect(() => {
    SupabaseApiService.checkHealth().then(res => {
      setSupabaseApiState(res)
    })
  }, [])

  // Login handler
  const login = (role, email, password) => {
    const foundUser = users.find(u => u.role === role && u.email.toLowerCase() === email.toLowerCase())
    if (foundUser) {
      setCurrentUser(foundUser)
      return { success: true }
    }
    // Fallback: search by role or create role user
    const roleUser = users.find(u => u.role === role) || INITIAL_USERS.find(u => u.role === role)
    if (roleUser) {
      setCurrentUser(roleUser)
      return { success: true }
    }
    return { success: false, message: 'Invalid credentials or user role' }
  }

  // Quick switch role
  const switchRole = (targetRole) => {
    const targetUser = users.find(u => u.role === targetRole)
    if (targetUser) {
      setCurrentUser(targetUser)
    }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  // Data Actions
  const addLeaveRequest = (leaveData) => {
    const newLeave = {
      id: `LV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      studentId: currentUser?.studentId || 'STU-2024-8841',
      studentName: currentUser?.name || 'Student Resident',
      roomNo: currentUser?.roomNo || '102-B',
      block: currentUser?.block || 'Block A',
      status: 'Pending',
      approvedBy: null,
      gatepassCode: 'GP-PENDING',
      createdAt: new Date().toLocaleString(),
      ...leaveData
    }
    setLeaves(prev => [newLeave, ...prev])
    return newLeave
  }

  const updateLeaveStatus = (leaveId, status, wardenName) => {
    setLeaves(prev => prev.map(item => {
      if (item.id === leaveId) {
        const code = status === 'Approved' ? `GP-${Math.floor(100000 + Math.random() * 900000)}` : 'GP-REJECTED'
        return {
          ...item,
          status,
          approvedBy: wardenName,
          gatepassCode: code
        }
      }
      return item
    }))
  }

  const addComplaint = (complaintData) => {
    const newComplaint = {
      id: `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
      studentId: currentUser?.studentId || 'STU-2024-8841',
      studentName: currentUser?.name || 'Student Resident',
      roomNo: currentUser?.roomNo || '102-B',
      status: 'Pending',
      assignedTo: 'Unassigned',
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      ...complaintData
    }
    setComplaints(prev => [newComplaint, ...prev])
    return newComplaint
  }

  const updateComplaintStatus = (complaintId, status, notes = '') => {
    setComplaints(prev => prev.map(item => {
      if (item.id === complaintId) {
        return {
          ...item,
          status,
          resolutionNotes: notes || item.resolutionNotes,
          updatedAt: new Date().toLocaleString()
        }
      }
      return item
    }))
  }

  const assignComplaint = (complaintId, technicianName) => {
    setComplaints(prev => prev.map(item => {
      if (item.id === complaintId) {
        return {
          ...item,
          assignedTo: technicianName,
          status: item.status === 'Pending' ? 'In Progress' : item.status,
          updatedAt: new Date().toLocaleString()
        }
      }
      return item
    }))
  }

  const addVisitor = (visitorData) => {
    const newVisitor = {
      id: `VIS-${Math.floor(100 + Math.random() * 900)}`,
      studentId: currentUser?.studentId || 'STU-2024-8841',
      studentName: currentUser?.name || 'Student Resident',
      status: 'Approved',
      checkInTime: null,
      checkOutTime: null,
      gateStatus: 'Approved - Pending Entry',
      ...visitorData
    }
    setVisitors(prev => [newVisitor, ...prev])
  }

  const updateVisitorGateStatus = (visitorId, gateAction) => {
    setVisitors(prev => prev.map(item => {
      if (item.id === visitorId) {
        const now = new Date().toLocaleString()
        if (gateAction === 'Check-In') {
          return { ...item, checkInTime: now, gateStatus: 'Inside Premises' }
        } else if (gateAction === 'Check-Out') {
          return { ...item, checkOutTime: now, gateStatus: 'Checked Out' }
        }
      }
      return item
    }))
  }

  const addNotice = (noticeData) => {
    const newNotice = {
      id: `NTC-${Math.floor(500 + Math.random() * 500)}`,
      date: new Date().toISOString().split('T')[0],
      publishedBy: currentUser?.name || 'Hostel Admin',
      ...noticeData
    }
    setNotices(prev => [newNotice, ...prev])
  }

  const addGateLog = (logData) => {
    const newLog = {
      id: `GL-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: new Date().toLocaleString(),
      verifiedBy: currentUser?.name || 'Security Guard',
      ...logData
    }
    setGateLogs(prev => [newLog, ...prev])
  }

  const addUser = (userData) => {
    const newUser = {
      id: `usr_${userData.role}_${Date.now()}`,
      ...userData
    }
    setUsers(prev => [...prev, newUser])
  }

  return (
    <AuthContext.Provider value={{
      currentUser,
      login,
      logout,
      switchRole,
      theme,
      toggleTheme,
      supabaseApiState,
      users,
      blocks,
      rooms,
      leaves,
      complaints,
      visitors,
      fees,
      notices,
      messMenu,
      gateLogs,
      addLeaveRequest,
      updateLeaveStatus,
      addComplaint,
      updateComplaintStatus,
      assignComplaint,
      addVisitor,
      updateVisitorGateStatus,
      addNotice,
      addGateLog,
      addUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
