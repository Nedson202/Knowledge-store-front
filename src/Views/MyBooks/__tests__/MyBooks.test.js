import React from 'react';

import {
  AllProviders, render, waitForTime, fireEvent
} from 'test-utils';

import {
  BOOK_TITLE, NOT_FOUND_MESSAGE, MY_BOOKS_MOCK, MY_BOOKS, REMOVE_BOOK_MOCK,
  MY_BOOKS_MOCK_WITHOUT_DATA,
  DELETE,
  EDIT
} from './constants';
import MyBooks from '..';

describe('MyBooks container', () => {
  it('should render', async () => {
    const { container, getByText, queryByText, } = render(
      <AllProviders apolloMocks={[MY_BOOKS_MOCK]}>
        <MyBooks />
      </AllProviders>
    );

    getByText(MY_BOOKS);

    expect(container).toBeVisible();
    expect(queryByText(BOOK_TITLE)).toBeNull();
    await waitForTime(0);

    getByText(BOOK_TITLE);
  });

  it('should render 404', async () => {
    const { getByText, } = render(
      <AllProviders apolloMocks={MY_BOOKS_MOCK_WITHOUT_DATA}>
        <MyBooks />
      </AllProviders>
    );

    await waitForTime(0);

    getByText(NOT_FOUND_MESSAGE);
  });

  it('should trigger book removal', async () => {
    const { queryAllByText } = render(
      <AllProviders
        apolloMocks={[
          MY_BOOKS_MOCK,
          REMOVE_BOOK_MOCK,
          MY_BOOKS_MOCK
        ]}
      >
        <MyBooks />
      </AllProviders>
    );

    await waitForTime(0);

    fireEvent.click(queryAllByText(DELETE)[0]);
  });

  it('should trigger book edit', async () => {
    const { queryAllByText } = render(
      <AllProviders
        apolloMocks={[
          MY_BOOKS_MOCK,
        ]}
      >
        <MyBooks />
      </AllProviders>
    );

    await waitForTime(0);

    fireEvent.click(queryAllByText(EDIT)[0]);
  });
});
