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
    let displayBackToTop = false;
    const shouldDisplayBackToTop = document.documentElement.scrollTop > 300;

    if (shouldDisplayBackToTop) {
      displayBackToTop = true;
    } else {
      displayBackToTop = false;
    }
    this.setState({ displayBackToTop });
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
            type="button"
            className="btn btn-secondary bmd-btn-fab"
            id="back-to-top"
            onClick={this.scrollToTop}
          >
            <i className="fas fa-caret-up" />
          </button>
        )}
      </Fragment>
    );
  }
}

export default BackToTop;
