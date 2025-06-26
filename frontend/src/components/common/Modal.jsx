// src/components/common/Modal.jsx
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
}) => {
  const modalRef = useRef(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27 && closeOnEscape) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Focus management
      if (modalRef.current) {
        modalRef.current.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '2xl': 'max-w-6xl',
    full: 'max-w-full mx-4',
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
          onClick={handleOverlayClick}
          aria-hidden="true"
        />

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        {/* Modal panel */}
        <div
          ref={modalRef}
          className={`inline-block w-full ${sizeClasses[size]} my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg ${className}`}
          tabIndex={-1}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 ${headerClassName}`}>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-lg hover:bg-gray-100 touch-target transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className={`px-6 py-4 ${bodyClassName}`}>
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // Render modal using portal
  return createPortal(modalContent, document.body)
}

// Confirmation Modal Component
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger',
  isLoading = false,
}) => {
  const buttonColors = {
    danger: 'btn-danger',
    primary: 'btn-primary',
    success: 'btn-success',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white',
  }

  const iconMap = {
    danger: AlertTriangle,
    primary: Info,
    success: CheckCircle,
    warning: AlertCircle,
  }

  const iconColors = {
    danger: 'text-danger-600',
    primary: 'text-primary-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
  }

  const Icon = iconMap[type]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${iconColors[type]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-secondary btn-md"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm()
              if (!isLoading) onClose()
            }}
            disabled={isLoading}
            className={`btn ${buttonColors[type]} btn-md flex items-center`}
          >
            {isLoading && (
              <div className="loading-spinner h-4 w-4 mr-2"></div>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Alert Modal Component
export const AlertModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  buttonText = 'OK',
}) => {
  const iconMap = {
    success: CheckCircle,
    error: AlertTriangle,
    warning: AlertCircle,
    info: Info,
  }

  const iconColors = {
    success: 'text-success-600',
    error: 'text-danger-600',
    warning: 'text-warning-600',
    info: 'text-primary-600',
  }

  const buttonColors = {
    success: 'btn-success',
    error: 'btn-danger',
    warning: 'bg-warning-600 hover:bg-warning-700 text-white',
    info: 'btn-primary',
  }

  const Icon = iconMap[type]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className={`flex-shrink-0 ${iconColors[type]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-gray-600">{message}</p>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={onClose}
            className={`btn ${buttonColors[type]} btn-md`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Modal>
  )
}

// Loading Modal Component
export const LoadingModal = ({
  isOpen,
  title = 'Loading...',
  message = 'Please wait while we process your request.',
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} // Cannot close loading modal
      title={title} 
      size="sm"
      showCloseButton={false}
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div className="flex items-center space-x-3 py-4">
        <div className="loading-spinner h-8 w-8"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </Modal>
  )
}

// Form Modal Component
export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Save',
  cancelText = 'Cancel',
  isLoading = false,
  isSubmitDisabled = false,
  size = 'md',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(e)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {children}
        
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="btn btn-secondary btn-md"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            disabled={isLoading || isSubmitDisabled}
            className="btn btn-primary btn-md flex items-center"
          >
            {isLoading && (
              <div className="loading-spinner h-4 w-4 mr-2"></div>
            )}
            {submitText}
          </button>
        </div>
      </form>
    </Modal>
  )
}

// Image Modal Component
export const ImageModal = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt = 'Image',
  title,
}) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      size="2xl"
      bodyClassName="p-0"
    >
      <div className="flex items-center justify-center bg-gray-100 rounded-b-lg">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-w-full max-h-96 object-contain"
        />
      </div>
    </Modal>
  )
}

export default Modal