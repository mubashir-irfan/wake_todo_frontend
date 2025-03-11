// src/stores/useTodoStatsStore.ts
import { TasksService } from '@/services';
import { create } from 'zustand';

interface StoreState {
  uncompleted: number;
  completed: number;
  deleted: number;

  fetchCounts: () => Promise<void>
}

const useStore = create<StoreState>((set) => ({
  uncompleted: 0,
  completed: 999,
  deleted: 0,

  incrementUncompleted: () => set((state) => ({ uncompleted: state.uncompleted + 1 })),
  incrementCompleted: () => set((state) => ({ completed: state.completed + 1 })),
  incrementDeleted: () => set((state) => ({ deleted: state.deleted + 1 })),

  decrementUncompleted: () => set((state) => ({ uncompleted: Math.max(0, state.uncompleted - 1) })),
  decrementCompleted: () => set((state) => ({ completed: Math.max(0, state.completed - 1) })),
  decrementDeleted: () => set((state) => ({ deleted: Math.max(0, state.deleted - 1) })),

  fetchCounts: async () => {
    try {
      const counts = await TasksService.getTaskCounts();
      console.log('zustand store, fetchCounts', counts)
      set({ ...counts });
    } catch (error) {
      console.error('Error fetching counts:', error);
    }
  },
}));

export default useStore;