import { Request, Response } from 'express'
import { USER } from '../entities/user'
import {
  fetchAllUsersData,
  fetchUserData,
  updateUserData,
} from '../repository/userCollection'

/**
 * * Helper function to fetch all users for the API
 * @param req
 * @param res
 * @returns
 */
export const fetchAllUsers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await fetchAllUsersData()

    if (error) {
      console.error('No users found:', error)

      res.status(404).json({ message: 'No users found', error })

      return
    }

    res.status(200).json({ message: 'Success', data })

    return
  } catch (error) {
    console.error(
      'An unexpected error occurred while fetching all user data:',
      error
    )

    res.status(500).json({
      message: 'An unexpected error occurred while fetching all user data',
      error,
    })

    return
  }
}

/**
 * * Helper function to fetch single user data for the API
 * @param req
 * @param res
 * @returns
 */
export const fetchUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { data, error } = await fetchUserData(id)

    if (error) {
      console.error('User not found:', error)

      res.status(404).json({ message: 'User not found', error })

      return
    }

    res.status(200).json({ message: 'Success', data })

    return
  } catch (error) {
    console.error(
      'An unexpected error occurred while fetching user data:',
      error
    )

    res.status(500).json({
      message: 'An unexpected error occurred while fetching user data',
      error,
    })

    return
  }
}

/**
 * * Helper function to update user data for the API
 * @param req
 * @param res
 * @returns
 */
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // The Object Keys are always have at least 1 key (token)
    if (!req.body || Object.keys(req.body).length < 1) {
      console.error('No data provided to update user')

      res.status(400).json({ message: 'No data provided to update user' })

      return
    }

    const {
      id: bodyID,
      email,
      username,
      balance,
      purchases,
      sector,
    } = req.body.data

    if (
      typeof bodyID !== 'string' ||
      typeof email !== 'string' ||
      typeof username !== 'string' ||
      typeof balance !== 'number' ||
      typeof purchases !== 'number' ||
      !Array.isArray(sector)
    ) {
      console.error('Invalid data provided to update user')

      res.status(400).json({ message: 'Invalid data provided to update user' })

      return
    }

    const user: USER = {
      id: bodyID,
      email,
      username,
      balance,
      purchases,
      sector,
    }

    const { success, error } = await updateUserData(id, user)

    if (error || !success) {
      console.error('User not found:', error)

      res.status(404).json({ message: 'User not found', error })

      return
    }

    res.status(200).json({ message: 'User data updated successfully' })

    return
  } catch (error) {
    console.error(
      'An unexpected error occurred while updating user data:',
      error
    )

    res.status(500).json({
      message: 'An unexpected error occurred while updating user data',
      error,
    })

    return
  }
}
