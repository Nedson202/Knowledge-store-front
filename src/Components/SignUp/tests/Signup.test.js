import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import SignUp from '..';
import store from '../../../redux';

describe('Signup container', () => {
  it('renders form labels', () => {
    const { getByLabelText, getByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <SignUp />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    const signupButton = getByTestId('signup-button');

    const formGroupCase = [
      {
        name: 'Username',
        value: 'Cooper AL'
      },
      {
        name: 'Email address',
        value: 'cooper.al@allcooper.com'
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

    fireEvent.click(signupButton);
    expect(signupButton).toBeDisabled();
  });
});
