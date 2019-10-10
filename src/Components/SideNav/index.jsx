import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../ReviewCard/Avatar';
import { LOGOUT, LEFT_SIDEBAR_NAV_LINKS } from '../../settings';
import { logOutUser } from '../../redux/actions/userActions';

const SideNav = ({ isAuthenticated, user, dispatch }) => {
  const authNavLinks = () => {
    if (isAuthenticated) {
      return;
    }

    return (
      <div className="sidenav-auth-buttons">
        <button
          type="button"
          className="btn btn-default btn-raised cancel-button btn"
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
  };

  const userAvatar = () => {
    if (!isAuthenticated) {
      return;
    }

    const { username, picture, avatarColor, } = user;
    let avatar = <Avatar user={username} color={avatarColor} />;

    if (picture) {
      avatar = <img src={picture} alt="Avatar" className="avatar" />;
    }

    return (
      <div className="sidenav-user-details">
        <div>
          {avatar}
        </div>
        <p className="username">
          {username}
        </p>
      </div>
    );
  };

  const renderNavLinks = () => {
    const navLinksMap = LEFT_SIDEBAR_NAV_LINKS.map((navLink) => {
      const {
        key, label, link
      } = navLink;

      return (
        <div key={key}>
          <NavLink
            to={link}
            className={`
              dropdown-item sidebar-navlink
              ${key !== 0 && !isAuthenticated && 'blur'}
            `}
          >
            {label}
          </NavLink>
        </div>
      );
    });

    return navLinksMap;
  };

  const handleLogout = () => {
    window.localStorage.setItem(LOGOUT, true);
    logOutUser(dispatch);
  };

  const logoutAction = () => {
    if (!isAuthenticated) {
      return;
    }

    return (
      <div>
        <p
          onClick={handleLogout}
          className="dropdown-item sidebar-navlink"
        >
          Logout
        </p>
      </div>
    );
  };

  return (
    <div id="mySidenav" className="sidenav">
      {authNavLinks()}
      {userAvatar()}
      {renderNavLinks()}
      {logoutAction()}
    </div>
  );
};

SideNav.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  dispatch: PropTypes.func,
};

SideNav.defaultProps = {
  isAuthenticated: false,
  user: {},
  dispatch: () => { },
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user,
});

export default connect(mapStateToProps)(SideNav);
