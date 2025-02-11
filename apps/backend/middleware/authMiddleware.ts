import { Request, Response, NextFunction } from 'express'
import admin from 'firebase-admin'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies.token || req.headers.authorization || req.body.token

    if (!token) {
      res
        .status(401)
        .json({ message: 'Unauthorized. No authorization header found.' })

      return
    }

    console.log(
      'Successfully retrieved authorization header:',
      token.slice(0, 5)
    )

    await admin.auth().verifyIdToken(token)

    next()
  } catch (error) {
    console.error(
      'An unexpected error occurred while checking authentication:',
      error
    )

    res.status(500).json({
      message: 'An unexpected error occurred while checking authentication',
      error,
    })

    return
  }
}
