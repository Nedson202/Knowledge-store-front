import React, { Component } from 'react';
import './_NotFound.scss';

class NotFound extends Component {
  render() {
    return (
      <div className="not-found text-center">
        <h1 className="not-found__404">404!</h1>
        <h1 className="not-found__text">
          Sorry this page seems to have been eaten.
        </h1>
      </div>
    );
  }
}

export default NotFound;
