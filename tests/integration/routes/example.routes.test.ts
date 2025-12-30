import request from 'supertest'
import express from 'express'
import exampleRoutes from '@/routes/example.route'
import { exampleService } from '@/services/example.service'

const app = express()
app.use(express.json())
app.use('/api/examples', exampleRoutes)

describe('Example Routes', () => {
  describe.only('GET /api/examples', () => {
    it('should return 200 and array of examples', async () => {
      const mockedGetAll = exampleService.getAll as jest.Mock

      mockedGetAll([{ id: 1, name: 'Test' }])

      const response = await request(app).get('/api/examples').expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data[0].name).toBe('Test Example')
    })
  })

  describe('GET /api/examples/:id', () => {
    it('should return 200 and example object', async () => {
      const response = await request(app).get('/api/examples/1').expect(200)

      expect(response.body.success).toBe(true)
      expect(response.body.data).toHaveProperty('id')
      expect(response.body.data).toHaveProperty('name')
    })
  })
})
