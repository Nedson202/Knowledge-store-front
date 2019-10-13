import queryString from 'querystring';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import setQuery from 'set-query-string';
import { compose, withApollo, graphql } from 'react-apollo';
import MetaTags from 'react-meta-tags';

import Main from './Main';

import { toaster, tokenDecoder, modalToggler } from '../../utils';
import { setCurrentUser } from '../../redux/actions/userActions';
import { verifyEmail } from '../../queries/auth';
import {
  NONE, NAV_BAR, LEFT_SIDE_BAR, BLOCK, CLOSE, SUCCESS, FLEX, AUTH_SUCCESS,
  MY_BOOKS_PATH, VERIFY_EMAIL_QUERY, TOKEN
} from '../../settings';

class App extends Component {
  componentDidMount() {
    const { auth, auth: { user }, history } = this.props;

    const navbarEL = document.getElementById(NAV_BAR);
    const leftSideBarEL = document.getElementById(LEFT_SIDE_BAR);

    if (navbarEL) {
      navbarEL.style.display = NONE;
    }

    if (leftSideBarEL) {
      leftSideBarEL.style.display = NONE;
    }

    this.socialAuthentication();
    this.verifyUserEmail();

    if (!auth.isAuthenticated || !user.isVerified) {
      return;
    }

    history.push({
      ...history.location,
      pathname: MY_BOOKS_PATH
    });
  }

  componentWillUnmount() {
    const navbarEL = document.getElementById(NAV_BAR);
    const leftSideBarEL = document.getElementById(LEFT_SIDE_BAR);

    if (navbarEL) {
      navbarEL.style.display = FLEX;
    }

    if (typeof window.orientation === 'undefined' && leftSideBarEL) {
      leftSideBarEL.style.display = BLOCK;
    }

    const modalEL = document.getElementById(CLOSE);

    return modalEL && modalToggler();
  }

  verifyUserEmail = async () => {
    const { verifyEmailQuery } = this.props;
    const query = queryString.parse(window.location.search);
    const verifyEmailSignature = '?verify-email';
    const hasVerifyEmailProperty = Object.keys(query).includes(verifyEmailSignature);

    const { dispatch } = this.props;

    if (!hasVerifyEmailProperty) {
      return;
    }

    const userToken = query[verifyEmailSignature];
    setQuery({ token: '' });

    try {
      const response = await verifyEmailQuery({
        variables: {
          token: `Bearer ${userToken}`,
        }
      });

      const { verifyEmail: { token, message } } = response.data;

      localStorage.setItem(TOKEN, token);

      dispatch(setCurrentUser(tokenDecoder(token)));
      window.location.replace(MY_BOOKS_PATH);

      toaster(SUCCESS, message);
    } catch (error) /* istanbul ignore next */ {
      console.error(error);
    }
  }

  socialAuthentication() {
    const { dispatch } = this.props;
    const query = queryString.parse(window.location.search);
    const tokenSignature = '?token';
    const hasTokenProperty = Object.keys(query).includes(tokenSignature);

    const token = query[tokenSignature];

    if (!hasTokenProperty) {
      return;
    }

    const decodedToken = tokenDecoder(token);
    localStorage.setItem(TOKEN, token);

    dispatch(setCurrentUser(decodedToken));
    setQuery({ token: '' });
    toaster(SUCCESS, AUTH_SUCCESS);

    return decodedToken.isVerified
      && window.location.replace(MY_BOOKS_PATH);
  }

  render() {
    const { auth: { isAuthenticated } } = this.props;

    return (
      <div>
        <MetaTags>
          <title>Lorester Bookstore</title>
          <meta
            name="og:description"
            content="Welcome to Lorester Bookstore.
              View, search, review, and bookmark book profiles."
          />
          <meta property="og:title" content="Lorester Bookstore" />
        </MetaTags>

        <div
          data-testid="background-layout"
          id="background-layout"
        />

        <Main
          isAuthenticated={isAuthenticated}
        />
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

const mapStateToProps = ({ auth }) => ({
  auth
});

export default withRouter(compose(
  withApollo,
  graphql(verifyEmail, { name: VERIFY_EMAIL_QUERY }),
  connect(mapStateToProps)
)(App));
