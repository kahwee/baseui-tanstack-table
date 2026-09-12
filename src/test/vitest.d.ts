/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  // biome-ignore lint/suspicious/noExplicitAny: Matches Vitest's generic assertion declaration.
  interface Assertion<T = any> extends jest.Matchers<void, T>, TestingLibraryMatchers<T, void> {}
  // biome-ignore lint/suspicious/noExplicitAny: Matches Vitest's asymmetric matcher declaration.
  interface AsymmetricMatchersContaining extends jest.Matchers<void, any> {}
}
