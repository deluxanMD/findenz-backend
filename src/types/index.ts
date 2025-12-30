export type PaginatedData<K extends string> = {
  [P in `total${Capitalize<K>}`]: number
} & {
  totalPages: number
  currentPage: number
  perPage: number
}

export type PaginateResponse<T, K extends string> = {
  [P in K]: T[]
} & {
  page: PaginatedData<K>
  message?: string
}

export type PageQuery = {
  take: string
  skip: string
}
