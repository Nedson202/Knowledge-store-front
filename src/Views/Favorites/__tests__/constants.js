/* istanbul ignore file */

import { getFavorites, removeFavorites } from 'queries/books';

export const FAVORITES_MOCK = {
  request: {
    query: getFavorites
  },
  result: {
    data: {
      favoriteBooks: [
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

export const REMOVE_FAVORITES_MOCK = {
  request: {
    query: removeFavorites,
    variables: {
      books: ['89eP756Ehy']
    }
  },
  result: {
    data: {
      removeFavorites: {
        message: 'Favorites removed'
      }
    }
  }
};

export const FAVORITES_MOCK_WITHOUT_DATA = [
  {
    request: {
      query: getFavorites
    },
    result: {
      data: {
        favoriteBooks: []
      }
    }
  }
];

export const MY_FAVORITES = 'My Favorites';
export const REMOVE_FAVORITES = 'Remove Favorites';
export const PAGE_HEADER = 'page-header';
export const REMOVE = 'Remove';
export const CANCEL = 'Cancel';
export const SELECT = 'Select';
export const BOOK_TITLE = 'Lost book of oro';
export const NOT_FOUND_MESSAGE = 'You are yet to add a book as favorite';
