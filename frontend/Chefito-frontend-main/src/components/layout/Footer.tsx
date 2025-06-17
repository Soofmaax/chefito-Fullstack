import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

/**
 * Footer component with links and company information
 */
export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerSections = [
    {
      titleKey: 'footer.product.title',
      links: [
        { labelKey: 'footer.product.features', href: '/about' },
        { labelKey: 'footer.product.pricing', href: '/pricing' },
        { labelKey: 'footer.product.recipes', href: '/recipes' },
        { labelKey: 'footer.product.premium', href: '/premium' },
      ],
    },
    {
      titleKey: 'footer.company.title',
      links: [
        { labelKey: 'footer.company.about', href: '/about' },
        { labelKey: 'footer.company.contact', href: '/contact' },
        { labelKey: 'footer.company.careers', href: '/careers' },
        { labelKey: 'footer.company.blog', href: '/blog' },
      ],
    },
    {
      titleKey: 'footer.support.title',
      links: [
        { labelKey: 'footer.support.help_center', href: '/help' },
        { labelKey: 'footer.support.community', href: '/community' },
        { labelKey: 'footer.support.api_docs', href: '/docs' },
        { labelKey: 'footer.support.status', href: '/status' },
      ],
    },
    {
      titleKey: 'footer.legal.title',
      links: [
        { labelKey: 'footer.legal.privacy', href: '/privacy' },
        { labelKey: 'footer.legal.terms', href: '/terms' },
        { labelKey: 'footer.legal.cookies', href: '/cookies' },
        { labelKey: 'footer.legal.security', href: '/security' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/chefito', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/chefito', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/chefito', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/chefito', label: 'YouTube' },
  ];

  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/" className="flex items-center space-x-2 mb-6 group">
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <ChefHat className="w-6 h-6 text-white" />
                </motion.div>
                <span className="text-2xl font-display font-bold text-white group-hover:text-primary-400 transition-colors">
                  Chefito
                </span>
              </Link>
              
              <p className="text-neutral-400 mb-6 leading-relaxed">
                {t('footer.brand.description')}
              </p>
              
              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <a 
                    href="mailto:hello@chefito.com" 
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    hello@chefito.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <a 
                    href="tel:+33123456789" 
                    className="text-neutral-400 hover:text-primary-400 transition-colors"
                  >
                    +33 1 23 45 67 89
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-neutral-400">
                    {t('footer.brand.address')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.labelKey}>
                    <Link
                      to={link.href}
                      className="text-neutral-400 hover:text-primary-400 transition-colors duration-200"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social links and newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-neutral-800 pt-8 mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Newsletter signup */}
            <div className="flex-1 max-w-md">
              <h4 className="text-white font-semibold mb-3">
                {t('footer.newsletter.title')}
              </h4>
              <p className="text-neutral-400 text-sm mb-4">
                {t('footer.newsletter.description')}
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter.placeholder')}
                  className="flex-1 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                >
                  {t('footer.newsletter.subscribe')}
                </motion.button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-neutral-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${t('footer.social.follow_us')} ${social.label}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-neutral-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-neutral-500 hover:text-primary-400 transition-colors"
            >
              {t('footer.legal.privacy')}
            </Link>
            <Link 
              to="/terms" 
              className="text-neutral-500 hover:text-primary-400 transition-colors"
            >
              {t('footer.legal.terms')}
            </Link>
            <Link 
              to="/cookies" 
              className="text-neutral-500 hover:text-primary-400 transition-colors"
            >
              {t('footer.legal.cookies')}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;