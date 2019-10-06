import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PasswordReset from '..';
import store from '../../../redux';

describe('PasswordReset', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText,
    } = render(
      <MockedProvider>
        <Provider store={store}>
          <PasswordReset />
        </Provider>
      </MockedProvider>
    );

    getByText('Email');
    getByText('New Password');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('simulate password type toggle', () => {
    const { getByTestId, getByLabelText } = render(
      <MockedProvider>
        <Provider store={store}>
          <PasswordReset />
        </Provider>
      </MockedProvider>
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
      <MockedProvider>
        <Provider store={store}>
          <PasswordReset />
        </Provider>
      </MockedProvider>
    );

    getByText('Save password');
  });
});
