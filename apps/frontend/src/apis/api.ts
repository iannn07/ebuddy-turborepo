import axios from 'axios'

export const ebuddyBEClient = axios.create({
  baseURL: process.env.NEXT_EBUDDY_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
})
