import React from 'react';
import { useAuthStore } from '../store/UserAuthStore';

const ProfilePage = () => {
   const {authUser} = useAuthStore()
  return (
    <div>
      
    </div>
  )
}

export default ProfilePage;