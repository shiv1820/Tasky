import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Filter, List } from 'lucide-react';

const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  statusFilter, 
  onStatusFilterChange,
  todosCount 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {todosCount} tasks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map(category => {
                  const IconComponent = LucideIcons[category.icon] || LucideIcons.Tag;
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => onStatusFilterChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-colors text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange('all')}
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
            All
          </button>
          
          {categories.map(category => {
            const IconComponent = LucideIcons[category.icon] || LucideIcons.Tag;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? `${category.color} text-white`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="hidden xs:inline">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;