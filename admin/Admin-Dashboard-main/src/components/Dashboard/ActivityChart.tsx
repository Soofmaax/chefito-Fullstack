import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityChartProps {
  data?: Array<{
    month: string;
    recipes: number;
    users: number;
    comments?: number;
  }>;
  loading?: boolean;
}

const defaultData = [
  { month: 'Jan', recipes: 65, users: 28, comments: 234 },
  { month: 'Feb', recipes: 89, users: 32, comments: 345 },
  { month: 'Mar', recipes: 78, users: 41, comments: 456 },
  { month: 'Apr', recipes: 91, users: 38, comments: 567 },
  { month: 'May', recipes: 103, users: 45, comments: 678 },
  { month: 'Jun', recipes: 134, users: 52, comments: 789 },
];

export function ActivityChart({ data = defaultData, loading = false }: ActivityChartProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="h-6 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>
        <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Overview</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="recipes" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#8b5cf6' }}
              name="Recipes"
            />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="#06b6d4" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#06b6d4' }}
              name="Users"
            />
            {data[0]?.comments !== undefined && (
              <Line 
                type="monotone" 
                dataKey="comments" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#10b981' }}
                name="Comments"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}