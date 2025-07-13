import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { Link } from 'react-router-dom';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  
  // Get user's first initial for the avatar
  const getUserInitial = () => {
    if (!user) return '';
    
    // Try to get from username first
    if (user.username) return user.username.charAt(0).toUpperCase();
    
    // Fallback to email if username doesn't exist
    if (user.email) return user.email.charAt(0).toUpperCase();
    
    return 'U';
  };

  return (
    <nav className="border-b-[1px] border-zinc-300 bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Company Logo/Name */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-white text-zinc-600 font-extralight tracking-tighter text-xl w-10 h-10 rounded-full flex items-center justify-center mr-3">
                ET
              </div>
              <span className="text-2xl font-light tracking-tighter">Expense Tracker</span>
            </div>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Avatar with Initial */}
                <div className="relative group">
                  <div className="bg-white text-black font-bold w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md transform transition-transform duration-300 hover:scale-110">
                    {getUserInitial()}
                  </div>
                  
                  {/* User Info Tooltip */}
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <p className="font-semibold truncate">{user.username || user.email}</p>
                    <p className="text-sm text-gray-600">{user.role === 'admin' ? 'Administrator' : 'User'}</p>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="bg-white text-cyan-950 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg shadow transition-all duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Logout
                </button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/auth/login" 
                  className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg shadow transition-all duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register" 
                  className="bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg shadow transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
