# Database Schema

## users

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| first_name | VARCHAR(100) | No | |
| last_name | VARCHAR(100) | No | |
| email | VARCHAR(255) | No | UNIQUE |
| phone | VARCHAR(30) | Yes | |
| role | UserRole | No | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

---

## stores

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| owner_id | UUID | No | FK -> users.id |
| name | VARCHAR(150) | No | |
| description | TEXT | Yes | |
| address | TEXT | No | |
| latitude | DECIMAL(10,7) | No | |
| longitude | DECIMAL(10,7) | No | |
| phone | VARCHAR(30) | Yes | |
| is_open | BOOLEAN | No | DEFAULT TRUE |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

---

## categories

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| name | VARCHAR(100) | No | UNIQUE |
| slug | VARCHAR(100) | No | UNIQUE |

---

## products

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| store_id | UUID | No | FK -> stores.id |
| category_id | UUID | No | FK -> categories.id |
| name | VARCHAR(200) | No | |
| description | TEXT | Yes | |
| price | DECIMAL(10,2) | No | |
| stock | INTEGER | No | |
| image_url | TEXT | Yes | |
| active | BOOLEAN | No | DEFAULT TRUE |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |

---

## orders

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| customer_id | UUID | No | FK -> users.id |
| store_id | UUID | No | FK -> stores.id |
| status | OrderStatus | No | |
| total | DECIMAL(10,2) | No | |
| created_at | TIMESTAMP | No | |
| updated_at | TIMESTAMP | No | |
| expired_at | TIMESTAMP | No | |

---

## order_items

| Column | Type | Nullable | Constraints |
|----------|---------|----------|----------------------------|
| id | UUID | No | PK |
| order_id | UUID | No | FK -> orders.id |
| product_id | UUID | No | FK -> products.id |
| quantity | INTEGER | No | |
| price | DECIMAL(10,2) | No | Unit price at purchase |

---

# Indexes

users.email

products.store_id

products.category_id

orders.customer_id

orders.store_id

order_items.order_id

order_items.product_id

# Relationship
![Image of class diagram](../../public/Class-Diagram.JPG "Class diagram")