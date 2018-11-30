import React, { Component } from 'react';
import ContentLoader from 'react-content-loader';
import './_UserProfile.scss';

class UserAnalyticsLoader extends Component {
  render() {
    return (
      <ContentLoader
        rtl
        height={160}
        width={245}
        speed={2}
        primaryColor="#f3f3f3"
      >
        <rect x="0" y="0" rx="3" ry="3" width="245" height="160" />
      </ContentLoader>
    );
  }
}

export default UserAnalyticsLoader;
