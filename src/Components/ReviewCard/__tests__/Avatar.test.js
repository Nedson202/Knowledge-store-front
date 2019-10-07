import React from 'react';
import { render } from 'test-utils';

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
