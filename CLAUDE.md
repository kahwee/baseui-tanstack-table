# CLAUDE.md - Development Guide for baseui-tanstack-table

## Commands
- Setup: `npm install --legacy-peer-deps`
- Storybook: `npm run storybook` or `npx storybook dev -p 6006`
- Build Storybook: `npm run build-storybook` or `npx storybook build`
- TypeCheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Lint & Fix: `npm run lint:fix`

## Code Style Guidelines
- TypeScript: Use strict typing with proper interfaces/types
- React: Functional components with hooks and generic types for table data
- Naming: 
  - camelCase for variables/functions
  - PascalCase for components/interfaces
  - kebab-case for file names
- Imports: Group imports (React, @tanstack/react-table, baseui, local)
- Component structure:
  - Define interface with generics (T extends object)
  - Keep sorting state inside component
  - Use appropriate Base Web styled components for table structure
- TanStack Table:
  - Use columnHelper for type-safe column definitions
  - Implement core features (sorting, filtering) as needed
  - Use flexRender for cell rendering
- Base UI integration:
  - Leverage semantic table components from baseui/table-semantic
  - Handle loading/empty states with provided components

This project integrates Base Web UI components with TanStack Table for robust data tables.

## CI/CD
- GitHub Actions configured for:
  - Linting and type checking
  - Storybook build verification
  - Dependabot for automatic dependency updates
  - Auto-merge for non-major dependency updates