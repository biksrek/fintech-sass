import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Calendar,
  Tag,
} from "lucide-react";
import api from "../api/axios";

const fetchTransactions = async (search: string) => {
  const { data } = await api.get("/transactions", {
    params: { search },
  });
  return data;
};

interface TransactionListProps {
  search?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ search = "" }) => {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", search],
    queryFn: () => fetchTransactions(search),
  });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {transactions?.map((transaction: any, index: number) => (
          <motion.div
            key={transaction._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === "income"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight size={18} />
                ) : (
                  <ArrowDownRight size={18} />
                )}
              </div>

              <div>
                <p className="text-white font-medium">{transaction.category}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    Today
                  </span>
                  {transaction.description && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Tag size={10} />
                        {transaction.description}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`font-bold ${
                  transaction.type === "income"
                    ? "text-emerald-400"
                    : "text-slate-200"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}$
                {transaction.amount.toLocaleString()}
              </span>
              <button
                onClick={() => deleteMutation.mutate(transaction._id)}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                title="Delete transaction"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {transactions?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Tag size={24} className="text-slate-500" />
          </div>
          <p className="text-slate-400">No transactions yet</p>
          <p className="text-xs text-slate-500 mt-1">
            Add a transaction to get started
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
