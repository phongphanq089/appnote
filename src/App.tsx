import { Route, Routes } from 'react-router'
import { PublicRoute } from './components/core/public-route'
import ProtectedRoute from './components/core/protected-route'
import UserLayout from './components/layout/user-layout'
import LoginPage from './features/auth/login-page'
import { useAuthStore } from './store/use-auth-store'
import { useEffect } from 'react'
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
      <Route path='*' element={<div>404 Not Found</div>} />
    </Routes>
  )
}

export default App
