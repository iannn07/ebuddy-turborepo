import { db } from '../config/firebaseConfig'
import { USER } from '../entities/user'

const USERS_COLLECTION = 'users_collection'

/**
 * * Fetch all users in the users_collection collection in default Firestore database
 * @returns
 */
export const fetchAllUsersData = async () => {
  try {
    const usersCollection = await db.collection('users_collection').get()

    if (usersCollection.empty) {
      console.error('No users found')

      return { data: null, error: 'No users found' }
    }

    const mappedData: USER[] = usersCollection.docs.map((doc) => {
      return { id: doc.id, ...doc.data() } as USER
    })

    return {
      data: mappedData,
      error: null,
    }
  } catch (error) {
    console.error(
      'An unexpected error occurred while fetching user data:',
      error
    )

    return { data: null, error }
  }
}

/**
 * * Fetch single user in the users_collection collection in default Firestore database
 * @param id
 * @returns
 */
export const fetchUserData = async (id: string) => {
  try {
    const userDocument = await db.collection(USERS_COLLECTION).doc(id).get()

    if (!userDocument.exists) {
      console.error('User not found')

      return { data: null, error: 'User not found' }
    }

    const mappedData = { id: userDocument.id, ...userDocument.data() } as USER

    return { data: mappedData, error: null }
  } catch (error) {
    console.error(
      'An unexpected error occurred while fetching user data:',
      error
    )

    return { data: null, error }
  }
}

/**
 * * Update user data in the users_collection collection in default Firestore database
 * @param id
 * @param userData
 * @returns
 */
export const updateUserData = async (id: string, userData: Partial<USER>) => {
  try {
    const userDocument = db
      .collection(USERS_COLLECTION)
      .doc(id)
      .set(userData, { merge: true })

    if (!userDocument) {
      console.error('User not found')

      return { success: true, error: 'User not found' }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error(
      'An unexpected error occurred while updating user data:',
      error
    )

    return { success: false, error }
  }
}
