import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_BackToTop.scss';

class BackToTop extends PureComponent {
  scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 100,
      behavior: 'smooth'
    });
  };

  render() {
    const { displayBackToTop } = this.props;
    return (
      <Fragment>
        {displayBackToTop && (
          <button
            type="button"
            className="btn btn-secondary bmd-btn-fab back-to-top"
            onClick={this.scrollToTop}
          >
            <i className="fas fa-caret-up" />
          </button>
        )}
      </Fragment>
    );
  }
}

BackToTop.propTypes = {
  displayBackToTop: PropTypes.bool,
};

BackToTop.defaultProps = {
  displayBackToTop: false,
};

export default BackToTop;
