import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux';

// eslint-disable-next-line react/prop-types
export const AllProviders = ({ children, customStore, apolloMocks }) => (
  <MockedProvider
    addTypename={false}
    mocks={apolloMocks}
  >
    <Provider store={customStore || store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  </MockedProvider>
);

export * from '@testing-library/react';

export const waitForTime = (waitFor = 0) => new Promise(resolve => setTimeout(resolve, waitFor));
