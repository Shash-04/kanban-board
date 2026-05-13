# Jira-Style Kanban Board
# TASK FORGE

A professional, feature-rich Kanban board application built with Next.js, featuring advanced drag-and-drop, state persistence, and a premium Jira-inspired interface.

## 🚀 Features

- **Advanced Drag & Drop**: Seamlessly move tasks between columns or reorder them within a column using `@dnd-kit`.
- **State Management & Persistence**: Powered by **Zustand** with local storage persistence.
- **Undo/Redo Functionality**: Integrated **Zundo** middleware allowing users to revert and redo changes effortlessly.
- **Fractional Indexing**: Efficient task reordering system using numerical orders to avoid bulk updates.
- **Priority & Status Tracking**: Visual cues for task priorities (Low, Medium, High) and clear status columns.
- **Filtering System**: Filter tasks by priority or assignee to stay focused.
- **Responsive & Premium UI**: A sleek, blue-themed design inspired by professional PM tools, built with Tailwind CSS and Radix UI.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **History Management**: [Zundo](https://github.com/charkour/zundo)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Icons)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Shadcn UI)
- **Validation**: [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)

## 🧠 The Approach

### 1. State Management with Zustand & Zundo
The application's core logic is centralized in a global store using Zustand. This allows for clean, reactive updates across components without prop-drilling. By adding Zundo, we gain "Undo/Redo" capabilities out of the box by tracking state snapshots, which is critical for complex interfaces like Kanban boards.

### 2. Efficient Reordering (Fractional Indexing)
Instead of using array indices (which require updating every item's index when one moves), this project uses **fractional indexing**. Each task has an `order` property (a number). When a task is moved between two others, it's assigned a value midway between them. This keeps database/store updates minimal and performant.

### 3. Accessible Drag and Drop
`@dnd-kit` was chosen over other libraries for its modularity and first-class support for keyboard navigation and screen readers, ensuring the board remains accessible to all users.

### 4. Component-Driven UI
The UI is built using a consistent design system based on Shadcn UI. This ensures a professional "Jira" feel with consistent spacing, typography, and interactive states (hover, focus, active).

## 📥 Getting Started

### Prerequisites
- Node.js 18+ 
- npm / pnpm / yarn

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Board, TaskCard, Column, etc.).
- `/store`: Zustand store definitions and logic.
- `/types`: TypeScript interfaces and types.
- `/hooks`: Custom React hooks for board logic.
- `/lib`: Utility functions (fractional ordering logic, clsx, etc.).
