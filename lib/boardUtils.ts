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
      return 'bg-red-500/20 text-red-700 border-red-200';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
    case 'low':
      return 'bg-green-500/20 text-green-700 border-green-200';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'todo':
      return 'bg-slate-100 dark:bg-slate-800';
    case 'in-progress':
      return 'bg-blue-100 dark:bg-blue-900';
    case 'in-review':
      return 'bg-purple-100 dark:bg-purple-900';
    case 'done':
      return 'bg-green-100 dark:bg-green-900';
    default:
      return 'bg-slate-100 dark:bg-slate-800';
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
