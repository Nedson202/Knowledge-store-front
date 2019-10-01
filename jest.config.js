module.export = {
  roots: ['<rootDir>/src'],
  transform: {
    '\\.(js|jsx)?$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/>(*.)test.{js, jsx}'], // finds test
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFiles: [
    './src/setupTests.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
  ] // setupFiles before the tests are ran
};
