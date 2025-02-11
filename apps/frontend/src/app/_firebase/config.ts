import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_API!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_KEY_AUTHDOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_KEY_PROJECTID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_KEY_STORAGEBUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_KEY_MESSAGINGSENDERID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_KEY_APPID!,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
