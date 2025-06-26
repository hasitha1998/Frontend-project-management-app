// src/components/common/NotificationToast.jsx
import React, { useEffect, useState } from 'react'
import { useApp } from '../../context/AppContext'
import {
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
  X,
} from 'lucide-react'

const NotificationToast = ({ notification }) => {
  const { removeNotification } = useApp()
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Auto-remove after duration
    const duration = notification.duration || 5000
    const timer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [notification])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      removeNotification(notification.id)
    }, 300) // Match animation duration
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return CheckCircle
      case 'error':
        return AlertTriangle
      case 'warning':
        return AlertCircle
      case 'info':
      default:
        return Info
    }
  }

  const getStyles = () => {
    const baseStyles = 'border-l-4'
    switch (notification.type) {
      case 'success':
        return `${baseStyles} border-success-500 bg-success-50 text-success-800`
      case 'error':
        return `${baseStyles} border-danger-500 bg-danger-50 text-danger-800`
      case 'warning':
        return `${baseStyles} border-warning-500 bg-warning-50 text-warning-800`
      case 'info':
      default:
        return `${baseStyles} border-primary-500 bg-primary-50 text-primary-800`
    }
  }

  const getIconColor = () => {
    switch (notification.type) {
      case 'success':
        return 'text-success-500'
      case 'error':
        return 'text-danger-500'
      case 'warning':
        return 'text-warning-500'
      case 'info':
      default:
        return 'text-primary-500'
    }
  }

  const Icon = getIcon()

  return (
    <div
      className={`
        max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden
        transform transition-all duration-300 ease-in-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-full opacity-0 scale-95'}
        ${isExiting ? 'translate-x-full opacity-0 scale-95' : ''}
      `}
    >
      <div className={`p-4 ${getStyles()}`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${getIconColor()}`} aria-hidden="true" />
          </div>
          <div className="ml-3 w-0 flex-1">
            {notification.title && (
              <p className="text-sm font-medium">
                {notification.title}
              </p>
            )}
            <p className={`text-sm ${notification.title ? 'mt-1' : ''}`}>
              {notification.message}
            </p>
            {notification.action && (
              <div className="mt-3">
                <button
                  onClick={() => {
                    notification.action.onClick()
                    handleClose()
                  }}
                  className="text-sm font-medium underline hover:no-underline focus:outline-none"
                >
                  {notification.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={handleClose}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-md"
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar for auto-dismiss */}
      {!notification.persistent && (
        <div className="h-1 bg-gray-200">
          <div
            className={`h-full transition-all ease-linear ${
              notification.type === 'success' ? 'bg-success-500' :
              notification.type === 'error' ? 'bg-danger-500' :
              notification.type === 'warning' ? 'bg-warning-500' :
              'bg-primary-500'
            }`}
            style={{
              animation: `shrink ${notification.duration || 5000}ms linear`,
            }}
          />
        </div>
      )}
    </div>
  )
}

// Toast container component for multiple toasts
export const ToastContainer = () => {
  const { notifications } = useApp()

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  )
}

export default NotificationToast