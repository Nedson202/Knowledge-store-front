import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose, graphql } from 'react-apollo';
import debounce from 'lodash.debounce';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
import { allFieldsValidation, singleFieldValidation } from '../../utils/validator/validator';
import { addUser } from '../../queries/auth';
import { setCurrentUser } from '../../redux/actions/userActions';
import tokenDecoder from '../../utils/tokenDecoder';
import errorHandler from '../../utils/errorHandler';
import toaster from '../../utils/toast';
import modalCloser from '../../utils/modalCloser';

const waitTime = 1000;

class SignUp extends Component {
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

  confirmSignup = async (event) => {
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
      localStorage.setItem('token', token);
      modalCloser('close-signup');
      dispatch(setCurrentUser(decodedToken));
      if (decodedToken.isVerified === 'true') window.location.replace('/my-books');
      toaster('success', 'Signed up successfully');
    } catch (error) {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    }
  }

  render() {
    const { values, formErrors } = this.state;
    return (
      <Fragment>
        <SignUpForm
          values={values}
          formErrors={formErrors}
          confirmSignup={this.confirmSignup}
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
  graphql(addUser, { name: 'addUserQuery' }),
  connect()
)(SignUp));
