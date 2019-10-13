import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, graphql, Query } from 'react-apollo';
import { ReactTitle } from 'react-meta-tags';

import BookCard from '../../Components/BookCard';
import AddBook from '../../Components/AddBook';
import ApolloPolling from '../../Components/ApolloPolling';
import BookPreloader from '../BookCatalog/BookPreloader';

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
    } catch (error) /* istanbul ignore next */ {
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
          className="btn btn-primary btn-raised add-book"
          data-target="#AddBookModal"
          data-toggle="modal"
          onClick={this.unSetBookToEdit}
          type="button"
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
      <h4 className="book-retrieve-error">You are yet to add a book</h4>
    );
  }

  render() {
    const { bookToEdit } = this.props;
    const { editingBook } = this.state;

    return (
      <Query
        query={fetchUsersBooks}
        pollInterval={2000}
        fetchPolicy="cache-and-network"
      >
        {({
          loading,
          data: { usersBooks = [] } = {},
          startPolling, stopPolling,
        }) => (
          <Fragment>
            <ReactTitle title="My Books" />

            <div className="container-content">
              {this.renderPageHeader()}
              {usersBooks && this.renderBooks(usersBooks)}
              {loading && <BookPreloader loadingBook={loading} />}
              {!loading && this.render404(usersBooks)}
            </div>

            <ApolloPolling
              startPolling={startPolling}
              stopPolling={stopPolling}
            />

            <AddBook
              bookToEdit={bookToEdit}
              editingBook={editingBook}
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

const mapStateToProps = ({ books }) => ({
  bookToEdit: books.bookToEdit
});

export default compose(
  graphql(removeBook, { name: REMOVE_BOOK_QUERY, }),
  connect(mapStateToProps)
)(MyBooks);
