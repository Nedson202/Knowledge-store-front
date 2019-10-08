import React from 'react';

import { render, fireEvent, AllProviders } from 'test-utils';

import LoginForm from '../LoginForm';

const mockProps = {
  values: {
    username: '',
    password: '',
  },
  formErrors: {
    username: '',
    password: '',
  },
  handleInputChange: () => {},
  handleUserLogin: () => {},
  processing: false,
};

describe('Login Form', () => {
  it('should render form labels', () => {
    const { getByText, container } = render(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );

    getByText('Username');
    getByText('Password');

    expect(container).toBeInTheDocument();
  });

  it('should render form errors', () => {
    const extendProps = {
      ...mockProps,
      formErrors: {
        username: ['Username is required'],
        password: ['Password is required'],
      }
    };
    const { getByText, rerender, queryByText } = render(
      <AllProviders>
        <LoginForm {...extendProps} />
      </AllProviders>
    );

    getByText(/Username is required/i);
    getByText(/Password is required/i);

    rerender(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );

    const usernameError = queryByText(/Username is required/i);
    const passwordError = queryByText(/Password is required/i);

    expect(usernameError).toBeNull();
    expect(passwordError).toBeNull();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );
    const passwordInput = getByLabelText('Password');
    const passwordToggleButton = getByTestId(/login-password-icon/i);

    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should render action buttons', () => {
    const { getByText, getByTestId } = render(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );

    getByText('Close');
    getByTestId('login-button');
  });

  it('should render additional help options', () => {
    const { getByText } = render(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );

    const forgotPasswordOption = getByText('Forgot password?');
    const verifyMailOption = getByText('Verify email');

    expect(forgotPasswordOption).toBeVisible();
    expect(verifyMailOption).toBeVisible();

    fireEvent.click(forgotPasswordOption);
    fireEvent.click(verifyMailOption);
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <AllProviders>
        <LoginForm {...mockProps} />
      </AllProviders>
    );

    getByTestId('login-modal');
  });
});
