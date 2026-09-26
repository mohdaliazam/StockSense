# Database Schema (Prisma Design)

This is the planned data model for StockSense.

## Models

### User
* `id`: UUID (Primary Key)
* `email`: String (Unique)
* `password_hash`: String
* `role`: Enum (INVENTORY_MANAGER, WAREHOUSE_STAFF)
* `created_at`: DateTime

### Product
* `id`: UUID (Primary Key)
* `name`: String
* `sku`: String (Unique)
* `category`: String
* `uom`: String (Unit of Measure)
* `created_at`: DateTime

### Warehouse
* `id`: UUID (Primary Key)
* `name`: String
* `location`: String

### Location (Racks/Shelves within Warehouse)
* `id`: UUID (Primary Key)
* `warehouse_id`: UUID (Foreign Key)
* `name`: String

### InventoryLevel (Current stock per location)
* `id`: UUID (Primary Key)
* `product_id`: UUID (Foreign Key)
* `location_id`: UUID (Foreign Key)
* `quantity`: Float

### StockMove (Ledger of all operations)
* `id`: UUID (Primary Key)
* `product_id`: UUID (Foreign Key)
* `source_location_id`: UUID (Foreign Key, nullable for Receipts)
* `dest_location_id`: UUID (Foreign Key, nullable for Deliveries)
* `quantity`: Float
* `type`: Enum (RECEIPT, DELIVERY, INTERNAL_TRANSFER, ADJUSTMENT)
* `status`: Enum (DRAFT, WAITING, READY, DONE, CANCELED)
* `created_at`: DateTime
* `created_by`: UUID (Foreign Key -> User)
