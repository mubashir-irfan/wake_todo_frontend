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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display the correct page numbers and pagination buttons', () => {
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
      </NextIntlClientProvider>
    );

    // Check if the page numbers are rendered
    expect(screen.getByTestId('page-1')).toBeInTheDocument();
    expect(screen.getByTestId('page-2')).toBeInTheDocument();
    expect(screen.getByTestId('page-3')).toBeInTheDocument();
    expect(screen.getByTestId('page-4')).toBeInTheDocument();
    expect(screen.getByTestId('page-5')).toBeInTheDocument();

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
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
      </NextIntlClientProvider>
    );

    const prevButton = screen.getByTestId('prev-button-disabled');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();
  });

  test('should disable next button on the last page', () => {
    render(
      <NextIntlClientProvider locale='en' messages={messages}>
        <Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />
      </NextIntlClientProvider>
    );

    const nextButton = screen.getByTestId('next-button-disabled');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
  });
});
