import LocaleSwitcherSelect from '@/shared/components/LocaleSwitcherSelect';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useTransition } from 'react';

// Mocking the necessary modules
jest.mock('@/services/locale', () => ({
  setUserLocale: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: jest.fn(),
}));

describe('LocaleSwitcherSelect', () => {
  const items = [
    { value: 'en', label: 'English' },
    { value: 'ar', label: 'العربية' },
  ];

  beforeEach(() => {
    // Resetting the mocks before each test
    jest.clearAllMocks();
  });

  test('disables the select input while a transition is pending', async () => {
    // Simulate a pending transition
    (useTransition as jest.Mock).mockReturnValue([true, jest.fn()]);

    render(
      <LocaleSwitcherSelect
        defaultValue="en"
        items={items}
        label="Select Language"
      />,
    );

    const selectElement = screen.getByLabelText('Select Language');

    // Check if the select input is disabled
    expect(selectElement).toBeDisabled();
  });

  test('does not disable the select input when there is no pending transition', async () => {
    // Simulate no pending transition
    (useTransition as jest.Mock).mockReturnValue([false, jest.fn()]);

    render(
      <LocaleSwitcherSelect
        defaultValue="en"
        items={items}
        label="Select Language"
      />,
    );

    const selectElement = screen.getByLabelText('Select Language');

    // Check if the select input is enabled
    expect(selectElement).not.toBeDisabled();
  });
});
