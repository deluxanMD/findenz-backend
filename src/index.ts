import 'reflect-metadata'
import express, { Application } from 'express'
import dotenv from 'dotenv'

import { errorMiddleware } from '@/middlewares/error.middleware'
import { initializeDatabase } from '@/config/datasource'
import exampleRoutes from '@/routes/example.route'

dotenv.config({ debug: true })

const app: Application = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/examples', exampleRoutes)

// Error handling
app.use(errorMiddleware)

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDatabase()

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
