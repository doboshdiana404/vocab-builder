export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  export interface PaginatedResponse<T> {
    results: T[];
    totalPages: number;
    totalCount?: number;
  }