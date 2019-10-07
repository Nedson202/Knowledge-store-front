import React from 'react';

import { render, fireEvent, AllProviders } from 'test-utils';

import SignUp from '..';

describe('Signup container', () => {
  it('renders form labels', () => {
    const { getByLabelText, getByTestId } = render(
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
        value: 'cooper.al@allcooper.com'
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

    fireEvent.click(signupButton);
    expect(signupButton).toBeDisabled();
  });
});
