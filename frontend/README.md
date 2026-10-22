# Frontend Todolist (React + Vite + Tailwind CSS 3)

Frontend criado seguindo a apostila `Construindo o Frontend do Todolist`.

## Requisitos
- Node.js 20.19+ e npm
- Backend Fastify/MySQL da apostila iniciado em `http://localhost:3333`

## Rodar
1. Extraia o ZIP e abra a pasta `todolist-frontend` no VS Code.
2. No terminal, execute `npm install`.
3. Se a API estiver em outro endereço, copie `.env.example` para `.env` e ajuste `VITE_API_URL`.
4. Execute `npm run dev` e abra o endereço mostrado pelo Vite (normalmente `http://localhost:5173`).

## O que inclui
- Listar e pesquisar tarefas (debounce de 300 ms)
- Criar e editar tarefa com calendário e data limite opcional
- Concluir/reabrir e excluir tarefas
- Indicador visual de tarefas em atraso
- Layout responsivo com React, Vite e Tailwind CSS 3

Este ZIP contém apenas o frontend; o backend e o banco MySQL precisam estar rodando separadamente.
