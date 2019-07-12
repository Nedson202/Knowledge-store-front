import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './_SideNav.scss';

class SideNav extends Component {
  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <div>
          <NavLink to="/my-books" className="dropdown-item sidebar-navlink">
            My books
          </NavLink>
        </div>
        <div>
          <NavLink to="/books" className="dropdown-item sidebar-navlink">
            All books
          </NavLink>
        </div>
        <div>
          <NavLink to="/profile" className="dropdown-item sidebar-navlink">
            Profile
          </NavLink>
        </div>
        <div>
          <NavLink to="/logout" className="dropdown-item sidebar-navlink">
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(SideNav);
