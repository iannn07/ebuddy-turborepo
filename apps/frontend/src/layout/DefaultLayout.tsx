'use client'

import store from '@/store/store'
import { Container } from '@mui/material'
import React from 'react'
import { Provider } from 'react-redux'

function DefaultLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <Container className='flex min-h-screen overflow-hidden'>
        {children}
      </Container>
    </Provider>
  )
}

export default DefaultLayout
