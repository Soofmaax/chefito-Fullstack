import React, { useState, useEffect } from 'react';
import { Users, ChefHat, MessageCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { ActivityChart } from '../components/Dashboard/ActivityChart';
import { RecentActivity } from '../components/Dashboard/RecentActivity';
import { api, AdminStats } from '../lib/api';
import toast from 'react-hot-toast';

export function Dashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test de connexion API
      await api.checkHealth();
      
      // Chargement des stats
      const statsData = await api.getAdminStats();
      setStats(statsData);
      
    } catch (error: any) {
      console.error('Error loading dashboard data:', error);
      setError(error.message);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    loadDashboardData();
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with Chefito today.</p>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">Connection Error</h3>
              <p className="text-red-700 mt-1">{error}</p>
              <button
                onClick={handleRetry}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with Chefito today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats?.total_users || 0}
          change={{ value: 12, trend: 'up' }}
          icon={Users}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          loading={loading}
        />
        <StatsCard
          title="Total Recipes"
          value={stats?.total_recipes || 0}
          change={{ value: 8, trend: 'up' }}
          icon={ChefHat}
          gradient="bg-gradient-to-br from-orange-500 to-orange-600"
          loading={loading}
        />
        <StatsCard
          title="Comments"
          value={stats?.total_comments || 0}
          change={{ value: 23, trend: 'up' }}
          icon={MessageCircle}
          gradient="bg-gradient-to-br from-green-500 to-green-600"
          loading={loading}
        />
        <StatsCard
          title="Growth Rate"
          value={stats ? `${stats.growth_rate}%` : '0%'}
          change={{ value: 4, trend: 'up' }}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          loading={loading}
        />
      </div>

      {/* Pending Items Alert */}
      {stats && (stats.pending_recipes > 0 || stats.pending_comments > 0 || stats.flagged_comments > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900">Items Requiring Attention</h3>
              <div className="text-yellow-700 mt-1 space-y-1">
                {stats.pending_recipes > 0 && (
                  <p>• {stats.pending_recipes} recipes pending approval</p>
                )}
                {stats.pending_comments > 0 && (
                  <p>• {stats.pending_comments} comments pending moderation</p>
                )}
                {stats.flagged_comments > 0 && (
                  <p>• {stats.flagged_comments} comments flagged for review</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityChart data={stats?.monthly_stats} loading={loading} />
        <RecentActivity loading={loading} />
      </div>

      {/* API Status */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Backend API</span>
            <span className="text-xs text-green-600 font-medium">Connected</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Database</span>
            <span className="text-xs text-green-600 font-medium">Operational</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Authentication</span>
            <span className="text-xs text-green-600 font-medium">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}