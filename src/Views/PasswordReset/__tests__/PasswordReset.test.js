import React from 'react';
import { render, fireEvent, AllProviders } from 'test-utils';

import PasswordReset from '..';

describe('PasswordReset', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    getByText('Email');
    getByText('New Password');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    const passwordInput = getByLabelText('New Password');
    const passwordToggleButton = getByTestId('reset-password-icon');

    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should render action button', () => {
    const { getByText } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    getByText('Save password');
  });

  it('should trigger password reset', () => {
    delete window.location;
    window.location = { search: jest.fn() };

    const { getByText, getByLabelText } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    const savePasswordButton = getByText('Save password');

    const formGroupCase = [
      {
        name: 'Email',
        value: 'Cooper.AL@alcooper.al'
      },
      {
        name: 'New Password',
        value: '90huERyu22'
      },
    ];

    formGroupCase.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    savePasswordButton.click();
  });
});
