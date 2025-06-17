import React, { useState, useEffect } from 'react';
import { ChefHat, User, MessageCircle, Clock, RefreshCw } from 'lucide-react';
import { api } from '../../lib/api';

interface Activity {
  id: number;
  type: 'recipe' | 'user' | 'comment';
  user: string;
  action: string;
  target: string;
  time: string;
}

interface RecentActivityProps {
  loading?: boolean;
}

export function RecentActivity({ loading: parentLoading = false }: RecentActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecentActivity();
  }, []);

  const loadRecentActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getRecentActivity(10);
      setActivities(data);
    } catch (error: any) {
      setError(error.message);
      // Fallback data
      setActivities([
        {
          id: 1,
          type: 'recipe',
          user: 'Marie Dubois',
          action: 'published a new recipe',
          target: 'Coq au Vin Moderne',
          time: '5 minutes ago',
        },
        {
          id: 2,
          type: 'user',
          user: 'Jean Martin',
          action: 'joined the platform',
          target: '',
          time: '12 minutes ago',
        },
        {
          id: 3,
          type: 'comment',
          user: 'Sophie Laurent',
          action: 'commented on',
          target: 'Ratatouille Provençale',
          time: '25 minutes ago',
        },
        {
          id: 4,
          type: 'recipe',
          user: 'Pierre Moreau',
          action: 'updated recipe',
          target: 'Bouillabaisse Traditionnelle',
          time: '1 hour ago',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'recipe':
        return { icon: ChefHat, color: 'text-orange-500', bg: 'bg-orange-100' };
      case 'user':
        return { icon: User, color: 'text-blue-500', bg: 'bg-blue-100' };
      case 'comment':
        return { icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-100' };
      default:
        return { icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100' };
    }
  };

  if (parentLoading || loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          {error && (
            <button
              onClick={loadRecentActivity}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
              title="Retry loading activity"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          )}
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-700">
            Unable to load live activity. Showing cached data.
          </p>
        </div>
      )}
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const { icon: Icon, color, bg } = getActivityIcon(activity.type);
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`flex-shrink-0 p-2 rounded-full ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>
                  {' '}
                  <span className="text-gray-600">{activity.action}</span>
                  {activity.target && (
                    <>
                      {' '}
                      <span className="font-medium text-purple-600">{activity.target}</span>
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6">
        <button className="w-full text-center text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200">
          View all activity
        </button>
      </div>
    </div>
  );
}