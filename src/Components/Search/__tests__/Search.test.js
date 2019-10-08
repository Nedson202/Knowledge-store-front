import React from 'react';
import wait from 'waait';

import {
  render, fireEvent, AllProviders, cleanup
} from 'test-utils';
import { bookFilter } from 'queries/books';
import { BOOKS_PATH } from 'settings';

import { setRetrievedBooks } from 'redux/actions/bookActions';
import store from '../../../redux';

import Search from '..';

afterEach(cleanup);

describe('Search container', () => {
  it('should trigger search', async () => {
    const searchBooksData = [
      {
        id: '12ERtr78h',
        name: 'A new day',
        genre: 'comedy',
        authors: 'George Carlin',
        averageRating: 0,
        googleAverageRating: 5,
        year: null,
        image: 'https://image.url',
        userId: '09IE7hhfe3',
        downloadable: [null]
      }
    ];
    const mocks = [
      {
        request: {
          query: bookFilter,
          variables: {
            search: 'A new day',
            from: 0,
            size: 20,
          },
        },
        result: { data: { searchBooks: searchBooksData } }
      },
    ];

    const { getByPlaceholderText } = render(
      <AllProviders apolloMocks={mocks}>
        <Search />
      </AllProviders>
    );

    const searchBar = getByPlaceholderText('Search book collections...');

    fireEvent.change(searchBar, { target: { value: 'A new day' } });

    fireEvent.keyPress(searchBar, { key: 'Enter', keyCode: 13 });

    await wait(1001);

    store.dispatch(setRetrievedBooks(searchBooksData, false, searchBooksData.length));
    const { books: { totalSearchResult } } = store.getState();

    expect(totalSearchResult).toBe(searchBooksData.length);
  });

  it('should trigger search cancel action', () => {
    const { getByTestId, getByPlaceholderText, queryByTestId } = render(
      <AllProviders>
        <Search />
      </AllProviders>
    );

    const searchBar = getByPlaceholderText('Search book collections...');
    fireEvent.focus(searchBar);

    const resetSearchButton = getByTestId('reset-search');

    resetSearchButton.click();
    expect(queryByTestId('reset-search')).toBeNull();
  });

  it('should trigger search input blur', () => {
    const { getByPlaceholderText, queryByTestId, getByTestId } = render(
      <AllProviders>
        <Search />
      </AllProviders>
    );

    const searchBar = getByPlaceholderText('Search book collections...');
    fireEvent.blur(searchBar);

    expect(queryByTestId('reset-search')).toBeNull();

    fireEvent.focus(searchBar);
    fireEvent.change(searchBar, { target: { value: 'A new day' } });
    fireEvent.blur(searchBar);
    getByTestId('reset-search');
  });

  it('should trigger search input exit plan', () => {
    const { getByPlaceholderText } = render(
      <AllProviders>
        <Search />
      </AllProviders>
    );

    const searchBar = getByPlaceholderText('Search book collections...');
    fireEvent.focus(searchBar);
    fireEvent.change(searchBar, { target: { value: 'A' } });
    expect(window.location.pathname).toBe(BOOKS_PATH);
  });
});
