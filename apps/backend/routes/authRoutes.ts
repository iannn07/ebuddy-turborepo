import { Request, Response, Router } from 'express'
import admin from 'firebase-admin'

const router = Router()

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { token } = req.body

    if (!token) {
      res.status(401).json({ message: 'Unauthorized. No token found.' })

      return
    }

    const decodedToken = await admin.auth().verifyIdToken(token)

    res.status(200).json({
      message: 'Login successful',
      token: token,
      uid: decodedToken.uid,
    })
  } catch (error) {
    console.error('An unexpected error occurred while logging in:', error)

    res.status(500).json({
      message: 'An unexpected error occurred while logging in',
      error,
    })
  }
})

export default router
