import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await login({
        email: credentials.email,
        password: credentials.password
      });
      
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Email</label>
          <input 
            type="email" 
            name="email" 
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-black bg-white"
            required 
          />
        </div>
        
        <div className="mb-6">
          <label className="block mb-2 font-medium">Password</label>
          <input 
            type="password" 
            name="password" 
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            autoComplete="current-password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-zinc-500 text-black bg-white"
            required 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-zinc-500 hover:bg-zinc-600'
          } transition-colors`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            to="/auth/register" 
            className="text-blue-500 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}