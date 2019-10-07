import '@testing-library/jest-dom/extend-expect';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

HTMLCanvasElement.prototype.getContext = jest.fn();

console.warn = jest.fn();
