import React from 'react';
import { render, fireEvent } from 'test-utils';

import BackToTop from '..';

window.scroll = jest.fn();

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
    fireEvent.scroll(window, { target: { scrollY: 0 } });
  });

  it('should activate scroll to top', () => {
    const { getByTestId } = render(
      <BackToTop />
    );

    fireEvent.scroll(window, { target: { scrollY: 301 } });
    const backToTopButton = getByTestId('back-to-top');
    fireEvent.click(backToTopButton);

    window.scroll.mockClear();
  });
});
