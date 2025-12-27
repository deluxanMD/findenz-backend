import express, { Application } from 'express'
import dotenv from 'dotenv'

import { errorMiddleware } from '@/middlewares/error.middleware'
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
