import React from 'react';
import { createStore } from 'redux';

import { render, fireEvent, AllProviders } from 'test-utils';

import { LEFT_SIDEBAR_NAV_LINKS } from 'settings';

import auth from '../../../redux/reducers/auth';
import LeftSideBar from '..';


describe('LeftSideBar', () => {
  it('should display nav links', () => {
    const {
      container, asFragment, getByText, getByTestId
    } = render(
      <AllProviders>
        <LeftSideBar />
      </AllProviders>
    );

    const menuButton = getByTestId('menu-button');

    getByText('Loresters Bookstore');


    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    LEFT_SIDEBAR_NAV_LINKS.forEach(({ label }) => {
      getByText(label);
    });

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

    const { getByText } = render(
      <AllProviders
        customStore={store}
      >
        <LeftSideBar />
      </AllProviders>
    );

    getByText('Users');
  });
});
