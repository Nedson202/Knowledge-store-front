import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose, } from 'react-apollo';
import debounce from 'lodash.debounce';

import LoginForm from './LoginForm';
import { loginUser } from '../../queries/auth';

import {
  allFieldsValidation, handleSingleFieldValidation
} from '../../utils/validator/validator';
import { setCurrentUser } from '../../redux/actions/userActions';
import tokenDecoder from '../../utils/tokenDecoder';
import errorHandler from '../../utils/errorHandler';
import toaster from '../../utils/toast';
import modalCloser from '../../utils/modalCloser';
import {
  SUCCESS, TOASTR_ERROR, MY_BOOKS_PATH, CLOSE_LOGIN, LOGIN_USER_QUERY, TOKEN,
  VALIDATION_DEBOUNCE_TIME
} from '../../settings/defaults';

class Login extends Component {
  debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors } = this.state;
    const { formErrors: newFormErrors } = handleSingleFieldValidation(formErrors, { name, value });
    this.setState({ formErrors: newFormErrors });
  }, VALIDATION_DEBOUNCE_TIME);

  constructor(props) {
    super(props);

    this.state = {
      values: {
        username: '',
        password: '',
      },
      formErrors: {}
    };
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value;
    this.setState({ values });
    this.debounceSingleFieldValidation({ name, value });
  }

  confirmLogin = async (event) => {
    event.preventDefault();
    const { values } = this.state;
    const { isValid, errors } = allFieldsValidation(values, ['email']);
    const { loginUserQuery, dispatch, } = this.props;
    if (!isValid) {
      return this.setState({ formErrors: errors });
    }

    try {
      const loginHandler = await loginUserQuery({
        variables: {
          ...values
        }
      });

      const { data: { loginUser: { token } } = {} } = loginHandler;

      localStorage.setItem(TOKEN, token);
      const decodedToken = tokenDecoder(token);
      modalCloser(CLOSE_LOGIN);
      dispatch(setCurrentUser(decodedToken));
      if (decodedToken.isVerified === 'true') window.location.replace(MY_BOOKS_PATH);

      toaster(SUCCESS, 'Signed in successfully');
      this.setState({
        values: {
          username: '',
          password: '',
        }
      });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  render() {
    const { formErrors, values } = this.state;
    return (
      <Fragment>
        <LoginForm
          onInputChange={this.onInputChange}
          confirmLogin={this.confirmLogin}
          formErrors={formErrors}
          values={values}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  loginUserQuery: PropTypes.func,
  dispatch: PropTypes.func,
};

Login.defaultProps = {
  loginUserQuery: () => { },
  dispatch: () => { },
};

export default withRouter(compose(
  graphql(loginUser, { name: LOGIN_USER_QUERY }),
  connect(),
)(Login));
