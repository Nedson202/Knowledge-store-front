import React from 'react';
import { render } from 'test-utils';

import Spinner from '..';

test('Spinner component should render', () => {
  const { getByTestId, asFragment, } = render(<Spinner />);

  getByTestId('loading-indicator');

  expect(asFragment()).toMatchSnapshot();
});
