import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

 // In your Sidebar component
const menuItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard', exact: true },
  { path: '/investments/stock', icon: '📈', label: 'Stocks' }, // Changed to singular
  { path: '/investments/crypto', icon: '₿', label: 'Cryptocurrency' },
  { path: '/investments/real-estate', icon: '🏠', label: 'Real Estate' },
  { path: '/investments/bond', icon: '📄', label: 'Bonds' }, // Changed to singular
  { path: '/investments/mutual-fund', icon: '💼', label: 'Mutual Funds' }, // Changed to singular
  { path: '/investments/other', icon: '📦', label: 'Other Investments' },
];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Investment Portfolio</h2>
            <p className="text-sm text-gray-600">Manage your assets</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive(item.path, item.exact) 
                    ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-r-2 border-indigo-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <p className="text-sm text-gray-700 font-medium">Total Portfolio</p>
              <p className="text-lg font-bold text-gray-900">Manage all your investments</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;