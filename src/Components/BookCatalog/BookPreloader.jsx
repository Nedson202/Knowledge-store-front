import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import BookImageLoader from '../BookCard/BookImageLoader';

class BookPreloader extends PureComponent {
  renderPreloader() {
    return (
      <Fragment>
        <div className="child-elem">
          <BookImageLoader />
        </div>
        <div className="child-elem">
          <BookImageLoader />
        </div>
        <div className="child-elem">
          <BookImageLoader />
        </div>
        <div className="child-elem">
          <BookImageLoader />
        </div>
        <div className="child-elem">
          <BookImageLoader />
        </div>
      </Fragment>
    );
  }

  render() {
    const { loadingBook } = this.props;

    return (
      <Fragment>
        {loadingBook && this.renderPreloader()}
      </Fragment>
    );
  }
}

BookPreloader.propTypes = {
  loadingBook: PropTypes.bool
};

BookPreloader.defaultProps = {
  loadingBook: false
};

export default BookPreloader;
