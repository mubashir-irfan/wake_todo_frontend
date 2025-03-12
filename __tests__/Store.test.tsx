import useStore from '@/store/useStore';
import '@testing-library/jest-dom';

const mockCounts = { uncompleted: 5, completed: 3, deleted: 1 };

jest.mock('@/services/TasksService', () => ({
  getTaskCounts: () => mockCounts,
}));

describe('useStore', () => {
  it('should have initial state', () => {
    const {
      uncompleted,
      completed,
      deleted,
      selectedTask,
      fetchedAt,
      updatedAt,
    } = useStore.getState();

    expect(uncompleted).toBe(0);
    expect(completed).toBe(0);
    expect(deleted).toBe(0);
    expect(selectedTask).toBeNull();
    expect(fetchedAt).toBe('');
    expect(updatedAt).toBe('');
  });

  it('should update fetchedAt', () => {
    const { setFetchedAt } = useStore.getState();
    const newDateTime = '2023-10-27T12:00:00Z';

    setFetchedAt(newDateTime);
    expect(useStore.getState().fetchedAt).toBe(newDateTime);
  });

  it('should update updatedAt', () => {
    const { setUpdatedAt } = useStore.getState();
    const newDateTime = '2023-10-27T13:00:00Z';

    setUpdatedAt(newDateTime);
    expect(useStore.getState().updatedAt).toBe(newDateTime);
  });

  it('should update selectedTask', () => {
    const { setSelectedTask } = useStore.getState();
    const task = {
      id: 1,
      text: 'Test Task',
      completed: false,
      deleted: false,
      createdAt: '2023-10-27T13:00:00Z',
    };

    setSelectedTask(task);
    expect(useStore.getState().selectedTask).toEqual(task);
  });

  it('should fetch counts and update state', async () => {
    await useStore.getState().fetchCounts();
    const { uncompleted, completed, deleted } = useStore.getState();

    expect(uncompleted).toBe(5);
    expect(completed).toBe(3);
    expect(deleted).toBe(1);
  });
});
