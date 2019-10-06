import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Login from '..';
import store from '../../../redux';

describe('Login container', () => {
  it('renders form labels', () => {
    const { getByLabelText, getByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Login />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    const loginButton = getByTestId('login-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Password',
        value: 'cooper--al'
      },
    ];

    formGroupCase.forEach((field) => {
      const { name, value } = field;
      fireEvent.change(getByLabelText(name), { target: { value } });
    });

    fireEvent.click(loginButton);
    expect(loginButton).toBeDisabled();
  });
});
