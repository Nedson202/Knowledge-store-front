import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './_SideNav.scss';
import avatar from '../../assets/beverage-books.jpg';

class SideNav extends Component {
  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <div className="user-account-mobile">
          <div>
            <img
              src={avatar}
              alt="Avatar"
              className="rounded-circle"
              width="50px"
              height="50px"
            />
          </div>
          <div>Michael Smith</div>
        </div>
        <hr />
        <div>
          <NavLink to="/dashboard" className="dropdown-item sidebar-navlink">
            <i className="fas fa-tachometer-alt" />
            Dashboard
          </NavLink>
        </div>
        <div>
          <NavLink to="/profile" className="dropdown-item sidebar-navlink">
            <i className="fa fa-sign-out-alt" />
            Profile
          </NavLink>
        </div>
        <div>
          <NavLink to="/logout" className="dropdown-item sidebar-navlink">
            <i className="fa fa-sign-out-alt" />
            Logout
          </NavLink>
        </div>
      </div>
    );
  }
}

export default SideNav;
