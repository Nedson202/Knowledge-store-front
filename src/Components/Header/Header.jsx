import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './_Header.scss';
import Avatar from '../ReviewCard/Avatar';
import { logOutUser } from '../../redux/actions/userActions';
import toaster from '../../utils/toast';
import Search from '../Search/Search';

class Header extends Component {
  state = {
    isSideNavOpen: false,
    isSideBarOpen: false,
  };

  componentDidMount() {
    return localStorage.sideBarStatus !== 'open' && this.toggleSidebar();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  toggleSidebar = () => {
    const { isSideBarOpen } = this.state;
    const mainContent = document.getElementById('main');

    if (isSideBarOpen) {
      localStorage.setItem('sideBarStatus', 'open');
      document.getElementById('myLeftSideBar').style.width = '250px';
      this.toggleSidebarText('block');
    } else {
      localStorage.setItem('sideBarStatus', 'closed');
      document.getElementById('myLeftSideBar').style.width = '70px';
      mainContent ? mainContent.style.marginLeft = 'auto' : null; {/* eslint-disable-line */ }
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

  toggleSideBar = () => {
    const { isSideNavOpen } = this.state;
    if (!isSideNavOpen) {
      document.addEventListener('click', this.handleOutsideClick, false);
      document.getElementById('mySidenav').style.width = '270px';
      document.getElementById('mySidenav').style.boxShadow = '0 1px 1px 100vw rgba(0, 0, 0, 0.6)';
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('mySidenav').style.boxShadow = 'none';
    }

    this.setState(prevState => ({
      isSideNavOpen: !prevState.isSideNavOpen,
    }));
  }

  handleOutsideClick = (event) => {
    if (this.node.contains(event.target)) {
      return;
    }

    this.toggleSideBar();
  }

  handleLogout = () => {
    const { dispatch, history } = this.props;
    dispatch(logOutUser());
    history.push('/');
    toaster('success', 'You logged out successfully');
  }

  renderUserAvatar() {
    const { user } = this.props;
    return (
      <li className="nav-item dropdown user-profile-nav">
        <button
          type="button"
          className="btn btn-default nav-link dropdown-toggle text-case user-toggle"
          id="navbarDropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {user.picture && <img src={user.picture} alt="Avatar" className="avatar" />}
          {!user.picture && <Avatar user={user.username} color={user.avatarColor} />}
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <div className="user-detail">
            {`@${user.username}`}
          </div>
          <div className="dropdown-divider" />
          <Link to="/profile" className="dropdown-item user-profile-navlink">
            Profile
            {' '}
            <i className="fas fa-user-circle" />
          </Link>
          <button type="button" className="dropdown-item user-profile-navlink" onClick={this.handleLogout}>
            Logout
            {' '}
            <i className="fa fa-sign-out-alt" />
          </button>
        </div>
      </li>
    );
  }

  renderNotificationPane() {
    const { user } = this.props;
    return (
      <li className="nav-item dropdown user-profile-nav">
        <span
          className="cart-navbar"
          id="notificationPane"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-bell" />
          <span>10</span>
        </span>
        <div className="dropdown-menu notification-pane" aria-labelledby="notificationPane">
          <div className="user-detail">
            {`@${user.username}`}
          </div>
          <div className="dropdown-divider" />
          <Link to="/profile" className="dropdown-item user-profile-navlink">
            Profile
            {' '}
            <i className="fas fa-user-circle" />
          </Link>
          <button type="button" className="dropdown-item user-profile-navlink" onClick={this.handleLogout}>
            Logout
            {' '}
            <i className="fa fa-sign-out-alt" />
          </button>
        </div>
      </li>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <div className="App" ref={(node) => { this.node = node; }}>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" id="navbar">
          <div
            onClick={this.toggleSidebar}
            className="sidenav-collapse dropdown-item sidebar-navlink collapse-bar btn-raised"
            data-tip="Toggle sidebar"
            role="button"
            tabIndex={0}
          >
            <i className="fa fa-bars" />
          </div>
          <div className="container">
            <Link to="/"><span className="navbar-brand">Loresters Bookstore</span></Link>
            <div>
              <button
                type="button"
                className="mobile-nav"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Search icon"
              >
                <i className="fas fa-search" />
              </button>
              <button
                type="button"
                className="mobile-nav"
                aria-label="Toggle navigation"
                onClick={this.toggleSideBar}
              >
                <i className="fas fa-bars" />
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <Search />
              <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                {user.isVerified === 'true' && this.renderNotificationPane()}
                {user.isVerified === 'true' && this.renderUserAvatar()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
  user: PropTypes.object,
};

Header.defaultProps = {
  dispatch: () => { },
  history: {},
  user: {},
};

export default withRouter(connect(mapStateToProps)(Header));
