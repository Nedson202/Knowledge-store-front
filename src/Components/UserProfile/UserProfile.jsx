import React, { Component } from 'react';
// import LeftSideBar from '../LeftSideBar/LeftSideBar';
import './_UserProfile.scss';
import UpdateForm from './UpdateForm';
import UpdateFormLoader from './UpdateFormLoader';
import UpdatePassword from './UpdatePassword';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <div className="profile-update" id="main">
          <UpdateForm />
          <UpdateFormLoader />
          <UpdatePassword />
        </div>
      </div>
    );
  }
}

export default UserProfile;
