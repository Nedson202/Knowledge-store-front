import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import image from '../../assets/lof.jpeg';
import './_BookCard.scss';
import Star from '../Star/Star';
import BookImageLoader from './BookImageLoader';

class BookCard extends Component {
  constructor(props) {
    super(props);

    const { imageUrl } = this.props;
    /* eslint-disable */
    this.state = {
      imageLoaded: false /* eslint-disable-line */,
      bookImage: imageUrl || "",
      imageLoadingError: ""
    };
  }

  checkImageRender = image => () => {
    this.setState({
      imageLoaded: true,
      bookImage: image
    });
  };

  handleImageLoadingError = () => {
    this.setState({
      imageLoadingError: "Sorry an error occurred loading image"
    });
  };

  renderImage = () => {
    const { imageLoaded, bookImage, imageLoadingError } = this.state;
    const { imageUrl } = this.props;
    return (
      <Fragment>
        {!imageLoaded && imageLoadingError.length === 0 && <BookImageLoader />}
        {imageLoadingError.length !== 0 && (
          <div
            style={{
              // width: "190px",
              // height: "17rem",
              paddingTop: "50%",
              border: "1px solid #d4d4d4",
              borderRadius: "4px"
            }}
            className="text-center image-error-plaeholder"
          >
            {imageLoadingError}
          </div>
        )}
        {imageLoaded && (
          <Link to="/books/1">
            <img
              src={bookImage}
              className="book-images parent"
              alt="Card cap"
              // style={{ width: "190px", height: "17rem" }}
              id="book-image"
              onLoad={this.checkImageRender}
            />
          </Link>
        )}
        <img
          src={imageUrl}
          className="hide"
          onLoad={this.checkImageRender(imageUrl)}
          onError={this.handleImageLoadingError}
        />
      </Fragment>
    );
  };

  renderActionDropdown() {
    return (
      <Fragment>
        <i
          className="fa fa-ellipsis-v"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        />
        <span className="dropdown-menu" id="book-action-buttons">
          <a href="/" className="dropdown-item book-action-navlink">
            edit <i className="fa fa-edit" />
          </a>
          <a
            href="/"
            className="dropdown-item book-action-navlink"
            id="trash-icon"
          >
            delete <i className="fa fa-trash" />
          </a>
        </span>
      </Fragment>
    );
  }

  renderBookFooter() {
    return (
      <div className="book-footer">
        <span className="book-footer__link">
          <Link to="/books/1" id="book-footer__title">
            Javascript, the weird parts <br />{" "}
          </Link>
          {this.renderActionDropdown()}
        </span>
        <span className="book-author">by Sergaent Bruno</span>
        <span className="react-star">
          <Star />
          <p>4.02 avg rating</p>
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className="child-elem">
        {this.renderImage()}
        {this.renderBookFooter()}
      </div>
    );
  }
}

BookCard.propTypes = {
  imageUrl: PropTypes.string
};

BookCard.defaultProps = {
  imageUrl: ""
};

export default BookCard;
