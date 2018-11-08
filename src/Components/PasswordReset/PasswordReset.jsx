import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import queryString from 'querystring';
import setQuery from 'set-query-string';
import './_PasswordReset.scss';
import passwordToggler from '../../utils/passwordToggler';
import tokenDecoder from '../../utils/tokenDecoder';
// import tokenDecoder from '../../utils/tokenDecoder';

/* eslint-disable */
class PasswordReset extends Component {
  state = {
    email: '',
    userId: ''
  };

  componentDidMount() {
    // const { history } = this.props;
    this.getResetToken();
    // history.push('password-reset');
    // toastr.success('Heyey hdfh');
    // return !localStorage.resetToken && localStorage.setItem('resetToken', token);
  }

  getResetToken() {
    const query = queryString.parse(window.location.search);
    const token = Object.values(query)[0];
    const decodedToken = tokenDecoder(token);
    if (decodedToken) {
      const { id, email } = decodedToken;
      this.setState({ email, userId: id })
      setQuery({ token: ''});
    };
  }

  render() {
    const { email } = this.state;
    return (
      <Fragment>
        <form className="password-reset">
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="bmd-label-floating">
              Email
            </label>
            <input
              type="email"
              defaultValue={email}
              className="form-control"
              id="user-email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="bmd-label-floating">
              New Password
            </label>
            <input type="password-reset" className="form-control" id="password-reset" />
            <li onClick={passwordToggler('password-reset')}>
              <i className="fa fa-eye" aria-hidden="true" id="add-hide" />
              <i className="fa fa-eye-slash hide" aria-hidden="true" id="remove-hide" />
            </li>
          </div>
          <div className="form-group password-reset__button">
            <button type="button" className="btn btn-primary btn-raised text-case">Save password</button>
          </div>
        </form>
      </Fragment>
    );
  }
}

PasswordReset.propTypes = {
  // history: PropTypes.object
};

PasswordReset.defaultProps = {
  // history: {}
};

export default PasswordReset;
