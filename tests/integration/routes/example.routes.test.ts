import request from 'supertest'
import express from 'express'
import exampleRoutes from '@/routes/example.route'

const app = express()
app.use(express.json())
app.use('/api/examples', exampleRoutes)

describe('Example Routes', () => {
  describe('GET /api/examples', () => {
    it('should return 200 and array of examples', async () => {
      const response = await request(app).get('/api/examples').expect(200)

      expect(response.body.success).toBe(true)
      expect(Array.isArray(response.body.data)).toBe(true)
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
