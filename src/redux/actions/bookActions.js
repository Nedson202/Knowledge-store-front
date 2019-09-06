import {
  SET_BOOKS, SET_LOADER,
  SET_BOOK_TO_EDIT
} from '../constants/actionTypes';

const setRetrievedBooks = (books, state, total) => ({
  type: SET_BOOKS,
  books,
  bookLoading: state,
  totalSearchResult: total
});

const setBookToEdit = book => ({
  type: SET_BOOK_TO_EDIT,
  book,
});

const bookLoadingState = state => ({
  type: SET_LOADER,
  bookLoading: state
});

export {
  setRetrievedBooks,
  bookLoadingState,
  setBookToEdit
};
