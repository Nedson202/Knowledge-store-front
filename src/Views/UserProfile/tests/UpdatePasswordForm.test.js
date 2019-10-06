import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import UpdatePasswordForm from '..';
import store from '../../../redux';

const mockProps = {
  handleInputChange: () => {},
  updatePassword: () => {},
  formValues: {
    oldPassword: '',
    newPassword: '',
  },
};

describe('UpdatePasswordForm', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <MockedProvider>
        <Provider store={store}>
          <UpdatePasswordForm />
        </Provider>
      </MockedProvider>
    );

    getByText('Old Password');
    getByText('New Password');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <MockedProvider>
        <Provider store={store}>
          <UpdatePasswordForm />
        </Provider>
      </MockedProvider>
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

  it('should render form errors', () => {
    const extendProps = {
      ...mockProps,
      formErrors: {
        oldPassword: ['Old password is required'],
        newPassword: ['New password is required'],
      }
    };
    const { getByText } = render(
      <MockedProvider>
        <Provider store={store}>
          <UpdatePasswordForm {...extendProps} />
        </Provider>
      </MockedProvider>
    );

    // getByText('Old password is required');
    // getByText('New password is required');
  });

  it('should render action button', () => {
    const { getByText } = render(
      <MockedProvider>
        <Provider store={store}>
          <UpdatePasswordForm />
        </Provider>
      </MockedProvider>
    );

    getByText('Update Password');
  });
});
