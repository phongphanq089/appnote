import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '~/store/use-auth-store'
import LoaderPage from '../shared/loader-page'

export const PublicRoute = () => {
  const { isAuthenticated, isInitialized } = useAuthStore()

  if (!isInitialized) {
    return <LoaderPage />
  }

  if (isAuthenticated) {
    return <Navigate to='/' replace />
  }
  return <Outlet />
}
