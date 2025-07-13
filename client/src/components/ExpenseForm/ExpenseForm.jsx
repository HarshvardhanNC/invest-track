import React,{useContext , useState, useEffect } from 'react'
import LeftSideDash from '../Dashboard/LeftSideDash';
import NavBar from '../Dashboard/NavBar';
import { AuthContext } from '../../context/auth.context';
import { ExpenseContext } from '../../context/expense.context';

function ExpenseForm() {

  const {  user } = useContext(AuthContext);
  const {addExpense}  = useContext(ExpenseContext);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Food',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Basic validation
    if (!formData.amount || isNaN(formData.amount)) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    setLoading(true);
    
    try {
      const expenseData = {
        ...formData,
        user: user._id, // Include user ID from context
        amount: Number(formData.amount) // Ensure it's a number
      };
      
      const result = await addExpense(expenseData);
      
      if (result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          amount: '',
          date: new Date().toISOString().split('T')[0],
          category: 'Food',
          description: ''
        });
        
        // Auto-clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message || 'Failed to add expense');
      }
    } catch (err) {
      setError('An unexpected error occurred'+err);
    } finally {
      setLoading(false);
    }
  };




    return (
        <div className="flex flex-col h-screen">
          {/* Top Navbar */}
          <NavBar />
    
          {/* Content: Sidebar + Main */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <div className="w-40 bg-gray-100 border-r">
              <LeftSideDash />
            </div>
    
            {/* Main Content Area */}
            <div className="flex-1 bg-black text-white p-6 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Add New Expense</h1>
          
          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-900 text-red-200 rounded-lg">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-900 text-green-200 rounded-lg">
              Expense added successfully!
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="max-w-lg">

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="amount">
                Amount (Ruppees)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="00"
                min="0"
                step="1"
                required
              />
            </div>


            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="mb-5">
              <label className="block text-sm font-medium mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Shopping">Shopping</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What was this expense for?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                loading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Adding Expense...' : 'Add Expense'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ExpenseForm;
