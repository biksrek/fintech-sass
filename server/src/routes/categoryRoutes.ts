import express from 'express';
import { getCategories, addCategory, deleteCategory } from '../controllers/categoryController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getCategories)
  .post(addCategory);

router.route('/:id')
  .delete(deleteCategory);

export default router;
