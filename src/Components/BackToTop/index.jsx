import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { SCROLL_PARAM } from '../../settings/defaults';

const BackToTop = (props) => {
  const { displayBackToTop } = props;

  const scrollToTop = () => {
    window.scroll(SCROLL_PARAM);
  };

  return (
    <Fragment>
      {displayBackToTop && (
        <button
          type="button"
          className="btn btn-secondary bmd-btn-fab back-to-top"
          onClick={scrollToTop}
        >
          <i className="fas fa-caret-up" />
        </button>
      )}
    </Fragment>
  );
};

BackToTop.propTypes = {
  displayBackToTop: PropTypes.bool,
};

BackToTop.defaultProps = {
  displayBackToTop: false,
};

export default BackToTop;
