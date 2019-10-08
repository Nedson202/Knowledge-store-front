import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, withApollo } from 'react-apollo';
import { Select } from 'antd';

import Tables from '../../Components/Table';
import AddAdminModal from '../../Components/AddAdminModal';

import { filterUsers, toggleAdmin } from '../../queries/users';
import { toaster, errorHandler, modalToggler } from '../../utils';
import Spinner from '../../Components/Spinner';
import {
  SUCCESS, CLOSE_USER, ADD, TOASTR_ERROR, FETCH_USERS_QUERY,
  TOGGLE_ADMIN_QUERY,
} from '../../settings';

const { Option } = Select;

class Users extends Component {
  state = {
    filteredUsers: [],
    email: '',
  };

  handleChange = async (value) => {
    const { client } = this.props;

    try {
      const response = await client.query({
        query: filterUsers,
        variables: {
          type: value.toLowerCase()
        }
      });

      const { fetchUsers } = response.data;

      if (fetchUsers.length === 0) {
        toaster(TOASTR_ERROR, 'Sorry no match was found');
      }

      this.setState({ filteredUsers: fetchUsers || [] });
    } catch (error) /* istanbul ignore next */ {
      console.error(error);
    }
  }

  handleEmailChange = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
  }

  handleToggleAdmin = (adminAction, userEmail) => async () => {
    const { toggleAdminQuery } = this.props;
    const { email } = this.state;

    try {
      const response = await toggleAdminQuery({
        variables: {
          email: adminAction.match(ADD) ? email : userEmail,
          adminAction
        },
        refetchQueries: this.refetchQuery()
      });

      const { toggleAdmin: { message } } = response.data;
      modalToggler(CLOSE_USER);
      this.setState({ email: '' });
      toaster(SUCCESS, message);
    } catch (error) /* istanbul ignore next */ {
      const messages = errorHandler(error);
      messages.forEach(message => toaster(TOASTR_ERROR, message));
    }
  }

  refetchQuery() {
    return [
      {
        query: filterUsers,
        variables: {
          type: 'all'
        }
      }
    ];
  }

  renderSelectField() {
    const { filteredUsers } = this.state;
    return (
      <Select
        defaultValue="Filter (All)"
        onChange={this.handleChange}
      >
        {filteredUsers.length && <Option value="All">All</Option>}
        <Option value="User">User</Option>
        <Option value="Admin">Admin</Option>
        <Option value="Super">Super</Option>
      </Select>
    );
  }

  renderHeader() {
    return (
      <div className="admin-panel__header">
        <h3>Users</h3>
        <div>
          {this.renderSelectField()}
          <button
            className="btn btn-primary btn-raised"
            data-target="#AddAdminModal"
            data-toggle="modal"
            type="button"
          >
            Add Admin
          </button>
        </div>
      </div>
    );
  }

  renderTable(filteredResult) {
    return (
      <Tables
        users={filteredResult}
        removeAdmin={this.handleToggleAdmin}
      />
    );
  }

  render() {
    const { fetchUsersQuery: { loading, fetchUsers } } = this.props;

    const { filteredUsers } = this.state;
    const users = fetchUsers && fetchUsers.length ? fetchUsers : [];
    const filteredResult = filteredUsers.length ? filteredUsers : users;

    return (
      <div className="container-content">
        <div className="admin-panel">
          {this.renderHeader()}

          {loading ? (
            <span className="table-spinner">
              <Spinner spinnerStyle={45} />
            </span>
          ) : this.renderTable(filteredResult)}

          <AddAdminModal
            addAmin={this.handleToggleAdmin}
            handleInputChange={this.handleEmailChange}
          />
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  client: PropTypes.object,
  fetchUsersQuery: PropTypes.shape({
    loading: PropTypes.bool,
    fetchUsers: PropTypes.array,
  }),
  toggleAdminQuery: PropTypes.func,
};

Users.defaultProps = {
  client: {},
  fetchUsersQuery: {},
  toggleAdminQuery: () => { },
};

export default compose(
  withApollo,
  graphql(filterUsers, {
    name: FETCH_USERS_QUERY,
    options: () => ({
      variables: {
        type: 'all'
      }
    })
  }),
  graphql(toggleAdmin, {
    name: TOGGLE_ADMIN_QUERY
  }),
)(Users);
