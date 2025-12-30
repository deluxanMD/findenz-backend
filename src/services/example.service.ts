import { Example } from '@/entities/example.entity'
import { ExampleRepository } from '@/repositories/example.repository'
import { PageQuery, PaginateResponse } from '@/types'

export const exampleService = {
  getAll: async (pageQuery: PageQuery): Promise<PaginateResponse<Example, 'examples'>> => {
    return ExampleRepository.findAll(pageQuery)
  },

  getById: async (id: string): Promise<Example | null> => {
    return ExampleRepository.getById(id)
  },

  create: async (payload: Example): Promise<void> => {
    return ExampleRepository.createExample(payload)
  },
}
