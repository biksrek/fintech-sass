import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Transaction from '../models/Transaction';

// @desc    Get all transactions
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { type, category, month, year } = req.query;
    const filter: any = { userId: (req as any).user._id };

    if (type) filter.type = type;
    if (category) filter.category = category; // Assuming exact match for now

    if (month && year) {
      // Filter by month/year logic
      // Assuming 'month' is 1-indexed (1=Jan)
      const startDate = new Date(Number(year), Number(month) - 1, 1);
      const endDate = new Date(Number(year), Number(month), 0); // Last day of month
      filter.date = { $gte: startDate, $lt: endDate };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Add transaction
// @route   POST /api/transactions
// @access  Private
export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { type, category, amount, description, date } = req.body;

    // Simple validation
    if (!type || !category || !amount) {
      res.status(400).json({ message: 'Please add all fields' });
      return;
    }

    const transaction = await Transaction.create({
      userId: (req as any).user._id,
      type,
      category,
      amount,
      description,
      date: date || Date.now(),
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    // Ensure user owns transaction
    if (transaction.userId.toString() !== (req as any).user._id.toString()) {
      res.status(401).json({ message: 'User not authorized' });
      return;
    }

    await transaction.deleteOne();

    res.json({ message: 'Transaction removed' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get monthly statistics
// @route   GET /api/transactions/stats
// @access  Private
export const getMonthlyStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    // Aggregate income vs expense
    const stats = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId.toString())
        }
      },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Aggregate by category
    const categoryStats = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId.toString())
        }
      },
      {
        $group: {
          _id: { category: '$category', type: '$type' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { total: -1 }
      }
    ]);

    // Format stats
    const income = stats.find(s => s._id === 'income')?.total || 0;
    const expense = stats.find(s => s._id === 'expense')?.total || 0;
    const balance = income - expense;

    res.json({
      income,
      expense,
      balance,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
