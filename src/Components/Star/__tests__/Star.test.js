import React from 'react';
import { render } from 'test-utils';

import Star from '..';

test('React star rating component should render', () => {
  const { getByTestId, } = render(<Star />);

  getByTestId('react-star-rating');
});
