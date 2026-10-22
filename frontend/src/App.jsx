
import { useEffect, useState, useCallback } from 'react';

import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import Stats from './components/Stats.jsx';
import TaskList from './components/TaskList.jsx';
import TaskModal from './components/TaskModal.jsx';

import { api } from './api.js';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modal, setModal] = useState({
    open: false,
    mode: 'create',
    task: null,
  });

  // Carrega as tarefas do backend
  const loadTasks = useCallback(async (query) => {
    try {
      setLoading(true);

      const data = await api.listTasks(query);

      setTasks(data.tasks);
      setTotal(data.total);
      setCompleted(data.completed);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualiza a lista quando a pesquisa muda
  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, loadTasks]);

  // Abre e fecha o modal
  const openCreate = () => {
    setModal({
      open: true,
      mode: 'create',
      task: null,
    });
  };

  const openEdit = (task) => {
    setModal({
      open: true,
      mode: 'edit',
      task,
    });
  };

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      open: false,
    }));
  };

  // Cria ou edita uma tarefa
  const submitModal = async ({ title, dueDate }) => {
    try {
      if (modal.mode === 'edit' && modal.task) {
        await api.updateTask(modal.task.id, {
          title,
          dueDate,
        });
      } else {
        await api.createTask(title, dueDate);
      }

      closeModal();
    } catch (err) {
      setError(err.message);
      return;
    }

    loadTasks(search);
  };

  // Marca ou desmarca uma tarefa como concluída
  const toggle = async (id, value) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: value }
          : task
      )
    );

    try {
      await api.toggleTask(id, value);
      const resultado = await api.toggleTask(id, value);
      console.log("Resposta ao concluir:", resultado);
    } catch (err) {
      setError(err.message);
    }

    loadTasks(search);
  };

  // Exclui uma tarefa
  const remove = async (id) => {
    if (
      !window.confirm(
        'Deseja realmente excluir esta tarefa?'
      )
    ) {
      return;
    }

    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );

    try {
      await api.deleteTask(id);
      console.log("Deletou")
    } catch (err) {
      setError(err.message);
    }

    loadTasks(search);
  };

  return (
    <div className="min-h-screen sm:py-8 flex justify-center">
      <div className="relative w-full max-w-md min-h-screen sm:min-h-[780px] sm:rounded-[36px] bg-primary overflow-hidden shadow-2xl shadow-primary/30 flex flex-col">
        <Header />

        <main className="flex-1 flex flex-col">
          <div className="bg-[#e6e6ec] rounded-t-[32px] pt-3 pb-10 text-center text-[10px] tracking-widest text-ink/70">
            LISTA DE TAREFAS
          </div>

          <section className="flex-1 -mt-8 bg-white rounded-t-[32px] px-5 pt-6 pb-28">
            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <Stats
              total={total}
              completed={completed}
            />

            {error && (
              <p className="text-center text-red-500 text-sm mt-6">
                {error} — verifique se o backend está rodando.
              </p>
            )}

            {!error && loading && tasks.length === 0 ? (
              <p className="text-center text-muted text-sm py-16">
                Carregando...
              </p>
            ) : (
              <TaskList
                tasks={tasks}
                onToggle={toggle}
                onDelete={remove}
                onEdit={openEdit}
                onOpenCreate={openCreate}
              />
            )}
          </section>
        </main>

        <button
          type="button"
          onClick={openCreate}
          aria-label="Adicionar tarefa"
          className="sticky bottom-6 self-end mr-6 mb-6 -mt-20 z-10 w-14 h-14 rounded-full bg-primary hover:bg-primaryHover shadow-lg shadow-primary/40 flex items-center justify-center text-white transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <TaskModal
        open={modal.open}
        mode={modal.mode}
        initialTask={modal.task}
        onClose={closeModal}
        onSubmit={submitModal}
      />
    </div>
  );
}
