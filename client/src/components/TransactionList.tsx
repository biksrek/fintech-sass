import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';

const fetchTransactions = async () => {
  const { data } = await api.get('/transactions');
  return data;
};

const TransactionList: React.FC = () => {
  const { data: transactions, isLoading } = useQuery({ queryKey: ['transactions'], queryFn: fetchTransactions });
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/transactions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  if (isLoading) return <div>Loading transactions...</div>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {transactions?.map((transaction: any) => (
          <li key={transaction._id}>
            <div className="px-4 py-4 flex items-center justify-between sm:px-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <span className={`text-lg ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{transaction.category}</div>
                  <div className="text-sm text-gray-500">{transaction.description}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className={`mr-4 text-sm font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                   {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                </div>
                <button
                  onClick={() => deleteMutation.mutate(transaction._id)}
                  className="text-red-400 hover:text-red-600 text-xs uppercase font-bold"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
        {transactions?.length === 0 && (
          <li className="px-4 py-4 text-center text-gray-500">No transactions yet.</li>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
