# CLAUDE.md - Development Guide for baseui-data-table

## Commands
- Setup: `npm install --legacy-peer-deps`
- Development: `npm run dev` (Vite dev server)
- Build: `npm run build` (TypeScript + Vite build)
- Storybook: `npm run storybook` or `npx storybook dev -p 6006`
- Build Storybook: `npm run build-storybook` or `npx storybook build`
- Storybook Info: Running Storybook v8 with react-vite framework
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

## Project Structure
- `src/components/data-table.tsx`: Main DataTable component
- `src/components/data-table.stories.tsx`: Storybook stories
- `src/utils/sample-data.tsx`: Sample data and column definitions
- `src/index.ts`: Main exports for the library

## Publishing
- Build: `npm run build`
- Test: `npm test`
- Bump version: Edit version in package.json
- Publish: `npm publish`

## CI/CD
- GitHub Actions configured for:
  - Linting and type checking
  - Storybook build verification
  - Dependabot for automatic dependency updates
  - Auto-merge for non-major dependency updates

## Troubleshooting
- If Storybook shows "TypeError: Failed to fetch dynamically imported module", try:
  1. Clear your browser cache
  2. Restart Storybook with `npm run storybook -- --no-cache`
  3. Check for TypeScript errors with `npm run typecheck`