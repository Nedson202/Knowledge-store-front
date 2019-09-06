import React from 'react';
import { ReactTitle } from 'react-meta-tags';
import './_NotFound.scss';

const NotFound = () => (
  <div className="not-found text-center">
    <ReactTitle title="Content not found" />

    <h1 className="not-found__404">404!</h1>
    <h1 className="not-found__text">
      Sorry this page seems to have been eaten.
    </h1>
  </div>
);

export default NotFound;
