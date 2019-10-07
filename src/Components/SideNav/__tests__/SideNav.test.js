import React from 'react';
import { createStore } from 'redux';

import { render, AllProviders } from 'test-utils';
import { LEFT_SIDEBAR_NAV_LINKS } from 'settings';

import auth from '../../../redux/reducers/auth';
import SideNav from '..';

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

    getByText('Login');
    getByText('Signup');

    expect(queryByTestId('Logout')).toBeNull();
  });

  it('should display user avatar and trigger logout option', () => {
    const mockProps = {
      auth: {
        isAuthenticated: true,
        user: {
          username: 'Cooper AL',
          picture: 'https://image.url',
          avatar: 'green',
        }
      }
    };

    const store = createStore(auth, mockProps);

    const { getByText } = render(
      <AllProviders customStore={store}>
        <SideNav />
      </AllProviders>
    );
    const logoutButton = getByText('Logout');

    getByText('Cooper AL');

    expect(logoutButton).toBeVisible();
    // fireEvent.click(logoutButton);
  });
});
