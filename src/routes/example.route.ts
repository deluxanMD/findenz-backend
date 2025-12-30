import { Router } from 'express'
import { exampleController } from '@/controllers/example.controller'
import validateRequest from '@/helpers/validator'
import { exampleSchema } from '@/schemas/example.schema'

const router = Router()

router.get('/', exampleController.getAll)
router.get('/:id', exampleController.getById)
router.post('/', validateRequest(exampleSchema), exampleController.create)

export default router
