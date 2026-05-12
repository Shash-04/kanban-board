'use client';

import dynamic from "next/dynamic";

import React, { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import useBoardStore from '@/store/useBoardStore';
import { useUndoShortcut } from '@/hooks/useUndoShortcut';
import { FilterBar } from '@/components/FilterBar';


const Board = dynamic(() => import('@/components/Board').then(mod => mod.Board), {
  ssr: false,
});

export default function Home() {
  useUndoShortcut();

  const { undo, redo } = useBoardStore.temporal.getState();
  const { filter } = useBoardStore();

  return (
    <div className="min-h-screen bg-[#f4f5f7] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-[#0052CC] dark:bg-[#1e293b] sticky top-0 z-10 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Kanban Board
            </h1>
            <p className="text-[15px] font-medium text-blue-100 dark:text-gray-300 mt-1">
              Manage your project tasks and workflow
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with filters */}
          <aside className="lg:col-span-1">
            <div className="space-y-4 sticky top-4">
              <FilterBar />

              {/* Undo/Redo Controls */}
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-5 space-y-3 shadow-sm">
                <p className="text-[15px] font-semibold text-slate-800 dark:text-slate-200">
                  History
                </p>
                <button
                  onClick={() => undo()}
                  className="w-full px-4 py-2.5 text-[14px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-[#0052CC] hover:text-white dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Undo (Ctrl+Z)
                </button>
                <button
                  onClick={() => redo()}
                  className="w-full px-4 py-2.5 text-[14px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-[#0052CC] hover:text-white dark:hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} />
                  Redo (Ctrl+Shift+Z)
                </button>
              </div>

              {/* Info */}
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-5 space-y-2 shadow-sm">
                <p className="text-[15px] font-semibold text-[#0052CC] dark:text-blue-300">
                  Tip
                </p>
                <p className="text-[14px] text-blue-900 dark:text-blue-100 leading-relaxed">
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
