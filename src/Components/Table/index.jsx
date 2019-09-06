import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './_Tables.scss';

const Tables = (props) => {
  const { users, removeAdmin } = props;

  const renderTableHead = () => (
    <thead>
      <tr>
        <th scope="col">UserId</th>
        <th scope="col">Username</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
      </tr>
    </thead>
  );

  const renderTableContent = data => (
    <Fragment>
      {data && data.map(user => (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <i
              className="fa fa-ellipsis-v"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <div
              className="dropdown-menu table-panel__user-delete"
              id="book-action-buttons"
            >
              <a
                href="/"
                className="dropdown-item user-profile-navlink"
                id="trash-icon"
              >
                deactivate
                {' '}
                <i className="fa fa-trash" />
              </a>
              {user.role.match('admin') && (
                <button
                  type="button"
                  onClick={removeAdmin('remove', user.email)}
                  className="dropdown-item user-profile-navlink"
                  id="trash-icon"
                >
                  remove
                    {' '}
                  <i className="fa fa-trash" />
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Fragment>
  );

  return (
    <div className="table-panel">
      <table className="table table-striped">
        {renderTableHead()}
        <tbody>
          {users && renderTableContent(users)}
        </tbody>
      </table>
    </div>
  );
};

Tables.propTypes = {
  users: PropTypes.array,
  removeAdmin: PropTypes.func,
};

Tables.defaultProps = {
  users: [],
  removeAdmin: () => { },
};

export default Tables;
