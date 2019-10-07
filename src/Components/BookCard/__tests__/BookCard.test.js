import React from 'react';

import { render, AllProviders } from 'test-utils';

import BookCard from '..';

const mockProps = {
  book: {
    id: '67sdGDf12',
    name: 'The lost book of optununu',
    image: 'https://image.url',
    authors: ['Cooper AL']
  }
};

describe('BookCard', () => {
  it('should render', () => {
    const {
      getByTestId, queryByLabelText, getByText, queryByTestId,
    } = render(
      <AllProviders>
        <BookCard {...mockProps} />
      </AllProviders>
    );

    const selectCheckbox = queryByLabelText('Select');
    const actionDropMenu = queryByTestId('book-action-dropmenu');

    getByTestId('book-card');
    getByTestId('book-card-footer');
    getByTestId('book-star-rating');
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

    getByLabelText('Select');
  });

  it('should not render book footer if card is in BookProfile page', () => {
    const props = { ...mockProps, bookProfile: true };
    const { queryByTestId } = render(
      <AllProviders>
        <BookCard {...props} />
      </AllProviders>
    );

    const bookFooter = queryByTestId('book-card-footer');

    expect(bookFooter).toBeNull();
  });

  it('should action dropmenu if card is in MyBooks page', () => {
    const props = { ...mockProps, enableEllipsis: true };
    const { getByTestId, getByText } = render(
      <AllProviders>
        <BookCard {...props} />
      </AllProviders>
    );

    getByTestId('book-action-dropmenu');
    getByText('edit');
    getByText('delete');
  });
});
