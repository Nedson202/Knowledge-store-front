import React from 'react';

import { render, AllProviders } from 'test-utils';

import BookCard from '..';
import {
  mockProps, SELECT_LABEL, BOOK_ACTION_DROPMENU, BOOK_CARD, BOOK_CARD_FOOTER,
  BOOK_STAR_RATING, EDIT, DELETE,
} from './constants';

describe('BookCard', () => {
  it('should render', () => {
    const {
      getByTestId, queryByLabelText, getByText, queryByTestId,
    } = render(
      <AllProviders>
        <BookCard {...mockProps} />
      </AllProviders>
    );

    const selectCheckbox = queryByLabelText(SELECT_LABEL);
    const actionDropMenu = queryByTestId(BOOK_ACTION_DROPMENU);

    getByTestId(BOOK_CARD);
    getByTestId(BOOK_CARD_FOOTER);
    getByTestId(BOOK_STAR_RATING);
    getByText(mockProps.book.name);
    getByText(`by ${mockProps.book.authors[0]}`);

    expect(selectCheckbox).toBeNull();
    expect(actionDropMenu).toBeNull();
  });

  it('should render select checkbox', () => {
    const props = { ...mockProps, toggleCheckBox: true };
    const { getByLabelText } = render(
      <AllProviders>
        <BookCard {...props} />
      </AllProviders>
    );

    getByLabelText(SELECT_LABEL);
  });

  it('should not render book footer if card is in BookProfile page', () => {
    const props = { ...mockProps, bookProfile: true };
    const { queryByTestId } = render(
      <AllProviders>
        <BookCard {...props} />
      </AllProviders>
    );

    const bookFooter = queryByTestId(BOOK_CARD_FOOTER);

    expect(bookFooter).toBeNull();
  });

  it('should action dropmenu if card is in MyBooks page', () => {
    const props = { ...mockProps, enableEllipsis: true };
    const { getByTestId, getByText } = render(
      <AllProviders>
        <BookCard {...props} />
      </AllProviders>
    );

    getByTestId(BOOK_ACTION_DROPMENU);
    getByText(EDIT);
    getByText(DELETE);
  });
});
