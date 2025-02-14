/** @type {import('jest').Config} */
module.exports = {
  // Test files: look for .test.ts or .spec.ts in src or tests folder
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/tests/**/*.test.ts'],

  // Use ts-jest to transpile TS tests
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // Clear mocks automatically between tests
  clearMocks: true,

  // Coverage configuration (optional)
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/**/index.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
};
