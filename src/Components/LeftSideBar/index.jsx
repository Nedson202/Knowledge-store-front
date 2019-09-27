import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const LeftSideBar = (props) => {
  const { user: { role }, isAuthenticated } = props;

  const renderAdminNavlinks = () => {
    if (!isAuthenticated || role === 'user') {
      return;
    }

    return (
      <Fragment>
        <div data-tip="Users">
          <NavLink to="/users" className="dropdown-item sidebar-navlink">
            <ion-icon name="people" />
            <span id="sideBarText">Users</span>
          </NavLink>
        </div>
      </Fragment>
    );
  };

  return (
    <div id="myLeftSideBar" className="leftsidebar">
      <ReactTooltip effect="solid" place="right" />
      <div data-tip="All Books">
        <NavLink
          to="/books"
          className="dropdown-item sidebar-navlink"
        >
          <ion-icon name="bookmarks" />
          <span id="sideBarText">All Books</span>
        </NavLink>
      </div>
      <div data-tip="My Books">
        <NavLink
          to="/my-books"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          <ion-icon name="book" />
          <span id="sideBarText">My Books</span>
        </NavLink>
      </div>
      <div data-tip="My Favorites">
        <NavLink
          to="/my-favorites"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          <ion-icon name="bookmark" />
          <span id="sideBarText">My Favorites</span>
        </NavLink>
      </div>
      <div data-tip="Profile">
        <NavLink
          to="/profile"
          className={`dropdown-item sidebar-navlink ${!isAuthenticated && 'blur'}`}
        >
          <ion-icon name="person" />
          <span id="sideBarText">Profile</span>
        </NavLink>
      </div>
      {renderAdminNavlinks()}
    </div>
  );
};

LeftSideBar.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

LeftSideBar.defaultProps = {
  user: {},
  isAuthenticated: false,
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  user: auth.user
});

export default connect(mapStateToProps)(LeftSideBar);
