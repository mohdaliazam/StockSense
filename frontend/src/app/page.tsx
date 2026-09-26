'use client';

import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({ total: 0, lowStock: 0, pending: 0, transfers: 0 });

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Inventory Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-blue-900/40 text-blue-400 rounded-full">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-white">{metrics.total}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-red-900/40 text-red-400 rounded-full">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Low Stock Items</p>
            <p className="text-2xl font-bold text-white">{metrics.lowStock}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-green-900/40 text-green-400 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Pending Receipts</p>
            <p className="text-2xl font-bold text-white">{metrics.pending}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 flex items-center space-x-4">
          <div className="p-3 bg-purple-900/40 text-purple-400 rounded-full">
            <ArrowRightLeft size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Scheduled Transfers</p>
            <p className="text-2xl font-bold text-white">{metrics.transfers}</p>
          </div>
        </div>
      </div>

      <div className="mt-12 bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Recent Operations</h2>
        <div className="text-gray-400 flex items-center justify-center h-48 border-2 border-dashed border-gray-700 rounded-lg">
          No recent operations found.
        </div>
      </div>
    </div>
  );
}
