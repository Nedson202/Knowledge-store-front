import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Truncate from 'react-truncate';
import { Checkbox } from 'antd';
import './_BookCard.scss';
import Star from '../Star/Star';
import BookImageLoader from './BookImageLoader';
import toHTTPS from '../../utils/toHTTPS';

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
      imageLoadingError: 'Unable to fetch image'
    });
  };

  renderImage = (book, moreBooks) => {
    const { image, id } = book;
    const { imageLoaded, bookImage, imageLoadingError } = this.state;
    const link = !moreBooks ? `/books/${id}` : `${id}`;
    return (
      <Fragment>
        {!imageLoaded && imageLoadingError.length === 0 && <BookImageLoader />}
        {imageLoadingError.length !== 0 && (
          <div
            className="text-center"
            id="image-error-placeholder"
          >
            {imageLoadingError}
          </div>
        )}
        {imageLoaded && imageLoadingError.length === 0 && (
          <Link to={link}>
            <img
              src={toHTTPS(bookImage)}
              className="book-images parent"
              alt="Card cap"
              id="book-image"
              onLoad={this.checkImageRender}
            />
          </Link>
        )}
        <img
          src={toHTTPS(image) || ''}
          className="hide"
          onLoad={this.checkImageRender(book ? image : '')}
          onError={this.handleImageLoadingError}
          alt="userImage"
        />
      </Fragment>
    );
  };

  renderActionDropdown() {
    const {
      enableEllipsis, setBookToEdit, book: { id }, book, setBookToRemove
    } = this.props;
    if (enableEllipsis) {
      return (
        <Fragment>
          <i
            className="fa fa-ellipsis-v"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <span className="dropdown-menu" id="book-action-buttons">
            <button
              type="button"
              data-toggle="modal"
              data-target="#AddBookModal"
              className="dropdown-item book-action-navlink"
              onClick={setBookToEdit(book)}
            >
              edit
              {' '}
              <i className="fa fa-edit" />
            </button>
            <button
              type="button"
              className="dropdown-item book-action-navlink"
              id="trash-icon"
              onClick={setBookToRemove(id)}
            >
              delete
              {' '}
              <i className="fa fa-trash" />
            </button>
          </span>
        </Fragment>
      );
    }
  }

  renderBookFooter(book, moreBooks) {
    const {
      authors, userId, id, averageRating
    } = book;
    const link = !moreBooks ? `/books/${id}` : `${id}`;
    return (
      <div className="book-footer">
        <span className="book-footer__link">
          <Link to={link} id="book-footer__title">
            <Truncate
              lines={1}
            >
              {book.name}
            </Truncate>
            <br />
            {' '}
          </Link>
          {this.renderActionDropdown(userId)}
        </span>
        <span className="book-author">
          <Truncate
            lines={1}
          >
            {authors && `by ${
              authors.map(author => author)
              }`}
          </Truncate>
        </span>
        <span className="react-star">
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
      <div className="child-elem">
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
  checkBoxChange: PropTypes.func,
  setBookToEdit: PropTypes.func,
  setBookToRemove: PropTypes.func,
};

BookCard.defaultProps = {
  book: {},
  toggleCheckBox: false,
  enableEllipsis: false,
  moreBooks: false,
  checkBoxChange: () => { },
  setBookToEdit: () => { },
  setBookToRemove: () => { },
};

export default BookCard;
