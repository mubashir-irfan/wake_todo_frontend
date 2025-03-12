import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/app/shared/**/*.{js,jsx,ts,tsx}',
    'src/shared/**/*.{js,jsx,ts,tsx}',
    'src/services/**/*.{js,jsx,ts,tsx}',
    'src/store/**/*.{js,jsx,ts,tsx}',
    'src/utils/**/*.{js,jsx,ts,tsx}',
    '!src/shared/components/adhoc/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/reportWebVitals.ts',
    '!src/setupTests.ts',
    '!src/**/*.stories.tsx',
    '!src/__mocks__/**/*',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Map '@/*' to '<rootDir>/src/*'
  },
};

export default createJestConfig(config);
