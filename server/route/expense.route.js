import express from 'express';
import Expense from '../model/expense.model.js';

const router = express.Router();

router.post('/form', async (req, res) => {
    try {
        const { user, date, amount, category, description } = req.body;
    
        // Validate required fields
        if (!user || !amount) {
        return res.status(400).json({ message: 'User and amount are required' });
        }
    
        // Create new expense
        const newExpense = new Expense({
        user,
        date: date ? new Date(date) : Date.now(),
        amount,
        category,
        description: description? description.trim() : ''
        });
    
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        console.error('Error creating expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
})
router.get('/', async (req, res) => {
    try {
        const expenses = await Expense.find().populate('user', 'name email');
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//delete the expense
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//edit the expense
router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { date, amount, category, description } = req.body;

        // Validate required fields
        if (!amount) {
            return res.status(400).json({ message: 'Amount is required' });
        }

        const updatedExpense = await Expense.findByIdAndUpdate(
            id,
            {
                date: date ? new Date(date) : Date.now(),
                amount,
                category,
                description: description ? description.trim() : ''
            },
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        res.status(200).json(updatedExpense);
        
    } catch (error) {
        
    }
})


export default router;