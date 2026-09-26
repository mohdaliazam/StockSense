# Architecture Map

## Overview
StockSense uses a decoupled client-server architecture.

## 1. Frontend (`/frontend`)
* **Framework**: Next.js (React)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **State Management**: React Context / Zustand (if necessary)
* **Communication**: REST API calls to the backend

## 2. Backend (`/backend`)
* **Framework**: Node.js + Express
* **Language**: TypeScript
* **Database Access**: Prisma ORM
* **Authentication**: JSON Web Tokens (JWT)
* **Structure**:
  * `routes/`: Define API endpoints and map them to controllers.
  * `controllers/`: Handle HTTP request/response parsing.
  * `services/`: Core business logic and database interactions.
  * `middleware/`: Auth verification, error handling, etc.

## 3. Database (`PostgreSQL`)
* Managed via Prisma.
* All data access must flow through Prisma Client in the `services/` folder.
