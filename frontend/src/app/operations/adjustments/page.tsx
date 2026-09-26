'use client';

import React from 'react';

export default function AdjustmentsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Inventory Adjustments</h1>
      <p className="text-gray-300 mb-8">Fix mismatches between physical count and recorded stock.</p>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">New Adjustment</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Product</label>
            <select className="w-full p-2 border border-gray-600 rounded-md">
              <option>Select Product...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Counted Quantity (Real Stock)</label>
            <input type="number" className="w-full p-2 border border-gray-600 rounded-md" placeholder="e.g. 98" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Location</label>
            <select className="w-full p-2 border border-gray-600 rounded-md">
              <option>Select Rack/Warehouse...</option>
            </select>
          </div>
          <button type="button" className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 font-medium">
            Apply Adjustment
          </button>
        </form>
      </div>
    </div>
  );
}
