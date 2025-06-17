import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ChefHat, Check } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { Input, Button, Card, CardContent } from '../components/ui';

const SignupPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(t('auth.password_mismatch', currentLanguage));
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError(t('auth.accept_terms', currentLanguage));
      setIsLoading(false);
      return;
    }

    try {
      // Simulate signup
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Handle successful signup
    } catch (err) {
      setError(t('auth.signup_error', currentLanguage));
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
  };

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean);

  return (
    <>
      <Helmet>
        <title>{t('page.signup.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.signup.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.signup.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.signup.description', currentLanguage)} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-50 dark:from-background-dark dark:via-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-text-primary dark:text-text-dark-primary">
              Chefito
            </h1>
            <p className="text-text-secondary dark:text-text-dark-secondary mt-2">
              {t('auth.join_community', currentLanguage)}
            </p>
          </motion.div>

          {/* Signup Form */}
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-6 text-center">
                  {t('page.signup.title', currentLanguage)}
                </h2>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-xl text-error-700 dark:text-error-300 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label={t('form.full_name', currentLanguage)}
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    leftIcon={<User className="w-5 h-5" />}
                    placeholder="Jean Dupont"
                    required
                  />

                  <Input
                    label={t('form.email', currentLanguage)}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    placeholder="votre@email.com"
                    required
                  />

                  <div>
                    <Input
                      label={t('form.password', currentLanguage)}
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      leftIcon={<Lock className="w-5 h-5" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      }
                      placeholder="••••••••"
                      required
                    />

                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 space-y-2"
                      >
                        <div className="text-xs text-text-secondary dark:text-text-dark-secondary">
                          {t('auth.password_requirements', currentLanguage)}:
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-success-600' : 'text-neutral-500'}`}>
                            <Check className="w-3 h-3" />
                            {t('auth.min_8_chars', currentLanguage)}
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-success-600' : 'text-neutral-500'}`}>
                            <Check className="w-3 h-3" />
                            {t('auth.uppercase', currentLanguage)}
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-success-600' : 'text-neutral-500'}`}>
                            <Check className="w-3 h-3" />
                            {t('auth.lowercase', currentLanguage)}
                          </div>
                          <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-success-600' : 'text-neutral-500'}`}>
                            <Check className="w-3 h-3" />
                            {t('auth.number', currentLanguage)}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <Input
                    label={t('form.confirm_password', currentLanguage)}
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange('confirmPassword', e.target.value)}
                    leftIcon={<Lock className="w-5 h-5" />}
                    rightIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    }
                    placeholder="••••••••"
                    required
                  />

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                      {t('auth.accept_terms_text', currentLanguage)}{' '}
                      <Link to="/terms" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        {t('footer.terms', currentLanguage)}
                      </Link>{' '}
                      {t('auth.and', currentLanguage)}{' '}
                      <Link to="/privacy" className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                        {t('footer.privacy', currentLanguage)}
                      </Link>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    fullWidth
                    loading={isLoading}
                    size="lg"
                    disabled={!isPasswordStrong || !acceptTerms}
                  >
                    {t('auth.create_account', currentLanguage)}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-text-secondary dark:text-text-dark-secondary">
                    {t('auth.already_have_account', currentLanguage)}{' '}
                    <Link
                      to="/login"
                      className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                    >
                      {t('auth.login', currentLanguage)}
                    </Link>
                  </p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default SignupPage;