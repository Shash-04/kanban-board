import { Task, Priority } from '@/types';

export const generateFractionalOrder = (before?: number, after?: number): number => {
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

export const getPriorityColor = (priority: Priority): string => {
  switch (priority) {
    case 'high':
      return 'bg-red-50 text-red-600 border border-red-100 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20';
    case 'medium':
      return 'bg-yellow-50 text-yellow-600 border border-yellow-100 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20';
    case 'low':
      return 'bg-green-50 text-green-600 border border-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20';
  }
};

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'in-review': 'In Review',
    'done': 'Done',
  };
  return labels[status] || status;
};

export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const getAllAssignees = (tasks: Task[]): string[] => {
  const assignees = new Set(tasks.map(t => t.assignee));
  return Array.from(assignees).sort();
};
