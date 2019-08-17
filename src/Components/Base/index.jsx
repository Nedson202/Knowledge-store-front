import queryString from 'querystring';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import setQuery from 'set-query-string';
import { compose, withApollo, graphql } from 'react-apollo';
import './_App.scss';
import Login from '../Login';
import Main from './Main';
import SignUp from '../SignUp';
import toaster from '../../utils/toast';
import tokenDecoder from '../../utils/tokenDecoder';
import { setCurrentUser } from '../../redux/actions/userActions';
import { verifyEmail } from '../../queries/auth';
import modalCloser from '../../utils/modalCloser';

class App extends Component {
  componentDidMount() {
    const { auth, auth: { user }, history } = this.props;
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('myLeftSideBar').style.display = 'none';
    this.socialAuthentication();
    this.verifyUserEmail();
    return auth.isAuthenticated
      && user.isVerified === 'true' && history.push('/my-books');
  }

  componentWillUnmount() {
    document.getElementById('navbar').style.display = 'flex ';

    if (typeof window.orientation === 'undefined') {
      document.getElementById('myLeftSideBar').style.display = 'block';
    }
    const modalEL = document.getElementById('close');
    return modalEL && modalCloser();
  }

  socialAuthentication() {
    const query = queryString.parse(window.location.search);
    const { history, dispatch } = this.props;
    if (Object.keys(query)[0] === '?token') {
      const token = Object.values(query)[0];
      localStorage.setItem('token', token);
      const decodedToken = tokenDecoder(token);
      dispatch(setCurrentUser(decodedToken));
      setQuery({ token: '' });
      toaster('success', 'Authentication successful');
      return decodedToken.isVerified === 'true' && history.push('my-books');
    }
  }

  verifyUserEmail() {
    const { verifyEmailQuery } = this.props;
    const query = queryString.parse(window.location.search);
    const { history, dispatch } = this.props;
    if (Object.keys(query)[0] === '?verify-email') {
      const userToken = Object.values(query)[0];
      setQuery({ token: '' });
      verifyEmailQuery({
        variables: {
          token: `Bearer ${userToken}`,
        }
      }).then((response) => {
        const { verifyEmail: { token, message } } = response.data;
        localStorage.setItem('token', token);
        dispatch(setCurrentUser(tokenDecoder(token)));
        history.push('/my-books');
        toaster('success', message);
      });
    }
  }

  authenticationForms() {
    return (
      <Fragment>
        <Login />
        <SignUp />
      </Fragment>
    );
  }

  emailConfirmationNote() {
    return (
      <div className="pending-verification">
        A verification link has been sent to your mail box. Click on the link or use this
        {' '}
        <Link to="/email?verify-email=true" style={{ color: 'black' }}>Link</Link>
        {' '}
        to request for a new verification mail.
      </div>
    );
  }

  render() {
    const { auth: { isAuthenticated, user } } = this.props;
    return (
      <div>
        {isAuthenticated && user.isVerified === 'false' && this.emailConfirmationNote()}
        <div id="background-layout" />
        <Main
          isAuthenticated={isAuthenticated}
        />
        {!isAuthenticated && this.authenticationForms()}
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  verifyEmailQuery: PropTypes.func,
};

App.defaultProps = {
  auth: {},
  history: {},
  dispatch: () => { },
  verifyEmailQuery: () => { },
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(compose(
  withApollo,
  graphql(verifyEmail, { name: 'verifyEmailQuery' }),
  connect(mapStateToProps)
)(App));