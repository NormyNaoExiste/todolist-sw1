import TaskItem from './TaskItem.jsx'
export default function TaskList({tasks,onToggle,onDelete,onEdit,onOpenCreate}) {
 if(!tasks.length) return <div className="flex flex-col items-center justify-center py-16 gap-4"><button type="button" onClick={onOpenCreate} aria-label="Criar tarefa" className="w-14 h-14 rounded-full border-2 border-dashed border-muted flex items-center justify-center text-muted hover:border-primary hover:text-primary transition-colors"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button><div className="text-center"><p className="text-ink font-medium">Você não tem tarefas.</p><p className="text-muted text-sm mt-1">Crie uma para começar.</p></div></div>
 return <div className="flex flex-col gap-1 pt-3">{tasks.map(task=><TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}/>)}</div>
}
