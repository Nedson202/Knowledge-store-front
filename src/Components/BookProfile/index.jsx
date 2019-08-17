import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import './_BookProfile.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookCard from '../BookCard';
import AddReview from '../AddReview';
import ReviewCard from '../ReviewCard';
import { fetchBook, addToFavorites } from '../../queries/books';
import ProfilePreloader from './ProfilePreloader';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import BackToTop from '../BackToTop';

class BookProfile extends Component {
  state = {
    displayBackToTop: false
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  handlePageScroll = () => {
    if (document.body.scrollTop < 20 || document.documentElement.scrollTop < 20) {
      this.setState({ displayBackToTop: false });
    }
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      this.setState({ displayBackToTop: true });
    }
  };

  addBookToFavorite = id => () => {
    const { addToFavoritesQuery } = this.props;
    addToFavoritesQuery({
      variables: {
        bookId: id
      },
      refetchQueries: this.refetchQuery()
    }).then((response) => {
      const { addFavorite: { message } } = response.data;
      toaster('success', message);
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
  }

  refetchQuery() {
    const { props: { match: { params: { id } } } } = this;
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
            ? `by, ${
              book.authors.map(author => author)
            }`
            : 'author unavailable'}
        </h5>
        <div className="book-meta">
          <span className="genre-badge">
            {book && (
              <span>
                <b>Genre:</b>
                {' '}
                {book.genre.map(genre => genre)}
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

  renderAddReviewForm() {
    const { fetchBooksQuery: { book } } = this.props;
    return (
      <div className="add-review-form">
        <AddReview
          toggleForm={false}
          reviewType="add"
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
    return (
      <div>
        <h3>Recommended</h3>
        <hr />
        <div className="book-profile-more">
          {
            books && books.length !== 0 && books.map(book => (
              <BookCard
                key={book.id}
                enableEllipsis={false}
                book={book}
                moreBooks
              />
            ))
          }
        </div>
      </div>
    );
  }

  renderAll(book, loading) {
    if (loading) {
      return;
    }
    const { moreBooks, id, isFavorite } = book;
    const favoriteOption = isFavorite
      ? <p className="favorite-action-button">Remove from Favorites</p>
      : (
        <p
          className="favorite-action-button"
          onClick={this.addBookToFavorite(id)}
        >
          Add to Favorites
        </p>
      );

    return (
      <Fragment>
        <div className="original-book">
          <BookCard
            book={book}
            enableEllipsis={false}
          />
          <div className="favorite-option">
            <i
              className="fas fa-bookmark"
              style={{ color: isFavorite && '#005C97' }}
            />
            {favoriteOption}
          </div>
        </div>
        <div className="book-profile-details">
          {this.renderBookHeader(book)}
          <hr />
          <p>
            {book && book.description}
          </p>
          {book
            && !book.description && <h4>No description available for this book</h4>}
        </div>
        {this.renderMoreBooks(moreBooks)}
        {this.renderAddReviewForm()}
        {this.renderReviews(book)}
      </Fragment>
    );
  }

  renderBookError() {
    return (
      <div className="book-retrieve-error">
        <h3>The book you seek is not available</h3>
        <h5>
          You could make use of our search functionality
          <br />
          to retrieve books by
          {' '}
          <b>name</b>
          ,
          {' '}
          <b>genre</b>
          ,
          {' '}
          <b>description</b>
          ,
          {' '}
          <b>authors</b>
          {' '}
          <b>year</b>
          {' '}
          etc...
        </h5>
        <label
          htmlFor="searchBox"
          className="btn btn-raised"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          Click Me and Type
        </label>
      </div>
    );
  }

  render() {
    const { fetchBooksQuery: { book, loading } } = this.props;
    const { displayBackToTop } = this.state;

    return (
      <Fragment>
        {!loading && !book && this.renderBookError()}
        <div className="book-profile-container">
          {loading && (
            <ProfilePreloader />
          )}
          {this.renderAll(book, loading)}
        </div>
        <BackToTop
          displayBackToTop={displayBackToTop}
        />
      </Fragment>
    );
  }
}

BookProfile.propTypes = {
  fetchBooksQuery: PropTypes.object,
  match: PropTypes.object,
  addToFavoritesQuery: PropTypes.func,
};

BookProfile.defaultProps = {
  fetchBooksQuery: {},
  match: {},
  addToFavoritesQuery: () => { },
};

export default compose(
  graphql(fetchBook, {
    name: 'fetchBooksQuery',
    options: props => ({
      variables: {
        bookId: props.match.params.id
      }
    })
  }),
  graphql(addToFavorites, {
    name: 'addToFavoritesQuery',
  }),
)(BookProfile);
