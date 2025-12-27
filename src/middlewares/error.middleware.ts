import { Request, Response, NextFunction } from 'express'

export const errorMiddleware = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
  next()
}
