import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { createStore } from 'redux';
import appStore from '../../../redux';
import auth from '../../../redux/reducers/auth';
import LeftSideBar from '..';
import { LEFT_SIDEBAR_NAV_LINKS } from '../../../settings';

describe('LeftSideBar', () => {
  it('should display nav links', () => {
    const {
      container, asFragment, getByText, getByTestId
    } = render(
      <Provider store={appStore}>
        <BrowserRouter>
          <LeftSideBar />
        </BrowserRouter>
      </Provider>
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
      <Provider store={store}>
        <BrowserRouter>
          <LeftSideBar />
        </BrowserRouter>
      </Provider>
    );

    getByText('Users');
  });
});
