import React, { PureComponent, Fragment } from 'react';
import './_BackToTop.scss';

/* eslint-disable */
class BackToTop extends PureComponent {
  render() {
    const { backToTopMethod, displayBackToTop } = this.props;
    return (
      <Fragment>
        {displayBackToTop && (
          <button
            type="button"
            className="btn btn-secondary bmd-btn-fab back-to-top"
            onClick={backToTopMethod}
          >
            <i className="fas fa-arrow-up" />
          </button>
        )}
      </Fragment>
    );
  }
}

export default BackToTop;
