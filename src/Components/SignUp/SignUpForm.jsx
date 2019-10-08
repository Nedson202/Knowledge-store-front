import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { passwordToggler } from '../../utils';

const SignUpForm = (props) => {
  const {
    handleInputChange, formErrors, handleUserSignup, values, processing
  } = props;

  const renderForm = () => {
    const {
      username: usernameError, email: emailError,
      password: passwordError
    } = formErrors;
    const { username, email, password } = values;

    return (
      <form autoComplete="false">
        <div className="form-group">
          <label
            className="bmd-label-floating"
            htmlFor="username-signup"
          >
            Username
          </label>
          <input
            autoComplete="new-password"
            className="form-control"
            id="username-signup"
            name="username"
            onChange={handleInputChange}
            type="text"
            value={username}
          />
          {usernameError && (
          <span
            className="validation-error"
          >
            {usernameError[0]}
          </span>
          )}
        </div>
        <div className="form-group">
          <label
            className="bmd-label-floating"
            htmlFor="email-signup"
          >
            Email address
          </label>
          <input
            autoComplete="new-password"
            className="form-control"
            id="email-signup"
            name="email"
            onChange={handleInputChange}
            type="email"
            value={email}
          />
          {emailError && <span className="validation-error">{emailError[0]}</span>}
        </div>
        <div className="form-group">
          <label
            className="bmd-label-floating"
            htmlFor="password-signup"
          >
            Password
          </label>
          <input
            autoComplete="new-password"
            className="form-control"
            id="password-signup"
            name="password"
            onChange={handleInputChange}
            type="password"
            value={password}
          />
          {passwordError && (
          <span className="validation-error">
            {passwordError[0]}
          </span>
          )}
          <div
            data-testid="signup-password-icon"
            id="signup-password-icon"
            onClick={passwordToggler('password-signup')}
            role="button"
            tabIndex={0}
          >
            <ion-icon
              class="hide"
              data-testid="password-signup-remove-hide"
              id="password-signup-remove-hide"
              name="eye-off"
            />
            <ion-icon
              data-testid="password-signup-add-hide"
              id="password-signup-add-hide"
              name="eye"
            />
          </div>
        </div>
      </form>
    );
  };

  const renderFormButtons = () => (
    <Fragment>
      <button
        className="btn btn-default btn-raised cancel-button"
        data-dismiss="modal"
        type="button"
      >
        Close
      </button>
      <button
        className="btn btn-primary btn-raised text-case signup-button"
        data-testid="signup-button"
        disabled={processing}
        onClick={handleUserSignup}
        type="button"
      >
        Signup
      </button>
    </Fragment>
  );

  const renderModal = () => (
    <Fragment>
      <div
        aria-hidden="true"
        aria-labelledby="signup form"
        className="modal fade"
        data-testid="signup-modal"
        id="SignUpFormModal"
        role="dialog"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Signup
              </h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
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
    <Fragment>
      {renderModal()}
    </Fragment>
  );
};

SignUpForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleUserSignup: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default SignUpForm;
