import admin from 'firebase-admin'
import serviceAccount from './FIREBASE_SERVICE_ACCOUNT_KEY.json'

const updatedServiceAccount = {
  projectId: serviceAccount.project_id,
  clientEmail: serviceAccount.client_email,
  privateKey: serviceAccount.private_key,
}

const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(updatedServiceAccount),
})

export const db = defaultApp.firestore()
