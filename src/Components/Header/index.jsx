import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './_Header.scss';
import Avatar from '../ReviewCard/Avatar';
import { logOutUser } from '../../redux/actions/userActions';
import Search from '../Search';
import Login from '../Login';
import SignUp from '../SignUp';
import {
  OPEN, CLICK, BLOCK, NONE, AUTO, LEFT_SIDE_BAR,
  MAIN, CLOSED, SIDE_BAR_TEXT, SIDE_BAR_STATUS, SIDE_NAV
} from '../../defaults';

class Header extends Component {
  state = {
    isSideNavOpen: false,
    isSideBarOpen: false,
  };

  componentDidMount() {
    return localStorage.sideBarStatus !== OPEN && this.toggleSidebar();
  }

  componentWillUnmount() {
    document.removeEventListener(CLICK, this.handleOutsideClick, false);
  }

  toggleSidebar = () => {
    const { isSideBarOpen } = this.state;
    const mainContent = document.getElementById(MAIN);

    if (isSideBarOpen) {
      localStorage.setItem(SIDE_BAR_STATUS, OPEN);
      document.getElementById(LEFT_SIDE_BAR).style.width = '260px';
      this.toggleSidebarText(BLOCK);
    } else {
      localStorage.setItem(SIDE_BAR_STATUS, CLOSED);
      document.getElementById(LEFT_SIDE_BAR).style.width = '70px';

      if (mainContent) {
        mainContent.style.marginLeft = AUTO;
      }
      this.toggleSidebarText(NONE);
    }
    this.setState(prevState => ({
      isSideBarOpen: !prevState.isSideBarOpen,
    }));
  };

  toggleSidebarText = (display) => {
    const texts = document.querySelectorAll(SIDE_BAR_TEXT);
    for (let text = 0; text < texts.length; text += 1) {
      texts[text].style.display = display;
    }
  };

  toggleMobileNav = () => {
    const { isSideNavOpen } = this.state;
    const sideNavEL = document.getElementById(SIDE_NAV);
    if (!isSideNavOpen) {
      document.addEventListener(CLICK, this.handleOutsideClick, false);
      sideNavEL.style.width = '270px';
      sideNavEL.style.boxShadow = '0 1px 1px 100vw rgba(0, 0, 0, 0.6)';
    } else {
      document.removeEventListener(CLICK, this.handleOutsideClick, false);
      sideNavEL.style.width = '0';
      sideNavEL.style.boxShadow = NONE;
    }

    this.setState(prevState => ({
      isSideNavOpen: !prevState.isSideNavOpen,
    }));
  }

  handleOutsideClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }

    this.toggleMobileNav();
  }

  handleLogout = () => {
    const { dispatch, history } = this.props;
    dispatch(logOutUser());
    history.push('/books');
  }

  authenticationForms() {
    return (
      <Fragment>
        <Login />
        <SignUp />
      </Fragment>
    );
  }

  emailConfirmationNote() {
    return (
      <div className="pending-verification">
        A verification link has been sent to your mail box.
        Click on the link or use this
        {' '}
        <Link
          to="/email?verify-email=true"
          style={{ color: 'black' }}
        >
          Link
        </Link>
        {' '}
        to request for a new verification mail.
      </div>
    );
  }

  renderAuthButtons() {
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-default btn-raised cancel-button btn"
          data-toggle="modal"
          data-target="#LoginFormModal"
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-primary btn-raised text-case login-button"
          data-toggle="modal"
          data-target="#SignUpFormModal"
        >
          Signup
        </button>
      </Fragment>
    );
  }

  renderUserAvatar() {
    const { user: { username, picture, avatarColor, } = {} } = this.props;
    return (
      <li className="nav-item dropdown user-profile-nav">
        <button
          type="button"
          className="btn btn-default nav-link dropdown-toggle text-case user-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {picture && <img src={picture} alt="Avatar" className="avatar" />}
          {!picture && <Avatar user={username} color={avatarColor} />}
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="user-detail">
            {username}
          </div>
          <div className="dropdown-divider" />
          <Link to="/profile" className="dropdown-item">
            <ion-icon class="user-profile-icon" name="person" />
            {' '}
            Profile
          </Link>
          <button type="button" className="dropdown-item" onClick={this.handleLogout}>
            <ion-icon class="user-profile-icon" name="log-out" />
            {' '}
            Logout
          </button>
        </div>
      </li>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <div className="App" ref={(node) => { this.node = node; }}>
          <nav
            className="navbar fixed-top navbar-expand-lg navbar-light bg-light"
            id="navbar"
          >
            <div
              onClick={this.toggleSidebar}
              className="sidenav-collapse
              dropdown-item sidebar-navlink collapse-bar btn-raised"
              data-tip="Toggle sidebar"
              role="button"
              tabIndex={0}
            >
              <ion-icon name="menu" />
            </div>
            <div className="container">
              <Link to="/">
                <span className="navbar-brand">Loresters Bookstore</span>
              </Link>
              <div>
                <button
                  type="button"
                  className="mobile-nav"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Search icon"
                >
                  <ion-icon name="search" />
                </button>
                <button
                  type="button"
                  className="mobile-nav"
                  aria-label="Toggle navigation"
                  onClick={this.toggleMobileNav}
                >
                  <ion-icon name="menu" />
                </button>
              </div>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <Search />
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  {user.isVerified === 'true' && this.renderUserAvatar()}
                </ul>
                {user.isVerified !== 'true' && this.renderAuthButtons()}
              </div>
            </div>
          </nav>
          {this.authenticationForms()}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user
});

Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object,
};

Header.defaultProps = {
  dispatch: () => { },
  history: {},
  user: {},
};

export default withRouter(connect(mapStateToProps)(Header));
