# StockSense - Inventory Management System

## Overview
StockSense is a modular Inventory Management System (IMS) that digitizes and streamlines all stock-related operations within a business. It replaces manual registers and Excel sheets with a centralized, real-time, easy-to-use application.

## Target Users
* **Inventory Managers**: Manage incoming & outgoing stock, oversee operations.
* **Warehouse Staff**: Perform transfers, picking, shelving, and stock counting.

## Core Features
1. **Authentication**: Secure login/signup, OTP-based password reset, role-based redirection.
2. **Dashboard**: KPIs (Total Products, Low Stock, Pending Receipts/Deliveries, Scheduled Transfers) and dynamic filters.
3. **Product Management**: Create and track products (Name, SKU, Category, UoM).
4. **Operations**:
   * **Receipts (Incoming)**: Log goods received from vendors (increases stock).
   * **Delivery Orders (Outgoing)**: Log goods shipped to customers (decreases stock).
   * **Internal Transfers**: Move stock between warehouses or racks.
   * **Stock Adjustments**: Fix physical vs. recorded stock mismatches.
5. **Move History**: Complete ledger of all inventory transactions.

## Tech Stack
* **Frontend**: Next.js (React), TailwindCSS
* **Backend**: Node.js, Express
* **Database**: PostgreSQL with Prisma ORM
