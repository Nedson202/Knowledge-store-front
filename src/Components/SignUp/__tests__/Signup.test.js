import React from 'react';
import wait from 'waait';

import {
  render, fireEvent, AllProviders, cleanup
} from 'test-utils';
import { addUser } from 'queries/auth';

import SignUp from '..';

afterEach(cleanup);

describe('Signup container', () => {
  it('should trigger form validation error on change', async () => {
    const { getByLabelText, getByText } = render(
      <AllProviders>
        <SignUp />
      </AllProviders>
    );

    fireEvent.change(getByLabelText('Password'), { target: { value: 'a' } });
    await wait(1001);
    getByText('The password must be at least 6 characters.');
  });

  it('should render form labels', async () => {
    let signupMutationCalled = false;

    const addUserData = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6Im1heHdpbCIsImVtYWlsIjoiaG9taWVAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJwaWN0dXJlIjoiaHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vaW5lZC9pbWFnZS91cGxvYWQvdjE1NjkxMDYwMzUvYm9va3N0b3JlL3FjdmwyYXRiazRnb3g5Y2JhaHh1LmpwZyIsImlzVmVyaWZpZWQiOnRydWUsImF2YXRhckNvbG9yIjoicmdiYSg2NCwgMTI0LCAwLCAwLjkpIiwiaWF0IjoxNTcwMjYxMDA2fQ.1LP-AcwXovRw4kirvBsLvKjHAfeo3pgCAB3Q3Chfww8' };
    const mocks = [
      {
        request: {
          query: addUser,
          variables: {
            username: 'Cooper AL',
            email: 'cooper.al@allcooper.com',
            password: 'cooper--al'
          },
        },
        result: () => {
          signupMutationCalled = true;
          return { data: { addUser: addUserData } };
        },
      },
    ];

    const { getByLabelText, getByTestId } = render(
      <AllProviders apolloMocks={mocks}>
        <SignUp />
      </AllProviders>
    );

    const signupButton = getByTestId('signup-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Email address',
        value: 'cooper.al@allcooper.com'
      },
      {
        name: 'Password',
        value: 'cooper--al'
      },
    ];

    formGroupCase.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(signupButton);
    expect(signupButton).toBeDisabled();

    await wait(0);
    expect(signupMutationCalled).toBe(true);
  });

  it('should trigger form validation error on submit', () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <AllProviders>
        <SignUp />
      </AllProviders>
    );

    const signupButton = getByTestId('signup-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Email address',
        value: 'cooper.al@allcooper'
      },
      {
        name: 'Password',
        value: 'cooper--al'
      },
    ];

    formGroupCase.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(signupButton);
    getByText('The email format is invalid.');
  });
});
