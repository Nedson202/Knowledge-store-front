import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NotFound from '..';

test('NotFound component should render message', () => {
  const { getByText, asFragment } = render(<NotFound />);

  getByText('404!');
  getByText('Sorry this page does not exist.');

  expect(asFragment()).toMatchSnapshot();
});
