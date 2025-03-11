import { TasksService } from '@/services';
import { Task } from '@/types';
import { create } from 'zustand';

interface StoreState {
  uncompleted: number;
  completed: number;
  deleted: number;
  selectedTask: Task | null;

  fetchCounts: () => Promise<void>;
  setSelectedTask: (selectedTask: Task | null) => void;
}

const useStore = create<StoreState>((set) => ({
  uncompleted: 0,
  completed: 0,
  deleted: 0,
  selectedTask: null,

  fetchCounts: async () => {
    try {
      const counts = await TasksService.getTaskCounts();
      set(counts);
    } catch (error) {
      console.error('Error fetching counts:', error);
      set({ uncompleted: 0, completed: 0, deleted: 0 });
    }
  },

  setSelectedTask: (selectedTask) => {
    set({ selectedTask });
  },
}));

export default useStore;
