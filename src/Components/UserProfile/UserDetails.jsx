import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = (props) => {
  const { user } = props;

  return (
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
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.object,
};

UserDetails.defaultProps = {
  user: {},
};

export default UserDetails;
