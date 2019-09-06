import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './_MyBooks.scss';
import '../BookCatalog/_BookCatalog.scss';
import { compose, graphql } from 'react-apollo';
import BookCard from '../BookCard';
import AddBook from '../AddBook';
import { fetchUsersBooks, removeBook } from '../../queries/books';
import BookPreloader from '../BookCatalog/BookPreloader';
import { setBookToEdit } from '../../redux/actions/bookActions';
import toaster from '../../utils/toast';
import { FETCH_USERS_BOOKS_QUERY, REMOVE_BOOK_QUERY, SUCCESS } from '../../defaults';

class MyBooks extends Component {
  state = {
    editingBook: false
  }

  setBookToEdit = book => () => {
    const { dispatch } = this.props;
    dispatch(setBookToEdit(book));
    this.setState({ editingBook: true });
  }

  unSetBookToEdit = () => {
    const { dispatch } = this.props;
    dispatch(setBookToEdit({}));
    this.setState({ editingBook: false });
  }

  setBookToRemove = id => () => {
    this.setState({ bookId: id }, async () => { //eslint-disable-line
      const { removeBookQuery } = this.props;

      try {
        const response = await removeBookQuery({
          variables: {
            bookId: id
          },
          refetchQueries: this.refetchQueries()
        });

        const { deleteBook: { message } } = response.data;

        toaster(SUCCESS, message);
      } catch (error) {
        console.error(error);
      }
    });
  }

  refetchQueries() {
    return [
      {
        query: fetchUsersBooks
      }
    ];
  }

  renderPageHeader() {
    return (
      <div className="user-books__header">
        <h4>My Books</h4>
        <button
          type="button"
          className="btn btn-primary btn-raised add-book"
          data-toggle="modal"
          data-target="#AddBookModal"
          onClick={this.unSetBookToEdit}
        >
          Add Book
        </button>
      </div>
    );
  }

  renderBooks(books) {
    if (!books.length) {
      return;
    }

    return (
      <Fragment>
        {books.map(book => (
          <BookCard
            key={book.id}
            book={book}
            enableEllipsis
            setBookToEdit={this.setBookToEdit}
            setBookToRemove={this.setBookToRemove}
          />
        ))}
      </Fragment>
    );
  }

  render404() {
    const { fetchUsersBooksQuery: { usersBooks = [] } } = this.props;

    if (usersBooks.length) {
      return;
    }

    return (
      <div className="book-retrieve-error">
        <h4>You are yet to add a book</h4>
      </div>
    );
  }

  render() {
    const { fetchUsersBooksQuery: { usersBooks = [], loading }, bookToEdit } = this.props;
    const { editingBook } = this.state;
    return (
      <Fragment>
        <AddBook
          bookToEdit={bookToEdit}
          editingBook={editingBook}
        />
        {this.renderPageHeader()}
        <div className="container-content" id="main">
          {usersBooks && this.renderBooks(usersBooks)}
          {loading && <BookPreloader loadingBook={loading} />}
        </div>
        {!loading && this.render404()}
      </Fragment>
    );
  }
}

MyBooks.propTypes = {
  fetchUsersBooksQuery: PropTypes.object,
  bookToEdit: PropTypes.object,
  removeBookQuery: PropTypes.func,
  dispatch: PropTypes.func,
};

MyBooks.defaultProps = {
  fetchUsersBooksQuery: {},
  bookToEdit: {},
  removeBookQuery: {},
  dispatch: {},
};

const mapStateToProps = state => ({
  bookToEdit: state.books.bookToEdit
});

export default compose(
  graphql(fetchUsersBooks, { name: FETCH_USERS_BOOKS_QUERY, }),
  graphql(removeBook, { name: REMOVE_BOOK_QUERY, }),
  connect(mapStateToProps)
)(MyBooks);
