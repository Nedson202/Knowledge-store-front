import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';

import SignUpForm from './SignUpForm';

import { addUser } from '../../queries/auth';
import { setCurrentUser } from '../../redux/actions/userActions';
import { allFieldsValidation, handleSingleFieldValidation } from '../../validator';
import {
  tokenDecoder, errorHandler, toaster, modalToggler
} from '../../utils';
import {
  ADD_USER_QUERY, CLOSE_SIGNUP, TOASTR_ERROR, SUCCESS, TOKEN,
  VALIDATION_DEBOUNCE_TIME
} from '../../settings';

class SignUp extends Component {
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
        email: '',
        password: ''
      },
      formErrors: {},
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const { values } = this.state;
    values[name] = value;
    this.setState({ values });
    this.debounceSingleFieldValidation({ name, value });
  }

  handleUserSignup = async (event) => {
    event.preventDefault();
    const { values } = this.state;
    const { isValid, errors } = allFieldsValidation(values);
    const { addUserQuery, dispatch, } = this.props;

    if (!isValid) {
      return this.setState({ formErrors: errors });
    }

    try {
      const signupHandler = await addUserQuery({
        variables: {
          ...values
        }
      });

      const { data: { addUser: { token } } = {} } = signupHandler;
      const decodedToken = tokenDecoder(token);
      localStorage.setItem(TOKEN, token);
      modalToggler(CLOSE_SIGNUP);

      dispatch(setCurrentUser(decodedToken));
      if (decodedToken.isVerified) {
        toaster(SUCCESS, 'Signed up successfully');
      }

      this.setState({
        values: {
          username: '',
          email: '',
          password: ''
        }
      });
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  render() {
    const { values, formErrors } = this.state;
    return (
      <Fragment>
        <SignUpForm
          values={values}
          formErrors={formErrors}
          handleUserSignup={this.handleUserSignup}
          handleInputChange={this.handleInputChange}
        />
      </Fragment>
    );
  }
}

SignUp.propTypes = {
  addUserQuery: PropTypes.func,
  dispatch: PropTypes.func,
};

SignUp.defaultProps = {
  addUserQuery: () => { },
  dispatch: () => { },
};

export default withRouter(compose(
  graphql(addUser, { name: ADD_USER_QUERY }),
  connect()
)(SignUp));
