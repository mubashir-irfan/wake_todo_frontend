import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSwitcher from '@/shared/components/ThemeSwitcher';
import { useTheme } from '@/hooks';
import '@testing-library/jest-dom';

// Mock the useTheme hook
jest.mock('@/hooks', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSwitcher Component', () => {
  it('renders the dark mode icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });
    render(<ThemeSwitcher />);
    expect(screen.getByLabelText('Switch to dark mode')).toBeInTheDocument();
  });

  it('renders the light mode icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });
    render(<ThemeSwitcher />);
    expect(screen.getByLabelText('Switch to light mode')).toBeInTheDocument();
  });

  it('calls toggleTheme when button is clicked', () => {
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    render(<ThemeSwitcher />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label for light theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });
    render(<ThemeSwitcher />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to dark mode',
    );
  });

  it('has correct aria-label for dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });
    render(<ThemeSwitcher />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-label',
      'Switch to light mode',
    );
  });

  it('applies the correct classes', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });
    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toHaveClass('flex');
    expect(screen.getByRole('button')).toHaveClass('items-center');
    expect(screen.getByRole('button')).toHaveClass('justify-center');
    expect(screen.getByRole('button')).toHaveClass('p-2');
    expect(screen.getByRole('button')).toHaveClass('cursor-pointer');
    expect(screen.getByRole('button')).toHaveClass('rounded-full');
    expect(screen.getByRole('button')).toHaveClass('transition-colors');
    expect(screen.getByRole('button')).toHaveClass('duration-300');
    expect(screen.getByRole('button')).toHaveClass('hover:bg-gray-200');
    expect(screen.getByRole('button')).toHaveClass('text-text-dark');
    expect(screen.getByRole('button')).toHaveClass('dark:text-text-light');
  });
});
