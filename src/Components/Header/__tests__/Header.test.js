import React from 'react';
import { createStore } from 'redux';

import { render, fireEvent, AllProviders } from 'test-utils';
import { LOGOUT } from 'settings';

import auth from '../../../redux/reducers/auth';
import Header from '..';

describe('Header', () => {
  it('should render darkmode switch', () => {
    const {
      container, asFragment, getByText, queryAllByTestId
    } = render(
      <AllProviders>
        <Header />
      </AllProviders>
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
      <AllProviders
        customStore={store}
      >
        <Header />
      </AllProviders>
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
      <AllProviders
        customStore={store}
      >
        <Header />
      </AllProviders>
    );

    getByText('Cooper AL');
    getByText('Profile');
    getByText('Logout');

    expect(queryByTestId('Login')).toBeNull();
  });

  it('should test theme mode', () => {
    const { queryAllByTestId } = render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    const darkModeSwitch = queryAllByTestId('dark-mode-switch');

    fireEvent.click(darkModeSwitch[0]);

    const darkThemeMode = window.document.documentElement.getAttribute('data-theme');
    expect(darkThemeMode).toBe('dark');

    fireEvent.click(darkModeSwitch[0]);

    const lightThemeMode = window.document.documentElement.getAttribute('data-theme');
    expect(lightThemeMode).toBe('light');
  });

  it('should test theme toggle storage event', () => {
    render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    window.dispatchEvent(new StorageEvent('storage', {
      key: 'theme',
      newValue: 'light'
    }));

    const lightThemeMode = window.document.documentElement.getAttribute('data-theme');
    expect(lightThemeMode).toBe('light');
  });

  it('should test logout storage event', () => {
    window.location.reload = jest.fn();

    render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    window.dispatchEvent(new StorageEvent('storage', {
      key: LOGOUT,
      newValue: 'light'
    }));

    window.location.reload.mockClear();
  });
});
