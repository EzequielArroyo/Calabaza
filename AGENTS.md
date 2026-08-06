# AGENTS.md

Before implementing any feature, always read PROJECT.md and ADR.md to understand the project's business rules and architectural decisions. Never assume requirements that are not documented.

## Purpose

This document defines how AI agents should contribute to Calabaza.

Before making changes, read:

1. PROJECT.md
2. ADR.md

PROJECT.md is the source of truth.

---

# Responsibilities

Your goal is to help build the MVP while respecting the project's architecture and philosophy.

Always:

- Follow PROJECT.md.
- Respect existing business rules.
- Follow the development philosophy.
- Prefer simple solutions.
- Follow Next.js conventions.
- Produce readable and maintainable code.

---

# Development Guidelines

## General

- Keep changes focused.
- Reuse existing code whenever possible.
- Avoid duplicated logic.
- Explain important design decisions.

---

## Next.js

- Prefer Server Components.
- Use Client Components only when required.
- Use Server Actions when appropriate.
- Follow App Router conventions.

---

## Database

- Use Prisma.
- Avoid raw SQL unless explicitly requested.

---

## Styling

- Use Tailwind CSS.
- Reuse UI components.
- Avoid inline styles.

- **Use Theme Tokens**: Always use the defined Tailwind color tokens (`primary`, `secondary`, `accent`) and default font families. Never use arbitrary HEX codes (e.g., `#FF6B00`) directly in class names.
- **Mobile-First Responsive Layouts**:
  - Always design for mobile viewports first.
  - Add responsive prefixes (`md:`, `lg:`) for tablet and desktop views.
  - Ensure navigation, forms, product lists, and cards render correctly on small screens without horizontal scroll.

---

# Out of Scope

Unless explicitly requested, do not implement:

- Online payments
- Delivery
- Reviews
- Coupons
- Loyalty programs
- Store branches
- Multiple stores per owner

---

# Never

Do not:

- Invent requirements.
- Modify business rules.
- Introduce new dependencies without approval.
- Perform unrelated refactoring.
- Redesign the architecture.
- Implement future features prematurely.

If a decision affects architecture or business rules, ask before implementing it.

When multiple valid solutions exist, choose the simplest one.