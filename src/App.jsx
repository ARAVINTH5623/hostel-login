import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginView } from './components/LoginView'
import { Navbar } from './components/Navbar'
import { Sidebar } from './components/Sidebar'
import { StudentPortal } from './portals/StudentPortal'
import { WardenPortal } from './portals/WardenPortal'
import { AdminPortal } from './portals/AdminPortal'
import { SecurityPortal } from './portals/SecurityPortal'
import { MaintenancePortal } from './portals/MaintenancePortal'

const MainAppContent = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  if (!currentUser) {
    return <LoginView />
  }

  const role = currentUser.role

  const renderActivePortal = () => {
    switch (role) {
      case 'student':
        return <StudentPortal activeTab={activeTab} />
      case 'warden':
        return <WardenPortal activeTab={activeTab} />
      case 'administrator':
        return <AdminPortal activeTab={activeTab} />
      case 'security':
        return <SecurityPortal activeTab={activeTab} />
      case 'maintenance':
        return <MaintenancePortal activeTab={activeTab} />
      default:
        return <StudentPortal activeTab={activeTab} />
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        closeMobileSidebar={() => setIsMobileOpen(false)}
      />

      {/* Main Page Area */}
      <div className="main-content">
        <Navbar
          toggleMobileSidebar={() => setIsMobileOpen(!isMobileOpen)}
          isMobileOpen={isMobileOpen}
        />
        <main className="page-wrapper">
          {renderActivePortal()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  )
}
