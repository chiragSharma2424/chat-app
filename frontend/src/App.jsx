import React, { useEffect } from 'react'
import Navbar from './component/Navbar';
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/UserAuthStore';

const App = () => {
  const {authUser, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log(authUser);
  return (
    <div>

       <Navbar />

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>

    </div>
  )
}

export default App;