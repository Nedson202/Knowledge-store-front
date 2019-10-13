import React, { Fragment } from 'react';

import { SCROLL_PARAM, SCROLL } from '../../settings';

class BackToTop extends React.PureComponent {
  state = {
    displayBackToTop: false,
  };

  componentDidMount() {
    window.addEventListener(SCROLL, this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  componentWillUnmount() {
    window.removeEventListener(SCROLL, this.handlePageScroll, {
      capture: true,
      passive: true
    });
  }

  handlePageScroll = () => {
    const shouldDisplayBackToTop = window.scrollY > 300;

    this.setState({ displayBackToTop: shouldDisplayBackToTop });
  };

  scrollToTop = () => {
    window.scroll(SCROLL_PARAM);
  };

  render() {
    const { displayBackToTop } = this.state;
    return (
      <Fragment>
        {displayBackToTop && (
          <button
            className="btn btn-secondary bmd-btn-fab"
            data-testid="back-to-top"
            id="back-to-top"
            onClick={this.scrollToTop}
            type="button"
          >
            <i className="fas fa-caret-up" />
          </button>
        )}
      </Fragment>
    );
  }
}

export default BackToTop;
