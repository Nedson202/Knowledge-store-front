import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './_LeftSideBar.scss';

class LeftSideBar extends Component {
  renderAdminNavlinks = () => {
    const { user: { role } } = this.props;
    if (role === 'user') {
      return;
    }
    return (
      <Fragment>
        <div data-tip="Users">
          <NavLink exact to="/users" className="dropdown-item sidebar-navlink">
            <i className="fa fa-users" />
            <span id="sideBarText">Users</span>
          </NavLink>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <div id="myLeftSideBar" className="leftSideBar">
        <ReactTooltip effect="solid" place="right" />
        <div data-tip="My Books">
          <NavLink exact to="/my-books" className="dropdown-item sidebar-navlink">
            <i className="fa fa-book" />
            <span id="sideBarText">My Books</span>
          </NavLink>
        </div>
        <div data-tip="All Books">
          <NavLink exact to="/books" className="dropdown-item sidebar-navlink">
            <i className="fab fa-accusoft" />
            <span id="sideBarText">All Books</span>
          </NavLink>
        </div>
        <div data-tip="My Favorites">
          <NavLink exact to="/favorites" className="dropdown-item sidebar-navlink">
            <i className="fas fa-bookmark" />
            <span id="sideBarText">My Favorites</span>
          </NavLink>
        </div>
        <div data-tip="Profile">
          <NavLink exact to="/profile" className="dropdown-item sidebar-navlink">
            <i className="fa fa-user-circle" />
            <span id="sideBarText">Profile</span>
          </NavLink>
        </div>
        {this.renderAdminNavlinks()}
      </div>
    );
  }
}

LeftSideBar.propTypes = {
  user: PropTypes.object,
};

LeftSideBar.defaultProps = {
  user: {},
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(mapStateToProps)(LeftSideBar);
