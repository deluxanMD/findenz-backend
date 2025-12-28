import { Router } from 'express'
import { exampleController } from '../controllers/example.controller'
import validateRequest from '@/helpers/validator'
import { exampleSchema } from '@/schemas/example.schema'
import { ValidationSource } from '@/types/validator'

const router = Router()

router.get('/', exampleController.getAll)
router.get(
  '/:id',
  validateRequest(exampleSchema, ValidationSource.PARAMS),
  exampleController.getById,
)

export default router
