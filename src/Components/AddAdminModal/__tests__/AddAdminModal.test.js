import React from 'react';
import { render } from 'test-utils';

import AddAddminModal from '..';

test('AddAddminModal component should render', () => {
  const {
    getAllByText, getByText, asFragment, queryByTestId
  } = render(<AddAddminModal />);

  getByText('Close');
  getAllByText('Add Admin');
  getByText('User Email');

  queryByTestId('add-admiin-modal');

  expect(asFragment()).toMatchSnapshot();
});
