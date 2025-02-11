'use server'

import { getAllEbuddyUsers } from '@/apis/user'
import { USER } from '@/types/user'

export async function fetchUserAction() {
  try {
    const { data, error } = await getAllEbuddyUsers()

    if (!data || error) {
      console.log('Failed to fetch user data')

      return { data: null, error }
    }

    return { data: data as USER[], error }
  } catch (error) {
    console.error('An error occurred while fetching user:', error)

    return { data: null, error }
  }
}
