import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import tokenDecoder from '../../utils/tokenDecoder';
import toaster from '../../utils/toast';
import { TOASTR_ERROR } from '../../settings/defaults';

export default function (ComposedComponent, admin) {
  class AuthWrapper extends Component {
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.user.isAuthenticated) {
        history.goBack();
      }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      const { history, user: { isAuthenticated, user } } = this.props;
      if (admin && isAuthenticated && user.role === 'user') {
        toaster(TOASTR_ERROR, 'Access denied, operation is unathorised');
        return history.goBack();
      }

      if (!tokenDecoder(localStorage.token).id) {
        toaster(TOASTR_ERROR, 'Access denied, you need to login');
        return history.goBack();
      }

      if (isAuthenticated && user.isVerified !== 'true') {
        toaster(TOASTR_ERROR, 'Kindly verify your account');
        return history.goBack();
      }

      if (!isAuthenticated) {
        toaster(TOASTR_ERROR, 'Access denied, you need to login');
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

  const mapStateToProps = state => ({
    user: state.auth
  });

  return connect(mapStateToProps)(AuthWrapper);
}
