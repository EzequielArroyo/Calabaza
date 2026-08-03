# Frontend

## Overview

The frontend is built using Next.js App Router.

React components should remain focused on presentation and user interaction.

Business logic belongs in the backend.

## Responsibilities

The frontend is responsible for:

- rendering pages;
- handling forms;
- client-side validation;
- API communication;
- navigation;
- local UI state.

## Folder Organization

Example structure:

```
src/
├── app/
├── components/
├── hooks/
├── lib/
├── services/
├── types/
└── utils/
```

The exact structure may evolve, but responsibilities should remain clearly separated.

## Components

Components should be:

- reusable;
- small;
- focused on a single responsibility.

Avoid large components containing business rules.

## API Communication

The frontend communicates exclusively with the backend API.

Direct database access is never allowed.

## State Management

Prefer:

- React state
- Context
- Server Components

Introduce external state libraries only when necessary.

## Styling

Tailwind CSS is the project's styling solution.

Avoid inline styles unless strictly necessary.

## Error Handling

Errors returned by the API should be translated into user-friendly messages.

Internal implementation details should never be exposed.

## Related Documentation

- [API](api.md)
- [Backend](backend.md)