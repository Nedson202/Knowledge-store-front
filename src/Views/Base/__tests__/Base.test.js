import React from 'react';
import { createStore } from 'redux';

import { AllProviders, render } from 'test-utils';

import auth from '../../../redux/reducers/auth';

import App from '..';

describe('App', () => {
  it('should render', () => {
    const {
      container, asFragment, getByText, getByTestId
    } = render(
      <AllProviders>
        <App />
      </AllProviders>
    );

    getByText('Login to get started');
    getByText('Signup');
    getByText('Explore');

    getByTestId('background-layout');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should not render auth buttons if signed in', () => {
    const props = {
      auth: {
        isAuthenticated: true,
        user: {
          isVerfied: true
        }
      }
    };

    const store = createStore(auth, props);

    const { queryByTestId } = render(
      <AllProviders customStore={store}>
        <App />
      </AllProviders>
    );

    const loginButton = queryByTestId('index-login-button');
    const signupButton = queryByTestId('index-signup-button');

    expect(loginButton).toBeNull();
    expect(signupButton).toBeNull();
  });
});
