
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'surface-primary': 'var(--color-surface-primary)',
        'surface-secondary': 'var(--color-surface-secondary)',
        'surface-floating': 'var(--color-surface-floating)',
        'surface-overlay': 'var(--color-surface-overlay)',
        'surface-glass': 'var(--color-surface-glass)',
        'interactive-primary': 'var(--color-interactive-primary)',
        'interactive-secondary': 'var(--color-interactive-secondary)',
        'interactive-success': 'var(--color-interactive-success)',
        'interactive-danger': 'var(--color-interactive-danger)',
        'text-heading': 'var(--color-text-heading)',
        'text-body': 'var(--color-text-body)',
        'text-muted': 'var(--color-text-muted)',
        'border-default': 'var(--color-border-default)',
        'border-subtle': 'var(--color-border-subtle)',
        'border-hover': 'var(--color-border-hover)',
        'border-focus': 'var(--color-border-focus)',
      },
      boxShadow: {
        'surface': 'var(--shadow-surface)',
        'floating': 'var(--shadow-floating)',
      },
      spacing: {
        'section': 'var(--spacing-section)',
        'container': 'var(--spacing-container)',
      }
    },
  },
  plugins: [],
}
