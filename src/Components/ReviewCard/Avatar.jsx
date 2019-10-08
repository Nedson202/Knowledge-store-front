import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Avatar = (props) => {
  const { user, color } = props;

  const renderInitials = () => {
    const matches = user.match(/\b(\w)/g);
    const shortUsername = matches.join('');

    return (
      <div
        className="avatar-placeholder text-capitalize"
        style={{ backgroundColor: color }}
      >
        {shortUsername}
      </div>
    );
  };

  return (
    <Fragment>
      {renderInitials(user)}
    </Fragment>
  );
};

Avatar.propTypes = {
  user: PropTypes.string,
  color: PropTypes.string
};

Avatar.defaultProps = {
  user: '',
  color: ''
};

export default Avatar;
