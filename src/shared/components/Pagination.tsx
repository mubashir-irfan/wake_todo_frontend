'use client';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className='cursor-pointer'
      >
        <FaChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className='cursor-pointer'
      >
        <FaChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
};

export default Pagination;