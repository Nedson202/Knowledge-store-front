import React, { Component, Fragment } from 'react';

class Main extends Component {
  renderAuthButtons() {
    return (
      <Fragment>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#LoginFormModal">
            Login to get started
          {' '}
          <i className="fa fa-sign-in-alt" />
        </button>
        <button type="button" className="btn btn-outline-primary" data-toggle="modal" data-target="#signupModal">
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
    return (
      <div className="mdl-auth-buttons">
        <div>
          {this.renderMainContent()}
          {this.renderAuthButtons()}
        </div>

      </div>
    );
  }
}

export default Main;
