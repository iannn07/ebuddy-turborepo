'use client'

import { auth } from '@/app/_firebase/config'
import { USER } from '@/types/user'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import UserCardComponent from './UserCardComponent'

interface HomeComponentProps {
  allUsers: USER[] | null
}

async function logout() {
  document.cookie =
    'fb-principal-iris-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  await signOut(auth)
}

function HomeComponent({ allUsers }: HomeComponentProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/auth/login')
  }

  return (
    <Container className='flex flex-col items-center justify-center min-h-screen py-10 gap-10'>
      <Card className='p-5 w-full max-w-5xl rounded-xl h-full'>
        <CardHeader
          title='User List'
          subheader='List of all users. Click on a user to edit their details'
        />
        <CardContent className='flex flex-col md:grid md:grid-cols-2 gap-5 w-full'>
          {allUsers ? (
            allUsers.map((user) => (
              <UserCardComponent key={user.id} user={user} />
            ))
          ) : (
            <Typography variant='h1'>No users found</Typography>
          )}
        </CardContent>
      </Card>

      <Button variant='outlined' color='error' onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default HomeComponent
