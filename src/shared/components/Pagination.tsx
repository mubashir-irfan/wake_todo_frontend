'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const t = useTranslations('misc');


  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageOfText = t('pageOf', {
    currentPage: currentPage,
    totalPages: totalPages,
  });

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="h-4 w-4" />
        <span className="sr-only">{t('previous')}</span>
      </Button>

      <span className="text-sm font-medium">
        {pageOfText}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <FaChevronRight className="h-4 w-4" />
        <span className="sr-only">{t('next')}</span>
      </Button>
    </div>
  );
};

export default Pagination;