import React, { Component, Fragment } from 'react';
import './_UserProfile.scss';
import ImageUpload from './ImageUpload';

class UpdateForm extends Component {
  render() {
    return (
      <Fragment>
        <ImageUpload />
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="username-profile" className="bmd-label-floating">Username</label>
              <input type="text" className="form-control" id="username-profile" />
              <span className="bmd-help">We&apos;ll never share your email with anyone else.</span>
            </div>
            <div className="form-group">
              <label htmlFor="email" className="bmd-label-floating">Email address</label>
              <input type="email" className="form-control" id="email" />
              <span className="bmd-help">We&apos;ll never share your email with anyone else.</span>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-primary btn-raised text-case"
                id="update-button"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default UpdateForm;
