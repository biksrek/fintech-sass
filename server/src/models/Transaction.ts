import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  type: 'income' | 'expense';
  category: string; // Storing name for simplicity or ObjectId if strictly linked
  amount: number;
  date: Date;
  description?: string;
}

const TransactionSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
