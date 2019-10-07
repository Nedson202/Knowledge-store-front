import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { tokenDecoder, toaster } from '../../utils';
import { TOASTR_ERROR, USER } from '../../settings';

export default function (ComposedComponent, adminProtected) {
  class AuthWrapper extends Component {
    state = {};

    static getDerivedStateFromProps(nextProps, prevState) {
      const { history, user: { isAuthenticated } } = nextProps;

      if (isAuthenticated) {
        return;
      }

      history.goBack();

      return prevState;
    }

    componentDidMount() {
      const { history, user: { isAuthenticated, user } } = this.props;
      if (adminProtected && isAuthenticated && user.role === USER) {
        toaster(TOASTR_ERROR, 'Sorry, you are not an admin');
        return history.goBack();
      }

      if (!isAuthenticated || !tokenDecoder(localStorage.token).id) {
        toaster(TOASTR_ERROR, 'You need to login to access page');
        return history.goBack();
      }

      if (isAuthenticated && !user.isVerified) {
        toaster(TOASTR_ERROR, 'Kindly verify your account');
        return history.goBack();
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  AuthWrapper.propTypes = {
    history: PropTypes.object,
    user: PropTypes.object,
  };

  AuthWrapper.defaultProps = {
    history: {},
    user: {},
  };

  const mapStateToProps = ({ auth }) => ({
    user: {
      isAuthenticated: auth.isAuthenticated,
      ...auth.user
    }
  });

  return connect(mapStateToProps)(AuthWrapper);
}
