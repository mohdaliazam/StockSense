'use client';

import React from 'react';

export default function DeliveriesPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Outgoing Deliveries</h1>
      <p className="text-gray-300 mb-8">Log stock shipped to customers to decrease inventory.</p>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">Create Delivery Order</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Product</label>
            <select className="w-full p-2 border border-gray-600 rounded-md">
              <option>Select Product...</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Quantity Shipped</label>
            <input type="number" className="w-full p-2 border border-gray-600 rounded-md" placeholder="e.g. 10" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Source Location</label>
            <select className="w-full p-2 border border-gray-600 rounded-md">
              <option>Select Rack/Warehouse...</option>
            </select>
          </div>
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium">
            Validate Delivery
          </button>
        </form>
      </div>
    </div>
  );
}
