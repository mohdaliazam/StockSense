'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700">
          <Plus size={20} />
          <span>New Product</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 flex items-center space-x-2 bg-gray-900">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products by SKU or Name..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
          />
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-sm text-gray-400">
              <th className="p-4 font-medium">SKU / Code</th>
              <th className="p-4 font-medium">Product Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Unit of Measure</th>
              <th className="p-4 font-medium">Total Stock</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-400">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-4 text-center text-gray-400">No products found. Click 'New Product' to add one.</td></tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-900">
                  <td className="p-4 text-sm font-medium text-gray-100">{p.sku}</td>
                  <td className="p-4 text-sm text-gray-200">{p.name}</td>
                  <td className="p-4 text-sm text-gray-400">{p.category}</td>
                  <td className="p-4 text-sm text-gray-400">{p.uom}</td>
                  <td className="p-4 text-sm font-bold text-white">
                    {p.inventoryLevel.reduce((sum: number, lvl: any) => sum + lvl.quantity, 0)}
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
