import React from 'react';
import { createStore } from 'redux';

import { render, AllProviders, fireEvent } from 'test-utils';
import { LEFT_SIDEBAR_NAV_LINKS } from 'settings';

import auth from '../../../redux/reducers/auth';
import SideNav from '..';
import {
  USERNAME, AVATAR_ONLY, LOGOUT, PICTURE_ONLY, LOGIN, SIGNUP
} from './constants';

describe('SideNav', () => {
  it('should display nav links', () => {
    const { container, asFragment, getByText } = render(
      <AllProviders>
        <SideNav />
      </AllProviders>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    LEFT_SIDEBAR_NAV_LINKS.forEach(({ label }) => {
      getByText(label);
    });
  });

  it('should display auth buttons if not signed in', () => {
    const { getByText, queryByTestId } = render(
      <AllProviders>
        <SideNav />
      </AllProviders>
    );

    getByText(LOGIN);
    getByText(SIGNUP);

    expect(queryByTestId(LOGOUT)).toBeNull();
  });

  it('should display user image and trigger logout option', () => {
    const store = createStore(auth, PICTURE_ONLY);

    const { getByText } = render(
      <AllProviders customStore={store}>
        <SideNav />
      </AllProviders>
    );
    const logoutButton = getByText(LOGOUT);

    getByText(USERNAME);

    expect(logoutButton).toBeVisible();
    fireEvent.click(logoutButton);
  });

  it('should display user avatar', () => {
    const store = createStore(auth, AVATAR_ONLY);

    const { getByText } = render(
      <AllProviders customStore={store}>
        <SideNav />
      </AllProviders>
    );

    getByText(USERNAME);
  });
});
