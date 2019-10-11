import React from 'react';
import PropTypes from 'prop-types';

import { passwordToggler } from '../../utils';

const UpdatePasswordForm = (props) => {
  const {
    handleInputChange, updatePassword, formValues,
    formErrors: {
      oldPassword: oldPasswordError,
      newPassword: newPasswordError,
    }
  } = props;

  const { oldPassword, newPassword } = formValues;

  return (
    <div className="password-update">
      <form>
        <div className="form-group">
          <label
            className="bmd-label-floating"
            htmlFor="old-password"
          >
            Old Password
          </label>
          <input
            autoComplete="new-password"
            className="form-control"
            id="old-password"
            name="oldPassword"
            onChange={handleInputChange}
            type="password"
            value={oldPassword}
          />
          {oldPasswordError && (
            <span className="validation-error">
              {oldPasswordError[0]}
            </span>
          )}
          <div
            onClick={passwordToggler('old-password')}
            data-testid="old-password-icon"
            id="old-password-icon"
            role="button"
            tabIndex={0}
          >
            <ion-icon
              class="hide"
              id="old-password-remove-hide"
              name="eye-off"
            />
            <ion-icon
              id="old-password-add-hide"
              name="eye"
            />
          </div>
        </div>
        <div className="form-group">
          <label
            className="bmd-label-floating"
            htmlFor="new-password"
          >
            New Password
          </label>
          <input
            autoComplete="new-password"
            className="form-control"
            id="new-password"
            name="newPassword"
            onChange={handleInputChange}
            type="password"
            value={newPassword}
          />
          {newPasswordError && (
            <span className="validation-error">
              {newPasswordError[0]}
            </span>
          )}

          <div
            onClick={passwordToggler('new-password')}
            data-testid="new-password-icon"
            id="new-password-icon"
            role="button"
            tabIndex={0}
          >
            <ion-icon
              class="hide"
              id="new-password-remove-hide"
              name="eye-off"
            />
            <ion-icon
              id="new-password-add-hide"
              name="eye"
            />
          </div>
        </div>

        <div className="form-group">
          <button
            className="btn btn-raised text-case"
            id="update-password"
            onClick={updatePassword}
            type="button"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

UpdatePasswordForm.propTypes = {
  handleInputChange: PropTypes.func,
  updatePassword: PropTypes.func,
  formValues: PropTypes.object,
  formErrors: PropTypes.shape({
    oldPassword: PropTypes.array,
    newPassword: PropTypes.array,
  }),
};

UpdatePasswordForm.defaultProps = {
  handleInputChange: () => { },
  updatePassword: () => { },
  formValues: {},
  formErrors: {},
};


export default UpdatePasswordForm;
