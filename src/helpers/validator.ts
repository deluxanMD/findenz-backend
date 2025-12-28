import { ZodError, ZodType } from 'zod'
import { Request, Response, NextFunction } from 'express'

import { ValidationSource } from '@/types/validator'

const validateRequest = (schema: ZodType, source: ValidationSource = ValidationSource.BODY) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = schema.parse(req[source])
      Object.assign(req[source], data)
      next()
      next()
    } catch (err) {
      if (err instanceof ZodError) {
        const message = err.issues.map((issue) => issue.message).join(', ')
        return next(new Error(message))
      }
    }
  }
}

export default validateRequest
