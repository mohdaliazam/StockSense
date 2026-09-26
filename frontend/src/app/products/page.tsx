'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Search, QrCode, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qrProduct, setQrProduct] = useState<any>(null);

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
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your catalog and generate QR labels.</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus size={20} />
          <span>New Product</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 overflow-hidden relative">
        <div className="p-4 border-b border-gray-700 flex items-center space-x-2 bg-gray-900">
          <Search size={20} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search products by SKU or Name..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-white placeholder-gray-500"
          />
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-900 border-b border-gray-700 text-sm text-gray-400">
              <th className="p-4 font-medium">SKU / Code</th>
              <th className="p-4 font-medium">Product Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Unit</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-400">Loading catalog...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-400">No products found. Click 'New Product' to add one.</td></tr>
            ) : (
              products.map((p: any) => (
                <tr key={p.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-4 text-sm font-medium text-white">{p.sku}</td>
                  <td className="p-4 text-sm text-gray-200">{p.name}</td>
                  <td className="p-4 text-sm text-gray-400">{p.category}</td>
                  <td className="p-4 text-sm text-gray-400">{p.uom}</td>
                  <td className="p-4 text-sm font-bold text-white">
                    {p.inventoryLevel?.reduce((sum: number, lvl: any) => sum + lvl.quantity, 0) || 0}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => setQrProduct(p)}
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      <QrCode size={18} />
                      <span className="text-xs">QR Label</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QR Code Modal */}
      {qrProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full relative text-center">
            <button 
              onClick={() => setQrProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{qrProduct.name}</h2>
            <p className="text-gray-500 mb-8 font-mono">SKU: {qrProduct.sku}</p>
            
            <div className="flex justify-center bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
              <QRCodeSVG 
                value={`stocksense://product/${qrProduct.id}`} 
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            
            <button 
              onClick={() => window.print()}
              className="bg-blue-600 text-white w-full py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Print Label
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
