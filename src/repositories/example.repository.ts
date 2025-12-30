import { ParsedQs } from 'qs'

import { AppDataSource } from '@/config/datasource'
import { Example } from '@/entities/example.entity'
import { ListExamplesResponse } from '@/types/example'
import { toPaginateResponse } from '@/helpers/response'

export const ExampleRepository = AppDataSource.getRepository(Example).extend({
  async findAll(pageQuery?: ParsedQs): ListExamplesResponse {
    const { take, skip } = pageQuery || {}

    const data = await this.findAndCount({
      take: take ? Number(take) : 1000,
      skip: skip ? Number(skip) : 0,
      order: { createdAt: 'DESC' },
    })

    return toPaginateResponse(data, 'examples', pageQuery as ParsedQs)

    // return {
    //   examples,
    //   page: {
    //     totalExamples,
    //     totalPages: take ? Math.ceil(totalExamples / Number(take)) : 1,
    //     currentPage: skip ? Number(skip) + 1 : 1,
    //     perPage: take ? Number(take) : 1000,
    //   },
    // }
  },

  async getById(id: string): Promise<Example | null> {
    return await this.findOneBy({ id })
  },

  async findByName(name: string): Promise<Example | null> {
    return await this.findOne({ where: { name } })
  },

  async createExample(payload: Example): Promise<void> {
    await this.save(payload)
  },
})
