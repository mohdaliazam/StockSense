'use client';

import React, { useState, useEffect } from 'react';
import { Package, AlertCircle, ArrowRightLeft, TrendingUp, Sparkles, AlertTriangle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({ total: 42, lowStock: 3, pending: 15, transfers: 4 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      <h1 className="text-3xl font-bold mb-8 text-white">Inventory Dashboard</h1>
      
      {/* Predictive Analytics Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-600 rounded-lg text-white shadow-md">
            <Sparkles size={24} />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center space-x-2">
              <span>StockSense Predictive Insights</span>
              <span className="bg-blue-600 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-bold">AI Active</span>
            </h2>
            <p className="text-blue-200 mb-4 text-sm leading-relaxed">
              Based on rolling 30-day velocity, <strong className="text-white">Steel Rods (SKU-892)</strong> are depleting 24% faster than historical averages due to increased production demand.
            </p>
            <div className="flex items-center space-x-3 bg-gray-900/50 rounded-lg p-3 border border-blue-900/50 inline-flex">
              <AlertTriangle size={18} className="text-yellow-400" />
              <span className="text-gray-300 text-sm">Predicted stockout: <strong className="text-white">Thursday, Oct 1st</strong></span>
              <div className="w-px h-4 bg-gray-700 mx-2"></div>
              <button className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors">
                Generate Auto-PO →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-200">
          <div className="p-4 bg-blue-900/40 text-blue-400 rounded-xl">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Total Products</p>
            <p className="text-3xl font-black text-white tracking-tight">{metrics.total}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-200">
          <div className="p-4 bg-red-900/40 text-red-400 rounded-xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Low Stock Items</p>
            <p className="text-3xl font-black text-white tracking-tight">{metrics.lowStock}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-200">
          <div className="p-4 bg-green-900/40 text-green-400 rounded-xl">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Pending Receipts</p>
            <p className="text-3xl font-black text-white tracking-tight">{metrics.pending}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-700 flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-200">
          <div className="p-4 bg-purple-900/40 text-purple-400 rounded-xl">
            <ArrowRightLeft size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400 font-medium">Scheduled Transfers</p>
            <p className="text-3xl font-black text-white tracking-tight">{metrics.transfers}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-4 text-white">Recent Operations</h2>
        <div className="text-gray-400 flex items-center justify-center h-48 border-2 border-dashed border-gray-700 rounded-lg">
          No recent operations found.
        </div>
      </div>
    </div>
  );
}
