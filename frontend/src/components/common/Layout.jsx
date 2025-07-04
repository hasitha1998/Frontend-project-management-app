// src/components/common/Layout.jsx
import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { useResponsive } from '../../hooks/useResponsive'
import Header from './Header'
import Sidebar from './Sidebar'
import MobileNavigation from './MobileNavigation'
import NotificationToast from './NotificationToast'

const Layout = () => {
  const { user } = useAuth()
  const { sidebarOpen, setSidebar, notifications } = useApp()
  const { isMobile } = useResponsive()
  const location = useLocation()

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      setSidebar(false)
    }
  }, [location.pathname, isMobile, sidebarOpen, setSidebar])

  // Close sidebar on mobile when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && sidebarOpen) {
      setSidebar(false)
    }
  }, [isMobile, sidebarOpen, setSidebar])

  // Set body class for layout
  useEffect(() => {
    document.body.className = 'bg-gray-50 min-h-screen'
    return () => {
      document.body.className = ''
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className={`flex-1 flex flex-col min-h-screen ${isMobile ? '' : 'md:ml-64'}`}>
        {/* Header */}
        <Header />

        {/* Page content */}
        <main className="flex-1 pt-16 pb-20 md:pb-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="animate-fade-in">
              <Outlet />
            </div>
          </div>
        </main>

        {/* Mobile navigation - only show on mobile */}
        {isMobile && <MobileNavigation />}
      </div>

      {/* Notification Toast Container */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  )
}

export default Layout