import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '~/store/use-auth-store'
import LoaderPage from '../shared/loader-page'

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <LoaderPage />
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

export default ProtectedRoute
