'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import { getStatusColor, getStatusLabel } from '@/lib/boardUtils';
import useBoardStore from '@/store/useBoardStore';

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  filteredTasks: Task[];
  onAddTask: (status: TaskStatus) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export function Column({
  status,
  tasks,
  filteredTasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: status });

  const getHeaderBgColor = (colStatus: TaskStatus) => {
    switch (colStatus) {
      case 'todo':
        return 'bg-orange-200 dark:bg-orange-900/60';
      case 'in-progress':
        return 'bg-blue-200 dark:bg-blue-900/60';
      case 'in-review':
        return 'bg-purple-200 dark:bg-purple-900/60';
      case 'done':
        return 'bg-green-200 dark:bg-green-900/60';
      default:
        return 'bg-slate-200 dark:bg-slate-800';
    }
  };

  const getHeaderTextColor = (colStatus: TaskStatus) => {
    switch (colStatus) {
      case 'todo':
        return 'text-orange-800 dark:text-orange-200';
      case 'in-progress':
        return 'text-blue-800 dark:text-blue-200';
      case 'in-review':
        return 'text-purple-800 dark:text-purple-200';
      case 'done':
        return 'text-green-800 dark:text-green-200';
      default:
        return 'text-[#172b4d] dark:text-slate-200';
    }
  };

  const taskIds = tasks.map(t => t.id);

  return (
    <div className="flex flex-col bg-[#ebecf0] dark:bg-[#1e293b]/50 rounded-lg overflow-hidden min-h-[500px] flex-1">
      {/* Header */}
      <div className={`${getHeaderBgColor(status)} p-4 flex items-center justify-between rounded-t-lg transition-colors`}>
        <div>
          <h2 className={`font-semibold text-xl ${getHeaderTextColor(status)}`}>
            {getStatusLabel(status)}
          </h2>
          <p className="text-[13px] font-medium text-[#5e6c84] dark:text-slate-400 mt-0.5">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </p>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-1.5 hover:bg-[#091e4214] dark:hover:bg-slate-700 rounded transition-colors"
          title="Add task"
        >
          <Plus size={18} className="text-[#42526e] dark:text-slate-300" />
        </button>
      </div>

      {/* Tasks */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-slate-500 dark:text-slate-400">No tasks</p>
            </div>
          ) : (
            tasks.map(task => {
              const isFiltered = !filteredTasks.find(t => t.id === task.id);
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  isFiltered={isFiltered}
                  onEdit={onEditTask}
                  onDelete={onDeleteTask}
                />
              );
            })
          )}
        </SortableContext>
      </div>
    </div>
  );
}
