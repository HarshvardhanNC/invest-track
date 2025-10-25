import React from 'react';
import { Outlet } from 'react-router-dom';

function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Side */}
        <div className="bg-black text-white flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl font-extrabold mb-4 text-center">Welcome to Investment Tracker</h1>
          <p className="text-lg text-center">Manage your investments smarter. Please login or register to continue.</p>
        </div>

        {/* Right Side (Login / Register Forms via <Outlet />) */}
        <div className="p-8 bg-black md:p-10">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Auth;