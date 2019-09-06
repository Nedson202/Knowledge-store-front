import queryString from 'querystring';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import { compose, withApollo } from 'react-apollo';
import {
  singleFieldValidation, allFieldsValidation
} from '../../utils/validator/validator';
import tokenDecoder from '../../utils/tokenDecoder';
import { sendVerificationEmail, forgotPassword } from '../../queries/auth';
import errorHandler from '../../utils/errorHandler';
import toaster from '../../utils/toast';
import {
  RESET_PASSWORD, VERIFY_EMAIL, SUCCESS, TOASTR_ERROR,
  VERIFICATION_MESSAGE, RESET_MESSAGE, VERIFICATION, PASSWORD_RESET
} from '../../defaults';

const waitTime = 1000;

class EmailGenerator extends Component {
  debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors } = this.state;
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      this.setState({ formErrors: { ...formErrors, [name]: errors[name] } });
    } else {
      this.setState({ formErrors: { ...formErrors, [name]: null } });
    }
  }, waitTime);

  state = {
    values: {
      email: '',
    },
    actionType: '',
    formErrors: {}
  }

  componentDidMount() {
    this.getEmailType();
  }

  getEmailType() {
    const query = queryString.parse(window.location.search);
    const type = Object.keys(query)[0].replace(/^[?]/, '');
    const decodedToken = localStorage.token && tokenDecoder(localStorage.token);
    const setValues = (email, actionType) => {
      const { values } = this.state;
      values[email] = email;
      this.setState({ values, actionType });
    };

    switch (type) {
      case RESET_PASSWORD:
        setValues('', type);

        break;

      case VERIFY_EMAIL:
        setValues((decodedToken && decodedToken.email) || '', type);

        break;

      default:
        break;
    }
  }

  handleEmailChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value;
    this.setState({ values });
    this.debounceSingleFieldValidation({ name, value });
  }

  sendEmail = type => async () => {
    const { values, values: { email } } = this.state;
    const { client } = this.props;
    const { isValid, errors } = allFieldsValidation(
      values, ['username', 'password']
    );
    if (!isValid) {
      return this.setState({ formErrors: errors });
    }

    switch (type) {
      case RESET_PASSWORD:
        try {
          const response = await client.query({
            query: forgotPassword,
            variables: {
              email
            }
          });

          const { forgotPassword: { message } } = response.data;

          toaster(SUCCESS, message);
        } catch (error) {
          const messages = errorHandler(error);
          messages.forEach(message => toaster(TOASTR_ERROR, message));
        }
        break;

      case VERIFY_EMAIL:
        try {
          const response = await client.query({
            query: sendVerificationEmail,
            variables: {
              email
            }
          });

          const { sendVerificationEmail: { message } } = response.data;
          toaster(SUCCESS, message);
        } catch (error) {
          const messages = errorHandler(error);
          messages.forEach(message => toaster(TOASTR_ERROR, message));
        }

        break;

      default:
        break;
    }
  }

  renderButton() {
    const { actionType } = this.state;
    return (
      <div className="form-group password-reset__button">
        <button
          type="button"
          onClick={this.sendEmail(actionType)}
          className="btn btn-primary btn-raised text-case"
        >
          {actionType.match('verify-email')
            ? VERIFICATION_MESSAGE : RESET_MESSAGE}
        </button>
      </div>
    );
  }

  renderForm() {
    const { values: { email }, formErrors, actionType } = this.state;
    const requestType = actionType.match(VERIFY_EMAIL)
      ? VERIFICATION : PASSWORD_RESET;
    return (
      <form className="password-reset">
        <div className="password-reset__label">
          <h5>
            A
            {' '}
            {requestType}
            {' '}
            link will be sent to the email address you provide.
            {' '}
          </h5>
        </div>
        <div className="form-group">
          <label htmlFor="reset-email" className="bmd-label-floating">
            Email
          </label>
          <input
            name="email"
            onChange={this.handleEmailChange}
            value={email}
            type="email"
            className="form-control"
            id="reset-email"
            autoComplete="new-password"
          />
          {formErrors.email
            && (
              <span className="validation-error">
                {formErrors.email}
              </span>
            )
          }
          {this.renderButton()}
        </div>
      </form>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderForm()}
      </Fragment>
    );
  }
}

EmailGenerator.propTypes = {
  client: PropTypes.object,
};

EmailGenerator.defaultProps = {
  client: {},
};

const mapStateToProps = state => ({
  auth: state.auth
});


export default compose(
  withApollo,
  connect(mapStateToProps),
)(EmailGenerator);
