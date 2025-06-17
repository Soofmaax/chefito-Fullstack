import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Clock, Send, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast({
        type: 'success',
        title: t('contact.form.success'),
        message: 'Nous vous répondrons dans les plus brefs délais.',
      });
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      showToast({
        type: 'error',
        title: t('contact.form.error'),
        message: 'Veuillez réessayer plus tard.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Adresse',
      value: t('contact.info.address'),
      color: 'primary',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: t('contact.info.phone'),
      color: 'success',
    },
    {
      icon: Mail,
      label: 'Email',
      value: t('contact.info.email'),
      color: 'warning',
    },
    {
      icon: Clock,
      label: 'Horaires',
      value: t('contact.info.hours'),
      color: 'error',
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/chefito', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/chefito', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/chefito', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/chefito', label: 'LinkedIn' },
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
      success: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
      warning: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
      error: 'bg-error-100 dark:bg-error-900/30 text-error-600 dark:text-error-400',
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.primary;
  };

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} - Chefito</title>
        <meta name="description" content={t('contact.subtitle')} />
        <meta property="og:title" content={`${t('contact.title')} - Chefito`} />
        <meta property="og:description" content={t('contact.subtitle')} />
      </Helmet>

      <div className="min-h-screen bg-background dark:bg-background-dark">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeader
              titleKey="contact.title"
              subtitleKey="contact.subtitle"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <h3 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-6">
                      Envoyez-nous un message
                    </h3>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                          label={t('contact.form.name')}
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom complet"
                        />
                        <Input
                          label={t('contact.form.email')}
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="votre@email.com"
                        />
                      </div>
                      
                      <Input
                        label={t('contact.form.subject')}
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        placeholder="Sujet de votre message"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                          {t('contact.form.message')} *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          placeholder="Décrivez votre demande en détail..."
                          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 px-4 py-3 text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-250"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                        icon={<Send className="w-5 h-5" />}
                      >
                        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <Card variant="default" padding="md" interactive>
                          <CardContent className="text-center">
                            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${getColorClasses(info.color)}`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <h4 className="font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                              {info.label}
                            </h4>
                            <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                              {info.value}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Social Media */}
                <Card variant="default" padding="lg">
                  <CardContent className="text-center">
                    <h3 className="text-xl font-display font-semibold text-text-primary dark:text-text-dark-primary mb-4">
                      {t('contact.social.title')}
                    </h3>
                    <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                      {t('contact.social.description')}
                    </p>
                    
                    <div className="flex justify-center space-x-4">
                      {socialLinks.map((social, index) => {
                        const IconComponent = social.icon;
                        
                        return (
                          <motion.a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-250"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={social.label}
                          >
                            <IconComponent className="w-5 h-5" />
                          </motion.a>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Map Placeholder */}
                <Card variant="default" padding="none">
                  <div className="h-64 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                      <p className="text-text-secondary dark:text-text-dark-secondary">
                        Carte interactive disponible bientôt
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;