'use server'

import { updateEbuddyUser } from '@/apis/user'
import { USER } from '@/types/user'
import { revalidatePath } from 'next/cache'

export async function updateUserAction(data: USER) {
  try {
    const { success, error } = await updateEbuddyUser(data.id, data)

    if (!success || error) {
      console.log('Failed to update user data')

      return { success: false, error }
    }

    revalidatePath('/home')

    return { success: true, error }
  } catch (error) {
    console.error('An error occurred while updating user:', error)

    return { success: false, error }
  }
}
