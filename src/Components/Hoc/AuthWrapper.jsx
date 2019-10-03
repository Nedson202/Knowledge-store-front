import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { tokenDecoder, toaster } from '../../utils';
import { TOASTR_ERROR, USER } from '../../settings';

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
      if (admin && isAuthenticated && user.role === USER) {
        toaster(TOASTR_ERROR, 'Access denied, operation is unathorised');
        return history.goBack();
      }

      if (!tokenDecoder(localStorage.token).id) {
        toaster(TOASTR_ERROR, 'You need to login to access page content');
        return history.goBack();
      }

      if (isAuthenticated && !user.isVerified) {
        toaster(TOASTR_ERROR, 'Kindly verify your account');
        return history.goBack();
      }

      if (!isAuthenticated) {
        toaster(TOASTR_ERROR, 'You need to login to access page content');
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
