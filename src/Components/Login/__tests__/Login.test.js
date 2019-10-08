import React from 'react';
import wait from 'waait';

import { render, fireEvent, AllProviders } from 'test-utils';
import { loginUser } from 'queries/auth';

import Login from '..';

describe('Login container', () => {
  it('should trigger form validation error on change', async () => {
    const { getByLabelText, getByText } = render(
      <AllProviders>
        <Login />
      </AllProviders>
    );

    fireEvent.change(getByLabelText('Password'), { target: { value: 'a' } });
    await wait(1001);
    getByText('The password must be at least 6 characters.');
  });

  it('should render form labels', async () => {
    let loginMutationCalled = false;

    const loginUserData = { token };
    const mocks = [
      {
        request: {
          query: loginUser,
          variables: {
            username: 'Cooper AL',
            password: 'cooper--al'
          },
        },
        result: () => {
          loginMutationCalled = true;
          return { data: { loginUser: loginUserData } };
        },
      },
    ];

    const { getByLabelText, getByTestId } = render(
      <AllProviders apolloMocks={mocks}>
        <Login />
      </AllProviders>
    );

    const loginButton = getByTestId('login-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Password',
        value: 'cooper--al'
      },
    ];

    formGroupCase.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(loginButton);
    expect(loginButton).toBeDisabled();

    await wait(0);
    expect(loginMutationCalled).toBe(true);
  });

  it('should trigger form validation error on submit', () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <AllProviders>
        <Login />
      </AllProviders>
    );

    const loginButton = getByTestId('login-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Password',
        value: ''
      },
    ];

    formGroupCase.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(loginButton);
    getByText('The password field is required.');
  });
});
