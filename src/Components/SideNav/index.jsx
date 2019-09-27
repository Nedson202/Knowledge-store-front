import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '../ReviewCard/Avatar';
import { LOGOUT } from '../../settings';
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

    return (
      <div className="sidenav-user-details">
        <div>
          {picture && <img src={picture} alt="Avatar" className="avatar" />}
          {!picture && <Avatar user={username} color={avatarColor} />}
        </div>
        <p className="username">
          {username}
        </p>
      </div>
    );
  };

  const handleLogout = () => {
    window.localStorage.setItem(LOGOUT, true);
    dispatch(logOutUser());
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
      <div>
        <NavLink
          to="/books"
          className="dropdown-item sidebar-navlink"
        >
          All books
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/my-books"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          My books
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/my-favorites"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          My Favorites
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/profile"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          Profile
        </NavLink>
      </div>
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
