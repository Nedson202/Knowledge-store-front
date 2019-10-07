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
});
