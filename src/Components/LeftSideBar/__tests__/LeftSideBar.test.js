import React from 'react';
import { createStore } from 'redux';

import { render, fireEvent, AllProviders } from 'test-utils';

import { LEFT_SIDEBAR_NAV_LINKS } from 'settings';

import auth from '../../../redux/reducers/auth';
import LeftSideBar from '..';
import {
  ADMIN_PROPS, MENU_BUTTON, USERS, ALL_BOOKS, NAV_BAR_BRAND
} from './constants';

describe('LeftSideBar', () => {
  it('should display nav links only', () => {
    const {
      container, asFragment, getByText, getByTestId, queryByText
    } = render(
      <AllProviders>
        <LeftSideBar />
      </AllProviders>
    );

    const menuButton = getByTestId(MENU_BUTTON);
    fireEvent.click(menuButton);

    getByText(NAV_BAR_BRAND);

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    LEFT_SIDEBAR_NAV_LINKS.forEach(({ label }) => {
      getByText(label);
    });

    const adminLink = queryByText(USERS);
    expect(adminLink).toBeNull();

    fireEvent.click(menuButton);
  });

  it('should render admin nav links', () => {
    const store = createStore(auth, ADMIN_PROPS);

    const { getByText, getByTestId } = render(
      <AllProviders
        customStore={store}
      >
        <LeftSideBar />
      </AllProviders>
    );

    const menuButton = getByTestId(MENU_BUTTON);
    fireEvent.click(menuButton);

    getByText(USERS);

    fireEvent.click(menuButton);
  });

  it('should render nav links based on device', () => {
    window.orientation = jest.fn();

    const { queryByText } = render(
      <AllProviders>
        <LeftSideBar />
      </AllProviders>
    );

    const allBooksLink = queryByText(ALL_BOOKS);
    expect(allBooksLink).toBeNull();

    window.orientation.mockClear();
  });
});
