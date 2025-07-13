import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './auth.context';
import { useContext } from 'react';

export const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const loadExpenses = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await axios.get(`/api/expense?userId=${user.id}`);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, [user]);

  // Load expenses on mount
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const response = await axios.get('/api/expense');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  // Add new expense
  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post('/api/expense/form', expenseData);
      setExpenses(prev => [...prev, response.data]);
      console.log('Expense added successfully:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error adding expense:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to add expense' };
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`/api/expense/${id}`);
      setExpenses(prev => prev.filter(expense => expense._id !== id));
      console.log('Expense deleted successfully');
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/expense/${id}`, updatedData);
      setExpenses(prev => prev.map(expense => (expense._id === id ? response.data : expense)));
      console.log('Expense updated successfully:', response.data);
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error updating expense:', error);
      return { success: false, message: error.response?.data?.message || 'Failed to update expense' };
    }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, deleteExpense, editExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
}