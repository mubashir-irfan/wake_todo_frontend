import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '@/shared/components/Icon';
import '@testing-library/jest-dom'

describe('Icon component', () => {
  it('should render the passed icon', () => {
    const icon = <svg data-testid="test-icon"><circle cx="10" cy="10" r="5" /></svg>;

    render(<Icon icon={icon} />);

    // Check if the passed icon is rendered in the document
    const renderedIcon = screen.getByTestId('test-icon');
    expect(renderedIcon).toBeInTheDocument();
  });


  it('should apply the default className', () => {
    const icon = <svg data-testid="test-icon"><circle cx="10" cy="10" r="5" /></svg>;

    render(<Icon icon={icon} />);

    // Check if the default className is applied
    const iconElement = screen.getByTestId('test-icon').parentElement;
    expect(iconElement).toHaveClass('text-text-dark dark:text-text-light');
  });

  it('should apply a custom className if provided', () => {
    const icon = <svg data-testid="test-icon"><circle cx="10" cy="10" r="5" /></svg>;
    const customClass = 'text-red-500';

    render(<Icon icon={icon} className={customClass} />);

    // Check if the custom className is applied
    const iconElement = screen.getByTestId('test-icon').parentElement;
    expect(iconElement).toHaveClass(customClass);
  });

  it('renders with aria-hidden="true"', () => {
    const mockIcon = <svg />;
    render(<Icon icon={mockIcon} />);
    expect(screen.getByTestId('icon-wrapper')).toHaveAttribute('aria-hidden', 'true');
  });
});