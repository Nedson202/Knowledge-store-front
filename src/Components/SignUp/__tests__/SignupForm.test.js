import React from 'react';
import { render, fireEvent } from 'test-utils';

import SignUpForm from '../SignUpForm';

const mockProps = {
  values: {
    username: '',
    email: '',
    password: '',
  },
  formErrors: {
    username: '',
    email: '',
    password: '',
  },
  handleInputChange: () => {},
  handleUserSignup: () => {},
  processing: false,
};

describe('Signup Form', () => {
  it('should render form labels', () => {
    const { getByText, container } = render(
      <SignUpForm {...mockProps} />
    );

    getByText('Username');
    getByText('Email address');
    getByText('Password');

    expect(container).toBeInTheDocument();
  });

  it('should render form errors', () => {
    const extendProps = {
      ...mockProps,
      formErrors: {
        username: ['Username is required'],
        email: ['Email address is required'],
        password: ['Password is required'],
      }
    };
    const { getByText } = render(
      <SignUpForm {...extendProps} />
    );

    getByText('Username is required');
    getByText('Email address is required');
    getByText('Password is required');
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <SignUpForm {...mockProps} />
    );
    const passwordInput = getByLabelText('Password');
    const passwordToggleButton = getByTestId('signup-password-icon');

    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('text');
    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe('password');
  });

  it('should render action buttons', () => {
    const { getByText, getByTestId } = render(
      <SignUpForm {...mockProps} />
    );

    getByText('Close');
    getByTestId('signup-button');
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <SignUpForm {...mockProps} />
    );

    getByTestId('signup-modal');
  });
});
