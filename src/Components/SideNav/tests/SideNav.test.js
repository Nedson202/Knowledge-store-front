import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createStore } from 'redux';
import appStore from '../../../redux';
import auth from '../../../redux/reducers/auth';
import SideNav from '..';
import { LEFT_SIDEBAR_NAV_LINKS } from '../../../settings';

describe('SideNav', () => {
  it('should display nav links', () => {
    const { container, asFragment, getByText } = render(
      <Provider store={appStore}>
        <BrowserRouter>
          <SideNav />
        </BrowserRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    LEFT_SIDEBAR_NAV_LINKS.forEach(({ label }) => {
      getByText(label);
    });
  });

  it('should display auth buttons if not signed in', () => {
    const mockProps = {
      auth: {
        isAuthenticated: false,
      }
    };

    const store = createStore(auth, mockProps);

    const { getByText, queryByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SideNav />
        </BrowserRouter>
      </Provider>
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
      <Provider store={store}>
        <BrowserRouter>
          <SideNav />
        </BrowserRouter>
      </Provider>
    );
    const logoutButton = getByText('Logout');

    getByText('Cooper AL');

    expect(logoutButton).toBeVisible();
    // fireEvent.click(logoutButton);
  });
});
