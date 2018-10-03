import React, { Component, Fragment } from 'react';
import './_ForgotPassword.scss';
// import tokenDecoder from '../../utils/tokenDecoder';

class ForgotPassword extends Component {
  renderForm() {
    return (
      <form className="password-reset">
        <div className="form-group">
          <label htmlFor="reset-email" className="bmd-label-floating">
        Email
          </label>
          <input type="email" className="form-control" id="reset-email" />
        </div>
        <div className="form-group password-reset__button">
          <button type="button" className="btn btn-primary btn-raised text-case">Send Reset Mail</button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderForm()}
      </Fragment>
    );
  }
}

export default ForgotPassword;
