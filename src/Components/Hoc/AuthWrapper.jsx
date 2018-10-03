import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tokenDecoder from '../../utils/tokenDecoder';

export default function (ComposedComponent, admin) {
  class AuthWrapper extends Component {
    componentWillMount() {
      const { history, isAuthenticated, user } = this.props;
      if (tokenDecoder(localStorage.getItem('accessToken'))) {
        toastr.error('Access denied, you need to login');
        // this.props.logout();
        history.push('/');
      }

      if (!isAuthenticated) {
        // this.props.logout();
        toastr.error('Access denied, you need to login');
        history.push('/');
      }

      if (isAuthenticated && user.username === process.env.ADMIN) {
        toastr.error('Access denied, operation is unathorised for an admin');
        history.push('/adminpanel');
      }

      if (admin && isAuthenticated && user.username !== process.env.ADMIN) {
        toastr.error('Access denied, you are not an admin');
        history.push('/');
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
  };

  AuthWrapper.defaultProps = {
    isAuthenticated: false,
    history: {},
  };

  return AuthWrapper;
}