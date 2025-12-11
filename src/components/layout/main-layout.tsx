import { Route, Routes } from 'react-router'
import ProtectedRoute from '../core/protected-route'
import { PublicRoute } from '../core/public-route'
import UserLayout from './user-layout'

const MainLayout = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/login' element={<div>Login</div>} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<UserLayout />} />
      </Route>
    </Routes>
  )
}

export default MainLayout
