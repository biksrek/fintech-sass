import express from 'express';
import { getTransactions, addTransaction, deleteTransaction, getMonthlyStats } from '../controllers/transactionController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect); // All routes protected

router.get('/stats', getMonthlyStats);

router.route('/')
  .get(getTransactions)
  .post(addTransaction);

router.route('/:id')
  .delete(deleteTransaction);

export default router;
