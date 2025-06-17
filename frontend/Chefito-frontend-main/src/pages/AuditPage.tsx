import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Eye, 
  Code, 
  Search, 
  Download, 
  Play, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Smartphone,
  Monitor,
  Globe,
  Shield,
  Gauge,
  Target,
  Award,
  BarChart3,
  FileText,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../hooks/useLanguage';
import { t } from '../lib/utils/i18n';
import { PageHeader } from '../components/common';
import { Helmet } from 'react-helmet-async';

interface AuditScore {
  category: string;
  score: number;
  maxScore: number;
  status: 'excellent' | 'good' | 'warning' | 'error';
  issues: string[];
  recommendations: string[];
}

interface AuditResult {
  overallScore: number;
  categories: AuditScore[];
  timestamp: string;
  url: string;
  loadTime: number;
  bundleSize: string;
}

const AuditPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [results, setResults] = useState<AuditResult | null>(null);
  const [showReport, setShowReport] = useState(false);

  // Mock audit data for demo
  const mockAuditResult: AuditResult = {
    overallScore: 94,
    timestamp: new Date().toISOString(),
    url: window.location.origin,
    loadTime: 1.2,
    bundleSize: '847 KB',
    categories: [
      {
        category: 'Performance',
        score: 96,
        maxScore: 100,
        status: 'excellent',
        issues: ['Minor: Some images could be optimized'],
        recommendations: [
          'Implement WebP format for images',
          'Add lazy loading for below-fold content',
          'Consider code splitting for larger components'
        ]
      },
      {
        category: 'Accessibility',
        score: 98,
        maxScore: 100,
        status: 'excellent',
        issues: [],
        recommendations: [
          'Add more descriptive alt texts for decorative images',
          'Consider implementing skip links for keyboard navigation'
        ]
      },
      {
        category: 'Best Practices',
        score: 92,
        maxScore: 100,
        status: 'excellent',
        issues: ['Console warnings in development mode'],
        recommendations: [
          'Remove console.log statements in production',
          'Add error boundaries for better error handling',
          'Implement proper loading states'
        ]
      },
      {
        category: 'SEO',
        score: 89,
        maxScore: 100,
        status: 'good',
        issues: ['Missing some meta descriptions', 'Could improve structured data'],
        recommendations: [
          'Add meta descriptions to all pages',
          'Implement Recipe schema.org markup',
          'Add Open Graph images for social sharing',
          'Create XML sitemap'
        ]
      },
      {
        category: 'PWA',
        score: 95,
        maxScore: 100,
        status: 'excellent',
        issues: [],
        recommendations: [
          'Add offline fallback pages',
          'Implement background sync for recipe saves'
        ]
      }
    ]
  };

  const auditSteps = [
    'Analyzing page structure...',
    'Measuring Core Web Vitals...',
    'Checking accessibility compliance...',
    'Scanning for SEO optimizations...',
    'Testing mobile responsiveness...',
    'Evaluating code quality...',
    'Generating recommendations...',
    'Compiling final report...'
  ];

  const runAudit = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);
    setShowReport(false);

    // Simulate audit process
    for (let i = 0; i < auditSteps.length; i++) {
      setCurrentStep(auditSteps[i]);
      setProgress((i + 1) / auditSteps.length * 100);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    setResults(mockAuditResult);
    setIsRunning(false);
    setShowReport(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600';
    if (score >= 70) return 'text-warning-600';
    return 'text-error-600';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-warning-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-error-500" />;
      default:
        return null;
    }
  };

  const exportReport = () => {
    // Simulate PDF export
    const reportData = {
      ...results,
      exportedAt: new Date().toISOString(),
      exportedBy: 'Chefito Audit Tool'
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chefito-audit-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Frontend Audit Tool - Chefito</title>
        <meta name="description" content="Comprehensive frontend audit tool for performance, accessibility, SEO, and best practices analysis." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-secondary-50 dark:from-background-dark dark:via-primary-900/20 dark:to-secondary-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header */}
          <PageHeader 
            titleKey="audit.title"
            subtitleKey="audit.subtitle"
            className="mb-12"
          />

          {/* Audit Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card variant="elevated" padding="lg" className="text-center">
              <CardContent>
                <div className="flex flex-col items-center gap-6">
                  <motion.div
                    animate={isRunning ? { rotate: 360 } : {}}
                    transition={{ duration: 2, repeat: isRunning ? Infinity : 0, ease: 'linear' }}
                    className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Zap className="w-10 h-10 text-white" />
                  </motion.div>

                  <div>
                    <h2 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-2">
                      Frontend Performance Audit
                    </h2>
                    <p className="text-text-secondary dark:text-text-dark-secondary">
                      Analyze your website's performance, accessibility, SEO, and best practices
                    </p>
                  </div>

                  {!isRunning && !results && (
                    <Button
                      onClick={runAudit}
                      variant="primary"
                      size="lg"
                      icon={<Play className="w-5 h-5" />}
                      className="min-w-[200px]"
                    >
                      Start Audit
                    </Button>
                  )}

                  {isRunning && (
                    <div className="w-full max-w-md">
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-text-secondary dark:text-text-dark-secondary mb-2">
                          <span>Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                          <motion.div
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                      <motion.p
                        key={currentStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-text-secondary dark:text-text-dark-secondary"
                      >
                        {currentStep}
                      </motion.p>
                    </div>
                  )}

                  {results && (
                    <div className="flex gap-4">
                      <Button
                        onClick={runAudit}
                        variant="outline"
                        icon={<Play className="w-4 h-4" />}
                      >
                        Run Again
                      </Button>
                      <Button
                        onClick={exportReport}
                        variant="primary"
                        icon={<Download className="w-4 h-4" />}
                      >
                        Export Report
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {showReport && results && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="space-y-8"
              >
                {/* Overall Score */}
                <Card variant="elevated" padding="lg">
                  <CardContent>
                    <div className="text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-success-500 to-success-600 text-white mb-6 shadow-xl"
                      >
                        <div className="text-center">
                          <div className="text-4xl font-bold">{results.overallScore}</div>
                          <div className="text-sm opacity-90">/ 100</div>
                        </div>
                      </motion.div>
                      
                      <h3 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-2">
                        Excellent Performance!
                      </h3>
                      <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                        Your website meets high standards for modern web development
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <div className="font-semibold text-text-primary dark:text-text-dark-primary">Load Time</div>
                          <div className="text-success-600">{results.loadTime}s</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-text-primary dark:text-text-dark-primary">Bundle Size</div>
                          <div className="text-success-600">{results.bundleSize}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-text-primary dark:text-text-dark-primary">Audited</div>
                          <div className="text-text-secondary dark:text-text-dark-secondary">
                            {new Date(results.timestamp).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-text-primary dark:text-text-dark-primary">URL</div>
                          <div className="text-text-secondary dark:text-text-dark-secondary truncate">
                            {new URL(results.url).hostname}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Scores */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.categories.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                    >
                      <Card variant="default" padding="lg" className="h-full">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{category.category}</CardTitle>
                            {getStatusIcon(category.status)}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`text-2xl font-bold ${getScoreColor(category.score)}`}>
                                {category.score}
                              </span>
                              <span className="text-sm text-text-secondary dark:text-text-dark-secondary">
                                / {category.maxScore}
                              </span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                              <motion.div
                                className={`h-2 rounded-full ${
                                  category.score >= 90 ? 'bg-success-500' :
                                  category.score >= 70 ? 'bg-warning-500' : 'bg-error-500'
                                }`}
                                initial={{ width: 0 }}
                                animate={{ width: `${(category.score / category.maxScore) * 100}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                              />
                            </div>
                          </div>

                          {category.issues.length > 0 && (
                            <div className="mb-4">
                              <h4 className="text-sm font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                                Issues Found:
                              </h4>
                              <ul className="text-xs text-text-secondary dark:text-text-dark-secondary space-y-1">
                                {category.issues.map((issue, i) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <AlertTriangle className="w-3 h-3 text-warning-500 mt-0.5 flex-shrink-0" />
                                    {issue}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="text-sm font-semibold text-text-primary dark:text-text-dark-primary mb-2">
                              Recommendations:
                            </h4>
                            <ul className="text-xs text-text-secondary dark:text-text-dark-secondary space-y-1">
                              {category.recommendations.slice(0, 2).map((rec, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Target className="w-3 h-3 text-primary-500 mt-0.5 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Detailed Recommendations */}
                <Card variant="elevated" padding="lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-6 h-6 text-primary-500" />
                      Priority Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-text-primary dark:text-text-dark-primary mb-3 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-success-500" />
                          Quick Wins
                        </h4>
                        <ul className="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                            Add meta descriptions to all pages
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                            Implement WebP format for images
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-success-500 mt-0.5 flex-shrink-0" />
                            Remove console.log statements
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-text-primary dark:text-text-dark-primary mb-3 flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-primary-500" />
                          Long-term Improvements
                        </h4>
                        <ul className="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
                          <li className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            Implement Recipe schema.org markup
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            Add offline fallback pages
                          </li>
                          <li className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                            Implement background sync
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Export Actions */}
                <Card variant="default" padding="lg">
                  <CardContent>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-text-primary dark:text-text-dark-primary mb-1">
                          Share Your Results
                        </h3>
                        <p className="text-sm text-text-secondary dark:text-text-dark-secondary">
                          Export this report or share with your team
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={<Share2 className="w-4 h-4" />}
                        >
                          Share Link
                        </Button>
                        <Button
                          onClick={exportReport}
                          variant="primary"
                          size="sm"
                          icon={<FileText className="w-4 h-4" />}
                        >
                          Export PDF
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Built with Bolt Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Badge variant="outline" className="px-4 py-2">
              ⚡ Built with Bolt.new - World's Largest Hackathon
            </Badge>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AuditPage;