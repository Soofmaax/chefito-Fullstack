import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../../hooks/useLanguage';
import Header from './Header';

// Mock the auth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isLoading: false,
    logout: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {component}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('Header', () => {
  it('renders the logo and navigation', () => {
    renderWithProviders(<Header />);
    
    // Check for logo/brand name
    expect(screen.getByText(/chefito/i)).toBeInTheDocument();
    
    // Check for main navigation links
    expect(screen.getByText(/accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/recettes/i)).toBeInTheDocument();
    expect(screen.getByText(/tarifs/i)).toBeInTheDocument();
  });

  it('shows login button when user is not authenticated', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText(/connexion/i)).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    renderWithProviders(<Header />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // Check for skip links or other accessibility features
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('includes language selector', () => {
    renderWithProviders(<Header />);
    
    // The language selector should be present
    // This might be a button or dropdown depending on implementation
    const languageElements = screen.getAllByText(/🇫🇷|🇺🇸|🇪🇸|🇩🇪|🇮🇹/);
    expect(languageElements.length).toBeGreaterThan(0);
  });

  it('renders mobile menu toggle on small screens', () => {
    renderWithProviders(<Header />);
    
    // Look for mobile menu button (usually has hamburger icon or "Menu" text)
    const menuButtons = screen.getAllByRole('button');
    expect(menuButtons.length).toBeGreaterThan(0);
  });
});