import React from 'react';
import { createStore } from 'redux';

import {
  AllProviders, render, waitForTime, cleanup
} from 'test-utils';

import { MY_BOOKS_PATH } from 'settings';
import auth from '../../../redux/reducers/auth';

import App from '..';
import {
  LOGIN, SIGNUP, EXPLORE, BACKGROUND_LAYOUT, LOGIN_TEST_ID, SIGNUP_TEST_ID,
  VERIFY_EMAIL_MOCK
} from './constants';

afterEach(cleanup);

describe('App', () => {
  it('should render', () => {
    const {
      container, asFragment, getByText, getByTestId
    } = render(
      <AllProviders>
        <App />
      </AllProviders>
    );

    getByText(LOGIN);
    getByText(SIGNUP);
    getByText(EXPLORE);

    getByTestId(BACKGROUND_LAYOUT);

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should not render auth buttons if signed in', () => {
    const props = {
      auth: {
        isAuthenticated: true,
        user: {
          isVerified: true
        }
      }
    };

    const store = createStore(auth, props);

    const { queryByTestId } = render(
      <AllProviders customStore={store}>
        <App />
      </AllProviders>
    );

    const loginButton = queryByTestId(LOGIN_TEST_ID);
    const signupButton = queryByTestId(SIGNUP_TEST_ID);

    expect(loginButton).toBeNull();
    expect(signupButton).toBeNull();

    expect(window.location.pathname).toBe(MY_BOOKS_PATH);
  });

  it('should trigger social authentication', async () => {
    window.history.pushState({}, 'Social Auth', `?token=${token}`);
    window.location.replace = jest.fn();
    window.location.reload = jest.fn();
    window.location.reload();

    render(
      <AllProviders>
        <App />
      </AllProviders>
    );

    expect(window.location.replace).toHaveBeenCalledTimes(1);

    window.location.replace.mockClear();
  });

  it('should trigger email verification', async () => {
    window.history.pushState({}, 'Email verification', `?verify-email=${token}`);
    window.location.replace = jest.fn();

    render(
      <AllProviders apolloMocks={VERIFY_EMAIL_MOCK}>
        <App />
      </AllProviders>
    );

    await waitForTime(0);

    expect(localStorage.token).toBe(token);
    expect(window.location.replace).toHaveBeenCalledTimes(1);

    window.location.replace.mockClear();
  });
});
