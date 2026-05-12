'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Priority } from '@/types';
import { Badge } from './Badge';
import { Input } from './Input';
import useBoardStore from '@/store/useBoardStore';

export function FilterBar() {
  const { filter, setFilter, tasks } = useBoardStore();

  const assignees = Array.from(new Set(tasks.map(t => t.assignee))).sort();

  const handlePriorityClick = (priority: Priority) => {
    setFilter({
      ...filter,
      priority: filter.priority === priority ? null : priority,
    });
  };

  const handleAssigneeChange = (value: string) => {
    setFilter({
      ...filter,
      assignee: value,
    });
  };

  const hasActiveFilters = filter.priority || filter.assignee;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5 space-y-5 shadow-sm">
      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Priority
        </h3>
        <div className="flex gap-2 flex-wrap">
          {(['low', 'medium', 'high'] as Priority[]).map(priority => (
              <button
                key={priority}
                onClick={() => handlePriorityClick(priority)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors border ${
                  filter.priority === priority
                    ? priority === 'high'
                      ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800'
                      : priority === 'medium'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800'
                      : 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
          Assignee
        </h3>
        <select
          value={filter.assignee}
          onChange={(e) => handleAssigneeChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 dark:text-white"
        >
          <option value="">All assignees</option>
          {assignees.map(assignee => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => setFilter({ priority: null, assignee: '' })}
          className="w-full px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center justify-center gap-2"
        >
          <X size={16} />
          Clear Filters
        </button>
      )}
    </div>
  );
}
