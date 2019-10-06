import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import AccountUpdateForm from '..';
import store from '../../../redux';

describe('AccountUpdateForm', () => {
  it('should render form labels', () => {
    const {
      container, asFragment, getByText, getAllByText
    } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AccountUpdateForm />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getAllByText('Username');
    getByText('Email address');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();
  });

  it('should render action buttons', () => {
    const { getByText } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <AccountUpdateForm />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getByText('Update Profile');
  });
});
