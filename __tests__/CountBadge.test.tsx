import CountBadge from '@/shared/components/CountBadge';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('CountBadge component', () => {
  it('should render the count correctly for values less than or equal to 9', () => {
    render(<CountBadge title="Messages" count={5} />);

    // Check if the count is rendered correctly
    const badge = screen.getByRole('img');
    expect(badge).toHaveTextContent('5');
  });

  it('should render "9+" when the count is greater than 9', () => {
    render(<CountBadge title="Notifications" count={15} />);

    // Check if the badge displays '9+' when count is greater than 9
    const badge = screen.getByRole('img');
    expect(badge).toHaveTextContent('9+');
  });

  it('should apply default bgColor and textColor', () => {
    render(<CountBadge title="Messages" count={5} />);

    // Check if the default classes for background and text color are applied
    const badge = screen.getByRole('img');
    expect(badge).toHaveClass('bg-accent-purple');
    expect(badge).toHaveClass('text-white');
  });

  it('should apply custom bgColor, textColor, and className when provided', () => {
    const customBgColor = 'bg-blue-500';
    const customTextColor = 'text-black';
    const customClassName = 'custom-class';

    render(
      <CountBadge
        title="Likes"
        count={3}
        bgColor={customBgColor}
        textColor={customTextColor}
        className={customClassName}
      />
    );

    // Check if the custom classes are applied
    const badge = screen.getByRole('img');
    expect(badge).toHaveClass(customBgColor);
    expect(badge).toHaveClass(customTextColor);
    expect(badge).toHaveClass(customClassName);
  });
});