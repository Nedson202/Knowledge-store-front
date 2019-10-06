import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Spinner from '..';

test('Spinner component should render', () => {
  const { getByTestId, asFragment, } = render(<Spinner />);

  getByTestId('loading-indicator');

  expect(asFragment()).toMatchSnapshot();
});
