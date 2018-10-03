import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './_PasswordReset.scss';
import passwordToggler from '../../utils/passwordToggler';
// import tokenDecoder from '../../utils/tokenDecoder';

class PasswordReset extends Component {
  componentDidMount() {
    const { history } = this.props;
    const token = window.location.search.replace(/^[?]/, '');
    history.push('password-reset');
    toastr.success('Heyey hdfh');
    return !localStorage.resetToken && localStorage.setItem('resetToken', token);
  }

  render() {
    return (
      <Fragment>
        <form className="password-reset">
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
  history: PropTypes.object
};

PasswordReset.defaultProps = {
  history: {}
};

export default PasswordReset;
