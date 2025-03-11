# CLAUDE.md - Development Guide for baseui-tanstack-table

## Commands
- Setup: `npm install --legacy-peer-deps`
- Storybook: `npm run storybook`
- Build Storybook: `npm run build-storybook`
- TypeCheck: `npx tsc --noEmit`

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