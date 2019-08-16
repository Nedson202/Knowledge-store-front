import { gql } from 'apollo-boost';

const addUser = gql`
  mutation($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const verifyEmail = gql`
  mutation($token: String!) {
    verifyEmail(token: $token) {
      token,
      message
    }
  }
`;

const sendVerificationEmail = gql`
  query($email: String!) {
    sendVerificationEmail(email: $email) {
      message
    }
  }
`;

const forgotPassword = gql`
  query($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

const resetPassword = gql`
  mutation($id: String!, $email: String!, $password: String!, $token: String!) {
    resetPassword(id: $id, email: $email, password: $password, token: $token) {
      message
      token
    }
  }
`;

const editProfile = gql`
  mutation($username: String, $email: String, $picture: String) {
    editProfile(username: $username, email: $email, picture: $picture) {
      token
      message
    }
  }
`;

const changePassword = gql`
  mutation($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      token
      message
    }
  }
`;

const loginUser = gql`
mutation($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    username,
    email,
    token
  }
}
`;

const getBooks = gql`
  {
    books {
      name,
      authors,
      genre,
      year
    }
  }
`;

export {
  addUser, loginUser, getBooks, changePassword,
  verifyEmail, sendVerificationEmail,
  forgotPassword, resetPassword, editProfile
};