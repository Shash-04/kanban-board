'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import { nanoid } from 'nanoid';
import { BoardState, Task, TaskStatus, Priority } from '@/types';

const generateFractionalOrder = (before?: number, after?: number): number => {
  const MIN = 0;
  const MAX = 2 ** 31 - 1;
  
  if (before === undefined && after === undefined) {
    return Math.random() * MAX;
  }
  
  if (before === undefined) {
    return after! / 2;
  }
  
  if (after === undefined) {
    return before + (MAX - before) / 2;
  }
  
  return (before + after) / 2;
};

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Design new dashboard layout',
    description: 'Create mockups for the new analytics dashboard',
    priority: 'high',
    status: 'todo',
    assignee: 'Alice',
    order: 100,
    createdAt: Date.now(),
  },
  {
    id: 'task-2',
    title: 'Fix login bug',
    description: 'Users unable to login with single sign-on',
    priority: 'high',
    status: 'in-progress',
    assignee: 'Bob',
    order: 200,
    createdAt: Date.now(),
  },
  {
    id: 'task-3',
    title: 'Update documentation',
    description: 'Add API endpoint documentation',
    priority: 'medium',
    status: 'in-progress',
    assignee: 'Charlie',
    order: 150,
    createdAt: Date.now(),
  },
  {
    id: 'task-4',
    title: 'Code review for feature X',
    description: 'Review PR #234 for new feature',
    priority: 'medium',
    status: 'in-review',
    assignee: 'Diana',
    order: 300,
    createdAt: Date.now(),
  },
  {
    id: 'task-5',
    title: 'Deploy to staging',
    description: 'Deploy v1.5.0 to staging environment',
    priority: 'high',
    status: 'in-review',
    assignee: 'Eve',
    order: 250,
    createdAt: Date.now(),
  },
  {
    id: 'task-6',
    title: 'Release notes v1.4.0',
    description: 'Write and publish release notes',
    priority: 'low',
    status: 'done',
    assignee: 'Frank',
    order: 400,
    createdAt: Date.now(),
  },
];

const useBoardStore = create<BoardState>()(
  temporal(
    devtools(
      persist(
        (set, get) => ({
          tasks: INITIAL_TASKS,
          filter: {
            priority: null,
            assignee: '',
          },

          addTask: (task, status) => {
            const allTasks = get().tasks;
            const statusTasks = allTasks.filter(t => t.status === status).sort((a, b) => a.order - b.order);
            const lastTask = statusTasks[statusTasks.length - 1];
            const order = lastTask ? lastTask.order + 100 : 0;

            set(
              state => ({
                tasks: [
                  ...state.tasks,
                  {
                    ...task,
                    id: nanoid(),
                    status,
                    order,
                    createdAt: Date.now(),
                  } as Task,
                ],
              }),
              false,
              'addTask'
            );
          },

          updateTask: (id, updates) => {
            set(
              state => ({
                tasks: state.tasks.map(task =>
                  task.id === id ? { ...task, ...updates } : task
                ),
              }),
              false,
              'updateTask'
            );
          },

          deleteTask: (id) => {
            set(
              state => ({
                tasks: state.tasks.filter(task => task.id !== id),
              }),
              false,
              'deleteTask'
            );
          },

          moveTask: (taskId, newStatus, newOrder) => {
            set(
              state => ({
                tasks: state.tasks.map(task =>
                  task.id === taskId
                    ? { ...task, status: newStatus, order: newOrder }
                    : task
                ),
              }),
              false,
              'moveTask'
            );
          },

          reorderTask: (taskId, newOrder) => {
            set(
              state => ({
                tasks: state.tasks.map(task =>
                  task.id === taskId
                    ? { ...task, order: newOrder }
                    : task
                ),
              }),
              false,
              'reorderTask'
            );
          },

          setFilter: (filter) => {
            set({ filter }, false, 'setFilter');
          },

          getTasksByStatus: (status) => {
            return get().tasks
              .filter(task => task.status === status)
              .sort((a, b) => a.order - b.order);
          },

          getFilteredTasks: (status) => {
            const { tasks, filter } = get();
            return tasks
              .filter(task => task.status === status)
              .filter(task => !filter.priority || task.priority === filter.priority)
              .filter(task => !filter.assignee || task.assignee === filter.assignee)
              .sort((a, b) => a.order - b.order);
          },
        }),
        {
          name: 'board-store',
          version: 1,
        }
      ),
      { name: 'BoardStore' }
    ),
    {
      limit: 20,
      partialize: state => ({ tasks: state.tasks, filter: state.filter }),
    }
  )
);

export default useBoardStore;
