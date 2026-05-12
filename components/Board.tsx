'use client';

import React, { useState } from 'react';
import {
  DndContext,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import { Task, TaskStatus } from '@/types';
import useBoardStore from '@/store/useBoardStore';
import { generateFractionalOrder } from '@/lib/boardUtils';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { ConfirmModal } from './ConfirmModal';

const COLUMNS: TaskStatus[] = ['todo', 'in-progress', 'in-review', 'done'];

export function Board() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [createStatus, setCreateStatus] = useState<TaskStatus>('todo');

  const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus, getFilteredTasks } =
    useBoardStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // const handleDragOver = (event: DragOverEvent) => {
  //   const { active, over } = event;
  //   if (!over) return;

  //   const activeTask = tasks.find(t => t.id === active.id);
  //   if (!activeTask) return;

  //   const overId = over.id as string;
  //   const isOverColumn = COLUMNS.includes(overId as TaskStatus);

  //   if (isOverColumn) {
  //     const columnTasks = getTasksByStatus(overId as TaskStatus)
  //       .sort((a, b) => a.order - b.order);

  //     const newOrder = columnTasks.length === 0
  //       ? generateFractionalOrder()
  //       : generateFractionalOrder(columnTasks[columnTasks.length - 1]?.order);

  //     moveTask(activeTask.id, overId as TaskStatus, newOrder);
  //   } else {
  //     const overTask = tasks.find(t => t.id === overId);
  //     if (!overTask) return;

  //     const allTasksInColumn = getTasksByStatus(overTask.status)
  //       .sort((a, b) => a.order - b.order);

  //     const overIndex = allTasksInColumn.findIndex(t => t.id === overId);
  //     const newOrder =
  //       overIndex === 0
  //         ? generateFractionalOrder(undefined, allTasksInColumn[0]?.order)
  //         : generateFractionalOrder(
  //           allTasksInColumn[overIndex - 1]?.order,
  //           allTasksInColumn[overIndex]?.order
  //         );

  //     moveTask(activeTask.id, overTask.status, newOrder);
  //   }
  // };

 const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event;

  setActiveId(null);

  if (!over) return;

  const activeTask = tasks.find(t => t.id === active.id);
  if (!activeTask) return;

  const overId = over.id as string;
  const isOverColumn = COLUMNS.includes(overId as TaskStatus);

  if (isOverColumn) {
    const columnTasks = getTasksByStatus(overId as TaskStatus)
      .sort((a, b) => a.order - b.order);

    const newOrder =
      columnTasks.length === 0
        ? generateFractionalOrder()
        : generateFractionalOrder(
            columnTasks[columnTasks.length - 1]?.order
          );

    moveTask(activeTask.id, overId as TaskStatus, newOrder);
  } else {
    const overTask = tasks.find(t => t.id === overId);
    if (!overTask) return;

    const allTasksInColumn = getTasksByStatus(overTask.status)
      .sort((a, b) => a.order - b.order);

    const overIndex = allTasksInColumn.findIndex(
      t => t.id === overId
    );

    const newOrder =
      overIndex === 0
        ? generateFractionalOrder(
            undefined,
            allTasksInColumn[0]?.order
          )
        : generateFractionalOrder(
            allTasksInColumn[overIndex - 1]?.order,
            allTasksInColumn[overIndex]?.order
          );

    moveTask(activeTask.id, overTask.status, newOrder);
  }
};
  const handleAddTask = (status: TaskStatus) => {
    setCreateStatus(status);
    setModalMode('create');
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setModalMode('edit');
    setIsTaskModalOpen(true);
  };

  const handleDeleteTask = (task: Task) => {
    setDeletingTask(task);
  };

  const handleConfirmDelete = () => {
    if (deletingTask) {
      deleteTask(deletingTask.id);
      setDeletingTask(null);
    }
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'order' | 'createdAt'>) => {
    if (modalMode === 'create') {
      addTask(taskData, createStatus);
    } else if (editingTask) {
      updateTask(editingTask.id, taskData);
    }
    setIsTaskModalOpen(false);
    setEditingTask(null);
  };

  const activeDragTask = activeId ? tasks.find(t => t.id === activeId) : null;

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        // onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLUMNS.map(status => (
            <Column
              key={status}
              status={status}
              tasks={getTasksByStatus(status)}
              filteredTasks={getFilteredTasks(status)}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDragTask && (
            <div className="opacity-50">
              <TaskCard
                task={activeDragTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <TaskModal
        isOpen={isTaskModalOpen}
        task={modalMode === 'edit' ? editingTask || undefined : undefined}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />

      <ConfirmModal
        isOpen={!!deletingTask}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingTask(null)}
      />
    </>
  );
}
