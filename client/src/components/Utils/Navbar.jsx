import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';

const Navbar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [nifty, setNifty] = useState(null);
  const [bankNifty, setBankNifty] = useState(null);
  const [niftyChange, setNiftyChange] = useState(null);
  const [bankNiftyChange, setBankNiftyChange] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate('/');
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch Nifty data
      const resNifty = await fetch("/api/nifty");
      const dataNifty = await resNifty.json();
      
      if (dataNifty.chart?.result?.[0]) {
        const niftyResult = dataNifty.chart.result[0];
        const niftyPrice = niftyResult.meta.regularMarketPrice;
        const niftyPreviousClose = niftyResult.meta.previousClose;
        const niftyChangePercent = ((niftyPrice - niftyPreviousClose) / niftyPreviousClose * 100).toFixed(2);
        
        setNifty(niftyPrice);
        setNiftyChange(niftyChangePercent);
      }

      // Fetch Bank Nifty data
      const resBank = await fetch("/api/banknifty");
      const dataBank = await resBank.json();
      
      if (dataBank.chart?.result?.[0]) {
        const bankResult = dataBank.chart.result[0];
        const bankPrice = bankResult.meta.regularMarketPrice;
        const bankPreviousClose = bankResult.meta.previousClose;
        const bankChangePercent = ((bankPrice - bankPreviousClose) / bankPreviousClose * 100).toFixed(2);
        
        setBankNifty(bankPrice);
        setBankNiftyChange(bankChangePercent);
      }
    } catch (err) {
      console.error("Error fetching market data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '--';
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const getChangeColor = (change) => {
    if (change === null || change === undefined) return 'text-gray-600';
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getChangeIcon = (change) => {
    if (change === null || change === undefined) return null;
    return change >= 0 ? '▲' : '▼';
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Market Data */}
          <div className="flex gap-6 items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">WealthTracker</span>
            </Link>
            
            {/* Market Data */}
            <div className="hidden md:flex items-center gap-6">
              {/* Nifty */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">NIFTY 50</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(nifty)}
                      </span>
                      <span className={`text-xs font-medium ${getChangeColor(niftyChange)}`}>
                        {getChangeIcon(niftyChange)} {niftyChange}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Bank Nifty */}
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">BANK NIFTY</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(bankNifty)}
                      </span>
                      <span className={`text-xs font-medium ${getChangeColor(bankNiftyChange)}`}>
                        {getChangeIcon(bankNiftyChange)} {bankNiftyChange}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Navigation items */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* User greeting - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">Hi, {user?.username}</span>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                {/* Desktop logout button */}
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-gray-900 font-medium">
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && isLoggedIn && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user?.username?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
            
            {/* Mobile Market Data */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-2 bg-gray-50 rounded-lg">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">NIFTY 50</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(nifty)}
                      </span>
                      <span className={`text-xs font-medium ${getChangeColor(niftyChange)}`}>
                        {getChangeIcon(niftyChange)} {niftyChange}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 font-medium">BANK NIFTY</span>
                <div className="flex items-center gap-1">
                  {loading ? (
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  ) : (
                    <>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatNumber(bankNifty)}
                      </span>
                      <span className={`text-xs font-medium ${getChangeColor(bankNiftyChange)}`}>
                        {getChangeIcon(bankNiftyChange)} {bankNiftyChange}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full text-left text-gray-700 hover:text-gray-900 py-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;