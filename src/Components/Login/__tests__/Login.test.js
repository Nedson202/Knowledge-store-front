import React from 'react';

import { render, fireEvent, AllProviders } from 'test-utils';

import Login from '..';

describe('Login container', () => {
  it('renders form labels', () => {
    const { getByLabelText, getByTestId } = render(
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
        value: 'cooper--al'
      },
    ];

    formGroupCase.forEach((field) => {
      const { name, value } = field;
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(loginButton);
    expect(loginButton).toBeDisabled();
  });
});
