import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BookImageLoader from '../BookCard/BookImageLoader';

const BookPreloader = (props) => {
  const { loadingBook } = props;

  const renderPreloader = () => (
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

  return (
    <Fragment>
      {loadingBook && renderPreloader()}
    </Fragment>
  );
};

BookPreloader.propTypes = {
  loadingBook: PropTypes.bool
};

BookPreloader.defaultProps = {
  loadingBook: false
};

export default BookPreloader;
