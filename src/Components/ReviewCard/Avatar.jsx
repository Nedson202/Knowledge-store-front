import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

class Avatar extends Component {
  renderInitials(user) {
    const matches = user.match(/\b(\w)/g);
    const acronym = matches.join('');
    const { color } = this.props;
    return (
      <div
        className="avatar-placeholder text-capitalize"
        style={{ backgroundColor: color }}
      >
        {acronym}

      </div>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        {this.renderInitials(user)}
      </Fragment>
    );
  }
}

Avatar.propTypes = {
  user: PropTypes.string,
  color: PropTypes.string
};

Avatar.defaultProps = {
  user: '',
  color: ''
};

export default Avatar;
