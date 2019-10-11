import React from 'react';
import { render } from 'test-utils';

import AddAddminModal from '..';
import {
  CLOSE, ADD_ADMIN, USER_EMAIL, ADD_ADMIN_MODAL
} from './constants';

test('AddAddminModal component should render', () => {
  const {
    getAllByText, getByText, asFragment, queryByTestId
  } = render(<AddAddminModal />);

  getByText(CLOSE);
  getAllByText(ADD_ADMIN);
  getByText(USER_EMAIL);

  queryByTestId(ADD_ADMIN_MODAL);

  expect(asFragment()).toMatchSnapshot();
});
