# API

## Overview

The frontend communicates with the backend through a REST API.

All endpoints exchange JSON.

## Design Principles

The API follows these principles:

- resource-oriented URLs;
- standard HTTP methods;
- consistent response formats;
- predictable status codes.

## HTTP Methods

| Method | Purpose |
|---------|----------|
| GET | Read resources |
| POST | Create resources |
| PUT | Replace resources |
| PATCH | Partial updates |
| DELETE | Remove resources |

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource created |
| 204 | No content |
| 400 | Validation error |
| 401 | Authentication required |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Business conflict |
| 500 | Internal server error |

## Versioning

Version 1.0 does not use URL versioning.

Future breaking changes may introduce `/api/v2`.

## Resource Naming

Use plural resource names.

Examples:

```
/stores
/products
/orders
/users
```

## JSON

Use camelCase for JSON properties.

Example:

```json
{
  "orderId": 10,
  "createdAt": "...",
  "expiredAt": "..."
}
```

## Error Responses

Error responses should include enough information for clients to react appropriately without exposing internal implementation details.

Example:

```json
{
  "error": "ValidationError",
  "message": "Quantity must be greater than zero."
}
```

## Authentication

Authenticated endpoints require a valid authentication token.

Authentication implementation details are handled by the backend and should remain transparent to API consumers.

## Related Documentation

- [Backend](backend.md)
- [Domain](domain.md)