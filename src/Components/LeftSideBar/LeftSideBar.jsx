import React, { Component, Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { NavLink } from 'react-router-dom';
import './_LeftSideBar.scss';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarOpen: false,
    };
  }

  componentDidMount() {
    return localStorage.sideBarStatus !== 'open' && this.toggleSidebar();
  }

  toggleSidebar = () => {
    const { isSideBarOpen } = this.state;
    const mainContent = document.getElementById('main');

    if (isSideBarOpen) {
      localStorage.setItem('sideBarStatus', 'open');
      document.getElementById('myLeftSideBar').style.width = '250px';
      mainContent ? mainContent.style.marginLeft = '250px' : null; {/* eslint-disable-line */}
      this.toggleSidebarText('block');
    } else {
      localStorage.setItem('sideBarStatus', 'closed');
      document.getElementById('myLeftSideBar').style.width = '70px';
      mainContent ? mainContent.style.marginLeft = 'auto' : null; {/* eslint-disable-line */}
      this.toggleSidebarText('none');
    }
    this.setState(prevState => ({
      isSideBarOpen: !prevState.isSideBarOpen,
    }));
  };

  toggleSidebarText = (display) => {
    const texts = document.querySelectorAll('#sideBarText');
    for (let text = 0; text < texts.length; text += 1) {
      texts[text].style.display = display;
    }
  };

  renderAdminNavlinks = () => (
    <Fragment>
      <div data-tip="My Favorites">
        <NavLink to="/favourites" className="dropdown-item sidebar-navlink">
          <i className="fas fa-bookmark" />
          <span id="sideBarText">My Favourites</span>
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
        <div data-tip="Users">
          <NavLink to="/users" className="dropdown-item sidebar-navlink">
            <i className="fa fa-users" />
            <span id="sideBarText">Users</span>
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
        <div data-tip="Admins">
          <NavLink to="/admins" className="dropdown-item sidebar-navlink">
            <i className="fas fa-user-ninja" />
            <span id="sideBarText">Admins</span>
          </NavLink>
        </div>
        {this.renderAdminNavlinks()}
        <div onClick={this.toggleSidebar}> {/* eslint-disable-line */}
          <div className="dropdown-item sidebar-navlink collapse-bar" data-tip="Toggle sidebar">
            <i className="fa fa-bars" />
            <span id="sideBarText">Toggle me</span>
          </div>
        </div>
      </div>
    );
  }
}

export default LeftSideBar;
