import { Request, Response, NextFunction } from 'express'
import { exampleService } from '../services/example.service'

export const exampleController = {
  getAll: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const examples = await exampleService.getAll()
      res.json({ success: true, data: examples })
    } catch (error) {
      next(error)
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const example = await exampleService.getById(id)
      res.json({ success: true, data: example })
    } catch (error) {
      next(error)
    }
  },
}
