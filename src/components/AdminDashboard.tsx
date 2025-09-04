import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, AlertTriangle, MessageSquare, Calendar, TrendingUp, Shield, Download, Filter } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  chatSessions: number;
  bookings: number;
  forumPosts: number;
  crisisInterventions: number;
  averageMoodScore: number;
  completionRate: number;
}

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  // Mock analytics data - In real app, this would come from anonymized Supabase analytics
  const analyticsData: AnalyticsData = {
    totalUsers: 1247,
    activeUsers: 892,
    chatSessions: 3456,
    bookings: 234,
    forumPosts: 567,
    crisisInterventions: 12,
    averageMoodScore: 6.8,
    completionRate: 78.5
  };

  // Mock usage trends
  const usageTrends = [
    { date: '2024-01-01', users: 120, chatSessions: 245, bookings: 18 },
    { date: '2024-01-02', users: 135, chatSessions: 278, bookings: 22 },
    { date: '2024-01-03', users: 142, chatSessions: 301, bookings: 25 },
    { date: '2024-01-04', users: 156, chatSessions: 289, bookings: 19 },
    { date: '2024-01-05', users: 164, chatSessions: 334, bookings: 28 },
    { date: '2024-01-06', users: 178, chatSessions: 356, bookings: 31 },
    { date: '2024-01-07', users: 189, chatSessions: 389, bookings: 24 }
  ];

  // Mock mood distribution
  const moodDistribution = [
    { mood: 'Very Low (1-2)', count: 45, color: '#ef4444' },
    { mood: 'Low (3-4)', count: 123, color: '#f97316' },
    { mood: 'Neutral (5-6)', count: 456, color: '#eab308' },
    { mood: 'Good (7-8)', count: 321, color: '#22c55e' },
    { mood: 'Excellent (9-10)', count: 89, color: '#06d6a0' }
  ];

  // Mock resource usage
  const resourceUsage = [
    { category: 'Anxiety Resources', views: 1234, downloads: 567 },
    { category: 'Depression Support', views: 987, downloads: 432 },
    { category: 'Academic Stress', views: 1456, downloads: 789 },
    { category: 'Sleep & Wellness', views: 654, downloads: 298 },
    { category: 'Relationship Help', views: 432, downloads: 156 }
  ];

  // Mock crisis alerts (anonymized)
  const crisisAlerts = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      severity: 'high',
      status: 'resolved',
      responseTime: '12 minutes'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      severity: 'medium',
      status: 'in-progress',
      responseTime: '8 minutes'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      severity: 'low',
      status: 'resolved',
      responseTime: '15 minutes'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-4 space-y-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                DMHES Analytics Dashboard
                <Badge variant="secondary" className="ml-2">
                  Anonymized Data Only
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant={timeRange === '7d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('7d')}
                >
                  7 Days
                </Button>
                <Button
                  variant={timeRange === '30d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('30d')}
                >
                  30 Days
                </Button>
                <Button
                  variant={timeRange === '90d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('90d')}
                >
                  90 Days
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.totalUsers}</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chat Sessions</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.chatSessions}</p>
                  <p className="text-xs text-green-600">+18% from last month</p>
                </div>
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Bookings</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.bookings}</p>
                  <p className="text-xs text-green-600">+8% from last month</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Mood Score</p>
                  <p className="text-3xl font-bold text-foreground">{analyticsData.averageMoodScore}</p>
                  <p className="text-xs text-green-600">+0.3 from last month</p>
                </div>
                <TrendingUp className="w-8 h-8 text-wellness" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Crisis Management */}
        <Card className="shadow-card border-crisis/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-crisis" />
              Crisis Intervention Alerts
              <Badge variant="destructive" className="ml-auto">
                {crisisAlerts.filter(alert => alert.status !== 'resolved').length} Active
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {crisisAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Badge className={`text-xs ${getSeverityColor(alert.severity)}`}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {alert.timestamp.toLocaleString()}
                    </span>
                    <span className="text-sm">Response: {alert.responseTime}</span>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(alert.status)}`}>
                    {alert.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Usage Trends */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Platform Usage Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" name="Active Users" />
                    <Line type="monotone" dataKey="chatSessions" stroke="#10b981" name="Chat Sessions" />
                    <Line type="monotone" dataKey="bookings" stroke="#f59e0b" name="Bookings" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Mood Distribution */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Mood Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={moodDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ mood, count }) => `${mood}: ${count}`}
                    >
                      {moodDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Usage */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Resource Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#3b82f6" name="Views" />
                  <Bar dataKey="downloads" fill="#10b981" name="Downloads" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Server Uptime</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  99.9%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Response Time</span>
                <Badge variant="secondary">
                  125ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Status</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Healthy
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Security Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed Login Attempts</span>
                <Badge variant="outline">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Suspicious Activity</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  None
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Encryption</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Active
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Compliance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">GDPR Compliance</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Data Anonymization</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ Active
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Audit Logs</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  ✓ Enabled
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;