import React, { Component } from 'react';
import passwordToggler from '../../utils/passwordToggler';

class SignUp extends Component {
  render() {
    return (
      <div>
        <div className="modal fade" id="signupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Signup</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form autoComplete="false">
                  <div className="form-group">
                    <label htmlFor="username" className="bmd-label-floating">Userame</label>
                    <input type="email" className="form-control" id="username-signup" />
                    <span className="bmd-help">We&apos;ll never share your data with anyone else.</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="bmd-label-floating">Email address</label>
                    <input type="email" className="form-control" id="email-signup" />
                    <span className="bmd-help">We&apos;ll never share your data with anyone else.</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-signup" className="bmd-label-floating">Password</label>
                    <input type="password" className="form-control" id="password-signup" />
                    <li onClick={passwordToggler('password-signup')}>
                      <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
                      <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
                    </li>
                  </div>
                  <div className="form-group social-login">
                    <div className="text-muted text-center social-login-text">Signup with</div>
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
                <button type="button" className="btn btn-primary btn-raised text-case signup-button">Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
