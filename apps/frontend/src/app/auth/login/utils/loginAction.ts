'use server'

import { validateToken } from '@/apis/auth/login'
import { auth } from '@/app/_firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

export async function loginAction(email: string, password: string) {
  try {
    const firebaseResponse = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (!firebaseResponse.user) {
      console.log('User not found')

      return {
        success: false,
        error: 'User not found',
      }
    }

    const idToken = await firebaseResponse.user.getIdToken()

    if (!idToken) {
      console.log('Token not found')

      return {
        success: false,
        error: 'Token not found',
      }
    }

    const tokenValidation = await validateToken(idToken)

    if (!tokenValidation.success) {
      console.log('Token validation failed')

      return {
        success: false,
        error: 'Token validation failed',
      }
    }

    return {
      success: true,
      error: null,
    }
  } catch (error) {
    console.error('An error occurred while logging in:', error)

    return {
      success: false,
      error: (error as { code: string }).code,
    }
  }
}
