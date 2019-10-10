import React from 'react';

import {
  AllProviders, render, waitForTime, fireEvent
} from 'test-utils';

import {
  FAVORITES_MOCK, MY_FAVORITES, REMOVE_FAVORITES, PAGE_HEADER,
  FAVORITES_MOCK_WITHOUT_DATA, REMOVE_FAVORITES_MOCK, BOOK_TITLE, REMOVE,
  CANCEL, SELECT, NOT_FOUND_MESSAGE
} from './constants';
import Favorites from '..';

describe('Favorites container', () => {
  it('should render', async () => {
    const { container, getByText, getByTestId, } = render(
      <AllProviders apolloMocks={[FAVORITES_MOCK]}>
        <Favorites />
      </AllProviders>
    );

    getByText(MY_FAVORITES);
    getByText(REMOVE_FAVORITES);
    getByTestId(PAGE_HEADER);

    expect(container).toBeVisible();

    await waitForTime(0);

    getByText(BOOK_TITLE);
  });

  it('should render 404', async () => {
    const { getByText, } = render(
      <AllProviders apolloMocks={FAVORITES_MOCK_WITHOUT_DATA}>
        <Favorites />
      </AllProviders>
    );

    await waitForTime(0);

    getByText(NOT_FOUND_MESSAGE);
  });

  it('should trigger favorites removal', async () => {
    const { getByText, queryAllByLabelText } = render(
      <AllProviders
        apolloMocks={[
          FAVORITES_MOCK,
          REMOVE_FAVORITES_MOCK,
          FAVORITES_MOCK
        ]}
      >
        <Favorites />
      </AllProviders>
    );

    await waitForTime(0);

    fireEvent.click(getByText(REMOVE_FAVORITES));

    const selectBook = queryAllByLabelText(SELECT)[0];
    fireEvent.click(selectBook);
    // uncheck select box
    fireEvent.click(selectBook);
    // check select box
    fireEvent.click(selectBook);

    getByText(CANCEL);

    const removeFavoritesButton = getByText(REMOVE);
    fireEvent.click(removeFavoritesButton);
  });
});
