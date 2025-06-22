export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const filterTodosByCategory = (todos, categoryId) => {
  if (categoryId === 'all') return todos;
  return todos.filter(todo => todo.categoryId === categoryId);
};

export const filterTodosByStatus = (todos, status) => {
  if (status === 'all') return todos;
  return todos.filter(todo => todo.status === status);
};