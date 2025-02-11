import { USER } from '@repo/user-config'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useState } from 'react'
import EditUserModalComponent from '../modal/EditUserModalComponent'

interface UserCardComponentProps {
  user: USER
}

const renderUserData = (user: USER) => {
  return (
    <Box className='md:grid md:grid-cols-2 md:text-left text-center'>
      <Box className='hidden md:block'>
        <Typography variant='body1'>Email</Typography>
        <Typography variant='body1'>Purchases</Typography>
        <Typography variant='body1'>Balance</Typography>
      </Box>
      <Box>
        <Typography variant='body1'>{user.email}</Typography>
        <Typography variant='body1'>{user.purchases}</Typography>
        <Typography variant='body1'>{user.balance}</Typography>
      </Box>
    </Box>
  )
}

function UserCardComponent({ user }: UserCardComponentProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const [openDialog, setOpenDialog] = useState(false)
  const handleOpenDialog = () => setOpenDialog(true)
  const handleCloseDialog = () => setOpenDialog(false)

  return (
    <>
      <Card
        className='p-4 w-full rounded-xl border border-primary hover:shadow-xl hover:scale-105 transition-all ease-in-out text-center cursor-pointer active:scale-100'
        onClick={handleOpenDialog}
      >
        <CardHeader
          className='text-lg font-bold'
          title={user.username.toUpperCase()}
          titleTypographyProps={{ variant: isSmallScreen ? 'h5' : 'h4' }}
        />
        <CardContent className='w-full'>
          {renderUserData(user)}
          <Box className='flex flex-wrap justify-center gap-2 mt-4'>
            {user.sector.map((sec, index) => (
              <Chip
                key={index}
                label={sec.toUpperCase()}
                variant='filled'
                className='border border-primary'
                color='primary'
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <EditUserModalComponent
        open={openDialog}
        handleClose={handleCloseDialog}
        user={user}
      />
    </>
  )
}

export default UserCardComponent
