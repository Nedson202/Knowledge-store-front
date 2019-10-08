import React from 'react';
import { createStore } from 'redux';

import { AllProviders, render, fireEvent } from 'test-utils';

import auth from '../../../redux/reducers/auth';
import Main from '..';

describe('Main', () => {
  it('should render action buttons', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <AllProviders>
        <Main />
      </AllProviders>
    );

    getByText('Login to get started');
    getByText('Signup');
    getByText('Explore');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should render page header summary', () => {
    const { getByText } = render(
      <AllProviders>
        <Main />
      </AllProviders>
    );

    getByText(
      'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.'
    );
    getByText('― Albert Einstein');
    getByText('Explore');
  });

  it('should not render auth buttons if signed in', () => {
    const props = {
      auth: {
        isAuthenticated: true,
        user: {
          isVerfied: true,
        }
      }
    };

    const store = createStore(auth, props);

    const { queryByTestId } = render(
      <AllProviders customStore={store}>
        <Main />
      </AllProviders>
    );

    const loginButton = queryByTestId('index-login-button');
    const signupButton = queryByTestId('index-signup-button');

    expect(loginButton).toBeNull();
    expect(signupButton).toBeNull();
  });

  it('should navigate to explore page', () => {
    const props = {
      isAuthenticated: true,
    };
    const { getByText } = render(
      <AllProviders>
        <Main {...props} />
      </AllProviders>
    );

    window.location.replace = jest.fn();

    const exploreButton = getByText('Explore');
    fireEvent.click(exploreButton);

    window.location.replace.mockClear();
  });
});
