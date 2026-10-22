import {useState} from 'react'
const WEEKDAYS=['Seg','Ter','Qua','Qui','Sex','Sáb','Dom']
const toISO=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`
export default function Calendar({value,onChange}) {
 const now=new Date(), selected=value?new Date(value+'T00:00:00'):now
 const [view,setView]=useState({year:selected.getFullYear(),month:selected.getMonth()})
 const today=toISO(now.getFullYear(),now.getMonth(),now.getDate()), first=(new Date(view.year,view.month,1).getDay()+6)%7, count=new Date(view.year,view.month+1,0).getDate()
 const cells=[...Array(first).fill(null),...Array.from({length:count},(_,i)=>i+1)]
 const changeMonth=delta=>{const d=new Date(view.year,view.month+delta,1);setView({year:d.getFullYear(),month:d.getMonth()})}
 return <div className="rounded-2xl border border-line p-4"><div className="flex items-center justify-between mb-3"><button type="button" onClick={()=>changeMonth(-1)} aria-label="Mês anterior" className="px-1 text-xl">‹</button><span className="text-sm font-semibold text-ink">{new Date(view.year,view.month,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}</span><button type="button" onClick={()=>changeMonth(1)} aria-label="Próximo mês" className="px-1 text-xl">›</button></div><div className="grid grid-cols-7 gap-y-1 text-center text-[11px]">{WEEKDAYS.map(w=><span key={w} className="text-muted pb-1">{w}</span>)}{cells.map((day,i)=>{if(day===null)return <span key={'e'+i}/>;const iso=toISO(view.year,view.month,day),chosen=iso===value,isToday=iso===today;return <button key={iso} type="button" onClick={()=>onChange(chosen?'':iso)} className={'mx-auto w-8 h-8 rounded-full text-xs transition-colors '+(chosen?'bg-primary text-white font-semibold':isToday?'ring-1 ring-sky text-sky font-semibold':'text-ink hover:bg-soft')}>{day}</button>})}</div>{value&&<button type="button" onClick={()=>onChange('')} className="mt-3 text-xs text-muted hover:text-primary">Limpar data</button>}</div>
}
