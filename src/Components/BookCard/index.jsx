import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import Truncate from 'react-truncate';

import Star from '../Star';
import BookImageLoader from './BookImageLoader';

import { toHTTPS } from '../../utils';
import { IMAGE_FETCH_ERROR, EDIT, DELETE } from '../../settings';

class BookCard extends Component {
  constructor(props) {
    super(props);

    const { book: { image } } = this.props;
    this.state = {
      imageLoaded: false /* eslint-disable-line */,
      bookImage: image || '',
      imageLoadingError: ''
    };
  }

  checkImageRender = image => () => {
    this.setState({
      imageLoaded: true,
      bookImage: image,
      imageLoadingError: ''
    });
  };

  handleImageLoadingError = () => {
    this.setState({
      imageLoadingError: IMAGE_FETCH_ERROR
    });
  };

  renderImage = (book, moreBooks) => {
    const { image, id } = book;
    const { imageLoaded, bookImage, imageLoadingError } = this.state;
    const link = !moreBooks ? `/books/${id}` : `${id}`;

    return (
      <Fragment>
        {bookImage && !imageLoaded && imageLoadingError.length === 0 && <BookImageLoader />}
        {!bookImage || imageLoadingError.length !== 0 ? (
          <div
            className="text-center book__card--error-placeholder"
          >
            {imageLoadingError}
          </div>
        ) : null}

        {bookImage && imageLoaded && imageLoadingError.length === 0 && (
          <Link to={link}>
            <img
              src={toHTTPS(bookImage)}
              className="book__card--images"
              alt="Card cap"
              onLoad={this.checkImageRender}
            />
          </Link>
        )}

        {bookImage && !imageLoaded && (
          <img
            src={toHTTPS(image) || ''}
            className="hide"
            onLoad={this.checkImageRender(book ? image : '')}
            onError={this.handleImageLoadingError}
            alt="userImage"
          />
        )}
      </Fragment>
    );
  };

  renderActionDropdown() {
    const {
      enableEllipsis, setBookToEdit, book: { id }, book, setBookToRemove
    } = this.props;

    if (!enableEllipsis) {
      return;
    }

    return (
      <div data-testid="book-action-dropmenu">
        <i
          aria-expanded="false"
          aria-haspopup="true"
          className="fa fa-ellipsis-v"
          data-toggle="dropdown"
        />
        <span className="dropdown-menu" id="book-action-buttons">
          <button
            className="dropdown-item book-action-navlink"
            data-toggle="modal"
            data-target="#AddBookModal"
            onClick={setBookToEdit(book)}
            type="button"
          >
            {EDIT}
            <i className="fa fa-edit" />
          </button>
          <button
            className="dropdown-item book-action-navlink"
            id="trash-icon"
            onClick={setBookToRemove(id)}
            type="button"
          >
            {DELETE}
            <i className="fa fa-trash" />
          </button>
        </span>
      </div>
    );
  }

  renderBookFooter(book, moreBooks) {
    const {
      authors, userId, id, averageRating
    } = book;
    const { bookProfile } = this.props;
    const link = !moreBooks ? `/books/${id}` : `${id}`;

    if (bookProfile) {
      return;
    }

    return (
      <div
        className="book__card--footer"
        data-testid="book-card-footer"
      >
        <span className="book__card--footer-link">
          <Link to={link} className="book__card--footer-title">
            <Truncate
              lines={1}
            >
              {book.name}
              <br />
            </Truncate>
          </Link>
          {this.renderActionDropdown(userId)}
        </span>
        <span className="book__card--author">
          <Truncate
            lines={1}
          >
            {authors.length > 0 && `by ${authors.join(', ')}`}
          </Truncate>
        </span>
        <span className="react-star" data-testid="book-star-rating">
          <Star
            value={averageRating}
          />
        </span>
      </div>
    );
  }

  renderCheckBox() {
    const { checkBoxChange } = this.props;
    return (
      <Checkbox onChange={checkBoxChange}>Select</Checkbox>
    );
  }

  render() {
    const { toggleCheckBox, book, moreBooks } = this.props;

    return (
      <div
        className="book__card"
        data-testid="book-card"
      >
        {toggleCheckBox && this.renderCheckBox()}
        {book && this.renderImage(book, moreBooks)}
        {book && this.renderBookFooter(book, moreBooks)}
      </div>
    );
  }
}

BookCard.propTypes = {
  book: PropTypes.object,
  toggleCheckBox: PropTypes.bool,
  enableEllipsis: PropTypes.bool,
  moreBooks: PropTypes.bool,
  bookProfile: PropTypes.bool,
  checkBoxChange: PropTypes.func,
  setBookToEdit: PropTypes.func,
  setBookToRemove: PropTypes.func,
};

BookCard.defaultProps = {
  book: {},
  toggleCheckBox: false,
  enableEllipsis: false,
  moreBooks: false,
  bookProfile: false,
  checkBoxChange: () => { },
  setBookToEdit: () => { },
  setBookToRemove: () => { },
};

export default BookCard;
