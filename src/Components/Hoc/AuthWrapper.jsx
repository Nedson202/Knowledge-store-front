import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import tokenDecoder from '../../utils/tokenDecoder';
import toaster from '../../utils/toast';

export default function (ComposedComponent, admin) {
  class AuthWrapper extends Component {
    componentWillMount() {
      const { history, user: { isAuthenticated, user } } = this.props;
      if (!tokenDecoder(localStorage.token).id) {
        toaster('error', 'Access denied, you need to login');
        return history.push('/');
      }

      if (isAuthenticated && user.isVerified !== 'true') {
        toaster('error', 'Kindly verify your account');
        return history.goBack();
      }

      if (!isAuthenticated) {
        toaster('error', 'Access denied, you need to login');
        history.push('/');
      }

      if (admin && isAuthenticated && user.role !== 'super') {
        toaster('error', 'Access denied, operation is unathorised');
        history.goBack();
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.isAuthenticated) {
        history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  AuthWrapper.propTypes = {
    isAuthenticated: PropTypes.bool,
    history: PropTypes.object,
    user: PropTypes.object,
  };

  AuthWrapper.defaultProps = {
    isAuthenticated: false,
    history: {},
    user: {},
  };

  const mapStateToProps = state => ({
    user: state.auth
  });

  return connect(mapStateToProps)(AuthWrapper);
}