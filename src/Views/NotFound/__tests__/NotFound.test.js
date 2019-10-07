import React from 'react';
import { render } from 'test-utils';

import NotFound from '..';

test('NotFound component should render message', () => {
  const { getByText, asFragment } = render(<NotFound />);

  getByText('404!');
  getByText('Sorry this page does not exist.');

  expect(asFragment()).toMatchSnapshot();
});
