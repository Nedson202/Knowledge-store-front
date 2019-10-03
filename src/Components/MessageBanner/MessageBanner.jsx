import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const MessageBanner = (props) => {
  const { isAuthenticated, user } = props;

  const emailConfirmationNote = () => (
    <div className="pending-verification">
      A verification link has been sent to your mail box.
      Click on the link or use this
      &nbsp;
      <Link
        to="/email?verify-email=true"
        style={{ color: 'black' }}
      >
        Link
      </Link>
      &nbsp;
      to request for a new verification mail.
    </div>
  );

  if (!isAuthenticated || user.isVerified) {
    return <></>;
  }

  return (
    <Fragment>
      {emailConfirmationNote()}
    </Fragment>
  );
};

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
