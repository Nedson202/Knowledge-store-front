import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  passwordToggler, modalToggler, socialAuthentication
} from '../../utils';

const LoginForm = (props) => {
  const {
    handleInputChange, handleUserLogin, formErrors, values, processing
  } = props;

  const { username, password } = values;
  const { username: usernameError, password: passwordError } = formErrors;

  const renderAdditionalHelpOptions = () => (
    <div className="login-additional-help">
      <Link
        onClick={() => modalToggler('close-login')}
        to="/email?reset-password=true"
      >
        Forgot password?
      </Link>
      <Link
        onClick={() => modalToggler('close-login')}
        to="/email?verify-email=true"
      >
        Verify email
      </Link>
    </div>
  );

  const renderSocialAuthOptions = () => (
    <div className="form-group social-login">
      <div className="text-center social-login-text">
        Login with
      </div>
      <button
        className="btn"
        onClick={socialAuthentication('google')}
        type="button"
      >
        <i className="fab fa-google google-icon" />
      </button>
      <button
        className="btn"
        onClick={socialAuthentication('facebook')}
        type="button"
      >
        <i className="fab fa-facebook-f facebook-icon" />
      </button>
    </div>
  );

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
        className="btn btn-primary btn-raised text-case login-button"
        data-testid="login-button"
        disabled={processing}
        onClick={handleUserLogin}
        type="button"
      >
        Login
      </button>
    </Fragment>
  );

  const renderForm = () => (
    <form>
      <div className="form-group">
        <label
          className="bmd-label-floating"
          htmlFor="username-login"
        >
          Username
        </label>
        <input
          autoComplete="new-password"
          className="form-control"
          id="username-login"
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
          htmlFor="password-login"
        >
          Password
        </label>
        <input
          autoComplete="new-password"
          className="form-control"
          id="password-login"
          name="password"
          onChange={handleInputChange}
          type="password"
          value={password}
        />
        {passwordError && <span className="validation-error">{passwordError[0]}</span>}
        <div
          data-testid="login-password-icon"
          id="login-password-icon"
          onClick={passwordToggler('password-login')}
          role="button"
          tabIndex={0}
        >
          <ion-icon
            class="hide"
            id="password-login-remove-hide"
            name="eye-off"
          />
          <ion-icon
            id="password-login-add-hide"
            name="eye"
          />
        </div>
      </div>
      {renderAdditionalHelpOptions()}
      {renderSocialAuthOptions()}
    </form>
  );

  const renderModal = () => (
    <Fragment>
      <div
        aria-labelledby="login modal"
        aria-hidden="true"
        className="modal fade"
        data-testid="login-modal"
        id="LoginFormModal"
        role="dialog"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
              >
                <span id="close-login" aria-hidden="true">&times;</span>
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

LoginForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleUserLogin: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default LoginForm;
