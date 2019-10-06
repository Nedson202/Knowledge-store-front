import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
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
      <BrowserRouter>
        <LoginForm {...extendProps} />
      </BrowserRouter>
    );

    getByText(/Username is required/i);
    getByText(/Password is required/i);

    rerender(
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
    );

    const usernameError = queryByText(/Username is required/i);
    const passwordError = queryByText(/Password is required/i);

    expect(usernameError).toBeNull();
    expect(passwordError).toBeNull();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
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
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
    );

    getByText('Close');
    getByTestId('login-button');
  });

  it('should render additional help options', () => {
    const { getByText } = render(
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
    );

    getByText('Forgot password?');
    getByText('Verify email');
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <LoginForm {...mockProps} />
      </BrowserRouter>
    );

    getByTestId('login-modal');
  });
});
