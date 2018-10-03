import React, { Component, Fragment } from 'react';
import './_UpdatePassword.scss';

class UpdatePassword extends Component {
  render() {
    return (
      <Fragment>
        <div className="password-update">
          <h5>Update Password</h5>
          <form>
            <div className="form-group">
              <label htmlFor="old-password" className="bmd-label-floating">
                Old Password
              </label>
              <input
                type="password"
                className="form-control"
                id="old-password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-password" className="bmd-label-floating">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="new-password"
              />
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary btn-raised text-case"
                id="update-password"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default UpdatePassword;
