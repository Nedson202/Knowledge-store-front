import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import UnsplashMention from './UnsplashMention';
import { BOOKS_PATH } from '../../settings';

class Main extends Component {
  navigateToBooks = () => window.location.replace(BOOKS_PATH);

  renderButtons() {
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return;
    }

    return (
      <Fragment>
        <button
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#LoginFormModal"
          data-testid="index-login-action"
          type="button"
        >
          <ion-icon name="log-in" />
          Login to get started
        </button>
        <button
          className="btn btn-outline-primary"
          data-toggle="modal"
          data-target="#SignUpFormModal"
          data-testid="index-signup-action"
          type="button"
        >
          <ion-icon name="log-in" />
          Signup
        </button>
      </Fragment>
    );
  }

  renderExploreButton() {
    return (
      <button
        className="btn btn-outline-primary"
        onClick={this.navigateToBooks}
        type="button"
      >
        <ion-icon name="paper-plane" />
          Explore
      </button>
    );
  }

  renderMainContent() {
    return (
      <Fragment>
        <h2 className="app-title">The Knowledge Store</h2>
        <blockquote>
          <p className="app-index-quote">
            Wisdom is not a product of schooling
            but of the lifelong attempt to acquire it.
          </p>
          <footer className="app-index-quote-author">― Albert Einstein</footer>
        </blockquote>
      </Fragment>
    );
  }

  render() {
    return (
      <div className="app-container">
        <div>
          {this.renderMainContent()}
          <div className="auth-action-buttons">
            {this.renderExploreButton()}
            {this.renderButtons()}
          </div>
        </div>

        <UnsplashMention />
      </div>
    );
  }
}

Main.propTypes = {
  isAuthenticated: PropTypes.bool,
};

Main.defaultProps = {
  isAuthenticated: false,
};

export default Main;
