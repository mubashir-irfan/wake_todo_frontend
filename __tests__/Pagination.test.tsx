import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/shared/components/Pagination';
import { NextIntlClientProvider } from 'next-intl';
import '@testing-library/jest-dom';

const messages = {
  misc: {
    previous: 'Previous',
    next: 'Next',
  },
};

describe('Pagination Component', () => {
  const onPageChange = jest.fn();
  const defaultProps = {
    onPageChange,
    totalPages: 5,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderPagination = (props = { currentPage: -1 }) =>
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Pagination {...defaultProps} {...props} />
      </NextIntlClientProvider>
    );

  test('should display the correct page numbers and pagination buttons', () => {
    renderPagination({ currentPage: 2 });

    // Check if the page numbers are rendered
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByTestId(`page-${i}`)).toBeInTheDocument();
    }

    // Check if the previous button is clickable
    const prevButton = screen.getByTestId('prev-button');
    expect(prevButton).toBeInTheDocument();
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(1);

    // Check if the next button is clickable
    const nextButton = screen.getByTestId('next-button');
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('should disable previous button on the first page', () => {
    renderPagination({ currentPage: 1 });

    const prevButton = screen.getByTestId('prev-button-disabled');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });

  test('should disable next button on the last page', () => {
    renderPagination({ currentPage: 5 });

    const nextButton = screen.getByTestId('next-button-disabled');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
