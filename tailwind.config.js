/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // ── 폰트 ──────────────────────────────────────────────
      fontFamily: {
        sans: [
          'Pretendard Variable', 'Pretendard',
          '-apple-system', 'BlinkMacSystemFont', 'system-ui',
          'Apple SD Gothic Neo', 'Noto Sans KR',
          'sans-serif',
        ],
      },

      // ── 색상 토큰 ─────────────────────────────────────────
      colors: {
        gusring: {
          bg:        '#FFFFFF',
          surface:   '#FFFFFF',
          // 브랜드 메인 컬러
          yellow:         '#fedb02',
          'yellow-press': '#e5c400',
          'yellow-soft':  '#fffbe6',
          text:      '#111827',
          'text-sub': '#6B7280',
          'text-hint': '#9CA3AF',
          border:    '#F0F1F5',
          'border-strong': '#E5E7EB',
          // 브랜드 컬러 스케일
          brand: {
            50:  '#fffde6',
            100: '#fff9bf',
            200: '#fff480',
            300: '#ffee40',
            400: '#fee810',
            500: '#fedb02',
            600: '#d4b500',
            700: '#a08800',
            800: '#7a6800',
            900: '#4d4200',
            950: '#2e2800',
          },
        },
      },

      // ── 그림자 ────────────────────────────────────────────
      boxShadow: {
        'card':    '0 2px 12px 0 rgba(0,0,0,0.06)',
        'card-md': '0 4px 20px 0 rgba(0,0,0,0.09)',
        'card-lg': '0 8px 32px 0 rgba(0,0,0,0.12)',
        'yellow':    '0 6px 24px 0 rgba(254,219,2,0.55)',
        'yellow-sm': '0 3px 12px 0 rgba(254,219,2,0.45)',
        'inset-sm': 'inset 0 1px 3px rgba(0,0,0,0.06)',
        'none': 'none',
      },

      // ── 둥근 모서리 ───────────────────────────────────────
      borderRadius: {
        '2.5xl': '1.25rem',   // 20px
        '3.5xl': '1.75rem',   // 28px
        '4xl':   '2rem',      // 32px
        '5xl':   '2.5rem',    // 40px
        '6xl':   '3rem',      // 48px
      },

      // ── 애니메이션 ────────────────────────────────────────
      keyframes: {
        slideUpFade: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)'    },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(-5px)' },
          '50%':      { transform: 'translateY(0)'    },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.94)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
      },
      animation: {
        'slide-up':    'slideUpFade 0.35s cubic-bezier(0.34,1.2,0.64,1) both',
        'slide-right': 'slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both',
        'fade-in':     'fadeIn 0.25s ease-out both',
        'bounce-soft': 'bounceSoft 2.4s ease-in-out infinite',
        'shimmer':     'shimmer 1.6s linear infinite',
        'scale-in':    'scaleIn 0.2s cubic-bezier(0.34,1.2,0.64,1) both',
      },

      // ── 트랜지션 이징 ─────────────────────────────────────
      transitionTimingFunction: {
        'toss':   'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'out':    'cubic-bezier(0, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
