import React from 'react';
import PropTypes from 'prop-types';

import { passwordToggler } from '../../utils';

const UpdatePassword = (props) => {
  const {
    handleInputChange, updatePassword, formErrors, formValues,
  } = props;
  const { oldPassword, newPassword } = formValues;

  return (
    <div className="password-update">
      <form>
        <div className="form-group">
          <label htmlFor="old-password" className="bmd-label-floating">
            Old Password
          </label>
          <input
            name="oldPassword"
            type="password"
            className="form-control"
            id="old-password"
            value={oldPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          {formErrors.password && (
            <span className="validation-error">
              {formErrors.password}
            </span>
          )}
          <div
            role="button"
            tabIndex={0}
            onClick={passwordToggler('old-password')}
            id="old-password-icon"
          >
            <ion-icon
              class="hide"
              name="eye-off"
              id="old-password-remove-hide"
            />
            <ion-icon
              name="eye"
              id="old-password-add-hide"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="new-password" className="bmd-label-floating">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            className="form-control"
            id="new-password"
            value={newPassword}
            onChange={handleInputChange}
            autoComplete="new-password"
          />
          {formErrors.password && (
            <span className="validation-error">
              {formErrors.password}
            </span>
          )}
          <div
            role="button"
            tabIndex={0}
            onClick={passwordToggler('new-password')}
            id="new-password-icon"
          >
            <ion-icon
              class="hide"
              name="eye-off"
              id="new-password-remove-hide"
            />
            <ion-icon
              name="eye"
              id="new-password-add-hide"
            />
          </div>
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn btn-raised text-case"
            id="update-password"
            onClick={updatePassword}
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

UpdatePassword.propTypes = {
  handleInputChange: PropTypes.func,
  updatePassword: PropTypes.func,
  formValues: PropTypes.object,
  formErrors: PropTypes.object,
};

UpdatePassword.defaultProps = {
  handleInputChange: () => { },
  updatePassword: () => { },
  formValues: {},
  formErrors: {},
};


export default UpdatePassword;
