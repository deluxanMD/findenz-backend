import { Request, Response, NextFunction } from 'express'

import { exampleService } from '@/services/example.service'
import { PageQuery, PaginateResponse } from '@/types'
import { Example } from '@/entities/example.entity'

export const exampleController = {
  getAll: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<PaginateResponse<Example[], 'examples'>>> => {
    try {
      const examples = await exampleService.getAll(req.query as PageQuery)
      return res.json({ success: true, data: examples })
    } catch (error) {
      next(error)
      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },

  getById: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<PaginateResponse<Example, 'examples'>>> => {
    try {
      const { id } = req.params
      const example = await exampleService.getById(id)
      return res.json({ success: true, data: example })
    } catch (error) {
      next(error)
      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const example = await exampleService.create(req.body)
      res.json({ success: true, data: example })
    } catch (error) {
      next(error)
    }
  },
}
