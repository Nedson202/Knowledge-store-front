import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../redux';

// eslint-disable-next-line react/prop-types
export const AllProviders = ({ children, customStore }) => (
  <MockedProvider removeTypename>
    <Provider store={customStore || store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  </MockedProvider>
);

export * from '@testing-library/react';
