export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'in-review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  assignee: string;
  order: number; 
  createdAt: number;
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
}

export interface BoardState {
  tasks: Task[];
  filter: {
    priority: Priority | null;
    assignee: string;
  };
  addTask: (task: Omit<Task, 'id' | 'order' | 'createdAt'>, status: TaskStatus) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus, newOrder: number) => void;
  reorderTask: (taskId: string, newOrder: number) => void;
  setFilter: (filter: BoardState['filter']) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getFilteredTasks: (status: TaskStatus) => Task[];
}
