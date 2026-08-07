# PROJECT.md

> **PROJECT.md is the single source of truth for Calabaza.**
>
> All business rules, project scope, and product decisions are defined here. If another document conflicts with this one, **PROJECT.md takes precedence**.

---

# Calabaza

## Vision

Calabaza is a location-first marketplace that helps customers discover and reserve products from nearby local stores.

Unlike traditional marketplaces, Calabaza prioritizes proximity. When a customer searches for a product, the closest stores should appear first, encouraging local commerce and making it easier to support nearby businesses.

The platform focuses on reservations and in-store pickup instead of online payments or delivery.

---

# Core Principles

Every decision should follow these principles.

1. Build the MVP first.
2. Keep the solution simple.
3. Prioritize local commerce.
4. Follow framework conventions.
5. Optimize for maintainability.
6. Do not solve problems that do not exist yet.

---

# Development Philosophy

## MVP First

Build the smallest product capable of validating the business idea.

Features that are not required for validation should be postponed.

---

## Simplicity Over Complexity

Prefer simple, readable solutions.

Avoid unnecessary abstractions and premature optimization.

---

## Convention Over Configuration

Use the standard way of doing things whenever possible.

Follow the conventions of Next.js, Prisma and PostgreSQL.

---

## Readability First

Code is written for humans.

Use clear names, small components and straightforward logic.

---

## Build for Today

Design software that can evolve, but implement only today's requirements.

---

## User Experience First

Every feature should improve the experience of either customers or store owners.

---

# Technology Stack

| Technology | Choice |
|------------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Styling | Tailwind CSS |

---

# Glossary

### Customer

A user who searches for and reserves products.

### Store Owner

A user who owns and manages a store.

### Store

A business registered on Calabaza.

### Product

An item sold by a single store.

Products are **store-specific**.

###Category

A product has a category

### Order

Represents a reservation created by a customer.

There is **no separate Reservation entity**.

### Pickup

The customer visits the store, pays in person and receives the reserved products.

---

# Target Users

## Customers

Customers can:

- Register
- Browse stores
- Search products
- Reserve products
- View reservation status
- Pick up and pay in person

---

## Store Owners

Store owners can:

- Register
- Create a store
- Manage products
- Manage inventory
- Receive reservations
- Prepare orders

---

# MVP Scope

## Included

- Authentication
- Store management
- Product management
- Product search
- Shopping cart
- Reservations
- Reservation status
- Pickup workflow

---

## Out of Scope

The MVP intentionally does **not** include:

- Online payments
- Delivery
- Reviews
- Ratings
- Coupons
- Loyalty programs
- Chat
- Multiple stores per owner
- Store branches

---

# Domain Model

```
User
 └── owns → Store

Store
 ├── Products
 ├── Orders
 └── Location

Product
 └── belongs to Store
 └── Category


Order
 ├── Customer
 ├── Store
 └── OrderItems

OrderItem
 └── Product
```

---

# Business Rules

## Stores

- One user owns one store.
- One store has one physical location.
- Stores are identified by latitude and longitude.

---

## Products

- Products belong to one store.
- Every store manages its own catalog.
- Different stores may sell products with the same name.

---

## Search

Search results prioritize nearby stores.

Distance is calculated using the customer's and store's coordinates.

---

## Customer Location

The application should request the customer's browser location.

If the customer denies permission, they may manually enter an address.

The entered address is converted into coordinates.

All distance calculations use coordinates.

---

## Orders

Orders represent reservations.

Lifecycle:

```
Pending
    ↓
Preparing
    ↓
Ready for Pickup
    ↓
Completed

Any state
    ↓
Cancelled
```

Reservations:

- Reserve stock immediately.
- Expire after 48 hours.
- Automatically release stock when expired.

Future versions may allow customers to choose a pickup date (maximum five days after creating the reservation).

---

## Reservation Expiration

Reservations expire automatically after 48 hours.

For the MVP, expiration is evaluated whenever an order is accessed.

Future versions may use scheduled background jobs.

---

## Order Cancellation

Customers may cancel reservations while the order is in the Pending or Preparing states.

Once an order is Ready for Pickup, only the store may cancel it.

---

## Design System & UI

### Color Palette & Tokens
- Primary: `#E36414` <span style="color:#E36414">&#9724;<span>
- Secondary: `#2D5A27` <span style="color:#2D5A27">&#9724;<span>
- Accent / Tertiary: `#F28C28` <span style="color:#F28C28">&#9724;<span>
- Neutral: `#FFFBF2` <span style="color:#FFFBF2">&#9724;<span> 
- Font Headline: Manrope
- Font Body: Hanken Grotesk 

### Responsive Guidelines
- **Approach**: Mobile-First.
- **Breakpoints**: Standard Tailwind breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
- **Layout Requirements**:
  - All pages and UI components must be fully usable on mobile screens (360px+).
  - Use responsive layouts (e.g., single column on mobile, multi-column grid/flex on `md:` and above).

---
# Coding Conventions

- Use English for code.
- Use PascalCase for React components.
- Use camelCase for variables and functions.
- Use singular model names.
- Use kebab-case for route folders.