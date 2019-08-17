import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql, withApollo } from 'react-apollo';
import { Select } from 'antd';
import './_Users.scss';
import Tables from '../Table/Tables';
import { filterUsers, toggleAdmin } from '../../queries/users';
import AddAdminModal from '../AddAdminModal/AddAdminModal';
import toaster from '../../utils/toast';
import Spinner from '../Spinner/Spinner';
import errorHandler from '../../utils/errorHandler';
import modalCloser from '../../utils/modalCloser';

const { Option } = Select;

class Users extends Component {
  state = {
    filteredUsers: [],
    email: '',
  };

  handleChange = async (value) => {
    const { client } = this.props;
    client.query({
      query: filterUsers,
      variables: {
        type: value.toLowerCase()
      }
    }).then((response) => {
      const { fetchUsers } = response.data;
      if (fetchUsers.length === 0) toaster('error', 'Sorry no match was found');
      this.setState({ filteredUsers: fetchUsers || [] });
    });
  }

  handleEmailChange = (event) => {
    const { value } = event.target;
    this.setState({ email: value });
  }

  handleToggleAdmin = (adminAction, userEmail) => () => {
    const { toggleAdminQuery } = this.props;
    const { email } = this.state;
    toggleAdminQuery({
      variables: {
        email: adminAction.match('add') ? email : userEmail,
        adminAction
      },
      refetchQueries: this.refetchQuery()
    }).then((response) => {
      const { toggleAdmin: { message } } = response.data;
      modalCloser('close-user');
      this.setState({ email: '' });
      toaster('success', message);
    }).catch((error) => {
      const messages = errorHandler(error);
      messages.forEach(message => toaster('error', message));
    });
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
      <Fragment>
        <Select defaultValue="Filter (All)" onChange={this.handleChange}>
          {filteredUsers.length && <Option value="All">All</Option>}
          <Option value="User">User</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Super">Super</Option>
        </Select>
      </Fragment>
    );
  }

  renderHeader() {
    return (
      <div className="admin-panel__header">
        <h3>Users</h3>
        <div>
          {this.renderSelectField()}
          <button
            type="button"
            className="btn btn-primary btn-raised"
            data-toggle="modal"
            data-target="#AddAdminModal"
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
    const { fetchUsersQuery } = this.props;
    const { filteredUsers } = this.state;
    const users = fetchUsersQuery.fetchUsers !== undefined ? fetchUsersQuery.fetchUsers : [];
    const filteredResult = filteredUsers.length ? filteredUsers : users;
    return (
      <div className="admin-panel">
        {this.renderHeader()}
        {fetchUsersQuery.loading ? (
          <span className="table-spinner">
            <Spinner spinnerStyle={45} />
          </span>
        ) : this.renderTable(filteredResult)}
        <AddAdminModal
          handleInputChange={this.handleEmailChange}
          addAmin={this.handleToggleAdmin}
        />
      </div>
    );
  }
}

Users.propTypes = {
  client: PropTypes.object,
  fetchUsersQuery: PropTypes.object,
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
    name: 'fetchUsersQuery',
    options: () => ({
      variables: {
        type: 'all'
      }
    })
  }),
  graphql(toggleAdmin, {
    name: 'toggleAdminQuery'
  })
)(Users);
