import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import FAKE_TOKEN from './constants';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

HTMLCanvasElement.prototype.getContext = jest.fn();

console.warn = jest.fn();

global.setQuery = jest.fn();

global.token = FAKE_TOKEN;
global.history = createMemoryHistory('/');
