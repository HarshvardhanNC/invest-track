import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/auth.context';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Auth from './components/Auth/Auth';
import CheckAuth from './components/Auth/CheckAuth';
import { InvestmentsProvider } from './context/investments.context';
import Dashboard from './components/Dashboard/Dashborad';
import DashboardLayout from './components/Dashboard/DashboardLayout';
import InvestmentsByCategory from './components/pages/InvestmentsByCategory';



function PrivateRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className='bg-black text-white w-full h-screen flex items-center justify-center text-3xl' >Loading...</div>;
  return user ? children : <Navigate to="/auth/login" />;
}

// ✅ Wrap context usage inside AuthProvider
function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<CheckAuth user={user} loading={loading} />} />
      <Route path="/dashboard" element={
        <PrivateRoute>
         <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
        </PrivateRoute>
      } />
      <Route path="/investments/:category" element={
                <DashboardLayout>
                  <InvestmentsByCategory />
                </DashboardLayout>
              } />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <InvestmentsProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      </InvestmentsProvider>
    </AuthProvider>
  );
}
