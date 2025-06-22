import React from 'react';
import { CheckSquare } from 'lucide-react';

const TodoHeader = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <CheckSquare className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3" />
            <h1 className="text-2xl sm:text-4xl font-bold tracking-wide">TODO List</h1>
          </div>
          <p className="text-sm sm:text-lg text-purple-100 max-w-md mx-auto px-4">
            Organize your tasks efficiently with categories and stay productive
          </p>
        </div>
      </div>
    </div>
  );
};

export default TodoHeader;