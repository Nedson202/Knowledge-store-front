import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import passwordToggler from '../../utils/passwordToggler';
import socialAuthentication from '../../utils/socialAuthentication';

const SignUpForm = (props) => {
  const { handleInputChange, formErrors, confirmSignup } = props;

  const renderForm = () => {
    const { username, email, password } = formErrors;
    return (
      <Fragment>
        <form autoComplete="false">
          <div className="form-group">
            <label
              htmlFor="username"
              className="bmd-label-floating"
            >
              Userame
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username-signup"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            {username && (
              <span
                className="validation-error"
              >
                {username[0]}
              </span>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="email"
              className="bmd-label-floating"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email-signup"
              autoComplete="new-password"
              onChange={handleInputChange}
            />
            {email && <span className="validation-error">{email[0]}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password-signup" className="bmd-label-floating">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password-signup"
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            {password && (
              <span className="validation-error">
                {password[0]}
              </span>
            )}
            <div
              role="button"
              tabIndex={0}
              onClick={passwordToggler('password-signup')}
              id="password-icon"
            >
              <ion-icon
                class="hide"
                name="eye-off"
                id="password-signup-remove-hide"
              />
              <ion-icon
                name="eye"
                id="password-signup-add-hide"
              />
            </div>
          </div>
          <div className="form-group social-login">
            <div className="text-muted text-center social-login-text">
              Signup with
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={socialAuthentication('google')}
            >
              <i className="fab fa-google google-icon" />
            </button>
            <button type="button" className="btn btn-primary">
              <i className="fab fa-facebook-f facebook-icon" />
            </button>
          </div>
        </form>
      </Fragment>
    );
  };

  const renderFormButtons = () => (
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

  const renderModal = () => (
    <Fragment>
      <div
        className="modal fade"
        id="SignUpFormModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Signup
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span id="close-signup" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {renderForm()}
            </div>
            <div className="modal-footer">
              {renderFormButtons()}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );

  return (
    <div>
      {renderModal()}
    </div>
  );
};

SignUpForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  confirmSignup: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default SignUpForm;
