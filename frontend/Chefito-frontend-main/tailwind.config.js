/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary palette - Paprika doré with improved contrast
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#D35400', // Main brand color
          600: '#B8470F', // Darker for better contrast (5.2:1 with white)
          700: '#A0522D', // Even darker (6.1:1 with white)
          800: '#7A3F12',
          900: '#431407',
        },
        
        // Secondary palette - Cannelle
        secondary: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#8B4513',
          600: '#7A3F12',
          700: '#57534E',
          800: '#44403C',
          900: '#292524',
        },

        // Neutral palette
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },

        // Success palette - Menthe sauvage
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#7FB069',
          600: '#16A34A',
          700: '#15803D',
          800: '#166534',
          900: '#14532D',
        },

        // Warning palette - Safran
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#F4D03F',
          500: '#EAB308',
          600: '#CA8A04',
          700: '#A16207',
          800: '#854D0E',
          900: '#713F12',
        },

        // Error palette - Rouge tomate
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#E74C3C',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },

        // Background colors
        background: {
          DEFAULT: '#F5E8C7', // Crème brûlée
          dark: '#1C2526', // Charbon actif
        },

        // Surface colors
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#2C3639',
        },

        // Text colors
        text: {
          primary: {
            DEFAULT: '#1C2526',
          },
          secondary: {
            DEFAULT: '#6B7280',
          },
          dark: {
            primary: '#F5E8C7',
            secondary: '#D4A574',
          }
        },

        // Border colors
        border: {
          DEFAULT: '#E5E7EB',
          dark: '#4B5563',
        },
      },

      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Crimson Pro',
          'Georgia',
          'Times New Roman',
          'serif',
        ],
        mono: [
          'JetBrains Mono',
          'Consolas',
          'Monaco',
          'Courier New',
          'monospace',
        ],
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },

      borderRadius: {
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },

      boxShadow: {
        'soft': '0 4px 12px -2px rgb(28 37 38 / 0.08), 0 2px 4px -2px rgb(28 37 38 / 0.04)',
        'medium': '0 8px 24px -4px rgb(28 37 38 / 0.12), 0 4px 8px -4px rgb(28 37 38 / 0.06)',
        'large': '0 16px 48px -8px rgb(28 37 38 / 0.16), 0 8px 16px -8px rgb(28 37 38 / 0.08)',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        'safe-area-inset-bottom': 'env(safe-area-inset-bottom)',
      },

      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '500': '500ms',
      },

      transitionTimingFunction: {
        'ease-warm': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};