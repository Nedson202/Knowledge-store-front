import React from 'react';

import {
  render, fireEvent, AllProviders, waitForTime
} from 'test-utils';

import Login from '..';
import {
  PASSWORD_LABEL, PASSWORD_LENGTH_ERROR, LOGIN_MUTATION_MOCK, LOGIN_BUTTON,
  PASSWORD_REQUIRED_ERROR
} from './constants';

describe('Login container', () => {
  it('should trigger form validation error on change', async () => {
    const { getByLabelText, getByText } = render(
      <AllProviders>
        <Login />
      </AllProviders>
    );

    fireEvent.change(getByLabelText(PASSWORD_LABEL), { target: { value: 'a' } });
    await waitForTime(1001);
    getByText(PASSWORD_LENGTH_ERROR);
  });

  it('should render handle login query', async () => {
    window.location.reload = jest.fn();

    const { getByLabelText, getByTestId } = render(
      <AllProviders apolloMocks={LOGIN_MUTATION_MOCK}>
        <Login />
      </AllProviders>
    );

    const loginButton = getByTestId(LOGIN_BUTTON);

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

    await waitForTime(10);
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(loginButton).toBeEnabled();

    window.location.reload.mockClear();
  });

  it('should trigger form validation error on submit', () => {
    const { getByLabelText, getByTestId, getByText } = render(
      <AllProviders>
        <Login />
      </AllProviders>
    );

    const loginButton = getByTestId(LOGIN_BUTTON);

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
    getByText(PASSWORD_REQUIRED_ERROR);
  });
});
