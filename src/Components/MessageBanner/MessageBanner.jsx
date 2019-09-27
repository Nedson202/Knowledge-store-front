import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MessageBanner extends Component {
  emailConfirmationNote() {
    return (
      <div className="pending-verification">
        A verification link has been sent to your mail box.
        Click on the link or use this
        {' '}
        <Link
          to="/email?verify-email=true"
          style={{ color: 'black' }}
        >
          Link
        </Link>
        {' '}
        to request for a new verification mail.
      </div>
    );
  }

  render() {
    const { isAuthenticated, user } = this.props;

    return (
      <Fragment>
        {isAuthenticated && !user.isVerified
        && this.emailConfirmationNote()}
      </Fragment>
    );
  }
}

MessageBanner.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

MessageBanner.defaultProps = {
  isAuthenticated: false,
  user: {},
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
});

export default connect(mapStateToProps)(MessageBanner);
