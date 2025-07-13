import React, { Children } from 'react'
import { Navigate,useLocation,  } from 'react-router-dom'

function CheckAuth({user, loading}) {
  if (loading) return <div>Loading...</div>
    if (!user&& !(location.pathname.includes('login') || location.pathname.includes('register'))) {
      // If user is not logged in and trying to access a protected route
      // Redirect to login or show a message
        return  <Navigate to='/auth/login'/>
    }
    if (user && (location.pathname.includes('login') || location.pathname.includes('register'))){
        
            return <Navigate to='/dashboard'/>
    }
  return (
    <div>
      {Children}
    </div>
  )
}

export default CheckAuth
