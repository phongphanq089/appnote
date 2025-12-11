import { Client, Account, Databases, Avatars, Storage } from 'appwrite'
import { APPWRITE_CONFIG } from './appwrite-config'

const client = new Client()
client
  .setEndpoint(APPWRITE_CONFIG.END_POINT)
  .setProject(APPWRITE_CONFIG.PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
