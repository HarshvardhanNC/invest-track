import React from 'react'
import NavBar from '../Dashboard/NavBar';
import LeftSideDash from '../Dashboard/LeftSideDash';
import { AuthContext } from '../../context/auth.context';
import { ExpenseContext } from '../../context/expense.context';
import { useContext } from 'react';

function ExpenseList() {
  const { user } = useContext(AuthContext);
  const { expenses, loading,deleteExpense, editExpense } = useContext(ExpenseContext);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in to view your expenses.</div>;
  if (expenses.length === 0) return <div>No expenses found.</div>;


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
            <div className="flex-1 p-6 overflow-y-auto bg-black text-white">
             
             {expenses.map((expense) => (
                <div key={expense._id} className="bg-zinc-700 text-white flex justify-between p-4 mb-4 rounded shadow">
                  <div className="">
                  <h3 className="text-lg font-semibold">{expense.category}</h3>
                  <p className="text-red-600 font-semibold">Amount: ${expense.amount}</p> 
                  <p className="text-gray-300">Date: {new Date(expense.date).toLocaleDateString()}</p>
                  <p className="text-gray-300">Description: {expense.description}</p>
                  </div>
                  <div className="">
                    <button onClick={() => deleteExpense(expense._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>

              </div>
             ))}
              
            </div>
          </div>
        </div>
      );
}

export default ExpenseList
