import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '~/store/use-auth-store'
import SplashScreen from './splash-screen'

export const PublicRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <SplashScreen />
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}
