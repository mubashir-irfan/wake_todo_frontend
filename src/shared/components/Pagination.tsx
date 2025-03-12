'use client';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import React, { MouseEvent } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const t = useTranslations('misc');
  console.info('pagination', currentPage, totalPages);
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
      return pages;
    }

    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
      return pages;
    }

    if (currentPage >= totalPages - 3) {
      pages.push(
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
      return pages;
    }

    pages.push(
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    );
    return pages;
  };

  const handlePrevClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <ShadcnPagination>
      <PaginationContent>
        {currentPage === 1 ? (
          <Button variant="outline" disabled>
            {t('previous')}
          </Button>
        ) : (
          <PaginationPrevious href="#" onClick={handlePrevClick}>
            {t('previous')}
          </PaginationPrevious>
        )}

        {getPages().map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationLink>...</PaginationLink>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={currentPage === page}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(+page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage === totalPages ? (
          <Button variant="outline" disabled>
            {t('next')}
          </Button>
        ) : (
          <PaginationNext href="#" onClick={handleNextClick}>
            {t('next')}
          </PaginationNext>
        )}
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
