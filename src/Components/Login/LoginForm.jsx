import React, { Component } from 'react';
import PropTypes from 'prop-types';
import passwordToggler from '../../utils/passwordToggler';

class LoginForm extends Component {
  render() {
    const { onInputChange } = this.props;
    return (
      <div>
        <div className="modal fade" id="LoginFormModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
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
                    />
                    <span className="bmd-help">We&apos;ll never share your email with anyone else.</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-login" className="bmd-label-floating">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      id="password-login"
                      onChange={onInputChange}
                    />
                    <li onClick={passwordToggler('password-login')}>
                      <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
                      <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
                    </li>
                  </div>
                  <div className="form-group social-login">
                    <div className="text-muted text-center social-login-text">Login with</div>
                    <a href="/" className="btn btn-primary">
                      <i className="fab fa-google google-icon" />
                    </a>
                    <a href="/" className="btn btn-primary">
                      <i className="fab fa-facebook-f facebook-icon" />
                    </a>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default btn-raised cancel-button" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary btn-raised text-case login-button">Login</button>
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
};

export default LoginForm;
