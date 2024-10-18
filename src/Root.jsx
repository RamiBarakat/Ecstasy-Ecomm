import React, { useState } from 'react'
import Navbar from './components/user/Navbar/Navbar';
import Footer from './components/user/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// in root we put the static things
export default function Root() {
  const [isLogin, setIsLogin] = useState ( localStorage.getItem('userToken') ? true : false );
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLogin(false);
  }

  return (
    <>
    <Navbar isLogin={isLogin} handleLogout={handleLogout}/>
      
    <Outlet/>
    
    {(location.pathname !== '/register' && location.pathname !== '/login') && <Footer/>}
    </>
  )
}
