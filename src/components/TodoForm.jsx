import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const TodoForm = ({ onAddTodo, categories, editingTodo, onUpdateTodo, onCancelEdit }) => {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setText(editingTodo.text);
      setCategoryId(editingTodo.categoryId);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editingTodo) {
      onUpdateTodo(editingTodo.id, { text: text.trim(), categoryId });
    } else {
      onAddTodo({ text: text.trim(), categoryId });
    }
    
    setText('');
    setCategoryId('');
  };

  const handleCancel = () => {
    setText('');
    setCategoryId('');
    onCancelEdit();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-lg font-medium mb-3">
            What would you like to do?
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            {editingTodo ? 'Update Task' : 'Add Task'}
          </button>
          
          {editingTodo && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TodoForm;