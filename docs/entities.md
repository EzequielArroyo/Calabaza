# Domain Entities

This document describes every business entity in the Calabaza domain.

---

# User

Represents a person using the platform.

A user can:

- Buy products
- Own one store (MVP)
- Manage their store inventory
- View order history

## Attributes

| Field | Type | Description |
|---------|------|-------------|
| id | UUID | Unique identifier |
| firstName | String | User first name |
| lastName | String | User last name |
| email | String | Login email |
| phone | String? | Optional phone |
| role | UserRole | CUSTOMER or STORE_OWNER |
| createdAt | DateTime | Creation date |
| updatedAt | DateTime | Last update |

---

# Store

Represents a local business selling products.

## Attributes

| Field | Type |
|---------|------|
| id | UUID |
| ownerId | UUID |
| name | String |
| description | String |
| address | String |
| latitude | Decimal |
| longitude | Decimal |
| phone | String |
| isOpen | Boolean |
| createdAt | DateTime |
| updatedAt | DateTime |

---

# Category

Groups products.

## Attributes

| Field | Type |
|---------|------|
| id | UUID |
| name | String |
| slug | String |

---

# Product

Represents an item offered by a store.

## Attributes

| Field | Type |
|---------|------|
| id | UUID |
| storeId | UUID |
| categoryId | UUID |
| name | String |
| description | Text |
| price | Decimal |
| stock | Integer |
| imageUrl | String? |
| active | Boolean |
| createdAt | DateTime |
| updatedAt | DateTime |

---

# Order

Represents a purchase reservation.

An order is created immediately when the customer confirms the purchase.

Products are reserved by reducing stock.

If the order expires before pickup, it is automatically cancelled and stock is restored.

## Attributes

| Field | Type |
|---------|------|
| id | UUID |
| customerId | UUID |
| storeId | UUID |
| status | OrderStatus |
| total | Decimal |
| createdAt | DateTime |
| updatedAt | DateTime |
| expiredAt | DateTime |

---

# OrderItem

Represents a purchased product.

## Attributes

| Field | Type |
|---------|------|
| id | UUID |
| orderId | UUID |
| productId | UUID |
| quantity | Integer |
| price | Decimal |

The `price` stores the unit price at purchase time to preserve historical accuracy.