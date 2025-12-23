import { Route, Routes } from 'react-router'
import { PublicRoute } from './components/core/public-route'
import ProtectedRoute from './components/core/protected-route'
import UserLayout from './components/layout/user-layout'
import LoginPage from './features/auth/components/login-page'
import { useAuthStore } from './store/use-auth-store'
import { useEffect } from 'react'
import { NotFound } from './components/shared/404'
function App() {
  const initAuth = useAuthStore((state) => state.init)

  useEffect(() => {
    initAuth()
  }, [initAuth])
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/login' element={<LoginPage />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<UserLayout />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
