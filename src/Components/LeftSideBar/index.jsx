import React, { Fragment, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SIDE_BAR_STATUS, LEFT_SIDE_BAR, CLOSED, OPEN, LEFT_SIDEBAR_NAV_LINKS, HIDE,
  SHOW, SIDE_NAV_WIDTH_270, SIDE_NAV_WIDTH_70, USER,
} from '../../settings';

class LeftSideBar extends Component {
  state = {
    isSideBarOpen: false,
    sideNavTextClass: '',
  };

  componentDidMount() {
    return localStorage.sideBarStatus !== OPEN && this.toggleSidebar();
  }

  toggleSidebar = () => {
    const { isSideBarOpen } = this.state;
    let sideBarStatus;
    let sideBarWidth;
    let sideNavTextClass;

    if (typeof window.orientation === 'undefined') {
      sideBarStatus = CLOSED;
      sideBarWidth = SIDE_NAV_WIDTH_70;
      sideNavTextClass = HIDE;
    }

    if (!isSideBarOpen) {
      sideBarStatus = CLOSED;
      sideBarWidth = SIDE_NAV_WIDTH_70;
      sideNavTextClass = HIDE;
    } else {
      sideBarStatus = OPEN;
      sideBarWidth = SIDE_NAV_WIDTH_270;
      sideNavTextClass = SHOW;
    }


    document.getElementById(LEFT_SIDE_BAR).style.width = sideBarWidth;
    localStorage.setItem(SIDE_BAR_STATUS, sideBarStatus);

    this.setState(prevState => ({
      isSideBarOpen: !prevState.isSideBarOpen,
      sideNavTextClass,
    }));
  };

  renderAdminNavlinks = () => {
    const { user, isAuthenticated } = this.props;
    const { role } = user;
    const { sideNavTextClass } = this.state;

    if (!isAuthenticated || role === USER) {
      return;
    }

    return (
      <Fragment>
        <div data-tip="Users">
          <NavLink
            to="/users"
            className="dropdown-item sidebar-navlink"
          >
            <ion-icon name="people" />
            <span
              className={`${sideNavTextClass} sideBarText`}
            >
              Users
            </span>
          </NavLink>
        </div>
      </Fragment>
    );
  };

  renderNavLinks = () => {
    const { isAuthenticated } = this.props;
    const { sideNavTextClass } = this.state;

    const navLinksMap = LEFT_SIDEBAR_NAV_LINKS.map((navLink) => {
      const {
        key, label, icon, link
      } = navLink;

      return (
        <div data-tip={label} key={key}>
          <NavLink
            to={link}
            className={`
              dropdown-item sidebar-navlink
              ${key !== 0 && !isAuthenticated && 'blur'}
            `}
          >
            <ion-icon name={icon} />
            <span
              className={`${sideNavTextClass} sideBarText`}
            >
              {label}
            </span>
          </NavLink>
        </div>
      );
    });

    return navLinksMap;
  }

  render() {
    const { sideNavTextClass } = this.state;

    return (
      <div id="myLeftSideBar" className="leftsidebar">
        <ReactTooltip effect="solid" place="right" />
        <div
          onClick={this.toggleSidebar}
          className="sidenav-collapse"
          role="button"
          tabIndex={0}
        >
          <div className="menu-icon">
            <ion-icon name="menu" />
          </div>
          <Link
            to="/"
            className={`${sideNavTextClass} sideBarText`}
          >
            Loresters Bookstore
          </Link>
        </div>
        {this.renderNavLinks()}
        {this.renderAdminNavlinks()}
      </div>
    );
  }
}

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
