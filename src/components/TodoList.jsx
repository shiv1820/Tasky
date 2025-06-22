import React from 'react';
import TodoItem from './TodoItem';
import { ListTodo } from 'lucide-react';

const TodoList = ({ todos, onToggleStatus, onDeleteTodo, onEditTodo, getCategoryById }) => {
  if (todos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
        <ListTodo className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg sm:text-xl font-semibold text-gray-500 mb-2">No tasks found</h3>
        <p className="text-gray-400 text-sm sm:text-base">Add your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden sm:block bg-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">
          <div className="col-span-6">Task</div>
          <div className="col-span-3 text-center">Status</div>
          <div className="col-span-3 text-center">Actions</div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            category={getCategoryById(todo.categoryId)}
            onToggleStatus={onToggleStatus}
            onDeleteTodo={onDeleteTodo}
            onEditTodo={onEditTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;