import React, { Component, Fragment } from 'react';
import ContentLoader from 'react-content-loader';

class BookImageLoader extends Component {
  render() {
    return (
      <Fragment>
        <ContentLoader
          rtl
          height={272}
          width={190}
          speed={2}
          primaryColor="#f3f3f3"
        >
          <rect x="0" y="0" rx="3" ry="3" width="201" height="272" />
        </ContentLoader>
      </Fragment>
    );
  }
}

export default BookImageLoader;
