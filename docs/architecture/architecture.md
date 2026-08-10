# Architecture

## Overview

Calabaza is a monolithic web application built with Next.js.

The project intentionally starts as a monolith because the initial business requirements are relatively simple, the development team is small, and deployment should remain straightforward.

This architecture allows fast iteration while maintaining clear module boundaries that could later be extracted into independent services if necessary.

## Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | Next.js (React + App Router) |
| Backend | Next.js Route Handlers |
| ORM | Prisma |
| Database | PostgreSQL |
| Styling | Tailwind CSS |

## High-Level Architecture

```
Browser
      │
      ▼
 Next.js Application
 ├── Frontend
 ├── API Routes
 ├── Business Logic
 └── Prisma
      │
      ▼
 PostgreSQL
```

There is a single deployable application.

The frontend communicates only with the internal API.

Business logic must never be implemented directly inside React components.

## Layer Responsibilities

### Frontend

Responsible for:

- Rendering the user interface
- Managing client state
- Calling the backend API
- User interactions

### Backend

Responsible for:

- Business rules
- Validation
- Authentication and authorization
- Database access
- Transaction management

### Database

Responsible only for persistence.

Business rules belong in the backend.

## Project Philosophy

The architecture follows several principles:

- Keep the system simple.
- Prefer explicit code over clever abstractions.
- Separate business logic from infrastructure.
- Keep modules independent.
- Optimize for readability.
- Favor maintainability over premature optimization.

## Module Boundaries

Although deployed as a monolith, the application should be organized into clear business modules, for example:

- Authentication
- Users
- Stores
- Products
- Orders

Modules should communicate through service interfaces rather than directly accessing each other's persistence layer whenever possible.

## Related Documentation

- [Domain](domain.md)
- [Backend](backend.md)
- [Frontend](frontend.md)
- [API](api.md)