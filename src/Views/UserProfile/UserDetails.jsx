import React from 'react';
import PropTypes from 'prop-types';

const UserDetails = (props) => {
  const { user: { picture, username, email } } = props;

  return (
    <div className="profile-details">
      <div className="profile-details__image">
        <img
          src={picture}
          id="show-image"
          height="200px"
          width="200px"
          alt="Avatar"
        />
      </div>
      <div className="profile-details__info">
        <span>Username</span>
        <h4>{username}</h4>
        <span>Email</span>
        <h4>{email}</h4>
      </div>
    </div>
  );
};

UserDetails.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    picture: PropTypes.string,
  }),
};

UserDetails.defaultProps = {
  user: {},
};

export default UserDetails;
