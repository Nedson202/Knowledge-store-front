import React from 'react';
import { render, cleanup } from 'test-utils';

import Table from '..';

afterEach(cleanup);

describe('Table', () => {
  it('should render', () => {
    const {
      container, asFragment, getByText, queryByText
    } = render(<Table />);

    getByText('UserId');
    getByText('Username');
    getByText('Email');
    getByText('Role');

    const deactivateButton = queryByText('deactivate');
    const removeButton = queryByText('remove');

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeVisible();

    expect(deactivateButton).toBeNull();
    expect(removeButton).toBeNull();
  });

  it('should render table data', () => {
    const mockProps = {
      users: [{
        id: '12JHne89',
        username: 'Cooper AL',
        email: 'cooper.al@allcooper.com',
        role: 'user'
      }]
    };
    const { getByText, queryByText } = render(<Table {...mockProps} />);

    getByText('Cooper AL');
    const removeButton = queryByText('remove');

    expect(removeButton).toBeNull();
  });

  it('should render remove button if the retrieved user is an admin', () => {
    const mockProps = {
      users: [{
        id: '24JHne98',
        username: 'AL Cooper',
        email: 'al.cooper@alcooper.com',
        role: 'admin'
      }]
    };
    const { getByText } = render(<Table {...mockProps} />);

    getByText('remove');
  });
});
