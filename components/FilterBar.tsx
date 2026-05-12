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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Priority
        </h3>
        <div className="flex gap-2 flex-wrap">
          {(['low', 'medium', 'high'] as Priority[]).map(priority => (
            <button
              key={priority}
              onClick={() => handlePriorityClick(priority)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                filter.priority === priority
                  ? priority === 'high'
                    ? 'bg-red-600 text-white'
                    : priority === 'medium'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-green-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Assignee
        </h3>
        <select
          value={filter.assignee}
          onChange={(e) => handleAssigneeChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
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
          className="w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition flex items-center justify-center gap-2"
        >
          <X size={14} />
          Clear Filters
        </button>
      )}
    </div>
  );
}
