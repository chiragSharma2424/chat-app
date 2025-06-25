import React from 'react';
import { useAuthStore } from '../store/UserAuthStore';

const Navbar = () => {
     const {authUser} = useAuthStore()
  return (
    <div>
      Navbar page
    </div>
  )
}

export default Navbar;