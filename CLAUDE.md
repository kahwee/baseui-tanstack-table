# CLAUDE.md - Development Guide for baseui-data-table

## Commands
- Setup: `npm install --legacy-peer-deps`
- Development: `npm run dev` (Vite dev server)
- Build: `npm run build` (TypeScript + Vite build)
- Storybook: `npm run storybook` or `npx storybook dev -p 6006`
- Build Storybook: `npm run build-storybook` or `npx storybook build`
- Storybook Info: Running Storybook v10 with react-vite framework
- TypeCheck: `npx tsc --noEmit`
- Lint: `npm run lint`
- Lint & Fix: `npm run lint:fix`
- Tests: Make sure to use `fn()` from `@storybook/test` for event handlers in stories

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
  - Implement core features (sorting, filtering, pagination, row selection) as needed
  - Use flexRender for cell rendering
- Base UI integration:
  - Leverage semantic table components from baseui/table-semantic
  - Use Pagination component for server-side pagination
  - Handle loading/empty states with provided components
  - Support row selection with checkboxes (start or end placement)

## Project Structure
- `src/components/data-table.tsx`: Main DataTable component with sorting, filtering, and pagination
- `src/components/data-table.stories.tsx`: Storybook stories for DataTable
- `src/components/checkbox-table.tsx`: DataTable with row selection functionality
- `src/components/checkbox-table.stories.tsx`: Storybook stories for CheckboxTable
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
  - GitHub Pages deployment (automatic on push to main branch)

## GitHub Pages Deployment
- Storybook is automatically deployed to GitHub Pages on every push to main
- Manual deployment: Run workflow from Actions tab > "Deploy Storybook to GitHub Pages" > Run workflow
- Setup requirements (one-time):
  1. Go to repository Settings > Pages
  2. Under "Build and deployment" > Source: select "GitHub Actions"
  3. Save changes
- View your published Storybook at: https://kahwee.github.io/baseui-data-table/

## Features
- **Core Table Features**:
  - Sorting: Client-side column sorting with visual indicators
  - Filtering: Global search across configurable fields
  - Selection: Row selection with checkbox support (start or end placement)
  - Pagination: Server-side pagination support with BaseUI Pagination component

## Troubleshooting
- If Storybook shows "TypeError: Failed to fetch dynamically imported module", try:
  1. Clear your browser cache
  2. Restart Storybook with `npm run storybook -- --no-cache`
  3. Check for TypeScript errors with `npm run typecheck`
- If you see "Failed to resolve import '@storybook/test'", run:
  `npm install --save-dev @storybook/test`