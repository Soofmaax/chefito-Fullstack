import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, ChefHat, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { Input, Button, Card, CardContent } from '../components/ui';

const ForgotPasswordPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate password reset email
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (err) {
      setError(t('auth.reset_error', currentLanguage));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('page.forgot.title', currentLanguage)} - Chefito</title>
        <meta name="description" content={t('page.forgot.description', currentLanguage)} />
        <meta property="og:title" content={`${t('page.forgot.title', currentLanguage)} - Chefito`} />
        <meta property="og:description" content={t('page.forgot.description', currentLanguage)} />
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
          </motion.div>

          {/* Reset Form */}
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {!isEmailSent ? (
                  <>
                    <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-2 text-center">
                      {t('page.forgot.title', currentLanguage)}
                    </h2>
                    <p className="text-text-secondary dark:text-text-dark-secondary text-center mb-6">
                      {t('auth.reset_instructions', currentLanguage)}
                    </p>

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
                        label={t('form.email', currentLanguage)}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        leftIcon={<Mail className="w-5 h-5" />}
                        placeholder="votre@email.com"
                        required
                      />

                      <Button
                        type="submit"
                        fullWidth
                        loading={isLoading}
                        size="lg"
                      >
                        {t('auth.send_reset_link', currentLanguage)}
                      </Button>
                    </form>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full mb-6">
                      <CheckCircle className="w-8 h-8 text-success-600 dark:text-success-400" />
                    </div>
                    
                    <h2 className="text-2xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                      {t('auth.email_sent', currentLanguage)}
                    </h2>
                    
                    <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                      {t('auth.check_email', currentLanguage)} <strong>{email}</strong>
                    </p>

                    <div className="space-y-4">
                      <Button
                        onClick={() => setIsEmailSent(false)}
                        variant="outline"
                        fullWidth
                      >
                        {t('auth.try_different_email', currentLanguage)}
                      </Button>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('auth.back_to_login', currentLanguage)}
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;