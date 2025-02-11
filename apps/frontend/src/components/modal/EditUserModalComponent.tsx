import { USER } from '@repo/user-config'
import { Close } from '@mui/icons-material'
import {
  Dialog,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import EditUserFormComponent from './EditUserFormComponent'

interface EditUserModalComponentProps {
  open: boolean
  handleClose: () => void
  user: USER
}

function EditUserModalComponent({
  open,
  handleClose,
  user,
}: EditUserModalComponentProps) {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle className='flex justify-between items-center'>
        <Typography variant={isSmallScreen ? 'h5' : 'h4'} component='div'>
          Edit User Data
        </Typography>
        <IconButton onClick={handleClose} color='primary'>
          <Close />
        </IconButton>
      </DialogTitle>

      <EditUserFormComponent user={user} handleClose={handleClose} />
    </Dialog>
  )
}

export default EditUserModalComponent
