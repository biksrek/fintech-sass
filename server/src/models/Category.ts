import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  userId?: mongoose.Schema.Types.ObjectId; // Optional for default categories
  name: string;
  type: 'income' | 'expense';
}

const CategorySchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
