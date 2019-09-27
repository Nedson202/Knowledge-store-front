import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, graphql, Query } from 'react-apollo';
import { ReactTitle } from 'react-meta-tags';

import BookCard from '../BookCard';
import AddBook from '../AddBook';
import BookPreloader from '../BookCatalog/BookPreloader';
import ApolloPolling from '../ApolloPolling/ApolloPolling';

import { fetchUsersBooks, removeBook } from '../../queries/books';
import { setBookToEdit } from '../../redux/actions/bookActions';
import { toaster } from '../../utils';
import { REMOVE_BOOK_QUERY, SUCCESS } from '../../settings';

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

  setBookToRemove = id => async () => {
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

  render404(usersBooks) {
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
    const { bookToEdit } = this.props;
    const { editingBook } = this.state;

    return (
      <Query
        query={fetchUsersBooks}
        pollInterval={2000}
      >
        {({
          loading,
          data: { usersBooks = [] } = {},
          startPolling, stopPolling,
        }) => (
          <Fragment>
            <ReactTitle title="My Books" />

            <AddBook
              bookToEdit={bookToEdit}
              editingBook={editingBook}
            />
            {this.renderPageHeader()}
            <div className="container-content" id="main">
              {usersBooks && this.renderBooks(usersBooks)}
              {loading && <BookPreloader loadingBook={loading} />}
            </div>
            {!loading && this.render404(usersBooks)}

            <ApolloPolling
              startPolling={startPolling}
              stopPolling={stopPolling}
            />
          </Fragment>
        )}
      </Query>
    );
  }
}

MyBooks.propTypes = {
  bookToEdit: PropTypes.object,
  removeBookQuery: PropTypes.func,
  dispatch: PropTypes.func,
};

MyBooks.defaultProps = {
  bookToEdit: {},
  removeBookQuery: {},
  dispatch: {},
};

const mapStateToProps = state => ({
  bookToEdit: state.books.bookToEdit
});

export default compose(
  graphql(removeBook, { name: REMOVE_BOOK_QUERY, }),
  connect(mapStateToProps)
)(MyBooks);
