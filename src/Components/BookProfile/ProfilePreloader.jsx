import React, { PureComponent, Fragment } from 'react';
import ContentLoader from 'react-content-loader';
import './_BookProfile.scss';
import '../BookCatalog/_BookCatalog.scss';
import BookImageLoader from '../BookCard/BookImageLoader';
import ReviewLoader from '../ReviewCard/ReviewLoader';
import AddReview from '../AddReview/AddReview';

class ProfilePreloader extends PureComponent {
  renderLoader() {
    return (
      <Fragment>
        <ReviewLoader />
        <ReviewLoader />
      </Fragment>
    );
  }

  renderPreloader() {
    return (
      <Fragment>
        <div className="original-book">
          <BookImageLoader />
        </div>
        <div className="book-profile">
          <ContentLoader
            rtl
            height={160}
            width={400}
            speed={2}
            primaryColor="#f3f3f3"
          >
            <rect x="10" y="10" rx="4" ry="4" width="300" height="6.4" />
            <rect x="10" y="50" rx="3" ry="3" width="250" height="6.4" />
            <rect x="10" y="70" rx="3" ry="3" width="290" height="6.4" />
            <rect x="10" y="90" rx="3" ry="3" width="290" height="6.4" />
            <rect x="10" y="130" rx="3" ry="5" width="300" height="13.4" />
          </ContentLoader>
        </div>
        <div className="book-profile-more">
          <div className="child-elem">
            <BookImageLoader />
          </div>
          <div className="child-elem">
            <BookImageLoader />
          </div>
        </div>
        <div className="review-card">
          <div className="add-review-form">
            <AddReview
              toggleForm={false}
              reviewType="add"
            />
          </div>
          <ReviewLoader />
          <ReviewLoader />
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderPreloader()}
      </Fragment>
    );
  }
}

export default ProfilePreloader;
