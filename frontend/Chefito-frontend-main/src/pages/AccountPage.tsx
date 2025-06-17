import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Globe, Palette, Shield, CreditCard, Star, Clock, ChefHat, Settings } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { PageHeader } from '../components/common';
import { Input, Button, Card, CardContent, CardHeader, CardTitle, Badge, Avatar } from '../components/ui';

const AccountPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Mock user data
  const user = {
    fullName: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    avatarUrl: null,
    premium: false,
    recipesViewedThisWeek: 3,
    joinedDate: '2024-01-15',
    favoriteRecipes: 12,
    submittedRecipes: 3,
  };

  const tabs = [
    { id: 'profile', label: t('account.profile', currentLanguage), icon: User },
    { id: 'preferences', label: t('account.preferences', currentLanguage), icon: Settings },
    { id: 'security', label: t('account.security', currentLanguage), icon: Shield },
    { id: 'premium', label: t('account.premium', currentLanguage), icon: Star },
  ];

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>{t('page.account.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.account.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.account.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.account.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        <PageHeader 
          titleKey="page.account.title"
          subtitleKey="page.account.subtitle"
          className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <Card>
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <Avatar
                      src={user.avatarUrl}
                      alt={user.fullName}
                      fallback={user.fullName.split(' ').map(n => n[0]).join('')}
                      size="xl"
                      className="mx-auto mb-4"
                    />
                    <h3 className="text-lg font-display font-semibold text-text-primary dark:text-text-dark-primary">
                      {user.fullName}
                    </h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary text-sm">
                      {user.email}
                    </p>
                    {user.premium && (
                      <Badge variant="primary" className="mt-2">
                        <Star className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {t('account.recipes_viewed', currentLanguage)}
                      </span>
                      <span className="font-medium text-text-primary dark:text-text-dark-primary">
                        {user.recipesViewedThisWeek}/4
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {t('account.favorites', currentLanguage)}
                      </span>
                      <span className="font-medium text-text-primary dark:text-text-dark-primary">
                        {user.favoriteRecipes}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
                        {t('account.submitted', currentLanguage)}
                      </span>
                      <span className="font-medium text-text-primary dark:text-text-dark-primary">
                        {user.submittedRecipes}
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
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
              className="lg:col-span-3"
            >
              {activeTab === 'profile' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('account.profile_info', currentLanguage)}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label={t('form.full_name', currentLanguage)}
                        defaultValue={user.fullName}
                        leftIcon={<User className="w-5 h-5" />}
                      />
                      <Input
                        label={t('form.email', currentLanguage)}
                        defaultValue={user.email}
                        leftIcon={<Mail className="w-5 h-5" />}
                        type="email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">
                        {t('account.bio', currentLanguage)}
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-text-primary dark:text-text-dark-primary"
                        rows={4}
                        placeholder={t('account.bio_placeholder', currentLanguage)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">
                        {t('account.cooking_level', currentLanguage)}
                      </label>
                      <select className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-text-primary dark:text-text-dark-primary">
                        <option>{t('account.beginner', currentLanguage)}</option>
                        <option>{t('account.intermediate', currentLanguage)}</option>
                        <option>{t('account.advanced', currentLanguage)}</option>
                        <option>{t('account.expert', currentLanguage)}</option>
                      </select>
                    </div>

                    <Button onClick={handleSave} loading={isLoading}>
                      {t('form.save', currentLanguage)}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('account.language_region', currentLanguage)}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary dark:text-text-dark-primary mb-2">
                          {t('account.language', currentLanguage)}
                        </label>
                        <select className="w-full px-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-text-primary dark:text-text-dark-primary">
                          <option value="fr">Français</option>
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="de">Deutsch</option>
                          <option value="it">Italiano</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t('account.notifications', currentLanguage)}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { key: 'new_recipes', label: t('account.new_recipes_notification', currentLanguage) },
                        { key: 'weekly_digest', label: t('account.weekly_digest', currentLanguage) },
                        { key: 'cooking_tips', label: t('account.cooking_tips', currentLanguage) },
                        { key: 'collaboration', label: t('account.collaboration_invites', currentLanguage) },
                      ].map((notification) => (
                        <div key={notification.key} className="flex items-center justify-between">
                          <span className="text-text-primary dark:text-text-dark-primary">
                            {notification.label}
                          </span>
                          <input
                            type="checkbox"
                            className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                            defaultChecked
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'security' && (
                <Card>
                  <CardHeader>
                    <CardTitle>{t('account.security_settings', currentLanguage)}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary dark:text-text-dark-primary mb-4">
                        {t('account.change_password', currentLanguage)}
                      </h3>
                      <div className="space-y-4">
                        <Input
                          label={t('account.current_password', currentLanguage)}
                          type="password"
                          leftIcon={<Lock className="w-5 h-5" />}
                        />
                        <Input
                          label={t('account.new_password', currentLanguage)}
                          type="password"
                          leftIcon={<Lock className="w-5 h-5" />}
                        />
                        <Input
                          label={t('form.confirm_password', currentLanguage)}
                          type="password"
                          leftIcon={<Lock className="w-5 h-5" />}
                        />
                        <Button variant="secondary">
                          {t('account.update_password', currentLanguage)}
                        </Button>
                      </div>
                    </div>

                    <hr className="border-neutral-200 dark:border-neutral-700" />

                    <div>
                      <h3 className="text-lg font-medium text-text-primary dark:text-text-dark-primary mb-4">
                        {t('account.two_factor', currentLanguage)}
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary mb-4">
                        {t('account.two_factor_description', currentLanguage)}
                      </p>
                      <Button variant="outline">
                        {t('account.enable_2fa', currentLanguage)}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'premium' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning-500" />
                      {t('account.premium_membership', currentLanguage)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {user.premium ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-warning-100 dark:bg-warning-900/30 rounded-full mb-4">
                          <Star className="w-8 h-8 text-warning-600 dark:text-warning-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                          {t('account.premium_active', currentLanguage)}
                        </h3>
                        <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                          {t('account.premium_benefits', currentLanguage)}
                        </p>
                        <Button variant="outline">
                          {t('account.manage_subscription', currentLanguage)}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <ChefHat className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                          {t('account.upgrade_premium', currentLanguage)}
                        </h3>
                        <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                          {t('account.premium_description', currentLanguage)}
                        </p>
                        <Button>
                          {t('account.upgrade_now', currentLanguage)}
                        </Button>
                      </div>
                    )}
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

export default AccountPage;