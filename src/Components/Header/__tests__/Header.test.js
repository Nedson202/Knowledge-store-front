import React from 'react';
import { createStore } from 'redux';

import { render, fireEvent, AllProviders } from 'test-utils';

import auth from '../../../redux/reducers/auth';
import Header from '..';
import {
  DARK_MODE_SWITCH, LOGOUT, NAV_BAR_BRAND, LOGIN, SIGNUP,
  DATA_THEME, PROFILE, USER_VERIFIED_MOCK, COOPER_AL,
  LOGOUT_PROPS, THEME_PROPS, DARK, LIGHT, STORAGE_EVENT,
} from './constants';

describe('Header', () => {
  it('should render darkmode switch', () => {
    const {
      container, asFragment, getByText, queryAllByTestId
    } = render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    const darkModeSwitch = queryAllByTestId(DARK_MODE_SWITCH);

    getByText(NAV_BAR_BRAND);

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

    getByText(LOGIN);
    getByText(SIGNUP);

    expect(queryByTestId(LOGOUT)).toBeNull();
  });

  it('should not display auth buttons if not signed in', () => {
    const store = createStore(auth, USER_VERIFIED_MOCK);

    const { getByText, queryByTestId } = render(
      <AllProviders
        customStore={store}
      >
        <Header />
      </AllProviders>
    );

    getByText(COOPER_AL);
    getByText(PROFILE);
    getByText(LOGOUT);

    expect(queryByTestId(LOGIN)).toBeNull();

    fireEvent.click(getByText(LOGOUT));
  });

  it('should toggle mobile side bar', () => {
    const store = createStore(auth, USER_VERIFIED_MOCK);

    const { queryByTestId } = render(
      <AllProviders
        customStore={store}
      >
        <Header />
      </AllProviders>
    );

    const mobileMenuButton = queryByTestId('mobile-menu');
    fireEvent.click(mobileMenuButton);
  });

  it('should test theme mode', () => {
    const { queryAllByTestId } = render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    const darkModeSwitch = queryAllByTestId(DARK_MODE_SWITCH);

    fireEvent.click(darkModeSwitch[0]);

    const darkThemeMode = window.document.documentElement.getAttribute(DATA_THEME);
    expect(darkThemeMode).toBe(DARK);

    fireEvent.click(darkModeSwitch[0]);

    const lightThemeMode = window.document.documentElement.getAttribute(DATA_THEME);
    expect(lightThemeMode).toBe(LIGHT);
  });

  it('should test theme toggle storage event', () => {
    render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    window.dispatchEvent(new StorageEvent(STORAGE_EVENT, THEME_PROPS));

    const lightThemeMode = window.document.documentElement.getAttribute(DATA_THEME);
    expect(lightThemeMode).toBe(LIGHT);
  });

  it('should trigger logout storage event', () => {
    window.location.reload = jest.fn();

    render(
      <AllProviders>
        <Header />
      </AllProviders>
    );

    window.dispatchEvent(new StorageEvent(STORAGE_EVENT, LOGOUT_PROPS));

    expect(window.location.reload).toHaveBeenCalledTimes(1);

    window.location.reload.mockClear();
  });
});
