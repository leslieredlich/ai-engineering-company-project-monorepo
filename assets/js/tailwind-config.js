// Tokens de marca de Nexova para Tailwind CDN (compartidos por todas las páginas).
tailwind.config = {
  theme: {
    extend: {
      colors: {
        tinta: { DEFAULT: '#0F2A44', 700: '#1B3F63', 600: '#2C5680' },
        azahar: { DEFAULT: '#F29A2E', 100: '#FDEBD3' },
        mar: '#1F6F8B',
        niebla: '#EEF3F6',
        grafito: '#4A5B6B',
        alerta: { DEFAULT: '#B42318', 50: '#FEF3F2' },
        exito: { DEFAULT: '#067647', 50: '#ECFDF3' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { contenido: '72rem' },
    },
  },
};
