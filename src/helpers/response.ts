import { PageQuery, PaginateResponse } from '@/types'

export const toPaginateResponse = <T, K extends string>(
  data: [T[], number],
  key: K,
  query: Partial<PageQuery>,
): PaginateResponse<T, K> => {
  const [items, total] = data

  const take = query?.take ? Number(query.take) : 1000
  const skip = query?.skip ? Number(query.skip) : 0

  const capitalizedKey = (key.charAt(0).toUpperCase() + key.slice(1)) as Capitalize<K>
  const totalKey = `total${capitalizedKey}` as const

  return {
    [key]: items,
    page: {
      [totalKey]: total,
      totalPages: Math.ceil(total / take),
      currentPage: skip + 1,
      perPage: take,
    },
  } as unknown as PaginateResponse<T, K>
}
