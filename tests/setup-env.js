import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import dotenv from 'dotenv';

dotenv.config();

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

HTMLCanvasElement.prototype.getContext = jest.fn();

console.warn = jest.fn();

global.setQuery = jest.fn();
global.toaster = jest.fn();

global.token = process.env.FAKE_TOKEN;
global.history = createMemoryHistory('/');
