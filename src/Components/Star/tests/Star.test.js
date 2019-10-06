import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Star from '..';

test('React star rating component should render', () => {
  const { getByTestId, } = render(<Star />);

  getByTestId('react-star-rating');
});
