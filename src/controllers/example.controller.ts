import { Request, Response, NextFunction } from 'express'
import { exampleService } from '@/services/example.service'
// import { exampleSchema } from '@/schemas/example.schema'

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
    // const parseResult = exampleSchema.safeParse(req.params)

    // if (!parseResult.success) {
    //   res.status(400).json({ success: false, error: JSON.parse(parseResult.error.message) })
    //   return
    // }

    try {
      const { id } = req.params
      const example = await exampleService.getById(id)
      res.json({ success: true, data: example })
    } catch (error) {
      next(error)
    }
  },
}
