function getGreeting() { const hour = new Date().getHours(); if (hour < 12) return 'Bom dia'; if (hour < 18) return 'Boa tarde'; return 'Boa noite' }
export default function Header() {
  const today = new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
  return <header className="px-7 pt-14 pb-16 text-white"><p className="text-lg font-light">{getGreeting()}</p><h1 className="text-2xl font-semibold">Minhas tarefas</h1><p className="mt-7 text-[10px] tracking-wider"><span className="text-white/60">TAREFAS DE HOJE</span><span className="ml-3 font-medium text-white/90">{today}</span></p></header>
}
