import React from 'react';

import { AllProviders, render } from 'test-utils';

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
      isAuthenticated: true,
    };
    const { queryByTestId } = render(
      <AllProviders>
        <Main {...props} />
      </AllProviders>
    );

    const loginButton = queryByTestId('index-login-button');
    const signupButton = queryByTestId('index-signup-button');

    expect(loginButton).toBeNull();
    expect(signupButton).toBeNull();
  });
});
