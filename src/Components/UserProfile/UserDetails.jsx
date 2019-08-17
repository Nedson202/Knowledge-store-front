import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './_UserProfile.scss';

const UserDetails = (props) => {
  const { toggleEditForm, user } = props;
  return (
    <Fragment>
      <div className="profile-details">
        <div className="profile-details__image">
          <img
            src={user.picture}
            id="show-image"
            height="200px"
            width="200px"
            alt="Avatar"
          />
        </div>
        <div className="profile-details__info">
          <span>Username</span>
          <h4>{user.username}</h4>
          <span>Email</span>
          <h4>{user.email}</h4>
          <hr />
          <button
            type="button"
            className="btn btn-raised"
            id="edit-button"
            onClick={toggleEditForm}
          >
            Edit profile
          </button>
        </div>
      </div>
    </Fragment>
  );
};

UserDetails.propTypes = {
  toggleEditForm: PropTypes.func,
  user: PropTypes.object,
};

UserDetails.defaultProps = {
  toggleEditForm: () => { },
  user: {},
};

export default UserDetails;
