# AGENTS.md - Development Guide for baseui-data-table

## Commands
- Runtime: Bun `>=1.3.14` (declared in `package.json`)
- Setup: `bun install --frozen-lockfile`
- Development: `bun run dev` (Vite dev server)
- Build: `bun run build` (TypeScript + Vite build)
- Storybook: `bun run storybook`
- Build Storybook: `bun run build-storybook`
- Storybook Info: Running Storybook v10 with react-vite framework
- TypeCheck: `bun run typecheck`
- Lint: `bun run lint`
- Lint & Fix: `bun run lint:fix`
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
- Base Web integration:
  - Leverage semantic table components from baseui/table-semantic
  - Use `baseui/checkbox-v2` for row-selection checkboxes (see the [Checkbox v2 docs](https://baseweb.design/components/checkbox-v2/))
  - Keep checkbox selection controlled with `checked`, `isIndeterminate`, and native change events
  - Do not introduce the legacy `baseui/checkbox` entry point
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
- Build: `bun run build`
- Test: `bun run test:run`
- Bump version: Edit version in package.json
- Publish: `bun publish`

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
- View your published Storybook at: https://kahwee.github.io/baseui-tanstack-table/

## Features
- **Core Table Features**:
  - Sorting: Client-side column sorting with visual indicators
  - Filtering: Global search across configurable fields
  - Selection: Row selection with checkbox support (start or end placement)
  - Pagination: Server-side pagination support with BaseUI Pagination component

## Troubleshooting
- If Storybook shows "TypeError: Failed to fetch dynamically imported module", try:
  1. Clear your browser cache
  2. Restart Storybook with `bun run storybook:clean`
  3. Check for TypeScript errors with `bun run typecheck`
- If you see "Failed to resolve import '@storybook/test'", run:
  `bun add -d @storybook/test`