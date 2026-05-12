'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Edit2 } from 'lucide-react';
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
        return 'bg-red-100 border-red-200 dark:bg-red-900/50 dark:border-red-800/60';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-800/60';
      case 'low':
        return 'bg-green-100 border-green-200 dark:bg-green-900/50 dark:border-green-800/60';
      default:
        return 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${getCardColor(task.priority)} rounded-lg border p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50 scale-105' : ''
        } ${isFiltered ? 'opacity-40 pointer-events-none' : ''}`}
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
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate text-[15px]">
            {task.title}
          </h3>
          <p className="text-[13px] text-slate-700 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
            {task.description}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">
            <Badge variant="danger" className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-300/50 dark:border-slate-600/50">
            <Avatar name={task.assignee} size="sm" />
            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-[#0052CC] dark:text-slate-400 dark:hover:bg-blue-600 dark:hover:text-white transition-colors duration-200"
                title="Edit task"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => onDelete(task)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-red-500 dark:text-slate-400 dark:hover:bg-red-600 dark:hover:text-white transition-colors duration-200"
                title="Delete task"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
