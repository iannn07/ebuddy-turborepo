import { Box, Typography } from '@mui/material'

function LoginHeader() {
  return (
    <Box className='flex flex-col items-center gap-2'>
      <Typography component='h1' variant='h4'>
        Login
      </Typography>
      <Typography component='p' variant='body1'>
        Sign in to your account
      </Typography>
    </Box>
  )
}

export default LoginHeader
