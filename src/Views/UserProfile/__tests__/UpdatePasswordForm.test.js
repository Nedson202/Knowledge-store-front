import React from 'react';
import { render, fireEvent, AllProviders } from 'test-utils';

import UpdatePasswordForm from '..';

describe('UpdatePasswordForm', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <AllProviders>
        <UpdatePasswordForm />
      </AllProviders>
    );

    getByText('Old Password');
    getByText('New Password');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <AllProviders>
        <UpdatePasswordForm />
      </AllProviders>
    );

    const formGroupTestCases = [
      {
        label: 'Old Password',
        iconId: 'old-password-icon',
      },
      {
        label: 'New Password',
        iconId: 'new-password-icon',
      }
    ];

    formGroupTestCases.forEach(({ label, iconId }) => {
      const passwordInput = getByLabelText(label);
      const passwordToggleButton = getByTestId(iconId);

      fireEvent.click(passwordToggleButton);
      expect(passwordInput.type).toBe('text');
      fireEvent.click(passwordToggleButton);
      expect(passwordInput.type).toBe('password');
    });
  });

  it('should render action button', () => {
    const { getByText } = render(
      <AllProviders>
        <UpdatePasswordForm />
      </AllProviders>
    );

    getByText('Update Password');
  });
});
