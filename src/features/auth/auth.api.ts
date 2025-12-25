/* eslint-disable @typescript-eslint/no-explicit-any */
import { account } from '~/lib/appwrite'
import type { RegisterFormValues } from './auth.schema'
import { ID } from 'appwrite'

export const authService: any = {
  login: async (email: string, password: string) => {
    return await account.createEmailPasswordSession(email, password)
  },
  logout: async () => {
    return await account.deleteSession('current')
  },
  getCurrentUser: async (): Promise<any> => {
    try {
      return account.get()
    } catch (err: any) {
      console.log(err, '==============>')
      return null
    }
  },
  register: async ({ email, password, name }: RegisterFormValues) => {
    return await account.create(ID.unique(), email, password, name)
  },
}
