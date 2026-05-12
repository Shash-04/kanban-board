'use client';

import React, { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import useBoardStore from '@/store/useBoardStore';
import { useUndoShortcut } from '@/hooks/useUndoShortcut';
import { Board } from '@/components/Board';
import { FilterBar } from '@/components/FilterBar';

export default function Home() {
  useUndoShortcut();

  const { undo, redo } = useBoardStore.temporal.getState();
  const { filter } = useBoardStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Kanban Board
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks with drag-and-drop and powerful filters
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters */}
          <aside className="lg:col-span-1">
            <div className="space-y-4 sticky top-4">
              <FilterBar />

              {/* Undo/Redo Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  History
                </p>
                <button
                  onClick={() => undo()}
                  className="w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Undo (Ctrl+Z)
                </button>
                <button
                  onClick={() => redo()}
                  className="w-full px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  Redo (Ctrl+Shift+Z)
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold text-blue-900 dark:text-blue-100 uppercase">
                  Tip
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-200">
                  Drag cards between columns or reorder within a column. Filtered tasks appear faded.
                </p>
              </div>
            </div>
          </aside>

          {/* Board */}
          <div className="lg:col-span-3">
            <Board />
          </div>
        </div>
      </main>
    </div>
  );
}
