import Header from '@/shared/components/Header';
import useStore from '@/store/useStore';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

jest.mock('@/store/useStore');

// jest.mock('@/store/useStore', () => ({
//   getState: jest.fn().mockReturnValue({
//     fetchCounts: jest.fn(),
//   }),
// }));

const messages = {
  HomePage: {
    title: 'My Task List',
    incomplete: 'incomplete',
    completed: 'completed',
    deleted: 'deleted',
    addTask: 'Add Task',
  },
};

describe('Header Component', () => {
  const mockSetSelectedTask = jest.fn();
  const mockUseStore = useStore as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseStore.mockReturnValue({
      uncompleted: 3,
      deleted: 1,
      completed: 2,
      selectedTask: null,
      setSelectedTask: mockSetSelectedTask,
    });
  });

  const renderHeader = () =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Header />
      </NextIntlClientProvider>,
    );

  test('should render header with correct task counts and buttons', () => {
    renderHeader();

    expect(screen.getByTestId('count-badge-container')).toBeInTheDocument();
    expect(screen.getByText('Add Task')).toBeInTheDocument();
  });

  test('should handle task modal state change', async () => {
    mockUseStore.mockReturnValueOnce({
      uncompleted: 3,
      deleted: 1,
      completed: 2,
      selectedTask: { id: 1, title: 'Sample Task' },
      setSelectedTask: mockSetSelectedTask,
    });

    renderHeader();

    await waitFor(() => {
      const closeButton = screen.getByText('Close');
      expect(closeButton).toBeInTheDocument(); // Check that modal is in the document
    });
  });

  test('should close task modal on close action', () => {
    mockUseStore.mockReturnValueOnce({
      uncompleted: 3,
      deleted: 1,
      completed: 2,
      selectedTask: { id: 1, title: 'Sample Task' },
      setSelectedTask: mockSetSelectedTask,
    });

    renderHeader();

    // Simulate task modal close
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(mockSetSelectedTask).toHaveBeenCalledWith(null);
  });
});
