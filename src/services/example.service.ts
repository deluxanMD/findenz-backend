import { Example } from '@/entities/example.entity'
import { ExampleRepository } from '@/repositories/example.repository'
import { PageQuery, PaginateResponse } from '@/types'

export const exampleService = {
  getAll: async (pageQuery?: PageQuery): Promise<PaginateResponse<Example, 'examples'>> => {
    return await ExampleRepository.findAll(pageQuery)
  },

  getById: async (id: string): Promise<Example | null> => {
    return await ExampleRepository.findById(id)
  },

  create: async (payload: Example): Promise<void> => {
    return await ExampleRepository.createExample(payload)
  },
}
