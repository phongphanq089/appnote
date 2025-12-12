import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '~/store/use-auth-store'
import SplashScreen from './splash-screen'

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <SplashScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

export default ProtectedRoute
