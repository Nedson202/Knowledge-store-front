import React, { Fragment, Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  SIDE_BAR_STATUS, LEFT_SIDE_BAR, CLOSED, OPEN, LEFT_SIDEBAR_NAV_LINKS,
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

    if (isSideBarOpen) {
      sideBarStatus = OPEN;
      sideBarWidth = '270px';
      sideNavTextClass = 'show';
    } else {
      sideBarStatus = CLOSED;
      sideBarWidth = '70px';
      sideNavTextClass = 'hide';
    }

    document.getElementById(LEFT_SIDE_BAR).style.width = sideBarWidth;
    localStorage.setItem(SIDE_BAR_STATUS, sideBarStatus);

    this.setState(prevState => ({
      isSideBarOpen: !prevState.isSideBarOpen,
      sideNavTextClass,
    }));
  };

  renderAdminNavlinks = () => {
    const { user: { role }, isAuthenticated } = this.props;
    const { sideNavTextClass } = this.state;

    if (!isAuthenticated || role === 'user') {
      return;
    }

    return (
      <Fragment>
        <div data-tip="Users">
          <NavLink to="/users" className="dropdown-item sidebar-navlink">
            <ion-icon name="people" />
            <span
              id="sideBarText"
              className={sideNavTextClass}
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
              id="sideBarText"
              className={sideNavTextClass}
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
            id="sideBarText"
            className={sideNavTextClass}
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
