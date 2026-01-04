import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from "lucide-react";
import Layout from "../components/Layout";
import TransactionList from "../components/TransactionList";
import AddTransactionForm from "../components/AddTransactionForm";
import { useDebounce } from "../hooks/useDebounce";

const TransactionsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-slate-400 mt-1">
            Manage and view all your transactions
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-medium"
        >
          <Plus size={18} />
          <span>Add Transaction</span>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-white/5 overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-white">All Transactions</h3>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all"
            />
          </div>
        </div>
        <div className="p-2">
          <TransactionList search={debouncedSearch} />
        </div>
      </motion.div>

      <AddTransactionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default TransactionsPage;
