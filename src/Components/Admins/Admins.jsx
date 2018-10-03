import React, { Component } from 'react';
import './_Admins.scss';
import AddAdminModal from '../AddAdminModal/AddAdminModal';
import Tables from '../Table/Tables';

class Admins extends Component {
  renderHeader() {
    return (
      <div className="admin-panel__header">
        <h3>Admins</h3>
        <button
          type="button"
          className="btn btn-primary btn-raised"
          data-toggle="modal"
          data-target="#AddAdminModal"
        >
      Add Admin
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="admin-panel" id="main">
        {this.renderHeader()}
        <Tables />
        <AddAdminModal />
      </div>
    );
  }
}

export default Admins;
