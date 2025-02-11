import { cookies } from 'next/headers'

export async function getAuthCookies() {
  const currentUser = await cookies()
  const currentUserToken = currentUser.get('fb-principal-iris-token')

  return currentUserToken
}
