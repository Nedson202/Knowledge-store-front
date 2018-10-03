import React, { Component } from 'react';
import './_Users.scss';
import Tables from '../Table/Tables';

class Admins extends Component {
  render() {
    return (
      <div className="admin-panel" id="main">
        <div className="admin-panel__header">
          <h3>Users</h3>
        </div>
        <Tables />
      </div>
    );
  }
}

export default Admins;
