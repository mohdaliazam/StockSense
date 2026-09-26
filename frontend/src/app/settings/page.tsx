'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-white">Settings</h1>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700 max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">Warehouse Configurations</h2>
        <p className="text-gray-300 mb-4">Manage locations, users, and overall system settings.</p>
        
        <div className="space-y-4">
          <button className="w-full text-left p-4 border border-gray-700 rounded-md hover:bg-gray-900 font-medium text-white">
            Manage Warehouses & Racks
          </button>
          <button className="w-full text-left p-4 border border-gray-700 rounded-md hover:bg-gray-900 font-medium text-white">
            Manage Users & Roles
          </button>
        </div>
      </div>
    </div>
  );
}
