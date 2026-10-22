export default function SearchBar({ value, onChange }) {
  return <div className="flex items-center gap-3 bg-field rounded-2xl px-4 py-3"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-muted shrink-0"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><line x1="16.5" y1="16.5" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg><input value={value} onChange={e => onChange(e.target.value)} placeholder="Pesquisar tarefas" className="bg-transparent outline-none w-full text-sm text-ink placeholder:text-muted" /></div>
}
