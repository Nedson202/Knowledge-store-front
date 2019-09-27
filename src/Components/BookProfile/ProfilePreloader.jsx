import React, { Fragment } from 'react';
import ContentLoader from 'react-content-loader';

import BookImageLoader from '../BookCard/BookImageLoader';
import ReviewLoader from '../ReviewCard/ReviewLoader';

const ProfilePreloader = () => {
  const renderPreloader = () => (
    <Fragment>
      <div>
        <div className="original-book">
          <BookImageLoader />
        </div>
        <div className="book-profile-details">
          <ContentLoader
            rtl
            height={160}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
          >
            <rect x="10" y="10" rx="4" ry="4" width="100%" height="15" />
            <rect x="10" y="50" rx="3" ry="3" width="100%" height="10" />
            <rect x="10" y="70" rx="3" ry="3" width="100%" height="5" />
            <rect x="10" y="90" rx="3" ry="5" width="100%" height="60" />
          </ContentLoader>
        </div>
      </div>
      <div className="book-profile-more">
        <div className="book__card">
          <BookImageLoader />
        </div>
        <div className="book__card">
          <BookImageLoader />
        </div>
      </div>
      <div className="review-card">
        <ReviewLoader />
        <ReviewLoader />
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      {renderPreloader()}
    </Fragment>
  );
};

export default ProfilePreloader;
