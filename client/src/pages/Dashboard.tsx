import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AddTransactionForm from '../components/AddTransactionForm';
import TransactionList from '../components/TransactionList';

const fetchStats = async () => {
  const { data } = await api.get('/transactions/stats');
  return data;
};

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { data: stats, isLoading } = useQuery({ queryKey: ['stats'], queryFn: fetchStats });
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <div className="p-8">Loading stats...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
             <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">FinTech SaaS</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button onClick={logout} className="p-2 text-gray-500 hover:text-red-600">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
           >
             + Add Transaction
           </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <span className="text-green-600 font-bold">↑</span>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Income</dt>
                  <dd className="text-lg font-medium text-gray-900">${stats?.income || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                <span className="text-red-600 font-bold">↓</span>
              </div>
               <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Expenses</dt>
                  <dd className="text-lg font-medium text-gray-900">${stats?.expense || 0}</dd>
                </dl>
              </div>
            </div>
          </div>

           <div className="bg-white overflow-hidden shadow rounded-lg p-5">
             <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                <span className="text-blue-600 font-bold">$</span>
              </div>
               <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Net Balance</dt>
                  <dd className="text-lg font-medium text-gray-900">${stats?.balance || 0}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Charts Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Financial Overview</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Income', amount: stats?.income || 0 },
                    { name: 'Expense', amount: stats?.expense || 0 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white shadow rounded-lg p-6">
             <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Transactions</h3>
             <TransactionList />
          </div>
        </div>

      </main>

      <AddTransactionForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
