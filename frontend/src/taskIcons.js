const ICONS = [
  { color: '#6b4ef6', d: 'M8 19V10M16 19V5' },
  { color: '#fdb022', d: 'm16.5 3.5 4 4L7 21H3v-4L16.5 3.5Z' },
  { color: '#22b573', d: 'M3 6h18v12H3zM3 7l9 6 9-6' },
  { color: '#1e88f5', d: 'M5 6h14M5 12h14M5 18h14' },
  { color: '#f0287a', d: 'M3 7h6l2 2h10v10H3z' },
  { color: '#ff8a1f', d: 'M6 17h12l-1.5-2V10a4.5 4.5 0 0 0-9 0v5L6 17ZM10 20h4' },
]
export function getTaskIcon(id) { return ICONS[Number(id) % ICONS.length] }
