import queryString from 'querystring';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import setQuery from 'set-query-string';

import { resetPassword } from '../../queries/auth';
import { passwordToggler, tokenDecoder, toaster } from '../../utils';
import { setCurrentUser } from '../../redux/actions/userActions';
import {
  RESET_PASSWORD_QUERY, TOASTR_ERROR, MY_BOOKS_PATH, TOKEN, SUCCESS
} from '../../settings';

class PasswordReset extends Component {
  state = {
    values: {
      email: '',
      password: '',
      id: '',
      token: ''
    }
  };

  componentDidMount() {
    this.getResetToken();
  }

  getResetToken() {
    const query = queryString.parse(window.location.search);
    const token = Object.values(query)[0];

    if (!token) {
      setQuery({ token: '' });
      return localStorage.removeItem('token');
    }

    const decodedToken = tokenDecoder(token);
    if (decodedToken) {
      const { values } = this.state;
      const { id, email } = decodedToken;
      values.email = email;
      values.id = id;
      values.token = `Bearer ${token}`;

      return this.setState({ values });
    }

    setQuery({ token: '' });
  }

  handlePasswordChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value;

    this.setState({ values });
  }

  resetUserPassword = async () => {
    const { resetPasswordQuery, history, dispatch } = this.props;
    const { values, values: { email } } = this.state;

    if (!email.trim()) {
      return toaster(TOASTR_ERROR, 'Check your email for password reset link');
    }

    try {
      const response = await resetPasswordQuery({
        variables: {
          ...values
        }
      });

      const { resetPassword: { message, token } } = response.data;

      toaster(SUCCESS, message);

      localStorage.setItem(TOKEN, token);
      const decodedToken = tokenDecoder(token);

      dispatch(setCurrentUser(decodedToken));
      setQuery({ token: '' });

      if (decodedToken.isVerified) {
        return history.push(MY_BOOKS_PATH);
      }

      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { values: { email } } = this.state;

    return (
      <div className="container-content">
        <form className="password-reset">
          <div className="form-group">
            <label
              className="bmd-label-floating"
              htmlFor="user-email"
            >
              Email
            </label>
            <input
              className="form-control"
              defaultValue={email}
              disabled
              id="user-email"
              type="email"
            />
          </div>
          <div className="form-group">
            <label
              htmlFor="password-reset"
              className="bmd-label-floating"
            >
              New Password
            </label>
            <input
              autoComplete="new-password"
              className="form-control"
              id="password-reset"
              name="password"
              onChange={this.handlePasswordChange}
              type="password"
            />
            <div
              data-testid="reset-password-icon"
              id="reset-password-icon"
              onClick={passwordToggler('password-reset')}
              role="button"
              tabIndex={0}
            >
              <ion-icon
                class="hide"
                id="password-reset-remove-hide"
                name="eye-off"
              />
              <ion-icon
                id="password-reset-add-hide"
                name="eye"
              />
            </div>
          </div>
          <div className="form-group password-reset__button">
            <button
              className="btn btn-primary btn-raised text-case"
              onClick={this.resetUserPassword}
              type="button"
            >
              Save password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

PasswordReset.propTypes = {
  resetPasswordQuery: PropTypes.func,
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

PasswordReset.defaultProps = {
  resetPasswordQuery: () => { },
  dispatch: () => { },
  history: {},
};

export default compose(
  graphql(resetPassword, { name: RESET_PASSWORD_QUERY }),
  connect(),
)(PasswordReset);
