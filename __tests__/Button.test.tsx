import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Button from '@/shared/components/Button';

describe('Button component', () => {
  it('should render the button with the correct text', () => {
    render(<Button>Click Me</Button>);

    // Check if the button text is rendered correctly
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click Me');
  });

  it('should render the button with the correct icon', () => {
    const icon = <span data-testid="icon">🔥</span>;

    render(<Button icon={icon}>Button with Icon</Button>);

    // Check if the icon is rendered
    const button = screen.getByRole('button');
    expect(button).toContainElement(screen.getByTestId('icon'));
  });

  it('should apply primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-bg-control-primary');
    expect(button).toHaveClass('text-text-control-primary');
  });

  it('should apply secondary variant styles when specified', () => {
    render(<Button variant="secondary">Secondary Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-bg-control-secondary');
    expect(button).toHaveClass('text-text-control-secondary');
  });

  it('should apply disabled variant styles when specified', () => {
    render(<Button variant="disabled">Disabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-400');
    expect(button).toHaveClass('text-gray-600');
    expect(button).toHaveClass('opacity-50');
    expect(button).toBeDisabled();
  });

  it('should call the onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render the button with additional custom className', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('should be enabled when variant is not "disabled"', () => {
    render(<Button variant="primary">Enabled Button</Button>);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
  });

  it('should render the button without icon if no icon is provided', () => {
    render(<Button>No Icon Button</Button>);

    const icon = screen.queryByTestId('icon');
    expect(icon).toBeNull(); // No icon should be rendered
  });
});
