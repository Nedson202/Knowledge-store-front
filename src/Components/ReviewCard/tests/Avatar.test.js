import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Avatar from '../Avatar';

const mockProps = {
  user: 'Cooper AL',
  color: 'green',
};

test('Avatar component should render', () => {
  const { getByText, asFragment, } = render(<Avatar {...mockProps} />);

  getByText('CA');

  expect(asFragment()).toMatchSnapshot();
});
