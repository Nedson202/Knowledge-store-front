import React, { Component, Fragment } from 'react';
import './_MyBooks.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookCard from '../BookCard/BookCard';
import AddBook from '../AddBook/AddBook';

class MyBooks extends Component {
  render() {
    return (
      <Fragment>
        <AddBook />
        <div className="user-books__header">
          <h4>My Books</h4>
          <button
            type="button"
            className="btn btn-primary btn-raised add-book"
            data-toggle="modal"
            data-target="#AddBookModal"
          >
            Add Book
          </button>
        </div>
        <div className="container-content" id="main">
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
      </Fragment>
    );
  }
}

export default MyBooks;
