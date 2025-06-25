import React, { useEffect } from 'react'
import Navbar from './component/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/UserAuthStore';
import { Loader } from 'lucide-react'

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log(authUser);

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )
  return (
    <div>

       <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to={'/login'} />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={authUser ? <SettingPage /> : <Navigate to={'/login'} />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>

    </div>
  )
}

export default App;