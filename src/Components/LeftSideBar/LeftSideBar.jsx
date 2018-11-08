import React, { Component, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import './_LeftSideBar.scss';

class LeftSideBar extends Component {
  renderAdminNavlinks = () => (
    <Fragment>
      <div data-tip="Users">
        <NavLink to="/users" className="dropdown-item sidebar-navlink">
          <i className="fa fa-users" />
          <span id="sideBarText">Users</span>
        </NavLink>
      </div>
    </Fragment>
  );

  render() {
    return (
      <div id="myLeftSideBar" className="leftSideBar">
        <ReactTooltip effect="solid" place="right" />
        <div data-tip="My Books">
          <NavLink to="/my-books" className="dropdown-item sidebar-navlink">
            <i className="fa fa-book" />
            <span id="sideBarText">My Books</span>
          </NavLink>
        </div>
        <div data-tip="All Books">
          <NavLink to="/books" className="dropdown-item sidebar-navlink">
            <i className="fab fa-accusoft" />
            <span id="sideBarText">All Books</span>
          </NavLink>
        </div>
        <div data-tip="My Favorites">
          <NavLink to="/favorites" className="dropdown-item sidebar-navlink">
            <i className="fas fa-bookmark" />
            <span id="sideBarText">My Favorites</span>
          </NavLink>
        </div>
        <div data-tip="Profile">
          <NavLink to="/profile" className="dropdown-item sidebar-navlink">
            <i className="fa fa-user-circle" />
            <span id="sideBarText">Profile</span>
          </NavLink>
        </div>
        <div data-tip="Analytics">
          <NavLink to="/analytics" className="dropdown-item sidebar-navlink">
            <i className="far fa-chart-bar" />
            <span id="sideBarText">Analytics</span>
          </NavLink>
        </div>
        <div data-tip="My Cart">
          <NavLink to="/cart" className="dropdown-item sidebar-navlink">
            <i className="fas fa-shopping-cart" />
            <span id="sideBarText">My Cart</span>
          </NavLink>
        </div>
        {this.renderAdminNavlinks()}
      </div>
    );
  }
}

export default LeftSideBar;
