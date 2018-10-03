import React, { Component } from 'react';
import './_Tables.scss';

class Tables extends Component {
  renderTableHead() {
    return (
      <thead>
        <tr>
          <th scope="col">UserId</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
        </tr>
      </thead>
    );
  }

  render() {
    return (
      <div className="table-panel">
        <table className="table table-striped">
          {this.renderTableHead()}
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>
                <i className="fa fa-ellipsis-v" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                <div className="dropdown-menu table-panel__user-delete" id="book-action-buttons">
                  <a href="/" className="dropdown-item user-profile-navlink" id="trash-icon">
                    delete
                    {' '}
                    <i className="fa fa-trash" />
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td><i className="fa fa-ellipsis-v" /></td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td><i className="fa fa-ellipsis-v" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Tables;
