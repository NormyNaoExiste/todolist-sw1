import { getTaskIcon } from '../taskIcons.js'
function formatDate(s) { const [y,m,d]=s.split('-'); return `${d}/${m}/${y}` }
function todayISO() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}` }
export default function TaskItem({task,onToggle,onDelete,onEdit}) {
 const done=Boolean(task.completed), overdue=!done && task.due_date && task.due_date<todayISO(), icon=getTaskIcon(task.id)
 return <div className={'flex items-center gap-3 rounded-2xl px-3 py-3 transition-colors '+(overdue?'bg-red-50':'hover:bg-soft')}>
  <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center" style={{backgroundColor:icon.color,opacity:done ? 0.45 : 1}}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={icon.d} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
  <div className="flex-1 min-w-0"><span className={'block text-[12px] font-semibold uppercase tracking-wide truncate '+(done?'text-muted line-through':overdue?'text-red-500':'text-ink')}>{task.title}</span><div className="flex items-center gap-2 mt-0.5"><span className={'text-[10px] uppercase '+(overdue?'text-red-400':'text-muted')}>{task.due_date?formatDate(task.due_date):'Sem data limite'}</span>{overdue&&<span className="text-[9px] font-semibold uppercase text-red-500 bg-red-100 rounded-full px-2 py-0.5">Em atraso</span>}</div></div>
  <button type="button" onClick={()=>onEdit(task)} aria-label="Editar tarefa" className="text-muted hover:text-primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m16.5 3.5 4 4L7 21H3v-4L16.5 3.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  <button type="button" onClick={()=>onDelete(task.id)} aria-label="Excluir tarefa" className="text-muted hover:text-red-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m2 0-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7h14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  <input type="checkbox" className="task-check" checked={done} onChange={e=>onToggle(task.id,e.target.checked)} aria-label="Marcar como concluída"/>
 </div>
}
