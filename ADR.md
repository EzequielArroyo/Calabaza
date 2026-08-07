# ADR.md

# Architecture Decision Records

This document records important architectural and business decisions.

These decisions preserve the reasoning behind the project and should be updated instead of forgotten.

---

## Rules

- Never modify historical decisions.
- Add new decisions sequentially.
- A decision may become **Deprecated** or **Superseded**, but its history should remain.

---

# ADR-001

## Status

Accepted

## Decision

One user owns one store.

## Context

Supporting multiple stores increases complexity without providing value for the MVP.

## Consequences

- Simpler permissions.
- Simpler UI.
- Simpler data model.

## Future

Allow one user to own multiple stores if needed.

---

# ADR-002

## Status

Accepted

## Decision

A store has one physical location.

## Context

The platform focuses on local discovery.

## Consequences

Distance calculations remain straightforward.

## Future

Support multiple branches.

---

# ADR-003

## Status

Accepted

## Decision

Products belong to individual stores.

## Context

A shared catalog introduces unnecessary complexity.

## Consequences

Each store manages its own products, prices and inventory.

## Future

Introduce a global catalog if required.

---

# ADR-004

## Status

Accepted

## Decision

Orders represent reservations.

## Context

The MVP validates local commerce, not online payments.

## Consequences

- No payment gateway.
- Pickup only.
- Simpler workflow.

---

# ADR-005

## Status

Accepted

## Decision

Payment happens in person.

## Context

Avoid payment processing during the MVP.

## Consequences

The platform is not responsible for transactions.

---

# ADR-006

## Status

Accepted

## Decision

Reservations expire after 48 hours.

## Context

Products should not remain reserved indefinitely.

## Consequences

Reserved stock automatically returns to inventory.

## Future

Allow customers to choose a pickup date (up to five days).

---

# ADR-007

## Status

Accepted

## Decision

Search prioritizes nearby stores.

## Context

Proximity is Calabaza's main differentiator.

## Consequences

Location is a core ranking factor.

---

# ADR-008

## Status

Accepted

## Decision

Technology stack.

## Choice

- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS

## Context

Provides a productive and scalable foundation for the MVP.

## ADR-009

### Status
Accepted

### Decision
UI Design System and Responsive Strategy.

### Choice
1. **Palette & Typography**:
   - Primary: `#E36414` 
   - Secondary: `#2D5A27` 
   - Accent / Tertiary: `#F28C28` 
   - Neutral: `#FFFBF2`
   - Font Family: Inter / Sans-serif
2. **Responsive Approach**: Mobile-first design pattern. Desktop layout adapts via Tailwind CSS grid and flex utilities (`md:`, `lg:`).

### Context
Standardizing colors, typography, and responsive rules ensures visual consistency and prevents AI coding agents from generating arbitrary styling classes or desktop-only layouts.

### Consequences
All UI components must strictly use theme tokens and responsive utility classes.