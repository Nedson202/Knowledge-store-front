import React, { Component } from 'react';
import './_AdminPanel.scss';
import MainContent from '../MainContent';

class AdminPanel extends Component {
  render() {
    return (
      <div className="admin-panel">
        <MainContent />
      </div>
    );
  }
}

export default AdminPanel;
