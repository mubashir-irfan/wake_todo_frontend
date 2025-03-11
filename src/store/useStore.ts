// src/stores/useTodoStatsStore.ts
import { create } from 'zustand';

interface StoreState {
  uncompleted: number;
  completed: number;
  deleted: number;

  setUncompleted: (count: number) => void;
  setCompleted: (count: number) => void;
  setDeleted: (count: number) => void;

  incrementUncompleted: () => void;
  incrementCompleted: () => void;
  incrementDeleted: () => void;

  decrementUncompleted: () => void;
  decrementCompleted: () => void;
  decrementDeleted: () => void;
}

const useTodoStatsStore = create<StoreState>((set) => ({
  uncompleted: 0,
  completed: 0,
  deleted: 0,

  setUncompleted: (count) => set({ uncompleted: count }),
  setCompleted: (count) => set({ completed: count }),
  setDeleted: (count) => set({ deleted: count }),

  incrementUncompleted: () => set((state) => ({ uncompleted: state.uncompleted + 1 })),
  incrementCompleted: () => set((state) => ({ completed: state.completed + 1 })),
  incrementDeleted: () => set((state) => ({ deleted: state.deleted + 1 })),

  decrementUncompleted: () => set((state) => ({ uncompleted: Math.max(0, state.uncompleted - 1) })),
  decrementCompleted: () => set((state) => ({ completed: Math.max(0, state.completed - 1) })),
  decrementDeleted: () => set((state) => ({ deleted: Math.max(0, state.deleted - 1) })),
}));

export default useTodoStatsStore;