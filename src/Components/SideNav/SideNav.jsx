import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Avatar from '../ReviewCard/Avatar';
import './_SideNav.scss';

class SideNav extends Component {
  // renderUserImage() {
  //   const { user: { picture, username }, user } = this.props;
  //   return (
  //     <div className="user-account-mobile">
  //       <div>
  //         {picture && (
  //         <img
  //           src={user && picture}
  //           alt="Avatar"
  //           className="rounded-circle"
  //           width="50px"
  //           height="50px"
  //         />
  //         )}
  //         {!picture && <Avatar user={user.username} color={user.avatarColor} />}
  //       </div>
  //       <div>{username}</div>
  //     </div>
  //   );
  // }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        {/* {this.renderUserImage()} */}
        <hr />
        <div>
          <NavLink to="/my-books" className="dropdown-item sidebar-navlink">
            <i className="fas fa-tachometer-alt" />
            My books
          </NavLink>
        </div>
        <div>
          <NavLink to="/books" className="dropdown-item sidebar-navlink">
            <i className="fas fa-tachometer-alt" />
            All books
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

const mapStateToProps = state => ({
  user: state.auth.user
});

SideNav.propTypes = {
  // user: PropTypes.object,
};

SideNav.defaultProps = {
  // user: {},
};


export default connect(mapStateToProps)(SideNav);

// export default SideNav;
