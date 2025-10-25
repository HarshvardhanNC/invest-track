import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { InvestmentsContext } from '../../context/investments.context';

const InvestmentsByCategory = () => {
  const { category } = useParams();
  const { investments, loading } = useContext(InvestmentsContext);
  const [filteredInvestments, setFilteredInvestments] = useState([]);

  useEffect(() => {
    if (investments && category) {
      try {
        console.log("All investments:", investments);
        console.log("Current category:", category);
        
        const filtered = investments.filter(inv => {
          const investmentType = inv?.type?.toLowerCase() || 'other';
          const categoryType = category.toLowerCase();
          
          // Create mapping between URL categories and database types
          const categoryToTypeMap = {
            'stocks': 'stock',
            'stock': 'stock', // Add singular form
            'bonds': 'bond',
            'bond': 'bond', // Add singular form
            'mutual-funds': 'mutual-fund',
            'mutual-fund': 'mutual-fund', // Add singular form
            'crypto': 'crypto',
            'real-estate': 'real-estate',
            'other': 'other'
          };

          // Get the expected database type for this category
          const expectedType = categoryToTypeMap[categoryType];
          
          console.log(`Investment ${inv.assetName}: db_type=${investmentType}, category=${categoryType}, expected_type=${expectedType}, match=${investmentType === expectedType}`);
          
          return investmentType === expectedType;
        });
        
        console.log("Filtered investments:", filtered);
        setFilteredInvestments(filtered);
      } catch (error) {
        console.error('Error filtering investments:', error);
        setFilteredInvestments([]);
      }
    } else {
      setFilteredInvestments([]);
    }
  }, [investments, category]);

  const getCategoryDisplayName = (cat) => {
    const names = {
      'stocks': 'Stocks',
      'stock': 'Stocks',
      'crypto': 'Cryptocurrency',
      'real-estate': 'Real Estate',
      'bonds': 'Bonds',
      'bond': 'Bonds',
      'mutual-funds': 'Mutual Funds',
      'mutual-fund': 'Mutual Funds',
      'other': 'Other Investments'
    };
    return names[cat] || cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const getCategoryStats = () => {
    try {
      const total = filteredInvestments.reduce((sum, inv) => {
        const amount = parseFloat(inv?.amount) || 0;
        return sum + amount;
      }, 0);
      const count = filteredInvestments.length;
      const average = count > 0 ? total / count : 0;

      return { total, count, average };
    } catch (error) {
      console.error('Error calculating stats:', error);
      return { total: 0, count: 0, average: 0 };
    }
  };

  const getTotalInvestmentsCount = () => {
    try {
      return investments?.length || 0;
    } catch (error) {
      return 0;
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      'stock': 'blue',
      'stocks': 'blue',
      'bond': 'green',
      'bonds': 'green',
      'mutual-fund': 'purple',
      'mutual-funds': 'purple',
      'crypto': 'orange',
      'real-estate': 'red',
      'other': 'gray'
    };
    return colors[type] || 'gray';
  };

  const stats = getCategoryStats();
  const totalInvestmentsCount = getTotalInvestmentsCount();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-6 border-t-2 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
            <span className="text-gray-700 font-medium">Loading investments...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!investments) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Investments Data</h3>
          <p className="text-gray-600">Unable to load investments data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {getCategoryDisplayName(category)}
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your {getCategoryDisplayName(category).toLowerCase()} investments
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
              <p className="text-sm text-gray-600">Total in this category</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{stats.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Total Investments</h3>
                <p className="text-2xl font-bold text-gray-900">{stats.count}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Average Investment</h3>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{stats.average.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-600">Portfolio Share</h3>
                <p className="text-2xl font-bold text-gray-900">
                  {totalInvestmentsCount > 0 ? Math.round((stats.count / totalInvestmentsCount) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Investments List */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Your {getCategoryDisplayName(category)} Investments
            </h3>
            <span className="text-sm text-gray-600">
              {filteredInvestments.length} of {totalInvestmentsCount} total investments
            </span>
          </div>
          
          {filteredInvestments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No investments in this category</h4>
              <p className="text-gray-600">
                Start by adding investments to the {getCategoryDisplayName(category).toLowerCase()} category
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredInvestments.map((investment) => (
                <div key={investment._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-full bg-${getTypeColor(investment.type)}-100 text-${getTypeColor(investment.type)}-600`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {investment?.assetName || investment?.description || 'Unnamed Investment'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {investment?.description && investment.description !== investment.assetName && (
                            <span>{investment.description} • </span>
                          )}
                          Added on {investment?.date ? new Date(investment.date).toLocaleDateString() : 'Unknown date'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ₹{(parseFloat(investment?.amount) || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </p>
                      <span className={`inline-block bg-${getTypeColor(investment.type)}-100 text-${getTypeColor(investment.type)}-800 text-xs px-2 py-1 rounded-full capitalize`}>
                        {investment?.type || 'other'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestmentsByCategory;