import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Users, ChefHat, Star, TrendingUp, Eye, MessageSquare, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { PageHeader } from '../components/common';
import { Card, CardContent, CardHeader, CardTitle, Badge, Avatar } from '../components/ui';

const AdminPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock admin data
  const stats = [
    { label: 'Total Users', value: '15,247', change: '+12%', icon: Users, color: 'primary' },
    { label: 'Total Recipes', value: '2,847', change: '+8%', icon: ChefHat, color: 'secondary' },
    { label: 'Premium Users', value: '3,421', change: '+23%', icon: Star, color: 'warning' },
    { label: 'Monthly Views', value: '127K', change: '+15%', icon: Eye, color: 'success' },
  ];

  const recentUsers = [
    { name: 'Marie Dubois', email: 'marie@email.com', joined: '2024-01-15', premium: true },
    { name: 'Thomas Martin', email: 'thomas@email.com', joined: '2024-01-14', premium: false },
    { name: 'Sophie Laurent', email: 'sophie@email.com', joined: '2024-01-13', premium: true },
  ];

  const pendingRecipes = [
    { title: 'Coq au Vin Traditionnel', author: 'Chef Pierre', submitted: '2024-01-15', status: 'pending' },
    { title: 'Tarte Tatin Maison', author: 'Marie C.', submitted: '2024-01-14', status: 'pending' },
    { title: 'Bouillabaisse Marseillaise', author: 'Jean-Luc', submitted: '2024-01-13', status: 'review' },
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <Helmet>
        <title>{t('page.admin.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.admin.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.admin.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.admin.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        <PageHeader 
          titleKey="page.admin.title"
          subtitleKey="page.admin.subtitle"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardContent className="p-6">
                  <nav className="space-y-2">
                    {tabs.map((tab) => {
                      const IconComponent = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors duration-200 ${
                            activeTab === tab.id
                              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                              : 'text-text-secondary dark:text-text-dark-secondary hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-4"
            >
              {activeTab === 'dashboard' && (
                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => {
                      const IconComponent = stat.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <Card>
                            <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                                    {stat.label}
                                  </p>
                                  <p className="text-2xl font-bold text-text-primary dark:text-text-dark-primary">
                                    {stat.value}
                                  </p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-success-600" />
                                    <span className="text-xs text-success-600">{stat.change}</span>
                                  </div>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-xl flex items-center justify-center`}>
                                  <IconComponent className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentUsers.map((user, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar
                                  fallback={user.name.split(' ').map(n => n[0]).join('')}
                                  size="sm"
                                />
                                <div>
                                  <p className="font-medium text-text-primary dark:text-text-dark-primary">
                                    {user.name}
                                  </p>
                                  <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                                    {user.email}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                {user.premium && (
                                  <Badge variant="warning" className="mb-1">
                                    <Star className="w-3 h-3 mr-1" />
                                    Premium
                                  </Badge>
                                )}
                                <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                                  {user.joined}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Pending Recipes */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Pending Recipes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {pendingRecipes.map((recipe, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-text-primary dark:text-text-dark-primary">
                                  {recipe.title}
                                </p>
                                <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                                  by {recipe.author}
                                </p>
                              </div>
                              <div className="text-right">
                                <Badge 
                                  variant={recipe.status === 'pending' ? 'warning' : 'secondary'}
                                  className="mb-1"
                                >
                                  {recipe.status}
                                </Badge>
                                <p className="text-xs text-text-secondary dark:text-text-dark-secondary">
                                  {recipe.submitted}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                        User Management
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary">
                        Advanced user management features coming soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'recipes' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recipe Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <ChefHat className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                        Recipe Management
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary">
                        Recipe approval and management tools coming soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'settings' && (
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Settings className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                        System Settings
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary">
                        Advanced system configuration options coming soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;