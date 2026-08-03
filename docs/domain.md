# Domain

## Overview

Calabaza is a local-commerce platform that connects customers with nearby stores.

Customers reserve products online and complete the purchase by paying in person when picking them up.

This approach minimizes implementation complexity while allowing stores to manage inventory through the platform.

## Core Entities

- User
- Store
- Product
- Category
- Order
- OrderItem

## Order Lifecycle

An order is created as soon as the customer confirms the purchase.

At that moment:

- stock is reserved;
- the order receives an expiration date (`expired_at`);
- other customers cannot purchase the reserved stock.

If the customer does not pick up the order before its expiration:

- the order becomes **Canceled**;
- reserved stock is returned.

There is no separate Reservation entity.

The Order itself represents the reservation.

## Order Status

Pending
Ready for Pickup
Completed
Canceled


## Inventory Rules

Creating an order decreases stock immediately.

Canceling an expired order restores stock.

Stock is never modified directly by the frontend.

## Store Ownership

Version 1.0 assumes:

- one user owns one store.

The domain model should remain flexible enough to support multiple stores per user in the future.

## Pickup Model

Version 1.0 supports only in-store pickup.

Online payment and shipping are intentionally out of scope.

## Design Decisions

### Why reserve stock immediately?

This guarantees that customers cannot reserve products already claimed by another customer.

### Why use Order instead of Reservation?

The reservation exists only as a temporary state of an order.

Introducing another entity would duplicate information without adding business value.

## Related Documentation

- [Architecture](architecture.md)
- [Backend](backend.md)