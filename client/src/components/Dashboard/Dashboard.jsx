import React, { use, useEffect, useState } from 'react';
import NavBar from './NavBar';
import LeftSideDash from './LeftSideDash';
import { AuthContext } from '../../context/auth.context';
import { useContext } from 'react';
import { ExpenseContext } from '../../context/expense.context';
import ExpensePieChart from './ExpensePieChart';

function Dashboard() {

  const { user } = useContext(AuthContext);
  const { expenses } = useContext(ExpenseContext);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categoryExpenses, setCategoryExpenses] = useState({});

  useEffect(() => {
    const categoryMap = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
    setCategoryExpenses(categoryMap);
    console.log(categoryExpenses);
  }, [expenses]);

  const chartData = Object.entries(categoryExpenses).map(([key, value]) => ({
    name: key,
    value,
  }));
  

  if (!user) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Please log in to view your dashboard.</div>;
  }
  if (!user.username) {
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading user data...</div>;
  }

  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    console.log(`Total Expenses: ${total}`);
    setTotalExpenses(total);
  }, [expenses]);

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
        <div className="flex-1 p-6 overflow-y-auto text-4xl capitalize font-extralight bg-black text-white">
          welcome, {user.username}
          <div className="flex text-2xl items-center justify-between mt-4 p-4  shadow-lg rounded-lg shadow-gray-500/50">
            <span className="text-gray-300">your total expenses</span>
            <span className="text-red-600 font-semibold"> {totalExpenses}</span>

          </div>
          
          <div className="w-full flex text-lg items-center justify-center mt-8">
            <ExpensePieChart data={chartData} />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
