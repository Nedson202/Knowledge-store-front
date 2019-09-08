import { gql } from 'apollo-boost';

const filterUsers = gql`
  query($type: String!) {
    fetchUsers(type: $type) {
      id
      username
      email
      role
    }
  }
`;

const toggleAdmin = gql`
  mutation($email: String!, $adminAction: String!) {
    toggleAdmin(email: $email, adminAction: $adminAction) {
      message
    }
  }
`;

export {
  toggleAdmin, filterUsers
};
