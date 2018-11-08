import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'querystring';
import setQuery from 'set-query-string';
import { compose, withApollo, graphql } from 'react-apollo';
import './_App.scss';
import Login from '../Login/Login';
import Main from './Main';
import SignUp from '../SignUp/SignUp';
import toaster from '../../utils/toast';
import tokenDecoder from '../../utils/tokenDecoder';
import { setCurrentUser } from '../../redux/actions/userActions';
import { verifyEmail } from '../../queries/auth';

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
    document.getElementById('myLeftSideBar').style.display = 'block';
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
      toaster('success', 'Login successful');
      return decodedToken.isVerified === 'true' && history.push('my-books');
    }
  }

  verifyUserEmail() {
    const { verifyEmailQuery } = this.props;
    const query = queryString.parse(window.location.search);
    const { history, dispatch } = this.props;
    if (Object.keys(query)[0] === '?verify-email') {
      const userToken = Object.values(query)[0];
      const decodedToken = tokenDecoder(userToken);
      const { id } = decodedToken;
      setQuery({ token: '' });
      verifyEmailQuery({
        variables: {
          id
        }
      }).then((response) => {
        const { verifyEmail: { token, message } } = response.data;
        localStorage.setItem('token', token);
        dispatch(setCurrentUser(decodedToken));
        history.push('/my-books');
        toaster('success', message);
      });
      // return decodedToken.isVerified === 'true' && history.push('my-books');
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
      You are yet to verify your email address. Check your mail box or use this
        {' '}
        <Link to="/email?verify-email=true">Link</Link>
      </div>
    );
  }

  render() {
    const { auth: { isAuthenticated, user } } = this.props;
    return (
      <div>
        {isAuthenticated && user.isVerified === 'false' && this.emailConfirmationNote()}
        <div id="demo-layout-transparent" />
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
  dispatch: () => {},
  verifyEmailQuery: () => {},
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(compose(
  withApollo,
  graphql(verifyEmail, { name: 'verifyEmailQuery' }),
  connect(mapStateToProps)
)(App));