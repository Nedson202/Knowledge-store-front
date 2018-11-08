import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import passwordToggler from '../../utils/passwordToggler';
import modalCloser from '../../utils/modalCloser';

class LoginForm extends Component {
  socialAuthentication = type => () => {
    window.location.replace(`http://localhost:4000/auth/${type}`);
  }

  render() {
    const { onInputChange, confirmLogin, formErrors } = this.props;
    const { username, password } = formErrors;
    return (
      <div>
        <div className="modal fade" id="LoginFormModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span id="close" aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="username" className="bmd-label-floating">Username</label>
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      id="username-login"
                      onChange={onInputChange}
                      autoComplete="new-password"
                    />
                    {username && <span className="validation-error">{username[0]}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-login" className="bmd-label-floating">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password-login"
                      onChange={onInputChange}
                      autoComplete="new-password"
                    />
                    {password && <span className="validation-error">{password[0]}</span>}
                    <li onClick={passwordToggler('password-login')}>
                      <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
                      <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
                    </li>
                  </div>
                  <div className="form-group social-login">
                    <div className="text-muted text-center social-login-text">Login with</div>
                    <button type="button" onClick={this.socialAuthentication('google')} className="btn btn-primary">
                      <i className="fab fa-google google-icon" />
                    </button>
                    <button type="button" onClick={this.socialAuthentication('facebook')} className="btn btn-primary">
                      <i className="fab fa-facebook-f facebook-icon" />
                    </button>
                  </div>
                  <div className="error-action">
                    <Link onClick={() => modalCloser()} to="/email?reset-password=true">forgot password?</Link>
                    <Link onClick={() => modalCloser()} to="/email?verify-email=true">verify email?</Link>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default btn-raised cancel-button" data-dismiss="modal">Close</button>
                <button
                  type="button"
                  className="btn btn-primary btn-raised text-case login-button"
                  onClick={confirmLogin}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  confirmLogin: PropTypes.func.isRequired,
  formErrors: PropTypes.object.isRequired,
};

export default LoginForm;
