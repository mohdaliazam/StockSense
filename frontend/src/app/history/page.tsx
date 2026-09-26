'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal, ArrowRightLeft, Download } from 'lucide-react';

export default function HistoryPage() {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMoves = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/moves', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMoves(res.data);
      } catch (err) {
        console.error('Failed to fetch moves', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoves();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'RECEIPT': return <ArrowDownToLine size={16} className="text-green-400" />;
      case 'DELIVERY': return <ArrowUpFromLine size={16} className="text-red-400" />;
      case 'INTERNAL_TRANSFER': return <ArrowRightLeft size={16} className="text-purple-400" />;
      case 'ADJUSTMENT': return <SlidersHorizontal size={16} className="text-blue-400" />;
      default: return null;
    }
  };

  const exportCSV = () => {
    if (moves.length === 0) return;
    const headers = ['Date', 'Type', 'Product', 'Quantity', 'From', 'To', 'Status', 'Logged By'];
    const rows = moves.map((m: any) => [
      new Date(m.created_at).toLocaleString(),
      m.type,
      m.product?.name || 'Unknown',
      m.quantity,
      m.sourceLocation?.name || '-',
      m.destLocation?.name || '-',
      m.status,
      m.user?.email || 'Unknown'
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `StockSense_Ledger_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Move History</h1>
          <p className="text-gray-400">Immutable ledger of all inventory transactions.</p>
        </div>
        <button 
          onClick={exportCSV}
          disabled={moves.length === 0}
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-gray-700 disabled:opacity-50 transition-colors"
        >
          <Download size={20} />
          <span>Export to CSV</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-sm text-gray-400">
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Quantity</th>
              <th className="p-4 font-medium">From</th>
              <th className="p-4 font-medium">To</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-4 text-center text-gray-400">Loading ledger...</td></tr>
            ) : moves.length === 0 ? (
              <tr><td colSpan={7} className="p-4 text-center text-gray-400">No stock movements recorded yet.</td></tr>
            ) : (
              moves.map((m: any) => (
                <tr key={m.id} className="border-b border-gray-700 hover:bg-gray-700 text-sm transition-colors">
                  <td className="p-4 flex items-center space-x-2">
                    {getIcon(m.type)}
                    <span className="font-medium text-gray-200">{m.type}</span>
                  </td>
                  <td className="p-4 text-gray-400">{new Date(m.created_at).toLocaleString()}</td>
                  <td className="p-4 font-medium text-white">{m.product?.name || 'Unknown'}</td>
                  <td className="p-4 text-gray-200 font-bold">{m.quantity}</td>
                  <td className="p-4 text-gray-400">{m.sourceLocation?.name || '-'}</td>
                  <td className="p-4 text-gray-400">{m.destLocation?.name || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      m.status === 'DONE' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
