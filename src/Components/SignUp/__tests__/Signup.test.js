import React from 'react';

import {
  render, fireEvent, AllProviders, cleanup, waitForTime
} from 'test-utils';

import SignUp from '..';
import {
  PASSWORD_LENGTH_ERROR, PASSWORD_LABEL, SIGNUP_BUTTON, SIGNUP_MUTATION_MOCK,
  EMAIL_INVALID
} from './constants';

afterEach(cleanup);

describe('Signup container', () => {
  it('should trigger form validation error on change', async () => {
    const { getByLabelText, getByText } = render(
      <AllProviders>
        <SignUp />
      </AllProviders>
    );

    fireEvent.change(getByLabelText(PASSWORD_LABEL), { target: { value: 'a' } });
    await waitForTime(1001);
    getByText(PASSWORD_LENGTH_ERROR);
  });

  it('should render form labels', async () => {
    window.location.reload = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <AllProviders apolloMocks={SIGNUP_MUTATION_MOCK}>
        <SignUp />
      </AllProviders>
    );

    const signupButton = getByTestId(SIGNUP_BUTTON);

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

    await waitForTime(0);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(signupButton).toBeEnabled();

    window.location.reload.mockClear();
  });

  it('should trigger form validation error on submit', () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <AllProviders>
        <SignUp />
      </AllProviders>
    );

    const signupButton = getByTestId(SIGNUP_BUTTON);

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
    getByText(EMAIL_INVALID);
  });
});
