import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { LoginFormValues } from './auth.schema'
import { authService } from './auth.service'
import { useAuthStore } from '~/store/use-auth-store'

export const authQuery = {
  useLogin: () => {
    return useMutation({
      mutationFn: async ({ email, password }: LoginFormValues) => {
        await authService.login(email, password)
        return await authService.getCurrentUser()
      },
    })
  },
  useLogOut: () => {
    const queryClient = useQueryClient()
    const { setUser } = useAuthStore()

    return useMutation({
      mutationFn: authService.logout,
      onSuccess: () => {
        setUser(null)
        queryClient.clear()
      },
    })
  },
}
