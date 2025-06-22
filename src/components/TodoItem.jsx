import React from 'react';
import { Trash2, Edit, Clock, CheckCircle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const TodoItem = ({ todo, category, onToggleStatus, onDeleteTodo, onEditTodo }) => {
  const CategoryIcon = category ? LucideIcons[category.icon] || LucideIcons.Tag : LucideIcons.Tag;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
      todo.status === 'completed' ? 'opacity-75' : ''
    }`}>
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
          <div className="flex items-center gap-3">
            {category && (
              <div className={`flex items-center justify-center w-8 h-8 ${category.color} rounded-full`}>
                <CategoryIcon className="w-4 h-4 text-white" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-lg font-medium ${
                todo.status === 'completed' 
                  ? 'line-through text-gray-500' 
                  : 'text-gray-900'
              }`}>
                {todo.text}
              </p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                {category && (
                  <span className="flex items-center gap-1">
                    <CategoryIcon className="w-3 h-3" />
                    {category.name}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDate(todo.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 text-center">
          <button
            onClick={() => onToggleStatus(todo.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              todo.status === 'completed'
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
            }`}
          >
            {todo.status === 'completed' ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Completed
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                Pending
              </>
            )}
          </button>
        </div>

        <div className="col-span-3">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => onEditTodo(todo)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDeleteTodo(todo.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;