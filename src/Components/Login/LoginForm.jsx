import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  passwordToggler, modalToggler, socialAuthentication
} from '../../utils';

const LoginForm = (props) => {
  const {
    onInputChange, handleUserLogin, formErrors, values, processing
  } = props;

  const { username, password } = values;
  const { username: usernameError, password: passwordError } = formErrors;

  return (
    <div>
      <div
        role="dialog"
        aria-labelledby="login modal"
        aria-hidden="true"
        className="modal fade"
        id="LoginFormModal"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span id="close-login" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label
                    htmlFor="username"
                    className="bmd-label-floating"
                  >
                    Username
                  </label>
                  <input
                    autoComplete="new-password"
                    className="form-control"
                    id="username-login"
                    name="username"
                    onChange={onInputChange}
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
                    onChange={onInputChange}
                    type="password"
                    value={password}
                  />
                  {passwordError && <span className="validation-error">{passwordError[0]}</span>}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={passwordToggler('password-login')}
                    id="login-password-icon"
                  >
                    <ion-icon
                      class="hide"
                      name="eye-off"
                      id="password-login-remove-hide"
                    />
                    <ion-icon
                      name="eye"
                      id="password-login-add-hide"
                    />
                  </div>
                </div>
                <div className="error-action">
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
                <div className="form-group social-login">
                  <div className="text-center social-login-text">
                    Login with
                  </div>
                  <button
                    type="button"
                    onClick={socialAuthentication('google')}
                    className="btn"
                  >
                    <i className="fab fa-google google-icon" />
                  </button>
                  <button
                    type="button"
                    onClick={socialAuthentication('facebook')}
                    className="btn"
                  >
                    <i className="fab fa-facebook-f facebook-icon" />
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default btn-raised cancel-button"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary btn-raised text-case login-button"
                onClick={handleUserLogin}
                disabled={processing}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  handleUserLogin: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  processing: PropTypes.object.isRequired,
};

export default LoginForm;
