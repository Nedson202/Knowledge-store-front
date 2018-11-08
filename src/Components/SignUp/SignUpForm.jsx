import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import passwordToggler from '../../utils/passwordToggler';

class SignUpForm extends Component {
  renderForm() {
    const { handleInputChange, formErrors } = this.props;
    const { username, email, password } = formErrors;
    return (
      <Fragment>
        <form autoComplete="false">
          <div className="form-group">
            <label htmlFor="username" className="bmd-label-floating">Userame</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username-SignUpForm"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
            {username && <span className="validation-error">{username[0]}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="bmd-label-floating">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email-SignUpForm"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
            {email && <span className="validation-error">{email[0]}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password-signup" className="bmd-label-floating">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password-signup"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
            {password && <span className="validation-error">{password[0]}</span>}
            <li onClick={passwordToggler('password-signup')}>
              <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
              <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
            </li>
          </div>
          <div className="form-group social-login">
            <div className="text-muted text-center social-login-text">Signup with</div>
            <button type="button" className="btn btn-primary">
              <i className="fab fa-google google-icon" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fab fa-facebook-f facebook-icon" />
            </button>
          </div>
        </form>
      </Fragment>
    );
  }

  renderFormButtons() {
    const { confirmSignup } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-default btn-raised cancel-button"
          data-dismiss="modal"
        >
        Close
        </button>
        <button
          type="button"
          className="btn btn-primary btn-raised text-case signup-button"
          onClick={confirmSignup}
        >
        Signup
        </button>
      </Fragment>
    );
  }

  renderModal() {
    return (
      <Fragment>
        <div className="modal fade" id="SignUpFormModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Signup</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span id="close" aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.renderForm()}
              </div>
              <div className="modal-footer">
                {this.renderFormButtons()}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <div>
        {this.renderModal()}
      </div>
    );
  }
}

SignUpForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  confirmSignup: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default SignUpForm;
