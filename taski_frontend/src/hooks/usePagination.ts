import { useState, useCallback } from "react";

interface UsePaginationOptions {
  initialSortBy?: string;
  initialSortDirection?: "asc" | "desc";
}

export const usePagination = (options: UsePaginationOptions = {}) => {
  const { initialSortBy = "createdAt", initialSortDirection = "desc" } =
    options;

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<string>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(
    initialSortDirection
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSortChange = useCallback(
    (newSortBy: string, newSortDirection: "asc" | "desc") => {
      setSortBy(newSortBy);
      setSortDirection(newSortDirection);
      setPage(0);
    },
    []
  );

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
    setPage(0);
  }, []);

  const nextPage = useCallback((totalPages: number) => {
    setPage((p) => Math.min(totalPages - 1, p + 1));
  }, []);

  const prevPage = useCallback(() => {
    setPage((p) => Math.max(0, p - 1));
  }, []);

  return {
    page,
    setPage,
    sortBy,
    sortDirection,
    searchQuery,
    handleSortChange,
    handleSearchChange,
    nextPage,
    prevPage,
  };
};
