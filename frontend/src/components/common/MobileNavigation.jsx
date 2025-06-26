// src/components/common/MobileNavigation.jsx
import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import {
  Home,
  FolderOpen,
  CheckSquare,
  Calendar,
  User,
  Bell,
  BarChart3,
  Users,
} from 'lucide-react'

const MobileNavigation = () => {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  const location = useLocation()

  // Base navigation items for all users
  const baseNavItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Projects',
      href: '/projects',
      icon: FolderOpen,
    },
    {
      name: 'Tasks',
      href: '/tasks',
      icon: CheckSquare,
    },
    {
      name: 'Calendar',
      href: '/calendar',
      icon: Calendar,
    },
  ]

  // Admin gets additional admin item, employees get profile
  const finalNavItem = user?.role === 'admin' 
    ? {
        name: 'Admin',
        href: '/admin/dashboard',
        icon: BarChart3,
      }
    : {
        name: 'Profile',
        href: '/profile',
        icon: User,
      }

  const navItems = [...baseNavItems, finalNavItem]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden safe-area-bottom">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href || 
                          (item.href === '/admin/dashboard' && location.pathname.startsWith('/admin'))
          
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="relative">
                <Icon className="h-6 w-6" />
                {/* Show notification badge on dashboard or admin if there are unread notifications */}
                {(item.href === '/dashboard' || item.href === '/admin/dashboard') && unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-danger-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1 truncate">{item.name}</span>
            </NavLink>
          )
        })}
      </div>
      
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area bg-white"></div>
    </nav>
  )
}

export default MobileNavigation