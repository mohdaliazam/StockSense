'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReceiptsPage() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Hardcoding dest_location_id to simulate the Main Warehouse Rack for the demo
      // In a real app, we'd fetch locations and let them select
      await axios.post('http://localhost:5000/api/moves', {
        product_id: productId,
        quantity: parseFloat(quantity),
        type: 'RECEIPT',
        status: 'DONE',
        dest_location_id: products[0]?.inventoryLevel[0]?.location_id // Quick hackathon fallback
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStatusMsg('Receipt Validated Successfully! Stock updated.');
      setQuantity('');
      setProductId('');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      setStatusMsg('Error validating receipt.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Incoming Receipts</h1>
      <p className="text-gray-400 mb-8">Log stock received from suppliers to instantly increase inventory.</p>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 max-w-2xl relative">
        {statusMsg && (
          <div className={`absolute top-4 right-4 p-3 rounded-md text-sm font-bold shadow-lg ${statusMsg.includes('Error') ? 'bg-red-500' : 'bg-green-500'} text-white`}>
            {statusMsg}
          </div>
        )}

        <h2 className="text-xl font-bold mb-4 text-white">Create Receipt</h2>
        <form onSubmit={handleValidate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Product</label>
            <select 
              required
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Product...</option>
              {products.map((p: any) => (
                <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Quantity Received</label>
            <input 
              required
              type="number" 
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 bg-gray-900 border border-gray-700 text-white rounded-md focus:ring-blue-500 focus:border-blue-500" 
              placeholder="e.g. 50" 
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-bold transition-colors">
            Validate Receipt
          </button>
        </form>
      </div>
    </div>
  );
}
