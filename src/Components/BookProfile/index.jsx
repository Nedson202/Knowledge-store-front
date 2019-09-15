import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, Query } from 'react-apollo';
import { ReactTitle } from 'react-meta-tags';

import BookCard from '../BookCard';
import AddReview from '../AddReview';
import ReviewCard from '../ReviewCard';
import ProfilePreloader from './ProfilePreloader';
import BackToTop from '../BackToTop';

import { fetchBook, addToFavorites } from '../../queries/books';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import {
  TOASTR_ERROR, SUCCESS, NO_AUTHOR, ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES, ADD_FAVORITES_QUERY,
} from '../../settings/defaults';
import BookRetrieveError from './BookRetrieveError';

class BookProfile extends Component {
  toggleFavorites = id => async () => {
    const { addToFavoritesQuery } = this.props;

    try {
      const response = await addToFavoritesQuery({
        variables: {
          bookId: id
        },
        refetchQueries: this.refetchQuery()
      });

      const { addFavorite: { message } } = response.data;
      toaster(SUCCESS, message);
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  refetchQuery() {
    const { match: { params: { id } } } = this.props;
    return [
      {
        query: fetchBook,
        variables: {
          bookId: id
        }
      }
    ];
  }

  renderBookHeader(book) {
    const { reviews } = book;
    const numberOfReviews = reviews.length || 0;
    return (
      <div className="book-profile-title">
        <h2>{book && book.name}</h2>
        <h5>
          {book && book.authors.length
            ? `by ${book.authors.join(', ')}`
            : NO_AUTHOR}
        </h5>
        <div className="book-meta">
          <span className="genre-badge">
            {book && (
              <span>
                <b>Genre:</b>
                {' '}
                {book.genre.join(', ')}
              </span>
            )}
          </span>
          <p>
            {numberOfReviews}
            {' '}
            review(s)
          </p>
        </div>
      </div>
    );
  }

  renderAddReviewForm(book) {
    return (
      <div className="add-review-form">
        <AddReview
          toggleForm={false}
          reviewType="review"
          bookId={book && book.id}
        />
      </div>
    );
  }

  renderReviews(book) {
    return (
      <ReviewCard
        reviews={book && book.reviews}
        bookId={book && book.id}
      />
    );
  }

  renderMoreBooks(books) {
    let moreBooks = 'Not Available';

    if (books.length) {
      moreBooks = books && books.length !== 0 && books.map(book => (
        <BookCard
          key={book.id}
          enableEllipsis={false}
          book={book}
          moreBooks
        />
      ));
    }

    return (
      <div className="book-recommendation">
        <h3>Recommended</h3>
        <hr />
        <div className="book-profile-more">
          {moreBooks}
        </div>
      </div>
    );
  }

  renderAll(book = {}) {
    const { moreBooks = [], id, isFavorite } = book;
    const favoriteOptionLabel = isFavorite
      ? REMOVE_FROM_FAVORITES : ADD_TO_FAVORITES;

    return (
      <Fragment>
        <div>
          <div className="original-book">
            <BookCard
              book={book}
              enableEllipsis={false}
              bookProfile
            />
            <div className="favorite-option">
              <ion-icon
                name="bookmark"
                style={{ color: isFavorite && '#005C97' }}
              />
              <p
                className="favorite-action-button"
                onClick={this.toggleFavorites(id)}
              >
                {favoriteOptionLabel}
              </p>
            </div>
          </div>
          <div className="book-profile-details">
            {this.renderBookHeader(book)}
            <hr />
            <p>
              {book && book.description}
            </p>
            {book
              && !book.description
              && <h4>No description available for this book</h4>}
          </div>
        </div>
        {this.renderMoreBooks(moreBooks)}
        {this.renderAddReviewForm(book)}
        {this.renderReviews(book)}
      </Fragment>
    );
  }

  render() {
    let bookLoadError;
    const { match } = this.props;

    return (
      <Query
        query={fetchBook}
        variables={{
          bookId: match.params.id
        }}
      >
        {({
          loading, data: { book = {} } = {},
        }) => {
          const hasProperty = Object.keys(book).length;

          if (!loading && !hasProperty) {
            bookLoadError = <BookRetrieveError />;
          }

          return (
            <Fragment>
              <ReactTitle title="Book Profile" />

              {bookLoadError}
              <div className="book-profile-container">
                {loading && (<ProfilePreloader />)}
                {!loading && hasProperty !== 0 && this.renderAll(book)}
              </div>
              <BackToTop />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

BookProfile.propTypes = {
  match: PropTypes.object,
  addToFavoritesQuery: PropTypes.func,
};

BookProfile.defaultProps = {
  match: {},
  addToFavoritesQuery: () => { },
};

export default compose(
  graphql(addToFavorites, {
    name: ADD_FAVORITES_QUERY,
  }),
)(BookProfile);
