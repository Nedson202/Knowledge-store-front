import React from 'react';

import {
  render, fireEvent, AllProviders, waitForTime, cleanup
} from 'test-utils';
import { MY_BOOKS_PATH } from 'settings';

import PasswordReset from '..';
import {
  EMAIL_LABEL, NEW_PASSWORD_LABEL, TEXT, PASSWORD, PASSWORD_TOGGLE,
  SAVE_BUTTON, FORM_GROUP_CASE, PASSWORD_REST_MOCK
} from './constants';

afterEach(cleanup);

describe('PasswordReset', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    getByText(EMAIL_LABEL);
    getByText(NEW_PASSWORD_LABEL);

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    const passwordInput = getByLabelText(NEW_PASSWORD_LABEL);
    const passwordToggleButton = getByTestId(PASSWORD_TOGGLE);

    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe(TEXT);
    fireEvent.click(passwordToggleButton);
    expect(passwordInput.type).toBe(PASSWORD);
  });

  it('should render action button', () => {
    const { getByText } = render(
      <AllProviders>
        <PasswordReset />
      </AllProviders>
    );

    getByText(SAVE_BUTTON);
  });

  it('should trigger password reset', async () => {
    window.history.pushState({}, 'Password reset', `?token=${token}`);

    const { getByText, getByLabelText } = render(
      <AllProviders apolloMocks={PASSWORD_REST_MOCK}>
        <PasswordReset />
      </AllProviders>
    );

    const savePasswordButton = getByText(SAVE_BUTTON);

    FORM_GROUP_CASE.forEach(({ name, value }) => {
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    savePasswordButton.click();

    await waitForTime(100);

    expect(localStorage.token).toBe(token);
    expect(window.location.pathname).toBe(MY_BOOKS_PATH);
  });
});
