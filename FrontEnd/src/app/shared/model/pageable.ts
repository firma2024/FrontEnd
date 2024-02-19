export interface Pageable<T> {
    data: T[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  }