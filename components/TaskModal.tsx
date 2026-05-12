'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Task, Priority } from '@/types';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { getAllAssignees } from '@/lib/boardUtils';
import useBoardStore from '@/store/useBoardStore';

interface TaskModalProps {
  isOpen: boolean;
  task?: Task;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'order' | 'createdAt'>) => void;
}

export function TaskModal({ isOpen, task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [assignee, setAssignee] = useState('');
  const { tasks } = useBoardStore();

  const assignees = getAllAssignees(tasks);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setAssignee(task.assignee);
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setAssignee('');
    }
  }, [task, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title,
      description,
      priority,
      assignee,
      status: task?.status || 'todo',
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setAssignee('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {task ? 'Edit Task' : 'Create Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            autoFocus
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows={4}
          />

          <Select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            options={[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ]}
          />

          <Select
            label="Assignee"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            options={[
              { value: '', label: 'Unassigned' },
              ...assignees.map(a => ({ value: a, label: a })),
            ]}
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {task ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
