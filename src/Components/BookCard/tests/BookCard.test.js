import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
      <BrowserRouter>
        <BookCard {...mockProps} />
      </BrowserRouter>
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
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    getByLabelText('Select');
  });

  it('should not render book footer if card is in BookProfile page', () => {
    const props = { ...mockProps, bookProfile: true };
    const { queryByTestId } = render(
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    const bookFooter = queryByTestId('book-card-footer');

    expect(bookFooter).toBeNull();
  });

  it('should action dropmenu if card is in MyBooks page', () => {
    const props = { ...mockProps, enableEllipsis: true };
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <BookCard {...props} />
      </BrowserRouter>
    );

    getByTestId('book-action-dropmenu');
    getByText('edit');
    getByText('delete');
  });
});
