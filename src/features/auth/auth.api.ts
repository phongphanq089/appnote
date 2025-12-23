/* eslint-disable @typescript-eslint/no-explicit-any */
import { account } from '~/lib/appwrite'

export const authService = {
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
}
