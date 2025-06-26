// src/components/common/Loading.jsx
import React from 'react'

const Loading = ({ size = 'md', text = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]} mb-4`}></div>
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}

// Inline loading for buttons
export const ButtonLoading = ({ size = 'sm' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
  }

  return <div className={`loading-spinner ${sizeClasses[size]}`}></div>
}

// Page loading overlay
export const PageLoading = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <Loading size="xl" text="Loading application..." />
    </div>
  )
}

// Skeleton loading for content
export const SkeletonLoader = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-200 rounded h-4 w-1/2"></div>
    </div>
  )
}

// Table skeleton loader
export const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="animate-pulse">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4 mb-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="bg-gray-200 rounded h-4 flex-1"
            ></div>
          ))}
        </div>
      ))}
    </div>
  )
}

// Card skeleton loader
export const CardSkeleton = () => {
  return (
    <div className="card animate-pulse">
      <div className="card-body">
        <div className="bg-gray-200 rounded h-6 w-3/4 mb-4"></div>
        <div className="bg-gray-200 rounded h-4 w-full mb-2"></div>
        <div className="bg-gray-200 rounded h-4 w-2/3 mb-4"></div>
        <div className="flex space-x-2">
          <div className="bg-gray-200 rounded h-8 w-20"></div>
          <div className="bg-gray-200 rounded h-8 w-16"></div>
        </div>
      </div>
    </div>
  )
}

export default Loading