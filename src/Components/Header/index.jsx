import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Avatar from '../ReviewCard/Avatar';
import Search from '../Search';

import { logOutUser } from '../../redux/actions/userActions';
import {
  CLICK, NONE, SIDE_NAV, LOGOUT, STORAGE, THEME, FLIP_THEME, LIGHT, THEME_ATTRIBUTE,
  SIDE_NAV_WIDTH_270, SIDE_NAV_BOX_SHADOW
} from '../../settings';

class Header extends Component {
  state = {
    isSideNavOpen: false,
  };

  componentDidMount() {
    this.loadTheme();
    window.addEventListener(STORAGE, this.syncLogout);
  }

  componentWillUnmount() {
    document.removeEventListener(CLICK, this.handleOutsideClick, false);
    window.removeEventListener(STORAGE, this.syncLogout, false);
  }

  toggleMobileNav = () => {
    const { isSideNavOpen } = this.state;
    const sideNavEL = document.getElementById(SIDE_NAV);
    let sideNavWidth;
    let sideNavBoxShadow;

    if (!isSideNavOpen) {
      document.addEventListener(CLICK, this.handleOutsideClick, false);

      sideNavWidth = SIDE_NAV_WIDTH_270;
      sideNavBoxShadow = SIDE_NAV_BOX_SHADOW;
    } else {
      document.removeEventListener(CLICK, this.handleOutsideClick, false);

      sideNavWidth = '0';
      sideNavBoxShadow = NONE;
    }

    sideNavEL.style.width = sideNavWidth;
    sideNavEL.style.boxShadow = sideNavBoxShadow;

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
    dispatch(logOutUser());
  }

  toggleDarkMode = () => {
    const currentTheme = localStorage.getItem(THEME) || LIGHT;
    const theme = FLIP_THEME[currentTheme];

    localStorage.setItem(THEME, theme);
    document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
  }

  loadTheme = () => {
    const currentTheme = localStorage.getItem(THEME) || LIGHT;
    document.documentElement.setAttribute(THEME_ATTRIBUTE, currentTheme);
  }

  syncLogout(event) {
    if (event.key === LOGOUT) {
      window.location.reload();
    }
  }

  renderThemeButton(platformStyle) {
    return (
      <button
        type="button"
        className={`dark-mode-switch ${platformStyle}`}
        aria-label="Dark mode switch"
        onClick={this.toggleDarkMode}
      >
        <ion-icon name="contrast" class="dark-mode-icon" />
      </button>
    );
  }

  renderAuthButtons() {
    return (
      <div className="desktop-and-tablet">
        <button
          type="button"
          className="btn btn-default cancel-button btn"
          data-toggle="modal"
          data-target="#LoginFormModal"
          id="login-button"
        >
          Login
        </button>
        <button
          type="button"
          className="btn btn-primary btn-raised text-case login-button"
          data-toggle="modal"
          data-target="#SignUpFormModal"
          id="signup-button"
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
          <Link to="/my-profile" className="dropdown-item">
            <ion-icon class="user-profile-icon" name="person" />
            Profile
          </Link>
          <button
            type="button"
            className="dropdown-item logout-button"
            onClick={this.handleLogout}
          >
            <ion-icon class="user-profile-icon" name="log-out" />
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
        <nav
          className="navbar fixed-top navbar-expand-lg"
          id="navbar"
          ref={(node) => { this.node = node; }}
        >
          <div className="container">
            <button
              type="button"
              className="mobile-nav"
              aria-label="Toggle navigation"
              onClick={this.toggleMobileNav}
            >
              <ion-icon name="menu" />
            </button>
            <Link to="/">
              <span className="navbar-brand">Loresters Bookstore</span>
            </Link>

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

            {this.renderThemeButton('mobile-nav')}

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Search />
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                {user.isVerified && this.renderUserAvatar()}
              </ul>
              {!user.isVerified && this.renderAuthButtons()}
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
