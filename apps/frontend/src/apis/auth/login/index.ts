'use server'

import { ebuddyBEClient } from '@/apis/api'
import { cookies } from 'next/headers'

export const validateToken = async (token: string) => {
  try {
    const response = await ebuddyBEClient.post('/auth/login', {
      token,
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true,
      },
    })

    if (response.status !== 200) {
      console.log('Token validation in EBuddy Backend failed')

      return {
        success: false,
        error: response.data.message,
      }
    }

    console.log('Token validated successfully')

    const cookieStore = await cookies()

    cookieStore.set('fb-principal-iris-token', response.data.token, {
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    })

    console.log('Token stored in cookie')

    return {
      success: true,
      data: response.data,
    }
  } catch (error) {
    console.error('An error occurred while validating token:', error)

    return {
      success: false,
      error,
    }
  }
}
