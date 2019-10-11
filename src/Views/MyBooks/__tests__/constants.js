/* istanbul ignore file */

import { fetchUsersBooks, removeBook } from 'queries/books';

export const MY_BOOKS_MOCK = {
  request: {
    query: fetchUsersBooks
  },
  result: {
    data: {
      usersBooks: [
        {
          id: '89eP756Ehy',
          name: 'Lost book of oro',
          genre: 'Fiction',
          authors: [],
          averageRating: null,
          description: 'This is the lost book',
          googleAverageRating: '3.3',
          image: null,
          downloadable: [null],
          year: 1905,
          userId: '90uIRy58r0'
        }
      ]
    }
  }
};

export const REMOVE_BOOK_MOCK = {
  request: {
    query: removeBook,
    variables: {
      bookId: '89eP756Ehy'
    }
  },
  result: {
    data: {
      deleteBook: {
        message: 'Book removed'
      }
    }
  }
};

export const MY_BOOKS_MOCK_WITHOUT_DATA = [
  {
    request: {
      query: fetchUsersBooks
    },
    result: {
      data: {
        usersBooks: []
      }
    }
  }
];

export const MY_BOOKS = 'My Books';
export const ADD_BOOK = 'Add Book';
export const PAGE_HEADER = 'page-header';
export const DELETE = 'delete';
export const EDIT = 'edit';
export const CANCEL = 'Cancel';
export const SELECT = 'Select';
export const BOOK_TITLE = 'Lost book of oro';
export const NOT_FOUND_MESSAGE = 'You are yet to add a book';
