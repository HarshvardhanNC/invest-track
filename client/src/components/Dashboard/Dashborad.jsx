import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { InvestmentsContext } from "../../context/investments.context";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const {
    investments,
    fetchInvestments,
    addInvestment,
    updateInvestments,
    deleteInvestments,
  } = useContext(InvestmentsContext);

  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState(null);
  const [viewingInvestment, setViewingInvestment] = useState(null);
  const [sortOption, setSortOption] = useState("date-desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const [formData, setFormData] = useState({
    assetName: "",
    description: "",
    amount: "",
    type: "stock",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (user) fetchInvestments();
  }, [user]);

  // Calculate portfolio statistics
  const portfolioStats = {
    totalValue: investments.reduce((sum, inv) => sum + parseFloat(inv.amount), 0),
    totalInvestments: investments.length,
    byType: investments.reduce((acc, inv) => {
      acc[inv.type] = (acc[inv.type] || 0) + 1;
      return acc;
    }, {})
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const investmentData = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    try {
      if (editingInvestment) {
        await updateInvestments(editingInvestment._id, investmentData);
      } else {
        await addInvestment(investmentData);
      }
      resetForm();
    } catch (error) {
      console.error("Error saving investment:", error);
    }
  };

  const handleEdit = (investment) => {
    setEditingInvestment(investment);
    setFormData({
      assetName: investment.assetName || "",
      description: investment.description || "",
      amount: investment.amount,
      type: investment.type,
      date: new Date(investment.date).toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      assetName: "",
      description: "",
      amount: "",
      type: "stock",
      date: new Date().toISOString().split("T")[0],
    });
    setShowForm(false);
    setEditingInvestment(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this investment?")) {
      await deleteInvestments(id);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      'stock': '📈',
      'bond': '📄',
      'mutual-fund': '💼',
      'crypto': '₿',
      'real-estate': '🏠',
      'other': '📦'
    };
    return icons[type] || '📦';
  };

  const getTypeColor = (type) => {
    const colors = {
      'stock': 'blue',
      'bond': 'green',
      'mutual-fund': 'purple',
      'crypto': 'orange',
      'real-estate': 'red',
      'other': 'gray'
    };
    return colors[type] || 'gray';
  };

  const filteredAndSortedInvestments = investments
    .filter(inv => {
      const matchesSearch = inv.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.description && inv.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = activeFilter === "all" || inv.type === activeFilter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOption === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortOption === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortOption === "amount-desc") return b.amount - a.amount;
      if (sortOption === "amount-asc") return a.amount - b.amount;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Welcome back, {user?.username}!
              </h1>
              <p className="text-lg text-slate-600">
                Manage your investment portfolio and track your financial growth
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowForm(!showForm)}
              className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex items-center gap-3 w-fit"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {showForm ? "Close Form" : "Add Investment"}
            </motion.button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Portfolio Value</p>
                  <p className="text-2xl font-bold text-slate-900">
                    ₹{portfolioStats.totalValue.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100 text-green-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Investments</p>
                  <p className="text-2xl font-bold text-slate-900">{portfolioStats.totalInvestments}</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Investment Types</p>
                  <p className="text-2xl font-bold text-slate-900">{Object.keys(portfolioStats.byType).length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200/80 mb-8 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingInvestment ? 'Edit Investment' : 'Add New Investment'}
                </h2>
                <p className="text-blue-100 mt-1">
                  {editingInvestment ? 'Update your investment details' : 'Add a new investment to your portfolio'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Asset Name *
                    </label>
                    <input
                      type="text"
                      name="assetName"
                      placeholder="e.g., Apple Inc., Tesla Shares, Bitcoin"
                      value={formData.assetName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Description <span className="text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Long term investment, High growth potential..."
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Investment Amount *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">₹</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder="10000"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Investment Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50 appearance-none"
                    >
                      <option value="stock">📈 Stocks</option>
                      <option value="bond">📄 Bonds</option>
                      <option value="mutual-fund">💼 Mutual Funds</option>
                      <option value="crypto">₿ Cryptocurrency</option>
                      <option value="real-estate">🏠 Real Estate</option>
                      <option value="other">📦 Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Investment Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 flex-1"
                  >
                    {editingInvestment ? 'Update Investment' : 'Add Investment'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={resetForm}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex-1 border border-slate-200"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/60 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative max-w-md">
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search investments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                {['all', 'stock', 'bond', 'mutual-fund', 'crypto', 'real-estate', 'other'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeFilter === type
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {type === 'all' ? 'All' : getTypeIcon(type)}
                  </button>
                ))}
              </div>

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="amount-desc">Highest Amount</option>
                <option value="amount-asc">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Investments Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Your Investments</h2>
            <span className="text-sm text-slate-600">
              {filteredAndSortedInvestments.length} of {investments.length} investments
            </span>
          </div>

          {filteredAndSortedInvestments.length === 0 ? (
            <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-200/60">
              <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No investments found</h3>
              <p className="text-slate-600 mb-6">Start building your portfolio by adding your first investment</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Add Your First Investment
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAndSortedInvestments.map((inv) => (
                <motion.div
                  key={inv._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200/80 hover:shadow-lg hover:border-slate-300/80 transition-all duration-300 group overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-${getTypeColor(inv.type)}-100 text-${getTypeColor(inv.type)}-600 text-lg`}>
                          {getTypeIcon(inv.type)}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{inv.assetName}</h3>
                          <p className="text-sm text-slate-500 capitalize">{inv.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                    </div>

                    {inv.description && (
                      <p className="text-slate-600 mb-4 text-sm leading-relaxed">{inv.description}</p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-slate-900">
                          ₹{inv.amount.toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Added {new Date(inv.date).toLocaleDateString("en-IN")}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-slate-100">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setViewingInvestment(inv)}
                        className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEdit(inv)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDelete(inv._id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* View Modal */}
        <AnimatePresence>
          {viewingInvestment && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <h2 className="text-2xl font-bold text-white">Investment Details</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className={`p-3 rounded-xl bg-${getTypeColor(viewingInvestment.type)}-100 text-${getTypeColor(viewingInvestment.type)}-600 text-xl`}>
                      {getTypeIcon(viewingInvestment.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{viewingInvestment.assetName}</h3>
                      <p className="text-slate-500 capitalize">{viewingInvestment.type.replace('-', ' ')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Amount</label>
                      <p className="text-lg font-semibold text-slate-900">
                        ₹{viewingInvestment.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Date Added</label>
                      <p className="text-lg font-semibold text-slate-900">
                        {new Date(viewingInvestment.date).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                  </div>

                  {viewingInvestment.description && (
                    <div>
                      <label className="text-sm font-medium text-slate-600">Description</label>
                      <p className="text-slate-900 mt-1">{viewingInvestment.description}</p>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-slate-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setViewingInvestment(null)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                  >
                    Close Details
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}