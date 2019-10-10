import React from 'react';
import { render, fireEvent } from 'test-utils';

import BackToTop from '..';
import {
  SCROLL_301, SCROLL_0, SCROLL_500, BACK_TO_TOP
} from './constants';

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

    expect(queryByTestId(BACK_TO_TOP)).toBeNull();
    fireEvent.scroll(window, { target: { scrollY: SCROLL_500 } });
    getByTestId(BACK_TO_TOP);
    fireEvent.scroll(window, { target: { scrollY: SCROLL_0 } });
  });

  it('should activate scroll to top', () => {
    const { getByTestId } = render(
      <BackToTop />
    );

    fireEvent.scroll(window, { target: { scrollY: SCROLL_301 } });
    const backToTopButton = getByTestId(BACK_TO_TOP);
    fireEvent.click(backToTopButton);

    window.scroll.mockClear();
  });
});
