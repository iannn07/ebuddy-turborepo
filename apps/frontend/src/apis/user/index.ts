'use server'

import { getAuthCookies } from '@/utils/getAuthCookies'
import { redirect } from 'next/navigation'
import { ebuddyBEClient } from '../api'
import { USER } from '@/types/user'

/**
 * * Helper function to fetch user data from the backend
 * @param id
 * @returns
 */
async function getEbuddyUser(id?: string) {
  try {
    const currentUserToken = await getAuthCookies()

    if (!currentUserToken) redirect('/auth/login')

    const response = await ebuddyBEClient.get(
      id ? `/fetch-user-data/${id}` : 'fetch-all-user-data',
      {
        data: {
          token: currentUserToken.value,
        },
      }
    )

    if (response.status !== 200) {
      console.log('Failed to fetch user data')

      return { data: null, error: response }
    }

    return { data: response.data.data, error: null }
  } catch (error) {
    console.error('An error occurred while fetching user:', error)

    return { data: null, error }
  }
}

/**
 * * Fetch all users from the backend
 * @returns
 */
export const getAllEbuddyUsers = async () => {
  return getEbuddyUser()
}

/**
 * * Fetch a single user from the backend
 * @param id
 * @returns
 */
export const getSingleEbuddyUser = async (id: string) => {
  return getEbuddyUser(id)
}

/**
 * * Update user data in the backend
 * @param id
 * @param data
 * @returns
 */
export async function updateEbuddyUser(id: string, data: USER) {
  try {
    const currentUserToken = await getAuthCookies()

    if (!currentUserToken) redirect('/auth/login')

    const response = await ebuddyBEClient.post(`/update-user-data/${id}`, {
      token: currentUserToken.value,
      data,
    })

    if (response.status !== 200) {
      console.log('Failed to update user data')

      return { success: false, error: response }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('An error occurred while updating user:', error)

    return { success: false, error }
  }
}
