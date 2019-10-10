import React from 'react';

import { render, fireEvent, AllProviders } from 'test-utils';

import LoginForm from '../LoginForm';
import {
  PASSWORD_LABEL, USERNAME_LABEL, MOCK_PROPS, FORM_ERROR_PROPS, LOGIN_BUTTON,
  FORGOT_PASSWORD, VERIFY_EMAIL, LOGIN_MODAL, PASSWORD, TEXT, CLOSE,
  USERNAME_ERROR_REXP, PASSWORD_ERROR_REXP, PASSWORD_TOGGLE
} from './constants';

describe('Login Form', () => {
  it('should render form labels', () => {
    const { getByText, container } = render(
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
    );

    getByText(USERNAME_LABEL);
    getByText(PASSWORD_LABEL);

    expect(container).toBeInTheDocument();
  });

  it('should render form errors', () => {
    const { getByText, rerender, queryByText } = render(
      <AllProviders>
        <LoginForm {...FORM_ERROR_PROPS} />
      </AllProviders>
    );

    getByText(USERNAME_ERROR_REXP);
    getByText(PASSWORD_ERROR_REXP);

    rerender(
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
    );

    const usernameError = queryByText(USERNAME_ERROR_REXP);
    const passwordError = queryByText(PASSWORD_ERROR_REXP);

    expect(usernameError).toBeNull();
    expect(passwordError).toBeNull();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
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
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
    );

    getByText(CLOSE);
    getByTestId(LOGIN_BUTTON);
  });

  it('should render additional help options', () => {
    const { getByText } = render(
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
    );

    const forgotPasswordOption = getByText(FORGOT_PASSWORD);
    const verifyMailOption = getByText(VERIFY_EMAIL);

    expect(forgotPasswordOption).toBeVisible();
    expect(verifyMailOption).toBeVisible();

    fireEvent.click(forgotPasswordOption);
    fireEvent.click(verifyMailOption);
  });

  it('should render modal', () => {
    const { getByTestId } = render(
      <AllProviders>
        <LoginForm {...MOCK_PROPS} />
      </AllProviders>
    );

    getByTestId(LOGIN_MODAL);
  });
});
