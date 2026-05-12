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

  const taskIds = tasks.map(t => t.id);

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden min-h-[500px] flex-1">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {getStatusLabel(status)}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {filteredTasks.length} of {tasks.length}
          </p>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
          title="Add task"
        >
          <Plus size={20} className="text-gray-600 dark:text-gray-400" />
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
              <p className="text-sm text-gray-500 dark:text-gray-400">No tasks</p>
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
