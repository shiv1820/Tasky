import React, { useState, useEffect } from 'react';
import TodoHeader from './components/TodoHeader';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CategoryFilter from './components/CategoryFilter';
import { generateId } from './utils/helpers';

const PREDEFINED_CATEGORIES = [
  { id: 'work', name: 'Work', icon: 'Briefcase', color: 'bg-blue-500' },
  { id: 'personal', name: 'Personal', icon: 'User', color: 'bg-green-500' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'bg-red-500' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingCart', color: 'bg-purple-500' },
  { id: 'study', name: 'Study', icon: 'BookOpen', color: 'bg-yellow-500' },
  { id: 'travel', name: 'Travel', icon: 'Plane', color: 'bg-indigo-500' },
  { id: 'home', name: 'Home', icon: 'Home', color: 'bg-orange-500' },
  { id: 'fitness', name: 'Fitness', icon: 'Dumbbell', color: 'bg-teal-500' }
];

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData) => {
    const newTodo = {
      id: generateId(),
      text: todoData.text,
      categoryId: todoData.categoryId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTodos(prev => [newTodo, ...prev]);
  };

  const updateTodo = (id, updates) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    ));
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodoStatus = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id
        ? { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed', updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    const categoryMatch = selectedCategory === 'all' || todo.categoryId === selectedCategory;
    const statusMatch = statusFilter === 'all' || todo.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  const getCategoryById = (categoryId) => {
    return PREDEFINED_CATEGORIES.find(cat => cat.id === categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TodoHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <TodoForm 
          onAddTodo={addTodo}
          categories={PREDEFINED_CATEGORIES}
          editingTodo={editingTodo}
          onUpdateTodo={updateTodo}
          onCancelEdit={() => setEditingTodo(null)}
        />
        
        <CategoryFilter 
          categories={PREDEFINED_CATEGORIES}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          todosCount={filteredTodos.length}
        />
        
        <TodoList 
          todos={filteredTodos}
          onToggleStatus={toggleTodoStatus}
          onDeleteTodo={deleteTodo}
          onEditTodo={setEditingTodo}
          getCategoryById={getCategoryById}
        />
      </div>
    </div>
  );
}

export default App;