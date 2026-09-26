# 📦 StockSense - Modular Inventory Management System

![StockSense Banner](https://img.shields.io/badge/StockSense-Inventory%20Management-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)
![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?style=for-the-badge&logo=prisma)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Dark_Mode-38B2AC?style=for-the-badge&logo=tailwind-css)

StockSense is a highly modular, real-time **Inventory Management System (IMS)** built to digitize and streamline all stock-related operations within a business. Designed for modern warehouses, it replaces scattered Excel sheets and manual tracking registers with a centralized, responsive, and easy-to-use platform.

---

## ✨ Features

- **🔒 Secure Authentication:** Role-based access control (Inventory Managers vs. Warehouse Staff) backed by JWT authentication.
- **📊 Interactive Dashboard:** Real-time KPIs tracking Total Products, Low Stock Items, Pending Receipts, and Scheduled Transfers.
- **📦 Product Management:** Seamlessly manage your catalog (SKU, Categories, Unit of Measure).
- **🔄 Core Operations Logging:**
  - **Receipts (Incoming):** Log goods received from vendors to automatically increase stock.
  - **Deliveries (Outgoing):** Log goods shipped to customers to automatically decrease stock.
  - **Internal Transfers:** Move stock between warehouses, racks, or production floors.
  - **Stock Adjustments:** Instantly sync physical counts with system records.
- **📖 Immutable Move History:** A complete, unalterable ledger of every single stock movement, tracking who moved what, when, and where.
- **🌙 Sleek Dark Mode UI:** A fully responsive, modern dark-themed interface optimized for warehouse environments.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 14 (React)
* **Styling:** Tailwind CSS (Dark Mode integrated)
* **Icons:** Lucide React
* **Data Fetching:** Axios

### Backend
* **Framework:** Node.js with Express.js
* **Language:** TypeScript
* **Database ORM:** Prisma
* **Database:** SQLite (Default for easy local testing, easily configurable to PostgreSQL)
* **Security:** bcryptjs (password hashing), jsonwebtoken (JWT)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/mohdaliazam/StockSense.git
cd StockSense
```

### 2. Run the Backend
```bash
cd backend
npm install
npm run dev
```
*The backend server will start on `http://localhost:5000`*

*(Optional) To seed a test user:*
```bash
npx tsc
node dist/seed.js
```
*Test Credentials: `admin@stocksense.com` / `password123`*

### 3. Run the Frontend
```bash
cd ../frontend
npm install
npm run dev
```
*The Next.js frontend will start on `http://localhost:3000`*

---

## 🏗️ Architecture Overview
StockSense operates on a decoupled client-server architecture. 
- The **Backend API** exposes RESTful endpoints secured via JWT middleware. It uses Prisma Client to atomically execute stock movements and ensure the `InventoryLevel` table is accurately adjusted based on the specific `StockMove` type.
- The **Frontend App** uses Next.js to provide a fast, client-side rendered dashboard (via `use client`) for real-time interactivity without full page reloads.

---

*Submitted with ❤️ for the Hackathon.*
