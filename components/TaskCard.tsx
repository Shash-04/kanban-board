'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { Task } from '@/types';
import { Badge } from './Badge';
import { Avatar } from './Avatar';
import { getPriorityColor } from '@/lib/boardUtils';

interface TaskCardProps {
  task: Task;
  isFiltered?: boolean;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskCard({ task, isFiltered = false, onEdit, onDelete }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { status: task.status } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : isFiltered ? 0.5 : 1,
  };

  const getCardColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 border-red-200 dark:bg-red-900/20 dark:border-red-800/50';
      case 'medium':
        return 'bg-yellow-200 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800/50';
      case 'low':
        return 'bg-green-200 border-green-200 dark:bg-green-900/20 dark:border-green-800/50';
      default:
        return 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getCardColor(task.priority)} rounded-lg border p-4 shadow-sm hover:shadow-md transition cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''
        } ${isFiltered ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex gap-2 items-start">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 flex-shrink-0 mt-0.5"
        >
          <GripVertical size={16} />
        </button>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate text-sm">
            {task.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {task.description}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge variant="danger" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-3">
            <Avatar name={task.assignee} size="sm" />
            <button
              onClick={() => onDelete(task)}
              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition p-1"
            >
              <div className="w-8 h-8 rounded-full bg-red-300 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition cursor-pointer">
                <Trash2 size={16} />
              </div>

            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
