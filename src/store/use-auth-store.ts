import type { Models } from 'appwrite'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '~/features/auth/auth.service'

interface AuthState {
  user: Models.User<Models.Preferences> | null
  isAuthenticated: boolean
  isInitialized: boolean

  setUser: (user: Models.User<Models.Preferences> | null) => void
  init: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        })
      },

      init: async () => {
        try {
          const user = await authService.getCurrentUser()
          set({ user, isAuthenticated: !!user, isInitialized: true })
        } catch {
          set({ user: null, isAuthenticated: false, isInitialized: true })
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.init()
      },
    }
  )
)
