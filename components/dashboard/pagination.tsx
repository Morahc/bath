"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn, createQueryString } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
};

export default function PagePagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Generate smart page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="overflow-clip px-2 w-full" style={{ overflowClipMargin: 1 }}>
      <Pagination>
        <PaginationContent className="text-xs">
          <PaginationItem>
            {isFirstPage ? (
              <span
                className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
                aria-label="Previous page (disabled)"
              >
                Previous
              </span>
            ) : (
              <PaginationPrevious
                href={`${baseUrl}?${createQueryString(searchParams, "page", currentPage - 1)}`}
                aria-label="Go to previous page"
              />
            )}
          </PaginationItem>

          {pageNumbers.map((page, idx) => (
            <PaginationItem key={`${page}-${idx}`}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  size="sm"
                  isActive={page === currentPage}
                  href={`${baseUrl}?${createQueryString(searchParams, "page", page as number)}`}
                  className="text-xs"
                  aria-label={
                    page === currentPage ? `Current page, page ${page}` : `Go to page ${page}`
                  }
                  aria-current={page === currentPage ? "page" : undefined}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            {isLastPage ? (
              <span
                className="inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-gray-400 cursor-not-allowed opacity-50"
                aria-label="Next page (disabled)"
              >
                Next
              </span>
            ) : (
              <PaginationNext
                href={`${baseUrl}?${createQueryString(searchParams, "page", currentPage + 1)}`}
                aria-label="Go to next page"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
