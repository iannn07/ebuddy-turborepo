import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import authRoutes from '../routes/authRoutes'
import userRoutes from '../routes/userRoutes'

dotenv.config()

export const app: Application = express()
const PORT = process.env.EXPRESS_PORT || 8080

app.use(express.json())
app.use(cookieParser())

// ! Service Health Check
app.get('/api', (req: Request, res: Response) => {
  res.statusMessage = 'Running'
  res.status(200).json({
    message: 'Server is running',
    status: res.statusCode,
    statusMessage: res.statusMessage,
  })
})

// * API Routes
app.use('/api', userRoutes)
app.use('/api', authRoutes)

// * Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`http://localhost:${PORT}`)
})
