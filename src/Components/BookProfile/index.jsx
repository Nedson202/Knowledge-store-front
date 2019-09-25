import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, Query } from 'react-apollo';
import { ReactTitle } from 'react-meta-tags';

import BookCard from '../BookCard';
import ReviewForm from '../ReviewForm';
import ReviewCard from '../ReviewCard';
import ProfilePreloader from './ProfilePreloader';
import BackToTop from '../BackToTop';
import Star from '../Star';

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

  calculateRatingStats = (reviews) => {
    const ratingSpecs = {
      1: 'oneStar',
      2: 'twoStar',
      3: 'threeStar',
      4: 'fourStar',
      5: 'fiveStar',
    };

    const ratingStats = {
      oneStar: {
        rating: 1,
        ratingCount: 0,
        percentage: 0,
      },
      twoStar: {
        rating: 2,
        ratingCount: 0,
        percentage: 0,
      },
      threeStar: {
        rating: 3,
        ratingCount: 0,
        percentage: 0,
      },
      fourStar: {
        rating: 4,
        ratingCount: 0,
        percentage: 0,
      },
      fiveStar: {
        rating: 5,
        ratingCount: 0,
        percentage: 0,
      },
    };

    reviews.forEach((review) => {
      const parseReview = Math.floor(review.rating);

      const ratingStarType = ratingSpecs[parseReview];
      const ratingStatsValue = ratingStats[ratingStarType].ratingCount;
      const starCount = ratingStatsValue + 1;
      const totalPercentage = starCount / reviews.length * 100;
      ratingStats[ratingStarType].percentage = totalPercentage;
      ratingStats[ratingStarType].ratingCount = starCount;
    });

    return ratingStats;
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
        <ReviewForm
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

  renderReviewStats = (averageRating, reviews) => {
    const ratingStats = this.calculateRatingStats(reviews);
    const averageRatingToFixed = averageRating.toFixed(1);
    const statsToArray = [];

    // eslint-disable-next-line no-unused-vars
    Object.entries(ratingStats).forEach(([key, value]) => {
      statsToArray.push({
        rating: value.rating,
        percentage: value.percentage,
        ratingCount: value.ratingCount,
      });
    });

    const sortStatsArray = statsToArray.sort((valA, valB) => valB.rating - valA.rating);

    const mapStats = sortStatsArray.map((stat, index) => (
      <div
        className={`book-profile-rating-stats-child ${!stat.ratingCount && 'blur'}`}
        // eslint-disable-next-line react/no-array-index-key
        key={`${stat.rating}-${index}`}
      >
        <div>
          <Star
            value={stat.rating}
            size={20}
          />
        </div>
        <span>
          {`${Math.floor(stat.percentage)}%`}
        </span>
      </div>
    ));

    return (
      <div className="book-profile-rating">
        <div className="book-profile-rating-summary">
          <span>{averageRatingToFixed}</span>
          <Star
            value={Number(averageRatingToFixed)}
            size={20}
          />
        </div>

        <div className="book-profile-rating-stats">
          {mapStats}
        </div>
      </div>
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
    const {
      moreBooks = [], id, isFavorite, reviews, averageRating
    } = book;
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
        {this.renderReviewStats(averageRating, reviews)}
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
