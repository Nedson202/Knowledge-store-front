import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import NotFound from '..';

test('NotFound component should render message', () => {
  const { getByText, asFragment } = render(<NotFound />);

  expect(getByText('404!')).toHavClass('not-found__404');
  expect(asFragment()).toMatchSnapshot();
  expect(getByText('Sorry this page seems to have been eaten.')).toHavClass('not-found__text');
  expect(getByText('Sorry this page seems to have been eaten.')).toBeInTheDOM();
});
