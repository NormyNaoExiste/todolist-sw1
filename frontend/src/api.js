const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'

async function request(path, options = {}) {
  const headers = { ...options.headers };

  // Só define JSON quando existe um corpo na requisição
  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));

    throw new Error(
      data.message || 'Erro ao comunicar com o servidor.'
    );
  }

  const text = await response.text();

  return text ? JSON.parse(text) : null;
}

export const api = {
  listTasks: (search = '') => request(`/api/tasks?search=${encodeURIComponent(search)}`),
  createTask: (title, dueDate) => request('/api/tasks', { method: 'POST', body: JSON.stringify({ title, dueDate: dueDate || null }) }),
  updateTask: (id, { title, dueDate }) => request(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ title, dueDate: dueDate ?? null }) }),
  toggleTask: (id, completed) => request(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ completed }) }),
  deleteTask: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' }),
}
