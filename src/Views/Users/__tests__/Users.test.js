import React from 'react';

import {
  render, fireEvent, AllProviders, cleanup, waitForTime
} from 'test-utils';
import { filterUsers, toggleAdmin } from 'queries/users';

import Users from '..';

afterEach(cleanup);

describe('Users', () => {
  it('should render', async () => {
    const fetchUsersData = [
      {
        id: '12ERtr78h',
        username: 'Cooper AL',
        email: 'cooper.aL@al.cooper',
        role: 'user',
      }
    ];

    const mocks = [
      {
        request: {
          query: filterUsers,
          variables: {
            type: 'all'
          },
        },
        result: { data: { fetchUsers: fetchUsersData } }
      },
    ];

    const {
      container, asFragment, getByText, queryAllByText, getByTestId,
      queryByTestId,
    } = render(
      <AllProviders apolloMocks={mocks}>
        <Users />
      </AllProviders>
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();

    getByText('Filter (All)');
    getByText('Users');
    queryAllByText('Add Admin');
    getByTestId('loading-indicator');

    await waitForTime(0);

    const loadingIndicator = queryByTestId('loading-indicator');
    expect(loadingIndicator).toBeNull();
  });

  it('should toggle admin', async () => {
    const toggleAdminData = {
      message: 'Admin added successfully'
    };

    const fetchUsersData = [
      {
        id: '12ERtr78h',
        username: 'Cooper AL',
        email: 'cooper.aL@al.cooper',
        role: 'admin',
      }
    ];

    const mocks = [
      {
        request: {
          query: toggleAdmin,
          variables: {
            email: 'cooper.aL@al.cooper',
            adminAction: 'add'
          },
        },
        result: { data: { toggleAdmin: toggleAdminData } }
      },
      {
        request: {
          query: filterUsers,
          variables: {
            type: 'all'
          },
        },
        result: { data: { fetchUsers: fetchUsersData } }
      },
      {
        request: {
          query: filterUsers,
          variables: {
            type: 'all'
          },
        },
        result: { data: { fetchUsers: fetchUsersData } }
      },
    ];

    const {
      getByLabelText, getByTestId, getByText
    } = render(
      <AllProviders apolloMocks={mocks}>
        <Users />
      </AllProviders>
    );

    const addAdminInput = getByLabelText('User Email');
    fireEvent.change(addAdminInput, { target: { value: 'cooper.aL@al.cooper' } });

    const addAdminButton = getByTestId('add-admin-button');
    addAdminButton.click();

    await waitForTime(0);

    getByText('Cooper AL');
    getByText('admin');
  });

  it('should trigger user filter', async () => {
    const fetchUsersData = [
      {
        id: '12ERtr78h',
        username: 'Cooper AL',
        email: 'cooper.aL@al.cooper',
        role: 'super',
      }
    ];

    const mocks = [
      {
        request: {
          query: filterUsers,
          variables: {
            type: 'super'
          },
        },
        result: { data: { fetchUsers: fetchUsersData } }
      },
    ];

    const { getByText } = render(
      <AllProviders apolloMocks={mocks}>
        <Users />
      </AllProviders>
    );

    fireEvent.click(
      getByText((_content, element) => element.getAttribute('aria-label') === 'icon: down')
    );
    const item = getByText('Super');
    fireEvent.click(item);

    await waitForTime(0);
  });

  it('should trigger user filter with no result', async () => {
    const fetchUsersData = [];

    const mocks = [
      {
        request: {
          query: filterUsers,
          variables: {
            type: 'super'
          },
        },
        result: { data: { fetchUsers: fetchUsersData } }
      },
    ];

    const { getByText } = render(
      <AllProviders apolloMocks={mocks}>
        <Users />
      </AllProviders>
    );

    fireEvent.click(
      getByText((_content, element) => element.getAttribute('aria-label') === 'icon: down')
    );
    const item = getByText('Super');
    fireEvent.click(item);

    await waitForTime(0);
  });
});
