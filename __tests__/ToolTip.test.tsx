import React from 'react';
import { render, screen, fireEvent, waitFor, findByText } from '@testing-library/react';
import ToolTip from '@/shared/components/Tooltip';
import '@testing-library/jest-dom'


describe('ToolTip component', () => {
  it('should render children inside the tooltip trigger', () => {
    render(
      <ToolTip label="Tooltip label">
        <button>Hover me</button>
      </ToolTip>
    );

    // Ensure the button is rendered
    const button = screen.getByText(/hover me/i);
    expect(button).toBeInTheDocument();
  });

  it('tooltip is hidden by default', () => {
    render(
      <ToolTip label="Test Tooltip">
        <button>Trigger</button>
      </ToolTip>
    );
    expect(screen.queryByText('Test Tooltip')).toBe(null);
  });

});
