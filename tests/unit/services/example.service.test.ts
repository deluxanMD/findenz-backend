import { Example } from '@/entities/example.entity'
import { ExampleRepository } from '@/repositories/example.repository'
import { exampleService } from '@/services/example.service'
import { PaginateResponse } from '@/types'
import { GetExampleResponse, ListExamplesResponse } from '@/types/example'

describe('Example Service', () => {
  describe('getAll', () => {
    beforeEach(() => {
      const mockExamples: PaginateResponse<Example, 'examples'> = {
        examples: [
          {
            id: '1',
            name: 'Example 1',
            description: 'Description 1',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '2',
            name: 'Example 2',
            description: 'Description 1',
            tags: ['tag1', 'tag2'],
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        page: {
          totalExamples: 2,
          totalPages: 1,
          currentPage: 1,
          perPage: 10,
        },
      }
      jest
        .spyOn(ExampleRepository, 'findAll')
        .mockResolvedValue(mockExamples as unknown as ListExamplesResponse)
    })

    it('should return an array of examples', async () => {
      const result = await exampleService.getAll()

      expect(result).toBeDefined()
      expect(result.examples.length).toBeGreaterThan(0)
    })

    it('should return examples with correct structure', async () => {
      const result = await exampleService.getAll()
      const example = result.examples[0]

      expect(example).toHaveProperty('id')
      expect(example).toHaveProperty('name')
      expect(example).toHaveProperty('createdAt')
      expect(example.createdAt).toBeInstanceOf(Date)
    })
  })

  describe.only('getById', () => {
    beforeEach(() => {
      const mockExample = {
        id: '123',
        name: 'Example 1',
        description: 'aslkdjldjlsdjlj skldjlsdkjlksj',
        tags: null,
        createdAt: '2025-12-29T16:24:55.955Z',
        updatedAt: '2025-12-29T16:24:55.955Z',
      }
      jest
        .spyOn(ExampleRepository, 'findById')
        .mockResolvedValue(mockExample as unknown as GetExampleResponse)
    })

    it('should return an example with the given id', async () => {
      const testId = '123'
      const result = await exampleService.getById(testId)

      expect(result).toBeDefined()
      expect(result?.id).toBe(testId)
    })

    it('should return an example with correct structure', async () => {
      const result = await exampleService.getById('1')

      expect(result).toHaveProperty('id')
      expect(result).toHaveProperty('name')
      expect(result).toHaveProperty('createdAt')
    })
  })
})
