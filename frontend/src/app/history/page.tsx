'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal, ArrowRightLeft } from 'lucide-react';

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
      case 'RECEIPT': return <ArrowDownToLine size={16} className="text-green-500" />;
      case 'DELIVERY': return <ArrowUpFromLine size={16} className="text-red-500" />;
      case 'INTERNAL_TRANSFER': return <ArrowRightLeft size={16} className="text-purple-500" />;
      case 'ADJUSTMENT': return <SlidersHorizontal size={16} className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Move History</h1>

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
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-900 text-sm">
                  <td className="p-4 flex items-center space-x-2">
                    {getIcon(m.type)}
                    <span className="font-medium text-gray-200">{m.type}</span>
                  </td>
                  <td className="p-4 text-gray-400">{new Date(m.created_at).toLocaleString()}</td>
                  <td className="p-4 font-medium text-gray-100">{m.product?.name || 'Unknown'}</td>
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
