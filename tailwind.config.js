/** Configuración de Tailwind para el sitio de Nexova (tokens de marca). */
module.exports = {
  content: ['./index.html', './application.html', './validation.js', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        tinta: { DEFAULT: '#0F2A44', 700: '#1B3F63', 600: '#2C5680', 300: '#93A9BE', 200: '#C9D6E2', 100: '#E4EBF1' },
        azahar: { DEFAULT: '#F29A2E', 600: '#E68A1A', 100: '#FDEBD3' },
        mar: '#1F6F8B',
        niebla: '#EEF3F6',
        grafito: '#4A5B6B',
        borde: '#7F91A3', // borde de campos: contraste 3:1 sobre blanco (WCAG 1.4.11)
        alerta: { DEFAULT: '#B42318', 50: '#FEF3F2' },
        exito: { DEFAULT: '#067647', 50: '#ECFDF3' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { contenido: '72rem' },
      lineHeight: { titular: '1.05' },
    },
  },
  plugins: [],
};
