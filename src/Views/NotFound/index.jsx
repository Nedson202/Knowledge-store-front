import React from 'react';
import MetaTags from 'react-meta-tags';

const NotFound = () => (
  <div className="not-found text-center">
    <MetaTags>
      <meta
        name="description"
        content="Page is not found"
      />
      <meta property="og:title" content="Page not found" />
    </MetaTags>

    <h1 className="not-found__404">404!</h1>
    <h1 className="not-found__text">
      Sorry this page does not exist.
    </h1>
  </div>
);

export default NotFound;
