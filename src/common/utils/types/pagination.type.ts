export type Pagination = {
  size: number;
  page: number;
};

export type PaginationResponse<T> = {
  rows: T[];
  total: number;
};
