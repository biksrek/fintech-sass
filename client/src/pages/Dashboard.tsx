import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, DollarSign, Plus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import api from "../api/axios";
import AddTransactionForm from "../components/AddTransactionForm";
import TransactionList from "../components/TransactionList";
import Layout from "../components/Layout";

const fetchStats = async () => {
  const { data } = await api.get("/transactions/stats");
  return data;
};

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading)
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Financial Overview</h1>
          <p className="text-slate-400 mt-1">Track your income and expenses</p>
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

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          {
            label: "Total Income",
            amount: stats?.income || 0,
            icon: ArrowUpRight,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
          },
          {
            label: "Total Expenses",
            amount: stats?.expense || 0,
            icon: ArrowDownRight,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
          },
          {
            label: "Net Balance",
            amount: stats?.balance || 0,
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-3 rounded-xl border border-white/5 flex items-center justify-between group hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-slate-400 text-xs font-medium">{stat.label}</p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <h3 className="text-lg font-bold text-white">
                  ${stat.amount.toLocaleString()}
                </h3>
                <span className="text-emerald-400 text-[10px] font-medium">
                  +2.5%
                </span>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.border} border`}>
              <stat.icon className={stat.color} size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 pb-2">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5 flex flex-col"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Activity Overview
          </h3>
          <div className="flex-1 w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "Income", amount: stats?.income || 0 },
                  { name: "Expense", amount: stats?.expense || 0 },
                ]}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  fontSize={12}
                  tickMargin={10}
                />
                <YAxis
                  stroke="#94a3b8"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  fontSize={12}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: "#fff", fontWeight: 600 }}
                  labelStyle={{ color: "#94a3b8", marginBottom: "4px" }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60}>
                  {[
                    { name: "Income", amount: stats?.income || 0 },
                    { name: "Expense", amount: stats?.expense || 0 },
                  ].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.name === "Income"
                          ? "url(#colorIncome)"
                          : "url(#colorExpense)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-white/5 flex flex-col h-[400px] lg:h-full overflow-hidden"
        >
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Recent Activity</h3>
            <Link
              to="/transactions"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="flex-1 overflow-auto p-2">
            <TransactionList />
          </div>
        </motion.div>
      </div>

      <AddTransactionForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default Dashboard;
