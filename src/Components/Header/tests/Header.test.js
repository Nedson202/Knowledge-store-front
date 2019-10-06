import React from 'react';
import { Provider } from 'react-redux';
import { MockedProvider } from 'react-apollo/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createStore } from 'redux';
import appStore from '../../../redux';
import auth from '../../../redux/reducers/auth';
import Header from '..';

describe('Header', () => {
  it('should render darkmode switch', () => {
    const {
      container, asFragment, getByText, queryAllByTestId
    } = render(
      <MockedProvider>
        <Provider store={appStore}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    const darkModeSwitch = queryAllByTestId('dark-mode-switch');

    getByText('Loresters Bookstore');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();
    expect(darkModeSwitch[0]).toBeInTheDocument();
  });

  it('should display auth buttons if not signed in', () => {
    const mockProps = {
      auth: {
        isAuthenticated: false,
      }
    };

    const store = createStore(auth, mockProps);

    const { getByText, queryByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getByText('Login');
    getByText('Signup');

    expect(queryByTestId('Logout')).toBeNull();
  });

  it('should display auth buttons if not signed in', () => {
    const mockProps = {
      auth: {
        user: {
          isVerified: true,
          username: 'Cooper AL',
          picture: 'https://image.url',
          avatarColor: 'green',
        },
      }
    };

    const store = createStore(auth, mockProps);

    const { getByText, queryByTestId } = render(
      <MockedProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    getByText('Cooper AL');
    getByText('Profile');
    getByText('Logout');

    expect(queryByTestId('Login')).toBeNull();
  });

  it('should test dark mode', () => {
    const { queryAllByTestId } = render(
      <MockedProvider>
        <Provider store={appStore}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </Provider>
      </MockedProvider>
    );

    const darkModeSwitch = queryAllByTestId('dark-mode-switch');

    fireEvent.click(darkModeSwitch[0]);

    const darkThemeMode = window.document.documentElement.getAttribute('data-theme');
    expect(darkThemeMode).toBe('dark');

    fireEvent.click(darkModeSwitch[0]);

    const lightThemeMode = window.document.documentElement.getAttribute('data-theme');
    expect(lightThemeMode).toBe('light');
  });
});
