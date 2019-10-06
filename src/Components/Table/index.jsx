import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ADMIN, REMOVE } from '../../settings';

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

  const renderTableContent = (data) => {
    if (!data || !data.length) {
      return;
    }

    return (
      <Fragment>
        {data.map(({
          id, username, email, role
        }) => (
          <tr key={id}>
            <th scope="row">{id}</th>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>
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
                  <i className="fa fa-trash" />
                </a>

                {role.match(ADMIN) && (
                  <button
                    type="button"
                    onClick={removeAdmin(REMOVE, email)}
                    className="dropdown-item user-profile-navlink"
                    id="trash-icon"
                  >
                    {REMOVE}
                    <i className="fa fa-trash" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </Fragment>
    );
  };

  return (
    <div className="table-panel">
      <table className="table table-striped">
        {renderTableHead()}
        <tbody>
          {renderTableContent(users)}
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
