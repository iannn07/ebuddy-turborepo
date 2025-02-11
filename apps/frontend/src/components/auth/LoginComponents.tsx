import { Card, CardContent, Container } from '@mui/material'
import LoginForm from './LoginForm'
import LoginHeader from './LoginHeader'

function LoginComponents() {
  return (
    <Container className='flex items-center justify-center min-h-screen'>
      <Card className='p-5 w-full max-w-2xl'>
        <CardContent className='flex flex-col gap-5 w-full'>
          <LoginHeader />
          <LoginForm />
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginComponents
