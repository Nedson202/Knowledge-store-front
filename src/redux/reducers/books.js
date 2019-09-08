import { SET_BOOKS, SET_BOOK_TO_EDIT } from '../constants/actionTypes';

const initialState = {
  isBookLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS: {
      return {
        ...state,
        books: action.books,
        isBookLoading: action.bookLoading,
        totalSearchResult: action.totalSearchResult,
      };
    }

    case SET_BOOK_TO_EDIT: {
      return {
        ...state,
        bookToEdit: action.book,
      };
    }

    default: return state;
  }
};
