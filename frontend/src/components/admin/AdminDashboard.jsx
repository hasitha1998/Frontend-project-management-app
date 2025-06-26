// src/components/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useApp } from '../../context/AppContext'
import Loading from '../common/Loading'
import {
  Users,
  FolderOpen,
  CheckSquare,
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  UserCheck,
  Activity,
  BarChart3,
} from 'lucide-react'

const AdminDashboard = () => {
  const { user } = useAuth()
  const { addNotification } = useApp()
  const [stats, setStats] = useState(null)
  const [recentActivity, setRecentActivity] = useState([])
  const [systemHealth, setSystemHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Simulate API calls - replace with real API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStats({
        totalUsers: 42,
        activeUsers: 38,
        totalProjects: 15,
        activeProjects: 12,
        totalTasks: 156,
        completedTasks: 98,
        pendingTasks: 58,
        overdueTasks: 8,
        systemUptime: '99.9%',
        storageUsed: '2.4 GB',
        apiCalls: '12.4K',
        newUsersThisMonth: 5,
      })

      setRecentActivity([
        {
          id: 1,
          type: 'user_created',
          message: 'New user John Smith was created',
          timestamp: '2 minutes ago',
          severity: 'info',
        },
        {
          id: 2,
          type: 'project_completed',
          message: 'Website Redesign project was completed',
          timestamp: '1 hour ago',
          severity: 'success',
        },
        {
          id: 3,
          type: 'task_overdue',
          message: '3 tasks are now overdue',
          timestamp: '2 hours ago',
          severity: 'warning',
        },
        {
          id: 4,
          type: 'user_login',
          message: 'Peak login time reached (25 concurrent users)',
          timestamp: '3 hours ago',
          severity: 'info',
        },
        {
          id: 5,
          type: 'system_backup',
          message: 'Daily backup completed successfully',
          timestamp: '6 hours ago',
          severity: 'success',
        },
      ])

      setSystemHealth({
        server: 'healthy',
        database: 'healthy',
        storage: 'warning',
        backup: 'healthy',
      })

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Failed to load dashboard data',
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading text="Loading admin dashboard..." />
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Admin Dashboard 👋
        </h1>
        <p className="text-blue-100">
          Welcome back, {user?.firstName}! Here's your system overview.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          subtitle={`${stats.activeUsers} active`}
          icon={Users}
          color="primary"
          trend={`+${stats.newUsersThisMonth} this month`}
          trendType="positive"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          subtitle={`${stats.totalProjects} total`}
          icon={FolderOpen}
          color="success"
          trend="2 completed this week"
          trendType="positive"
        />
        <StatCard
          title="Tasks Overview"
          value={stats.completedTasks}
          subtitle={`${stats.pendingTasks} pending`}
          icon={CheckSquare}
          color="warning"
          trend={`${stats.overdueTasks} overdue`}
          trendType={stats.overdueTasks > 5 ? 'negative' : 'neutral'}
        />
        <StatCard
          title="System Health"
          value="99.9%"
          subtitle="Uptime"
          icon={Activity}
          color="success"
          trend="All systems operational"
          trendType="positive"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Activity
                </h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Health & Quick Actions */}
        <div className="space-y-6">
          {/* System Health */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                System Health
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <HealthItem label="Server" status={systemHealth.server} />
                <HealthItem label="Database" status={systemHealth.database} />
                <HealthItem label="Storage" status={systemHealth.storage} />
                <HealthItem label="Backup" status={systemHealth.backup} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Quick Actions
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <button className="btn btn-primary btn-sm w-full">
                  Create New User
                </button>
                <button className="btn btn-secondary btn-sm w-full">
                  System Backup
                </button>
                <button className="btn btn-secondary btn-sm w-full">
                  Generate Report
                </button>
                <button className="btn btn-secondary btn-sm w-full">
                  View Logs
                </button>
              </div>
            </div>
          </div>

          {/* System Resources */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">
                Resources
              </h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage</span>
                  <span className="text-sm font-medium">{stats.storageUsed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">API Calls</span>
                  <span className="text-sm font-medium">{stats.apiCalls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uptime</span>
                  <span className="text-sm font-medium text-success-600">
                    {stats.systemUptime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stat Card Component
const StatCard = ({ title, value, subtitle, icon: Icon, color, trend, trendType }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-100',
    success: 'text-success-600 bg-success-100',
    warning: 'text-warning-600 bg-warning-100',
    danger: 'text-danger-600 bg-danger-100',
  }

  const trendColors = {
    positive: 'text-success-600',
    negative: 'text-danger-600',
    neutral: 'text-gray-500',
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500 mb-2">{subtitle}</p>
            )}
            {trend && (
              <p className={`text-xs ${trendColors[trendType]}`}>
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Activity Item Component
const ActivityItem = ({ activity }) => {
  const getSeverityColor = (severity) => {
    const colors = {
      info: 'text-primary-600 bg-primary-100',
      success: 'text-success-600 bg-success-100',
      warning: 'text-warning-600 bg-warning-100',
      error: 'text-danger-600 bg-danger-100',
    }
    return colors[severity] || colors.info
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'success':
        return CheckSquare
      case 'warning':
        return AlertTriangle
      case 'error':
        return AlertTriangle
      default:
        return Activity
    }
  }

  const SeverityIcon = getSeverityIcon(activity.severity)

  return (
    <div className="flex items-start space-x-3">
      <div className={`p-2 rounded-lg ${getSeverityColor(activity.severity)}`}>
        <SeverityIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">
          {activity.message}
        </p>
        <p className="text-xs text-gray-500 flex items-center mt-1">
          <Clock className="h-3 w-3 mr-1" />
          {activity.timestamp}
        </p>
      </div>
    </div>
  )
}

// Health Item Component
const HealthItem = ({ label, status }) => {
  const getStatusColor = (status) => {
    const colors = {
      healthy: 'text-success-600 bg-success-100',
      warning: 'text-warning-600 bg-warning-100',
      error: 'text-danger-600 bg-danger-100',
    }
    return colors[status] || colors.error
  }

  const getStatusText = (status) => {
    const texts = {
      healthy: 'Healthy',
      warning: 'Warning',
      error: 'Error',
    }
    return texts[status] || 'Unknown'
  }

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={`badge ${getStatusColor(status)}`}>
        {getStatusText(status)}
      </span>
    </div>
  )
}

export default AdminDashboard