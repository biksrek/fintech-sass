import { Request, Response } from 'express';
import Category from '../models/Category';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({
      $or: [{ userId: (req as any).user._id }, { userId: null }] // User specific + default
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Add category
// @route   POST /api/categories
// @access  Private
export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name, type } = req.body;

    // Check if exists for user
    const exists = await Category.findOne({ userId: (req as any).user._id, name, type });
    if (exists) {
      res.status(400).json({ message: 'Category already exists' });
      return;
    }

    const category = await Category.create({
      userId: (req as any).user._id,
      name,
      type,
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    // Default categories cannot be deleted (userId is null/undefined)
    if (!category.userId) {
      res.status(400).json({ message: 'Cannot delete default category' });
      return;
    }

    if (category.userId.toString() !== (req as any).user._id.toString()) {
      res.status(401).json({ message: 'Not authorized' });
      return;
    }

    await category.deleteOne();
    res.json({ message: 'Category removed' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
