import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '../ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component for graceful error handling
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log error to monitoring service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background-dark p-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white dark:bg-neutral-800 rounded-2xl p-8 shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="w-16 h-16 bg-error-100 dark:bg-error-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-error-600 dark:text-error-400" />
              </div>
              
              <h1 className="text-2xl font-display font-bold text-text-primary dark:text-text-dark-primary mb-4">
                Oops! Quelque chose s'est mal passé
              </h1>
              
              <p className="text-text-secondary dark:text-text-dark-secondary mb-6">
                Une erreur inattendue s'est produite. Nous nous excusons pour la gêne occasionnée.
              </p>
              
              <div className="space-y-4">
                <Button
                  onClick={this.handleRetry}
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={<RefreshCw className="w-5 h-5" />}
                >
                  Réessayer
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  size="lg"
                  fullWidth
                >
                  Retour à l'accueil
                </Button>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                    Détails de l'erreur (développement)
                  </summary>
                  <pre className="text-xs bg-neutral-100 dark:bg-neutral-900 p-4 rounded-lg overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;