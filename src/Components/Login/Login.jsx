import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import debounce from 'lodash.debounce';
import LoginForm from './LoginForm';
import { loginUser } from '../../queries/auth';
import { singleFieldValidation, allFieldsValidation } from '../../utils/validator/validator';
import { setCurrentUser } from '../../redux/actions/userActions';
import tokenDecoder from '../../utils/tokenDecoder';
import errorHandler from '../../utils/errorHandler';
import toaster from '../../utils/toast';
import modalCloser from '../../utils/modalCloser';

/* eslint-disable */
const waitTime = 1000;
class Login extends Component {
  debounceSingleFieldValidation = debounce(({ name, value }) => {
    const { formErrors } = this.state;
    const { isValid, errors } = singleFieldValidation({ key: name, value });
    if (!isValid) {
      this.setState({ formErrors: { ...formErrors, [name]: errors[name] } });
    } else {
      this.setState({ formErrors: { ...formErrors, [name]: null } });
    }
  }, waitTime);

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
    const { loginUserQuery, dispatch, history } = this.props;
    if (!isValid) {
      return this.setState({ formErrors: errors });
    }

    loginUserQuery({
      variables: {
        ...values
      }
    }).then((response) => {
      const { token } = response.data.loginUser;
      localStorage.setItem('token', token);
      const decodedToken = tokenDecoder(token);
      modalCloser();
      dispatch(setCurrentUser(decodedToken));
      if (decodedToken.isVerified === 'true') history.push('/my-books');
      toaster('success', 'Signed in successfully');
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
  }

  render() {
    const { formErrors } = this.state;
    return (
      <Fragment>
        <LoginForm
          onInputChange={this.onInputChange}
          confirmLogin={this.confirmLogin}
          formErrors={formErrors}
        />
      </Fragment>
    );
  }
}

Login.propTypes = {
  loginUserQuery: PropTypes.func,
  history: PropTypes.object,
  dispatch: PropTypes.func,
};

Login.defaultProps = {
  loginUserQuery: () => {},
  history: {},
  dispatch: () => {},
};

export default withRouter(compose(
  graphql(loginUser, { name: 'loginUserQuery' }),
  connect(),
)(Login));
