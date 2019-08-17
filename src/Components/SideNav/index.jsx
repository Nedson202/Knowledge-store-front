import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './_SideNav.scss';

const SideNav = () => (
  <div id="mySidenav" className="sidenav">
    <div>
      <NavLink exact to="/my-books" className="dropdown-item sidebar-navlink">
        My books
      </NavLink>
    </div>
    <div>
      <NavLink exact to="/books" className="dropdown-item sidebar-navlink">
        All books
      </NavLink>
    </div>
    <div>
      <NavLink exact to="/profile" className="dropdown-item sidebar-navlink">
        Profile
      </NavLink>
    </div>
    <div>
      <NavLink exact to="/logout" className="dropdown-item sidebar-navlink">
        Logout
      </NavLink>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(SideNav);
