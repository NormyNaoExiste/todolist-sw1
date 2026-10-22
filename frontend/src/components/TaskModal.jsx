import {useEffect,useState} from 'react'
import Calendar from './Calendar.jsx'
export default function TaskModal({open,mode='create',initialTask,onClose,onSubmit}) {
 const [title,setTitle]=useState(''),[dueDate,setDueDate]=useState('')
 useEffect(()=>{if(open){setTitle(initialTask?.title||'');setDueDate(initialTask?.due_date||'')}},[open,initialTask])
 if(!open)return null
 const accept=()=>{if(title.trim())onSubmit({title:title.trim(),dueDate:dueDate||null})}
 const keyDown=e=>{if(e.key==='Enter')accept();if(e.key==='Escape')onClose()}
 return <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}><div className="w-full max-w-md bg-white rounded-t-[32px] sm:rounded-[32px] px-6 pt-7 pb-6 shadow-2xl"><h2 className="text-xl font-semibold text-ink mb-5">{mode==='edit'?'Editar tarefa':'Criar tarefa'}</h2><input autoFocus value={title} onChange={e=>setTitle(e.target.value)} onKeyDown={keyDown} placeholder="Escreva o nome da tarefa" className="w-full bg-primary rounded-xl px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/70 mb-5"/><Calendar value={dueDate} onChange={setDueDate}/><div className="flex items-center gap-3 mt-6"><button type="button" onClick={onClose} className="flex-1 py-3 rounded-xl bg-field text-ink text-sm font-medium hover:bg-line">Cancelar</button><button type="button" onClick={accept} className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primaryHover">Salvar</button></div></div></div>
}
