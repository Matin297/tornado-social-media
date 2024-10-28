"use client";

import {
  Pagination,
  PaginationLink,
  PaginationItem,
  PaginationNext,
  PaginationContent,
  PaginationEllipsis,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "./utils";
import { useSearchParams, usePathname } from "next/navigation";

interface ListPaginationProps {
  totalPages: number;
}

export default function ListPagination({ totalPages }: ListPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  function generatePageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={generatePageURL(currentPage - 1)} />
          </PaginationItem>
        )}
        {generatePagination(currentPage, totalPages).map((page, index) => {
          if (typeof page === "string") {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                isActive={currentPage === page}
                href={generatePageURL(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext href={generatePageURL(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
