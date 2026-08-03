# Backend

## Overview

The backend is implemented using Next.js Route Handlers.

Business rules are implemented inside service classes rather than directly inside route handlers.

## Responsibilities

The backend is responsible for:

- validation;
- authentication;
- authorization;
- business rules;
- database access;
- transactions.

## Layer Structure

Recommended structure:

```
routes
    │
    ▼
services
    │
    ▼
repositories (Prisma)
    │
    ▼
PostgreSQL
```

## Route Handlers

Route handlers should:

- validate requests;
- call services;
- return HTTP responses.

They should not contain business logic.

## Services

Services contain:

- business rules;
- domain validation;
- transaction coordination.

## Data Access

Prisma is the only layer allowed to access PostgreSQL.

Business logic should not depend on SQL.

## Validation

All incoming requests must be validated before processing.

Validation errors should return appropriate HTTP status codes.

## Transactions

Operations affecting multiple entities should execute inside database transactions whenever consistency is required.

Example:

- create order
- decrease stock
- create order items

These operations must succeed or fail together.

## Error Handling

Business errors should return meaningful HTTP responses.

Unexpected errors should be logged without exposing internal details.

## Related Documentation

- [Architecture](architecture.md)
- [Domain](domain.md)
- [API](api.md)