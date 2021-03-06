import React from 'react';
import PropTypes from 'prop-types';

import ImageUpload from './ImageUpload';

const AccountUpdateForm = (props) => {
  const {
    user: {
      email: stateEmail, username: stateUsername
    },
    formValues: { username, email },
    handleInputChange, formErrors, updateProfile, imagePreviewUrl,
    cancelPreview, handleImageChange, uploadingImage
  } = props;

  return (
    <div className="profile-upload">
      <ImageUpload
        handleImageChange={handleImageChange}
        imagePreviewUrl={imagePreviewUrl}
        cancelPreview={cancelPreview}
        uploadingImage={uploadingImage}
      />
      <div className="update-form">
        <form>
          <div className="form-group">
            <label
              htmlFor="profile-username"
              className="bmd-label-floating"
            >
              Username
            </label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="profile-username"
              onChange={handleInputChange}
              defaultValue={stateUsername}
            />
            {formErrors.username && (
              <span className="validation-error">
                {formErrors.username}
              </span>
            )}
          </div>
          <div className="form-group">
            <label
              htmlFor="profile-email"
              className="bmd-label-floating"
            >
              Email address
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="profile-email"
              onChange={handleInputChange}
              defaultValue={stateEmail}
            />
            {formErrors.email && (
              <span className="validation-error">
                {formErrors.email}
              </span>
            )}
          </div>
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-raised text-case"
              id="update-button"
              disabled={!username.length || !email.length}
              onClick={updateProfile}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AccountUpdateForm.propTypes = {
  handleInputChange: PropTypes.func,
  handleImageChange: PropTypes.func,
  cancelPreview: PropTypes.func,
  updateProfile: PropTypes.func,
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  formValues: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
  }),
  formErrors: PropTypes.object,
  imagePreviewUrl: PropTypes.string,
  uploadingImage: PropTypes.bool,
};

AccountUpdateForm.defaultProps = {
  handleInputChange: () => { },
  handleImageChange: () => { },
  cancelPreview: () => { },
  updateProfile: () => { },
  user: {},
  formValues: {},
  imagePreviewUrl: '',
  formErrors: {},
  uploadingImage: false,
};

export default AccountUpdateForm;
