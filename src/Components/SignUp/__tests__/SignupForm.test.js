import React from 'react';
import { render, fireEvent } from 'test-utils';

import SignUpForm from '../SignUpForm';
import {
  SIGNUP_MODAL, SIGNUP_BUTTON, CLOSE, PASSWORD, TEXT, MOCK_PROPS, USERNAME_LABEL,
  PASSWORD_LABEL, FORM_ERROR_PROPS, USERNAME_ERROR_REXP, PASSWORD_ERROR_REXP,
  EMAIL_ERROR_REXP, PASSWORD_TOGGLE, EMAIL_LABEL
} from './constants';

describe('Signup Form', () => {
  it('should render form labels', () => {
    const { getByText, container } = render(
      <SignUpForm {...MOCK_PROPS} />
    );

    getByText(USERNAME_LABEL);
    getByText(EMAIL_LABEL);
    getByText(PASSWORD_LABEL);

    expect(container).toBeInTheDocument();
  });

  it('should render form errors', () => {
    const { getByText } = render(
      <SignUpForm {...FORM_ERROR_PROPS} />
    );

    getByText(USERNAME_ERROR_REXP);
    getByText(EMAIL_ERROR_REXP);
    getByText(PASSWORD_ERROR_REXP);
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <SignUpForm {...MOCK_PROPS} />
    );
    const passwordInput = getByLabelText(PASSWORD_LABEL);
    const passwordToggleButton = getByTestId(PASSWORD_TOGGLE);

    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe(TEXT);
    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe(PASSWORD);
  });

  it('should render action buttons', () => {
    const { getByText, getByTestId } = render(
      <SignUpForm {...MOCK_PROPS} />
    );

    getByText(CLOSE);
    getByTestId(SIGNUP_BUTTON);
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <SignUpForm {...MOCK_PROPS} />
    );

    getByTestId(SIGNUP_MODAL);
  });
});
