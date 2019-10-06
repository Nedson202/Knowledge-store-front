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
} from '../../validator';
import { setCurrentUser } from '../../redux/actions/userActions';
import {
  tokenDecoder, errorHandler, toaster, modalToggler
} from '../../utils';
import {
  SUCCESS, TOASTR_ERROR, CLOSE_LOGIN, LOGIN_USER_QUERY, TOKEN,
  VALIDATION_DEBOUNCE_TIME
} from '../../settings';

class Login extends Component {
  debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors } = this.state;
    const { formErrors: newFormErrors } = handleSingleFieldValidation(
      formErrors, { name, value }
    );
    this.setState({ formErrors: newFormErrors });
  }, VALIDATION_DEBOUNCE_TIME);

  constructor(props) {
    super(props);

    this.state = {
      values: {
        username: '',
        password: '',
      },
      formErrors: {},
      processing: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value;
    this.setState({ values });
    this.debounceSingleFieldValidation({ name, value });
  }

  handleUserLogin = async (event) => {
    event.preventDefault();
    const { values } = this.state;
    const { isValid, errors } = allFieldsValidation(values, ['email']);
    const { loginUserQuery, dispatch, } = this.props;

    if (!isValid) {
      return this.setState({ formErrors: errors });
    }

    try {
      this.setState({ processing: true });

      const loginHandler = await loginUserQuery({
        variables: {
          ...values
        }
      });

      const { data: { loginUser: { token } } = {} } = loginHandler;

      localStorage.setItem(TOKEN, token);
      const decodedToken = tokenDecoder(token);
      modalToggler(CLOSE_LOGIN);
      dispatch(setCurrentUser(decodedToken));

      if (decodedToken.isVerified) {
        toaster(SUCCESS, 'Signed in successfully');
      }

      this.setState({
        values: {
          username: '',
          password: '',
        },
        processing: false,
      });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));

      this.setState({ processing: false });
    }
  }

  render() {
    const { formErrors, values, processing } = this.state;
    return (
      <Fragment>
        <LoginForm
          handleInputChange={this.handleInputChange}
          handleUserLogin={this.handleUserLogin}
          formErrors={formErrors}
          values={values}
          processing={processing}
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
