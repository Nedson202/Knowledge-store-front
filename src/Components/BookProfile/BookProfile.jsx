import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import './_BookProfile.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookCard from '../BookCard/BookCard';
import AddReview from '../AddReview/AddReview';
import ReviewCard from '../ReviewCard/ReviewCard';
import { fetchBook, addToFavorites } from '../../queries/books';
import ProfilePreloader from './ProfilePreloader';
import toaster from '../../utils/toast';
import errorHandler from '../../utils/errorHandler';
import BackToTop from '../BackToTop/BackToTop';

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
    return (
      <div className="book-profile-title">
        <h2>{book && book.name}</h2>
        <h5>
          {book && book.authors.length ? `by, ${
            book.authors.map(author => author)
          }` : 'author unavailable'}
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
          <p>202 reviews</p>
          <p>20 stars</p>
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
    const { fetchBooksQuery: { loading } } = this.props;
    return (
      <div className="review-card">
        {this.renderAddReviewForm()}
        <ReviewCard
          reviews={book && book.reviews}
          bookId={book && book.id}
        />
        {loading && this.renderLoader()}
      </div>
    );
  }

  renderAuthorInfo() {
    return (
      <div className="about-author">
        <h3>About the Author</h3>
        <hr />
        placerat nisl. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.
        Praesent vestibulum dapibus nibh. Aliquam lobortis.Fusce egestas elit eget lorem
        Nullam cursus lacinia erat. Vivamus quis mi. Vestibulum
        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce
        id purus. Nunc interdum lacus sit amet orci.Aenean commodo ligula eget dolor.
        Sed augue ipsum, egestas nec, vestibulum et, malesuada adipiscing, dui. Vivamus
        euismod mauris. Cras risus ipsum, faucibus ut, ullamcorper id, varius ac, leo.
        Suspendisse eu ligula.
      </div>
    );
  }

  renderMoreBooks(books) {
    return (
      <div>
        <h2>Other helpful books</h2>
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

  renderBookMarkOption() {

  }

  renderAll(book) {
    const { moreBooks, id, isFavorite } = book;
    const favoriteOption = isFavorite
      ? <p className="favorite-action-button">Remove from Favorites</p>
      : <p className="favorite-action-button" onClick={this.addBookToFavorite(id)}>Add to Favorites</p>;

    return (
      <Fragment>
        <div className="original-book">
          <BookCard
            book={book}
            enableEllipsis={false}
          />
          <div className="favorite-option">
            <i className="fas fa-bookmark" style={{ color: isFavorite && '#005C97' }} />
            {favoriteOption}
          </div>
        </div>
        <div className="book-profile">
          {this.renderBookHeader(book)}
          <hr />
          <p>
            {book && book.description}
          </p>
          {book && !book.description && <h4>No description available for this book</h4>}
        </div>
        {this.renderMoreBooks(moreBooks)}
        {this.renderReviews(book)}
        <div>
          {this.renderAuthorInfo()}
        </div>
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
            <ProfilePreloader
              reviewLoader={this.renderReviews}
            />
          )}
          {!loading && book && this.renderAll(book)}
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
