/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Poppins', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'] },
    colors: { primary: '#6b4ef6', primaryHover: '#5a3de0', soft: '#eceafe', field: '#f1f1f5', ink: '#1f1d2b', muted: '#9a9aab', line: '#ececf1', sky: '#1e88f5', ok: '#22b573' }
  } }, plugins: []
}
