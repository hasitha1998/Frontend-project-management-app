// src/components/common/Sidebar.jsx
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import { useResponsive } from '../../hooks/useResponsive'
import {
  Home,
  FolderOpen,
  CheckSquare,
  Calendar,
  User,
  Users,
  Settings,
  Bell,
  BarChart3,
  X,
  Shield,
  HelpCircle,
  FileText,
  Clock,
} from 'lucide-react'

const Sidebar = () => {
  const { user } = useAuth()
  const { sidebarOpen, setSidebar } = useApp()
  const { isMobile } = useResponsive()
  const location = useLocation()

  const closeSidebar = () => {
    if (isMobile) {
      setSidebar(false)
    }
  }

  // Navigation items for employees
  const employeeNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and quick stats',
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: FolderOpen,
      description: 'Your assigned projects',
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CheckSquare,
      description: 'Manage your daily tasks',
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      description: 'Events and deadlines',
    },
    {
      name: 'Time Tracking',
      href: '/timetracking',
      icon: Clock,
      description: 'Log your work hours',
    },
  ]

  // Navigation items for admins (includes employee items)
  const adminNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      description: 'Overview and quick stats',
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: FolderOpen,
      description: 'All company projects',
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CheckSquare,
      description: 'All tasks management',
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
      description: 'Company calendar',
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: FileText,
      description: 'Analytics and reports',
    },
  ]

  // Admin-only section
  const adminOnlyItems = [
    {
      name: 'Admin Dashboard',
      href: '/admin/dashboard',
      icon: BarChart3,
      description: 'System analytics',
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      description: 'Manage employees',
    },
    {
      name: 'System Settings',
      href: '/admin/settings',
      icon: Settings,
      description: 'System configuration',
    },
    {
      name: 'Notices',
      href: '/admin/notices',
      icon: Bell,
      description: 'Manage announcements',
    },
  ]

  // User section (always visible)
  const userItems = [
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
      description: 'Your profile settings',
    },
    {
      name: 'Help & Support',
      href: '/help',
      icon: HelpCircle,
      description: 'Get help and support',
    },
  ]

  const mainNavigationItems = user?.role === 'admin' ? adminNavItems : employeeNavItems

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-primary">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-primary-600 font-bold text-lg">PM</span>
              </div>
              <div className="ml-3 text-white">
                <span className="text-lg font-bold block leading-none">Project</span>
                <span className="text-sm opacity-90 leading-none">Manager</span>
              </div>
            </div>
            
            {/* Mobile close button */}
            {isMobile && (
              <button
                onClick={closeSidebar}
                className="p-1 rounded-lg hover:bg-white hover:bg-opacity-20 touch-target text-white"
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
            {/* Main Navigation */}
            <div className="space-y-1">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Main Menu
              </h3>
              {mainNavigationItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={closeSidebar}
                    className={`nav-item group ${isActive ? 'active' : ''}`}
                    title={item.description}
                  >
                    <Icon className="h-5 w-5 mr-3 flex-shrink-0 transition-colors" />
                    <div className="flex-1 min-w-0">
                      <span className="truncate font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                )
              })}
            </div>

            {/* Admin Section */}
            {user?.role === 'admin' && (
              <div className="pt-6 space-y-1">
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center">
                  <Shield className="h-3 w-3 mr-2" />
                  Administration
                </h3>
                {adminOnlyItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  
                  return (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      onClick={closeSidebar}
                      className={`nav-item group ${isActive ? 'active' : ''}`}
                      title={item.description}
                    >
                      <Icon className="h-5 w-5 mr-3 flex-shrink-0 transition-colors" />
                      <div className="flex-1 min-w-0">
                        <span className="truncate font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors">
                          {item.description}
                        </p>
                      </div>
                    </NavLink>
                  )
                })}
              </div>
            )}

            {/* User Section */}
            <div className="pt-6 space-y-1">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Account
              </h3>
              {userItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={closeSidebar}
                    className={`nav-item group ${isActive ? 'active' : ''}`}
                    title={item.description}
                  >
                    <Icon className="h-5 w-5 mr-3 flex-shrink-0 transition-colors" />
                    <div className="flex-1 min-w-0">
                      <span className="truncate font-medium">{item.name}</span>
                      <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </NavLink>
                )
              })}
            </div>
          </nav>

          {/* User info at bottom */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="User avatar"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-primary-600" />
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-xs text-gray-500 truncate capitalize">
                    {user?.role}
                  </p>
                  {user?.role === 'admin' && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </span>
                  )}
                </div>
                {user?.department && (
                  <p className="text-xs text-gray-400 truncate">
                    {user.department}
                  </p>
                )}
              </div>
            </div>
            
            {/* Online status indicator */}
            <div className="mt-3 flex items-center text-xs text-gray-500">
              <div className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></div>
              Online
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar