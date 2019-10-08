import React from 'react';
import { createStore } from 'redux';

import { render, fireEvent, AllProviders } from 'test-utils';

import { LEFT_SIDEBAR_NAV_LINKS } from 'settings';

import auth from '../../../redux/reducers/auth';
import LeftSideBar from '..';


describe('LeftSideBar', () => {
  it('should display nav links only', () => {
    const {
      container, asFragment, getByText, getByTestId, queryByText
    } = render(
      <AllProviders>
        <LeftSideBar />
      </AllProviders>
    );

    const menuButton = getByTestId('menu-button');
    fireEvent.click(menuButton);

    getByText('Loresters Bookstore');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    LEFT_SIDEBAR_NAV_LINKS.forEach(({ label }) => {
      getByText(label);
    });

    const adminLink = queryByText('Users');
    expect(adminLink).toBeNull();

    fireEvent.click(menuButton);
  });

  it('should render admin nav links', () => {
    const mockProps = {
      auth: {
        isAuthenticated: true,
        user: {
          role: 'admin'
        }
      }
    };

    const store = createStore(auth, mockProps);

    const { getByText, getByTestId } = render(
      <AllProviders
        customStore={store}
      >
        <LeftSideBar />
      </AllProviders>
    );

    const menuButton = getByTestId('menu-button');
    fireEvent.click(menuButton);

    getByText('Users');

    fireEvent.click(menuButton);
  });

  it('should render nav links based on device', () => {
    window.orientation = jest.fn();

    const { queryByText } = render(
      <AllProviders>
        <LeftSideBar />
      </AllProviders>
    );

    const allBooksLink = queryByText('All Books');
    expect(allBooksLink).toBeNull();

    window.orientation.mockClear();
  });
});
