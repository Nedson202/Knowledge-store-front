import React, { Component, Fragment } from 'react';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    const { username, password } = this.state;
    console.log(username, password); // eslint-disable-line
  }

  render() {
    return (
      <Fragment>
        <LoginForm
          onInputChange={this.onInputChange}
          rememberMe={this.rememberMe}
        />
      </Fragment>
    );
  }
}

export default Login;
