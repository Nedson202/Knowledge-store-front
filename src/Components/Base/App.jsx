import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './_App.scss';
import Login from '../Login/Login';
import Main from './Main';
import SignUp from '../SignUp/SignUp';
// import AuthButtons from '../Buttons/AuthButtons';

class App extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    document.getElementById('navbar').style.display = 'none';
    document.getElementById('myLeftSideBar').style.display = 'none';
    return isAuthenticated && history.push('/dashboard');
  }

  componentWillUnmount() {
    document.getElementById('navbar').style.display = 'block';
    document.getElementById('myLeftSideBar').style.display = 'block';
  }

  render() {
    return (
      <div>
        <div id="demo-layout-transparent" />
        <Main />
        <Login />
        <SignUp />
      </div>
    );
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
};

App.defaultProps = {
  isAuthenticated: false,
  history: {},
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(App);
