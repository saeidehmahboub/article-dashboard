export interface PaginationDto<T> {
  totalPages: number;
  result: T[];
}
