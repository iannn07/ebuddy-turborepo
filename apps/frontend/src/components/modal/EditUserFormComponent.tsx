import { updateUserAction } from '@/app/home/utils/updateUserAction'
import { resetError } from '@/store/slices/authSlices'
import {
  resetUpdateState,
  updateUserFailure,
  updateUserStart,
} from '@/store/slices/updateUserSlices'
import { AppDispatch, RootState } from '@/store/store'
import { USER } from '@repo/user-config'
import { valibotResolver } from '@hookform/resolvers/valibot'
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { InferInput, nonEmpty, object, pipe, string } from 'valibot'

interface EditUserFormComponentProps {
  user: USER
  handleClose: () => void
}

const userSchema = object({
  username: pipe(string(), nonEmpty('Username is required')),
  email: pipe(string(), nonEmpty('Email is required')),
  purchases: pipe(string(), nonEmpty('Purchases is required')),
  balance: pipe(string(), nonEmpty('Balance is required')),
  sector: pipe(string(), nonEmpty('Sector is required')),
})

type userFields = InferInput<typeof userSchema>

function EditUserFormComponent({
  user,
  handleClose,
}: EditUserFormComponentProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useSelector((state: RootState) => state.updateUser)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userFields>({
    resolver: valibotResolver(userSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      purchases: user.purchases.toString(),
      balance: user.balance.toString(),
      sector: user.sector.toString(),
    },
    mode: 'onChange',
  })

  const fields = [
    {
      label: 'Username',
      name: 'username',
      autoComplete: 'username',
      autoFocus: true,
      type: 'text',
    },
    {
      label: 'Email Address',
      name: 'email',
      autoComplete: 'email',
      type: 'email',
    },
    {
      label: 'Purchases',
      name: 'purchases',
      autoComplete: 'purchases',
      type: 'number',
    },
    {
      label: 'Balance',
      name: 'balance',
      autoComplete: 'balance',
      type: 'number',
    },
    {
      label: 'Sector',
      name: 'sector',
      autoComplete: 'sector',
      type: 'text',
    },
  ]

  const onSubmit = async (data: userFields) => {
    try {
      dispatch(updateUserStart())

      const mappedData: USER = {
        id: user.id,
        username: data.username,
        email: data.email,
        purchases: Number(data.purchases),
        balance: Number(data.balance),
        sector: data.sector.split(',').map((sec) => sec.trim()),
      }

      const { success, error } = await updateUserAction(mappedData)

      if (!success || error) {
        dispatch(updateUserFailure(error as string))

        return
      }

      handleClose()

      setTimeout(() => {
        dispatch(resetUpdateState())
      }, 500)
    } catch (error) {
      dispatch(
        dispatch(
          updateUserFailure(
            error instanceof Error
              ? error.message
              : 'An error occurred while updating user data'
          )
        )
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent className='w-full py-5' dividers>
        <FormControl className='w-full min-w-2xl overflow-y-auto'>
          {fields.map((field, index) => (
            <Controller
              key={index}
              name={field.name as keyof userFields}
              control={control}
              render={({ field: controllerField }) => (
                <>
                  <Typography component='label' variant='body2'>
                    {field.label}
                  </Typography>
                  <TextField
                    {...controllerField}
                    id={field.name}
                    name={field.name}
                    autoComplete={field.autoComplete}
                    autoFocus={field.autoFocus ? true : false}
                    placeholder={`Enter your ${field.label}`}
                    type='text'
                    fullWidth
                    className='mb-5 mt-2 min-w-2xl'
                    error={!!errors[field.name as keyof userFields]}
                    helperText={errors[field.name as keyof userFields]?.message}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        marginLeft: 0,
                        marginRight: 0,
                      },
                    }}
                  />
                </>
              )}
            />
          ))}
        </FormControl>
        {error && (
          <Alert
            severity='error'
            variant='filled'
            className='w-full'
            onClose={() => dispatch(resetError())}
          >
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions className='py-5'>
        <Button
          onClick={handleClose}
          color='primary'
          variant='outlined'
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          color='primary'
          variant='contained'
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update'}
        </Button>
      </DialogActions>
    </form>
  )
}

export default EditUserFormComponent
