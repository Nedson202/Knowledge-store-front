import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
  navigateToBooks = () => window.location.replace('/books')


  renderButtons() {
    return (
      <Fragment>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#LoginFormModal">
          <i className="fa fa-sign-in-alt" />
          Login to get started
          {' '}
        </button>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#SignUpFormModal">
          <i className="fa fa-sign-in-alt" />
          Signup
          {' '}
        </button>
      </Fragment>
    );
  }

  renderExploreButton() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.navigateToBooks}
        >
          <i className="fa fa-rocket" aria-hidden="true" />
          {' '}
          Explore
        </button>
      </Fragment>
    );
  }

  renderMainContent() {
    return (
      <Fragment>
        <h2 className="product-title">The Knowledge Store</h2>
        <blockquote>
          <p className="quotation">
            Wisdom is not a product of schooling
            but of the lifelong attempt to acquire it.
          </p>
          <footer>― Albert Einstein</footer>
        </blockquote>
      </Fragment>
    );
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="auth-buttons">
        <div>
          {this.renderMainContent()}
          <div className="auth-action-buttons">
            {this.renderExploreButton()}
            {!isAuthenticated && this.renderButtons()}
          </div>
        </div>
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
