import dotenv from 'dotenv'
import admin from 'firebase-admin'

dotenv.config()

const updatedServiceAccount = {
  projectId: process.env.EXPRESS_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.EXPRESS_PUBLIC_FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.EXPRESS_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  ),
}

const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(updatedServiceAccount),
})

export const db = defaultApp.firestore()
