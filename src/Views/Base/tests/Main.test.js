import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from '..';
import store from '../../../redux';

describe('Main', () => {
  it('should render action buttons', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getByText('Login to get started');
    getByText('Signup');
    getByText('Explore');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should render page header summary', () => {
    const { getByText } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getByText(
      'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.'
    );
    getByText('― Albert Einstein');
    getByText('Explore');
  });

  it('should not render auth buttons if signed in', () => {
    const props = {
      isAuthenticated: true,
    };
    const { queryByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Main {...props} />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    const loginButton = queryByTestId('index-login-button');
    const signupButton = queryByTestId('index-signup-button');

    expect(loginButton).toBeNull();
    expect(signupButton).toBeNull();
  });
});
