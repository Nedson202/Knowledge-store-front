import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Main extends Component {
  renderAuthButtons() {
    return (
      <Fragment>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#LoginFormModal">
            Login to get started
          {' '}
          <i className="fa fa-sign-in-alt" />
        </button>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#SignUpFormModal">
            Signup
          {' '}
          <i className="fa fa-sign-in-alt" />
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
      <div className="mdl-auth-buttons">
        <div>
          {this.renderMainContent()}
          {!isAuthenticated && this.renderAuthButtons()}
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
