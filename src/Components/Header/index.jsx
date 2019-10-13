import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SideNav from '../SideNav';
import Avatar from '../ReviewCard/Avatar';
import Search from '../Search';

import { logOutUser } from '../../redux/actions/userActions';
import {
  CLICK, LOGOUT, STORAGE, THEME, FLIP_THEME, LIGHT,
  THEME_ATTRIBUTE,
} from '../../settings';

class Header extends Component {
  state = {
    isSideNavOpen: false,
  };

  componentDidMount() {
    this.loadTheme();

    window.addEventListener(STORAGE, this.registerStorageEvents);
  }

  componentWillUnmount() {
    document.removeEventListener(CLICK, this.handleOutsideClick, false);
    window.removeEventListener(STORAGE, this.registerStorageEvents, false);
  }

  registerStorageEvents = (event) => {
    this.syncLogout(event);
    this.handleDarkModeToggle(event);
  }

  toggleMobileNav = () => {
    const { isSideNavOpen } = this.state;
    if (typeof window.orientation === 'undefined') {
      return;
    }

    if (!isSideNavOpen) {
      document.addEventListener(CLICK, this.handleOutsideClick, false);
    } else {
      document.removeEventListener(CLICK, this.handleOutsideClick, false);
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
    const { dispatch } = this.props;

    window.localStorage.setItem(LOGOUT, true);
    logOutUser(dispatch);
  }

  syncLogout = (event) => {
    if (event.key !== LOGOUT) {
      return;
    }

    window.location.reload();
  }

  toggleDarkMode = () => {
    const currentTheme = window.localStorage.getItem(THEME) || LIGHT;
    const theme = FLIP_THEME[currentTheme];

    window.localStorage.setItem(THEME, theme);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  }

  handleDarkModeToggle = (event) => {
    if (event.key !== THEME) {
      return;
    }

    this.loadTheme();
  }

  loadTheme = () => {
    const currentTheme = window.localStorage.getItem(THEME) || LIGHT;
    window.document.documentElement.setAttribute(THEME_ATTRIBUTE, currentTheme);
  }

  switchAuthButtonsAndUserAvatar = () => {
    const { user: { isVerified = false } } = this.props;

    if (!isVerified) {
      return this.renderAuthButtons();
    }

    return this.renderUserAvatar();
  }

  renderThemeButton(platformStyle) {
    return (
      <button
        aria-label="Dark mode switch"
        className={`dark-mode-switch ${platformStyle}`}
        data-testid="dark-mode-switch"
        onClick={this.toggleDarkMode}
        type="button"
      >
        <ion-icon name="contrast" class="dark-mode-icon" />
      </button>
    );
  }

  renderAuthButtons() {
    return (
      <div className="desktop-and-tablet">
        <button
          id="login-button"
          className="btn btn-default cancel-button btn"
          data-target="#LoginFormModal"
          data-toggle="modal"
          type="button"
        >
          Login
        </button>
        <button
          className="btn btn-primary btn-raised text-case login-button"
          data-target="#SignUpFormModal"
          data-toggle="modal"
          id="signup-button"
          type="button"
        >
          Signup
        </button>
      </div>
    );
  }

  renderUserAvatar() {
    const { user: { username, picture, avatarColor, } = {} } = this.props;

    return (
      <li className="nav-item dropdown user-profile-nav">
        <button
          aria-expanded="false"
          aria-haspopup="true"
          className="btn btn-default nav-link dropdown-toggle text-case user-toggle"
          data-toggle="dropdown"
          id="navbarDropdown"
          type="button"
        >
          {picture && <img src={picture} alt="Avatar" className="avatar" />}
          {!picture && <Avatar user={username} color={avatarColor} />}
        </button>

        <div
          aria-labelledby="navbarDropdown"
          className="dropdown-menu"
        >
          <div className="user-detail">
            {username}
          </div>
          <div className="dropdown-divider" />
          <Link to="/my-profile" className="dropdown-item">
            <ion-icon class="user-profile-icon" name="person" />
            Profile
          </Link>
          <button
            className="dropdown-item logout-button"
            onClick={this.handleLogout}
            type="button"
          >
            <ion-icon class="user-profile-icon" name="log-out" />
            Logout
          </button>
        </div>
      </li>
    );
  }

  render() {
    const { isSideNavOpen } = this.state;

    return (
      <Fragment>
        { isSideNavOpen && <SideNav /> }
        <nav
          className="navbar fixed-top navbar-expand-lg"
          id="navbar"
          ref={(node) => { this.node = node; }}
        >
          <div className="container">
            <button
              aria-label="Toggle navigation"
              className="mobile-nav"
              data-testid="mobile-menu"
              onClick={this.toggleMobileNav}
              type="button"
            >
              <ion-icon name="menu" />
            </button>
            <Link to="/">
              <span className="navbar-brand">Loresters Bookstore</span>
            </Link>

            <button
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Search icon"
              className="mobile-nav"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              type="button"
            >
              <ion-icon name="search" />
            </button>

            {this.renderThemeButton('mobile-nav')}

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Search />
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                {this.switchAuthButtonsAndUserAvatar()}
              </ul>

              <span className="desktop-and-tablet">
                {this.renderThemeButton()}
              </span>
            </div>
          </div>
        </nav>
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
  user: PropTypes.object,
};

Header.defaultProps = {
  dispatch: () => { },
  user: {},
};

export default withRouter(connect(mapStateToProps)(Header));
