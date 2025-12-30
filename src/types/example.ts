import { Example } from '@/entities/example.entity'
import { PaginateResponse } from '@/types'

export interface IExample {
  id: string
  name: string
  description: string
  tags: string[] | null
  createdAt: string
  updatedAt: string
}

export type ListExamplesResponse = Promise<PaginateResponse<Example, 'examples'>>

export type GetExampleResponse = Promise<Example | null>
