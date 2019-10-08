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

    const loginUserData = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6Im1heHdpbCIsImVtYWlsIjoiaG9taWVAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vaW5lZC9pbWFnZS91cGxvYWQvdjE1NjkxMDYwMzUvYm9va3N0b3JlL3FjdmwyYXRiazRnb3g5Y2JhaHh1LmpwZyIsImlzVmVyaWZpZWQiOnRydWUsImF2YXRhckNvbG9yIjoicmdiYSg2NCwgMTI0LCAwLCAwLjkpIiwiaWF0IjoxNTcwMjYxMDA2fQ.1LP-AcwXovRw4kirvBsLvKjHAfeo3pgCAB3Q3Chfww8' };
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
