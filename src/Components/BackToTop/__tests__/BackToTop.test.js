import React from 'react';
import { render, fireEvent } from 'test-utils';

import BackToTop from '..';

describe('BackToTop button', () => {
  it('should render', () => {
    const {
      container, asFragment, getByTestId, queryByTestId
    } = render(
      <BackToTop />
    );

    expect(asFragment()).toMatchSnapshot();
    expect(container).toBeInTheDocument();

    expect(queryByTestId('back-to-top')).toBeNull();
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    getByTestId('back-to-top');
  });
});
